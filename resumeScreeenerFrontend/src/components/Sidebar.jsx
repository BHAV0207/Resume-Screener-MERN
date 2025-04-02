import React, { useContext } from "react";
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full transition-all duration-300 z-30
        ${isOpen ? "w-64" : "w-16"} 
        ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        ${
          isDarkMode
            ? "bg-gray-800 text-gray-200 border-r border-gray-700"
            : "bg-white text-gray-900 border-r border-gray-200"
        }
      `}
    >
      {/* Logo Area */}
      <div
        className={`h-16 flex items-center justify-between px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {isOpen && (
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-indigo-500" />
            <span className="ml-2 font-bold text-xl">AdminPro</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
          }`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2 space-y-1">
        <NavSection title="MAIN" isOpen={isOpen} isDarkMode={isDarkMode}>
          <NavItem
            icon={<Home size={20} />}
            text="Dashboard"
            route="/admin/dashboard"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Post Jobs"
            route="/admin/post-jobs"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
          <NavItem
            icon={<Users size={20} />}
            text="Posted Jobs"
            route="/admin/posted-jobs"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />

          <NavItem
            icon={<Briefcase size={20} />}
            text="Active Jobs"
            route="/admin/active-jobs"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />

          <NavItem
            icon={<FileText size={20} />}
            text="All Resumes"
            route="/admin/all-resumes"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
        </NavSection>

        <NavSection title="SETTINGS" isOpen={isOpen} isDarkMode={isDarkMode}>
          <NavItem
            icon={<Settings size={20} />}
            text="Settings"
            route="/settings"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
          <NavItem
            icon={<HelpCircle size={20} />}
            text="Help"
            route="/help"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
          <NavItem
            icon={<LogOut size={20} />}
            text="Logout"
            route="/"
            isOpen={isOpen}
            isDarkMode={isDarkMode}
          />
        </NavSection>
      </nav>
    </aside>
  );
};

const NavSection = ({ title, isOpen, children, isDarkMode }) => {
  if (!isOpen) return <>{children}</>;

  return (
    <div className="space-y-1">
      <h3
        className={`px-3 text-xs font-semibold uppercase tracking-wider ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

const NavItem = ({ icon, text, route, isOpen, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === route;

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.clear(); // Clears all data stored in localStorage
    navigate(route); // Redirect to the provided route (for example, the home page or login page)
  };

  return (
    <button
      onClick={text === "Logout" ? handleLogout : () => navigate(route)} // Special handling for Logout
      className={`
        w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${
          isActive
            ? isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-900"
            : isDarkMode
            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
            : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
        }
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

export default Sidebar;
