import { SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { SettingsService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const SampleDevDetail = () => {

    const navigate = useNavigate()
    const service = new SettingsService()
    const [data,setData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;
    console.log(stateData,'--------------------')

    

    const onUpdate = () => {
        navigate('/sample-development/sample-development-form',{state:{id:data[0]?.settingsId}})
    }

    return(
        <Card title='Request No' size='small'   extra={<Button onClick={onUpdate} type={'primary'}>Change</Button>}>
             <Descriptions size='small'>
                <DescriptionsItem label='Location'>{data[0]?.accountControlName}</DescriptionsItem>
                <DescriptionsItem label='PCH'>{data[0]?.profitControlHead}</DescriptionsItem>
                <DescriptionsItem label='User'>{data[0]?.companyName}</DescriptionsItem>
                <DescriptionsItem label='Buyer'>{data[0]?.name}</DescriptionsItem>
                <DescriptionsItem label='Sample Type'>{data[0]?.divisionName}</DescriptionsItem>
                <DescriptionsItem label='Sample Sub Type'>{data[0]?.warehouseName}</DescriptionsItem>
                <DescriptionsItem label='Style'>{}</DescriptionsItem>
            {/* </Descriptions> */}
            {/* <Descriptions title='TEAM DETAILS' size='small'> */}
                <DescriptionsItem label='Description'>{data[0]?.salesPerson}</DescriptionsItem>
                <DescriptionsItem label='Brand'>{data[0]?.fabricResponsible}</DescriptionsItem>
                <DescriptionsItem label='Cost Ref'>{data[0]?.itemResponsible}</DescriptionsItem>
                <DescriptionsItem label='M3 Style No'>{data[0]?.trimRespondsible}</DescriptionsItem>
            {/* </Descriptions> */}
            {/* <Descriptions title='PRODUCT DETAILS' size='small'> */}
                <DescriptionsItem label='Contact No'>{data[0]?.currencyName}</DescriptionsItem>
                <DescriptionsItem label='Extn'>{data[0]?.liscenceType}</DescriptionsItem>
            {/* </Descriptions> */}
            {/* <Descriptions title='CUSTOMER DETAILS' size='small'> */}
                <DescriptionsItem label='SAM'>{data[0]?.address}</DescriptionsItem>
                <DescriptionsItem label='DMM'>{data[0]?.buyerName}</DescriptionsItem>
                <DescriptionsItem label='Technician'>{data[0]?.buyerGroup}</DescriptionsItem>
                <DescriptionsItem label='Product'>{data[0]?.agentName}</DescriptionsItem>
                <DescriptionsItem label='Type'>{data[0]?.packageTermsName}</DescriptionsItem>
                <DescriptionsItem label='Conversion'>{data[0]?.paymentMethod}</DescriptionsItem>
                <DescriptionsItem label='Made In'>{data[0]?.paymentTermsName}</DescriptionsItem>
                <DescriptionsItem label='Remarks'>{data[0]?.deliveryMethod}</DescriptionsItem>
                {/* <DescriptionsItem label='Delivery Terms'>{data[0]?.deliveryTermsName}</DescriptionsItem> */}
            {/* <DescriptionsItem label={<b>Discount(%)</b>}>{data[0]?.discount}</DescriptionsItem> */}
            </Descriptions>

        </Card>
    )

}

export default SampleDevDetail