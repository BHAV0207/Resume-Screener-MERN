import { BriefcaseIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { JobContext } from "../store/JobContext";
import { ThemeContext } from "../store/ThemeContext"; // Import ThemeContext

function PostJobs() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleJobCount } = useContext(JobContext);
  const { isDarkMode } = useContext(ThemeContext); // Accessing theme context

  const handleSkillsArray = (e) => {
    let input = e.target.value;
    setSkills(input);

    const skillsList = input
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    setSkillsArray(skillsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!title) formErrors.title = "Title is required";
    if (!company) formErrors.company = "Company name is required";
    if (!salary) formErrors.salary = "Salary is required";
    if (!location) formErrors.location = "Location is required";
    if (skillsArray.length === 0)
      formErrors.skills = "At least one skill is required";
    if (!description) formErrors.description = "Description is required";

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError({ submit: "Authentication token not found." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        `https://resume-screener-mern-1.onrender.com/api/jobs/create`,
        {
          title,
          description,
          requiredSkills: skillsArray,
          minExperience: experience,
          company,
          location,
          salary,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      handleJobCount();
      setIsSubmitting(false);
      console.log(res.data);
    } catch (err) {
      setIsSubmitting(false);
      console.error(err);
      setError({ submit: "Failed to post job, please try again." });
    }
  };

  return (
    <div
      className={`max-w-full h-[100vh] mx-auto p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3 mb-8">
        <BriefcaseIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Post a New Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`shadow-md rounded-lg p-6 space-y-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="e.g., Senior Software Engineer"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="e.g., Tech Corp"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="e.g., New York, NY"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium">
              Salary Range *
            </label>
            <input
              type="text"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="e.g., $80,000 - $120,000"
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>

          {/* Required Skills */}
          <div>
            <label
              htmlFor="requiredSkills"
              className="block text-sm font-medium"
            >
              Required Skills *
            </label>
            <input
              type="text"
              id="requiredSkills"
              value={skills}
              onChange={handleSkillsArray}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="e.g., React, Node.js, TypeScript (comma-separated)"
            />
            {errors.skills && (
              <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
            )}
          </div>

          {/* Minimum Experience */}
          <div>
            <label
              htmlFor="minExperience"
              className="block text-sm font-medium"
            >
              Minimum Experience (years)
            </label>
            <input
              type="number"
              id="minExperience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              min="0"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Job Description *
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="Enter detailed job description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostJobs;
