import React from "react";
import DummyImage from "../../assets/Image/dummyImage.png";
import DummyUser from "../../assets/Image/DummyUser.png";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { connectWallet } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import {RegisterFarmer} from "../../Apis/Farmer/FarmersApi"

const FarmerRegistrationForm = () => {
  const navigator = useNavigate();
  const [farmerDetails, setFarmerDetails] = React.useState({
    name: "",
    location: "",
    contactNumber: "",
    walletAddress: "",
    aadharCardNumber: "",
    aadharCardImage: "",
    userPhoto: "",
  });

  const [previewAadhar , setPreviewAadhar] = React.useState()
  const [previewUserPhoto , setPreviewUserPhoto]  = React.useState()

  const submitForm = (e) => {
    e.preventDefault();
    if (isBtnDisabled()) {
      toast("Please Fill Form Completely");
      return;
    } else {
      // console.log(farmerDetails)
      let formData = new FormData()
      formData.append("name" , farmerDetails.name)
      formData.append("phone" , farmerDetails.contactNumber)
      formData.append("metamaskWalletAddress" , farmerDetails.walletAddress)
      formData.append("location" , farmerDetails.location)
      formData.append("aadharNumber" , farmerDetails.aadharCardNumber)
      formData.append("aadharImage" , farmerDetails.aadharCardImage)
      formData.append("userImage" , farmerDetails.userPhoto)
      RegisterFarmer(formData)
      // navigator("/profile-farmer");
    }
  };

  const isBtnDisabled = () => {
    if (
      farmerDetails.aadharCardImage === "" ||
      farmerDetails.aadharCardNumber === "" ||
      farmerDetails.contactNumber === "" ||
      farmerDetails.location === "" ||
      farmerDetails.name === "" ||
      farmerDetails.userPhoto === "" ||
      farmerDetails.walletAddress === ""
    )
      return true;

    return false;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    if (name === "userPhoto" || name === "aadharCardImage") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result);
        
        if(name === "userPhoto"){
          setPreviewUserPhoto(reader.result)
        }else if(name === "aadharCardImage"){
          setPreviewAadhar(reader.result)
        }
        setFarmerDetails((prev) => ({
          ...prev,
          [name]: file,
        }));
      };
    } else {
      setFarmerDetails({
        ...farmerDetails,
        [name]: value,
      });
    }
  };

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    const res = await connectWallet();
    console.log(res);
    if (!res.error) {
      setFarmerDetails({
        ...farmerDetails,
        ["walletAddress"]: res.message,
      });
      // setFarmerDetails["walletAddress"] = address
      return;
    } else {
      toast(res.message);
    }
  };
  return (
    <div className="md:w-[600px] flex items-center justify-center bg-gray-100 ">
      <div className="bg-white w-full p-[40px] rounded-lg shadow-md ">
        <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
          Register as Farmer
        </h2>
        <form className="space-y-4">
          <div className="flex justify-between gap-[50px]">
            <div className="w-full">
              <div>
                <label
                  htmlFor="farmer-name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Farmer Name
                </label>
                <input
                  type="text"
                  id="farmer-name"
                  name="name"
                  value={farmerDetails.name}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-600"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={farmerDetails.location}
                  onChange={handleChange}
                  id="location"
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="aadhar-no"
                  className="block text-sm font-medium text-gray-600"
                >
                  Aadhar Number
                </label>
                <input
                  type="number"
                  id="aadhar-no"
                  name="aadharCardNumber"
                  onChange={handleChange}
                  value={farmerDetails.aadharCardNumber}
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-gray-600"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={farmerDetails.contactNumber}
                  onChange={handleChange}
                  id="contact-number"
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contract-address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Metamask Wallet Address
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={farmerDetails.walletAddress}
                  onChange={handleChange}
                  id="contract-address"
                  disabled
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                <button
                  className="bg-blue-500 py-[5px] px-[12px] text-white mt-[8px] rounded-lg"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center mt-[20px]">
              <div className="relative w-full flex flex-col justify-between items-center mb-[20px]">
                <img
                  src={
                    farmerDetails.aadharCardImage
                      ? previewAadhar
                      : DummyImage
                  }
                  alt="aadhar card image"
                  className="w-[80px] h-[80px] object-contain mr-[10px]"
                />
                <input
                  type="file"
                  name="aadharCardImage"
                  onChange={handleChange}
                  className="opacity-[0] absolute bottom-[-10px] right-[-100px]"
                />
                <button
                  disabled
                  className="bg-blue-500 text-white h-[50px] w-[100px] px-[4px] py-[2px] rounded-lg"
                >
                  Upload Aadhar
                </button>
              </div>

              <div className="relative w-full flex flex-col justify-between items-center">
                <img
                  src={
                    farmerDetails.userPhoto
                      ? previewUserPhoto
                      : DummyUser
                  }
                  alt="aadhar card image"
                  className="w-[80px] h-[80px] object-contain"
                />
                <input
                  type="file"
                  name="userPhoto"
                  onChange={handleChange}
                  className="opacity-[0] absolute bottom-[-10px] right-[-100px]"
                />
                <button
                  disabled
                  className="bg-blue-500 h-[50px] w-[100px] text-white px-[4px] py-[2px] rounded-lg"
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={submitForm}
            >
              Register as Farmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FarmerRegistrationForm;
