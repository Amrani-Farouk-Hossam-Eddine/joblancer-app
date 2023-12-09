import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messaages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("/messages");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ conversationId: id, desc: e.target[0].value });
    e.target[0].value = "";
  };
  return (
    <div className="flex justify-center">
      <div className="w-[1000px] m-[50px]">
        <span className="text-[#555] text-[13px] font-[400]">
          <Link to="/messages">Message</Link> {">"} JOHN DOE {">"}
        </span>
        {isLoading ? (
          "loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="my-[30px] p-[50px] flex flex-col gap-5 h-[500px] overflow-auto scrollbar-thumb-black scrollbar-thin scrollbar-track-slate-200 scrollbar-track-radious">
            {data.map((message) => (
              <div
                className={
                  message.userId === currentUser._id
                    ? "flex gap-5 max-w-[600px] text-[18px] self-end flex-row-reverse"
                    : "flex gap-5 max-w-[600px] text-[18px]"
                }
                key={message._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <p
                  className={
                    message.userId === currentUser._id
                      ? "p-5 bg-blue-600 rounded-l-3xl rounded-br-3xl text-white"
                      : "p-5 bg-gray-100 rounded-r-3xl rounded-bl-3xl"
                  }
                >
                  {message.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        <hr className="mb-5 border h-0 border-gray-200" />
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <textarea
            name=""
            placeholder="Write a message"
            id=""
            cols="30"
            rows="10"
            className="w-[80%] h-[100px] p-3 border border-gray-500 rounded-[10px] "
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 rounded-md px-4 py-2 text-white font-[500]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
