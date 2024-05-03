import React, { useEffect } from "react";
import { dummyData, Headers } from "./dummydata";
import CustomTable from "../../Common/CustomTable";
import VerifyFarmerModal from "./VerifyFarmerModal";
import { useNavigate } from "react-router-dom";
import { getAllFarmers } from "../../../Apis/Farmer/FarmersApi";
import FilterFarmer from "./FilterFarmer";
const VerifyFarmer = () => {
  const navigate = useNavigate();

  const [Data, setDummyData] = React.useState(dummyData);
  const [col, setCol] = React.useState(Headers);
  const [openModal, setOpenModal] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const handleClick = (id) => {
    console.log(id);
    setActiveId(id);
    navigate(`/dashboard/fci/verify-farmer/${id}`);
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const result = getAllFarmers();
    result.then((data) => {
      console.log(data); //Array
      setDummyData(data);
    });
  }, []);
  return (
    <div className="">
      {/* <div>
        <FilterFarmer />
      </div> */}
      <CustomTable
        data={Data}
        columns={col}
        title="Farmer Verification"
        handleClick={handleClick}
      />
      {/* {
        openModal && 
        <VerifyFarmerModal
          id = {activeId}
        />
      } */}
    </div>
  );
};

export default VerifyFarmer;
