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


const FCIDashDetails = () => {
  const [details, setDetails] = React.useState([{ 1: "hello" }]);
  const [allProducts, setAllProducts] = useState([]);
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
    apmcid: null,
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
      const filteredAPMCs = allAPMC.filter((apmcarr) => apmcarr[4] === value);
      setSelectAPMC(filteredAPMCs.map((apmcarr) => apmcarr[1]));
    }

    if (name === "apmc") {
      setApmcDetails({
        ...apmcDetails,
        [name]: value,
      });
      const filteredAPMC = allAPMC.filter((apmcarr) => apmcarr[1] === value);
      const filterarray = filteredAPMC.map((apmcarr) => Number(apmcarr[0]));
      console.log(filterarray[0]);
      setApmcDetails((apmcDetails) => ({
        ...apmcDetails,
        apmcid: filterarray[0],
      }));
      return;
    }

    setApmcDetails({
      ...apmcDetails,
      [name]: value,
    });
  };

  const handleRefresh = () => {
    const apmid = apmcDetails.apmcid;
    const filteredProducts = allProducts.filter(
      (product) => product[6] == apmid
    );
    setDetails(filteredProducts);
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
      setAllProducts(result);
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
          className="form-input mt-1 p-[10px] w-full border rounded-md"
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
          className="form-input mt-1 ml-2 p-[10px] w-full border rounded-md"
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
          className="form-input mt-1 ml-2 p-[10px] w-full border rounded-md"
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
          className="bg-orange-500 border-none outline-none p-[10px] rounded-md text-white ml-[10px]"
        >
          Filter
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

export default FCIDashDetails;
