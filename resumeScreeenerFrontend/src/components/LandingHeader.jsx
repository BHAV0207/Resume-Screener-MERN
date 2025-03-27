import React from "react";
import { useNavigate } from "react-router-dom";

function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-full mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide text-gray-900">
          Job Junction
        </div>

        {/* Navigation */}
        <div className="space-x-6 hidden md:flex">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-700 font-medium hover:text-gray-900 transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default LandingHeader;
