const Job = require("../models/job");
const Resume = require("../models/resume");
const stringSimilarity = require("string-similarity");
const User = require("../models/user");
const sendEmail = require("../utils/emailService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const calculateResumeScore = require("../utils/resumeScoring");
const { sendMessage } = require("../kafka/producer");
const { TOPICS } = require("../kafka/topics");

// 1️⃣ Create a new job posting
const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      minExperience,
      company,
      location,
      salary,
    } = req.body;
    const adminId = req.user.userId;

    if (!title || !requiredSkills || requiredSkills.length === 0) {
      return errorResponse(
        res,
        "Title and at least one required skill are required.",
        400,
      );
    }

    const lowercaseSkills = requiredSkills.map((skill) => skill.toLowerCase());

    const job = new Job({
      title,
      description,
      requiredSkills: lowercaseSkills,
      minExperience: minExperience || 0,
      createdBy: adminId,
      company,
      location,
      salary,
    });

    await job.save();
    return successResponse(res, "Job created successfully", job, 201);
  } catch (error) {
    next(error);
  }
};

const getAllJobsByAdmin = async (req, res, next) => {
  try {
    const { createdBy } = req.params;
    const { active } = req.query;

    const isActive = active !== undefined ? active === "true" : undefined;
    const filter = { createdBy };
    if (isActive !== undefined) {
      filter.active = isActive;
    }

    const jobs = await Job.find(filter).populate("resumes").lean();

    return successResponse(res, "Jobs fetched successfully", jobs);
  } catch (error) {
    next(error);
  }
};

const getAllResumesByAdmin = async (req, res, next) => {
  try {
    const { createdBy } = req.params;

    const jobs = await Job.find({ createdBy }).select("resumes").lean();

    if (!jobs.length) {
      return successResponse(res, "No jobs found for this Admin", {
        totalResumes: 0,
        resumes: [],
      });
    }

    const allResumeIds = jobs.flatMap((job) => job.resumes);
    const resumes = await Resume.find({ _id: { $in: allResumeIds } });

    return successResponse(res, "Resumes fetched successfully", {
      totalResumes: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return successResponse(res, "Jobs fetched successfully", jobs);
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId).populate("resumes");

    if (!job) return errorResponse(res, "Job not found", 404);

    return successResponse(res, "Job fetched successfully", job);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { title, description, requiredSkills, minExperience, active } =
      req.body;
    const job = await Job.findById(req.params.jobId);

    if (!job) return errorResponse(res, "Job not found", 404);

    job.title = title || job.title;
    job.description = description || job.description;
    job.requiredSkills = requiredSkills
      ? requiredSkills.map((skill) => skill.toLowerCase())
      : job.requiredSkills;
    job.minExperience =
      minExperience !== undefined ? minExperience : job.minExperience;
    if (active !== undefined) job.active = active;

    await job.save();
    return successResponse(res, "Job updated successfully", job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return errorResponse(res, "Job not found", 404);

    await User.updateMany(
      { appliedJobs: job._id },
      { $pull: { appliedJobs: job._id } },
    );

    await job.deleteOne();
    return successResponse(res, "Job deleted successfully");
  } catch (error) {
    next(error);
  }
};

const processCandidate = async (req, res, next) => {
  try {
    const { jobId, resumeId, action } = req.body;
    const job = await Job.findById(jobId);
    const resume = await Resume.findById(resumeId);

    console.log(
      `data has been received: jobId=${jobId}, resumeId=${resumeId} , data=${resume.data}`,
    );

    if (!job || !resume)
      return errorResponse(res, "Job or Resume not found", 404);

    const isShortlisted = action === "shortlisted" || action === "shortlist";
    const subject = isShortlisted
      ? `🎉 Congratulations! You are shortlisted for ${job.title}`
      : `❌ Application Update - ${job.title}`;

    const message = isShortlisted
      ? `Dear ${resume.name},\n\nCongratulations! You have been shortlisted for ${job.title}.\n\nWe will reach out soon for further steps.`
      : `Dear ${resume.name},\n\nThank you for applying for ${job.title}. Unfortunately, we have decided to move forward with other candidates at this time.`;

    // await sendEmail(resume.email, subject, message);

    resume.status = isShortlisted ? "shortlisted" : "rejected";
    await resume.save();

    console.log(`Resume status updated to: ${resume.status}`);

    await sendMessage(TOPICS.RESUME_STATUS, {
      userType: "user",
      userId: resume.userId,
      jobId: jobId,
      resumeId: resumeId,
      status: resume.status,
      email: resume.email,
      subject: subject,
      message: message,
    });
    console.log("Kafka message sent successfully from controller");

    return successResponse(res, `Candidate ${action}ed successfully`);
  } catch (error) {
    next(error);
  }
};

const rankResumesForJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).populate("resumes");

    if (!job) {
      return errorResponse(res, "Job not found", 404);
    }

    if (!job.resumes || job.resumes.length === 0) {
      return errorResponse(res, "No resumes found for this job", 404);
    }

    const rankedResumes = await Promise.all(
      job.resumes.map(async (resume) => {
        const { finalScore, skillMatches, experienceScore } =
          calculateResumeScore(job, resume);

        resume.jobMatchScore = finalScore;
        await resume.save();

        return {
          resume,
          finalScore,
          skillMatches,
          experienceScore,
        };
      }),
    );

    rankedResumes.sort((a, b) => b.finalScore - a.finalScore);

    await sendMessage(TOPICS.AI_ANALYSIS_BATCH, {
      userType: "admin",
      adminId: job.createdBy,
      Subject: `AI analysis of resumes has been completed for the job ${job.title} at ${job.company}`,
      content: `heighest score is achieved by ${rankedResumes[0].name} , score achieved is ${rankedResumes[0].jobMatchScore}`,
    });

    return successResponse(res, "Resumes ranked successfully", {
      job,
      rankedResumes,
    });
  } catch (error) {
    next(error);
  }
};

const rankSingleResume = async (req, res, next) => {
  try {
    const { jobId, resumeId } = req.params;

    const job = await Job.findById(jobId);
    const resume = await Resume.findById(resumeId);

    if (!job || !resume) {
      return errorResponse(res, "Job or Resume not found", 404);
    }
    const { finalScore, skillMatches, experienceScore } = calculateResumeScore(
      job,
      resume,
    );
    console.log(resume);
    resume.jobMatchScore = finalScore;
    await resume.save();

    await sendMessage(TOPICS.AI_ANALYSIS, {
      userType: "admin",
      adminId: job.createdBy,
      applicantId: resume.userId,
      applicantEmail: resume.email,
      Subject: `AI analysis of ${resume.name} has been completed for the job ${job.title} at ${job.company}`,
      content: `score achieved is ${finalScore}`,
    });

    return successResponse(res, "Resume ranked successfully", {
      resume,
      finalScore,
      skillMatches,
      experienceScore,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  rankResumesForJob,
  rankSingleResume,
  processCandidate,
  getAllJobsByAdmin,
  getAllResumesByAdmin,
};
