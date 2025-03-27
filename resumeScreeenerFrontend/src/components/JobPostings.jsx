import React from "react";

const jobData = [
  { id: 1, title: "Software Engineer", company: "Google", applicants: 12 },
  { id: 2, title: "Backend Developer", company: "Amazon", applicants: 8 },
];

function JobPostings() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Job Postings</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {jobData.map((job) => (
          <div key={job.id} className="p-3 border-b">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">
              Applicants: {job.applicants}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobPostings;
