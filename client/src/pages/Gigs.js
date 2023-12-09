import React, { useEffect, useRef, useState } from "react";
import SingleGig from "../components/SingleGig";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const reSort = (type) => {
    setSort(type);
    setOpen(!open);
  };
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      search == ""
        ? newRequest
            .get(
              `/gigs${search}?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            )
            .then((res) => {
              return res.data;
            })
        : newRequest
            .get(
              `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            )
            .then((res) => {
              return res.data;
            }),
  });
  useEffect(() => {
    refetch();
  }, [sort]);
  const applay = () => {
    refetch();
  };
  return (
    <div className="flex justify-center pt-5 pb-8">
      <div className="w-[1200px] flex flex-col gap-6">
        <span className="text-sm font-[300]">
          JOBLANCER {">"} GRAFICS & DESIGN {">"}
        </span>
        <h1 className="text-3xl font-bold">AI Artists</h1>
        <span className="text-gray-500">
          Explore the boundries of art and technology with Fiverr's AI artists
        </span>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500">Budget</span>
            <input
              type="text"
              ref={minRef}
              name=""
              id=""
              className="border border-gray-400 rounded outline-none px-2 py-[2px]"
              placeholder="min"
            />
            <input
              type="text"
              ref={maxRef}
              name=""
              id=""
              className="border border-gray-400 rounded outline-none px-2 py-[2px]"
              placeholder="max"
            />
            <button
              className="text-white bg-blue-500 px-4 py-1 text-sm rounded"
              onClick={applay}
            >
              Apply
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span>Sorted By</span>
            <div className="flex items-center gap-2 relative">
              <span className="font-[500]">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img
                src="imgs/down.png"
                alt=""
                className="w-[20px] cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute top-7 right-0 bg-white p-3 rounded border border-gray-300 text-gray-600">
                  {sort === "sales" ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => reSort("createdAt")}
                    >
                      Newest
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer"
                      onClick={() => reSort("sales")}
                    >
                      Best Selling
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-6">
          {isLoading
            ? "loading"
            : error
            ? "Somthing went wrong!"
            : data.map((gig) => <SingleGig gig={gig} key={gig._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
