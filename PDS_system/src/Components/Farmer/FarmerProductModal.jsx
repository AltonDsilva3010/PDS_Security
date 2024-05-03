import React, { useState, useEffect } from "react";
import {
  getFarmerProduct,
  getEthPrice,
  convertUnixtoDateTime,
  weiToRupees,
  getAuctionEndedonProduct,
} from "../../Apis/APMC_Officer/ApmcOfficerApi";
import {
  startAuctionFunction,
  endAuctionFunction,
} from "../../Apis/Farmer/FarmersApi";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { commodityprices } from "../FCI/constants";

const FarmerProductModal = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [exgRate, setExgRate] = useState(null);
  const [bidTimer, setBidTimer] = useState(null);
  const [compBidTimer, setCompBidTimer] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const globalState = useSelector((state) => state.globlaStateSlice);
  const { id } = useParams();

  function openImage() {
    const elem = document.getElementById("productImage");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function openLicenseImage() {
    const elem = document.getElementById("licenseImage");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const handleBidTimerChange = (e) => {
    console.log(e.target.value);
    const selectedDateTime = new Date(e.target.value).getTime() / 1000; // Convert to Unix timestamp
    const currentDateTime = Date.now() / 1000;

    console.log("selectedDateTime : ", selectedDateTime);
    console.log("CurrentDateTime : ", currentDateTime);
    if (selectedDateTime < currentDateTime) {
      toast.warning("Invalid Date Time Input");
      return;
    } else {
      setCompBidTimer(e.target.value);
      setBidTimer(selectedDateTime);
    }
  };

  const handleAuction = () => {
    if (!bidTimer) {
      console.log("No Bid Timer");
      return;
    }
    console.log(bidTimer);
    startAuctionFunction(bidTimer, id, globalState);
  };

  const handleEndAuction = () => {
    endAuctionFunction(id, globalState);
  };

  useEffect(() => {
    getFarmerProduct(id, globalState).then((result) => {
      console.log(result);
      setProductDetails(result);
    });
    getEthPrice().then((result) => {
      setExgRate(result);
    });
    getAuctionEndedonProduct(id, globalState).then((result) => {
      setAuctionEnded(result);
    });
  }, []);
  return (
    <div className="w-screen  bg-slate-5 flex   ">
      <div className="bg-white rounded-lg p-[20px] w-[60%]">
        {/* <div className="relative h-[50px] border-b-[2px]">
          <img
            src={CloseBtn}
            className="w-[40px] h-[40px] object-cover "
          />
        </div> */}
        {productDetails ? (
          <div className="mt-[10px]">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Name</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[1] ?? "Name"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Quantity</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {Number(productDetails[2])
                    ? `${Number(productDetails[2])} ${
                        productDetails[3] ? productDetails[3] : "Kilo Grams"
                      }`
                    : "0"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Minimum Support Price</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[1]
                    ? `${commodityprices[productDetails[1]].valinkg}`
                    : "Price"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Min. Bid</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[6]
                    ? `Rs. ${
                        commodityprices[productDetails[1]].valinkg *
                        Number(productDetails[2])
                      }`
                    : "Price"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Price in ETH</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[6]
                    ? `ETH ${
                        (commodityprices[productDetails[1]].valinkg *
                          Number(productDetails[2])) /
                        exgRate
                      }`
                    : "Price"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Quality Status: </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[11] ? "True" : "False"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Current Bid: </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[8]
                    ? `Rs. ${weiToRupees(Number(productDetails[8]), exgRate)}`
                    : "No Bid"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Current Owner: </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[9] ? productDetails[9] : "Not Sold"}
                </span>
              </div>
            </div>
            <div className="flex justify-around items-center ">
              <div className="mt-[10px]">
                <span className="font-semibold">Product Image</span>
                <img
                  src={productDetails[4]}
                  onClick={openImage}
                  id="productImage"
                  width="300"
                  height="400"
                  className="object-fit"
                />
              </div>
              <div className="mt-[10px]">
                <span className="font-semibold">License Image</span>
                <img
                  src={productDetails[5]}
                  onClick={openLicenseImage}
                  id="licenseImage"
                  width="300"
                  height="400"
                  className="object-fit"
                />
              </div>
            </div>
            {!Number(productDetails[10]) ? (
              <div>
                {productDetails[11] ? (
                  <div className="flex justify-around items-center">
                    <div>
                      <div className="flex flex-col w-full">
                        <span className="font-semibold">Bid End Timer</span>
                        <div className="h-[48px] border-[2px] rounded-md border-black">
                          <input
                            type="datetime-local"
                            value={compBidTimer}
                            onChange={handleBidTimerChange}
                            className="h-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full ml-[10px] ">
                      <button
                        className="border-[2px] bg-green-500 rounded-md font-semibold text-white h-[48px] w-full relative top-[12px]"
                        onClick={handleAuction}
                      >
                        Start Auction
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-around items-center">
                    <p className="border-[2px] bg-green-500 rounded-md font-semibold text-white h-[48px] w-full text-center pt-[10px] relative top-[12px]">
                      Wait for Quality Check to Start Auction!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex flex-col mr-[10px] w-full">
                  <span className="font-semibold">Bid End Timer</span>
                  <span className="p-[10px] border-[2px] rounded-md border-black">
                    {convertUnixtoDateTime(Number(productDetails[10]))}
                  </span>
                </div>

                {auctionEnded ? (
                  <div className=" w-full ml-[10px] flex items-center mr-[10px] w-full">
                    <p className="border-[2px] bg-white-500 rounded-md font-semibold text-black h-[48px] w-full relative top-[12px] text-center p-[10px]">
                      Auction Ended!
                    </p>
                  </div>
                ) : (
                  globalState.role == "farmer" && (
                    <div className="w-full ml-[10px] ">
                      <div className="flex flex-col mr-[10px] w-full">
                        <button
                          className="border-[2px] bg-green-500 rounded-md font-semibold text-white h-[48px] w-full relative top-[12px]"
                          onClick={handleEndAuction}
                        >
                          End Auction
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <h1>Loading - {id}</h1>
        )}
      </div>
    </div>
  );
};

export default FarmerProductModal;
