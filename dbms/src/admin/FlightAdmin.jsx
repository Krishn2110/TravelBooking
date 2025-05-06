import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import backgroundImage from "../assets/place.jpg"; // Add your background image to assets folder

const FlightAdmin = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    travellerClass: "",
    price: "",
    seatsAvailable: "",
  });

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      if (response.ok) {
        alert("Flight added successfully!");
        setFlightData({
          flightNumber: "",
          airline: "",
          source: "",
          destination: "",
          departureTime: "",
          arrivalTime: "",
          travellerClass: "",
          price: "",
          seatsAvailable: "",
        });
      } else {
        alert("Error adding flight.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl border border-white/20">
        <h2 className="text-3xl text-white font-bold mb-6 text-center drop-shadow-md">
          Add Flight
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "flightNumber", placeholder: "Flight Number", type: "text" },
            { name: "airline", placeholder: "Airline", type: "text" },
            { name: "source", placeholder: "Source", type: "text" },
            { name: "destination", placeholder: "Destination", type: "text" },
            { name: "departureTime", placeholder: "Departure Time", type: "datetime-local" },
            { name: "arrivalTime", placeholder: "Arrival Time", type: "datetime-local" },
            { name: "travellerClass", placeholder: "Traveller Class", type: "text" },
            { name: "price", placeholder: "Price", type: "number" },
            { name: "seatsAvailable", placeholder: "Seats Available", type: "number" },
          ].map(({ name, placeholder, type }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={flightData[name]}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/80 text-black placeholder-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          ))}

<button  type="submit" className="w-full bg-[#0763aa] text-white py-2 rounded font-medium text-xl transform transition duration-200 hover:scale-105 hover:cursor-pointer">
          Add flight
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

export default FlightAdmin;