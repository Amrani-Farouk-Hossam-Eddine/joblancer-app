import React from "react";
import Slider from "infinite-react-carousel/lib/carousel/slider";
import "./Slide.css";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="flex justify-center py-[100px]">
      <div className="w-[1200px]">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
