const pdfParse = require("pdf-parse");
const Resume = require("../models/resume");
const Job = require("../models/job");
const User = require("../models/user");
const { extractResumeData } = require("../utils/aiService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const { name, email, jobId } = req.body;
    const userID = req.user.userId;

    const user = await User.findById(userID);
    if (!user) return errorResponse(res, "User not found", 404);

    if (!jobId) return errorResponse(res, "Job ID is required", 400);

    const job = await Job.findById(jobId);
    if (!job) return errorResponse(res, "Job not found", 404);

    // Prevent duplicate applications
    if (!user.appliedJobs.includes(jobId)) {
      user.appliedJobs.push(jobId);
      await user.save();
    } else {
      // Optional: Return error if already applied
      // return errorResponse(res, "You have already applied for this job", 400);
    }

    // Extract text from PDF
    const data = await pdfParse(req.file.buffer);
    const parsedText = data.text; // Better to keep original case for LLM

    console.log(`[Resume Controller] Extracted text size: ${parsedText.length}`);

    // Extract skills and experience using unified AI service
    const { skills, experience } = await extractResumeData(parsedText);

    const newResume = new Resume({
      userId: userID,
      name: name || user.name || "Unknown",
      email: email || user.email || "No Email",
      skills,
      experience,
      parsedText: parsedText.toLowerCase(), // Store lowercase for searching if needed
    });

    await newResume.save();

    job.resumes.push(newResume._id);
    await job.save();

    return successResponse(res, "Resume uploaded successfully and linked to the job", newResume, 201);
  } catch (err) {
    next(err);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { resumeId } = req.params;

    if (!status) return errorResponse(res, "Status is required", 400);

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { status },
      { new: true }
    );

    if (!updatedResume) return errorResponse(res, "Resume not found", 404);

    return successResponse(res, "Resume updated successfully", updatedResume);
  } catch (err) {
    next(err);
  }
};

const getResumesById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return errorResponse(res, "Resume not found", 404);

    const job = await Job.findOne({ resumes: id });
    if (!job) return errorResponse(res, "Job not found for this resume", 404);

    return successResponse(res, "Resume details fetched successfully", { resume, job });
  } catch (err) {
    next(err);
  }
};

const shortlistedResumes = async (req, res, next) => {
  try {
    const { adminId } = req.params;

    const jobs = await Job.find({ createdBy: adminId }).select("_id resumes");
    const resumeIds = jobs.flatMap(job => job.resumes);

    const resumes = await Resume.find({
      _id: { $in: resumeIds },
      status: "shortlisted",
    });

    return successResponse(res, "Shortlisted resumes fetched successfully", resumes);
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadResume, shortlistedResumes, updateResume, getResumesById };
