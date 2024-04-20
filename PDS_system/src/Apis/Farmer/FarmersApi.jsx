import axios from "axios";
import { toast } from "react-toastify";
import { preLoginApi } from "../../Apis/baseApi";
import { setRole } from "../../ReduxStore/slices/globalStateSlice";

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

export const RegisterFarmer = async (data, globalState, navigator) => {
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
      navigator("/profile-farmer");
    } else {
      console.log("ERRRROOROR", res.data.message);
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error(err);
  }
};

export const getAllFarmers = async () => {
  try {
    const result = await preLoginApi.get("/api/users/all/farmer");
    console.log(result);
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

export const addFarmerProduct = async (data, globalState) => {
  try {
    console.log("DONE , ", data);
    data.quantity = Number(data.quantity);
    data.apmcid = Number(data.apmcid);
    console.log(data);
    const { contract } = globalState;
    // console.log(contract);
    await contract
      .addProduct(
        data.commodity,
        data.quantity,
        data.unit,
        data.image,
        data.tplic,
        data.apmcid,
        data.tsp
      )
      .then((result) => {
        console.log(result);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getFarmerProductDetails = async (globalState, setProductData) => {
  try {
    // const accounts = await window.ethereum.request({
    //   method: "eth_accounts",
    // });
    // console.log("ACCOUNTS", accounts[0]);
    const { contract } = globalState;
    const res = await contract.getFarmerProducts(globalState.signer.address);
    console.log(res);

    if (res) {
      setProductData(res);
    }
    // console.log("RESS" , res)
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserRole = async (globalState, dispatch) => {
  try {
    const { signer } = globalState;
    let addressString = signer.address;
    // addressString = addressString.toLowerCase();
    // console.log(addressString);
    const result = await preLoginApi.post("/api/users/login/farmer", {
      metamaskWalletAddress: addressString,
    });
    // console.log(result.data.role);
    dispatch(setRole(result.data.role));
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (globalState) => {
  try {
    const { signer } = globalState;
    let addressString = signer.address;
    // addressString = addressString.toLowerCase();
    // console.log(addressString);
    const result = await preLoginApi.post("/api/users/login/farmer", {
      metamaskWalletAddress: addressString,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyFarmerFrontend = async (farmerData, globalState) => {
  console.log(farmerData);
  try {
    await preLoginApi
      .put("/api/users/verify/farmer", {
        aadharNumber: farmerData.aadharNumber,
      })
      .then(async (result) => {
        const { contract } = globalState;
        await contract
          .grantRoleToFarmer(farmerData.metamaskWalletAddress)
          .then(() => {
            console.log("Done");
          });
      });
  } catch (error) {
    console.log(error);
  }
};
