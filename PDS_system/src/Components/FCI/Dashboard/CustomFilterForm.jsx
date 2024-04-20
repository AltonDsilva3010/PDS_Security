import React from "react";

import { mandisList, States, Commodities } from "../constants";
import { toast } from "react-toastify";
const CustomFilterForm = () => {
  const [states, setStates] = React.useState(States);
  const [mandis, setMandis] = React.useState(mandisList[0].mandis);
  const [commodities, setCommodities] = React.useState(Commodities);

  const [formData, setFormData] = React.useState({
    state: "",
    mandi: "",
    commodity: "",
  });

  const handleStateChange = (e) => {
    e.preventDefault();
    const val = e.target.value != "#" ? e.target.value : "";
    setFormData((prev) => ({
      ...prev,
      state: val,
    }));
  };
  const handleMandisChange = (e) => {
    e.preventDefault();
    const val = e.target.value != "#" ? e.target.value : "";
    setFormData((prev) => ({
      ...prev,
      mandi: val,
    }));
  };
  const handleCommodityChange = (e) => {
    e.preventDefault();
    const val = e.target.value != "#" ? e.target.value : "";
    setFormData((prev) => ({
      ...prev,
      commodity: val,
    }));
  };
  const statesOptions = states.map((st) => <option name={st}>{st}</option>);

  const mandisOptions = mandis.map((md) => (
    <option name={md.title}>{md.value}</option>
  ));

  const commodityOptions = commodities.map((cd) => (
    <option name={cd.title}>{cd.value}</option>
  ));

  const handleRefresh = () => {
    const { state, mandi, commodity } = formData;
    if (!state || !mandi || !commodity) {
      toast.warning("Please Input All fields");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="rounded-md bg-blue-500 p-[10px] flex justify-between">
      <select
        value={formData.state}
        onChange={handleStateChange}
        className="bg-white text-center rounded-md p-[5px] border-none outline-none"
      >
        <option value="#" selected>
          --States--
        </option>
        {statesOptions}
      </select>

      <select
        value={formData.mandi}
        onChange={handleMandisChange}
        className="bg-white text-center rounded-md p-[5px] border-none outline-none"
      >
        <option value="#" selected>
          --Mandis--
        </option>
        {mandisOptions}
      </select>

      <select
        value={formData.commodity}
        onChange={handleCommodityChange}
        className="bg-white text-center rounded-md p-[5px] border-none outline-none"
      >
        <option value="#" selected>
          --Commodity--
        </option>
        {commodityOptions}
      </select>

      <button
        onClick={handleRefresh}
        className="bg-orange-500 border-none outline-none p-[10px] rounded-md text-white"
      >
        Refresh
      </button>
    </div>
  );
};

export default CustomFilterForm;
