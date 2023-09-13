import { Button, Card, Descriptions, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DescriptionsItem from "antd/es/descriptions/Item"
import TabPane from "antd/es/tabs/TabPane"
import SourceFabrics from "./source-fabrics"
import SourceTrims from "./source-trims"

export const SourceIssuesDetailView=()=>{

    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])


    useEffect(()=>{

    },[])

 
    return(
      <Card title="Request No" size="small" >
      <Descriptions size='small'>
         <DescriptionsItem label='Location'>{data[0]?.accountControlName}</DescriptionsItem>
         <DescriptionsItem label='PCH'>{data[0]?.profitControlHead}</DescriptionsItem>
         <DescriptionsItem label='Buyer'>{data[0]?.name}</DescriptionsItem>
         <DescriptionsItem label='Sample Type'>{data[0]?.divisionName}</DescriptionsItem>
         <DescriptionsItem label='Sample Sub Type'>{data[0]?.warehouseName}</DescriptionsItem>
         <DescriptionsItem label='Style'>{}</DescriptionsItem>
         <DescriptionsItem label='Description'>{data[0]?.salesPerson}</DescriptionsItem>
         <DescriptionsItem label='Brand'>{data[0]?.fabricResponsible}</DescriptionsItem>
         <DescriptionsItem label='Cost Ref'>{data[0]?.itemResponsible}</DescriptionsItem>
         <DescriptionsItem label='M3 Style No'>{data[0]?.trimRespondsible}</DescriptionsItem>
         <DescriptionsItem label='Contact No'>{data[0]?.currencyName}</DescriptionsItem>
         <DescriptionsItem label='Extn'>{data[0]?.liscenceType}</DescriptionsItem>
         <DescriptionsItem label='SAM'>{data[0]?.address}</DescriptionsItem>
         <DescriptionsItem label='DMM'>{data[0]?.buyerName}</DescriptionsItem>
         <DescriptionsItem label='Technician'>{data[0]?.buyerGroup}</DescriptionsItem>
         <DescriptionsItem label='Product'>{data[0]?.agentName}</DescriptionsItem>
         <DescriptionsItem label='Type'>{data[0]?.packageTermsName}</DescriptionsItem>
         <DescriptionsItem label='Conversion'>{data[0]?.paymentMethod}</DescriptionsItem>
         <DescriptionsItem label='Made In'>{data[0]?.paymentTermsName}</DescriptionsItem>
         <DescriptionsItem label='Remarks'>{data[0]?.deliveryMethod}</DescriptionsItem>
      </Descriptions>
      <Card size='small'>
        <Tabs type={'card'} tabPosition={'top'}>
        <TabPane key="1" tab={<span><b>{`Fabric`}</b></span>}>
            <SourceFabrics />
        </TabPane>
        <TabPane key="3" tab={<span><b>{`Trims`}</b></span>}>
            <SourceTrims/>
        </TabPane>
        </Tabs>
        </Card>
      </Card>

      
        
    )
    

}
export default SourceIssuesDetailView