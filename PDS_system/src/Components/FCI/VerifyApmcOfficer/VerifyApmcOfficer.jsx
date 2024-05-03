import React, { useState, useEffect } from "react";
import { dummyData, Headers } from "./dummyData";
import CustomTable from "../../Common/CustomTable";
import { useNavigate } from "react-router-dom";
import { getAllOfficers } from "../../../Apis/Farmer/FarmersApi";
const VerifyApmcOfficer = () => {
  const navigate = useNavigate();
  const [Data, setData] = React.useState(dummyData);
  const [col, setCol] = React.useState([
    { Header: "Name", accessor: "name" },
    { Header: "Phone", accessor: "phone" },
    { Header: "MetaMaskAddress", accessor: "metamaskWalletAddress" },
    { Header: "AadharCardNumber", accessor: "aadharNumber" },
    { Header: "Verified", accessor: "verified" },
  ]);
  const [openModal, setOpenModal] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");

  const handleClick = (id) => {
    console.log(id);
    setActiveId(id);
    navigate(`/dashboard/fci/verify-apmc-officer/${id}`);
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const result = getAllOfficers();
    result.then((data) => {
      console.log(data); //Array
      setData(data);
    });
  }, []);
  return (
    <div>
      <CustomTable
        data={Data}
        columns={col}
        title="Officer Verification"
        handleClick={handleClick}
      />
    </div>
  );
};

export default VerifyApmcOfficer;
