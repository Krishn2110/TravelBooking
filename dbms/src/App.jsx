import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Flight from './components/Flight'
import Car from './components/Car'
import Hotel from './components/Hotel'
import AdminDashboard from './admin/AdminDashboard'
import FlightAdmin from './admin/FlightAdmin'
import HotelAdmin from './admin/HotelAdmin'
import CarAdmin from './admin/CarAdmin'
import Home from './components/Home'
import Dashboard from './customer/Dashboard'
import FlightCustomer from './customer/FlightCustomer'
import CarCustomer from './customer/CarCustomer'
import HotelCustomer from './customer/HotelCustomer'
import CustomerBookingsPage from './customer/CustomerBookingPage'


function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const flight = location.pathname.startsWith("/flight");
  const car = location.pathname.startsWith("/car");
  const hotel = location.pathname.startsWith("/hotel");
  const dashboard = location.pathname.startsWith("/customer-dashboard");

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      // style={{
      //   backgroundImage: 'url("place.jpg")',
      // }}
    >
      {!isAdminRoute && !flight && !car && !hotel && !dashboard && <Home/>}

      {/* {!isAdminRoute && <Navbar />} */}

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      
      <div className="flex-grow">
      <Routes>
        {/* User Routes */}
        <Route path="/flight" element={<Flight />} />
        <Route path="/car" element={<Car />} />
        <Route path="/hotel" element={<Hotel />} />

        <Route path="/customer-dashboard/flightcustomer" element={<FlightCustomer />} />
        <Route path="/customer-dashboard/carcustomer" element={<CarCustomer />} />
        <Route path="/customer-dashboard/hotelcustomer" element={<HotelCustomer />} />

        <Route path="/customer-dashboard/bookings" element={<CustomerBookingsPage />} />

        <Route path="/customer-dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        <Route path="/admin/flightadmin" element={<FlightAdmin />} />
        <Route path="/admin/hoteladmin" element={<HotelAdmin />} />
        <Route path="/admin/caradmin" element={<CarAdmin />} />
      </Routes>
      </div>
     </div>
    </>
  );
}



function App() {
  const [count, setCount] = useState(0)

  return (

    
    <Router>
      <Layout />
    </Router>
  
  )
}

export default App
