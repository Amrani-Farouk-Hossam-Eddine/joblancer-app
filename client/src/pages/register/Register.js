import React, { useState } from "react";
import "./Register.css";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSeller = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        isSeller: e.target.checked,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form
        className="w-[800px] flex justify-center gap-16"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl text-gray-500 font-bold">
            Create a new account
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-500 text-lg">
              Username
            </label>
            <input
              type="text"
              name="username"
              id=""
              className="border border-gray-300 p-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-500 text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="border border-gray-300 p-3"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-500 text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className="border border-gray-300 p-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-500 text-lg">
              Profile Picture
            </label>
            <input
              type="file"
              name=""
              id=""
              className="border border-gray-300 p-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-500 text-lg">
              Country
            </label>
            <input
              type="text"
              name="country"
              id=""
              placeholder="ALG"
              className="border border-gray-300 p-3"
              onChange={handleChange}
            />
          </div>
          <button className="bg-blue-500 text-white py-3 w-full">
            Register
          </button>
        </div>
        <div className="flex flex-col gap-12">
          <h2 className="text-3xl text-gray-500 font-bold">
            I want to become a seller
          </h2>

          <div className="flex items-center gap-[10px]">
            <label htmlFor="">Activate the seller account</label>
            <label className="relative inline-block w-[50px] h-[24xp]">
              <input
                type="checkbox"
                className="border border-gray-300 px-4 py-[10px] opacity-0 w-0 h-0 checked:bg-[#2196f3]"
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex flex-col gap-8">
            <label htmlFor="" className="text-gray-500 text-lg">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id=""
              placeholder="+213"
              className="border border-gray-300 p-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-8">
            <label htmlFor="" className="text-gray-500 text-lg">
              Description
            </label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="10"
              className="border border-gray-300 p-3"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
