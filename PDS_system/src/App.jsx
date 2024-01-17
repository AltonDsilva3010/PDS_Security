import { useState ,useEffect} from "react";
import { Outlet, json } from "react-router-dom";
import Header from "./Components/Common/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import FarmerABI from "../src/contracts/FarmerContract.json"
import { ethers } from "ethers";
import { setStateDetails } from "./ReduxStore/slices/globalStateSlice";
import { setUserDetails } from "./ReduxStore/slices/userSlice";
function App() {
  const dispatch = useDispatch()
  const globalState = useSelector(state => state.globlaStateSlice)
  useEffect(() => {
    // console.log(globalState)
    const connectWallet = async () => {
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

    connectWallet();
  }, []);

  return (
    <div className="overflow-x-hidden h-screen bg-gray-100">
      <Header />
      <div className="w-[80%] mt-[50px] flex flex-col  items-center m-auto">
        <Outlet />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
