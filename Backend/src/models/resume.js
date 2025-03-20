const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
  name:String,
  email: String,
  skills: [String],
  experience: Number,
  jobMatchScore: Number,
  parsedText: String,
  createdAt: { type: Date, default: Date.now },
})