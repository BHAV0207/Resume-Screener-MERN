const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
  name:String,
  email: String,
  skills: [String],
  experience:{type: Number, default: 0},
  jobMatchScore: Number,
  parsedText: String,
  status:{type: String , enum:["evaluation" , "rejected" , "shortlisted"] , default:"evaluation"},
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Resume" ,ResumeSchema)