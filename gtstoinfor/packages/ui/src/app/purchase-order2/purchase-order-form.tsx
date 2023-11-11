import { PurchaseOrderservice, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Row, Segmented, Select, Space, Tabs, message } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import PurchaseOrderfabricForm from "./purchase-order-fabric";
import PurchaseOrderTrim from "./purchase-order-trim";
import { PurchaseOrderDto, PurchaseOrderFbricDto, PurchaseOrderTrimDto } from "@project-management-system/shared-models";

export const PurchaseOrderForm =()=>{
    const{Option} =Select
    const [poForm] = Form.useForm()
    const [style,setStyle] = useState<any[]>([])
    const [tabName,setTabName] = useState<string>('Fabric')
    const [fabricData, setFabricData]=useState<any[]>([])
    const [trimData, setTrimData]=useState<any[]>([])
    const [activeForm, setActiveForm] = useState(1);
    const [indexVal, setIndexVal] = useState(1)
    let fabricInfo:PurchaseOrderFbricDto[]=[];
    let trimInfo:PurchaseOrderTrimDto[]=[];

    const styleService = new StyleService()
    const purchaseOrderService = new PurchaseOrderservice()

    const onSegmentChange = (val) => {
        console.log(val)
        if(val == 'Fabric'){
            setIndexVal(1)
        }if(val == 'Trim'){
            setIndexVal(2)
        }
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

    const handleFabricOnchange = (fabricdata) =>{
        console.log(fabricdata)
        setFabricData(fabricdata)
    }
    const handleTrim = (trimData) =>{
        console.log(trimData)
        setTrimData(trimData)
    }
    const onReset = () =>{
        poForm.resetFields()
    }
    const onFinish = () =>{
        // console.log(fabricData)
        // console.log(trimData)
        // const req = new PurchaseOrderDto()
        for(const fabData of fabricData){
            console.log(fabData)
            const fabInfo = new PurchaseOrderFbricDto(fabData.colourId,fabData.remarks,fabData.fabricTypeId,fabData.m3FabricCode,fabData.shahiFabricCode,fabData.content,fabData.weaveId,fabData.weight,fabData.width,fabData.construction,fabData.yarnCount,fabData.finish,fabData.shrinkage,fabData.pch,fabData.moq,fabData.yarnUnit)
            fabricInfo.push(fabInfo)
        }
        console.log(fabricInfo)
        for(const trim of trimData){
            console.log(trim)
            const triminfo = new PurchaseOrderTrimDto(trim.productGroupId,trim.trimId,trim.colourId,trim.m3TrimCode,trim.description,trim.consumption,trim.remarks)
            trimInfo.push(triminfo)
        }
        const poDto = new PurchaseOrderDto('po11',1,poForm.getFieldValue('styleId'),poForm.getFieldValue('expectedDeliveryDate').format("YYYY-MM-DD"),poForm.getFieldValue('purchaseOrderDate').format('YYYY-MM-DD'),poForm.getFieldValue('remarks'),fabricInfo,trimInfo)
        purchaseOrderService.cretePurchaseOrder(poDto).then(res =>{
            console.log(poDto)
            if(res.status){
                message.success(res.internalMessage)
            }else{
                message.error(res.internalMessage)
            }
        })
    }
    
return(
    <>
    <Card title='Purchase Order' className="card-header" extra={<span>{'IndntCode'}</span>}>
        <Form form={poForm} layout="vertical">
            <Row gutter={8}>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                <Form.Item name={'indentId'} hidden><Input></Input></Form.Item>
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
        <Row gutter={24}>
            {/* <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
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
                    {tabName === 'Fabric' && <PurchaseOrderfabricForm key='fabric' props={handleFabricOnchange} />}
                  {tabName === 'Trim' && <PurchaseOrderTrim key='trim' props={handleTrim} />}
                    
            </Space> */}
            <Card>
              <Tabs type={'card'} tabPosition={'top'}>
                <TabPane key="1" tab={<span><b>{`Add Fabric`}</b></span>}>
                <PurchaseOrderfabricForm key='fabric' props={handleFabricOnchange} />
                </TabPane>
                <TabPane key="2" tab={<span><b>{`Add Trim`}</b></span>}>
                <PurchaseOrderTrim key='trim' props={handleTrim} />
                </TabPane>
            </Tabs>
            </Card>
            </Row>
            <Row justify={'end'}>
            <Col span={24} style={{ textAlign: "right", marginTop:'10px'}} >
              <Button type="primary" onClick={onFinish}>Submit</Button>
              <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
          </Col>
           
          </Row>
    </Card>
    </>
)

}
export default PurchaseOrderForm