
import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    
    <div className="h-screen rounded-tr-xl rounded-br-xl w-64 text-white fixed top-0 left-0 flex flex-col p-6 poppins bg-[#282c33]/60  backdrop-blur-md border border-[#000]/10 rounded-xl shadow-xl  ">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6 text-center tracking-wider text-blue-300 drop-shadow-lg">TIWARI Travels</div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">

      <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/admin/flightadmin" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          ✈️ Manage Flights
        </NavLink>

        <NavLink 
          to="/admin/caradmin" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          🚗 Manage Cars
        </NavLink>

        <NavLink 
          to="/admin/hoteladmin" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          🏨 Manage Hotels
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminNavbar;

