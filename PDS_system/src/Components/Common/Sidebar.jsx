import React, { useEffect } from "react";

const Sidebar = () => {
  function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
  }

  function openSidebar() {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }

  useEffect(() => {
    openSidebar();
  }, []);

  return (
    <div>
      {/* <span
        class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onclick="openSidebar()"
      >
        <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span> */}
      <div class="sidebar fixed top-0 bottom-0 bg-blue-900 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-blue-900">
        <h1>Hello WOrld</h1>
      </div>
    </div>
  );
};

export default Sidebar;
