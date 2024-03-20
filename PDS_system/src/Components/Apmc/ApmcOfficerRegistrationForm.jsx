import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RegisterOfficer } from "../../Apis/APMC_Officer/ApmcOfficerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ApmcOfficerRegistrationForm = () => {
  const navigate = useNavigate()

  const {address} = useSelector(state => state.userSlice)
  const globalState = useSelector(state => state.globlaStateSlice)
  const [officerData, setOfficerData] = React.useState({
    aadharNumber: "",
    metaMaskAddress: "",
    name: "",
    state: "",
    district: "",
    pincode : "",
    aadharImage: "",
    contactNumber : ""
  });

  const [previewAadhar, setPreviewAadhar] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "aadharImage") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        // console.log(reader.result);
          setPreviewAadhar(reader.result);
        setOfficerData((prev) => ({
          ...prev,
          [name]: file,
        }));
      };
    } else {
      setOfficerData({
        ...officerData,
        [name]: value,
      });
    }
  };

  const handleSubmit= (e)=>{
    e.preventDefault()

    if(!officerData.name || !officerData.aadharImage || !officerData.aadharNumber 
        || !officerData.contactNumber || !address || !officerData.state
        || !officerData.district || !officerData.pincode){
          toast("Please Fill All Details")
          return;
      }
    const add = {
      "state" : officerData.state,
      "district" : officerData.district,
      "pincode" : officerData.pincode
    }
    const data = new FormData()
    data.append("name",officerData.name)
    data.append("metaMaskAddress" , address)
    // data.append("state" , officerData.state)
    // data.append("district" , officerData.district)
    data.append("address",JSON.stringify(add))    
    data.append("aadharImage" , officerData.aadharImage)
    data.append("aadharNumber" , officerData.aadharNumber)
    data.append("contactNumber" , officerData.contactNumber)
    data.append("role" , "officer")
    RegisterOfficer(data , globalState,navigate)
  }
  return (
    <div className="w-full mt-[10px] flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-[20px] rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Register as APMC Officer
        </h2>
        <form className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <div className="w-full mr-[10px]">
                <label
                  htmlFor="aadhar-no"
                  className="block text-sm font-medium text-gray-600"
                >
                  Aadhar Number
                </label>
                <input
                  type="text"
                  value={officerData.aadharNumber}
                  onChange={handleChange}
                  name="aadharNumber"
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="relative  flex flex-col justify-between items-center bottom-[-10px]">
                  <input
                    type="file"
                    name="aadharImage"
                    onChange={handleChange}
                    className="opacity-[0] absolute bottom-[0px] right-[-100px]"
                  />
                  <button
                    disabled
                    className="bg-blue-500 text-white h-[50px] w-[100px] px-[4px] py-[2px] rounded-lg"
                  >
                    Upload Aadhar
                  </button>
                </div>
            </div>
            {
              officerData.aadharImage &&
            <img
              className="mt-[10px] w-[100px] object-contain h-[100px]"
              src={previewAadhar}
              alt="aadhar image"
            />
            }
          </div>

          <div className="flex justify-between items-end">
            <div className="w-full mr-[10px]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={officerData.name}
                onChange={handleChange}
                className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div className="w-full ">
              <label
                htmlFor="contract-number"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contract-number"
                value={officerData.contactNumber}
                onChange={handleChange}
                name="contactNumber"
                className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="w-full mr-[10px]">
              <label
                htmlFor="contract-address"
                className="block text-sm font-medium text-gray-600"
              >
                Metamask Address
              </label>
              <div className="flex ">
              <p
                type="text"
                id="contract-address"
                
                className="form-input mt-1 h-[50px] p-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                
              >
                {address}
              </p>
              <button className="bg-blue-500 ml-[10px] h-[60px] w-[100px] text-white px-[4px] py-[2px] rounded-md" disabled={address !== null}>Connect Wallet</button>
              </div>
            </div>
            {/* <button className="bg-blue-500 p-[5px] text-white rounded-md">
              Connect Wallet
            </button> */}
          </div>
          <div className="flex justify-between items-end">
            <div className="w-full mr-[10px]">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={officerData.state}
                onChange={handleChange}
                name="state"
                className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="w-full mr-[10px]">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-600"
              >
                District
              </label>
              <input
                type="text"
                value={officerData.district}
                onChange={handleChange}
                name="district"
                id="district"
                className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-600"
              >
                Pincode
              </label>
              <input
                type="text"
                value={officerData.pincode}
                onChange={handleChange}
                name="pincode"
                id="pincode"
                className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Register as APMC Officer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApmcOfficerRegistrationForm;
