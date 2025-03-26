import React from "react";
import { useNavigate } from "react-router-dom";

function LandingHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-green-300 h-[8vh] flex items-center justify-between px-8 shadow-md">
      <div className="text-2xl font-bold text-white">Job Junction</div>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-green-500 px-4 py-1 rounded hover:bg-green-100 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingHeader;
