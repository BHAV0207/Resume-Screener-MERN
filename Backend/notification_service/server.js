require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { connectProducer } = require("./src/kafka/producer");
const { connectConsumer } = require("./src/kafka/consumer");
const { TOPICS } = require("./src/kafka/topics");

const app = express();

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
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();
connectProducer();

// Initialize Consumer
connectConsumer(TOPICS.USER_REGISTERED, async (data) => {
  console.log("📨 Received notification data:", data);
  // Add notification logic here (e.g. sending email)
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Notification Service is running");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
