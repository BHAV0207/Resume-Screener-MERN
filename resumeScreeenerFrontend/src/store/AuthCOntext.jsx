import { createContext, useState } from "react";
import axios from "axios";
import {  Briefcase, Building2, Users2} from 'lucide-react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");


  const AxiosRegister = async () => {
    try {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

      if (!passwordRegex.test(password)) {
        setErr(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }
      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
        type,
      });

      setSuccess("Registration successful!");
      setErr("");
      setName("");
      setEmail("");
      setType("");
      setPassword("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setErr("Registration failed. Please try again.");
      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  const AxiosLogin = async (navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      setSuccess("Login successful!");
      setErr("");
      setEmail("");
      setPassword("");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      if (res.data.user.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
      
    } catch (err) {
      setErr("Failed to login");
      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  const features = [
    {
      icon: <Users2 className="h-8 w-8 text-indigo-600" />,
      title: "Smart Matching",
      description: "AI-powered job matching that understands your unique skills and preferences",
      details: [
        "Advanced machine learning algorithms analyze your skills and experience",
        "Real-time matching with new job postings",
        "Personalized job recommendations based on your preferences",
        "Skills gap analysis and suggested learning paths",
        "Career trajectory predictions based on market trends"
      ]
    },
    {
      icon: <Building2 className="h-8 w-8 text-indigo-600" />,
      title: "Top Companies",
      description: "Access opportunities from leading companies across industries",
      details: [
        "Partnerships with Fortune 500 companies",
        "Verified employer profiles and reviews",
        "Exclusive job listings not found elsewhere",
        "Direct communication channels with hiring managers",
        "Company culture insights and benefits information"
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
      title: "Career Growth",
      description: "Resources and tools to help you advance in your career journey",
      details: [
        "Professional development workshops and webinars",
        "Resume building and optimization tools",
        "Interview preparation resources",
        "Salary negotiation guides",
        "Networking opportunities with industry leaders"
      ]
    }
  ];

  return (
    <AuthContext.Provider
      value={{  
        AxiosRegister,
        AxiosLogin,
        success,
        err,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        type,
        setType,
        features,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
