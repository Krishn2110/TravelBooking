const express = require("express");
const { createOrder} = require("../controllers/paymentController");
const {savePayment} = require("../controllers/paymentController")
const router = express.Router();

router.post("/create-order", createOrder);

router.post("/save", savePayment);


module.exports = router;
