import { Button, Card, Descriptions, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DescriptionsItem from "antd/es/descriptions/Item"
import TabPane from "antd/es/tabs/TabPane"
import SourceFabrics from "./source-fabrics"
import SourceTrims from "./source-trims"
import { SourceFabricsTrimsService, SourceIssuesService } from "@project-management-system/shared-services"

export const SourceIssuesDetailView=()=>{

    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])
    const service = new SourceFabricsTrimsService

    useEffect(()=>{
      getSource()
    },[])

  const getSource=()=>{
    service.getSourceIssueByID().then((res)=>{
      setData(res)
      console.log(res,'-----------')
    })
  }
    return(
      <Card title="Material Issue Details" className="card-header">
      <Descriptions size='small'>
         <DescriptionsItem label='Location'>{data[0]?.location}</DescriptionsItem>
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
      <Card size='small'>
        <Tabs type={'card'} tabPosition={'top'}>
        <TabPane key="1" tab={<span style={{fontSize:'15px'}}><b>{`Fabric`}</b></span>}>
            <SourceFabrics />
        </TabPane>
        <TabPane key="3" tab={<span style={{fontSize:'15px'}}><b>{`Trims`}</b></span>}>
            <SourceTrims/>
        </TabPane>
        </Tabs>
        </Card>
      </Card>

      
        
    )
    

}
export default SourceIssuesDetailView