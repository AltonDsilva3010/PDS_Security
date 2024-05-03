import React, { useState, useEffect } from "react";
import CustomTable from "../Common/CustomTable";
import { getAllAPMC } from "../../Apis/APMC_Officer/ApmcOfficerApi";
import { useSelector, useDispatch } from "react-redux";

const AllAPMC = () => {
  const [headers, setHeaders] = useState([
    { Header: "APMC", accessor: "1" },
    { Header: "District", accessor: "3" },
    { Header: "State", accessor: "4" },
    { Header: "Location", accessor: "2" },
    { Header: "Phone", accessor: "6" },
    { Header: "Commodities", accessor: "5" },
  ]);
  const [allAPMC, setAllAPMC] = useState([]);
  const globalState = useSelector((state) => state.globlaStateSlice);

  useEffect(() => {
    getAllAPMC(globalState).then((result) => {
      setAllAPMC(result);
      console.log(result);
    });
  }, []);

  return (
    <div>
      {" "}
      <CustomTable data={allAPMC} columns={headers} title={"APMC Details"} />
    </div>
  );
};

export default AllAPMC;
