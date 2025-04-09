import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Briefcase,
  Filter,
} from "lucide-react";
import { JobContext } from "../store/JobContext";

function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected resume file
  const { getAllJobs, allJobs, applyForJob, setApplied, applied } =
    useContext(JobContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await getAllJobs();
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  console.log(allJobs);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleApplying = (jobId) => {
    if (selectedFile) {
      applyForJob(selectedFile, jobId); // Pass the file and job ID to the applyForJob function
    } else {
      alert("Please select a resume file before applying.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {allJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <div>Experience Required :</div>
                        <span>{job.minExperience} Years</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Apply Button */}
              <button
                onClick={() => handleApplying(job._id)} // Pass job._id to handleApplying
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
            {job.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full mt-4"
              >
                {skill}
              </span>
            ))}
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseJobs;
