const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel"); // Import Hotel model

// 🔹 API: Add a New Hotel
router.post("/", async (req, res) => {
  try {
    const { hotelName, location, checkInDate, checkOutDate, pricePerNight, availableRooms, rating } = req.body;

    if (!hotelName || !location || !checkInDate || !checkOutDate || !pricePerNight || !availableRooms) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const existingHotel = await Hotel.findOne({ hotelName, location });
    if (existingHotel) {
      return res.status(400).json({ message: "❌ Hotel already exists in this location" });
    }

    const newHotel = new Hotel({
      hotelName,
      location,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      pricePerNight,
      availableRooms,
      rating: rating || 0, // Default rating to 0 if not provided
    });

    await newHotel.save();
    res.status(201).json({ message: "✅ Hotel added successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Get All Hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});


router.post("/search", async (req, res) => {
  try {
    const { location, checkInDate,checkOutDate, rating } = req.body;

    // Check if required parameters are provided
    if (!location || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    console.log("Querying hotels with:", { location, checkInDate, checkOutDate });

    const startOfDay = new Date(checkInDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(checkOutDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // 🔍 Search in MongoDB
    const hotels = await Hotel.find({
      location:location,
      checkInDate: { $gte: startOfDay, $lte: endOfDay },
      checkOutDate: { $gte: startOfDay, $lte: endOfDay },
    });

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found", hotels: [] });
    }

    res.status(200).json({message: "✅ hotels found", hotels });
  } catch (error) {
    // console.error("Error searching flights:", error);
    console.error("Error searching hotels:", error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 API: Get Hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "❌ Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Update Hotel by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) return res.status(404).json({ message: "❌ Hotel not found" });
    res.json({ message: "✅ Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Delete Hotel by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: "❌ Hotel not found" });
    res.json({ message: "✅ Hotel deleted", hotel: deletedHotel });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

module.exports = router;
