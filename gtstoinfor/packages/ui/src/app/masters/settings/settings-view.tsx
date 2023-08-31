import { SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { SettingsService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const SettingsView = () => {

    const navigate = useNavigate()
    const service = new SettingsService()
    const [data,setData] = useState<any[]>([])


    useEffect(() => {
        getAllInfo()

    },[])

    const getAllInfo = () => {
        const req = new SettingsIdReq()
        service.getAllSettingsInfo(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }
    

    const onUpdate = () => {
        navigate('/settings/settings/settings-form',{state:{id:data[0]?.settingsId}})
    }

    return(
        <Card title='Settings' size='small'   extra={<Button onClick={onUpdate} type={'primary'}>Change</Button>}>
             <Descriptions title='COMPANY DETAILS' size='small'>
                <DescriptionsItem label='Account Control Head'>{data[0]?.accountControlName}</DescriptionsItem>
                <DescriptionsItem label='PCH'>{data[0]?.pch}</DescriptionsItem>
                <DescriptionsItem label='Company'>{data[0]?.companyName}</DescriptionsItem>
                <DescriptionsItem label='Facility'>{data[0]?.name}</DescriptionsItem>
                <DescriptionsItem label='Division'>{data[0]?.divisionName}</DescriptionsItem>
                <DescriptionsItem label='Warehouse'>{data[0]?.warehouseName}</DescriptionsItem>
                <DescriptionsItem label='CO Type'>{}</DescriptionsItem>
            </Descriptions>
            <Descriptions title='TEAM DETAILS' size='small'>
                <DescriptionsItem label='Sales Person'>{data[0]?.salesPerson}</DescriptionsItem>
                <DescriptionsItem label='Fabric Responsible'>{data[0]?.fabricResponsible}</DescriptionsItem>
                <DescriptionsItem label='Item Responsible'>{data[0]?.itemResponsible}</DescriptionsItem>
                <DescriptionsItem label='Trim Responsible'>{data[0]?.trimRespondsible}</DescriptionsItem>
            </Descriptions>
            <Descriptions title='PRODUCT DETAILS' size='small'>
                <DescriptionsItem label='Currency'>{data[0]?.currencyName}</DescriptionsItem>
                <DescriptionsItem label='Licence Type'>{data[0]?.liscenceType}</DescriptionsItem>
            </Descriptions>
            <Descriptions title='CUSTOMER DETAILS' size='small'>
                <DescriptionsItem label='Buyer Address'>{data[0]?.address}</DescriptionsItem>
                <DescriptionsItem label='Buyer Name'>{data[0]?.buyerName}</DescriptionsItem>
                <DescriptionsItem label='Buyer Group'>{data[0]?.buyerGroup}</DescriptionsItem>
                <DescriptionsItem label='Agent'>{data[0]?.agentName}</DescriptionsItem>
                <DescriptionsItem label='Package Terms'>{data[0]?.packageTermsName}</DescriptionsItem>
                <DescriptionsItem label='Payment Method'>{data[0]?.paymentMethod}</DescriptionsItem>
                <DescriptionsItem label='Payment Terms'>{data[0]?.paymentTermsName}</DescriptionsItem>
                <DescriptionsItem label='Delivery Method'>{data[0]?.deliveryMethod}</DescriptionsItem>
                <DescriptionsItem label='Delivery Terms'>{data[0]?.deliveryTermsName}</DescriptionsItem>
            <DescriptionsItem label={<b>Discount(%)</b>}>{data[0]?.discount}</DescriptionsItem>
            </Descriptions>

        </Card>
    )

}

export default SettingsView