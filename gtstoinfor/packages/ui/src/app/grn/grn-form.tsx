import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Tabs } from 'antd'
import style from 'antd/es/alert/style'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import PurchaseOrderfabricForm from '../purchase-order2/purchase-order-fabric'
import PurchaseOrderTrim from '../purchase-order2/purchase-order-trim'
import { BuyersService, PurchaseOrderservice } from '@project-management-system/shared-services'
import TextArea from 'antd/es/input/TextArea'
import GRNFabricForm from './grn-fabric'
import GRNTrimForm from './grn-trim'
import { VendorIdReq } from '@project-management-system/shared-models'

const GRNForm = () => {

    const{Option} = Select
    const [form] = Form.useForm()
    const [tabName,setTabName] = useState<string>('Fabric')
    const [fabricData, setFabricData]=useState<any[]>([])
    const [trimData, setTrimData]=useState<any[]>([])
    const vendorService = new BuyersService()
    const [vendor, setVendor] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const poService = new PurchaseOrderservice()

    useEffect(()=>{
        getVendorsData()
    },[])

    const getVendorsData = () =>{
        poService.getAllVendors().then((res)=>{
            if(res.status){
                setVendor(res.data)
            }
        })
    }

    const getPoData =(value)=>{
        const req = new VendorIdReq(value)
        poService.getAllPONumbers(req).then((res)=>{
            if(res.status){
                setPoData(res.data)
            }
        })
    }


    const handleFabricOnchange = (fabricdata) =>{
        console.log(fabricdata)
        setFabricData(fabricdata)
    }
    const handleTrim = (trimData) =>{
        console.log(trimData)
        setTrimData(trimData)
    }
    const onReset = () =>{
        form.resetFields()
    }



    return(
        <>
        <Card title='GRN' className="card-header">
            <Form form={form} layout="vertical">
                <Row gutter={8}>
                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name={'grnId'} hidden><Input></Input></Form.Item>
                        <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'Vendor is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onSelect={getPoData}>
                                {vendor.map(e => {
                                    return(
                                        <Option key={e.id} value={e.id}> {e.vendorCode}-{e.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='purchaseOrderId' label='PO Number' rules={[{required:true,message:'PO Number is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor'>
                                {poData.map(e => {
                                    return(
                                        <Option key={e.purchaseOrderId} value={e.purchaseOrderId}> {e.poNumber}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='grnDate' label='GRN Date' rules={[{required:true,message:'Date is required'}]}>
                        <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='contactPerson' label='Contact Person' rules={[{required:true,message:'Date is required'}]}>
                        <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Contact Person'/>
                        </Form.Item>
                  </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='remarks' label='Remarks' rules={[{required:true,message:'PO Number is required'}]}>
                            <TextArea rows={1} placeholder='Enter Remarks'/>
                        </Form.Item>
                  </Col>
                </Row>
           
            </Form>
            <Row gutter={24}>
                
                {/* <Card>
                  <Tabs type={'card'} tabPosition={'top'}>
                    <TabPane key="1" tab={<span><b>{`Fabric`}</b></span>}>
                    <GRNFabricForm key='fabric' props={handleFabricOnchange} />
                    </TabPane>
                    <TabPane key="2" tab={<span><b>{`Trim`}</b></span>}>
                    <GRNTrimForm key='trim' props={handleTrim} />
                    </TabPane>
                </Tabs>
                </Card> */}
                </Row>
                <Row justify={'end'}>
                <Col span={24} style={{ textAlign: "right", marginTop:'10px'}} >
                  <Button type="primary">Submit</Button>
                  <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
              </Col>
               
              </Row>
        </Card>
        </>
    )

}

export default GRNForm