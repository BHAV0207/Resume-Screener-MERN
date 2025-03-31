const pdfParse = require("pdf-parse");
const Resume = require("../models/resume");
const Job = require("../models/job");
const User = require("../models/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractedSkillsWithLLM = async (parsedText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    Extract key technical and soft skills from the following resume text. 
    Provide ONLY a JSON response in this format: 
    { "skills": ["skill1", "skill2", "skill3", ...] }.
    
    Resume Text: "${parsedText}"
  `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{.*\}/s); // Find JSON block
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from Gemini API");
    }

    return JSON.parse(jsonMatch[0]).skills || [];
  } catch (error) {
    console.error("LLM Skill Extraction Error:", error);
    return [];
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { name, email, jobId } = req.body;
    const userID = req.user.userId;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Prevent duplicate applications
    if (!user.appliedJobs.includes(jobId)) {
      user.appliedJobs.push(jobId);
      await user.save();
    }

    // Extract text from PDF
    const data = await pdfParse(req.file.buffer);
    const parsedText = data.text.toLowerCase();

    // Extract skills using Gemini LLM
    const extractedSkills = await extractedSkillsWithLLM(parsedText);

    // Save Resume
    const newResume = new Resume({
      name: name || "Unknown",
      email: email || "No Email",
      skills: extractedSkills,
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
    console.error("Error uploading resume:", err.message, err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadResume };
