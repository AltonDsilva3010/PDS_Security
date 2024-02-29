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
import { connectWallet } from "./utils/functions";
function App() {
  const dispatch = useDispatch()
  const globalState = useSelector(state => state.globlaStateSlice)
  useEffect(() => {
    // console.log(globalState)
    connectWallet(dispatch);
  }, []);

  return (
    <div className="overflow-x-hidden h-screen bg-gray-100">
      <Header />
      <div className="h-full w-[80%] m-auto mt-[20px]">
        <Outlet />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
