import React from 'react'
import close from "../../assets/x-lg.svg"

// common Modal Components

const Modal = ({handleClose , children}) => {
  return (
    <div className='absolute top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md'>
      <div className='relative'>
      <span className="absolute top-[20px] right-[20px]" onClick={handleClose}> 
            <img src={close} alt="close"/>
      </span>
      </div>
        {children}
    </div>
  )
}

export default Modal