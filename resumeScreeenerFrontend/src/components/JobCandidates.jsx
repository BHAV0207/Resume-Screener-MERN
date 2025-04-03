import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { JobContext } from '../store/JobContext';

function JobCandidates() {
  const { job } = useContext(JobContext);
  const [resumeARR, setResumeARR] = useState([]); // Store resume details in state

  // Fetch resume details only when the job object is available
  useEffect(() => {
    const fetchResumeDetails = async () => {
      if (job?.resumes?.length > 0) {
        try {
          // Fetch all resume details for each resume ID in job.resumes
          const resumeDetailsPromises = job.resumes.map((resumeId) =>
            axios.get(`https://your-backend-url/api/resumes/${resumeId}`)
          );
          // Wait for all the resume details to be fetched
          const results = await Promise.all(resumeDetailsPromises);
          // Extract the resume data from the responses
          const fetchedDetails = results.map((res) => res.data);
          setResumeARR(fetchedDetails); // Store the fetched data in state
          console.log('Fetched resume details:', fetchedDetails);
        } catch (error) {
          console.error('Error fetching resume details:', error);
        }
      }
    };

    // Run the fetch only if job is available
      fetchResumeDetails();
  }, [job]); // Only trigger when `job` changes


  // // Loading state while the job is being fetched
  // if (!job) return <div>Loading job...</div>;

  // // If resume details are not available yet
  // if (resumeARR.length === 0) return <div>Loading candidate details...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-gray-700 mt-2">{job.description}</p>
        <p className="text-gray-600 mt-2">Company: <strong>{job.company}</strong></p>
        <p className="text-gray-600">Location: <strong>{job.location}</strong></p>
        <p className="text-gray-600">Salary: <strong>${job.salary}</strong></p>
        <p className="text-gray-600">Required Experience: <strong>{job.minExperience} years</strong></p>
        <p className="text-gray-600">Required Skills: <strong></strong></p>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">Candidates</h2>
        {resumeARR.length > 0 ? (
          resumeARR.map((candidate, index) => (
            <div key={candidate.resume._id} className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">{candidate.resume.name}</h3>
              <p className="text-gray-600">Email: {candidate.resume.email}</p>
              <p className="text-gray-600">Experience: {candidate.resume.experience} years</p>
              <p className="text-gray-600 mt-2"><strong>Status:</strong> {candidate.resume.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-4">No candidates have applied yet.</p>
        )}
      </div>
    </div>
  );
}

export default JobCandidates;
