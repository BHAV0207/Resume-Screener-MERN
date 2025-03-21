const pdfParse = require("pdf-parse");
const axios = require("axios");
const stringSimilarity = require("string-similarity");
const Resume = require("../models/resume");
const Job = require("../models/job"); // Import the Job model
const skillData = require("../data/skills.json"); // Predefined skills list

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { name, email, jobId } = req.body; // Extract jobId from request body

    // Validate jobId
    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Extract text from PDF and convert to lowercase
    const data = await pdfParse(req.file.buffer);
    const parsedText = data.text.toLowerCase();

    // Call NLP API for skill extraction
    let extractedSkills = [];
    try {
      const nlpResponse = await axios.post(
        "http://localhost:8000/extract-skills/",
        { text: parsedText }
      );
      extractedSkills = nlpResponse.data.skills.map((skill) =>
        skill.toLowerCase()
      );
    } catch (error) {
      console.error("NLP API Error:", error);
    }

    // Convert predefined skills to lowercase
    const predefinedSkills = skillData.skills.map((skill) =>
      skill.toLowerCase()
    );
    let finalSkills = new Set();

    extractedSkills.forEach((skill) => {
      let match = stringSimilarity.findBestMatch(skill, predefinedSkills);
      if (match.bestMatch.rating > 0.7) {
        finalSkills.add(predefinedSkills[match.bestMatchIndex]);
      } else {
        finalSkills.add(skill);
      }
    });

    predefinedSkills.forEach((skill) => {
      if (parsedText.includes(skill)) {
        finalSkills.add(skill);
      }
    });

    // Extract years of experience
    const experienceMatch = parsedText.match(/\b(\d+)\s+(years?)\b/i);
    const experience = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;

    // Save Resume
    const newResume = new Resume({
      name: name || "Unknown",
      email: email || "No Email",
      skills: Array.from(finalSkills),
      experience,
      parsedText,
    });

    await newResume.save();

    // Add resume to the job's resumes array
    job.resumes.push(newResume._id);
    await job.save();

    res.status(201).json({
      message: "Resume uploaded successfully and linked to the job",
      data: newResume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadResume };
