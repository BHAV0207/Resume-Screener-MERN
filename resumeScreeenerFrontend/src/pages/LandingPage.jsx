import React, { useContext, useState } from "react";
import LandingHeader from "../LandingPageComponents/LandingHeader";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X} from "lucide-react";
import { AuthContext } from "../store/AuthCOntext";

function LandingPage() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const { features } = useContext(AuthContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Find Your Next
              <span className="block text-indigo-600">Career Opportunity</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Connect with top companies and discover opportunities that match
              your skills and aspirations.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                For Employers
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Why Choose Us
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to find your dream job
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                  onClick={() => setSelectedFeature(index)}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-indigo-100 p-3">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  500+
                </div>
                <div className="mt-2 text-lg text-gray-600">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  10k+
                </div>
                <div className="mt-2 text-lg text-gray-600">Job Seekers</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  98%
                </div>
                <div className="mt-2 text-lg text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} WorkFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {selectedFeature !== null && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center mb-6">
              <div className="rounded-full bg-indigo-100 p-3 mr-4">
                {features[selectedFeature].icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {features[selectedFeature].title}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              {features[selectedFeature].description}
            </p>
            <ul className="space-y-4">
              {features[selectedFeature].details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <p className="text-gray-600">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
  