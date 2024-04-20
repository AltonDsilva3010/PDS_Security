import axios from "axios";
import { toast } from "react-toastify";
import { preLoginApi } from "../../Apis/baseApi";
import { ethers } from "ethers";

export const addApmcOfficerAddressToBlockchain = async (
  globalState,
  address
) => {
  try {
    const { contract } = globalState;
    //   console.log("CONTRACT DETAILS",contract)
    const result = await contract.farmerRegistration(
      "0x48616FB53889280cBCF6331D7e5a630c42dEBf62"
    );
    //   console.log("RESULT " , result)
    const data = await contract.getFarmersRequests();
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RegisterOfficer = async (data, globalState, navigate) => {
  console.log("OFFICER", data);
  if (!data) {
    toast.error("Data is missing");
    return;
  }
  // const res = await addFarmerAddressToBlockchain(
  //   globalState,
  //   data.metamaskWalletAddress
  // );
  // console.log("RES ", res);
  // if (!res) {
  //   toast.error("not possible to add farmer address");
  //   return;
  // }
  try {
    const res = await preLoginApi.post(
      "/api/users/register/apmc-officer",
      data
    );
    if (!res.data.error) {
      toast.success(res.data.message);
      navigate("/dashboard/fci");
    } else {
      console.log("ERRRROOROR", res.data.message);
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error(err);
  }
};

export const addAPMC = async (data, globalState) => {
  data.contact = Number(data.contact);

  console.log(typeof data.contact, data.contact);

  if (!data) {
    toast.error("Data is missing");
    return;
  }

  try {
    const { contract } = globalState;
    // const res = await contract.getFarmersRequests();
    // console.log(res);
    const result = await contract.addAPMC(
      data.ApmcName,
      data.apmclocation,
      data.state,
      data.district,
      data.commoditiesTraded,
      data.contact
    );
    console.log(result);
    // toast.success(res.data.message);
  } catch (error) {
    toast.error(error);
  }
};

export const getAllAPMC = async (globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.getAllAPMC();
    // console.log(result);
    return result;
  } catch (error) {
    toast.error(error);
  }
};

export const getEthPrice = async () => {
  try {
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const data = await result.data;

    const exchangeRate = data.ethereum.inr;
    // console.log(exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (globalState) => {
  try {
    console.log("GetALlProducts");
    const { contract } = globalState;
    const result = await contract.getAllFarmerProducts();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getFarmerProduct = async (productId, globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.getAProduct(productId);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const buyFarmerProduct = async (productId, bidAmount, globalState) => {
  try {
    bidAmount = String(bidAmount);
    // console.log(bidAmount, ethers.parseEther(bidAmount));
    const { contract } = globalState;
    const result = await contract.buyProduct(productId, {
      value: ethers.parseEther(bidAmount),
    });
    console.log("Done", result);
  } catch (error) {
    console.log(error);
  }
};

export const qualityCheckProduct = async (productId, globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.inspectFoodSafety(productId);
    console.log("Done", result);
  } catch (error) {
    console.log(error);
  }
};
