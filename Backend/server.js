require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://resume-screener-mern-1.onrender.com",
      "https://cozy-horse-11712e.netlify.app", // ✅ Add this
    ],
    credentials: true, // ✅ Allow cookies & auth headers if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./src/middleware/errorHandler");

// Connect to Database
connectDB();

// Routes
app.use("/api/resumes", require("./src/routes/resumeRoutes"));
app.use("/api/jobs", require("./src/routes/jobRoutes"));
app.use("/api/user", require("./src/routes/authRoutes"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
