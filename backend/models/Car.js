const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carId:String,
  companyName: String,
  carType: String,
  source: String,
  destination: String,
  pickUpDate: Date,
  dropOffDate: Date,
  price: Number,
  seatsAvailable: Number,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
