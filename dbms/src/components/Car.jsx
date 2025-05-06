import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";


function Car() {
  const location = useLocation();

  const { cars, searchParams } = location.state || {};

  console.log("Car data:", cars);
  console.log("Search parameters:", searchParams);
 

  // const handlePayment = async (priceInRupees) => {
  //   try {
  //     const amount = priceInRupees * 100;
  
  //     const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
  //       amount,
  //     });
  
  //     const options = {
  //       key: "rzp_test_ChC1v5xGnKuucU",
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "Your Company",
  //       description: "Car Booking",
  //       order_id: order.id,
  //       handler: function (response) {
  //         alert("Payment successful!");
  //         console.log(response);
  //       },
  //       prefill: {
  //         name: "John Doe",
  //         email: "john@example.com",
  //         contact: "9999999999",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  
  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
  

  const handlePayment = async (priceInRupees, item) => {
    try {
      const amount = priceInRupees * 100;
  
      const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount,
      });
  
      const options = {
        key: "rzp_test_ChC1v5xGnKuucU",
        amount: order.amount,
        currency: order.currency,
        name: "Tiwari Travels",
        description: "Car Booking",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment successful!");
  
          try {
            await axios.post("http://localhost:5000/api/payment/save", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              amount: order.amount,
              customerId: localStorage.getItem("userId"), // or from auth context
              carDetails: item,
            });
  
            window.location.href = "/customer-dashboard"; // ✅ Redirect
          } catch (saveError) {
            console.error("Error saving payment:", saveError);
            alert("Payment succeeded, but booking not saved!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  


    
    

  
  if (!cars || cars.length === 0) {
    return <div className='flex justify-center flex-col items-center gap-3 text-xl'><span className='text-red-500 font-bold'>Opps!</span>No hotels found based on your search criteria.
    <button onClick={()=>window.location="./home"} className='m-4 rounded-full p-4 bg-red-400 text-white font-bold cursor-pointer poppins w-2xl text-lg'>Back</button></div>
    ;
  }
  


  return (
    <div>
    {cars.length > 0 ? (
      cars.map((item) => {
        
        const date = new Date(item.pickUpDate);

        // Extract hours and minutes
        const hours = date.getUTCHours(); 
        const minutes = date.getUTCMinutes();  
        
        // Format the time in HH:MM format
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const formattedDate = date.toISOString().split('T')[0];

        const date1 = new Date(item.dropOffDate);
        // Extract hours and minutes
        const hours1 = date1.getUTCHours(); 
        const minutes1 = date1.getUTCMinutes();  
        
        // Format the time in HH:MM format
        const formattedArrivalTime = `${hours1.toString().padStart(2, '0')}:${minutes1.toString().padStart(2, '0')}`;
        const formattedArrivalDate = date1.toISOString().split('T')[0];

        const timeDifference = date1 - date; // Time difference in milliseconds

// Convert milliseconds to hours and minutes
const diffInMinutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours
const remainingMinutes = diffInMinutes % 60;

console.log(`Time difference: ${diffInHours} hours and ${remainingMinutes} minutes`)



        return (
          <div
            className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl p-6 w-full my-4 transition-all duration-300 shadow-2xl max-w-7xl mx-auto mt-10 sm:px-5 poppins"
            key={item.id}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-extrabold text-white">{item.companyName}</h3>
              <p className="text-lg font-semibold text-white opacity-70">Car Type: {item.carType}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-evenly">
                <div className="flex flex-col justify-start text-lg text-white">
                  <span className='flex flex-col'>
                  <strong className="text-xl flex">Pick-up-Date:</strong><span className='text-zinc-500 font-semibold'>{formattedDate}</span> 
                    <strong className="text-xl">Pick-Up-Time</strong> <span className='text-zinc-500 font-semibold'>{formattedTime}</span>
                  </span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <span className='font-bold text-zinc-600'>{` ${diffInHours} hours ${remainingMinutes} minutes`}</span>
                <span className="text-yellow-500 font-bold text-3xl">--------</span>
                </div>
                <div className="flex justify-end items-center text-lg text-white">
                  <span className='flex flex-col'>
                  <strong className="text-xl">Drop-Off-Date:</strong> <span className='text-zinc-500 font-semibold'>{formattedArrivalDate}</span>
                    <strong className="text-xl">Drop-Off-Time </strong><span className='text-zinc-500 font-semibold'>{formattedArrivalTime}</span> 
                  </span>
                </div>
              </div>
              <div className="flex items-center text-2xl font-bold justify-between">
                <span>
                  <div className="text-white flex gap-3">
                    Price: <span className="text-zinc-600">₹ {item.price}</span>
                  </div>
                </span>
                <button  onClick={() => handlePayment(item.price, item)} className="rounded-full bg-white text-teal-500 cursor-pointer hover:scale-105 p-4 font-semibold">
                  Book
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) 
    : (
      <p className='m-2 text-xl'>No cars data available.</p>
    )}

  </div>
  );
}

export default Car;
