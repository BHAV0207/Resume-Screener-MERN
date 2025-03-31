const express = require("express");
const { uploadResume  ,  shortlistedResumes , updateResume} = require("../controllers/resumeController");
const multer = require("multer");
const { authenticateJwtUser, authenticateJWT } = require("../middleware/auth");

const router = express.Router();

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), authenticateJwtUser,uploadResume);
router.put("/update/:resumeId" ,  authenticateJWT , updateResume )
router.get("/shortlisted/:adminId" , shortlistedResumes)
module.exports = router;
