import React from "react";
import DummyImage from "../../assets/Image/dummyImage.png";
import DummyUser from "../../assets/Image/DummyUser.png";
const FarmerProfileForm = () => {
  const [farmerDetails, setFarmerDetails] = React.useState({
    name: "",
    location: "",
    contactNumber: "",
    walletAddress: "",
    aadharCardNumber: "",
    aadharCardImage: "",
    userPhoto: "",
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
    e.preventDefault()
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

  const handleEdit = (e)=>{
    e.preventDefault()
    const {name} = e.target
    console.log("Name " , name)

    setEditBtns({
      ...editBtn,
      [name] : !editBtn[name]
    })
  }
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
           
            <button className="bg-blue-500 overflow-hidden relative px-[12px] py-[5px] rounded-lg mt-[10px] text-white">Upload
            <input
                  type="file"
                  name="userPhoto"
                  onChange={handleChange}
                  className="opacity-[0]  absolute bottom-[-17px] right-[-100px]"
                /></button>
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
           
            <button 
            className="bg-blue-500 overflow-hidden relative px-[12px] py-[5px] rounded-lg mt-[10px] text-white">Upload
            <input
                  type="file"
                  name="aadharCardImage"
                  onChange={handleChange}
                  className="opacity-[0]  absolute bottom-[-17px] right-[-100px]"
                />
            </button>
          </div>
        </div>
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold">Name</label>
          <input
            name="name"
            value={farmerDetails.name}
            onChange={handleChange}
            type="text"
            className={`w-[80%] rounded-lg bg-white  border-2 border-black ${editBtn.name && "opacity-[0.89] cursor-not-allowed "  }`}
            disabled={editBtn.name}
            placeholder="Enter Your Name"
          />
          </div>
          <button name = "name" className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >Edit</button>
        </div>

        {/* location */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
          <label htmlFor="location" className="font-semibold">Location</label>
          <input
            name="location"
            value={farmerDetails.location}
            onChange={handleChange}
            type="text"
            className={`w-[80%] rounded-lg bg-white border-2 border-black ${editBtn.location && "opacity-[0.89] cursor-not-allowed "  }`}
            disabled={editBtn.location}
            placeholder="Enter Your location"
          />
          </div>
          <button name = "location" className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >Edit</button>
        </div>
        {/* location */}

        {/* Contact Number */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
          <label htmlFor="contactNumber" className="font-semibold">Contact Number</label>
          <input
            name="contactNumber"
            value={farmerDetails.contactNumber}
            onChange={handleChange}
            type="text"
            className={`w-[80%] rounded-lg bg-white border-2 border-black ${editBtn.contactNumber && "opacity-[0.89] cursor-not-allowed "  }`}
            disabled={editBtn.contactNumber}
            placeholder="Enter Your contactNumber"
          />
          </div>
          <button name = "contactNumber" className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >Edit</button>
        </div>
        {/* Contact Number */}

        {/* Aadhar Card number */}
        <div className="flex justify-between  items-center mt-[12px]">
          <div className="flex flex-col w-full">
          <label htmlFor="aadharCardNumber" className="font-semibold">Aadhar Card Number</label>
          <input
            name="aadharCardNumber"
            value={farmerDetails.aadharCardNumber}
            onChange={handleChange}
            type="text"
            className={`w-[80%] rounded-lg bg-white border-2 border-black ${editBtn.aadharCardNumber && "opacity-[0.89] cursor-not-allowed "  }`}
            disabled={editBtn.aadharCardNumber}
            placeholder="Enter Your contactNumber"
          />
          </div>
          <button name = "aadharCardNumber" className="bg-slate-100 text-black rounded-md px-[12px] py-[5px]"
            onClick={handleEdit}
          >Edit</button>
        </div>
        {/* Aadhar Card number */}
      </form>
    </div>
  );
};

export default FarmerProfileForm;
