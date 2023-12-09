import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import moment from "moment";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("/conversations");
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="flex justify-center py-7">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-[1200px] flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Messages</h1>
          <table className="w-full">
            <tr>
              <th className="text-left py-3">
                {currentUser.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="text-left">Last Message</th>
              <th className="text-left w-[15%]">Date</th>
              <th className="text-left">Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  (currentUser.isSeller && !c.readBySeller) ||
                  (!currentUser.isSeller && !c.readByBuyer)
                    ? "h-[80px] bg-blue-100"
                    : "h-[80px]"
                }
                key={c.id}
              >
                <td className="border-[3px] border-white font-bold w-[120px] text-center">
                  {currentUser.isSeller ? c.buyerId : c.sellerId}
                </td>
                <td className="border-[3px] border-white text-center text-gray-500">
                  <Link to={`/message/${c.id}`}>
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td className="border-[3px] border-white w-[100px] text-center">
                  {moment(c.updatedAt).fromNow()}
                </td>
                <td className="border-[3px] border-white w-[150px] text-center">
                  {(currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer && (
                      <button
                        className="bg-blue-500 text-white px-2 py-1"
                        onClick={() => handleRead(c.id)}
                      >
                        Mark as Read
                      </button>
                    ))}
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
