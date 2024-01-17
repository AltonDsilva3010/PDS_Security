import axios from "axios";
import { toast } from "react-toastify";
import { preLoginApi } from "../../Apis/baseApi";

const addFarmerAddressToBlockchain = async (globalState, address) => {
  try {
    const { contract } = globalState;
    //   console.log("CONTRACT DETAILS",contract)
    const result = await contract.farmerRegistration(
      "0x48616FB53889280cBCF6331D7e5a630c42dEBf62"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RegisterFarmer = async (data, globalState, navigator) => {
  if (!data) {
    toast.error("Data is missing");
    return false;
  }
  const result = await addFarmerAddressToBlockchain(
    globalState,
    data.metamaskWalletAddress
  );
  if (!result) {
    toast.error("not possible to add farmer address");
    return;
  }
  try {
    const res = await preLoginApi.post("/api/users/register/farmer", data);
    if (!res.data.error) {
      toast.success(res.data.message);
      console.log("RES ", res.data, result);
      navigator("/profile-farmer");
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error(err);
  }
};

export const getAllFarmers = async () => {
  try {
    const result = await preLoginApi.get("/api/users/all/farmer");
    return result.data;
  } catch (err) {
    toast.error(err);
  }
};

export const getFarmerData = async (id) => {
  if (!id) {
    toast.error("Data is missing");
    return false;
  }
  try {
    const result = await preLoginApi.post("/api/users/byid/farmer", { id: id });
    console.log(result);
    return result.data;
  } catch (err) {
    toast.error(err);
  }
};
