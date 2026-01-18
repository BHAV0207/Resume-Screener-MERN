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
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();
connectProducer();

connectConsumer({
  [TOPICS.USER_REGISTERED]: async (data) => {
    console.log("📨 User registered:", data);
  },

  [TOPICS.RESUME_STATUS]: async (data) => {
    console.log("📨 Resume status update:", data);
  },
  [TOPICS.AI_ANALYSIS]: async (data) => {
    console.log("📨  Ai analysis of the recipient:", data);
  },
  [TOPICS.AI_ANALYSIS_BATCH]: async (data) => {
    console.log("📨  Ai analysis of the batch data:", data);
  },
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
