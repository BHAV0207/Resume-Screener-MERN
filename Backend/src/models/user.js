const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["user", "admin"], default: "user" },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // List of applied jobs
});

module.exports = mongoose.model("User", UserSchema);
