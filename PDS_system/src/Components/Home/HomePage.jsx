import React, { useState, useEffect } from "react";
import abi from "../../assets/Product.json";
import { ethers } from "ethers";
import { useDispatch,useSelector } from "react-redux";
import {setStateDetails} from "../../ReduxStore/slices/globalStateSlice"

const HomeComponent = () => {
  
  
  const dispatch = useDispatch()
  const globalState = useSelector(state => console.log(state.globlaStateSlice))
  useEffect(() => {
    console.log(globalState)
    const connectWallet = async () => {
      const contractAddress = "0x722d9CC790cCbFdCddB61317C428f430803E8bd2";
      const contractABI = abi.abi;
      try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
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

  return <div>HomeComponent</div>;
};

export default HomeComponent;
