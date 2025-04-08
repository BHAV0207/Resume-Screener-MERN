import React, { useContext } from "react";
import { Menu, Bell, Search, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../store/ThemeContext";
import { useNavigate } from "react-router-dom";

const UserHeader = ({ toggleSidebar, isSidebarOpen, userInfo }) => {
  const { setIsDarkMode, isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white'} sticky top-0 z-30`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-500'
              }`}
            >
              <Menu size={24} />
            </button>
            <div className="relative max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-3 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white placeholder:text-gray-400 focus:ring-indigo-500' 
                    : 'bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-indigo-600'
                } sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-500'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/user/profile")}
            >
              <img
                className="h-8 w-8 rounded-full"
                src={userInfo.avatar}
                alt={userInfo.name}
              />
              <div className="hidden md:flex ml-2 flex-col">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userInfo.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {userInfo.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;