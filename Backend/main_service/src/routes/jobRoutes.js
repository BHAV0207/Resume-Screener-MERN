const express = require("express");
const { 
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob, 
  rankResumesForJob,
  processCandidate,
  getAllJobsByAdmin,
  getAllResumesByAdmin,
  rankSingleResume
} = require("../controllers/jobController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

// Job CRUD Operations
router.post("/create", authenticateJWT, createJob);         
router.get("/", getAllJobs);  
router.get("/job/:jobId", getJobById);         
router.put("/:jobId",authenticateJWT, updateJob);
router.delete("/:jobId",authenticateJWT, deleteJob);  

// Resume Ranking
router.get("/:jobId/rank-resumes", rankResumesForJob);
router.get("/:jobId/rank-resume/:resumeId", rankSingleResume);
router.post("/process", processCandidate); // Shortlist or reject candidates

router.get("/:createdBy/resumes", authenticateJWT , getAllResumesByAdmin)  
router.get("/:createdBy", authenticateJWT , getAllJobsByAdmin)  

module.exports = router;
