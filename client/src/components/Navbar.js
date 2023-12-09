import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={
        active || pathname !== "/"
          ? "flex flex-col items-center py-2 bg-white text-black sticky top-0 z-50"
          : "flex flex-col items-center py-2 bg-blue-800 text-white sticky top-0"
      }
    >
      <div className="w-[1200px] flex justify-between py-4">
        <Link className="text-2xl font-bold cursor-pointer">
          joblancer<span className="text-blue-300 text-3xl font-bold">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5">
            <span>Fiverr Business</span>
            <span>Explorer</span>
            <span>English</span>
            {!currentUser?.isSeller && <span>Become a Saller</span>}

            <Link to="/login">Sing in</Link>
          </div>
          {!currentUser ? (
            <Link
              to="/register"
              className={
                active || pathname !== "/"
                  ? "border border-blue-600 px-4 py-1 rounded hover:bg-blue-600 text-blue-600 hover:text-white transition"
                  : "border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-600 transition"
              }
            >
              join
            </Link>
          ) : (
            <div
              className="flex items-center gap-3 cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <img
                src={currentUser.img || "imgs/noavatar.jpg"}
                alt=""
                className="w-[35px] rounded-full"
              />
              <span>{currentUser.username}</span>
              {open && (
                <div className="flex flex-col gap-3 absolute top-[50px] right-0 bg-white text-gray-600 p-5 rounded-lg w-[200px] border border-gray-300">
                  {currentUser.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr className="w-full pb-2" />
          <div className="w-[1200px] flex items-center justify-between pb-2">
            <span className="text-md text-gray-500 font-[400]">
              Graphics & Design
            </span>
            <span className="text-md text-gray-500 font-[400]">
              Video & Animation
            </span>
            <span className="text-md text-gray-500 font-[400]">
              Writing & Translation
            </span>
            <span className="text-md text-gray-500 font-[400]">
              AI Services
            </span>
            <span className="text-md text-gray-500 font-[400]">
              Digital Marketing
            </span>
            <span className="text-md text-gray-500 font-[400]">
              Music & Audio
            </span>
            <span className="text-md text-gray-500 font-[400]">
              Programming & Tech
            </span>
            <span className="text-md text-gray-500 font-[400]">Business</span>
            <span className="text-md text-gray-500 font-[400]">Lifestyle</span>
          </div>
          <hr className="w-full" />
        </>
      )}
    </div>
  );
};

export default Navbar;
