import axios from "axios";
import { Trophy } from "lucide-react";
import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [totalJobs, setTotalJobs] = useState(null);
  const [activeJobs, setActiveJobs] = useState(null);
  const [resumes, setResumes] = useState(null);
  const [allResume, setAllResume] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);

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
      console.log(activeJobsCount)

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

  const deleteJob = async  (jobId) => {
    try{

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const res = await axios.delete(`https://resume-screener-mern-1.onrender.com/api/jobs/${jobId}` ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      )

      handleJobCount();
      console.log(res.data)
    }catch(err){
      console.error("Error deleting Job", err);
    }
  }


  const updateJob = async  (jobId) => {
    try{

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const res = await axios.put(`https://resume-screener-mern-1.onrender.com/api/jobs/${jobId}` ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      )

      handleJobCount();
      console.log(res.data)
    }catch(err){
      console.error("Error deleting Job", err);
    }
  }
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
        deleteJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
