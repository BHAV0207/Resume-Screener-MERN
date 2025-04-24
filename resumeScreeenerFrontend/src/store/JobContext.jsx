import axios from "axios";
import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [totalJobs, setTotalJobs] = useState(null);
  const [activeJobs, setActiveJobs] = useState(null);
  const [resumes, setResumes] = useState(null);
  const [allResume, setAllResume] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [job , setJob] = useState("");
  const [allJobs , setAllJobs] = useState([]);
  const [applied, setApplied] = useState(false);

  const handleJobCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/jobs/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const res = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/jobs/${user.id}?active=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const activeJobsCount = res.data;
      const jobCount = response.data;

      console.log(jobCount);
      console.log(activeJobsCount);

      setTotalJobs(jobCount);
      setActiveJobs(activeJobsCount);
    } catch (err) {
      console.error("Error fetching job count:", err);
    }
  };

  const handleResumesCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/jobs/${user.id}/resumes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResumes(response.data);
      setAllResume(response.data.resumes);
    } catch (err) {
      console.error("Error fetching resumes count:", err);
    }
  };

  const shortlistedResumes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/resumes/shortlisted/${user.id}`
      );
      console.log(response.data);
      setShortlisted(response.data.shortlistedResumes);
    } catch (err) {
      console.error("Error fetching shortlisted Resumes count:", err);
    }
  };

  // const getJobById = async (jobId) => {
  //   try{
  //     const response = await axios.get(`https://resume-screener-mern-1.onrender.com/api/jobs/${jobId}`)
  //   }catch(err){

  //   }
  // }

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const res = await axios.delete(
        `https://resume-screener-mern-1.onrender.com/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleJobCount();
      console.log(res.data);
    } catch (err) {
      console.error("Error deleting Job", err);
    }
  };

  const updateJob = async (jobId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
  
      const res = await axios.put(
        `https://resume-screener-mern-1.onrender.com/api/jobs/${jobId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      handleJobCount();
      console.log(res.data);
    } catch (err) {
      console.error("Error updating Job", err);
    }
  };
  

  const getJobById = async (jobId) => {
    try {
      const res = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/jobs/job/${jobId}`
      );
      setJob(res.data); // Set the job data in the state
    } catch (err) {
      console.error("Error fetching job by ID:", err);
    }
  };

  const getAllJobs = async () => {
    try{
      const res = await axios.get(
        `https://resume-screener-mern-1.onrender.com/api/jobs`
      );
      setAllJobs(res.data);
    }
    catch(err){
      console.error("Error fetching all jobs:", err);
    }
  } 


const applyForJob = async (file, jobId) => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    if (!user?.id) {
      console.error("User ID not found in localStorage");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('resume', file);  // Resume file
    formData.append('name', user.name || "Unknown");  // Name
    formData.append('email', user.email || "No Email");  // Email
    formData.append('jobId', jobId);  // Job ID

    // Send request to backend
    const response = await axios.post("https://resume-screener-mern-1.onrender.com/api/resumes/upload", formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Set Content-Type for file upload
      }
    });

    if (response.status === 201) {
      console.log('Resume uploaded successfully:', response.data);
      alert('Job application submitted successfully!');
      setApplied(true);
    } else {
      console.error('Error submitting resume:', response.data.error);
      alert(`Error: ${response.data.error}`);
    }
  } catch (err) {
    console.error("Error applying for job:", err.message);
    alert('There was an error submitting your application.');
  }
};

  
  return (
    <JobContext.Provider
      value={{
        setActiveJobs,
        setTotalJobs,
        totalJobs,
        activeJobs,
        handleJobCount,
        handleResumesCount,
        setResumes,
        resumes,
        allResume,
        shortlistedResumes,
        shortlisted,
        deleteJob,
        updateJob,
        getJobById,
        job,
        getAllJobs,
        allJobs,
        applyForJob,
        setApplied,
        applied,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
