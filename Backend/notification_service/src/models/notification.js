// src/models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["INFO", "SUCCESS", "ERROR"],
      default: "INFO",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
