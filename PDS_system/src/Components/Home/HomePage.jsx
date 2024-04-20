import React, { useState, useEffect } from "react";
import HeroImage from "../../assets/Image/pds_hero_image.jpeg";
import { connectWallet } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
const HomeComponent = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);

  // const userAddress = globalState.signer.address;
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    connectWallet(dispatch);
  };

  const [faqData, setFaqData] = useState([
    {
      question: "What is APMC?",
      answer:
        "APMC means the Agricultural Produce & Livestock Market Committee established under the provisions of APLM Act.",
      isOpen: true, // Initially set all answers to open
    },
    {
      question: "What is APMC Yard?",
      answer: "...",
      isOpen: true,
    },
    // Add more FAQ items here
  ]);

  const toggleFAQ = (index) => {
    setFaqData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className="w-full h-full">
      <div className="relative h-full w-full">
        {/* <img
          src={HeroImage}
          className="absolute top-0 left-0 backdrop-blur-sm w-full h-full object-cover"
        /> */}

        <h1 className="font-bold text-black text-[80px] text-center w-full ">
          PDS System using Blockchain
        </h1>
        <div className="text-black font-bold bg-green">
          <h3>By : </h3>
          <ol>
            <li>Alton Dsilva - (9192) </li>
            <li>Harshang Makwana - (9207) </li>
            <li>Mrudul Patil - (9220) </li>
            <li>Larry - (9426) </li>
          </ol>
          <p>Mentor : Dr. Ashok Kanthe</p>
        </div>
        <div className="w-full mt-2">
          <h1 className="font-bold text-black text-[30px] ">
            FAQ's about our PDS
          </h1>
          {faqData.map((faq, index) => (
            <div key={index} className="mb-2">
              <div className="text-left py-2 px-4 border border-gray-300 rounded focus:outline-none hover:bg-gray-100">
                <span className="font-bold">
                  <button
                    className="text-left  hover:bg-gray-100"
                    onClick={() => toggleFAQ(index)}
                  >
                    <svg
                      className={`transform ml-2 transition duration-300 ${
                        !faq.isOpen ? "rotate-180" : "" // Rotate arrow only when closed
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 9l-6 6-6-6z" fill="currentColor" />
                    </svg>
                  </button>
                  {faq.question}
                </span>
              </div>
              <p
                className={`px-4 py-2 mt-1 text-gray-600 ${
                  !faq.isOpen ? "" : "hidden" // Hide answer initially or when closed
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        {/* <button
            onClick={handleBtnClick}
            className="mt-[10px] p-[10px] bg-black text-white rounded-full"
          >
            {userAddress ? userAddress : "Connect Your Wallet"}
          </button> */}
      </div>
    </div>
  );
};

export default HomeComponent;
