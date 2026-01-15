import React from "react";
import {
  LayoutDashboard,
  PlusSquare,
  ClipboardList,
  CheckSquare,
  Files,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: "Overview", route: "/admin/dashboard" },
    { icon: <PlusSquare size={20} />, text: "Post Job", route: "/admin/post-jobs" },
    { icon: <ClipboardList size={20} />, text: "Manage Jobs", route: "/admin/posted-jobs" },
    { icon: <CheckSquare size={20} />, text: "Active Jobs", route: "/admin/active-jobs" },
    { icon: <Files size={20} />, text: "Talent Pool", route: "/admin/all-resumes" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full transition-all duration-700 z-[60]
        ${isOpen ? "w-80" : "w-24"} 
        ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        bg-slate-900 border-r border-white/5 shadow-2xi
      `}
    >
      {/* Brand */}
      <div className="h-28 flex items-center px-8 mb-6">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-900/40 group-hover:rotate-12 transition-all duration-500">
             <Star size={28} fill="white" className="group-hover:scale-110 transition-transform" />
          </div>
          {isOpen && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="text-2xl font-black text-white tracking-tighter leading-none">
                AIBATCH
              </span>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-1">
                Neural Hub
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="px-5 space-y-3">
        <p className={`px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 ${!isOpen && 'hidden'} opacity-50`}>
           Network Infrastructure
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <button
              key={item.text}
              onClick={() => navigate(item.route)}
              className={`
                w-full flex items-center h-14 rounded-2xl transition-all duration-500 group relative
                ${isOpen ? 'px-5' : 'justify-center px-0'}
                ${isActive 
                  ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-900/40" 
                  : "text-slate-500 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className={`${isActive ? 'text-white' : 'group-hover:text-emerald-500'} transition-all duration-300`}>
                {React.cloneElement(item.icon, { size: 22 })}
              </span>
              {isOpen && (
                <span className={`ml-4 font-black text-xs uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500 ${isActive ? 'text-white' : 'text-inherit'}`}>
                  {item.text}
                </span>
              )}
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-full -translate-x-5" />
              )}
              {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_white]" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile/Actions */}
      <div className="absolute bottom-8 w-full px-5 space-y-3">
        <button
          onClick={() => navigate("/admin/profile")}
          className={`
            w-full flex items-center h-14 rounded-2xl transition-all duration-500 group
            ${isOpen ? 'px-5' : 'justify-center px-0'}
            text-slate-500 hover:bg-white/5 hover:text-white
          `}
        >
          <User size={22} className="group-hover:text-emerald-500 transition-colors" />
          {isOpen && <span className="ml-4 font-black text-xs uppercase tracking-widest">Operator Node</span>}
        </button>
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center h-14 rounded-2xl transition-all duration-500 group
            ${isOpen ? 'px-5' : 'justify-center px-0'}
            text-slate-500 hover:bg-rose-500/10 hover:text-rose-400
          `}
        >
          <LogOut size={22} />
          {isOpen && <span className="ml-4 font-black text-xs uppercase tracking-widest">Terminate Session</span>}
        </button>
      </div>

      {/* Toggle Button (Desktop) */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-5 top-12 w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white border-4 border-slate-900 shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          {isOpen ? <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" /> : <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
