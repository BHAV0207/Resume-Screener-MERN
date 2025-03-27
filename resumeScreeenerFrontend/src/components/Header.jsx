import React from "react";
import { Menu, Bell, Search } from "lucide-react";

const Header = ({ toggleSidebar, isSidebarOpen, userInfo }) => {
  return (
    <header className="bg-white border-b border-gray-200 z-30 sticky top-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 px-4 max-w-md ml-4">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            {/* User Menu */}
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={userInfo.avatar}
                alt={userInfo.name}
              />
              <div className="hidden md:flex ml-2 flex-col">
                <span className="text-sm font-medium text-gray-700">{userInfo.name}</span>
                <span className="text-xs text-gray-500">{userInfo.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
