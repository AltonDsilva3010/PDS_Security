import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='w-full '>

        <Header/>
        <Outlet/>
    </div>
  )
}

export default Dashboard