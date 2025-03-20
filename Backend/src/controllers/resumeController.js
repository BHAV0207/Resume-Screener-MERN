const pdfParse = require("pdf-parse");
const axios = require("axios");
const stringSimilarity = require("string-similarity");
const Resume = require("../models/resume");
const skillData = require("../data/skills.json"); // Predefined skills list

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
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
      ); // Convert to lowercase
    } catch (error) {
      console.error("NLP API Error:", error);
    }

    // Convert predefined skills to lowercase
    const predefinedSkills = skillData.skills.map((skill) =>
      skill.toLowerCase()
    );
    let finalSkills = new Set(); // Using a Set to automatically remove duplicates

    extractedSkills.forEach((skill) => {
      // Find the best match in predefined skills
      let match = stringSimilarity.findBestMatch(skill, predefinedSkills);
      if (match.bestMatch.rating > 0.7) {
        // If similarity > 70%, use predefined skill
        finalSkills.add(predefinedSkills[match.bestMatchIndex]);
      } else {
        finalSkills.add(skill); // Otherwise, keep the NLP extracted skill
      }
    });

    // Add skills found directly in the resume using hardcoded matching
    predefinedSkills.forEach((skill) => {
      if (parsedText.includes(skill)) {
        finalSkills.add(skill);
      }
    });

    // Extract years of experience (e.g., "5 years experience")
    const experienceMatch = parsedText.match(/\b(\d+)\s+(years?)\b/i);
    const experience = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;

    // Save Resume
    const newResume = new Resume({
      name: req.body.name || "Unknown",
      email: req.body.email || "No Email",
      skills: Array.from(finalSkills), // Convert Set to Array
      experience,
      parsedText,
    });

    await newResume.save();
    res
      .status(201)
      .json({ message: "Resume uploaded successfully", data: newResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadResume };
