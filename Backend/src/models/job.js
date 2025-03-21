const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [String],
    minExperience: Number,
    createdAt: { type: Date, default: Date.now },
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }], // Reference to resumes
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to admin
});

module.exports = mongoose.model("Job", JobSchema);
