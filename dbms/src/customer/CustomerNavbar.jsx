import React from "react";
import { NavLink } from "react-router-dom";
import backgroundImage from "../assets/car.jpg";
// Sample user data, you can replace it with dynamic data later
const user = {
  name: "Nirmal Joshi",
  photoUrl: backgroundImage, // Replace with actual path to user's photo
};

const CustomerNavbar = () => {
  return (
    <div className="h-screen rounded-tr-xl rounded-br-xl w-64 text-white fixed top-0 left-0 flex flex-col p-6 poppins bg-[#282c33]/60 backdrop-blur-md border border-[#000]/10 rounded-xl shadow-xl">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6 text-center tracking-wider text-blue-300 drop-shadow-lg">TIWARI Travels</div>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div className="text-white text-lg font-semibold">
          {user.name}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <NavLink 
          to="/customer-dashboard" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/customer-dashboard/FlightCustomer" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          ✈️ Book Flight 
        </NavLink>

        <NavLink 
          to="/customer-dashboard/carcustomer" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          🚗 Book Cars
        </NavLink>

        <NavLink 
          to="/customer-dashboard/hotelcustomer" 
          className={({ isActive }) => 
            `p-4 rounded-lg transition duration-200 hover:bg-gray-700 ${isActive ? " bg-[#282c33]/60  backdrop-blur-md border" : ""}`
          }
        >
          🏨 Book Hotels
        </NavLink>
      </nav>
    </div>
  );
};

export default CustomerNavbar;
