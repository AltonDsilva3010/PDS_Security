import React, { useState, useEffect } from "react";
import abi from "../../assets/Product.json";
import { ethers } from "ethers";

const HomeComponent = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
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
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  return <div>HomeComponent</div>;
};

export default HomeComponent;
