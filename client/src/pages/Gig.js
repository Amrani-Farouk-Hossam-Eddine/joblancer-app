import React from "react";
import Slider from "infinite-react-carousel/lib/carousel/slider";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useParams, Link } from "react-router-dom";
import Reviews from "../components/Reviews";

const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;
  console.log(userId);
  const {
    isLoading: isloadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [`${userId}`],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(dataUser);
  return (
    <div className="flex justify-center py-8">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="w-[1200px] flex justify-between gap-10">
          <div className="flex-[2] flex flex-col gap-6">
            <span className="text-sm font-[300]">
              FIVERR {">"} GRAFICS & DESIGN {">"}
            </span>
            <h1 className="text-2xl font-bold">{data.title}</h1>

            {isloadingUser ? (
              "loading..."
            ) : errorUser ? (
              "Something went worng!"
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src={dataUser.img || "/imgs/noavatar.jpg"}
                  alt=""
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
                <span className="font-[500]">{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="flex gap-1">
                    {Array(Math.round(data.totalStars / data.starNumber))
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
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <Slider slidesToShow={1} arrowsScroll={1}>
                {data.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className="max-h-[350px] object-contain"
                  />
                ))}
              </Slider>
            </div>
            <h1 className="text-2xl font-[500]">About This Gig</h1>
            <p className="text-gray-600">{data.desc}</p>

            {isloadingUser ? (
              "loading..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="flex flex-col gap-10">
                <h1 className="text-2xl font-[500]">About The Seller</h1>

                <div className="flex items-center gap-5">
                  <img
                    src={dataUser.img || "/imgs/noavatar.jpg"}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-[6px]">
                    <span className="text-sm font-bold">
                      {dataUser.username}
                    </span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="flex gap-1">
                        {Array(Math.round(data.totalStars / data.starNumber))
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
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="border border-black px-3 py-[6px] text-[13px] font-[500] rounded hover:bg-black hover:text-white transition">
                      Contact Me
                    </button>
                  </div>
                </div>

                <div className="border border-gray-500 p-4">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="w-[300px] flex flex-col gap-2">
                      <span>From</span>
                      <span className="font-[500]">{dataUser.country}</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-2">
                      <span>Avg. response time</span>
                      <span className="font-[500]">4 hours</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-2">
                      <span>Languages</span>
                      <span className="font-[500]">English</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-2">
                      <span>Member since</span>
                      <span className="font-[500]">Aug 2022</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-2">
                      <span>Last dilevry</span>
                      <span className="font-[500]">1 day</span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <p className="text-sm text-gray-600">{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="flex-1 flex flex-col gap-6 border border-gray-500 p-4 rounded sticky top-[150px] h-fit">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl">{data.shortTitle}</h2>
              <span className="text-2xl font-[400]">$ {data.price}</span>
            </div>
            <p className="text-[16px] text-gray-500">{data.shortDesc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/imgs/clock.png"
                  alt=""
                  className="w-[18px] object-cover"
                />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/imgs/recycle.png"
                  alt=""
                  className="w-[18px] object-cover"
                />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div>
              {data.features.map((feature) => (
                <div className="flex items-center gap-2" key={feature}>
                  <img
                    src="/imgs/greencheck.png"
                    alt=""
                    className="w-[15px] object-cover"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="bg-blue-500 text-white py-2 w-full">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
