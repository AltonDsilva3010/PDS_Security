import React from 'react'
import CustomFilterForm from './CustomFilterForm'
import DetailsTable from './DetailsTable'
import {dashboardDetails,detailsHeader} from "../constants"
import CustomTable from '../../Common/CustomTable'
const DashboardDetails = () => {
    const [details ,setDetails] = React.useState(dashboardDetails)
    const [detailHeader,setDetailHeader] = React.useState(detailsHeader)

    return (
    <div>
        <CustomFilterForm/>
        <div className='mt-[10px]'>
        <CustomTable
            data = {details}
            columns  = {detailHeader}
            title = "Trading Details"
        />
        </div>
    </div>
  )
}

export default DashboardDetails