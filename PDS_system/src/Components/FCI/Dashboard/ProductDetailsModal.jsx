import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getFarmerProduct,
  getEthPrice,
  buyFarmerProduct,
  qualityCheckProduct,
} from "../../../Apis/APMC_Officer/ApmcOfficerApi";
import { commodityprices } from "../../FCI/constants";

const ProductDetailsModal = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState([]);
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

  const handleBuying = () => {
    buyFarmerProduct(id, Number(productDetails[6]) / exgRate, globalState);
  };

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

  useEffect(() => {
    getFarmerProduct(id, globalState).then((result) => {
      console.log(result);
      setProductDetails(result);
    });
    getEthPrice().then((result) => {
      setExgRate(result);
    });
  }, []);

  // useEffect(() => {
  //   const newProductDetails = [...productDetails];
  //   newProductDetails[0] = Number(newProductDetails[0]);
  //   newProductDetails[2] = Number(newProductDetails[2]);
  //   newProductDetails[6] = Number(newProductDetails[6]);
  //   newProductDetails[7] = Number(newProductDetails[7]);
  //   console.log(productDetails);
  //   setUpdatedProduct(newProductDetails);
  // }, [productDetails]);
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
                    ? `${commodityprices[productDetails[1]].valinkg}`
                    : "Price"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Total Price</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[6] ? `Rs. ${productDetails[6]}` : "Price"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Price in ETH</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[6]
                    ? `ETH ${Number(productDetails[6]) / exgRate}`
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
                <span className="font-semibold">Bid Status: </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[10] ? "True" : "False"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Current Owner: </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {productDetails[8] ? productDetails[8] : "Not Sold"}
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
            <div className="flex  justify-around items-center mt-[10px]">
              <button
                className="p-[10px] w-[40%] mr-[10px] bg-green-500 text-white rounded-md"
                onClick={handleQualityCheck}
              >
                Confirm Quality
              </button>
              <button
                className="p-[10px] w-[40%] bg-green-500 text-white rounded-md"
                onClick={handleBuying}
              >
                Buy Product
              </button>
            </div>
          </div>
        ) : (
          <h1>Loading - {id}</h1>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;
