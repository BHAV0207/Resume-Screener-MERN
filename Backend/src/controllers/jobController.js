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

    const lowercaseSkills = requiredSkills.map(skill => skill.toLowerCase());

    const job = new Job({
      title,
      description,
      requiredSkills : lowercaseSkills,
      minExperience: minExperience || 0,
    });
    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createJob };
