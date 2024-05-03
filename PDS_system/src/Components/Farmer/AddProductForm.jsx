import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFarmerProduct } from "../../Apis/Farmer/FarmersApi";
import { Cloudinary } from "@cloudinary/url-gen";
import { states } from "../FCI/constants";
import { commodities, commodityprices } from "../FCI/constants";
import {
  getAllAPMC,
  getEthPrice,
} from "../../Apis/APMC_Officer/ApmcOfficerApi";
import axios from "axios";

const AddProductForm = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  const [districts, setDistricts] = useState([]);
  const [allAPMC, setAllAPMC] = useState([]);
  const [selectAPMC, setSelectAPMC] = useState([]);
  const [currentCommo, setCurrComm] = useState([]);
  const [commFile, setCommFile] = useState([]);
  const [licFile, setLicFile] = useState([]);
  const [exgRate, setExgRate] = useState(null);
  const [data, setData] = React.useState({
    commodity: "",
    image: "",
    quantity: "",
    district: "",
    state: "",
    unit: "",
    apmc: "",
    tplic: "",
    apmcid: null,
    msp: null,
    tsp: null,
    duration: null,
    tspine: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("NAME< VALUE", name);
    if (name === "state") {
      setData({
        ...data,
        [name]: value,
      });
      setDistricts(states[e.target.value] || []); // Set empty array if state has no districts
      setSelectAPMC([]);
    }
    if (name === "district") {
      // setSelectAPMC([]);
      setData({
        ...data,
        [name]: value,
      });
      const filteredAPMCs = allAPMC.filter((apmcarr) => apmcarr[4] === value); //checking district
      setSelectAPMC(filteredAPMCs.map((apmcarr) => apmcarr[1])); //setting apmc
      // setCurrComm([]);
    }
    if (name === "apmc") {
      setData({
        ...data,
        [name]: value,
      });

      // console.log(allAPMC, value);
      const currApmc = allAPMC.filter((apmcarr) => apmcarr[1] === value); //checking name
      // console.log(currApmc[0][4]);
      setData({ ...data, apmcid: currApmc[0][0] });
      setCurrComm(currApmc[0][5]); //Setting commodity
    }

    if (name === "commodity") {
      const commodity = value;
      setData({ ...data, msp: commodityprices[commodity]?.valinkg });
    }

    if (name === "quantity") {
      setData({
        ...data,
        tsp: data.msp * value,
        tspine: (data.msp * value) / exgRate,
      });
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const files = e.target.files;
    const newFilesArray = Array.from(files);
    if (name === "image") {
      setCommFile(newFilesArray);
    } else {
      setLicFile(newFilesArray);
    }

    newFilesArray.map(async (singleImage) => {
      console.log(singleImage);
      let ImgHash;
      try {
        const formDataNew = new FormData();
        formDataNew.append("file", singleImage);

        // console.log(file[i]);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formDataNew,
          headers: {
            pinata_api_key: "403a4001d5cc63b3ce0f",
            pinata_secret_api_key:
              "cd44bc63c6fdbabc149ce19412cc7c049d2ee4e5477ce8e9f824ef323a8a0c30",
            "Content-Type": "multipart/form-data",
          },
        });

        ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        if (name === "image") {
          setData({ ...data, image: ImgHash });
        } else {
          setData({ ...data, tplic: ImgHash });
        }

        // data.image = ImgHash;
        toast.success("Image added!");
        console.log(ImgHash);
      } catch (error) {
        console.log(error);
        console.log("Unable to Upload the Image");
      }
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("FORM DATA");
    if (
      data.commodity === "" ||
      data.quantity === "" ||
      data.district === "" ||
      data.state === "" ||
      data.apmc === "" ||
      data.image === "" ||
      data.unit === ""
    ) {
      toast.error("Please Fill complete Form");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.commodity);
    formData.append("quantity", data.quantity);
    formData.append("district", data.district);
    formData.append("state", data.state);
    formData.append("apmc", data.apmcid);
    formData.append(
      "image",
      "https://res.cloudinary.com/dwlgkphss/image/upload/v1700228906/PDS_System/pplrrmfw5udwtmxake4b.png"
    );
    formData.append("unit", data.unit);

    console.log("DATA", data);
    // console.log("FORMDATA", formData);

    addFarmerProduct(data, globalState);
  };

  useEffect(() => {
    getAllAPMC(globalState).then((result) => {
      console.log(result);
      setAllAPMC(result);
    });
    getEthPrice().then((result) => {
      setExgRate(result);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-[20px] d-flex flex-col justify-center">
      <h3 className="my-[12px]  text-center font-medium">
        {" "}
        Add Your Products{" "}
      </h3>
      <form className="flex flex-col items-center w-full">
        <div className="flex justify-between w-full mt-[10px] mb-[10px]">
          <div className=" rounded-md focus:border-none visited:border-none">
            <select
              id="state"
              name="state"
              value={data.state}
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
          </div>
          <div className="  focus:border-none visited:border-none">
            <select
              id="district"
              name="district"
              value={data.district}
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
          </div>
          <div className=" ml-2 focus:border-none visited:border-none">
            <select
              id="apmc"
              name="apmc"
              value={data.apmc}
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
          </div>
        </div>
        <div className=" flex justify-around w-full ">
          <div className=" w-full mr-2">
            <select
              id="commodity"
              name="commodity"
              value={data.commodity}
              onChange={handleChange}
              className="form-input mt-1  p-2 w-full border rounded-md"
            >
              <option value="">Select Commodity</option>
              {currentCommo.length != 0 &&
                currentCommo.map((commo) => (
                  <option key={commo} value={commo}>
                    {commo}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full ">
            <p className="mt-1  p-2 w-full border rounded-md">
              {data.msp ? `₹ ${data.msp} / KG` : "MSP"}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-[15px] w-full">
          <div className="border-solid mr-[10px] border-2 rounded-md w-[50%] ">
            <input
              type="number"
              min={1}
              name="quantity"
              value={data.quantity}
              placeholder="Enter Quantity"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="border-solid  flex items-center w-[50%] border-2 rounded-md focus:border-none visited:border-none">
            <select
              className="border-none w-[100%]  p-[8px]"
              onChange={handleChange}
              name="unit"
              value={data.unit}
            >
              <option value="">Select unit</option>
              <option value={"KG"}>KG</option>
              <option value={"Litre"}>Litre</option>
              <option value={"Quintal"}>Quintal</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-[15px] w-full">
          <div className="border-solid  flex items-center  mr-1 w-[50%] border-2 rounded-md focus:border-none visited:border-none">
            <p className="p-[8px]">
              {data.tsp ? `₹ ${data.tsp}` : "Total Selling Price"}
            </p>
          </div>
          <div className="border-solid ml-2 flex items-center w-[50%] border-2 rounded-md focus:border-none visited:border-none">
            <p className="p-[8px]">
              {data.tspine ? `ETH ${data.tspine}` : "Selling Price in ETH"}
            </p>
          </div>
        </div>
        <div className="mt-[10px] flex justify-around w-full">
          <button className="bg-blue-500 rounded-md w-[48%] p-[10px] relative">
            <p className="text-white">Upload Commodity image</p>
            <input
              type="file"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              className="opacity-0 absolute w-full h-full top-0 left-0"
            />
          </button>
          <button className="bg-blue-500  rounded-md w-[48%] p-[10px] relative">
            <p className="text-white">Upload Third Party Licence</p>
            <input
              type="file"
              name="tplic"
              accept="image/*"
              onChange={handleImageUpload}
              className="opacity-0 absolute w-full h-full top-0 left-0"
            />
          </button>
        </div>
        {commFile && (
          <div className="mt-[10px] w-full">
            <h2>Commodity Images:</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {commFile.map((file, index) => {
                return (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginRight: "10px",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
        {licFile && (
          <div className="mt-[10px] w-full">
            <h2>License Image:</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {licFile.map((file, index) => {
                return (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginRight: "10px",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
        <button
          className="bg-blue-500 py-[10px] w-[50%] mt-[14px] rounded-md text-white"
          onClick={handleSubmitForm}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
