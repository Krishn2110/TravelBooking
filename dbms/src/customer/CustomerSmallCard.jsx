import React, { useEffect, useState } from "react";
import woodTexture from "../assets/wood.jpg";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const SmallCard = ({ title, icon, apiUrl }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCount(data.length);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, [apiUrl]);

  const handleShowBookings = () => {
    const type = title.split(" ")[0].toLowerCase(); // flight, hotel, car
    navigate("/customer-dashboard/bookings", { state: { type } });
  };

  return (
    <div
      className="rounded-xl w-[15vw] min-h-[10vw] flex flex-col justify-start items-center font-bold text-xl p-4 transition-transform duration-500 hover:scale-105 gap-2 shadow-xl text-[#26130d]"
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "2px solid #5C4033",
        boxShadow: `
          inset 0 0 10px rgba(0,0,0,0.3),
          0 10px 20px rgba(92, 64, 51, 0.6)
        `,
        fontFamily: "Georgia, serif",
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span>{title}</span>
      <span className="text-[#482016] text-lg">{count}</span>

      <span
        onClick={handleShowBookings}
        className="text-sm font-bold mt-1 cursor-pointer underline hover:text-[#5c4033]"
      >
        Show Bookings
      </span>
    </div>
  );
};

export default SmallCard;
