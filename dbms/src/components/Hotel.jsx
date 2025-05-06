import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Hotel() {
  const location = useLocation();
  // const data = Array.isArray(location.state) ? location.state : []; 
  const { hotels, searchParams } = location.state || {};

  

  console.log("Hotel data:", hotels);
  console.log("Search parameters:", searchParams);


if (!hotels || hotels.length === 0) {
  return <div className='flex justify-center flex-col items-center gap-3 text-xl'><span className='text-red-500 font-bold'>Opps!</span>No hotels found based on your search criteria.
  <button onClick={()=>window.location="./home"} className='m-4 rounded-full p-4 bg-red-400 text-white font-bold cursor-pointer poppins w-2xl text-lg'>Back</button></div>
  ;
}

  return (
    <div className='flex flex-col items-center gap-6'>
      
    {hotels.length > 0 ? (
      hotels.map((item) => {
    
        const departureTime = new Date(item.checkInDate);
        const arrivalTime = new Date(item.checkOutDate);

        const formattedTime = `${departureTime.getHours().toString().padStart(2, '0')}:${departureTime.getMinutes().toString().padStart(2, '0')}`;
        const formattedArrivalTime = `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`;

        // const arrivalTime = flights[0].arrivalTime;
const arrivalDate = new Date(arrivalTime)
const arrivalHours = arrivalDate.getHours();
const arrivalMinutes = arrivalDate.getMinutes();



        return (
          <div
            className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl p-6 w-full my-4 transition-all duration-300 shadow-2xl max-w-7xl mx-auto mt-10 sm:px-5 poppins"
            key={item.id}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-extrabold text-white">{item.hotelName}</h3>
              <p className="text-lg font-semibold text-white opacity-70">Rating: <span className='text-teal-500 p-4 rounded-xl bg-white'> {item.rating}</span></p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-evenly">
                <div className="flex flex-col justify-start text-lg text-white">
                  <span>
                    <strong className="text-xl">Available Rooms:</strong><span className='text-2xl font-semibold'> {item.availableRooms}</span>
                  </span>
                </div>
                {/* <span className="text-yellow-500 font-bold text-3xl">--------</span> */}
                {/* <div className="flex justify-end items-center text-lg text-white">
                  <span>
                    <strong className="text-xl">Arrival:</strong> {formattedArrivalTime}
                  </span>
                </div> */}
              </div>
              <div className="flex items-center text-2xl font-bold justify-between">
                <span>
                  <div className="text-white flex gap-3">
                    Price: <span className="text-zinc-600">₹ {item.pricePerNight}</span>
                  </div>
                </span>
                <button className="rounded-full bg-white text-teal-500 cursor-pointer hover:scale-105 p-4 font-semibold">
                  Book
                </button>
              </div>
            </div>
            
          </div>
        );
      })
    ) 
    : (
      <p className='m-2 text-xl'>No hotels data available.</p>
    )}
  <button onClick={()=>window.location="./home"} className='m-4 rounded-full p-4 bg-red-400 text-white font-bold cursor-pointer poppins w-2xl text-lg'>Back</button>
  </div>
  );
}

export default Hotel
