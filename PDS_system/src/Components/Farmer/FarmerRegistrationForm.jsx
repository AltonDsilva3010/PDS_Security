import React from "react";
import DummyImage from "../../assets/Image/dummyImage.png";
import DummyUser from "../../assets/Image/DummyUser.png";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { connectWallet } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { RegisterFarmer } from "../../Apis/Farmer/FarmersApi";
import { useDispatch, useSelector } from "react-redux";
const FarmerRegistrationForm = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  const { address } = useSelector((state) => state.userSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);

  const navigator = useNavigate();
  const [farmerDetails, setFarmerDetails] = React.useState({
    fullName: "",
    gender: "",
    dob: "",
    mobileNumber: "",
    email: "",
    state: "",
    district: "",
    pinCode: "",
    aadharCardNumber: "",
    panCardNumber: "",
    walletAddress: "",
    aadharCardImage: "",
  });

  React.useEffect(() => {
    if (address) {
      setFarmerDetails({
        ...farmerDetails,
        ["walletAddress"]: address,
      });
    }
  }, []);

  const [previewAadhar, setPreviewAadhar] = React.useState();
  const [previewUserPhoto, setPreviewUserPhoto] = React.useState();
  const [otpVerify, setOtpVerify] = React.useState(true);
  const [otp, setOtp] = React.useState("");

  const handleOTP = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setOtp(e.target.value);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // check whether entered otp is correct or not
    // set is mobile Verify
    setOtpVerify(true);
  };
  const handleOtpVerificationBtnClick = (e) => {
    e.preventDefault();
    console.log(farmerDetails.mobileNumber);
    if (farmerDetails.mobileNumber != "") {
      setOtpVerify((prev) => !prev);
    } else {
      toast.error("Enter Mobile Number First ");
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (isBtnDisabled()) {
      toast("Please Fill Form Completely");
      return;
    } else if (!otpVerify) {
      toast("Please Verify Mobile First");
      return;
    } else {
      // console.log(farmerDetails)
      let formData = new FormData();
      const address = {
        state: farmerDetails.state,
        district: farmerDetails.district,
        pinCode: farmerDetails.pinCode,
      };
      formData.append("name", farmerDetails.fullName);
      formData.append("dob", farmerDetails.dob);
      formData.append("email", farmerDetails.email);
      formData.append("gender", farmerDetails.gender);
      formData.append("location", JSON.stringify(address));
      formData.append("aadharNumber", farmerDetails.aadharCardNumber);
      formData.append("panCardNumber", farmerDetails.panCardNumber);
      formData.append("phone", farmerDetails.mobileNumber);
      formData.append("metamaskWalletAddress", farmerDetails.walletAddress);
      formData.append("aadharImage", farmerDetails.aadharCardImage);
      formData.append("role", "farmer");

      RegisterFarmer(formData, globalState, navigator);
      console.log(formData);
    }
  };

  const isBtnDisabled = () => {
    if (
      farmerDetails.aadharCardImage === "" ||
      farmerDetails.aadharCardNumber === "" ||
      farmerDetails.mobileNumber === "" ||
      farmerDetails.state === "" ||
      farmerDetails.district === "" ||
      farmerDetails.pinCode === "" ||
      farmerDetails.fullName === "" ||
      farmerDetails.walletAddress === "" ||
      farmerDetails.dob === "" ||
      farmerDetails.email === ""
    )
      return true;

    return false;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "userPhoto" || name === "aadharCardImage") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result);

        if (name === "userPhoto") {
          setPreviewUserPhoto(reader.result);
        } else if (name === "aadharCardImage") {
          setPreviewAadhar(reader.result);
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

    const res = address;
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
    <div className="flex  items-center justify-center bg-gray-100 ">
      <div className="bg-white w-full p-[40px] rounded-lg shadow-md ">
        <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
          Register as Farmer
        </h2>

        <form className="space-y-4">
          <div className="flex flex-col w-full justify-between gap-[50px]">
            <div className="w-full">
              <div className="flex">
                <input
                  type="text"
                  id="farmer-name"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={farmerDetails.fullName}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />

                <input
                  type="data"
                  name="dob"
                  placeholder="Enter Date Of Birth"
                  value={farmerDetails.dob}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex mt-[10px]">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={farmerDetails.email}
                  onChange={handleChange}
                  className="form-input mr-[10px] mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                <select
                  id="gender"
                  name="gender"
                  value={farmerDetails.gender}
                  onChange={handleChange}
                  className="form-input mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-between mt-[10px]">
                {/* DropDown Here */}
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={farmerDetails.state}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                {/* dropdown here instead of text */}
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={farmerDetails.district}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="PinCode"
                  value={farmerDetails.pinCode}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex mt-[10px] items-center">
                <input
                  type="text"
                  placeholder="Enter Aadhar Card Number"
                  name="aadharCardNumber"
                  onChange={handleChange}
                  value={farmerDetails.aadharCardNumber}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />

                <div className="relative  flex flex-col justify-between items-center ">
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
              </div>

              <div className="flex mt-[10px] items-center">
                <input
                  type="text"
                  placeholder="Enter Pan Card Number"
                  name="panCardNumber"
                  onChange={handleChange}
                  value={farmerDetails.panCardNumber}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {farmerDetails.aadharCardImage && (
                <img
                  src={
                    farmerDetails.aadharCardImage ? previewAadhar : DummyImage
                  }
                  alt="aadhar card image"
                  className="w-[100px] h-[100px] mt-[10px] object-contain mr-[10px]"
                />
              )}

              <div>
                <div className="flex items-center justify-between mt-[10px]">
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="mobile Number"
                    value={farmerDetails.mobileNumber}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                  <button
                    className="bg-blue-500 text-white rounded-md ml-[10px] h-full"
                    onClick={handleOtpVerificationBtnClick}
                  >
                    Verify Number
                  </button>
                </div>
                {otpVerify && (
                  <div className="flex justify-between items-center mt-[10px]">
                    <input
                      type="text"
                      onChange={handleOTP}
                      value={otp}
                      placeholder="Enter Otp Here"
                      className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />

                    <button
                      className="bg-blue-500 p-[12px] text-white rounded-md ml-[10px] h-full"
                      onClick={handleOtpSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="contract-address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Metamask Wallet Address
                </label>
                <p
                  id="contract-address"
                  disabled
                  className="form-input h-[50px] p-[10px] mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  {address}
                </p>
                {/* <button
                  className="bg-blue-500 py-[5px] px-[12px] text-white mt-[8px] rounded-lg"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button> */}
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
