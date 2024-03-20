import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFarmerProduct } from "../../Apis/Farmer/FarmersApi";
// import { Cloudinary } from "@cloudinary/url-gen";
const AddProductForm = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  const [data, setData] = React.useState({
    name: "",
    image: "",
    quantity: "",
    district: "",
    state: "",
    unit: "",
    pincode: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("NAME< VALUE", name);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);

      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
    };
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("FORM DATA");
    if (
      data.name === "" ||
      data.quantity === "" ||
      data.district === "" ||
      data.state === "" ||
      data.pincode === "" ||
      data.image === "" ||
      data.unit === ""
    ) {
      toast.error("Please Fill complete Form");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("district", data.district);
    formData.append("state", data.state);
    formData.append("pincode", data.pincode);
    formData.append(
      "image",
      "https://res.cloudinary.com/dwlgkphss/image/upload/v1700228906/PDS_System/pplrrmfw5udwtmxake4b.png"
    );
    formData.append("unit", data.unit);

    console.log("DATA", data);
    console.log("FORMDATA", formData);

    addFarmerProduct(data, globalState);
  };
  return (
    <div className="bg-white rounded-lg p-[20px] d-flex flex-col justify-center">
      <h3 className="my-[12px]  text-center font-medium">
        {" "}
        Add Your Products{" "}
      </h3>
      <form className="flex flex-col items-center w-full">
        <div className="border-solid border-2 rounded-md w-full">
          <input
            type="text"
            className="w-full"
            placeholder="Enter Commodity Name"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-[15px] w-full">
          <div className="border-solid mr-[10px] border-2 rounded-md w-[50%] ">
            <input
              type="number"
              min={1}
              name="quantity"
              value={data.quantity}
              placeholder="Enter Quantity"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="border-solid  flex items-center w-[50%] border-2 rounded-md focus:border-none visited:border-none">
            <select
              className="border-none w-[100%]  p-[8px]"
              onChange={handleChange}
              name="unit"
              value={data.unit}
            >
              <option value="">Select unit</option>
              <option value={"KG"}>KG</option>
              <option value={"Litre"}>Litre</option>
              <option value={"Quintal"}>Quintal</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between w-full mt-[10px]">
          <div className="border-solid border-2 rounded-md focus:border-none visited:border-none">
            <input
              type="text"
              value={data.state}
              onChange={handleChange}
              name="state"
              placeholder="Enter State"
            />
          </div>
          <div className="border-solid mx-[10px] border-2 rounded-md focus:border-none visited:border-none">
            <input
              type="text"
              value={data.district}
              onChange={handleChange}
              name="district"
              placeholder="Enter District"
            />
          </div>
          <div className="border-solid border-2 rounded-md focus:border-none visited:border-none">
            <input
              type="text"
              value={data.pincode}
              onChange={handleChange}
              name="pincode"
              placeholder="Enter Pincode"
            />
          </div>
        </div>
        <div className="mt-[10px] w-full">
          <button className="bg-blue-500 rounded-md w-[50%] py-[10px] relative">
            <p className="text-white">Upload Commodity image</p>
            <input
              type="file"
              name="image"
              onChange={handleImageUpload}
              className="opacity-0 absolute w-full h-full top-0 left-0"
            />
          </button>
        </div>

        <button
          className="bg-blue-500 py-[10px] w-[50%] mt-[14px] rounded-md text-white"
          onClick={handleSubmitForm}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
