import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  const mutaion = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });
  const handleDelete = (id) => {
    mutaion.mutate(id);
  };
  return (
    <div className="flex justify-center py-7">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-[1200px] flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Gigs</h1>
          <table className="w-full">
            <tr>
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Sales</th>
              <th className="text-left">Action</th>
            </tr>
            {data.map((gig) => (
              <tr
                className="h-[55px] bg-blue-100 border-[5px] border-b-white"
                key={gig.id}
              >
                <td>
                  <img
                    src={gig.cover}
                    alt=""
                    className="w-[50px] object-cover"
                  />
                </td>
                <td>{gig.title}</td>
                <td>${gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    src="/imgs/delete.png"
                    alt=""
                    className="w-[20px] object-cover cursor-pointer"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
