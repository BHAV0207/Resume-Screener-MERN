import React, { useState, useContext } from 'react';
import { Search, MapPin, DollarSign, Briefcase, Clock, Calendar, Users, Share2 } from 'lucide-react';
import { ThemeContext } from '../store/ThemeContext'; // Adjust path as needed

const ActiveJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useContext(ThemeContext); // Get current theme state

  // Sample data
  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
      experience: "5+ years",
      postedDate: "2 days ago",
      applicants: 45,
      description:
        "We are looking for an experienced Frontend Developer to join our team...",
      requirements: [
        "Strong experience with React and modern JavaScript",
        "Experience with state management (Redux, Context API)",
        "Understanding of modern web technologies and best practices",
      ],
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Creative Studios",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      experience: "3+ years",
      postedDate: "1 week ago",
      applicants: 32,
      description:
        "Seeking a talented UX Designer to create amazing user experiences...",
      requirements: [
        "Portfolio demonstrating UX/UI design skills",
        "Experience with Figma and design systems",
        "Strong understanding of user-centered design principles",
      ],
    },
    // Add more sample jobs...
  ];

  const filteredJobs = activeJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-5 bg-white ${isDarkMode ? 'dark:bg-gray-900' : 'dark:bg-gray-100'} min-h-screen`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Active Job Listings
        </h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Browse through currently active job positions
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by job title or company..."
          className={`w-full pl-10 pr-4 py-3 border ${isDarkMode ? 'border-gray-700 dark:bg-gray-800 dark:text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className={`bg-white ${isDarkMode ? 'dark:bg-gray-800' : 'dark:bg-gray-100'} rounded-lg shadow-lg p-6 border ${isDarkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
            {/* Job Details */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {job.title}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  {job.company}
                </p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Apply Now
              </button>
            </div>

            {/* Job Details (Location, Salary, etc.) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-gray-400" />
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-gray-400" />
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.experience}</span>
              </div>
            </div>

            {/* Description */}
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              {job.description}
            </p>

            {/* Footer (Posted Date, Applicants) */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.postedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.applicants} applicants</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Share2 size={18} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveJobs;
