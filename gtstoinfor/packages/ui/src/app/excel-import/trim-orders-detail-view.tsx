import { OrdersService } from '@project-management-system/shared-services'
import { Card, Descriptions } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TrimDetailView = () => {

    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])
    const service = new OrdersService

    useEffect(()=>{
    //   getSource()
    },[])

//   const getSource=()=>{
//     service.getSourceIssueByID().then((res)=>{
//       setData(res)
//       console.log(res)
//     })
//   }

  return(
      <Card className="card-header">
        <Descriptions size='small'>
            <DescriptionsItem label='RequestNo'>{data[0]?.requestNo}</DescriptionsItem>
            <DescriptionsItem label='Location'>{data[0]?.location}</DescriptionsItem>
            <DescriptionsItem label='Consumption Code'>{data[0]?.consumptionCode}</DescriptionsItem>
            <DescriptionsItem label='Issued Date'>{data[0]?.issuingdate}</DescriptionsItem>
            <DescriptionsItem label='Sample Indent Date'>{data[0]?.sampleIndentDate}</DescriptionsItem>
            <DescriptionsItem label='Po Number'>{data[0]?.poNumber}</DescriptionsItem>
            <DescriptionsItem label='PCH'>{data[0]?.pch}</DescriptionsItem>
            <DescriptionsItem label='User'>{data[0]?.user}</DescriptionsItem>
            <DescriptionsItem label='Buyer'>{data[0]?.buyer}</DescriptionsItem>
            <DescriptionsItem label='Sample Type'>{data[0]?.sampleType}</DescriptionsItem>
            <DescriptionsItem label='Sample Sub Type'>{data[0]?.sampleSubType}</DescriptionsItem>
            <DescriptionsItem label='Style'>{data[0]?.style}</DescriptionsItem>
            <DescriptionsItem label='Description'>{data[0]?.description}</DescriptionsItem>
            <DescriptionsItem label='Brand'>{data[0]?.brand}</DescriptionsItem>
            <DescriptionsItem label='Cost Ref'>{data[0]?.costRef}</DescriptionsItem>
            <DescriptionsItem label='M3 Style No'>{data[0]?.m3StyleNo}</DescriptionsItem>
            <DescriptionsItem label='Contact No'>{data[0]?.contactNo}</DescriptionsItem>
            <DescriptionsItem label='Extn'>{data[0]?.extn}</DescriptionsItem>
            <DescriptionsItem label='SAM'>{data[0]?.sam}</DescriptionsItem>
            <DescriptionsItem label='DMM'>{data[0]?.dmm}</DescriptionsItem>
            <DescriptionsItem label='Technician'>{data[0]?.technician}</DescriptionsItem>
            <DescriptionsItem label='Product'>{data[0]?.agentName}</DescriptionsItem>
            <DescriptionsItem label='Type'>{data[0]?.productType}</DescriptionsItem>
            <DescriptionsItem label='Conversion'>{data[0]?.Conversion}</DescriptionsItem>
            <DescriptionsItem label='Made In'>{data[0]?.madeIn}</DescriptionsItem>
            <DescriptionsItem label='Remarks'>{data[0]?.remarks}</DescriptionsItem>
        </Descriptions>
      </Card>

      
        
    )
}

export default TrimDetailView