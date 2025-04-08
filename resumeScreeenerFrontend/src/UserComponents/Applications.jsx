import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

function Applications() {
  const applications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: '2024-03-10',
      status: 'accepted',
      logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=100&h=100&fit=crop',
      nextStep: 'Schedule onboarding call',
      feedback: 'Great technical skills and cultural fit',
    },
    {
      id: 2,
      position: 'UX Designer',
      company: 'DesignHub',
      appliedDate: '2024-03-12',
      status: 'pending',
      logo: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=100&h=100&fit=crop',
      nextStep: 'Technical interview scheduled for March 20',
      feedback: 'Portfolio review in progress',
    },
    {
      id: 3,
      position: 'Backend Engineer',
      company: 'StartupX',
      appliedDate: '2024-03-08',
      status: 'rejected',
      logo: 'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=100&h=100&fit=crop',
      nextStep: null,
      feedback: 'Looking for more experience with cloud infrastructure',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Accepted</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Rejected</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img src={application.logo} alt={application.company} className="h-12 w-12 rounded-lg" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{application.position}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{application.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Applied on {application.appliedDate}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusIcon(application.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {application.nextStep && (
                <div className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">Next Step: </span>
                  <span className="text-gray-600 dark:text-gray-400">{application.nextStep}</span>
                </div>
              )}
              <div className="text-sm">
                <span className="font-medium text-gray-900 dark:text-white">Feedback: </span>
                <span className="text-gray-600 dark:text-gray-400">{application.feedback}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;