const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    hotelName: String,
    location: String,
    checkInDate: Date,
    checkOutDate: Date,
    pricePerNight: Number,
    availableRooms: Number,
    rating: Number,
  });
  
  const Hotel = mongoose.model("Hotel", hotelSchema);
  
  module.exports = Hotel;
  