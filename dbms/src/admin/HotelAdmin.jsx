import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import backgroundImage from "../assets/hotel.jpg"; // Add your background image to assets folder
const HotelAdmin = () => {
  const [hotelData, setHotelData] = useState({
    hotelName: "",
    location: "",
    checkInDate: "",
    checkOutDate: "",
    pricePerNight: "",
    availableRooms: "",
    rating: "",
  });

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
      });

      if (response.ok) {
        alert("Hotel added successfully!");
        setHotelData({
          hotelName: "",
    location: "",
    checkInDate: "",
    checkOutDate: "",
    pricePerNight: "",
    availableRooms: "",
    rating: "",
        });
      } else {
        alert("Error adding hotel.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    
    <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center pl-72 pr-4"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        > 
  <div className="max-w-md mx-auto mt-6 m-6 p-6 w-full  bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl"> 

      <h2 className="text-2xl font-bold text-[#242320] mb-4 flex justify-center">Add Hotels</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <input
          type="text"
          name="hotelName"
          placeholder="Hotel Name"
          value={hotelData.hotelName}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={hotelData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        
        <input
          type="datetime-local"
          name="checkInDate"
          placeholder="Check In Date"
          value={hotelData.checkInDate}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <input
          type="datetime-local"
          name="checkOutDate"
          placeholder="Check Out Date"
          value={hotelData.checkOutDate}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price Per Night"
          value={hotelData.pricePerNight}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <input
          type="number"
          name="availableRooms"
          placeholder="Available Rooms"
          value={hotelData.availableRooms}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={hotelData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-zinc-300 border-none"
          required
        />
        <button  type="submit" className="w-full bg-[#0763aa] text-white py-2 rounded font-medium text-xl transform transition duration-200 hover:scale-105 hover:cursor-pointer">
          Add Hotel
        </button>
      </form>
      <button onClick={() => {window.location = "/admin";}} className="w-full mt-2 bg-red-500 text-white py-2 rounded font-medium text-xl transform transition duration-200 hover:scale-105 hover:cursor-pointer">←Back</button>
    </div>
    <AdminNavbar/>
    </div>
  
  );
};

export default HotelAdmin;
