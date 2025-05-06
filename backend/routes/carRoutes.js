const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.post('/', async (req, res) => {

    try {
        const { carId, companyName, carType, source,destination, pickUpDate, dropOffDate, price, seatsAvailable } = req.body;
    
        if (!carId || !companyName || !carType || !source || !destination || !pickUpDate || !dropOffDate || !price || !seatsAvailable) {
          return res.status(400).json({ message: "❌ All fields are required" });
        }
    
        const existingCar = await Car.findOne({ carId, companyName });

        if (existingCar) {
          return res.status(400).json({ message: "❌ Car already exists in this location" });
        }
    
        const newCar = new Car({
          carId,
          companyName,
          carType,
          source,
          destination,
          pickUpDate: new Date(pickUpDate),
          dropOffDate: new Date(dropOffDate),
          price,
          seatsAvailable,
        });
    
        await newCar.save();
        res.status(201).json({ message: "✅ Hotel added successfully", car: newCar });
      } catch (error) {
        res.status(500).json({ message: "❌ Server error", error });
      }
}
);


router.get("/", async (req, res) => {
    try {
      const cars = await find();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "❌ Server error", error });
    }
  });


  router.post("/search", async (req, res) => {
    try {
      const { source, destination, pickUpDate } = req.body;
  
      // Check if required parameters are provided
      if (!source || !destination || !pickUpDate) {
        return res.status(400).json({ message: "Missing search parameters" });
      }
  
      console.log("Querying cars with:", { source, destination, pickUpDate });
  
      const startOfDay = new Date(pickUpDate);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(pickUpDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const date = new Date(pickUpDate);

// Extract hours and minutes
const hours = date.getUTCHours();  // Get hours in UTC
const minutes = date.getUTCMinutes()
  
      // 🔍 Search in MongoDB
      const cars = await Car.find({
        source: source,
        destination: destination,
        pickUpDate: { $gte: startOfDay, $lte: endOfDay },
      });

  
      if (cars.length === 0) {
        return res.status(404).json({ message: "No cars found", cars: [] });
      }
  
      res.status(200).json({message: "✅ cars found", cars });
    } catch (error) {
      // console.error("Error searching cars:", error);
      console.error("Error searching cars:", error.stack);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // 🔹 API: Get Car by ID
  router.get("/:id", async (req, res) => {
    try {
      const car = await findById(req.params.id);
      if (!car) return res.status(404).json({ message: "❌ Car not found" });
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "❌ Server error", error });
    }
  });
  
  // 🔹 API: Update Car by ID
  router.put("/:id", async (req, res) => {
    try {
      const updatedCar = await findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCar) return res.status(404).json({ message: "❌ Car not found" });
      res.json({ message: "✅ Car updated successfully", car: updatedCar });
    } catch (error) {
      res.status(500).json({ message: "❌ Server error", error });
    }
  });
  
  // 🔹 API: Delete Car by ID
  router.delete("/:id", async (req, res) => {
    try {
      const deletedCar = await findByIdAndDelete(req.params.id);
      if (!deletedCar) return res.status(404).json({ message: "❌ Car not found" });
      res.json({ message: "✅ Car deleted", car: deletedCar });
    } catch (error) {
      res.status(500).json({ message: "❌ Server error", error });
    }
  });
  
  // export default router;
  module.exports = router;