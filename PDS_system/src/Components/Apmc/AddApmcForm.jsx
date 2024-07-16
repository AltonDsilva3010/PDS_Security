import React, { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { connectWallet } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { RegisterFarmer } from "../../Apis/Farmer/FarmersApi";
import { useDispatch, useSelector } from "react-redux";
import { addAPMC } from "../../Apis/APMC_Officer/ApmcOfficerApi";
import { states } from "../FCI/constants";
import { commodities } from "../FCI/constants";




// Form for Adding APMC 
const AddApmcForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const globalState = useSelector((state) => state.globlaStateSlice);
  const [apmcDetails, setApmcDetails] = React.useState({
    ApmcName: "",
    apmclocation: "",
    state: "",
    district: "",
    contact: "",
    commoditiesTraded: [],
  });
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

  const submitForm = (e) => {
    e.preventDefault();
    console.log(apmcDetails);
    if (isBtnDisabled()) {
      toast("Please Fill Form Completely");
      return;
    } else {
      // console.log(farmerDetails)
      let formData = new FormData();
      formData.append("name", apmcDetails.ApmcName);
      formData.append("state", apmcDetails.state);
      formData.append("district", apmcDetails.district);
      formData.append("contact", apmcDetails.contact);
      formData.append("commoditiestraded", apmcDetails.commoditiesTraded);
      addAPMC(apmcDetails, globalState);
      console.log(formData);
    }
  };

  const isBtnDisabled = () => {
    if (
      apmcDetails.ApmcName === "" ||
      apmcDetails.state === "" ||
      apmcDetails.district === "" ||
      apmcDetails.contact === "" ||
      apmcDetails.commoditiesTraded.length === 0
    )
      return true;

    return false;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "state") {
      setApmcDetails({
        ...apmcDetails,
        [name]: value,
      });
      setDistricts(states[e.target.value] || []); // Set empty array if state has no districts
    }

    if (name === "commodities") {
      const newCommodity = e.target.value;

      const updatedApmcDetails = { ...apmcDetails };

      // Check if commodity is already selected
      if (updatedApmcDetails.commoditiesTraded.includes(newCommodity)) {
        return; // Do nothing if already selected
      }

      // Add the new commodity to the commoditiesTraded array
      updatedApmcDetails.commoditiesTraded.push(newCommodity);

      // Update the apmcDetails state with the modified array
      setApmcDetails(updatedApmcDetails);
    }
    setApmcDetails({
      ...apmcDetails,
      [name]: value,
    });
  };

  return (
    <div className="flex  items-center justify-center bg-gray-100 ">
      <div className="bg-white w-full p-[40px] rounded-lg shadow-md ">
        <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
          Add a new APMC
        </h2>

        <form className="space-y-4">
          <div className="flex flex-col w-full justify-between gap-[50px]">
            <div className="w-full">
              <div className="flex">
                <input
                  type="text"
                  id="ApmcName"
                  name="ApmcName"
                  placeholder="Enter APMC Name"
                  value={apmcDetails.ApmcName}
                  onChange={handleChange}
                  className="form-input mt-1  block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="apmclocation"
                  name="apmclocation"
                  placeholder="Enter APMC Address"
                  value={apmcDetails.apmclocation}
                  onChange={handleChange}
                  className="form-input mt-1  block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex mt-[10px]">
                <select
                  id="state"
                  name="state"
                  value={apmcDetails.state}
                  onChange={handleChange}
                  className="form-input mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select State</option>
                  {Object.keys(states).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <select
                  id="district"
                  name="district"
                  value={apmcDetails.district}
                  onChange={handleChange}
                  className="form-input mt-1 ml-2 p-2 w-full border rounded-md"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex mt-[10px] items-center">
                <select
                  id="commodities"
                  name="commodities"
                  value={apmcDetails.commoditiesTraded}
                  onChange={handleChange}
                  className="form-input mt-1  p-2 w-full border rounded-md"
                >
                  <option value="">Commodities Traded</option>
                  {commodities.map((commodity) => (
                    <option key={commodity} value={commodity}>
                      {commodity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex mt-[10px] items-center">
                <span className="font-bold mr-2">Selected: </span>
                {apmcDetails.commoditiesTraded.map((commodity) => (
                  <span className="mr-1">{commodity}</span>
                ))}
              </div>
              <div className="flex mt-[10px] items-center">
                <input
                  type="tel"
                  placeholder="Enter Contact Number"
                  name="contact"
                  onChange={handleChange}
                  value={apmcDetails.contact}
                  className="form-input mt-1  block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={submitForm}
            >
              Add APMC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApmcForm;
