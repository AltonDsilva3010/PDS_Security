import React, { useState, useEffect } from "react";
import { productData } from "../../utils/dummyDetails";
import Modal from "../Common/Modal";
import AddProductForm from "./AddProductForm";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  getAllBidsFunction,
} from "../../Apis/APMC_Officer/ApmcOfficerApi";
import CustomTable from "../Common/CustomTable";
import { useNavigate } from "react-router-dom";
import userSlice from "../../ReduxStore/slices/userSlice";
const ProductPage = () => {
  const [product_Data, setProductData] = React.useState([]);
  const [details, setDetails] = React.useState([]);
  const [changedDetails, setChangedDetails] = useState([]);
  const [detailHeader, setDetailHeader] = React.useState([
    { Header: "APMC", accessor: "6" },
    { Header: "Commodity", accessor: "1" },
    { Header: "CommodityTraded", accessor: "2" },
    { Header: "CurrentBid", accessor: "8" },
    { Header: "Unit", accessor: "3" },
    { Header: "Quality Checked", accessor: "11" },
  ]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const [allBids, setAllBids] = useState([]);
  const globalState = useSelector((state) => state.globlaStateSlice);

  React.useEffect(() => {
    getAllProducts(globalState).then((result) => {
      console.log(result);
      setDetails(result);
    });
    getAllBidsFunction(globalState).then((result) => {
      console.log(result);
      setAllBids(result);
    });
    globalState.role != "farmer" &&
      setDetailHeader([
        { Header: "APMC", accessor: "6" },
        { Header: "Commodity", accessor: "1" },
        { Header: "CommodityTraded", accessor: "2" },
        { Header: "Quality Checked", accessor: "11" },
        { Header: "CurrentBid", accessor: "8" },
        { Header: "YourBid", accessor: "13" },
      ]);
  }, []);
  useEffect(() => {
    if (globalState.role == "farmer") {
      const newDetails = details
        .filter((detail) => detail[7] === globalState.signer.address)
        .map((detail) => ({
          ...detail,
          _id: Number(detail[0]),
          0: Number(detail[0]), // This line might be unnecessary depending on your use case
          2: Number(detail[2]),
          6: Number(detail[6]),
        }));
      console.log(newDetails);
      setChangedDetails(newDetails);
    } else {
      const bids = allBids.filter(
        (bid) => bid[3] == globalState.signer.address
      );
      const newDetails = bids.map((bid) => {
        return {
          ...details[bid[0]],
          _id: Number(bid[0]),
          0: Number(details[bid[0]][0]), // This line might be unnecessary depending on your use case
          2: Number(details[bid[0]][2]),
          6: Number(details[bid[0]][6]),
          12: Number(bid[1]),
          13: bid[2],
          14: Number(bid[3]),
        };
      });
      console.log(newDetails);
      setChangedDetails(newDetails);
    }
  }, [details]);
  // console.log(product_Data);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (id) => {
    console.log(id);
    setActiveId(id);
    navigate(`/profile/Products/${id}`);
    setOpenModal((prev) => !prev);
  };
  // Fetch products Data

  return (
    <div>
      <div className="flex justify-end w-full">
        {globalState.role == "farmer" && (
          <button
            className="bg-green-400 text-white px-[12px] py-[8px] rounded-lg"
            onClick={handleOpen}
          >
            Add product
          </button>
        )}
      </div>
      <div>
        {changedDetails ? (
          <CustomTable
            data={changedDetails}
            columns={detailHeader}
            title={
              globalState.role == "farmer"
                ? "Trading Details"
                : "Bidding Details"
            }
            handleClick={handleClick}
          />
        ) : (
          <div>
            <h4>Add Your Product </h4>
          </div>
        )}
      </div>
      {open && (
        <div>
          <Modal handleClose={handleOpen}>
            <AddProductForm />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
