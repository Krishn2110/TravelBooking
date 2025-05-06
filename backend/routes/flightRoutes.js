const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

// 🔹 API: Add a New Flight
router.post("/", async (req, res) => {
  try {
    const { flightNumber, airline, source, destination, departureTime, arrivalTime, travellerClass, price, seatsAvailable } = req.body;

    if (!flightNumber || !airline || !source || !destination || !departureTime || !arrivalTime || !travellerClass || !price || !seatsAvailable) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const existingFlight = await Flight.findOne({ flightNumber });
    if (existingFlight) {
      return res.status(400).json({ message: "❌ Flight already exists" });
    }

    const newFlight = new Flight({
      flightNumber,
      airline,
      source,
      destination,
      departureTime,
      arrivalTime,
      travellerClass,
      price,
      seatsAvailable,
    });

    await newFlight.save();
    res.status(201).json({ message: "✅ Flight added successfully", flight: newFlight });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Get All Flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { source, destination, departureTime } = req.body;

    // Check if required parameters are provided
    if (!source || !destination || !departureTime) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    console.log("Querying flights with:", { source, destination, departureTime });

    const startOfDay = new Date(departureTime);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(departureTime);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // 🔍 Search in MongoDB
    const flights = await Flight.find({
      source: source,
      destination: destination,
      departureTime: { $gte: startOfDay, $lte: endOfDay },
    });

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found", flights: [] });
    }

    res.status(200).json({message: "✅ Flights found", flights });
  } catch (error) {
    // console.error("Error searching flights:", error);
    console.error("Error searching flights:", error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// 🔹 API: Get Flight by ID
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "❌ Flight not found" });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Delete Flight by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) return res.status(404).json({ message: "❌ Flight not found" });
    res.json({ message: "✅ Flight deleted", flight: deletedFlight });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

module.exports = router;






















// const mongoose = require("mongoose");
// const Flight = require("../models/flightModel"); // Import flight model

// const insertFlights = async () => {
//   try {
//     const newFlights = [
//       {
//         flightNumber: "UK303",
//         airline: "Vistara",
//         source: "Delhi",
//         destination: "Chennai",
//         departureTime: new Date("2024-06-12T09:00:00Z"),
//         arrivalTime: new Date("2024-06-12T11:30:00Z"),
//         price: 6000,
//         seatsAvailable: 60,
//       },
//       {
//         flightNumber: "6E404",
//         airline: "IndiGo",
//         source: "Bangalore",
//         destination: "Kolkata",
//         departureTime: new Date("2024-06-13T07:00:00Z"),
//         arrivalTime: new Date("2024-06-13T09:30:00Z"),
//         price: 5500,
//         seatsAvailable: 55,
//       },
//       {
//         flightNumber: "AI505",
//         airline: "Air India",
//         source: "Mumbai",
//         destination: "Hyderabad",
//         departureTime: new Date("2024-06-14T18:00:00Z"),
//         arrivalTime: new Date("2024-06-14T20:00:00Z"),
//         price: 4800,
//         seatsAvailable: 45,
//       },
//       {
//         flightNumber: "SG606",
//         airline: "SpiceJet",
//         source: "Kolkata",
//         destination: "Delhi",
//         departureTime: new Date("2024-06-15T05:30:00Z"),
//         arrivalTime: new Date("2024-06-15T08:00:00Z"),
//         price: 6500,
//         seatsAvailable: 35,
//       },
//       {
//         flightNumber: "UK707",
//         airline: "Vistara",
//         source: "Hyderabad",
//         destination: "Mumbai",
//         departureTime: new Date("2024-06-16T22:00:00Z"),
//         arrivalTime: new Date("2024-06-16T23:55:00Z"),
//         price: 5000,
//         seatsAvailable: 50,
//       },
//       {
//         flightNumber: "6E808",
//         airline: "IndiGo",
//         source: "Delhi",
//         destination: "Bangalore",
//         departureTime: new Date("2024-06-17T12:15:00Z"),
//         arrivalTime: new Date("2024-06-17T15:00:00Z"),
//         price: 6200,
//         seatsAvailable: 70,
//       },
//       {
//         flightNumber: "AI909",
//         airline: "Air India",
//         source: "Chennai",
//         destination: "Kolkata",
//         departureTime: new Date("2024-06-18T20:30:00Z"),
//         arrivalTime: new Date("2024-06-18T23:15:00Z"),
//         price: 5800,
//         seatsAvailable: 40,
//       },
//       {
//         flightNumber: "SG1010",
//         airline: "SpiceJet",
//         source: "Bangalore",
//         destination: "Hyderabad",
//         departureTime: new Date("2024-06-19T06:45:00Z"),
//         arrivalTime: new Date("2024-06-19T08:15:00Z"),
//         price: 4000,
//         seatsAvailable: 65,
//       },
//       {
//         flightNumber: "UK1111",
//         airline: "Vistara",
//         source: "Delhi",
//         destination: "Goa",
//         departureTime: new Date("2024-06-20T16:00:00Z"),
//         arrivalTime: new Date("2024-06-20T18:30:00Z"),
//         price: 7000,
//         seatsAvailable: 30,
//       },
//       {
//         flightNumber: "6E1212",
//         airline: "IndiGo",
//         source: "Mumbai",
//         destination: "Chennai",
//         departureTime: new Date("2024-06-21T09:45:00Z"),
//         arrivalTime: new Date("2024-06-21T12:00:00Z"),
//         price: 5300,
//         seatsAvailable: 55,
//       },
//     ];

//     for (const flight of newFlights) {
//       const exists = await Flight.findOne({ flightNumber: flight.flightNumber });
//       if (!exists) {
//         await Flight.create(flight);
//         console.log(`✅ Added Flight ${flight.flightNumber}`);
//       } else {
//         console.log(`ℹ️ Flight ${flight.flightNumber} already exists`);
//       }
//     }

//     console.log("✅ Flight insertion process completed.");
//   } catch (error) {
//     console.error("❌ Error inserting flights:", error);
//   }
// };

// module.exports = insertFlights;
