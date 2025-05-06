import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdCard, faLock, faPhone, faUser, faCalendar, faVenusMars, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsSignupOpen, setIsSigninOpen }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const response = await axios.post("http://localhost:5000/register", formData, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     setSuccess(response.data.message);
  //     setFormData({
  //       fullname: "",
  //       email: "",
  //       phone: "",
  //       password: "",
  //       dateOfBirth: "",
  //       gender: "",
  //       address: "",
  //     });

  //     setIsSignupOpen(false);
  //     navigate("/customer-dashboard");
  //   } catch (err) {
  //     setError(err.response?.data?.error || "Registration failed!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post("http://localhost:5000/register/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      setSuccess(response.data.message);
      // Reset form data after success
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        address: "",
      });
      setIsSignupOpen(false);
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed!");
    }
  };
  

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "signup-modal") {
        setIsSignupOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Function to open login form
  const openLogin = () => {
    setIsSignupOpen(false);
    setIsSigninOpen(true);
  };

  return (
    <section
      id="signup-modal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-[rgba(17,22,28,0.8)] z-50"
    >
      <div className="w-[60vw] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#064848] mt-2 text-center mb-6">
          Customer Signup
        </h2>

        {/* Close Button */}
        <button className="relative bottom-14 left-56 text-gray-500 cursor-pointer text-xl font-bold" onClick={() => setIsSignupOpen(false)}>
          ✖
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500">{success}</p>}

        {/* Signup Form */}
        <form className="w-full flex flex-col gap-3 text-gray-500" onSubmit={handleSubmit}>
          <div className="w-full flex gap-4">
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faUser} className="absolute left-2  top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              />
            </div>
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faPhone} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              />
            </div>
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faCalendar} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faVenusMars} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                required
              />
            </div>
          </div>

          <div className="relative w-[49%]">
            <FontAwesomeIcon icon={faLock} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-8 pl-16 pr-3 py-2 border-2 border-[#064848] rounded-lg outline-none transition-all duration-300 focus:border-[#064848]"
              required
            />
          </div>

          <p className="mt-4 text-gray-600 text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#064848] font-semibold hover:underline hover:text-yellow-600 cursor-pointer"
              onClick={openLogin}
            >
              Login
            </button>
          </p>

          <button
            type="submit"
            className="bg-[#064848] hover:text-yellow-200 font-semibold text-lg text-white px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Register as Customer
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
