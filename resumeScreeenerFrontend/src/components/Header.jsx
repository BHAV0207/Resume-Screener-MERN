import React from "react";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center">
      <button onClick={toggleSidebar} className="text-white">
        <Menu size={28} />
      </button>
      <h1 className="text-xl font-bold ml-4">Admin Dashboard</h1>
    </header>
  );
};

export default Header;
