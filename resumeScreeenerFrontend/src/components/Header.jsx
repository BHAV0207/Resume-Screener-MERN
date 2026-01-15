import React from "react";
import { Menu, Bell, User, Settings, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen, userInfo }) => {
  const navigate = useNavigate();

  return (
    <header className="h-24 bg-white/60 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100 px-8 md:px-12">
      <div className="h-full flex items-center justify-between gap-8">
        <div className="flex flex-1 items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="p-3.5 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 lg:hidden"
          >
            <Menu size={22} />
          </button>
          
          <div className="hidden md:flex flex-1 max-w-xl items-center relative group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
             <input 
              type="text" 
              placeholder="Query neural network..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all text-sm font-black uppercase tracking-widest placeholder:text-slate-300 placeholder:font-bold"
             />
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
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-4 p-1.5 pr-5 rounded-[2rem] hover:bg-slate-50 transition-all group"
          >
            <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 ring-4 ring-white group-hover:ring-emerald-50 transition-all">
              <img
                src={userInfo.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                alt={userInfo.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-sm font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors uppercase">
                {userInfo.name || 'Admin User'}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mt-1">
                Operator // {userInfo.role || 'Admin'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
