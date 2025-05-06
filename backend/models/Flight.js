const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  airline: String,
  source: String,
  destination: String,
  departureTime: Date,
  arrivalTime: Date,
  // departureTime: String,
  // arrivalTime: String,
  travellerClass: String,
  price: Number,
  seatsAvailable: Number,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
