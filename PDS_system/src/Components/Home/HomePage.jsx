import React, { useState, useEffect } from "react";
import FarmerABI from "../../contracts/FarmerContract.json";
import { ethers } from "ethers";
import { useDispatch,useSelector } from "react-redux";
import {setStateDetails} from "../../ReduxStore/slices/globalStateSlice"

const HomeComponent = () => {
  
  
  // const dispatch = useDispatch()
  // const globalState = useSelector(state => console.log(state.globlaStateSlice))
  // useEffect(() => {
  //   console.log(globalState)
  //   const connectWallet = async () => {
  //     const FarmerContractAddress = "0xcA6ce771ee55A1B71d1C9576A6D186760A70f3CF";
  //     const FarmerContractABI = FarmerABI.abi;
  //     try {
  //       let provider = new ethers.BrowserProvider(window.ethereum);
  //       let signer = await provider.getSigner();
  //       const contract = new ethers.Contract(
  //         FarmerContractAddress,
  //         FarmerContractABI,
  //         signer
  //       );
  //       console.log(provider,signer,contract)
  //       dispatch(setStateDetails({provider,signer,contract}))

  //       // setState({ provider, signer, contract });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   connectWallet();
  // }, []);

  return <div>HomeComponent</div>;
};

export default HomeComponent;
