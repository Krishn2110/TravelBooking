import React from "react";

const BookingTicket = () => {
  // Example static booking data
  const booking = {
    id: "FL12345678",
    userName: "Nirmal Joshi",
    from: "Delhi",
    to: "Mumbai",
    date: "2025-04-20",
    time: "14:30",
    seat: "12A",
    type: "Flight",
  };

  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 w-full text-[#1e1e1e]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-2">{booking.type} Ticket</h2>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Passenger:</strong> {booking.userName}</p>
          <p><strong>From:</strong> {booking.from}</p>
          <p><strong>To:</strong> {booking.to}</p>
        </div>
        <div className="text-right">
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Seat:</strong> {booking.seat}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
