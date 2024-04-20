import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DetailsTable from "./DetailsTable";
import {
  mandisList,
  States,
  Commodities,
  dashboardDetails,
  states,
  commodities,
  detailsHeader,
} from "../constants";
import {
  getAllAPMC,
  getAllProducts,
} from "../../../Apis/APMC_Officer/ApmcOfficerApi";
import { toast } from "react-toastify";
import CustomTable from "../../Common/CustomTable";
import { useNavigate } from "react-router-dom";

const DashboardDetails = () => {
  const [details, setDetails] = React.useState([{ 1: "hello" }]);
  const [changedDetails, setChangedDetails] = useState([]);
  const [detailHeader, setDetailHeader] = React.useState(detailsHeader);
  const globalState = useSelector((state) => state.globlaStateSlice);
  const [districts, setDistricts] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const [allAPMC, setAllAPMC] = useState([]);
  const [selectAPMC, setSelectAPMC] = useState([]);
  const [apmcDetails, setApmcDetails] = React.useState({
    state: "",
    district: "",
    apmc: "",
  });
  const navigate = useNavigate();

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

    if (name === "district") {
      // setSelectAPMC([]);
      setApmcDetails({
        ...apmcDetails,
        [name]: value,
      });
      const filteredAPMCs = allAPMC.filter((apmcarr) => apmcarr[3] === value);
      setSelectAPMC(filteredAPMCs.map((apmcarr) => apmcarr[1]));
      // setCurrComm([]);
    }

    setApmcDetails({
      ...apmcDetails,
      [name]: value,
    });
  };

  const handleRefresh = () => {
    const { state, district, apmc } = formData;
    if (!state || !mandi || !commodity) {
      toast.warning("Please Input All fields");
      return;
    }
    console.log(formData);
  };

  const handleClick = (id) => {
    console.log(id);
    setActiveId(id);
    navigate(`/dashboard/fci/${id}`);
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    getAllAPMC(globalState).then((result) => {
      console.log(result);
      setAllAPMC(result);
    });
    getAllProducts(globalState).then((result) => {
      console.log(result);
      setDetails(result);
    });
  }, []);

  useEffect(() => {
    const newDetails = details.map((detail, index) => {
      return {
        ...detail,
        _id: index,
        0: Number(detail[0]),
        2: Number(detail[2]),
        6: Number(detail[6]),
        7: Number(detail[7]),
      };
    });
    console.log(newDetails);
    setChangedDetails(newDetails);
  }, [details]);

  return (
    <div>
      <div className="rounded-md bg-blue-500 p-[10px] flex justify-between">
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

        <select
          id="apmc"
          name="apmc"
          value={apmcDetails.apmc}
          onChange={handleChange}
          className="form-input mt-1 ml-2 p-2 w-full border rounded-md"
        >
          <option value="">Select APMC</option>
          {selectAPMC.length != 0 &&
            selectAPMC.map((apmc) => (
              <option key={apmc} value={apmc}>
                {apmc}
              </option>
            ))}
        </select>

        <button
          onClick={handleRefresh}
          className="bg-orange-500 border-none outline-none p-[10px] rounded-md text-white"
        >
          Refresh
        </button>
      </div>
      <div className="mt-[10px]">
        {changedDetails && (
          <CustomTable
            data={changedDetails}
            columns={detailHeader}
            title="Trading Details"
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardDetails;
