const express = require("express");
const { 
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob, 
  rankResumesForJob,
  processCandidate
} = require("../controllers/jobController");

const router = express.Router();

// Job CRUD Operations
router.post("/create", createJob);         
router.get("/", getAllJobs);      
router.get("/:jobId", getJobById);         
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);       
// Resume Ranking
router.get("/:jobId/rank-resumes", rankResumesForJob);
router.post("/process", processCandidate); // Shortlist or reject candidates


module.exports = router;
