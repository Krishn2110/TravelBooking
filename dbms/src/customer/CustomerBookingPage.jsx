import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BookingTicket from "./BookingTicket";

// Import background images
import FlightBackground from "../assets/place.jpg";
import HotelBackground from "../assets/booking_background.jpg";
import CarBackground from "../assets/car.jpg";

const CustomerBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const type = location.state?.type;

  // Choose background based on type
  const getBackgroundImage = () => {
    switch (type) {
      case "flight":
        return FlightBackground;
      case "hotel":
        return HotelBackground;
      case "car":
        return CarBackground;
      default:
        return FlightBackground; // fallback image
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${type}bookings`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (type) fetchBookings();
  }, [type]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative px-4 py-8"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-10 capitalize text-center text-white drop-shadow-lg">
          Your {type} Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-white/80">No bookings found.</p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {bookings.map((booking, index) => (
              <BookingTicket key={index} booking={booking} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/customer-dashboard"
            className="text-white underline hover:text-blue-200 transition"
          >
            ⬅ Back to Dashboard
          </Link>
        </div>

        {/* Static preview */}
        <div className="max-w-3xl mx-auto mt-10">
          <BookingTicket
            booking={{
              id: "TEST123",
              details: "Example Booking",
              date: "2025-04-13",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingPage;
