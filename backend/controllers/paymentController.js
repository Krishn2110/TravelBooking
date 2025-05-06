const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const Payment = require("../models/Payment");


exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.savePayment = async (req, res) => {
  try {
    console.log("Received payment save request:", req.body); // ✅ Add this
    const payment = new Payment(req.body);
    await payment.save();
    res.status(200).json({ message: "Payment saved!" });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Could not save payment" });
  }
};

