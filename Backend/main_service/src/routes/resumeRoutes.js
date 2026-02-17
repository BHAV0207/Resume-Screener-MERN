const express = require("express");
const { uploadResume  ,  shortlistedResumes , updateResume, getResumesById, getAllResumesByUserID} = require("../controllers/resumeController");
const multer = require("multer");
const { authenticateJwtUser, authenticateJWT } = require("../middleware/auth");

const router = express.Router();

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), authenticateJwtUser,uploadResume);
router.put("/update/:resumeId" ,  authenticateJWT , updateResume )
router.get("/shortlisted/:adminId" , shortlistedResumes)
router.get("/:id", getResumesById);

//user-side resume routes
router.get("/resumeByUserId/:userId" , getAllResumesByUserID)

module.exports = router;
