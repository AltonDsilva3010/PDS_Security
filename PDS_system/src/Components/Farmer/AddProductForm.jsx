import React from 'react'

const AddProductForm = () => {

    const [data , setData] = React.useState({
        "name" : "",
        "image": "",
    
    })
  return (
    <div className='bg-white w-full'>
        <h3>Add Your Product</h3>
        <form>
            <div>
                <label htmlFor='name'>Enter Commodity Name</label>
            </div>
        </form>
    </div>
  )
}

export default AddProductForm