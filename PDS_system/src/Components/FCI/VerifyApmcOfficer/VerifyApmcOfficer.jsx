import React from "react";
import { useSelector, useDispatch } from "react-redux";

const VerifyApmcOfficer = () => {
  let address = "0xdf5d431c9cDA49aA21c3F92ac5db5f153520a740";
  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);

  const handleVerification = async (address) => {
    try {
      const { contract } = globalState;
      console.log("CONTRACT DETAILS", contract);
      const result = await contract.grantRoleToFarmer(
        "0xdf5d431c9cDA49aA21c3F92ac5db5f153520a740"
      );
      console.log("RESULT ", result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={() => handleVerification(address)}>Confirm</button>
    </div>
  );
};

export default VerifyApmcOfficer;
