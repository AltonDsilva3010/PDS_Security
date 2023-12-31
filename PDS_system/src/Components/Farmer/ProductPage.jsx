import React from 'react'
import { productData } from '../../utils/dummyDetails'
import Modal from "../Common/Modal"
import AddProductForm from './AddProductForm'

const ProductPage = () => {

  const [product_Data , setProductData ] = React.useState(productData)

  const products = product_Data.map((p,index)=>(
    <div className='flex flex-col p-[10px] bg-white rounded-md shadow-md' key={index}>
      <div>
        <img src={p.commodityImage} alt={p.commodityName} className='w-[200px] object-fit'/>
      </div>
      <div className='flex mt-[4px] flex-col gap-[2px]'>
        <div className='flex'>
<span>Name : &nbsp; </span>
        <h4 className='font-semibold'> {p.commodityName}</h4>
        </div>
        <div className='flex'>
          <span>Quantity : &nbsp; </span>
        <span>{p.Quantity}</span>
        </div>
        <div className='flex'>
          <span>District : &nbsp; </span>
        <span>{p.District}</span>
        </div>
        <div className='flex'>
          <span>State : &nbsp; </span>
        <span>{p.State}</span>
        </div>
        <div className='flex'>
          <span>Sold Status : &nbsp; </span>
        <span>{p.sold}</span>
        </div>
      </div>
    </div>
  ))

  const [open , setOpen] = React.useState(false)

  const handleOpen = ()=>{
    setOpen(prev=>!prev)
  }
  // Fetch products Data

  return (
    <div>
      <div className='flex justify-end w-full'>
        <button className='bg-green-400 text-white px-[12px] py-[8px] rounded-lg' onClick={handleOpen }>Add product</button>
      </div>
      <div>
        {
          products ? 
          <div className='flex flex-wrap gap-[20px]'>
           { products }
          </div>
          :
          <div>
            <h4>Add Your Product </h4>
          </div>
        } 
      </div>
      {
        open && 
        <div >
        <Modal
          handleClose={handleOpen}
        >
          <AddProductForm/>
        </Modal>
        </div>
      }
    </div>
  )
}

export default ProductPage