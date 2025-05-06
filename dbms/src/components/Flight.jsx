
// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// function Flight() {
//   const location = useLocation();
//   // const data = Array.isArray(location.state) ? location.state : []; 
//   const { flights, searchParams } = location.state || {};

  

//   console.log("Flight data:", flights);
//   // console.log("Search parameters:", searchParams);


// if (!flights || flights.length === 0) {
//   return <div className='flex justify-center gap-3 text-xl'><span className='text-red-500 font-bold'>Opps!</span>No flights found based on your search criteria.</div>;
// }

//   return (
//     <div>
//     {flights.length > 0 ? (
//       flights.map((item) => {
//         // const departureTime = flights[0].departureTime;
//         const departureTime = new Date(item.departureTime);
//         const arrivalTime = new Date(item.arrivalTime);

//         const formattedTime = `${departureTime.getHours().toString().padStart(2, '0')}:${departureTime.getMinutes().toString().padStart(2, '0')}`;
//         const formattedArrivalTime = `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`;

//         // const arrivalTime = flights[0].arrivalTime;
// const arrivalDate = new Date(arrivalTime)
// const arrivalHours = arrivalDate.getHours();
// const arrivalMinutes = arrivalDate.getMinutes();



//         return (
//           <div
//             className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl p-6 w-full my-4 transition-all duration-300 shadow-2xl max-w-7xl mx-auto mt-10 sm:px-5 poppins"
//             key={item.id}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-3xl font-extrabold text-white">{item.airline}</h3>
//               <p className="text-lg font-semibold text-white opacity-70">Flight ID: {item.flightNumber}</p>
//             </div>
//             <div className="flex flex-col space-y-4">
//               <div className="flex justify-evenly">
//                 <div className="flex flex-col justify-start text-lg text-white">
//                   <span>
//                     <strong className="text-xl">Departure:</strong> <span className='text-zinc-500 font-semibold'>{formattedTime}</span>
//                   </span>
//                 </div>
//                 <span className="text-yellow-500 font-bold text-3xl">--------</span>
//                 <div className="flex justify-end items-center text-lg text-white">
//                   <span>
//                     <strong className="text-xl">Arrival:</strong> <span className='text-zinc-500 font-semibold'>{formattedArrivalTime}</span>
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center text-2xl font-bold justify-between">
//                 <span>
//                   <div className="text-white flex gap-3">
//                     Price: <span className="text-zinc-600">₹ {item.price}</span>
//                   </div>
//                 </span>
//                 <button className="rounded-full bg-white text-teal-500 cursor-pointer hover:scale-105 p-4 font-semibold">
//                   Book
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })
//     ) 
//     : (
//       <p className='m-2 text-xl'>No flights data available.</p>
//     )}

//   </div>
//   );
// }

// export default Flight;



import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function Flight() {
  const location = useLocation();
  const navigate = useNavigate();

  const { flights } = location.state || {};
  const [selectedFlight, setSelectedFlight] = useState(null);

  if (!flights || flights.length === 0) {
    return (
      <div className='flex justify-center gap-3 text-xl'>
        <span className='text-red-500 font-bold'>Oops!</span>No flights found based on your search criteria.
      </div>
    );
  }

  // 👇 Initialize PayPal payment
  const loadPayPalButtons = (flight) => {
    setSelectedFlight(flight);

    setTimeout(() => {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: flight.price.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        // onApprove: function (data, actions) {
        //   return actions.order.capture().then(function (details) {
        //     alert(`✅ Payment successful! Thank you, ${details.payer.name.given_name}`);
        //     navigate("/dashboard?payment=success");
        //   });
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert(`✅ Payment successful! Thank you, ${details.payer.name.given_name}`);
          });
        },
        onError: function (err) {
          console.error("Payment error:", err);
          alert("❌ Payment failed. Please try again.");
        },
      }).render("#paypal-buttons-container");
    }, 0);
  };

  // const handlePayment = async (priceInRupees) => {
  //     try {
  //       const amount = priceInRupees * 100;
    
  //       const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
  //         amount,
  //       });
    
  //       const options = {
  //         key: "rzp_test_ChC1v5xGnKuucU",
  //         amount: order.amount,
  //         currency: order.currency,
  //         name: "Your Company",
  //         description: "Car Booking",
  //         order_id: order.id,
  //         handler: function (response) {
  //           alert("Payment successful!");
  //           console.log(response);
  //         },
  //         prefill: {
  //           name: "John Doe",
  //           email: "john@example.com",
  //           contact: "9999999999",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };
    
  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     } catch (err) {
  //       console.error("Payment error:", err);
  //       alert("Something went wrong. Please try again.");
  //     }
  //   };

  const handlePayment = async (priceInRupees, item) => {
    try {
      const amount = priceInRupees * 100;
      const isCarBooking = false; // or false if it's a flight

  
      const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount,
      });
  
      const options = {
        key: "rzp_test_ChC1v5xGnKuucU",
        amount: order.amount,
        currency: order.currency,
        name: "Tiwari Travels",
        description: "Flight Booking",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment successful!");
  
          try {
            await axios.post("http://localhost:5000/api/payment/save", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              amount: order.amount,
              customerId: localStorage.getItem("userId"),
              ...(isCarBooking
                ? { carDetails: item }
                : { flightDetails: item }),
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

  return (
    <div>
      {flights.map((item) => {
        const departureTime = new Date(item.departureTime);
        const arrivalTime = new Date(item.arrivalTime);

        const formattedTime = `${departureTime.getHours().toString().padStart(2, '0')}:${departureTime.getMinutes().toString().padStart(2, '0')}`;
        const formattedArrivalTime = `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`;

        return (
          <div
            className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl p-6 w-full my-4 transition-all duration-300 shadow-2xl max-w-7xl mx-auto mt-10 sm:px-5 poppins"
            key={item.id}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-extrabold text-white">{item.airline}</h3>
              <p className="text-lg font-semibold text-white opacity-70">Flight ID: {item.flightNumber}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-evenly">
                <div className="flex flex-col justify-start text-lg text-white">
                  <span>
                    <strong className="text-xl">Departure:</strong> <span className='text-zinc-500 font-semibold'>{formattedTime}</span>
                  </span>
                </div>
                <span className="text-yellow-500 font-bold text-3xl">--------</span>
                <div className="flex justify-end items-center text-lg text-white">
                  <span>
                    <strong className="text-xl">Arrival:</strong> <span className='text-zinc-500 font-semibold'>{formattedArrivalTime}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center text-2xl font-bold justify-between">
                <span>
                  <div className="text-white flex gap-3">
                    Price: <span className="text-zinc-600">₹ {item.price}</span>
                  </div>
                </span>
                <button
                  className="rounded-full bg-white text-teal-500 cursor-pointer hover:scale-105 p-4 font-semibold"
                  onClick={() => handlePayment(item.price, item)}
                >
                  Book
                </button>
              </div>

              
              {/* {selectedFlight?.id === item.id && (
                <div id="paypal-buttons-container" className="mt-4" />
              )} */}
            </div>
          </div>
        );
      })}
      {/* <button onClick={()=>window.location="./home"} className='m-4 rounded-full p-4 bg-red-400 text-white font-bold cursor-pointer poppins w-2xl text-lg'>Back</button> */}
    </div>
  );
}

export default Flight;

