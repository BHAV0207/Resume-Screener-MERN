import axios from "axios";
import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [totalJobs, setTotalJobs] = useState(null);
  const [activeJobs, setActiveJobs] = useState(null);

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
        `http://localhost:5000/api/jobs/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${user.id}?active=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const activeJobsCount = res.data;
      const jobCount = response.data;

      console.log(activeJobsCount)
      setTotalJobs(jobCount);
      setActiveJobs(activeJobsCount);
    } catch (err) {
      console.error("Error fetching job count:", err);
    }
  };

  return (
    <JobContext.Provider
      value={{ setActiveJobs, setTotalJobs, totalJobs, activeJobs , handleJobCount}}
    >
      {children}
    </JobContext.Provider>
  );
};
