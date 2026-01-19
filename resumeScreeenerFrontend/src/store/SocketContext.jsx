import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SocketContext = createContext(null);

const NOTIFICATION_SERVICE_URL = import.meta.env.VITE_NOTIFICATION_SERVICE_URL || "http://localhost:5051/api";

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Connect to socket when user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!token || !user) {
            return;
        }

        const newSocket = io(NOTIFICATION_SERVICE_URL, {
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

        // Handle incoming notifications
        newSocket.on("notification", (notification) => {
            console.log("🔔 New notification:", notification);

            // Add to notifications list
            setNotifications((prev) => [notification, ...prev]);
            setUnreadCount((prev) => prev + 1);

            // Show toast notification
            const toastType = notification.type === "SUCCESS" ? toast.success
                : notification.type === "ERROR" ? toast.error
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
    }, []);

    // Mark notification as read
    const markAsRead = useCallback((notificationId) => {
        setNotifications((prev) =>
            prev.map((n) =>
                n._id === notificationId ? { ...n, isRead: true } : n
            )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
    }, []);

    // Mark all as read
    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
    }, []);

    // Clear all notifications
    const clearNotifications = useCallback(() => {
        setNotifications([]);
        setUnreadCount(0);
    }, []);

    // Disconnect socket (call on logout)
    const disconnectSocket = useCallback(() => {
        if (socket) {
            socket.close();
            setSocket(null);
            setIsConnected(false);
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [socket]);

    const value = {
        socket,
        isConnected,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        disconnectSocket,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export default SocketContext;
