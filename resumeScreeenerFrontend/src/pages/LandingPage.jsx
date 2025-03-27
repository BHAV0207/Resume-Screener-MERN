import React from "react";
import LandingHeader from "../components/LandingHeader";
import { useNavigate } from "react-router-dom";
import { Briefcase, ShieldCheck, Users } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <section className="h-[85vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Discover Your <span className="text-gray-700">Dream Job</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Connecting talent with opportunity through a seamless job search experience.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-900 text-white px-6 py-3 text-lg font-medium rounded-lg hover:bg-gray-800 transition duration-200 shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-900 text-gray-900 px-6 py-3 text-lg font-medium rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mt-4">
            A modern job platform built for efficiency and simplicity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-md">
              <Briefcase size={48} className="text-gray-900 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Curated Jobs</h3>
              <p className="text-gray-600 mt-2">
                Find handpicked job listings tailored to your skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-md">
              <ShieldCheck size={48} className="text-gray-900 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Secure Hiring</h3>
              <p className="text-gray-600 mt-2">
                We ensure all job listings are verified and secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-md">
              <Users size={48} className="text-gray-900 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Smart Matching</h3>
              <p className="text-gray-600 mt-2">
                AI-driven recommendations for better job matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Job Junction. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
