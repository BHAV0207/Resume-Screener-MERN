import React, { useState, useContext, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Clock,
  ThumbsUp,
  ThumbsDown,
  XCircle,
} from "lucide-react";
import { JobContext } from "../store/JobContext";
import { ThemeContext } from "../store/ThemeContext"; // Import ThemeContext

const AllResumes = () => {
  const { allResume, handleResumesCount } = useContext(JobContext);
  const { isDarkMode } = useContext(ThemeContext); // Access the isDarkMode state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedResume, setSelectedResume] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    handleResumesCount();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      evaluation:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      shortlisted:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      statusColors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const filteredResumes = allResume?.filter((resume) => {
    const matchesSearch =
      resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      filterStatus === "all" || resume.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ResumeDetailView = ({ resume }) => (
    <div className=" p-5 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4`}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {resume.name}
            </h2>
            <div
              className={`flex items-center gap-4 mt-2 text-gray-600 ${
                isDarkMode ? "dark:text-gray-300" : "text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{resume.email}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  resume.status
                )}`}
              >
                {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsDetailView(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-300"
            } mb-3`}
          >
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Text */}
        <div className="mb-6">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-400"
            } mb-3`}
          >
            Resume Content
          </h3>
          <div
            className={`bg-gray-50 ${
              isDarkMode ? "dark:bg-gray-900" : "dark:bg-gray-200"
            } p-4 rounded-lg`}
          >
            <pre
              className={`whitespace-pre-wrap text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              } font-mono`}
            >
              {resume.parsedText}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <Download size={18} />
            Download Resume
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Mail size={18} />
            Contact Candidate
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`bg-white h-[100vh] ${
        isDarkMode ? "dark:bg-gray-900" : "bg-white"
      }  shadow-lg p-12`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          All Resumes
        </h1>
        <p
          className={`text-gray-600 ${
            isDarkMode ? "dark:text-gray-400" : "text-gray-400"
          }`}
        >
          Manage and review all submitted resumes
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, email, or skills..."
            className={`w-full pl-10 pr-4 py-2 border ${
              isDarkMode
                ? "border-gray-700 dark:bg-gray-800 dark:text-white"
                : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-indigo-500`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500 dark:text-gray-400" />
          <select
            className={`border ${
              isDarkMode
                ? "border-gray-700 dark:bg-gray-800 dark:text-white"
                : "border-gray-300"
            } rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500`}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="evaluation">In Evaluation</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResumes?.map((resume) => (
          <div
            key={resume._id}
            className={`bg-white ${
              isDarkMode ? "dark:bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {resume.name}
                </h2>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {resume.email}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  resume.status
                )}`}
              >
                {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
              </span>
            </div>

            {/* Skills Preview */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {resume.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {resume.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                    +{resume.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} className="inline mr-1" />
                {new Date(resume.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedResume(resume);
                    setIsDetailView(true);
                  }}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  title="Shortlist"
                >
                  <ThumbsUp size={18} />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  title="Reject"
                >
                  <ThumbsDown size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View Modal */}
      {isDetailView && selectedResume && (
        <ResumeDetailView resume={selectedResume} />
      )}
    </div>
  );
};

export default AllResumes;
