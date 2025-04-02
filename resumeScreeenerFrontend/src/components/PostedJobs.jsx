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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../store/JobContext";

const PostedJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { totalJobs, activeJobs, handleJobCount, deleteJob } =
    useContext(JobContext);

  useEffect(() => {
    handleJobCount();
  }, []);

  console.log(totalJobs);
  // Sample data - replace with actual data from your backend
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      postedDate: "2024-03-15",
      status: "active",
      applicants: 45,
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York",
      type: "Full-time",
      postedDate: "2024-03-14",
      status: "closed",
      applicants: 32,
    },
    // Add more sample jobs...
  ];

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
    <div className="bg-white dark:bg-gray-900 shadow-lg p-6 h-[100vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Posted Jobs
        </h1>
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500 dark:text-gray-400" />
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
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
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Job Title
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Location
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Description
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Posted Date
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Applicants
              </th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  {job.location}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 overflow-hidden max-h-16 line-clamp-3">
                  {job.description}
                </td>

                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.active === true
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {job.active ? "Active" : "Closed"}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  {job.resumes.length}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {/* <button
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      title="Edit"
                    >
                      <Edit2
                        size={18}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </button> */}
                    <button
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
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
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of{" "}
          {filteredJobs.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          >
            <ChevronLeft
              size={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          >
            <ChevronRight
              size={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;
