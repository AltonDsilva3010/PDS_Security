import React from "react";
import close from "../../assets/x-lg.svg";
const Modal = ({ handleClose, children }) => {
  return (
    <div className="absolute w-full shadow-md top-[20px]">
      {/* <div className='relative'> */}
      <span className="absolute top-[20px] right-[20px]" onClick={handleClose}>
        <img src={close} alt="close" />
      </span>
      {/* </div>/ */}
      {children}
    </div>
  );
};

export default Modal;
