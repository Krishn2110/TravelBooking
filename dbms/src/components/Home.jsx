import './Home.css'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faCar,  } from '@fortawesome/free-solid-svg-icons';
import Flight from './Flight';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';

const Home = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("flights");

     const [flights, setFlights] = useState([]);
      const [source, setSource] = useState("");
      const [destination, setDestination] = useState("");
      const [departureTime, setDepartureTime] = useState("");
      const [error, setError] = useState("")
      const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotels, setHotels] = useState([]);
  // const [destination, setDestination] = useState('');
const [pickUpDate, setPickUpDate] = useState('');

const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);



    const handleSearch = () => {
      console.log("Search params:", { source, destination, departureTime });
    
      // Input validation
      if (!source || !destination || !departureTime) {
        setError("Please fill in all fields: Source, Destination, and Departure Date.");
        return;
      }
      
      setError(""); // Clear any previous errors
    
      // Format the departureTime to only include the date
      const dateOnly = departureTime.split('T')[0];
    
      // Fetch flight data
      fetch("http://localhost:5000/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer YOUR_API_KEY" // Uncomment if needed
        },
        body: JSON.stringify({
          source: source,
          destination: destination,
          departureTime: dateOnly, // Send only the date part
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched flights:", data);
          
          // Check if data.flights is an array, and use it, or default to an empty array
          navigate('/flight', {
            state: {
              flights: Array.isArray(data.flights) ? data.flights : [],
              searchParams: { source, destination, departureTime: dateOnly },
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching flights:", error);
    
          // Even in case of an error, navigate with empty results
          navigate('/flight', {
            state: {
              flights: [],
              searchParams: { source, destination, departureTime: dateOnly },
            }
          });
        });
    };
    


  const handleSearch1 = () => {
    console.log("Search params:", { location, checkInDate, checkOutDate });

    setError(''); // Reset any previous errors
  
    // Input validation
    if (!location || !checkInDate || !checkOutDate) {
      setError('Please fill in all fields: Location, Check-in Date, and Check-out Date.');
      return;
    }
  
    // Format the check-in and check-out dates (optional, if needed)
    const dateOnlyCheckIn = checkInDate.split('T')[0];  // Get only the date part of the check-in date
    const dateOnlyCheckOut = checkOutDate.split('T')[0]; // Get only the date part of the check-out date
  

  
    // Fetch hotel data
    fetch('http://localhost:5000/api/hotels/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
        checkInDate: dateOnlyCheckIn,  // Send only the date part of check-in date
        checkOutDate: dateOnlyCheckOut, // Send only the date part of check-out date
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched hotels:", data);
  
          navigate('/hotel', {
            state: {
              hotels: Array.isArray(data.hotels) ? data.hotels : [],
              searchParams: { location, checkInDate: dateOnlyCheckIn, checkOutDate: dateOnlyCheckOut },
            }
          });
        
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
        navigate('/hotel', {
          state: {
            hotels: [],
            searchParams: { location, checkInDate: dateOnlyCheckIn, checkOutDate:dateOnlyCheckOut },
          }
        });
      });
  };

  const handleSearchCars = () => {
    console.log("Search params:", { source, destination, pickUpDate });
  
    setError(''); // Reset any previous errors
    
    // Input validation
    if (!source || !destination || !pickUpDate) {
      setError('Please fill in all fields: Source, Destination, and Pick-up Date.');
      return;
    }
  
    // Format the pick-up date (optional, if needed)
    const dateOnlyPickUp = pickUpDate.split('T')[0];  // Get only the date part of the pick-up date
  
    // Fetch car data
    fetch('http://localhost:5000/api/cars/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source,
        destination,
        pickUpDate: dateOnlyPickUp,  // Send only the date part of the pick-up date
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cars:", data);
  
        // Navigate to the cars page with search parameters and results
        navigate('/car', {
          state: {
            cars: Array.isArray(data.cars) ? data.cars : [],
            searchParams: { source, destination, pickUpDate: dateOnlyPickUp },
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
  
        // Navigate to the cars page with no results in case of error
        navigate('/car', {
          state: {
            cars: [],
            searchParams: { source, destination, pickUpDate: dateOnlyPickUp },
          }
        });
      });
  };
  
    
    

  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GOGO Trips - Find Your Perfect Journey</title>
  <meta
    name="description"
    content="Book flights, hotels, and car rentals at the best prices with GOGO Trips."
  />
  <link rel="stylesheet" href="styles.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <div className="flex-col min-h-screen ">
    <header className="sticky-top border-b bg-background">
      <div className="container flex h-16 items-center justify-between poppins">
        <a href="/" className="flex items-center gap-2">
          <svg
            xmlns="https://photolisticlife.com/wp-content/uploads/2014/01/0713_Sicily_004.jpg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          <span className="text-2xl font-bold tracking-tight">TIWARI Travels</span>
        </a>
        <nav className="hidden md-flex gap-8">
          <a
            href="#"
            className="text-lg font-medium transition-colors hover-text-primary flex items-center gap-2 hover:scale-110  transform duration-400 ease-in-out"
          > <FontAwesomeIcon icon={faPlane} className='fa-solid fa-flip text-xl '  style={{ "--fa-animation-duration": "3s" }}/>
            Flights
          </a>
          <a
            href="#"
            className="text-lg font-medium transition-colors hover-text-primary flex items-center gap-2 hover:scale-110  transform duration-400 ease-in-out"
          > <FontAwesomeIcon icon={faHotel} className='fa-solid fa-flip text-xl' style={{ "--fa-animation-duration": "3s" }} />
            Hotels
          </a>
          <a
            href="#"
            className="text-lg font-medium transition-colors hover-text-primary flex items-center gap-2 hover:scale-110  transform duration-400 ease-in-out"
          >
            <FontAwesomeIcon icon={faCar} className='fa-solid fa-flip text-xl' style={{ "--fa-animation-duration": "3s" }}/>
            Cars
          </a>
          
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSigninOpen(true)}
            className="text-lg font-medium transition-colors hover-text-primary hidden md-block"
          >
            Sign In
          </button>
          {/* <button className="btn btn-primary text-lg hover:scale-110  transform duration-400 ease-in-out">Get Started</button> */}
          <button onClick={() => setIsSignupOpen(true)} className="relative  inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative p-4 transition-all ease-in duration-75 bg-gray-400 text-white  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Get started
</span>
</button>
        </div>
      </div>
    </header>
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://photolisticlife.com/wp-content/uploads/2014/01/0713_Sicily_004.jpg"
            alt="Beautiful travel destination"
            className="object-cover brightness-70 w-full h-full"
          />
        </div>
        <div className="container relative z-10 py-24 md-py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm-text-5xl md-text-6xl">
              Discover Your Perfect Journey
            </h1>
            <p className="mt-6 text-lg md-text-xl">
              Find and book the best deals on flights, hotels, and car rentals
              worldwide
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-white p-4 shadow-lg">
            <div className="tabs-container w-full">
              <div className="tabs-list grid w-full grid-cols-3 mb-4">
                {/* <button className="tab-trigger active" data-tab="flights"> */}
                <button
          className= {`tab-trigger ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                  <span className='text-lg'>Flights</span>
                </button>
                {/* <button  className="tab-trigger" data-tab="hotels"> */}
                <button
          className={`tab-trigger ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                    <path d="M2 21h20" />
                    <path d="M12 7v.01" />
                    <path d="M7 13h10" />
                  </svg>
                  <span>Hotels</span>
                </button>
                <button className={`tab-trigger ${activeTab === "cars" ? "active" : ""}`}
                    onClick={() => setActiveTab("cars")} data-tab="cars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                    <circle cx={7} cy={17} r={2} />
                    <path d="M9 17h6" />
                    <circle cx={17} cy={17} r={2} />
                  </svg>
                  <span>Cars</span>
                </button>
              </div>
              {/* {activeTab === "flights" && ( */}

              {/* <div className="tab-content active" id="flights-content"> */}
              <div className="tab-content-container">
              <div  className={`tab-content ${activeTab === "flights" ? "active" : ""}`}>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                      <input value={source} onChange={(e) => setSource(e.target.value)} 
                        className="border-0 p-0 w-full"
                        placeholder="City or Airport"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                      <input value={destination} onChange={(e) => setDestination(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="City or Airport"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departure</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={4}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} x2={16} y1={2} y2={6} />
                        <line x1={8} x2={8} y1={2} y2={6} />
                        <line x1={3} x2={21} y1={10} y2={10} />
                      </svg>
                      <input value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="Select date"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Return</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={4}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} x2={16} y1={2} y2={6} />
                        <line x1={8} x2={8} y1={2} y2={6} />
                        <line x1={3} x2={21} y1={10} y2={10} />
                      </svg>
                      <input
                        className="border-0 p-0 w-full"
                        placeholder="Select date"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                
        
                {/* <button className="btn btn-primary w-full py-6 text-lg mt-4"> */}
                <button onClick={handleSearch} type="button" className="text-white btn btn-primary  w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-6 text-center me-2 mb-2 mt-4">
 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search Flights
                </button>
              </div>

{/* )} */}



{/* {activeTab === "hotels" && ( */}
              {/* <div className="tab-content" id="hotels-content"> */}
              <div className={`tab-content ${activeTab === "hotels" ? "active" : ""}`}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mr-2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                    <input value={location} onChange={(e) => setLocation(e.target.value)}
                      className="border-0 p-0 w-full"
                      placeholder="City or Hotel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-in</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={4}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} x2={16} y1={2} y2={6} />
                        <line x1={8} x2={8} y1={2} y2={6} />
                        <line x1={3} x2={21} y1={10} y2={10} />
                      </svg>
                      <input value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="Select date"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-out</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={4}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} x2={16} y1={2} y2={6} />
                        <line x1={8} x2={8} y1={2} y2={6} />
                        <line x1={3} x2={21} y1={10} y2={10} />
                      </svg>
                      <input value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="Select date"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                {/* <button className="btn btn-primary w-full py-6 text-lg mt-4"> */}
                <button onClick={handleSearch1} type="button" className="text-white btn btn-primary  w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-6 text-center me-2 mb-2 mt-4">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search Hotels
                </button>
              </div>
{/* )} */}

{/* {activeTab === "cars" && ( */}

              {/* <div className="tab-content" id="cars-content"> */}
              <div className={`tab-content ${activeTab === "cars" ? "active" : ""}`}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Pick-up Location
                  </label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mr-2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                    <input value={source} onChange={(e) => setSource(e.target.value)}
                      className="border-0 p-0 w-full"
                      placeholder="City or Airport"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Destination</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                      <input value={destination} onChange={(e) => setDestination(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="City or Airport"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pick-Up Date</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mr-2"
                      >
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={4}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} x2={16} y1={2} y2={6} />
                        <line x1={8} x2={8} y1={2} y2={6} />
                        <line x1={3} x2={21} y1={10} y2={10} />
                      </svg>
                      <input value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)}
                        className="border-0 p-0 w-full"
                        placeholder="Select date"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                {/* <button className="btn btn-primary w-full py-6 text-lg mt-4"> */}
                <button onClick={handleSearchCars} type="button" className="text-white btn btn-primary  w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-6 text-center me-2 mb-2 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search Cars
                </button>
              </div>
{/* )} */}
            </div>
          </div>
        </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover-shadow-xl">
              <div className="aspect-4-3 w-full relative">
                <img
                  src="https://media.istockphoto.com/id/635758088/photo/sunrise-at-the-eiffel-tower-in-paris-along-the-seine.jpg?s=612x612&w=0&k=20&c=rdy3aU1CDyh66mPyR5AAc1yJ0yEameR_v2vOXp2uuMM="
                  alt="Paris"
                  className="object-cover w-full h-full transition-transform group-hover-scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-70 to-transparent" />
              <div className="absolute bottom-0 w-full p-4 text-white">
                <h3 className="text-xl font-bold">Paris</h3>
                <p className="text-sm opacity-90">Flights from $499</p>
                <button className="btn btn-outline mt-2 bg-white-20 backdrop-blur-sm border-white-40 hover-bg-white-30 text-white">
                  Explore
                </button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover-shadow-xl">
              <div className="aspect-4-3 w-full relative">
                <img
                  src="https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?s=612x612&w=0&k=20&c=_MPdmDviIyhldqhf7t6s63C-bZbTGfNHMlJP9SIa8Y0="
                  alt="Bali"
                  className="object-cover w-full h-full transition-transform group-hover-scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-70 to-transparent" />
              <div className="absolute bottom-0 w-full p-4 text-white">
                <h3 className="text-xl font-bold">Bali</h3>
                <p className="text-sm opacity-90">Flights from $799</p>
                <button className="btn btn-outline mt-2 bg-white-20 backdrop-blur-sm border-white-40 hover-bg-white-30 text-white">
                  Explore
                </button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover-shadow-xl">
              <div className="aspect-4-3 w-full relative">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg"
                  alt="Tokyo"
                  className="object-cover w-full h-full transition-transform group-hover-scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-70 to-transparent" />
              <div className="absolute bottom-0 w-full p-4 text-white">
                <h3 className="text-xl font-bold">Tokyo</h3>
                <p className="text-sm opacity-90">Flights from $899</p>
                <button className="btn btn-outline mt-2 bg-white-20 backdrop-blur-sm border-white-40 hover-bg-white-30 text-white">
                  Explore
                </button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover-shadow-xl">
              <div className="aspect-4-3 w-full relative">
                <img
                  src="https://media.istockphoto.com/id/1454217037/photo/statue-of-liberty-and-new-york-city-skyline-with-manhattan-financial-district-world-trade.jpg?s=612x612&w=0&k=20&c=6V54_qVlDfo59GLEdY2W8DOjLbbHTJ9y4AnJ58a3cis="
                  alt="New York"
                  className="object-cover w-full h-full transition-transform group-hover-scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-70 to-transparent" />
              <div className="absolute bottom-0 w-full p-4 text-white">
                <h3 className="text-xl font-bold">New York</h3>
                <p className="text-sm opacity-90">Flights from $599</p>
                <button className="btn btn-outline mt-2 bg-white-20 backdrop-blur-sm border-white-40 hover-bg-white-30 text-white">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose GOGO Trips
          </h2>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-muted-foreground">
                We offer the best prices on flights, hotels, and car rentals
                with our price match promise.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Hidden Fees</h3>
              <p className="text-muted-foreground">
                Transparent pricing with no surprise charges. What you see is
                what you pay.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                  <path d="M2 21h20" />
                  <path d="M12 7v.01" />
                  <path d="M7 13h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is available around the clock to
                assist with any issues.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for your next adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers who book with GOGO Trips every day
          </p>
          <button className="btn btn-secondary text-lg px-8">
            Sign Up Now
          </button>
        </div>
      </section>
    </main>
    <footer className="border-t py-12 bg-muted">
      <div className="container">
        <div className="grid grid-cols-2 md-grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Travel Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Flights
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Car Rentals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover-text-foreground"
                >
                  Vacation Packages
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover-text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover-text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover-text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  placeholder="Your email"
                  className="rounded-r-none border p-2 w-full"
                />
                <button className="btn btn-primary rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© GOGO Trips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
 
</>
{isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
{isSigninOpen && <Signin setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
    </div>
  )
}

export default Home





