import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 ml-15">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet /> {/* This will render the correct admin page based on route */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
