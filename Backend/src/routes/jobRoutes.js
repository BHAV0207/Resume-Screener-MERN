const express = require("express");
const { createJob} = require("../controllers/jobController");

const router = express.Router();

// Route to create a job
router.post("/create", createJob);

// Route to rank resumes for a job
// router.get("/:jobId/rank-resumes", rankResumesForJob);

module.exports = router;
