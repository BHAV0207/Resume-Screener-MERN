require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { connectProducer } = require("./src/kafka/producer");
const { connectConsumer } = require("./src/kafka/consumer");
const { TOPICS } = require("./src/kafka/topics");
const {
  initializeSocket,
  sendToUser,
} = require("./src/websocket/socketManager");
const notificationService = require("./src/services/notificationService");
const notificationRoutes = require("./src/routes/notification.routes");

const app = express();

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize WebSocket
initializeSocket(server);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://resume-screener-mern-1.onrender.com",
      "https://cozy-horse-11712e.netlify.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();
connectProducer();

// Kafka Consumer Handlers - Create DB entries and emit real-time notifications
connectConsumer({
  [TOPICS.USER_REGISTERED]: async (data) => {
    console.log("📨 User registered:", data);
    try {
      const notification = await notificationService.createNotification({
        userId: data.userId,
        userType: data.userType || "user",
        title: "🎉 Welcome!",
        message: `Hello ${data.name}! Your account has been created successfully.`,
        type: "SUCCESS",
        metadata: { email: data.email },
      });

      sendToUser(data.userId, "notification", notification);
    } catch (error) {
      console.error("Error creating user registered notification:", error);
    }
  },

  [TOPICS.RESUME_STATUS]: async (data) => {
    console.log("📨 Resume status update:", data);
    try {
      const notification = await notificationService.createNotification({
        userId: data.userId,
        userType: "user",
        title: data.subject,
        message: data.message,
        type: data.status === "shortlisted" ? "SUCCESS" : "INFO",
        metadata: {
          jobId: data.jobId,
          resumeId: data.resumeId,
          status: data.status,
        },
      });

      sendToUser(data.userId, "notification", notification);
    } catch (error) {
      console.error("Error creating resume status notification:", error);
    }
  },

  [TOPICS.AI_ANALYSIS]: async (data) => {
    console.log("📨 AI analysis of the recipient:", data);
    try {
      const notification = await notificationService.createNotification({
        userId: data.adminId,
        userType: "admin",
        title: data.Subject,
        message: data.content,
        type: "INFO",
        metadata: {
          applicantId: data.applicantId,
          applicantEmail: data.applicantEmail,
        },
      });

      sendToUser(data.adminId, "notification", notification);
    } catch (error) {
      console.error("Error creating AI analysis notification:", error);
    }
  },

  [TOPICS.AI_ANALYSIS_BATCH]: async (data) => {
    console.log("📨 AI analysis of the batch data:", data);
    try {
      const notification = await notificationService.createNotification({
        userId: data.adminId,
        userType: "admin",
        title: data.Subject,
        message: data.content,
        type: "INFO",
        metadata: {},
      });

      sendToUser(data.adminId, "notification", notification);
    } catch (error) {
      console.error("Error creating AI batch analysis notification:", error);
    }
  },

  [TOPICS.RESUME_UPLOAD]: async (data) => {
    console.log("📨 candidate has applied for job: ", data);
    try {
      const notification = await notificationService.createNotification({
        userId: data.adminId,
        userType: "admin",
        title: "applied for a the job",
        message: "user applied for job",
        type: "INFO",
        metadata: {
          userId: data.userId ,
          jobId: data.jobId,
          name: data.name,
          email: data.email,
        },
      });
      sendToUser(data.adminId, "notification", notification);
    } catch (err) {
      console.error("Error creating resume uplaod notification:", err);
    }
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Notification Service is running");
});

app.use("/api/notifications", notificationRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});
