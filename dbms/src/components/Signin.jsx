import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ setIsSignupOpen, setIsSigninOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/customer/login", {
        email,
        password,
      }, { withCredentials: true });

      setSuccess("Login successful!");
      setIsSigninOpen(false);
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "signin-modal") {
        setIsSigninOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section
      id="signin-modal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-[rgba(17,22,28,0.8)] z-50"
    >
      <div className="w-[40vw] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#064848] text-center mb-6">Customer Sign In</h2>

        {/* Close Button */}
        <button
          className="relative bottom-14 left-56 text-gray-700 text-xl cursor-pointer"
          onClick={() => setIsSigninOpen(false)}
          aria-label="Close Sign In Modal"
        >
          ✖
        </button>

        {/* Messages */}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        {/* Sign In Form */}
        <form className="w-full flex flex-col gap-4 text-gray-500" onSubmit={handleSubmit}>
            <div className="w-full flex gap-4">
                        <div className="relative w-1/2">
                          <FontAwesomeIcon icon={faEnvelope} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                          type="email"
                                          name="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder="Email Address"
                                          className="w-full p-8 pl-16 pr-3 py-2 border rounded-lg outline-none focus:border-[#064848]"
                                          required
                                        />
                        </div>
                        <div className="relative w-1/2">
                           <FontAwesomeIcon icon={faLock} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                      <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full p-8 pl-16 pr-3 py-2 border-2 border-[#064848] rounded-lg outline-none transition-all duration-300 focus:border-[#064848]"
                                        required
                                      />
                        </div>
                        </div>

          <p className="mt-2 text-gray-600 text-center text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-[#064848] font-semibold hover:underline hover:text-yellow-600 cursor-pointer"
              onClick={() => {
                setIsSigninOpen(false);
                setIsSignupOpen(true);
              }}
            >
              Register here
            </button>
          </p>

          <button
            type="submit"
            className="bg-[#064848] hover:text-yellow-200 font-semibold text-lg text-white px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

// Reusable input field component
const InputField = ({ icon, ...props }) => (
  <div className="relative w-full">
    <FontAwesomeIcon icon={icon} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      {...props}
      className="w-full pl-10 pr-3 py-2 border-2 border-[#064848] rounded-lg outline-none transition-all duration-300 focus:border-[#064848]"
      required
    />
  </div>
);

export default Signin;
