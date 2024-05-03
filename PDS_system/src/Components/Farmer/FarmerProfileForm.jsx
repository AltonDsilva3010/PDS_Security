import React, { useEffect } from "react";
import DummyImage from "../../assets/Image/dummyImage.png";
import DummyUser from "../../assets/Image/DummyUser.png";
import { getUser } from "../../Apis/Farmer/FarmersApi";
import { useSelector } from "react-redux";
const FarmerProfileForm = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);

  const [farmerDetails, setFarmerDetails] = React.useState({
    name: "",
    location: "",
    contactNumber: "",
    walletAddress: "",
    aadharCardNumber: "",
    aadharCardImage: "",
    userPhoto: "",
    role: "",
    verified: false,
  });

  const [editBtn, setEditBtns] = React.useState({
    name: true,
    location: true,
    contactNumber: true,
    walletAddress: true,
    aadharCardNumber: true,
    aadharCardImage: true,
    userPhoto: true,
  });

  const [previewAadhar, setPreviewAadhar] = React.useState();
  const [previewUserPhoto, setPreviewUserPhoto] = React.useState();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(name, value);
    if (name === "userPhoto" || name === "aadharCardImage") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result);

        if (name === "userPhoto") {
          setPreviewUserPhoto(reader.result);
        } else if (name === "aadharCardImage") {
          setPreviewAadhar(reader.result);
        }
        setFarmerDetails((prev) => ({
          ...prev,
          [name]: file,
        }));
      };
    } else {
      setFarmerDetails({
        ...farmerDetails,
        [name]: value,
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    console.log("Name ", name);

    setEditBtns({
      ...editBtn,
      [name]: !editBtn[name],
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getUser(globalState).then((result) => {
      setFarmerDetails({
        name: result.name,
        location: JSON.parse(result.location),
        contactNumber: result.phone,
        aadharCardNumber: result.aadharNumber,
        aadharCardImage: result.aadharImage,
        verified: result.verified,
        role: result.role,
      });
    });
  }, []);
  // Fetch Farmer Data first
  return (
    <div className="bg-white shadow-md rounded p-[15px]">
      <form className="flex flex-col">
        <div className="flex justify-around">
          <div className="flex  relative  flex-col items-center w-full">
            <img
              className="w-[100px] h-[100px] object-contain"
              src={
                previewUserPhoto
                  ? previewUserPhoto
                  : farmerDetails.userPhoto || DummyUser
              }
              alt="user"
            />

            <button className="bg-blue-500 overflow-hidden relative px-[12px] py-[5px] rounded-lg mt-[10px] text-white">
              Upload
              <input
                type="file"
                name="userPhoto"
                onChange={handleChange}
                className="opacity-[0]  absolute bottom-[-17px] right-[-100px]"
              />
            </button>
          </div>
          <div className="flex relative flex-col items-center w-full">
            <img
              className="w-[110px] h-[100px] object-contain"
              src={
                previewAadhar
                  ? previewAadhar
                  : farmerDetails.aadharCardImage || DummyImage
              }
              alt="aadhar card image"
            />

            <button className="bg-blue-500 overflow-hidden relative px-[12px] py-[5px] rounded-lg mt-[10px] text-white">
              Upload
              <input
                type="file"
                name="aadharCardImage"
                onChange={handleChange}
                className="opacity-[0]  absolute bottom-[-17px] right-[-100px]"
              />
            </button>
          </div>
        </div>
        <div className="flex justify-between  items-center mt-[20px]">
          <label htmlFor="verified" className="font-bold">
            Verification Status
          </label>
          <label htmlFor="verified" className="font-bold mr-[10px]">
            {farmerDetails ? (
              farmerDetails.verified ? (
                <span className="text-green-500">True</span>
              ) : (
                <span className="text-red-500">False</span>
              )
            ) : (
              <span className="text-red-500">False</span>
            )}
          </label>
        </div>
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              name="name"
              value={farmerDetails.name}
              onChange={handleChange}
              type="text"
              className={`w-[80%] rounded-lg bg-white  border-2 border-black ${
                editBtn.name && "opacity-[0.89] cursor-not-allowed "
              }`}
              disabled={editBtn.name}
              placeholder="Enter Your Name"
            />
          </div>
          <button
            name="name"
            className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-[80%]">
            <label htmlFor="name" className="font-semibold">
              Role
            </label>
            <div className="w-[90%] rounded-lg bg-white border-2 border-black p-2">
              {farmerDetails.role}
            </div>
          </div>
        </div>

        {/* location */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
            <label htmlFor="location" className="font-semibold">
              Location
            </label>
            <div
              className={`w-[80%] rounded-lg bg-white border-2 border-black ${
                editBtn.location && "opacity-[0.89] cursor-not-allowed p-[5px]"
              }`}
            >
              <div>
                {farmerDetails.location.state},{" "}
                {farmerDetails.location.district},{" "}
                {farmerDetails.location.pincode}
              </div>
            </div>
            {/* <input
              name="location"
              value={farmerDetails.location}
              onChange={handleChange}
              type="text"
              className={`w-[80%] rounded-lg bg-white border-2 border-black ${
                editBtn.location && "opacity-[0.89] cursor-not-allowed "
              }`}
              disabled={editBtn.location}
              placeholder="Enter Your location"
            /> */}
          </div>
          <button
            name="location"
            className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
        {/* location */}

        {/* Contact Number */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
            <label htmlFor="contactNumber" className="font-semibold">
              Contact Number
            </label>
            <input
              name="contactNumber"
              value={farmerDetails.contactNumber}
              onChange={handleChange}
              type="text"
              className={`w-[80%] rounded-lg bg-white border-2 border-black ${
                editBtn.contactNumber && "opacity-[0.89] cursor-not-allowed "
              }`}
              disabled={editBtn.contactNumber}
              placeholder="Enter Your contactNumber"
            />
          </div>
          <button
            name="contactNumber"
            className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
        {/* Contact Number */}

        {/* Aadhar Card number */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
            <label htmlFor="aadharCardNumber" className="font-semibold">
              Aadhar Card Number
            </label>
            <input
              name="aadharCardNumber"
              value={farmerDetails.aadharCardNumber}
              onChange={handleChange}
              type="text"
              className={`w-[80%] rounded-lg bg-white border-2 border-black ${
                editBtn.aadharCardNumber && "opacity-[0.89] cursor-not-allowed "
              }`}
              disabled={editBtn.aadharCardNumber}
              placeholder="Enter Your contactNumber"
            />
          </div>
          <button
            name="aadharCardNumber"
            className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
        {/* Aadhar Card number */}

        <button
          className="bg-slate-100 text-black rounded-md px-[12px] py-[5px] mt-[15px]"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerProfileForm;
