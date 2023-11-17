import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = ({ options }) => {
  const opt = options?.map((o, index) => (
    <NavLink to={o.href} key={index}
     className="mb-[12px] hover:border-b-[2px] border-blue-500"
     
     >
      {o.title}
    </NavLink>
  ));
  return (
    <div className="p-[20px] mr-[20px]">
      <div className="flex ">
        <div>
          <nav>
            <ul className="flex flex-col ">{opt}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
