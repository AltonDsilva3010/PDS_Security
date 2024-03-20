import React from "react";
import { productData } from "../../utils/dummyDetails";
import Modal from "../Common/Modal";
import AddProductForm from "./AddProductForm";
import { useSelector } from "react-redux";
import { getFarmerProductDetails } from "../../Apis/Farmer/FarmersApi";
import userSlice from "../../ReduxStore/slices/userSlice";
const ProductPage = () => {
  const [product_Data, setProductData] = React.useState([]);
  const globalState = useSelector((state) => state.globlaStateSlice);
  const user = useSelector((state) => state.userSlice);

  React.useEffect(() => {
    const res = getFarmerProductDetails(globalState);
    res.then((data) => {
      setProductData(data);
      console.log(data);
    });
  }, []);
  const products = product_Data?.map((p, index) => (
    <div
      className="flex flex-col p-[10px] bg-white rounded-md shadow-md"
      key={index}
    >
      <div>
        <img src={p.image} alt={p.name} className="w-[200px] object-fit" />
      </div>
      <div className="flex mt-[4px] flex-col gap-[2px]">
        <div className="flex">
          <span>Name : &nbsp; </span>
          <h4 className="font-semibold"> {p.name}</h4>
        </div>
        <div className="flex">
          <span>Quantity : &nbsp; </span>
          <span>
            {p.quantity.toString()} {p.unit}
          </span>
        </div>
        <div className="flex">
          <span>District : &nbsp; </span>
          <span>{p.district}</span>
        </div>
        <div className="flex">
          <span>State : &nbsp; </span>
          <span>{p.state}</span>
        </div>
        <div className="flex">
          <span>Sold Status : &nbsp; </span>
          {p.sold ? <span>Sold</span> : <span>Not sold</span>}
        </div>
      </div>
    </div>
  ));

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  // Fetch products Data

  return (
    <div>
      <div className="flex justify-end w-full">
        <button
          className="bg-green-400 text-white px-[12px] py-[8px] rounded-lg"
          onClick={handleOpen}
        >
          Add product
        </button>
      </div>
      <div>
        {products ? (
          <div className="flex flex-wrap gap-[20px]">{products}</div>
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
