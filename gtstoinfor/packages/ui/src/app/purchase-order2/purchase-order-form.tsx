import { IndentService, PurchaseOrderservice, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Row, Segmented, Select, Space, Tabs, message } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import PurchaseOrderfabricForm from "./purchase-order-fabric";
import PurchaseOrderTrim from "./purchase-order-trim";
import { GlobalVariables, PurchaseOrderDto, PurchaseOrderFbricDto, PurchaseOrderTrimDto } from "@project-management-system/shared-models";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";

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
    const [submitDisbale, setSubmitDisable]=useState<boolean>(true)
    const [styleVisible, setStyleVisible]= useState<boolean>(undefined)
    const [navigateData,setnavigateData] = useState<any>([])
    let fabricInfo:PurchaseOrderFbricDto[]=[];
    let trimInfo:PurchaseOrderTrimDto[]=[];

    const date = moment()
    const now = dayjs().add(GlobalVariables.poExpectedDeliveryDays, 'days');
    const styleService = new StyleService()
    const purchaseOrderService = new PurchaseOrderservice()
    const indentService = new IndentService()
    const location = useLocation()
    const stateData :any=location.state




    useEffect(() =>{
        getStyle()
        getIndnetNo()
        getAllvendors()
        poForm.setFieldsValue({purchaseOrderDate:dayjs()})
        poForm.setFieldsValue({expectedDeliveryDate:now})
    },[])

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }

    useEffect(() =>{
        if(stateData != undefined ){
            if(stateData.type == 'Indent'){
                poForm.setFieldsValue({indentId:stateData.data.indentId})
                setIndentId(stateData)
                poForm.setFieldsValue({indentAgainst:'Indent'})
                setStyleVisible(false)
                setIndentId(stateData.data.indentId)
                if(stateData.data.materialType == "Fabric"){
                    poForm.setFieldsValue({poMaterialType:"Fabric"})
                    setPoType('Fabric')
                }
                if(stateData.data.materialType == 'Trim'){
                    setPoType('Trim')
                    poForm.setFieldsValue({poMaterialType:"Trim"})
    
                }
            }
            if(stateData.type == 'Sampling'){
                setnavigateData(stateData)
                poForm.setFieldsValue({indentAgainst:'Style'})
                setStyleVisible(true)
                poForm.setFieldsValue({styleId:stateData.data.styleId})
                if(stateData.data.fabricName == "Fabric"){
                    console.log('UUUUUUU')
                    poForm.setFieldsValue({poMaterialType:"Fabric"})
                    setPoType('Fabric')
                }
                if(stateData.data.fabricName != 'Fabric'){
                    setPoType('Trim')
                    poForm.setFieldsValue({poMaterialType:"Trim"})
                }
            }  
        }
    },[stateData])

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
        console.log(poForm.getFieldValue('styleId'))
        for(const fabData of fabricData){
            console.log(fabData)
            if(fabData.poQuantity != ""){
                const fabInfo = new PurchaseOrderFbricDto(fabData.colourId,fabData.remarks,fabData.fabricTypeId,fabData.m3FabricCode,fabData.shahiFabricCode,fabData.content,fabData.weaveId,fabData.weight,fabData.width,fabData.construction,fabData.yarnCount,fabData.finish,fabData.shrinkage,fabData.pch,fabData.moq,fabData.yarnUnit,fabData.indentFabricId,fabData.poQuantity,fabData.quantityUomId)
                fabricInfo.push(fabInfo)
            }else{
                message.error('Please Update Po Quantity')
            }
        }
        for(const trim of trimData){
            if(trim.poQuantity != ""){
                const triminfo = new PurchaseOrderTrimDto(trim.productGroupId,trim.trimId,trim.colourId,trim.m3TrimCode,trim.description,trim.consumption,trim.remarks,trim.indentTrmId,trim.poQuantity,trim.quantityUomId)
                trimInfo.push(triminfo)
                setSubmitDisable(true)
            }else{
                message.error('Please Update Po Quantity')
            }  
        }
        const poDto = new PurchaseOrderDto('po11',poForm.getFieldValue('vendorId'),poForm.getFieldValue('styleId'),poForm.getFieldValue('expectedDeliveryDate').format("YYYY-MM-DD"),poForm.getFieldValue('purchaseOrderDate').format('YYYY-MM-DD'),poForm.getFieldValue('remarks'),poForm.getFieldValue('poMaterialType'),poForm.getFieldValue('indentId'),fabricInfo,trimInfo)
        console.log(poDto)
        if(poDto.poTrimInfo.length >0 || poDto.poFabricInfo.length >0){
            purchaseOrderService.cretePurchaseOrder(poDto).then(res =>{
                console.log(poDto)
                if(res.status){
                    message.success(res.internalMessage)
                }
            })
        }
        else{
            message.error('Please Update Po Quantity')
        }
       
    }

    const indentOnchange = (value) =>{
        setIndentId(value)
    }

    const poTypeOnchange = (value) =>{
        setPoType(value)
    }
    const IndentAginstOnchange = (value) =>{
        if(value == 'Indent'){
            setStyleVisible(false)
        }if(value  == 'Style'){
            setStyleVisible(true)
        }

    }
return(
    <>
    <Card title='Purchase Order' headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <Form form={poForm} layout="vertical">
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='indentAgainst' label='Indent Against' rules={[{required:true,message:'PO Type is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select PoType' 
                       onChange={IndentAginstOnchange}
                       >
                        <Option name={'Indent'} value='Indent'>{'Indent'}</Option>
                        <Option value={'Style'}>{'Style'}</Option>
                        </Select>
                    </Form.Item>
              </Col>
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
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{display:styleVisible == true ? '':'none'}}>
                    <Form.Item name='styleId' label='Style' 
                    rules={[{required:styleVisible,
                        message:'Style is required'}]}
                    >
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style'>
                            {style.map(e => {
                                return(
                                    <Option key={e.styleId} value={e.styleId} name={e.style}> {e.style}-{e.description}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }} style={{display:styleVisible == false ? '':'none'}}>
                    <Form.Item name='indentId' label='Indent Code' rules={[{required:styleVisible == false?true:false,message:'IndentCode is required'}]}>
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
                    <Form.Item name='purchaseOrderDate' label='Purchase Order Date' rules={[{required:true,message:'purchaseOrderDate is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday/>
                    </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='expectedDeliveryDate' label='Expected Delivery Data' rules={[{required:true,message:'expectedDeliveryDate is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
            </Row>
       
        </Form>
        <Row gutter={24}>
            <Card title={poType == 'Fabric'?<span style={{color:'blue', fontSize:'17px'}}>Fabric Details</span>:poType =='Trim'?<span style={{color:'blue', fontSize:'17px'}}>Trim Details</span>:''}>
                {poType == 'Fabric' ?
                <Card style={{width:'150%'}}><PurchaseOrderfabricForm key='fabric' props={handleFabricOnchange} indentId={poType == 'Fabric' ?indentId:undefined} data={navigateData}/></Card>
           :poType == 'Trim' ?
           <Card style={{width:'130%'}}> <PurchaseOrderTrim key='trim' props={handleTrim}  indentId={indentId} data={navigateData}/></Card>
            :<></>
            }
            </Card>
            </Row>
            <Row justify={'end'}>
            <Col span={24} style={{ textAlign: "right", marginTop:'10px'}} >
              <Button type="primary" onClick={onFinish} >Submit</Button>
              <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
          </Col>
           
          </Row>
    </Card>
    </>
)

}
export default PurchaseOrderForm