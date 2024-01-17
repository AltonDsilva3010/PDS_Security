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
    //   console.log("RESULT " , result)
    const data = await contract.getFarmersRequests();
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RegisterFarmer = async (data, globalState) => {
  if (!data) {
    toast.error("Data is missing");
    return;
  }
  const res = await addFarmerAddressToBlockchain(
    globalState,
    data.metamaskWalletAddress
  );
  console.log("RES ", res);
  if (!res) {
    toast.error("not possible to add farmer address");
    return;
  }
  try {
    const res = await preLoginApi.post("/api/users/register/farmer", data);
    if (!res.data.error) {
      toast.success(res.data.message);
    } else {
      console.log("ERRRROOROR", res.data.message);
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error(err);
  }
};

export const addFarmerProduct = async (data, globalState) => {
  try {
    console.log("DONE , " , data)
    const { contract } = globalState;
    console.log(contract)
    await contract.addProduct(data.name,data.pincode,data.quantity,data.unit,data.image,data.district,data.state);
  } catch (error) {
    console.log(error);
  }
};

export const getFarmerProductDetails = async(globalState)=>{
  try {
    const accounts = await window.ethereum.request({
      method : "eth_accounts",
  });
    // console.log("ACCOUNTS" ,accounts[0])
    const {contract} = globalState
      const res = await contract.getFarmerProducts(accounts[0])
    
      // console.log("RESS" , res)
      return res
  } catch (error) {
    console.log(error)
  }
}
