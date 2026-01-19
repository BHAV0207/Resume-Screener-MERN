const express = require("express");
const ctrl = require("../controllers/Crud");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/notifications - Get all notifications for the authenticated user
router.get("/:userId", ctrl.getNotifications);

// PATCH /api/notifications/:id/read - Mark notification as read
router.patch("/:id/read", ctrl.markRead);

// DELETE /api/notifications/:id - Delete a notification
router.delete("/:id", ctrl.deleteNotification);

module.exports = router;
