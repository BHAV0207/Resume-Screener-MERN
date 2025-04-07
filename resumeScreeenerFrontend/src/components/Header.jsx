import React, { useContext } from "react";
import { Menu, Bell, Search, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../store/ThemeContext";
import { useNavigate } from "react-router-dom";


const Header = ({ toggleSidebar, isSidebarOpen, userInfo }) => {
  const { setIsDarkMode, isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`border-b border-gray-200 z-30 sticky top-0 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>


            {/* User Menu */}
            <div className="flex items-center hover:cursor-cell" onClick={() => navigate("/admin/profile")}>
              <img
                className="h-8 w-8 rounded-full"
                src={userInfo.avatar}
                alt={userInfo.name}
              />
              <div className="hidden md:flex ml-2 flex-col">
                <span className="text-sm font-medium text-black dark:text-emerald-600">
                  {userInfo.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-red-600">
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

export default Header;
