const mongoose = require("mongoose");


const customerSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;