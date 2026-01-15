import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { Briefcase, Building2, Users2 } from "lucide-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, navigate) => {
    setLoading(true);
    try {
      console.log("Login Attempt:", { email });
      const res = await axiosInstance.post("/user/login", { email, password });
      console.log("Full Login Response:", res);

      // Handle both wrapped { data: { token, user } } and direct { token, user } formats
      const rawData = res.data?.data || res.data;
      
      if (!rawData || !rawData.token) {
        throw new Error("Invalid response format: Missing token");
      }

      const { token, user: userData } = rawData;
      console.log("Destructured User Data:", userData);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful!");
      
      if (userData.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login Error Deep Dive:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });
      toast.error(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData, navigate) => {
    setLoading(true);
    try {
      console.log("Registration Attempt:", { email: userData.email, type: userData.type });
      await axiosInstance.post("/user/register", userData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const features = [
    {
      icon: <Users2 className="h-8 w-8 text-emerald-500" />,
      title: "Smart Matching",
      description: "AI-powered job matching that understands your unique skills and preferences",
      details: [
        "Advanced machine learning algorithms analyze your skills and experience",
        "Real-time matching with new job postings",
        "Personalized job recommendations based on your preferences",
        "Skills gap analysis and suggested learning paths",
        "Career trajectory predictions based on market trends",
      ],
    },
    {
      icon: <Building2 className="h-8 w-8 text-emerald-500" />,
      title: "Top Companies",
      description: "Access opportunities from leading companies across industries",
      details: [
        "Partnerships with Fortune 500 companies",
        "Verified employer profiles and reviews",
        "Exclusive job listings not found elsewhere",
        "Direct communication channels with hiring managers",
        "Company culture insights and benefits information",
      ],
    },
    {
      icon: <Briefcase className="h-8 w-8 text-emerald-500" />,
      title: "Career Growth",
      description: "Resources and tools to help you advance in your career journey",
      details: [
        "Professional development workshops and webinars",
        "Resume building and optimization tools",
        "Interview preparation resources",
        "Salary negotiation guides",
        "Networking opportunities with industry leaders",
      ],
    },
  ];

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        features,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
