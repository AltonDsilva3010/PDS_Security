import React from "react";
import Modal from "../Common/Modal"
import FarmerRegistrationForm from "../Farmer/FarmerRegistrationForm"
import ApmcOfficerRegistrationForm from "../Form/ApmcOfficerRegistrationForm"
import ApmcRegistration from "../Form/ApmcRegistration"
const RegistrationPage = () => {

  const [farmerRegistration,setFarmerRegistration] = React.useState(false)
  const [apmcOfficerRegistration , setApmcOfficerRegistration] = React.useState(false)
  const [addApmc,setAddApmc] = React.useState(false)

  const handleRegistration = ()=>{
    setFarmerRegistration(prev => !prev)
  }
  
  const handleAddApmc  = ()=>{
    setAddApmc(prev => !prev)
  }
  const handleApmcOfficerRegistration = ()=>{
    setApmcOfficerRegistration(prev => !prev)
  }
  return (
    <div className="relative w-full ">
      <div className="flex flex-col flex-wrap gap-[20px] justify-around mt-[50px] lg:flex-row lg:mt-[100px] ">

        <button
          onClick={handleRegistration}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
        >
          <h2 className="text-3xl text-white font-bold text-center">
            Registed as <br /> Farmer
          </h2>
        </button>

        <button
        onClick={handleApmcOfficerRegistration}
          className="cursor-pointer w-[300px] h-[250px] flex items-center justify-center px-[15px] py-[30px] mb-[30px] lg:px-[30px] lg:py-[25px] lg:mb-0
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
        >
          <h2 className="text-3xl text-white font-bold text-center">
            Registed as <br /> Apmc Officer
          </h2>
        </button>

        <button
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
        </a>
      </div>

      {
        farmerRegistration && 
        <Modal   handleClose = {handleRegistration}>
          <FarmerRegistrationForm/>
        </Modal>
      }

      {
        apmcOfficerRegistration && 
        <Modal handleClose = {handleApmcOfficerRegistration}>
          <ApmcOfficerRegistrationForm
            
          />
        </Modal>
      }

      {
        addApmc && 
        <Modal handleClose = {handleAddApmc}>
          <ApmcRegistration/>
        </Modal>
      }
    </div>
  );
};

export default RegistrationPage;
