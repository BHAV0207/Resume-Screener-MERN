import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

import axios from "axios";

const NotificationContext = createContext(null);

const NOTIFICATION_SERVICE_BASE_URL = import.meta.env.VITE_NOTIFICATION_SERVICE_URL || "http://localhost:5051";

// Create a dedicated axios instance for notifications (since it's a different service than main-service)
const notificationAxios = axios.create({
    baseURL: NOTIFICATION_SERVICE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptor to add token
notificationAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper to remove /api from the URL for Socket.io if present
const getSocketUrl = (url) => {
    return url.replace(/\/api$/, "");
};

export const NotificationProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch existing notifications from API
    const fetchNotifications = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user?.id) return;

        setLoading(true);
        try {
            // Adjust the endpoint based on your Backend routes
            // If the route is GET /api/notifications/:userId
            const res = await notificationAxios.get("/api/notifications");
            const data = res.data?.data || res.data || [];
            setNotifications(data);
            setUnreadCount(data.filter((n) => !n.isRead).length);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Connect to socket when user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!token || !user) {
            return;
        }

        // Fetch existing notifications
        fetchNotifications();

        const socketUrl = getSocketUrl(NOTIFICATION_SERVICE_BASE_URL);
        const newSocket = io(socketUrl, {
            auth: { token },
            query: { userId: user.id },
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on("connect", () => {
            console.log("✅ Connected to notification server");
            setIsConnected(true);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("❌ Disconnected from notification server:", reason);
            setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
            setIsConnected(false);
        });

        // Handle incoming real-time notifications
        newSocket.on("notification", (notification) => {
            console.log("🔔 New notification:", notification);

            // Add to notifications list (at the top)
            setNotifications((prev) => [notification, ...prev]);
            setUnreadCount((prev) => prev + 1);

            // Show toast notification
            const toastType =
                notification.type === "SUCCESS"
                    ? toast.success
                    : notification.type === "ERROR"
                        ? toast.error
                        : toast;

            toastType(notification.title || notification.message, {
                duration: 5000,
                icon: "🔔",
            });
        });

        setSocket(newSocket);

        // Listen for logout event to disconnect socket
        const handleLogout = () => {
            newSocket.close();
            setSocket(null);
            setIsConnected(false);
            setNotifications([]);
            setUnreadCount(0);
        };
        window.addEventListener("user-logout", handleLogout);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("user-logout", handleLogout);
            newSocket.close();
        };
    }, [fetchNotifications]);

    // Mark single notification as read
    const markAsRead = useCallback(async (notificationId) => {
        try {
            await notificationAxios.patch(`/api/notifications/${notificationId}/read`);
            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === notificationId ? { ...n, isRead: true } : n
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    }, []);

    // Mark all as read
    const markAllAsRead = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user?.id) return;

        try {
            // If you have a bulk endpoint, call it here. Otherwise, update local state.
            // For now, updating local state for unread notifications.
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error("Error marking all as read:", err);
        }
    }, []);

    // Delete notification
    const deleteNotification = useCallback(async (notificationId) => {
        try {
            await notificationAxios.delete(`/api/notifications/${notificationId}`);
            setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
            // Recalculate unread count if necessary or just filter
            setUnreadCount((prev) => notifications.find(n => n._id === notificationId && !n.isRead) ? Math.max(0, prev - 1) : prev);
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    }, [notifications]);

    // Clear all notifications
    const clearNotifications = useCallback(async () => {
        try {
            // If you have a delete all endpoint, call it.
            setNotifications([]);
            setUnreadCount(0);
        } catch (err) {
            console.error("Error clearing notifications:", err);
        }
    }, []);

    const value = useMemo(
        () => ({
            socket,
            isConnected,
            notifications,
            unreadCount,
            loading,
            fetchNotifications,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearNotifications,
        }),
        [
            socket,
            isConnected,
            notifications,
            unreadCount,
            loading,
            fetchNotifications,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearNotifications,
        ]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};

export default NotificationContext;
