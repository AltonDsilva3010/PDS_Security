import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getFarmerProduct,
  getEthPrice,
  placeBidonProduct,
  qualityCheckProduct,
  convertUnixtoDateTime,
  weiToRupees,
} from "../../../Apis/APMC_Officer/ApmcOfficerApi";
import { commodityprices } from "../../FCI/constants";

const ProductDetailsModal = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [productBid, setProductBid] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [exgRate, setExgRate] = useState(null);
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

  const handleQualityCheck = () => {
    qualityCheckProduct(id, globalState);
  };

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

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == "bid") {
      if (
        !productDetails[8] && //No bid initially
        value <
          commodityprices[productDetails[1]].valinkg * Number(productDetails[2])
      ) {
        toast.error(
          `Value cannot be less than ${
            //Value cannot be less than Minimum Total Price
            commodityprices[productDetails[1]].valinkg *
            Number(productDetails[2])
          } `
        );
      } else if (
        productDetails[8] && //If there is a Bid
        value < weiToRupees(Number(productDetails[8]), exgRate) //Value cannot be less than current Bid
      ) {
        toast.error(
          `Value cannot be less than ${weiToRupees(
            Number(productDetails[8]),
            exgRate
          )}`
        );
      } else {
        setProductBid(value);
      }
    }
  };

  const handlePlaceBid = () => {
    placeBidonProduct(id, productBid / exgRate, globalState);
  };

  useEffect(() => {
    getEthPrice().then((result) => {
      setExgRate(result);
    });
    setCurrentTime(Date.now() / 1000);
  }, []);

  useEffect(() => {
    getFarmerProduct(id, globalState).then((result) => {
      console.log(result);
      setProductDetails(result);
      if (result[8]) {
        // console.log(weiToRupees();
        setProductBid(weiToRupees(Number(result[8]), exgRate));
      } else {
        setProductBid(commodityprices[result[1]].valinkg * Number(result[2]));
      }
    });
  }, [exgRate]);

  return (
    <div className="w-screen h-screen bg-slate-5 flex  items-center ">
      <div className="bg-white rounded-lg p-[20px] w-[80%]">
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
                    ? `Rs. ${commodityprices[productDetails[1]].valinkg} `
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
              {productDetails[10] && (
                <div className="flex flex-col mr-[10px] w-full">
                  <span className="font-semibold">Time Left: </span>
                  <span className="p-[10px] border-[2px] rounded-md border-black">
                    {convertUnixtoDateTime(Number(productDetails[10]))}
                  </span>
                </div>
              )}
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

            {/* Email */}

            {/* Confirmation Button */}
            {/* <div className="flex  justify-around items-center mt-[10px]">
              <button
                className="p-[10px] w-[40%] mr-[10px] bg-green-500 text-white rounded-md"
                onClick={handleQualityCheck}
              >
                Confirm Quality
              </button>
            </div> */}
            {currentTime > Number(productDetails[10]) ? (
              <div className="flex  justify-around items-end mt-[10px]">
                {" "}
                <p className="font-semibold">
                  Auction has Ended! <br></br> Cannot Place Bid!
                </p>
              </div>
            ) : (
              <div className="flex  justify-around items-end mt-[10px]">
                <div className="flex flex-col mr-[10px] w-full">
                  <span className="font-semibold">Bid Amount in Rs.: </span>
                  <input
                    type="number"
                    name="bid"
                    value={productBid}
                    placeholder="Enter Price"
                    onChange={handleChange}
                    className="w-full border-solid  border-2 rounded-md  border-black"
                  />
                </div>
                <div className="flex flex-col mr-[10px] w-full">
                  <span className="font-semibold">Price in ETH</span>
                  <span className="p-[10px] border-[2px] rounded-md border-black">
                    {`ETH ${productBid / exgRate}`}
                  </span>
                </div>
                <div className="flex flex-col mr-[10px] w-full">
                  <button
                    className="p-[13px]  bg-green-500 text-white rounded-md"
                    onClick={handlePlaceBid}
                  >
                    Place Bid
                  </button>
                </div>
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

export default ProductDetailsModal;