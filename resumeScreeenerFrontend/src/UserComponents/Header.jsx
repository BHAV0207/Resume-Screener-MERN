import React from "react";
import { Menu, Bell, Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserHeader = ({ toggleSidebar, isSidebarOpen, userInfo }) => {
  const navigate = useNavigate();

  return (
    <header className="h-24 bg-white/60 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100 px-8 md:px-12">
      <div className="h-full flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="p-3.5 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 lg:hidden"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex md:flex items-center space-x-3 group cursor-pointer lg:hidden">
             <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/40 group-hover:rotate-12 transition-all">
                <Star size={20} fill="white" className="text-white" />
             </div>
             <span className="font-black text-slate-900 tracking-tighter text-xl uppercase leading-none">AIBatch</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <button className="relative p-3.5 rounded-2xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
            <Bell size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </button>
          
          <div className="h-10 w-[1px] bg-slate-100 hidden sm:block" />

          {/* User Info */}
          <button 
            onClick={() => navigate("/user/profile")}
            className="flex items-center gap-4 p-1.5 pr-5 rounded-[2rem] hover:bg-slate-50 transition-all group"
          >
            <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 ring-4 ring-white group-hover:ring-emerald-50 transition-all">
              <img
                src={userInfo.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                alt={userInfo.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-sm font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors uppercase">
                {userInfo.name || 'Candidate Node'}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mt-1">
                Active Protocol // {userInfo.role || 'Talent'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;