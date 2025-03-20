const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    requiredSkills: [String],
    minExperience: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
