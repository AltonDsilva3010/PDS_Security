import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const RegistrationPage = () => {
  const [farmerRegistration, setFarmerRegistration] = React.useState(false);
  const [apmcOfficerRegistration, setApmcOfficerRegistration] =
    React.useState(false);
  const [addApmc, setAddApmc] = React.useState(false);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const contractAddress = "0x78b190cc9165110C14FF12504461430294Dd96E4";
  //     const contractABI = abi.abi;
  //     try {
  //       let provider = new ethers.BrowserProvider(window.ethereum);
  //       let signer = await provider.getSigner();
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         contractABI,
  //         signer
  //       );
  //       setState({ provider, signer, contract });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   connectWallet();
  // }, []);

  // const handleRegistration = () => {
  //   setFarmerRegistration((prev) => !prev);
  // };

  const handleAddApmc = () => {
    setAddApmc((prev) => !prev);
  };
  const handleApmcOfficerRegistration = () => {
    setApmcOfficerRegistration((prev) => !prev);
  };

  return (
    <div className="relative w-full ">
      <div className="flex flex-col flex-wrap gap-[20px] justify-around mt-[50px] lg:flex-row lg:mt-[100px] ">
        
        <NavLink
          to={"/registration/farmer"}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
            bg-white rounded-lg border-2 border-black"
        >
          <h2 className="text-3xl text-black font-bold text-center">
            Register as <br /> Farmer
          </h2>
        </NavLink>

        <NavLink
          to={"/registration/apmc-officer"}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-white rounded-lg border-2 border-black"
        >
          <h2 className="text-3xl text-black font-bold text-center">
            Register as <br /> Apmc Officer
          </h2>
        </NavLink>

        <NavLink
          to={"/registration/buyer"}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-white rounded-lg border-2 border-black"
        >
          <h2 className="text-3xl text-black font-bold text-center">
            Register as <br /> Buyer
          </h2>
        </NavLink>
        {/* <NavLink
          to={"/registration/apmc"}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
        >
          <h2 className="text-3xl text-white font-bold text-center">
            Add a new APMC
          </h2>
        </NavLink> */}
        {/* <button
          onClick={handleAddApmc}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
        >
          <h2 className="text-3xl text-white font-bold text-center">
            Apmc Registration
          </h2>
        </button>

        <a
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
        >
          <h2 className="text-3xl text-white font-bold text-center">
            Registed as <br /> FCI Officer
          </h2>
        </a> */}
      </div>

      {/* {farmerRegistration && (
        <Modal handleClose={handleRegistration}>
          <FarmerRegistrationForm />
        </Modal>
      )} */}

      {/* {apmcOfficerRegistration && (
        <Modal handleClose={handleApmcOfficerRegistration}>
          <ApmcOfficerRegistrationForm />
        </Modal>
      )} */}

      {/* {addApmc && (
        <Modal handleClose={handleAddApmc}>
          <ApmcRegistration />
        </Modal>
      )} */}
    </div>
  );
};

export default RegistrationPage;
