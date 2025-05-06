import React from 'react'
import { useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  return (
    <div className='flex  items-center justify-between p-4 bg-[#2453a4] text-black ml-20 mr-20 mt-5 rounded-full'>
      <div className='logo flex text-2xl font-bold text-white'>TIWARI Travels</div>
      <div className='flex gap-4'>
        {/* <ul className='flex gap-5 font-semibold text-xl'>
          <li className='flex items-center gap-1'><img src='https://edge.ixigo.com/st/vimaan/_next/static/media/flight.f515b25a.svg' width={40} height={40}></img>Flight</li>
          <li className='flex items-center gap-1'><img src='/car.png' width={45} height={45}></img>Car</li>
          <li className='flex items-center gap-1'><img src='https://edge.ixigo.com/st/vimaan/_next/static/media/hotel.4b63222d.svg' width={40} height={40}></img>Hotels</li>
        </ul> */}
        <button onClick={() => navigate("/flight")}  className='p-3 bg-[#D8EFED] gap-1 rounded-full flex items-center text-black font-bold transform transition duration-200 hover:scale-110 hover:cursor-pointer'><img src='https://edge.ixigo.com/st/vimaan/_next/static/media/flight.f515b25a.svg' width={40} height={40}></img>Flight</button>
        <button onClick={() => navigate("/car")} className='p-3 bg-[#D8EFED] gap-1 rounded-full flex items-center text-black font-bold transform transition duration-200 hover:scale-110 hover:cursor-pointer'><img src='/car.png' width={40} height={40}></img>Car</button>
        <button onClick={() => navigate("/hotel")} className='p-3 bg-[#D8EFED] gap-1 rounded-full flex items-center text-black font-bold transform transition duration-200 hover:scale-110 hover:cursor-pointer'><img src='https://edge.ixigo.com/st/vimaan/_next/static/media/hotel.4b63222d.svg' width={40} height={40}></img>Hotels</button>
      </div>
    </div>
  )
}

export default Navbar


