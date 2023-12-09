import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="flex justify-center py-7">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="w-[1200px] flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Orders</h1>
          <table className="w-full">
            <tr>
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Contact</th>
            </tr>
            {data.map((order) => (
              <tr
                className="h-[55px] bg-blue-100 border-[5px] border-b-white "
                key={order._id}
              >
                <td>
                  <img
                    src={order.img}
                    alt=""
                    className="w-[50px] object-cover"
                  />
                </td>
                <td>{order.title}</td>
                <td>${order.price}</td>
                <td>
                  <img
                    src="/imgs/message.png"
                    alt=""
                    className="w-[30px] object-cover cursor-pointer"
                    onClick={() => handleContact(order)}
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
