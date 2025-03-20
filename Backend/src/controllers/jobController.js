const Job = require("../models/job");
const Resume = require("../models/resume");
const stringSimilarity = require("string-similarity");

// 1️⃣ Create a new job posting
const createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, minExperience } = req.body;

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
    });
    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
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
    const { title, description, requiredSkills, minExperience } = req.body;
    const job = await Job.findById(req.params.jobId);

    if (!job) return res.status(404).json({ error: "Job not found" });

    job.title = title || job.title;
    job.description = description || job.description;
    job.requiredSkills = requiredSkills
      ? requiredSkills.map((skill) => skill.toLowerCase())
      : job.requiredSkills;
    job.minExperience = minExperience || job.minExperience;

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

const rankResumesForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Get all resumes from the database
    const resumes = await Resume.find();
    if (!resumes.length)
      return res.status(404).json({ error: "No resumes found" });

    // Score each resume
    let rankedResumes = resumes.map((resume) => {
      let skillMatches = 0;
      let experienceScore = 0;

      // Compare each required skill to resume skills
      job.requiredSkills.forEach((jobSkill) => {
        const match = stringSimilarity.findBestMatch(jobSkill, resume.skills);
        if (match.bestMatch.rating > 0.7) {
          // 70% match threshold
          skillMatches++;
        }
      });

      // Experience Score
      if (resume.experience >= job.minExperience) {
        experienceScore =
          Math.min(resume.experience / job.minExperience, 1) * 10;
      }

      // Final Score (70% skills, 30% experience)
      let finalScore =
        (skillMatches / job.requiredSkills.length) * 70 + experienceScore * 0.3;

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
  rankResumesForJob
};
