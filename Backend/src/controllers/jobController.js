const Job = require("../models/job");
const Resume = require("../models/resume");
const stringSimilarity = require("string-similarity");
const sendEmail = require("../utils/emailService");

// 1️⃣ Create a new job posting
const createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, minExperience } = req.body;

    const adminId = req.user.userId; // Assuming `req.user` contains the authenticated admin's ID

    if (!title || !requiredSkills || requiredSkills.length === 0) {
      return res
        .status(400)
        .json({ error: "Title and at least one required skill are required." });
    }

    const lowercaseSkills = requiredSkills.map((skill) => skill.toLowerCase());

    const job = new Job({
      title,
      description,
      requiredSkills: lowercaseSkills,
      minExperience: minExperience || 0,
      createdBy: adminId, // Store the admin who created the job
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllJobsByAdmin = async (req, res) => {
  try {
    const { createdBy } = req.params;
    const { active } = req.query;

    const isActive = active !== undefined ? active === "true" : undefined;

    const filter = { createdBy: createdBy };
    if (isActive !== undefined) {
        filter.active = isActive;
    }

     const jobs = await Job.find(filter).populate("resumes").lean();

    if (jobs.length === 0) {
      return res.status(404).json({ error: "No jobs found for this Admin" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, minExperience , active} = req.body;
    const job = await Job.findById(req.params.jobId);

    if (!job) return res.status(404).json({ error: "Job not found" });

    job.title = title || job.title;
    job.description = description || job.description;
    job.requiredSkills = requiredSkills
      ? requiredSkills.map((skill) => skill.toLowerCase())
      : job.requiredSkills;
    job.minExperience = minExperience || job.minExperience;
    if (active !== undefined) job.active = active;

    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const processCandidate = async (req, res) => {
  try {
    const { jobId, resumeId, action } = req.body; // action = "shortlist" or "reject"
    const job = await Job.findById(jobId);
    const resume = await Resume.findById(resumeId);

    if (!job || !resume)
      return res.status(404).json({ error: "Job or Resume not found" });

    const subject =
      action === "shortlist"
        ? `🎉 Congratulations! You are shortlisted for ${job.title}`
        : `❌ Thank you for applying - ${job.title}`;

    const message =
      action === "shortlist"
        ? `Dear ${resume.name},\n\nCongratulations! You have been shortlisted for ${job.title}.\n\nWe will reach out soon for further steps.`
        : `Dear ${resume.name},\n\nThank you for applying for ${job.title}. Unfortunately, we have decided to move forward with other candidates.`;

    await sendEmail(resume.email, subject, message);
    res.status(200).json({ message: `Candidate ${action}ed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rankResumesForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find the job and populate the resumes
    const job = await Job.findById(jobId).populate("resumes");

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const resumes = job.resumes;

    if (!resumes.length) {
      return res.status(404).json({ error: "No resumes found for this job" });
    }

    // Score each resume
    let rankedResumes = resumes.map((resume) => {
      let skillMatches = 0;
      let experienceScore = 0;
      let finalScore = 0;

      // Compare each required skill to resume skills
      job.requiredSkills.forEach((jobSkill) => {
        const match = stringSimilarity.findBestMatch(jobSkill, resume.skills);
        if (match.bestMatch.rating > 0.7) {
          skillMatches++;
        }
      });

      // Experience Score Calculation (Avoid undefined values)
      if (resume.minExperience) {
        if (resume.experience >= job.minExperience) {
          experienceScore = Math.min(resume.experience / job.minExperience, 1) * 10;
        }
      }
      // Final Score Calculation (Avoid division by zero)
      let skillScore =
        job.requiredSkills.length > 0
          ? (skillMatches / job.requiredSkills.length) * 70
          : 0;

      finalScore = skillScore + experienceScore * 0.3;
      return { resume, skillMatches, experienceScore, finalScore };
    });

    // Sort resumes by highest score
    rankedResumes.sort((a, b) => b.finalScore - a.finalScore);

    res.json({ job, rankedResumes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  rankResumesForJob,
  processCandidate,
  getAllJobsByAdmin,
};
