import React, { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";


function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen px-4 py-10 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`max-w-4xl mx-auto shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        
        {/* Avatar */}
        <img
          className="w-32 h-32 rounded-full object-cover shadow"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />

        {/* User Info */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <button
              onClick={toggleTheme}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              {isDarkMode ? "Switch to Light" : "Switch to Dark"}
            </button>
          </div>

          <p className="text-sm mt-1">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
            {user.type.toUpperCase()}
          </span>

          {/* Divider */}
          <hr className="my-4 border-gray-300 dark:border-gray-600" />

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">User ID:</span> <br />
              <code className="text-xs">{user.id}</code>
            </div>
            <div>
              <span className="font-medium">Access Level:</span> <br />
              {user.type === "admin" ? "Full Admin Access" : "Standard User"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
