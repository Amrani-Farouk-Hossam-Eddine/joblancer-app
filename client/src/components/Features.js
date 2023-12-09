import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="flex justify-center bg-blue-800">
      <div className="w-[1200px] h-[430px] flex gap-7">
        <div className="flex flex-col justify-center">
          <h1 className="text-[54px] text-white">
            Find the perfect <span className="font-[100]">freelance</span>{" "}
            services for your business
          </h1>
          <div className="flex items-center py-6">
            <div className="flex gap-3 p-3 bg-white rounded-tl rounded-bl w-[90%]">
              <img src="imgs/search.png" alt="" className="w-[24px]" />
              <input
                type="text"
                name=""
                id=""
                placeholder='
                Try "buillding mobile app"'
                className="w-full outline-none h-full"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-6 rounded-tr rounded-br py-3 w-[20%]"
              onClick={handleClick}
            >
              search
            </button>
          </div>
          <div className="text-white flex gap-3 items-center">
            <span>Popular:</span>
            <span className="border border-white rounded-full px-2 py-1 hover:bg-white hover:text-black transition cursor-pointer">
              Web Design
            </span>
            <span className="border border-white rounded-full px-2 py-1 hover:bg-white hover:text-black transition cursor-pointer">
              {" "}
              Wordpress
            </span>
            <span className="border border-white rounded-full px-2 py-1 hover:bg-white hover:text-black transition cursor-pointer">
              Logo Design
            </span>
            <span className="border border-white rounded-full px-2 py-1 hover:bg-white hover:text-black transition cursor-pointer">
              AI Services
            </span>
          </div>
        </div>
        <div className="w-[70%]">
          <img
            src="imgs/man.png"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
