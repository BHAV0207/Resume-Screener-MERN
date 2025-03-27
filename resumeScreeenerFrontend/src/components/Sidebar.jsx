import React from "react";
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

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-30
        ${isOpen ? "w-64" : "w-16"} 
        ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
      `}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4">
        {isOpen && (
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-indigo-500" />
            <span className="ml-2 font-bold text-xl">AdminPro</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2 space-y-1">
        <NavSection title="MAIN" isOpen={isOpen}>
          <NavItem
            icon={<Home size={20} />}
            text="Dashboard"
            route="/admin/dashboard"
            isOpen={isOpen}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Post Jobs"
            route="/admin/post-jobs"
            isOpen={isOpen}
          />
          <NavItem
            icon={<Users size={20} />}
            text="Posted Jobs"
            route="/admin/posted-jobs"
            isOpen={isOpen}
          />
          <NavItem
            icon={<FileText size={20} />}
            text="All Resumes"
            route="/admin/all-resumes"
            isOpen={isOpen}
          />
        </NavSection>

        <NavSection title="SETTINGS" isOpen={isOpen}>
          <NavItem
            icon={<Settings size={20} />}
            text="Settings"
            route="/settings"
            isOpen={isOpen}
          />
          <NavItem
            icon={<HelpCircle size={20} />}
            text="Help"
            route="/help"
            isOpen={isOpen}
          />
          <NavItem
            icon={<LogOut size={20} />}
            text="Logout"
            route="/logout"
            isOpen={isOpen}
          />
        </NavSection>
      </nav>
    </aside>
  );
};

const NavSection = ({ title, isOpen, children }) => {
  if (!isOpen) return <>{children}</>;

  return (
    <div className="space-y-1">
      <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
};

const NavItem = ({ icon, text, route, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <button
      onClick={() => navigate(route)}
      className={`
        w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

export default Sidebar;
