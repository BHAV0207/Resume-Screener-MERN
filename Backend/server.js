require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5174" , "http://localhost:5173"]
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use("/api/resumes", require("./src/routes/resumeRoutes"));
app.use("/api/jobs" , require("./src/routes/jobRoutes"))
app.use("/api/user" , require("./src/routes/authRoutes"))

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
