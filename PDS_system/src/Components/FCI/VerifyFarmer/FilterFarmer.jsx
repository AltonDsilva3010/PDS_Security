import React from "react";
import { States, mandisList } from "../constants";

const FilterFarmer = () => {
  const [activeState, setActiveState] = React.useState("");
  const [activeMandis, setActiveMandis] = React.useState("");
  const [states, setStates] = React.useState(States);
  const [mandis, setMandis] = React.useState();
  const [verifyStatus, setVerifyStatus] = React.useState();
  // fetch mandis list based on choosen State

  const statesOptions = states.map((e) => {
    return <option name={e}>{e}</option>;
  });

  const MandisOptions = mandis?.map((m) => {
    return <option name={m.title}>{m.value}</option>;
  });
  React.useEffect(() => {
    if (activeState) {
      console.log(
        `Making APi call for fetching mandis data of State ${activeState}`
      );
      const arr = mandisList.filter((e) => e.state === activeState);
      console.log("Mandis");
      console.log(arr[0].mandis);
      setMandis(arr[0].mandis);
    }
  }, [activeState]);
  const handleStateFilter = (e) => {
    const val = e.target.value;
    if (val != "#") {
      setActiveState(val);
    } else {
      setActiveState("");
    }
  };
  const handleMandisFilter = (e) => {
    const val = e.target.value;
    if (val != "#") {
      setActiveMandis(val);
    } else {
      setActiveMandis("");
    }
  };

  const handleStatus = (e) => {
    console.log(e.target);
    setVerifyStatus(e.target.value);
  };

  const handlefilterButton = ()=>{
    console.log("Make api cal for fetching details based on filters set ")
  }
  return (
    <div className="grid grid-cols-4 gap-[10px] mb-[40px]">
      <select
        className="bg-white text-center rounded-md p-[5px] border-none outline-none focus:outline-none focus-visible:outline-none "
        value={activeState}
        onChange={handleStateFilter}
      >
        <option value="#" selected>
          --States--
        </option>
        {statesOptions}
      </select>

      <select
        className="bg-white text-center rounded-md p-[5px] border-none outline-none focus:outline-none focus-visible:outline-none "
        value={activeMandis}
        onChange={handleMandisFilter}
      >
        <option value="#" selected>
          --Mandis--
        </option>
        {MandisOptions}
      </select>

      <div className="flex bg-white  p-[8px] rounded-md justify-between items-center">
        {/* <div className="flex flex-col items-center justify-center"> */}
          <label htmlFor="status-true">Verified</label>
          <input
            type="radio"
            id="status-true"
            name="verifystatus"
            value={true}
            onChange={handleStatus}
          />
        {/* </div> */}
        {/* <div> */}
          <label htmlFor="status-false">Not Verified</label>
          <input
            type="radio"
            id="status-false"
            name="verifystatus"
            value={false}
            onChange={handleStatus}
          />
        {/* </div> */}
      </div>
      <button
       className="bg-orange-500 rounded-md text-white font-xl font-bold"
       onClick={handlefilterButton}
      >Search</button>
    </div>
  );
};

export default FilterFarmer;
