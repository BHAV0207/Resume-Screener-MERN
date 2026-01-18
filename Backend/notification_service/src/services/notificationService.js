const Notification = require("../models/notification");

const createNotification = async (payload) => {
  try {
    if (!payload) {
      throw new Error("Payload is required to create notification");
    }

    const notification = await Notification.create(payload);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error.message);
    throw error; // important so caller (Kafka consumer / controller) can handle it
  }
};

const getUserNotification = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required to get notification");
    }
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching the notifications", error.message);
    throw error;
  }
};

const markAsRead = async (id) => {
  try {
    if (!id) {
      throw new Error("notification ID is required to mark as read");
    }
    return await Notification.findByIdAndUpdate(id, { isRead: true });
  } catch (error) {
    console.error("Error marking the notifications", error.message);
    throw error;
  }
};

const deleteNotification = async (id) => {
  try {
    if (!id) {
      throw new Error("notification ID is required to delete the notifiaction");
    }
    return await Notification.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error marking the notifications", error.message);
    throw error;
  }
};

module.exports = {
  createNotification,
  getUserNotification,
  markAsRead,
  deleteNotification
};
