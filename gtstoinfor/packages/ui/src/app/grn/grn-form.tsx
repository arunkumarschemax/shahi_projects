import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Tabs } from 'antd'
import style from 'antd/es/alert/style'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import PurchaseOrderfabricForm from '../purchase-order2/purchase-order-fabric'
import PurchaseOrderTrim from '../purchase-order2/purchase-order-trim'
import { BuyersService, GRNService, PurchaseOrderservice, VendorsService } from '@project-management-system/shared-services'
import TextArea from 'antd/es/input/TextArea'
import GRNFabricForm from './grn-fabric'
import GRNTrimForm from './grn-trim'
import { GrnDto, VendorIdReq } from '@project-management-system/shared-models'
import AlertMessages from '../common/common-functions/alert-messages'
import dayjs, { Dayjs } from "dayjs";


const GRNForm = () => {

    const{Option} = Select
    const [form] = Form.useForm()
    // const [tabName,setTabName] = useState<string>('Fabric')
    // const [fabricData, setFabricData]=useState<any[]>([])
    const vendorService = new VendorsService()
    const [vendor, setVendor] = useState<any[]>([])
    const [poNoData, setPoNoData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const poService = new PurchaseOrderservice()
    const [materialType, setMaterialType] = useState<string>('')
    const grnService = new GRNService()
    const [formData,setFormData] = useState<any[]>([])
    const [trimFormData, setTrimFormData]=useState<any[]>([])
    useEffect(()=>{
        getVendorsData()
        form.setFieldsValue({grnDate:dayjs()})
    },[])

    const createGrn = (value:any) => {
        console.log(poData,'-------------------------------')
        const req = new GrnDto(value.vendorId,poData[0]?.purchaseOrderId,form.getFieldValue('grnDate').format('YYYY-MM-DD'),undefined,value.remarks,undefined,undefined,'',undefined,'',0,0,poData[0]?.materialType,formData,0,'');
        console.log(req,'[][][][][][][]')
        grnService.createGrn(req).then((res) => {
            if (res.status) {
              AlertMessages.getSuccessMessage(res.internalMessage);
            } else {
              AlertMessages.getErrorMessage(res.internalMessage);
            }
          })
        //   .catch((error) => {
        //     console.error('GRN creation failed:', error);
        //     // Handle additional error handling or logging as needed.
        //     AlertMessages.getErrorMessage('Failed to create GRN. Please check console for details.');
        //   });
      };
      

    const getVendorsData = () =>{
        vendorService.getAllActiveVendors().then((res)=>{
            if(res.status){
                setVendor(res.data)
                setPoNoData([])
            }
        })
    }

    const getPoData =(value)=>{
        const req = new VendorIdReq(value)
        poService.getAllPONumbers(req).then((res)=>{
            if(res.status){
                setPoNoData(res.data)
            }
        })
    }

    const getPODataById = (val,option) =>{
      const req = new VendorIdReq(0,val,option?.name)
      poService.getPODataById(req).then((res)=>{
            if(res.status){
              setPoData(res.data)
            }
        })
    }

    const onReset = () =>{
        form.resetFields()
        setPoData([])
    }
    
    const handleSaveData = (savedData) => {
        setFormData(savedData)
    }



    return(
        <>
        <Card title='GRN' headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
            <Form form={form} layout="vertical" onFinish={createGrn}>
                <Row gutter={8}>
                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name={'grnId'} hidden><Input></Input></Form.Item>
                        <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'Vendor is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onSelect={getPoData}>
                                {vendor.map(e => {
                                    return(
                                        <Option key={e.vendorId} value={e.vendorId}>{e.vendorName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='purchaseOrderId' label='PO Number' rules={[{required:true,message:'PO Number is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onChange={getPODataById}>
                                {poNoData.map(e => {
                                    return(
                                        <Option key={e.purchaseOrderId} value={e.purchaseOrderId} name={e.materialType}> {e.poNumber}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='grnDate' label='GRN Date' rules={[{required:true,message:'Date is required'}]}>
                        <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday/>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='contactPerson' label='Contact Person' rules={[{required:true,message:'Date is required'}]}>
                        <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Contact Person'/>
                        </Form.Item>
                  </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='remarks' label='Remarks'>
                            <TextArea rows={1} placeholder='Enter Remarks'/>
                        </Form.Item>
                  </Col>
                </Row>
                    {poData[0]?.materialType === 'Fabric' ? (
                        <GRNFabricForm fabricData={poData} onSaveData={handleSaveData}/>
                    ) : []}
                    {poData[0]?.materialType === 'Trim' ? (
                        <GRNTrimForm trimData={poData} onSaveData={handleSaveData}/>
                    ) :[]}        
                <Row justify={'end'}>
                    <Col span={24} style={{ textAlign: "right", marginTop:'10px'}} >
                        <Button  type="primary" htmlType='submit'>Submit</Button>
                        <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
        </>
    )

}

export default GRNForm