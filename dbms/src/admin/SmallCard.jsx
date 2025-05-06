import React, { useEffect, useState } from "react";
import woodTexture from "../assets/wood.jpg"; // ✅ Update path as needed

const SmallCard = ({ title, icon, apiUrl }) => {
  const [count, setCount] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCount(data.length); // Assuming the API returns an array
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, [apiUrl]);

  return (
    <div
      className="rounded-xl w-[12vw] h-[10vw] flex flex-col justify-center items-center font-bold text-xl p-4 transition-transform duration-700 ease-in-out hover:scale-105 cursor-pointer gap-2 shadow-xl text-[#26130d]"
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="text-2xl">{icon}</span>
      <span>{title}</span>
      {hover && <span className="text-[#482016] text-lg">{count}</span>}
    </div>
  );
};

export default SmallCard;
