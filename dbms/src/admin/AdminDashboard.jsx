import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import FlightAdmin from "./FlightAdmin";
import CarAdmin from "./CarAdmin";
import HotelAdmin from "./HotelAdmin";
import { FaPlane, FaCar, FaHotel } from "react-icons/fa";
import SmallCard from "./SmallCard";
import Background from "../assets/admin_back.jpg";

const AdminDashboard = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
     

      {/* Glassy Stats Section */}
      <div className="flex flex-wrap justify-center gap-8  px-12">
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8 p-6">
          <SmallCard
            title="Total Flights"
            icon={<FaPlane size={28} />}
            apiUrl="http://localhost:5000/api/flights"
          />
        </div>
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8 p-6">
          <SmallCard
            title="Total Cars"
            icon={<FaCar size={28} />}
            apiUrl="http://localhost:5000/api/cars"
          />
        </div>
        <div className="backdrop-blur-md bg-[#091456]/40 shadow-2xl shadow-black rounded-2xl mt-8  p-6">
          <SmallCard
            title="Total Hotels"
            icon={<FaHotel size={28} />}
            apiUrl="http://localhost:5000/api/hotels"
          />
        </div>
      </div>

      {/* CEO Section */}
      <div className="flex flex-wrap justify-center items-center gap-10 mt-12 px-8 mx-12">
        
      <img
  src="/tiwari.jpg"
  alt="CEO Hemant Tiwari"
  className="w-[250px] h-[250px] border-black    rounded-3xl object-cover shadow-2xl shadow-black"
/>





        <div className="max-w-2xl text-white backdrop-blur-md bg-[#131833]/50 shadow-2xl shadow-black rounded-2xl p-6 ">
          <h2 className="text-3xl font-bold text-center mb-6">
            A Message from Our CEO
          </h2>
          <p className="text-lg font-medium leading-relaxed">
            At Tiwari Travels, we are committed to innovation, excellence, and customer
            satisfaction. Our journey is driven by a passion for creating solutions that
            make a difference. Every day, we strive to push boundaries, embrace new
            challenges, and deliver value to our customers and partners. Thank you for
            being a part of our story—we look forward to building a brighter future
            together!
            <br />
            <br />
            — <strong>HEMANT TIWARI (FROM BUXAR)</strong>
          </p>
        </div>
      </div>

      {/* Routing */}
      <Routes>
        <Route path="/admin/flightadmin" element={<FlightAdmin />} />
        <Route path="caradmin" element={<CarAdmin />} />
        <Route path="admin/hoteladmin" element={<HotelAdmin />} />
      </Routes>
       {/* Admin Navbar */}
       <AdminNavbar />
    </div>
  );
};

export default AdminDashboard;