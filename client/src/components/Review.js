import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${review.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {isLoading ? (
          "loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={data.img || "/imgs/noavatar.jpg"}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">{data.username}</span>
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-1">
          {Array(review.star)
            .fill()
            .map((e, i) => (
              <img
                src="/imgs/star.png"
                alt=""
                className="w-[15px] object-contain"
                key={i}
              />
            ))}

          <span className="text-lg text-yellow-400 font-bold">
            {review.star}
          </span>
        </div>
      </div>
      <p>{review.desc}</p>
      <div className="flex items-center gap-2">
        <span>Helpful?</span>
        <img src="/imgs/like.png" alt="" className="w-[15px]" />
        <span>Yes</span>
        <img src="/imgs/dislike.png" alt="" className="w-[15px]" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
