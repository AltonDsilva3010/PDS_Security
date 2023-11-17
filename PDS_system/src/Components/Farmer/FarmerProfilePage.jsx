import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
const FarmerProfilePage = () => {

  const options = [
    {title : "Profile" , href : "/profile-farmer"},
    {title : "Products" , href :"/profile-farmer/Products"}
  ]
  return (
    <div className='flex h-full w-full'>
      <div className='mr-[20px] w-3/12'>
      <Sidebar
        options={options}
      />
      </div>
        <div className='w-10/12'>
      <Outlet/>
      </div>
    </div>
  )
}

export default FarmerProfilePage