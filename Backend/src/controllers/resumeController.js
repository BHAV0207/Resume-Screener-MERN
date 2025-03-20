const pdfParse = require("pdf-parse");
const axios = require("axios");
const Resume = require("../models/resume");

const uplaodResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);
    const parsedText = data.text.toLowerCase();

    const nlpResponse = await axios.post(
      "http://localhost:8000/extract-skills/",
      {
        text: parsedText,
      }
    );

    const extractedSkills = nlpResponse.data.skills;

    const experienceMatch = parsedText.match(/\b(\d+)\s+(years?)\b/i);
    const experience = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;

    const newResume = new Resume({
      name: req.body.name || "Unknown",
      email: req.body.email || "No Email",
      skills: extractedSkills,
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
