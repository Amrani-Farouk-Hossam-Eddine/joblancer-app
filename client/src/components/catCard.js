import React from "react";
import { Link } from "react-router-dom";

const CatCard = ({ item }) => {
  return (
    <Link to="/gigs">
      <div className="w-[212px] h-[304px] text-white rounded-md cursor-pointer relative">
        <img src={item.img} alt="" className="w-full h-full object-cover" />
        <span className="font-[300] absolute top-4 left-4">{item.desc}</span>
        <span className="font-[500] text-2xl absolute top-10 left-4">
          {item.title}
        </span>
      </div>
    </Link>
  );
};

export default CatCard;
