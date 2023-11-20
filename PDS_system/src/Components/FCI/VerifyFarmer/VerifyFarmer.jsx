import React from 'react'
import { dummyData ,Headers} from './dummydata'
import CustomTable from '../../Common/CustomTable'
const VerifyFarmer = () => {

  const [Data , setDummyData] = React.useState(dummyData)
  const [col , setCol] = React.useState(Headers)
  return (
    <div>
      <div>Filter Here</div>
      <CustomTable
        data = {Data}
        columns  = {col}
        title = "Farmer Verification"
      />
    </div>
  )
}

export default VerifyFarmer