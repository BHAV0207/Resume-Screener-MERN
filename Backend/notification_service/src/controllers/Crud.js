// src/controllers/notification.controller.js
const service = require("../services/notificationService");

const getNotifications = async (req, res) => {
  const notifications = await service.getUserNotification(req.user.id);
  res.json(notifications);
};

const markRead = async (req, res) => {
  await service.markAsRead(req.params.id);
  res.sendStatus(200);
};

const deleteNotification = async (req, res) => {
  await service.deleteNotification(req.params.id);
  res.sendStatus(200);
};



module.exports = {
  getNotifications,
  markRead,
  deleteNotification,
};
