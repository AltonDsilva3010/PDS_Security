import React from "react";
import { dummyData, Headers } from "./dummyData";
import CustomTable from "../../Common/CustomTable";
import { useNavigate } from "react-router-dom";

const VerifyApmcOfficer = () => {
  const navigate = useNavigate();
  const [Data, setData] = React.useState(dummyData);
  const [col, setCol] = React.useState(Headers);
  const [openModal, setOpenModal] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");

  const handleClick = (id) => {
    console.log(id);
    setActiveId(id);
    navigate(`/dashboard/fci/verify-apmc-officer/${id}`);
    setOpenModal((prev) => !prev);
  };
  return (
    <div>
      <CustomTable
        data={Data}
        columns={col}
        title="Officer Verification"
        handleClick={handleClick}
      />
    </div>
  );
};

export default VerifyApmcOfficer;
