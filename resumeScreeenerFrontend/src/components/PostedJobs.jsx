import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../store/JobContext";
import { ThemeContext } from "../store/ThemeContext"; // Import ThemeContext

const PostedJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(TrendingUp);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const { totalJobs, handleJobCount, deleteJob, getJobById, job, updateJob } =
    useContext(JobContext);
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  useEffect(() => {
    handleJobCount();
  }, []);

  const handleApplicants = async (jobId) => {
    await getJobById(jobId);
  };

  useEffect(() => {
    // Navigate only after the job data has been updated
    if (job) {
      navigate(`/admin/posted-jobs/${job._id}`);
    }
  }, [job]);

  const handleToggle = (job) => {
    setSelectedJobId(job._id);
    setUpdatedTitle(job.title);
    setUpdatedDescription(job.description);
    setUpdatedStatus(job.active ? true : false); // optional
    setUpdateToggle(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
      active: updatedStatus,
    };

    await updateJob(selectedJobId, updatedData);
    setUpdateToggle(false);
    setSelectedJobId(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedStatus("active");
    handleJobCount(); // Refresh job list
  };

  const filteredJobs = (totalJobs || []).filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      className={`p-6 h-[100vh] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Posted Jobs</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => navigate("/admin/post-jobs")}
        >
          + Post New Job
        </button>
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
            placeholder="Search jobs..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800 text-white"
                : "border-gray-300 bg-gray-50"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <select
            className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800 text-white"
                : "border-gray-300 bg-gray-50"
            }`}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <th className="text-left py-3 px-4">Job Title</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Posted Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Applicants</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <tr
                key={job._id}
                className={`border-b ${
                  isDarkMode ? "border-gray-800" : "border-gray-100"
                } hover:${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <td className="py-3 px-4">{job.title}</td>
                <td className="py-3 px-4">{job.location}</td>
                <td className="py-3 px-4 overflow-hidden max-h-16 line-clamp-3">
                  {job.description}
                </td>
                <td className="py-3 px-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.active ? "Active" : "Closed"}
                  </span>
                </td>
                <td
                  onClick={() => handleApplicants(job._id)}
                  className="py-3 px-4 cursor-pointer hover:bg-gray-200 rounded-3xl"
                >
                  {job.resumes.length}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-orange-300 dark:hover:bg-amber-700 rounded-full"
                      onClick={() => handleToggle(job)}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-200 dark:hover:bg-red-700 rounded-full"
                      title="Delete"
                      onClick={() => deleteJob(job._id)}
                    >
                      <Trash2
                        size={18}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of{" "}
          {filteredJobs.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {updateToggle && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
          onClick={() => setUpdateToggle(!updateToggle)}
        >
          <div
            className="w-1/2 h-2/3 bg-white transition-all duration-300 rounded-lg shadow-lg  justify-center p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-1 right-1"
              onClick={() => setUpdateToggle(!updateToggle)}
            >
              <XCircle></XCircle>
            </div>
            <div className="w-full h-full p-6 bg-white rounded-xl shadow-md">
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter job title"
                    type="text"
                    className="border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter job description"
                    rows={4}
                    className="border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Status
                  </label>
                  <select
                    id="status"
                    className="border border-gray-300 rounded-md w-full px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                  >
                    <option value="true">Active</option>
                    <option value="false">Closed</option>
                  </select>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium py-2 rounded-md">
                  Update Job
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
