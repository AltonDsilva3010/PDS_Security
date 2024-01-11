import { useState ,useEffect} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Common/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import FarmerABI from "../src/contracts/FarmerContract.json"
import { ethers } from "ethers";
import { setStateDetails } from "./ReduxStore/slices/globalStateSlice";
function App() {
  const dispatch = useDispatch()
  const globalState = useSelector(state => console.log(state.globlaStateSlice))
  useEffect(() => {
    console.log(globalState)
    const connectWallet = async () => {
      const FarmerContractAddress = "0xcA6ce771ee55A1B71d1C9576A6D186760A70f3CF";
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

        // setState({ provider, signer, contract });
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
