import axios from "axios";
import { toast } from "react-toastify";
import { preLoginApi } from "../../Apis/baseApi";

export const addApmcOfficerAddressToBlockchain = async (globalState, address) => {
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
  
export const RegisterOfficer = async (data, globalState,navigate) => {
    console.log("OFFICER" , data)
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
      const res = await preLoginApi.post("/api/users/register/apmc-officer", data);
      if (!res.data.error) {
        toast.success(res.data.message);
        navigate("/dashboard/apmc-officer")
      } else {
        console.log("ERRRROOROR", res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };