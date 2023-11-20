import { SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { SettingsService } from "@project-management-system/shared-services"
import { Button, Card, Col, Descriptions, Row, Tag } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SettingsForm from "./settings-form"

export const SettingsView = () => {

    const navigate = useNavigate()
    const service = new SettingsService()
    const [data,setData] = useState<any[]>([])
    const externalRefNo = JSON.parse(localStorage.getItem("currentUser")).user.externalRefNo;
    const role = JSON.parse(localStorage.getItem("currentUser")).user.roles;


    useEffect(() => {
        getAllInfo()
    },[])

    const getAllInfo = () => {
        const req = new SettingsIdReq()
        req.externalRefNumber = externalRefNo
        service.getAllSettingsInfo(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }
    

    const onUpdate = () => {
        navigate('/settings/settings-form',{state:{id:data[0]?.settingsId}})
    }

    return(
        <>
        {
            data.length > 0 ? (<>
            <Card title='Settings' extra={<Button onClick={onUpdate} type={'primary'}>Change</Button>}>
                {/* <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}> */}
            <b style={{fontSize:'13px',color:"green"}}>COMPANY DETAILS</b>
             <Descriptions size='small'>
                <DescriptionsItem label='Account Control Head'>{data[0]?.accountControlName}</DescriptionsItem>
                <DescriptionsItem label='PCH'>{data[0]?.profitControlHead}</DescriptionsItem>
                <DescriptionsItem label='Company'>{data[0]?.companyName}</DescriptionsItem>
                <DescriptionsItem label='Facility'>{data[0]?.name}</DescriptionsItem>
                <DescriptionsItem label='Division'>{data[0]?.divisionName}</DescriptionsItem>
                <DescriptionsItem label='Warehouse'>{data[0]?.warehouseName}</DescriptionsItem>
                <DescriptionsItem label='CO Type'>{data[0]?.coType}</DescriptionsItem>
            </Descriptions>
            <br/>
            <b style={{fontSize:'13px',color:'green'}}>TEAM DETAILS</b>
            <Descriptions size='small'>
                <DescriptionsItem label='Sales Person'>{data[0]?.salesPerson}</DescriptionsItem>
                <DescriptionsItem label='Fabric Responsible'>{data[0]?.fabricResponsible}</DescriptionsItem>
                <DescriptionsItem label='Item Responsible'>{data[0]?.itemResponsible}</DescriptionsItem>
                <DescriptionsItem label='Trim Responsible'>{data[0]?.trimRespondsible}</DescriptionsItem>
            </Descriptions>
         <br/>
         <b style={{fontSize:'13px',color:'green'}}>PRODUCT DETAILS</b>
            <Descriptions size='small'>
                <DescriptionsItem label='Currency'>{data[0]?.currencyName}</DescriptionsItem>
                <DescriptionsItem label='Licence Type'>{data[0]?.liscenceType}</DescriptionsItem>
            </Descriptions>
            <br/>
            {/* </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}> */}
            <b style={{fontSize:'13px',color:'green'}}>CUSTOMER DETAILS</b>
            <Descriptions size='small'>
                <DescriptionsItem label='Buyer Address' span={3}>{data[0]?.address}</DescriptionsItem>
                <DescriptionsItem label='Buyer Name'>{data[0]?.buyerName}</DescriptionsItem>
                <DescriptionsItem label='Buyer Group'>{data[0]?.buyerGroup}</DescriptionsItem>
                <DescriptionsItem label='Agent'>{data[0]?.agentName}</DescriptionsItem>
                <DescriptionsItem label='Package Terms'>{data[0]?.packageTermsName}</DescriptionsItem>
                <DescriptionsItem label='Payment Method'>{data[0]?.paymentMethod}</DescriptionsItem>
                <DescriptionsItem label='Payment Terms'>{data[0]?.paymentTermsName}</DescriptionsItem>
                <DescriptionsItem label='Delivery Method'>{data[0]?.deliveryMethod}</DescriptionsItem>
                <DescriptionsItem label='Delivery Terms' span={2}>{data[0]?.deliveryTermsName}</DescriptionsItem>
            <DescriptionsItem label={<b>Discount(%)</b>}>{data[0]?.discount}</DescriptionsItem>
            </Descriptions>
            <br/>
            
            {/* </Col>
            </Row> */}

        </Card>
            </>) : (<>
            <SettingsForm/>
            
            
             {/* {navigate('/settings/settings-form')} */}
            
            </>)
        }
        
        </>
    )

}

export default SettingsView