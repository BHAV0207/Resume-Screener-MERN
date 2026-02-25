require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./src/config/db");
const createEventBus = require("./src/EVENT-BUS/event-bus.factory");
const { TOPICS } = require("./src/events/topics");
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

// creating an instance of the eventbus class that we have created
const eventBus = createEventBus();

// message via the event bus
eventBus.subscribe(TOPICS.USER_REGISTERED, async (event) => {
  const data = event.data;
  console.log(data);
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
});

eventBus.subscribe(TOPICS.RESUME_STATUS, async (event) => {
  const data = event.data;
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
});

eventBus.subscribe(TOPICS.AI_ANALYSIS, async (event) => {
  const data = event.data;
  console.log(data);
  try {
    const notification = await notificationService.createNotification({
      userId: data.adminId,
      userType: "admin",
      title: data.subject,
      message: data.content,
      type: "INFO",
      metadata: {
        applicantId: data.applicantId,
        applicantEmail: data.applicantEmail,
      },
    });

    sendToUser(data.adminId, "notification", notification);
  } catch (error) {
    console.error("Error creating AI_ANALYSIS notification:", error);
  }
});

eventBus.subscribe(TOPICS.AI_ANALYSIS_BATCH, async (event) => {
  const data = event.data;
  console.log(data);
  try {
    const notification = await notificationService.createNotification({
      userId: data.adminId,
      userType: "admin",
      title: data.subject,
      message: data.content,
      type: "INFO",
      metadata: {},
    });

    sendToUser(data.adminId, "notification", notification);
  } catch (error) {
    console.error("Error creating AI_ANALYSIS_BATCH notification:", error);
  }
});

eventBus.subscribe(TOPICS.RESUME_UPLOAD, async (event) => {
  const data = event.data;
  console.log(data);
  try {
    const notification = await notificationService.createNotification({
      userId: data.adminId,
      userType: "admin",
      title: "New Job Application",
      message: `${data.name} has applied for a job`,
      type: "INFO",
      metadata: {
        userId: data.userId,
        jobId: data.jobId,
        name: data.name,
        email: data.email,
      },
    });

    sendToUser(data.adminId, "notification", notification);
  } catch (error) {
    console.error("Error creating RESUME_UPLOAD notification:", error);
  }
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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally: server.close(() => process.exit(1));
});
