const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    minExperience: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true, index: true },
    company: { type: String, required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true }, // Fixed typo here
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }], // Reference to resumes
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to admin
});

module.exports = mongoose.model("Job", JobSchema);
