import { useState, useEffect } from "react";
import { Outlet, json } from "react-router-dom";
import Header from "./Components/Common/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import FarmerABI from "../src/contracts/FarmerContract.json";
import { ethers } from "ethers";
import { setStateDetails } from "./ReduxStore/slices/globalStateSlice";
import { setUserDetails } from "./ReduxStore/slices/userSlice";
import { connectWallet } from "./utils/functions";
import { getUserRole } from "./Apis/Farmer/FarmersApi";
import Sidebar from "./Components/Common/Sidebar";
function App() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log(globalState.role);
  useEffect(() => {
    console.log(globalState);
    const connectWallet = async () => {
      const FarmerContractAddress =
        "0x7A91233B8fE2745CBCC96e88EaE4b10aC8123Dbd";
      const FarmerContractABI = FarmerABI.abi;
      try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
          FarmerContractAddress,
          FarmerContractABI,
          signer
        );
        // console.log(provider, signer, contract);
        dispatch(setStateDetails({ provider, signer, contract }));

        // setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    // console.log(globalState);
    getUserRole(globalState, dispatch);
  }, [globalState]);

  return (
    <div className="overflow-x-hidden h-screen bg-gray-100">
      <Header />

      <div className="w-[80%] mt-[50px] h-full m-auto">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
