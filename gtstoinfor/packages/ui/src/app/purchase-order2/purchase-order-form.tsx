import { StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Row, Segmented, Select, Space, Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import PurchaseOrderfabricForm from "./purchase-order-fabric";
import PurchaseOrderTrim from "./purchase-order-trim";

export const PurchaseOrderForm =()=>{
    const{Option} =Select
    const [poForm] = Form.useForm()
    const [style,setStyle] = useState<any[]>([])
    const [tabName,setTabName] = useState<string>('Fabric')

    const styleService = new StyleService()

    const onSegmentChange = (val) => {
        console.log(val)
        setTabName(val)
    }

    useEffect(() =>{
        getStyle()
    },[])

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }
    
return(
    <>
    <Card title='Purchase Order' className="card-header">
        <Form form={poForm} layout="vertical">
            <Row gutter={8}>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='styleId' label='Style' rules={[{required:true,message:'Style is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style'>
                            {style.map(e => {
                                return(
                                    <Option key={e.styleId} value={e.styleId} name={e.style}> {e.style}-{e.description}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'Style is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor'>
                            {style.map(e => {
                                return(
                                    <Option key={e.styleId} value={e.styleId} name={e.style}> {e.style}-{e.description}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='purchaseOrderDate' label='Purchase Order Date' rules={[{required:true,message:'Style is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='expectedDeliveryDate' label='Expected Delivery Data' rules={[{required:true,message:'Style is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
            </Row>
          
        </Form>
        <Row gutter={8}>
            <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
            <Segmented onChange={onSegmentChange} style={{backgroundColor:'#68cc6b'}}
                      options={[
                        {
                          label: (
                            <>
                              <b style={{ fontSize: "12px" }}>Fabric Details</b>
                            </>
                          ),
                          value: "Fabric",
                        },
                        {
                          label: (
                            <>
                              <b style={{ fontSize: "12px" }}>Trim Details</b>
                            </>
                          ),
                          value: "Trim",
                        },
                    ]}  
                    />
                    {tabName == 'Fabric' ?
                     <>
                     <PurchaseOrderfabricForm />
                    </>:tabName == 'Trim'? <PurchaseOrderTrim />:<></>}
                    
            </Space>
            </Row>

    </Card>
    </>
)

}
export default PurchaseOrderForm