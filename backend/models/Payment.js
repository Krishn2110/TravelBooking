// // models/Payment.js
// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//   razorpay_payment_id: String,
//   razorpay_order_id: String,
//   customerId: String, // or email, etc.
//   carDetails: Object,
//   flightDetails: Object,
//   amount: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Payment", paymentSchema);

const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
  razorpay_payment_id: String,
  razorpay_order_id: String,
  customerId: String,
  bookingType: {
    type: String,
    enum: ["car", "flight", "hotel"],
  },
  carDetails: Object,
  flightDetails: Object,
  hotelDetails: Object,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
