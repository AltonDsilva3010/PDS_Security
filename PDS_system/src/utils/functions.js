
import { ethers } from "ethers";
import FarmerABI from "../contracts/FarmerContract.json"
import { setStateDetails } from "../ReduxStore/slices/globalStateSlice";
import  {setUserDetails} from "../ReduxStore/slices/userSlice";

export const connectWallet = async (dispatch) => {
    const FarmerContractAddress = "0x85b6c48E9c3A418d077901738b7Ad617382D01Ae";
    const FarmerContractABI = FarmerABI.abi;
    try {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();
      const contract = new ethers.Contract(
        FarmerContractAddress,
        FarmerContractABI,
        signer
      );
      console.log(provider,signer,contract)
      dispatch(setStateDetails({provider,signer,contract}))
      const user = {
        address : signer.address,
      }
      dispatch(setUserDetails({user}))
    } catch (error) {
      console.log(error);
    }
  };