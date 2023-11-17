import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Common/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="overflow-x-hidden h-screen bg-gray-100">
      <Header />
      <div className="w-[80%] mt-[50px] flex flex-col  items-center m-auto">
       
        <Outlet />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
