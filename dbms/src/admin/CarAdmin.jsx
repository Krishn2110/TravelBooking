import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import backgroundImage from "../assets/car.jpg";

const CarAdmin = () => {
  const [carData, setCarData] = useState({
    carId: "",
    companyName: "",
    carType: "",
    source: "",
    destination: "",
    pickUpDate: "",
    dropOffDate: "",
    price: "",
    seatsAvailable: "",
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert("Car added successfully!");
        setCarData({
          carId: "",
          companyName: "",
          carType: "",
          source: "",
          destination: "",
          pickUpDate: "",
          dropOffDate: "",
          price: "",
          seatsAvailable: "",
        });
      } else {
        alert("Error adding car.");
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
      

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white-200">Add Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="text"
            name="carId"
            placeholder="Car ID"
            value={carData.carId}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={carData.companyName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="text"
            name="carType"
            placeholder="Car Type"
            value={carData.carType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source Location"
            value={carData.source}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination Location"
            value={carData.destination}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="datetime-local"
            name="pickUpDate"
            value={carData.pickUpDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="datetime-local"
            name="dropOffDate"
            value={carData.dropOffDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black  focus:outline-none"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={carData.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black focus:outline-none"
            required
          />
          <input
            type="number"
            name="seatsAvailable"
            placeholder="Seats Available"
            value={carData.seatsAvailable}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black focus:outline-none"
            required
          />
          <button  type="submit" className="w-full bg-[#0763aa] text-white py-2 rounded font-medium text-xl transform transition duration-200 hover:scale-105 hover:cursor-pointer">
          Add Car
        </button>
        </form>

        <button
          onClick={() => {
            window.location = "/admin";
          }}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded font-medium text-xl transform transition duration-200 hover:scale-105 hover:cursor-pointer">←Back</button>
      
      </div>
      <AdminNavbar />
    </div>
  );
};

export default CarAdmin;
