import { createContext, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [totalJobs, setTotalJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdminJobStats = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    setLoading(true);
    try {
      const allJobsRes = await axiosInstance.get(`/jobs/${user.id}`);
      const activeJobsRes = await axiosInstance.get(`/jobs/${user.id}?active=true`);
      
      setTotalJobs(allJobsRes.data.data || []);
      setActiveJobs(activeJobsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching job stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAdminResumes = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/jobs/${user.id}/resumes`);
      setResumes(res.data.data.resumes || []);
    } catch (err) {
      console.error("Error fetching admin resumes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchShortlistedResumes = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    try {
      const res = await axiosInstance.get(`/resumes/shortlisted/${user.id}`);
      setShortlisted(res.data.data || []);
    } catch (err) {
      console.error("Error fetching shortlisted resumes:", err);
    }
  }, []);

  const getJobById = async (jobId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/jobs/job/${jobId}`);
      setCurrentJob(res.data.data);
      return res.data.data;
    } catch (err) {
      toast.error("Error fetching job details");
    } finally {
      setLoading(false);
    }
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/jobs");
      setAllJobs(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/jobs/create", jobData);
      toast.success("Job created successfully!");
      fetchAdminJobStats();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating job");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axiosInstance.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      fetchAdminJobStats();
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  const updateJob = async (jobId, updatedData) => {
    try {
      await axiosInstance.put(`/jobs/${jobId}`, updatedData);
      toast.success("Job updated successfully");
      fetchAdminJobStats();
    } catch (err) {
      toast.error("Error updating job");
    }
  };

  const applyForJob = async (file, jobId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('name', user.name || "Unknown");
    formData.append('email', user.email || "No Email");
    formData.append('jobId', jobId);

    setLoading(true);
    try {
      await axiosInstance.post("/resumes/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  const processCandidate = async (jobId, resumeId, action) => {
    try {
      await axiosInstance.post("/jobs/process", { jobId, resumeId, action });
      toast.success(`Candidate ${action}ed successfully`);
      getJobById(jobId); // Refresh job details to show updated status
    } catch (err) {
      toast.error(`Error ${action}ing candidate`);
    }
  };

  return (
    <JobContext.Provider
      value={{
        totalJobs,
        activeJobs,
        resumes,
        shortlisted,
        currentJob,
        allJobs,
        loading,
        fetchAdminJobStats,
        fetchAdminResumes,
        fetchShortlistedResumes,
        getJobById,
        getAllJobs,
        createJob,
        deleteJob,
        updateJob,
        applyForJob,
        processCandidate,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
