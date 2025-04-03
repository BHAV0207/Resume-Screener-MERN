const Job = require("../models/job");
const Resume = require("../models/resume");
const stringSimilarity = require("string-similarity");
const User = require("../models/user")
const sendEmail = require("../utils/emailService");

// 1️⃣ Create a new job posting
const createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, minExperience , company , location , salary } = req.body;

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
      company,
      location,
      salary
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

const getAllResumesByAdmin = async (req, res) => {
  try {
    const { createdBy } = req.params; // Admin ID

    // Find all jobs created by the given admin
    const jobs = await Job.find({ createdBy }).select("resumes").lean();

    if (!jobs.length) {
      return res.status(404).json({ error: "No jobs found for this Admin" });
    }
    // Extract all resume IDs from the jobs
    const allResumeIds = jobs.flatMap(job => job.resumes);

    // Fetch all resumes from the database
    const resumes = await Resume.find({ _id: { $in: allResumeIds } });

    res.status(200).json({ totalResumes: resumes.length, resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
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
    const job = await Job.findById(req.params.jobId)
      .populate({
        path: "resumes",
        model: "Resume", // Ensure it refers to the correct model
      });

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

    const users = await User.find({ appliedJobs: job._id });

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.appliedJobs = user.appliedJobs.filter((jobId) => !jobId.equals(job._id));
      await user.save();
    }

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

      // Ensure resume.skills is an array
      if (!Array.isArray(resume.skills) || resume.skills.length === 0) {
        console.warn(`Skipping resume with empty or invalid skills:`, resume._id);
        return { resume, skillMatches, experienceScore, finalScore };
      }

      // Compare each required skill to resume skills
      job.requiredSkills.forEach((jobSkill) => {
        if (typeof jobSkill !== "string") {
          console.warn(`Skipping invalid jobSkill:`, jobSkill);
          return;
        }

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

    // Remove any undefined results
    rankedResumes = rankedResumes.filter((r) => r !== undefined);

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
  getAllResumesByAdmin
};
