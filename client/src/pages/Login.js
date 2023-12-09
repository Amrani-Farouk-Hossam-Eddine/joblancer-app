import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center py-14">
      <form
        action=""
        className="w-[350px] flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[40px] font-bold text-gray-500">Sign in</h1>
        <label htmlFor="" className="text-xl text-gray-500">
          Username
        </label>
        <input
          type="text"
          name=""
          id=""
          className="border border-gray-500 h-12 p-[10px]"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="" className="text-xl text-gray-500">
          Password
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border border-gray-500 h-12 p-[10px]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-3">Login</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
