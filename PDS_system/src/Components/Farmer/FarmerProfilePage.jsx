import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const FarmerProfilePage = () => {
  const options = [
    { title: "Profile", href: "/profile" },
    { title: "Products", href: "/profile/Products" },
  ];
  return (
    <div className="flex h-full w-[80%] m-auto">
      <div className="mr-[20px] w-3/12">
        <Sidebar options={options} />
      </div>
      <div className="mt-[10px] w-10/12">
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerProfilePage;
