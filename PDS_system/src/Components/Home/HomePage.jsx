import React, { useState, useEffect } from "react";
import HeroImage from "../../assets/Image/pds_hero_image.jpeg";
import { connectWallet } from "../../utils/functions";
import { useDispatch } from "react-redux";
const HomeComponent = () => {
  const dispatch = useDispatch()
  const handleBtnClick = ()=>{  
    connectWallet(dispatch)
  }
  return (
    <div className="w-full h-full">
      <div className="relative h-full w-full">
        <img
          src={HeroImage}
          className="absolute top-0 left-0 backdrop-blur-sm w-full h-full object-cover"
        />
        <div className="absolute h-full top-[20%] left-[10%]">
          <h1 className="font-bold text-black text-[80px] text-center w-full">PDS System using Blockchain</h1>
          <div className="text-white font-bold">
            <h3>By : </h3>
            <ol>
              <li>Alton Dsilva - (9192) </li>
              <li>Harshang Makwana - (9207) </li>
              <li>Mrudul Patil - (9192) </li>
              <li>Larry - (9192) </li>
            </ol>
            <p>Mentor By : Ashok Kanthe Sir</p>
          </div>
        <button
          onClick={handleBtnClick}
          className="mt-[10px] p-[10px] bg-black text-white rounded-full"
        >Connect Your Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
