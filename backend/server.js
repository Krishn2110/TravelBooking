const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const router = express.Router();

const cors = require("cors");
const app = express();

app.use(cors({
      origin: "http://localhost:5173", 
      methods: ['GET', 'POST'],
      credentials: true 
  }));


const flightRoutes = require("./routes/flightRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require("./routes/customerRoutes");

const paymentRoutes = require("./routes/paymentRoutes");



app.use(express.json()); // Middleware to parse JSON

mongoose
  .connect("mongodb://127.0.0.1:27017/travelDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/cars", carRoutes);
app.use("/register", customerRoutes);
// app.use("/login", customerRoutes);
app.use("/customer",customerRoutes);

app.use("/api/payment", paymentRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

























