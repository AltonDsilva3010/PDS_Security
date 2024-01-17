import React from "react";
import { dummyData } from "./dummydata";
import CloseBtn from "../../../assets/icons/x-lg.svg";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFarmerData } from "../../../Apis/Farmer/FarmersApi";
const VerifyFarmerModal = () => {
  const [farmerData, setFarmerData] = React.useState("");
  function openImage() {
    const elem = document.getElementById("aadharImage");
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

  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);

  const handleVerification = async (address) => {
    //Farmer Verification
    try {
      const { contract } = globalState;
      console.log("CONTRACT DETAILS", contract);
      const result = await contract.grantRoleToFarmer(address);
      console.log("RESULT ", result);
      const data = await contract.getFarmersRequests();
      const data2 = await contract.getFarmers();
      console.log(data, data2);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();
  React.useEffect(() => {
    // const data = dummyData;
    console.log(id);
    // const res = data.find((d) => d.id == id);
    const res = getFarmerData(id);
    console.log(res);
    res.then((data) => {
      console.log(data);
      setFarmerData(data);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-5 flex justify-center items-center ">
      <div className="bg-white rounded-lg p-[20px] w-[80%]">
        {/* <div className="relative h-[50px] border-b-[2px]">
          <img
            src={CloseBtn}
            className="w-[40px] h-[40px] object-cover "
          />
        </div> */}
        {farmerData ? (
          <div className="mt-[10px]">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Name</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.name ?? "Name"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Gender</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.gender ?? "Gender"}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-semibold">Date Of Birth</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.dob ?? 10}
                </span>
              </div>
            </div>
            {/* Email */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Email</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.email ?? "Email"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Phone</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.phone ?? "Phone"}
                </span>
              </div>
            </div>
            {/* Address */}
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">State</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.state ?? "State"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">District</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.district ?? "District"}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-semibold">PinCode</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.pinCode ?? "401105"}
                </span>
              </div>
            </div>
            {/* AAdhar card pan card */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">Aadhar card Number</span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.AadharCardNumber ?? "Aadhar"}
                </span>
              </div>
              <div className="flex flex-col mr-[10px] w-full">
                <span className="font-semibold">
                  Pan card <Number></Number>
                </span>
                <span className="p-[10px] border-[2px] rounded-md border-black">
                  {farmerData.panCardNumber ?? "Pan Card"}
                </span>
              </div>
            </div>
            {/* Images of Aadhar and Pan card */}
            <div className="mt-[10px]">
              <img
                src={farmerData.aadharImage}
                onClick={openImage}
                id="aadharImage"
                width="200"
                height="300"
                className="object-fit"
              />
            </div>

            {/* Confirmation Button */}
            <div className="flex  justify-around items-center mt-[10px]">
              <button className="p-[10px] w-[40%] mr-[10px] bg-red-500 text-white rounded-md">
                Reject
              </button>
              <button
                className="p-[10px] w-[40%] bg-green-500 text-white rounded-md"
                onClick={() =>
                  handleVerification(
                    "0x48616FB53889280cBCF6331D7e5a630c42dEBf62"
                  )
                }
              >
                Confirm
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

export default VerifyFarmerModal;
