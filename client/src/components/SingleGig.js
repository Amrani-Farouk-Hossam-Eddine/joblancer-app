import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";

const SingleGig = ({ gig }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${gig.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${gig.userId}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="w-[280px] h-[330px] border border-gray-300 rounded-md overflow-hidden shadow-md cursor-pointer">
        <img src={gig.cover} alt="" className="h-[45%] w-full" />
        <div className="px-4 py-2 flex flex-col gap-2">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={data.img || "imgs/noavatar.jpg"}
                alt=""
                className="w-[25px] h-[25px] rounded-full object-cover"
              />
              <span className="font-[400] text-md">{data.username}</span>
            </div>
          )}
          <span className="text-sm">{gig.desc}</span>
          <div className="flex items-center gap-1">
            <img src="imgs/star.png" alt="" className="w-[15px]" />
            <span className="text-yellow-400 font-bold text-md">
              {!isNaN(gig.totalStars / gig.starNumber) &&
                Math.round(gig.totalStars / gig.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center px-4 pt-2">
          <img src="imgs/heart.png" alt="" className="w-[20px]" />
          <div className="flex flex-col">
            <span className="text-[13px] font-[300]">SARTING AT</span>
            <span className="text-right font-[400] text-lg">
              ${gig.price} <sup className="text-gray-500 font-[400]">99</sup>{" "}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleGig;
