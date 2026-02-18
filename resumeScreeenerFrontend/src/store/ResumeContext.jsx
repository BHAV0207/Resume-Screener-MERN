import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../api/axiosInstance";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResumesByUserId = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/resumes/resumeByUserId/${user.id}`,
      );

      setResumes(response.data.data.resumes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider value={{ fetchResumesByUserId, resumes, loading }}>
      {children}
    </ResumeContext.Provider>
  );
};
