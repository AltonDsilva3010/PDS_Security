import React from "react";
import { navs_options } from "../constants";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [navOptions, setNavOptions] = React.useState(navs_options);

  const opts = navOptions?.map((o, i) => (
    <NavLink
      className="text-center py-[10px] w-full
     hover:bg-orange-500 hover:rounded-tl-lg hover:rounded-tr-lg hover:text-white"
      to={o.route}
    >
      {o.title}
    </NavLink>
  ));
  return (
    <div className="mb-[50px]">
      <div>
        <nav className="flex justify-between  border-b-[2px] border-b-slate-200 ">
          {opts}
        </nav>
      </div>
    </div>
  );
};

export default Header;
