import React from "react";

const ProjectCard = ({ item }) => {
  return (
    <div className="w-[280px] rounded-md cursor-pointer overflow-hidden shadow-lg">
      <img src={item.img} alt="" className="h-[60%] object-cover" />
      <div className="bg-white flex gap-3 items-center p-4">
        <img
          src={item.pp}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div>
          <p className="text-md">{item.cat}</p>
          <p className="text-md">{item.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
