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
    toast.success("APMC added successfully!");
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

export const placeBidonProduct = async (productId, bidAmount, globalState) => {
  try {
    bidAmount = String(bidAmount);
    // console.log(bidAmount, ethers.parseEther(bidAmount));
    const { contract } = globalState;
    const result = await contract
      .placeBid(productId, {
        value: ethers.parseEther(bidAmount),
      })
      .then(() => {
        toast.success("Bid Placed");
      });
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

export const buyAtMSPFunction = async (productId, bidAmount, globalState) => {
  try {
    bidAmount = String(bidAmount);
    const { contract } = globalState;
    const result = await contract
      .buyAtMSP(productId, {
        value: ethers.parseEther(bidAmount),
      })
      .then(() => {
        toast.success("Bought at MSP");
      });
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

export const getAuctionEndedonProduct = async (productId, globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.bidsDone(productId);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const qualityCheckProduct = async (productId, globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.inspectFoodSafety(productId);
    console.log("Done", result);
    toast.success("Product Verified!");
  } catch (error) {
    console.log(error);
  }
};

export const getAllBidsFunction = async (globalState) => {
  try {
    const { contract } = globalState;
    const result = await contract.getAllBids();
    return result;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

export const convertUnixtoDateTime = (unixTimestamp) => {
  const dateObject = new Date(unixTimestamp * 1000);

  // Option 1: Use toLocaleString for user-friendly format (depends on locale)
  const formattedDateTime = dateObject.toLocaleString();

  // Option 2: Use specific methods for more control over formatting
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  const formattedDateTimeWithPadding = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  // Choose the option that best suits your needs:

  // return formattedDateTime;  // Option 1 (user-friendly)
  return formattedDateTimeWithPadding; // Option 2 (more control)
};

export const weiToRupees = (weiAmount, exchangeRate) => {
  const etherAmount = weiAmount / 10 ** 18;

  // 2. Convert Ether to Rupees using the provided exchange rate
  const rupeesAmount = etherAmount * exchangeRate;

  // 3. Round the result to two decimal places (optional)
  return rupeesAmount.toFixed(2);
};
