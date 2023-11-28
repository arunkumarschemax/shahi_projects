import { BuyersService, IndentService, PurchaseOrderservice, SampleDevelopmentService, StyleService, VendorsService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Row, Segmented, Select, Space, Tabs, message } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import PurchaseOrderfabricForm from "./purchase-order-fabric";
import PurchaseOrderTrim from "./purchase-order-trim";
import { GlobalVariables, PurchaseOrderDto, PurchaseOrderFbricDto, PurchaseOrderTrimDto } from "@project-management-system/shared-models";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faB } from "@fortawesome/free-solid-svg-icons";

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
    const [sampleId,setSampleId]=useState<any>([])

    const [poType, setPoType]=useState<any>('')
    const [submitDisbale, setSubmitDisable]=useState<boolean>(true)
    const [buyer, setBuyer] = useState<any[]>([]);
    const [samplereqNo,setSamplereqNo] = useState<any[]>([])
    const [navigateData,setnavigateData] = useState<any>([])
    const [indentDropDownVisible, setIndentDropDownVisible] = useState<boolean>(false)
    const [sampleDropDownVisible, setSampleDropDownVisible] = useState<boolean>(false)

    let fabricInfo:PurchaseOrderFbricDto[]=[];
    let trimInfo:PurchaseOrderTrimDto[]=[];
    const navigate = useNavigate()

    const date = moment()
    const now = dayjs().add(GlobalVariables.poExpectedDeliveryDays, 'days');
    const styleService = new StyleService()
    const purchaseOrderService = new PurchaseOrderservice()
    const indentService = new IndentService()
    const location = useLocation()
    const stateData :any=location.state
    const vendorService = new VendorsService()
    const buyerService = new BuyersService();
    const service = new SampleDevelopmentService();




    useEffect(() =>{
        getStyle()
        getIndnetNo()
        getBuyers()
        getVendors()
        poForm.setFieldsValue({purchaseOrderDate:dayjs()})
        poForm.setFieldsValue({expectedDeliveryDate:now})
        sampleReqno()
    },[])

    const getBuyers = () => {
        buyerService.getAllActiveBuyers().then((res) => {
          if (res.status) {
            setBuyer(res.data);
          }
        });
      };

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }

    const sampleReqno = () =>{
        service.getAllSampleDevData().then((res) => {
            if (res.status) {
                console.log(res.data)
              setSamplereqNo(res.data);
            }
          });
    }
    useEffect(() =>{
        if(stateData != undefined ){
            console.log(stateData)
            console.log(stateData.type)

            console.log(stateData)
            console.log(stateData.data)
            console.log(stateData.data[0].materialType)
            console.log(stateData.data[1].indentIds)

            if(stateData.type == 'Indent'){
                poForm.setFieldsValue({indentId:stateData.data.indentId})
                // setIndentId(stateData)
                poForm.setFieldsValue({indentAgainst:'Indent'})
                // setStyleVisible(false)
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
                poForm.setFieldsValue({indentAgainst:'Sample Order'})
                setSampleDropDownVisible(true)
                poForm.setFieldsValue({requestNo:stateData.data[1].sampleReqIds})
                setSampleId(stateData.data[1].sampleReqIds)
                if(stateData.data[0].materialType == "Fabric"){
                    console.log('UUUUUUU')
                    setPoType('Fabric')
                    poForm.setFieldsValue({poMaterialType:"Fabric"})
                }
                if(stateData.data[0].materialType != 'Fabric'){
                    console.log('xxxxxx')
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

    // const getAllvendors =() =>{
    //     purchaseOrderService.getAllVendors().then(res =>{
    //         if(res.status){
    //             setVendorData(res.data)
    //         }else{
    //             setVendorData([])
    //         }
    //     })
    // }

    const getVendors = () =>{
        vendorService.getAllActiveVendors().then((res)=>{
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
        console.log(fabricData)
        for(const fabData of fabricData){
            console.log(fabData)
            if(fabData.poQuantity != ""){
                console.log('^^^^^^^^^')
                const fabInfo = new PurchaseOrderFbricDto(fabData.indentFabricId,fabData.samplereFabId,fabData.colourId,fabData.remarks,fabData.m3FabricCode,fabData.poQuantity,fabData.quantityUomId)
                fabricInfo.push(fabInfo)
            }else{
                message.error('Please Update Po Quantity')
            }
        }
        for(const trim of trimData){
            if(trim.poQuantity != ""){
                // const triminfo = new PurchaseOrderTrimDto(trim.productGroupId,trim.trimId,trim.colourId,trim.m3TrimCode,trim.description,trim.consumption,trim.remarks,trim.poAgainstId,trim.poQuantity,trim.quantityUomId)
                // trimInfo.push(triminfo)
                // setSubmitDisable(true)
            }else{
                message.error('Please Update Po Quantity')
            }  
        }
        const poDto = new PurchaseOrderDto('po11',poForm.getFieldValue('vendorId'),poForm.getFieldValue('styleId'),poForm.getFieldValue('expectedDeliveryDate').format("YYYY-MM-DD"),poForm.getFieldValue('purchaseOrderDate').format('YYYY-MM-DD'),poForm.getFieldValue('remarks'),poForm.getFieldValue('poMaterialType'),poForm.getFieldValue('indentId'),poForm.getFieldValue('buyerId'),fabricInfo,trimInfo,poForm.getFieldValue('indentAgainst'))
        console.log(poDto)
        if(poDto.poTrimInfo.length >0 || poDto.poFabricInfo.length >0){
            console.log('%%%%%%')
            purchaseOrderService.cretePurchaseOrder(poDto).then(res =>{
                console.log(poDto)
                if(res.status){
                    message.success(res.internalMessage)
                    navigate('/purchase-view')
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
    const sampleOnchange = (value) =>{
        setSampleId(value)
    }
    const poTypeOnchange = (value) =>{
        setPoType(value)
    }
    const IndentAginstOnchange = (value) =>{
        if(value == 'Indent'){
            setIndentDropDownVisible(true)
            setSampleDropDownVisible(false)
        }if(value  == 'Sample Order'){
            setIndentDropDownVisible(false)
            setSampleDropDownVisible(true)
        }
    }
return(
    <>
    <Card title='Purchase Order' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/purchase-view' > <Button className='panel_button' >View </Button></Link>}>
        <Form form={poForm} layout="vertical">
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='indentAgainst' label='PO Against' rules={[{required:true,message:'PO Type is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select PoType' 
                       onChange={IndentAginstOnchange}
                       disabled
                       >
                        <Option name={'Indent'} value='Indent'>{'Indent'}</Option>
                        <Option value={'Sample Order'}>{'Sample Order'}</Option>
                        </Select>
                    </Form.Item>
              </Col>
           
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{display:sampleDropDownVisible == true ? '':'none'}}> 
              <Form.Item name="requestNo" label="Request Number" rules={[{required:sampleDropDownVisible,message:'PO Type is required'}]}>
                <Select
                mode="multiple"
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Request Number"
                  onChange={sampleOnchange}
                >
                  {samplereqNo.map((e) => {
                    return (
                      <Option
                        key={e.sample_request_id}
                        value={e.sample_request_id}
                        name={e.requestNo}
                      >
                        {e.requestNo}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}  style={{display:indentDropDownVisible == true ? '':'none'}}>
                    <Form.Item name='indentId' label='Indent Code' 
                    rules={[{required:indentDropDownVisible,message:'IndentCode is required'}]}>
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
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='poMaterialType' label='PO Type' rules={[{required:true,message:'PO Type is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select PoType' 
                       onChange={poTypeOnchange} disabled
                       >
                        <Option name={'Fabric'} value='Fabric'>{'Fabric'}</Option>
                        <Option value={'Trim'}>{'Trim'}</Option>
                        </Select>
                    </Form.Item>
              </Col>
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{display:styleVisible == true ? '':'none'}}>
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
                    </Col> */}
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                        <Form.Item
                        name="buyerId"
                        label="Buyer"
                        rules={[{ required: true, message: "Buyer is required" }]}
                        >
                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Buyer"
                        >
                            {buyer.map((e) => {
                            return (
                                <Option key={e.buyerId} value={e.buyerId}>
                                {`${e.buyerCode} - ${e.buyerName}`}
                                </Option>
                            );
                            })}
                        </Select>
                        </Form.Item>
                    </Col> */}
           
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'vendor is required'}]}>
                       <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor'>
                            {vendordata.map(e => {
                                return(
                                    <Option key={e.vendorId} value={e.vendorId} name={e.vendorId}>{e.vendorName}</Option>
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
                    <Form.Item name='expectedDeliveryDate' label='Expected Delivery Date' rules={[{required:true,message:'expectedDeliveryDate is required'}]}>
                    <DatePicker style={{ width: '93%', marginLeft: 5 }} />
                    </Form.Item>
              </Col>
            </Row>
       
        </Form>
        <Row gutter={24}>
            {/* <Card title={poType == 'Fabric'?<span style={{color:'blue', fontSize:'17px'}} >Fabric Details</span>:poType =='Trim'?<span style={{color:'blue', fontSize:'17px'}}>Trim Details</span>:''} style={{width:'200%'}}> */}
                {poType == 'Fabric' ?
                <Card style={{width:'200%'}}><PurchaseOrderfabricForm key='fabric' props={handleFabricOnchange} indentId={poType == 'Fabric' ?indentId:undefined} data={navigateData} sampleReqId={poType == 'Fabric' ?sampleId:undefined}/></Card>
           :poType == 'Trim' ?
           <Card style={{width:'130%'}}> <PurchaseOrderTrim key='trim' props={handleTrim}  indentId={indentId} data={navigateData}/></Card>
            :<></>
            }
            {/* </Card> */}
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