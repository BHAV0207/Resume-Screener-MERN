import React from "react";
import { Home, Briefcase, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-5 transition-all ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-transform"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-5 space-y-4">
        <NavItem icon={<Home />} text="Dashboard" route="/admin/dashboard" isOpen={isOpen} />
        <NavItem icon={<Briefcase />} text="Post Jobs" route="/admin/post-jobs" isOpen={isOpen} />
        <NavItem icon={<Settings />} text="Posted Jobs" route="/admin/posted-jobs" isOpen={isOpen} />
        <NavItem icon={<Settings />} text="All Resumes" route="/admin/all-resumes" isOpen={isOpen} />
        <NavItem icon={<LogOut />} text="Logout" route="/login" isOpen={isOpen} />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, text, route, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div
      onClick={() => navigate(route)}
      className={`flex items-center p-3 cursor-pointer transition-all ${
        location.pathname === route ? "bg-gray-700" : "hover:bg-gray-600"
      }`}
    >
      {icon}
      {isOpen && <span className="ml-3">{text}</span>}
    </div>
  );
};

export default Sidebar;
