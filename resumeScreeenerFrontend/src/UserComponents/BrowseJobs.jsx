import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Clock, Briefcase, Filter } from 'lucide-react';

function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      posted: '2 days ago',
      logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=100&h=100&fit=crop',
      description: 'We are looking for an experienced Frontend Developer to join our team...',
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$90k - $120k',
      type: 'Full-time',
      posted: '1 day ago',
      logo: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=100&h=100&fit=crop',
      description: 'Join our design team to create beautiful and intuitive user experiences...',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'StartupX',
      location: 'New York, NY',
      salary: '$130k - $160k',
      type: 'Full-time',
      posted: '3 days ago',
      logo: 'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=100&h=100&fit=crop',
      description: 'Looking for a skilled Backend Engineer to help scale our infrastructure...',
    },
  ];

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
        {jobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-lg" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h2>
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
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseJobs;