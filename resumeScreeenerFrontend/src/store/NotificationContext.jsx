import { createContext, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationsAsRead = async () => {
    if (!notificationId) return;
    try {
      await axiosInstance.patch(`/api/notifications/${notificationId}/read`);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async () => {
    if (!notificationId) return;
    try {
      await axiosInstance.delete(`/api/notifications/${notificationId}`);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const value = useMemo(
    () => ({
      notifications,
      fetchNotifications,
      markNotificationsAsRead,
      setNotificationId,
      deleteNotification,
      loading,
    }),
    [notifications, loading],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
