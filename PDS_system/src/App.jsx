import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Common/Header";




function App() {
  return (
    <div className="overflow-hidden bg-gray-100">
      <Header />
      <div className="w-[80%] mt-[50px] flex flex-col justify-center items-center m-auto">
       
        <Outlet />
      </div>
    </div>
  );
}

export default App;
