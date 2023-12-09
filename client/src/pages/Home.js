import React from "react";
import Features from "../components/Features";
import Trustedby from "../components/Trustedby";
import Slide from "../components/slide/Slide";
import { cards, projects } from "../data";
import CatCard from "../components/catCard";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  return (
    <div>
      <Features />
      <Trustedby />
      <Slide slidesToShow={5} arrowsScroll={1}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className="flex justify-center bg-blue-100 py-[100px]">
        <div className="w-[1200px] flex items-center justify-between gap-[60px]">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">
              A whole world of freelance talent at your fingertips
            </h1>
            <div>
              <div className="flex items-center gap-2">
                <img src="imgs/check.png" alt="" className="w-[25px]" />
                <h3 className="text-gray-700 font-bold text-lg">
                  The best for every budget
                </h3>
              </div>
              <p className="text-gray-600 text-md font-[400]">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="imgs/check.png" alt="" className="w-[25px]" />
                <h3 className="text-gray-700 font-bold text-lg">
                  The best for every budget
                </h3>
              </div>
              <p className="text-gray-600 text-md font-[400]">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="imgs/check.png" alt="" className="w-[25px]" />
                <h3 className="text-gray-700 font-bold text-lg">
                  The best for every budget
                </h3>
              </div>
              <p className="text-gray-600 text-md font-[400]">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="imgs/check.png" alt="" className="w-[25px]" />
                <h3 className="text-gray-700 font-bold text-lg">
                  The best for every budget
                </h3>
              </div>
              <p className="text-gray-600 text-md font-[400]">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="imgs/check.png" alt="" className="w-[25px]" />
                <h3 className="text-gray-700 font-bold text-lg">
                  The best for every budget
                </h3>
              </div>
              <p className="text-gray-600 text-md font-[400]">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>
          </div>
          <div className="w-[60%]">
            <video
              src="imgs/video.mp4"
              className="w-full rounded shadow-lg"
              autoPlay
              loop
            ></video>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-[#0d084d] py-[100px] text-white">
        <div className="w-[1200px] flex items-center justify-between gap-[60px]">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">fiverr business</h1>
            <h1 className="text-3xl font-bold">
              A business solution designed for teams
            </h1>
            <p className="text-white text-md font-[400]">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="flex items-center gap-2">
              <img src="imgs/check.png" alt="" className="w-[25px]" />
              <p className="text-md font-[400]">
                Connect to freelancers with proven business experience.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="imgs/check.png" alt="" className="w-[25px]" />
              <p className="text-md font-[400]">
                Get matched with the perfect talent by a customer success
                manager.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="imgs/check.png" alt="" className="w-[25px]" />
              <p className="text-md font-[400]">
                Manage teamwork and boost productivity with one powerful
                workspace.
              </p>
            </div>
            <button className="bg-blue-400 py-3 px-6 w-fit rounded">
              Explore Fiverr Businesses
            </button>
          </div>
          <div className="w-[60%]">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={1}>
        {projects.map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
