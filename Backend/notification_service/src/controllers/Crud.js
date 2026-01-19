// src/controllers/notification.controller.js
const service = require("../services/notificationService");

const getNotifications = async (req, res) => {
  try {
    console.log("JWT user:", req.user);
    const notifications = await service.getUserNotification(req.user.id);
    res.json(notifications);
  } catch (error) {
    console.error("Error in getNotifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

const markRead = async (req, res) => {
  try {
    const result = await service.markAsRead(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error in markRead:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid notification ID" });
    }
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const result = await service.deleteNotification(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid notification ID" });
    }
    res.status(500).json({ message: "Failed to delete notification" });
  }
};

module.exports = {
  getNotifications,
  markRead,
  deleteNotification,
};
