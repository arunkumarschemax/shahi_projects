import { IndentService, PurchaseOrderservice, StyleService } from "@project-management-system/shared-services";
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
    const [indenData, setIndentData] = useState<any[]>([])
    const [vendordata, setVendorData]=useState<any[]>([])
    const [indentId,setIndentId]=useState<any>([])
    const [poType, setPoType]=useState<any>('')
    let fabricInfo:PurchaseOrderFbricDto[]=[];
    let trimInfo:PurchaseOrderTrimDto[]=[];

    const styleService = new StyleService()
    const purchaseOrderService = new PurchaseOrderservice()
    const indentService = new IndentService()

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
        getIndnetNo()
        getAllvendors()
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

    const getAllvendors =() =>{
        purchaseOrderService.getAllVendors().then(res =>{
            if(res.status){
                setVendorData(res.data)
            }else{
                setVendorData([])
            }
        })
    }

    const getIndnetNo = () =>{
        indentService.getIndentnumbers().then(res =>{
            if(res.status){
                setIndentData(res.data)
            }else{
                setIndentData([])
            }
        })
    }
    const onFinish = () =>{
        console.log(fabricData)
        // console.log(trimData)
        // const req = new PurchaseOrderDto()
        for(const fabData of fabricData){
            console.log(fabData)
            const fabInfo = new PurchaseOrderFbricDto(fabData.colourId,fabData.remarks,fabData.fabricTypeId,fabData.m3FabricCode,fabData.shahiFabricCode,fabData.content,fabData.weaveId,fabData.weight,fabData.width,fabData.construction,fabData.yarnCount,fabData.finish,fabData.shrinkage,fabData.pch,fabData.moq,fabData.yarnUnit,fabData.indentFabricId,fabData.poQuantity,fabData.quantityUomId)
            fabricInfo.push(fabInfo)
        }
        for(const trim of trimData){
            console.log(trim)
            const triminfo = new PurchaseOrderTrimDto(trim.productGroupId,trim.trimId,trim.colourId,trim.m3TrimCode,trim.description,trim.consumption,trim.remarks,1)
            trimInfo.push(triminfo)
        }
        const poDto = new PurchaseOrderDto('po11',poForm.getFieldValue('vendorId'),poForm.getFieldValue('styleId'),poForm.getFieldValue('expectedDeliveryDate').format("YYYY-MM-DD"),poForm.getFieldValue('purchaseOrderDate').format('YYYY-MM-DD'),poForm.getFieldValue('remarks'),poForm.getFieldValue('poMaterialType'),poForm.getFieldValue('indentId'),fabricInfo,trimInfo)
        console.log(poDto)
        purchaseOrderService.cretePurchaseOrder(poDto).then(res =>{
            console.log(poDto)
            if(res.status){
                message.success(res.internalMessage)
            }else{
                message.error(res.internalMessage)
            }
        })
    }
    const indentOnchange = (value) =>{
        console.log(value)
        setIndentId(value)
    }
    console.log(indentId)
    const poTypeOnchange = (value) =>{
        console.log(value)
        setPoType(value)
    }
return(
    <>
    <Card title='Purchase Order' className="card-header">
        <Form form={poForm} layout="vertical">
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='poMaterialType' label='PO Type' rules={[{required:true,message:'PO Type is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select PoType' 
                       onChange={poTypeOnchange}
                       >
                        <Option name={'Fabric'} value='Fabric'>{'Fabric'}</Option>
                        <Option value={'Trim'}>{'Trim'}</Option>
                        </Select>
                    </Form.Item>
              </Col>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='indentId' label='Indent Code' rules={[{required:true,message:'IndentCode is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent' mode="multiple"
                       onChange={indentOnchange}
                       >
                            {indenData.map(e => {
                                return(
                                    <Option key={e.indentId} value={e.indentId} name={e.indentCode}> {e.indentCode}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'vendor is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor'>
                            {vendordata.map(e => {
                                return(
                                    <Option key={e.id} value={e.id} name={e.id}>{e.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='purchaseOrderDate' label='Purchase Order Date' rules={[{required:true,message:'Style is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='expectedDeliveryDate' label='Expected Delivery Data' rules={[{required:true,message:'Style is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
            </Row>
       
        </Form>
        <Row gutter={24}>
            <Card title={poType == 'Fabric'?'Fabric Details':poType =='Trim'?'Trim Details':''}>
                {poType == 'Fabric' ?
            <PurchaseOrderfabricForm key='fabric' props={handleFabricOnchange} indentId={indentId}/>:poType == 'Trim' ? <PurchaseOrderTrim key='trim' props={handleTrim} />:<></>
            }
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