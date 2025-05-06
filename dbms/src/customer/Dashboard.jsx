import React from "react";

import CustomerNavbar from "./CustomerNavbar";

import { FaPlane, FaCar, FaHotel } from "react-icons/fa";
import SmallCard from "./CustomerSmallCard";
import Background from "../assets/customer_back.jpg";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
         {/* Glassy Overlay */}
         <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-0" />


      {/* Glassy Stats Section */}
      <div className="flex flex-wrap justify-center gap-8  px-12">
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8 p-6">
          <SmallCard
            title="Flight booking"
            icon={<FaPlane size={28} />}
            apiUrl="http://localhost:5000/api/flights"
          />
        </div>
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8 p-6">
          <SmallCard
            title="Cars booking"
            icon={<FaCar size={28} />}
            apiUrl="http://localhost:5000/api/cars"
          />
        </div>
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8  p-6">
          <SmallCard
            title="Hotel booking"
            icon={<FaHotel size={28} />}
            apiUrl="http://localhost:5000/api/hotels"
          />
        </div>
      </div>
        
       {/* Customer Navbar */}
       <CustomerNavbar />
    </div>
  );
};

export default Dashboard;
