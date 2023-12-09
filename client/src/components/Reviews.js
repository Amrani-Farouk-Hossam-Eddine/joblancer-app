import React from "react";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutaion = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  const hanleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutaion.mutate({ gigId, desc, star });
  };
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-[500]">Reviews</h1>
      {isLoading
        ? "loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="flex flex-col gap-5">
        <h3>Add a new Review</h3>
        <form action="" onSubmit={hanleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="write your opinion"
            className="p-3 border border-gray-500"
          />
          <div className="flex justify-center items-center gap-16">
            <select name="" id="" className="p-3 border border-gray-500 flex-1">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className="flex-1 bg-blue-600 text-white p-3">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
