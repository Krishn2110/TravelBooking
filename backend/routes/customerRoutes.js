const express = require("express");
const router = express.Router();
// const Customer = require('../models/Customer');
const Customer = require("../models/Customer.js");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
// const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

// router.use(cors({
//     origin: "http://localhost:5173", // ✅ Frontend URL
//     methods: ['GET', 'POST'],
//     credentials: true // ✅ Allows cookies
// }));
// router.use(cookieParser());
// router.use(bodyParser.json());



// 🔹 API: Create a new Customer
// router.post('/', async (req, res) => {
//   try {
//     const { fullname, email, phone, dateOfBirth, gender, address, password } = req.body;

//     // Validate required fields
//     if (!fullname || !email || !phone || !dateOfBirth || !gender || !address || !password) {
//       return res.status(400).json({ message: "❌ All fields are required" });
//     }

//     // Check if customer already exists
//     const existingCustomer = await Customer.findOne({ email });
//     if (existingCustomer) {
//       return res.status(400).json({ message: "❌ Customer with this email already exists" });
//     }

//     const newCustomer = new Customer({
//       fullname,
//       email,
//       phone,
//       dateOfBirth: new Date(dateOfBirth),
//       gender,
//       address,
//       password,  // You should hash the password in production
//     });

//     await newCustomer.save();
//     res.status(201).json({ message: "✅ Customer added successfully", customer: newCustomer });
//   } catch (error) {
//     res.status(500).json({ message: "❌ Server error", error });
//   }
// });




router.post("/register", async (req, res) => {
  console.log('Registration request received');
    const { fullname, email, phone, password, dateOfBirth, gender, address } = req.body;

    
    const existingCustomer = await Customer.findOne({ $or: [{ email }, { fullname }] });


    if (existingCustomer) {
        return res.status(401).json({ error: "Customer already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    // const customer = await Customer.create({
    //     fullname,
    //     email,
    //     phone,
    //     password: hashedPassword,
    //     dateOfBirth,
    //     gender,
    //     address,
    // });

    const newCustomer = new Customer({
      fullname,
      email,
      phone,
      password: hashedPassword,
      dateOfBirth,
      gender,
      address,
    });

    // Save the customer
    await newCustomer.save();

    // Generate JWT token and set it in the cookies
    // const token = jwt.sign({ email: email, userid: customer._id, userType: "customer" }, "Kislay");
    const token = jwt.sign({ email: email, userType: "customer" }, "Kislay");

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    // Respond with success message
    res.status(201).json({ message: "Customer registered successfully" });
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find customer by email
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign(
      {
        email: user.email,
        userid: user._id,
      },
      "Kislay", // Secret key — consider storing in .env
      { expiresIn: "7d" }
    );

    // Send token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// 🔹 API: Get all Customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Get Customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "❌ Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Update Customer by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ message: "❌ Customer not found" });
    res.json({ message: "✅ Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 🔹 API: Delete Customer by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "❌ Customer not found" });
    res.json({ message: "✅ Customer deleted", customer: deletedCustomer });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error });
  }
});

module.exports = router;




