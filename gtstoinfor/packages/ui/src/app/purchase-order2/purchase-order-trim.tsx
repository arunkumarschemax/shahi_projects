import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { M3MastersCategoryReq, UomCategoryEnum } from "@project-management-system/shared-models";
import { ColourService, IndentService, M3MastersService, M3TrimsService, SampleDevelopmentService, SizeService, TaxesService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { VALUE_SPLIT } from "rc-cascader/lib/utils/commonUtil";
import React, { useEffect } from "react";
import { useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";

export const PurchaseOrderTrim = ({props,indentId,data,sampleReqId,itemData}) =>{
    let tableData: any[] = []
    const [trimForm] = Form.useForm()
    const {Option} = Select
    const [update, setUpdate] = useState<boolean>(false)
    const [page, setPage] = React.useState(1);
    const [trimtableVisible,setTrimtableVisible] = useState<boolean>(false)
    const [trimTableData,setTrimTableData] = useState<any[]>([])
    const [trimM3Code,setTrimM3Code] = useState<any[]>([])
    const [trimIndexVal, setTrimIndexVal] = useState(undefined);
    const [defaultTrimFormData, setDefaultTrimFormData] = useState<any>(undefined);
    const [trimCode, setTrimCode]=useState<any[]>([])
    const [trimType, setTrimType]=useState<any[]>([])
    const [uom,setUom] = useState<any[]>([])
    const [inputDisable, setInputDisable] = useState<boolean>(false)
    const [tableColumns, setTableColumns] = useState([]);
    const [tax, setTax] = useState([])
    const [totalUnit,setTotalUnit] = useState(Number)
    const [color,setColor] = useState<any[]>([])
    const [subAmount,setSubAmount] = useState(Number)
    const colorService = new ColourService();
    const m3MasterService = new M3MastersService()
    const sampleService = new SampleDevelopmentService()
    const indentservice = new IndentService()
    const uomService =  new UomService()
    const m3TrimService = new M3TrimsService()
    const taxService = new TaxesService();
    const [taxPer, setTaxPer] = useState(0);
    const sizeService = new SizeService()
const [sizeData, setSizeData]=useState<any[]>([])
    useEffect(() =>{
        getColor()
        getM3TrimCodes()
        getTrimType()
        getUom()
        getTax()
        getAllSizes()

    },[])

    useEffect(() =>{
        if(indentId.length != 0){
            setTableColumns([...columns])
            // indentTrimData(indentId)
            setTrimtableVisible(true)
            props(itemData.filter((e) => e.checkStatus === true))
            setTrimTableData(itemData.filter((e) => e.checkStatus === true));
        }
    },[indentId,itemData])

    useEffect(() =>{
        if(sampleReqId.length != 0){
            setTableColumns([...sampleColumns])
            sampleTrimData(sampleReqId.data[1].sampleReqIds,sampleReqId.data[2].m3itemid)
        }
    },[sampleReqId])

    useEffect(() =>{
        if(data.length != 0){
            // trimForm.setFieldsValue({productGroupId:data.data.productGroupId})
            // trimForm.setFieldsValue({trimId:data.data.rmItemId})
            trimForm.setFieldsValue({colourId:data.data.colourId})
            trimForm.setFieldsValue({poQuantity:data.data.requiredQuantity})
            trimForm.setFieldsValue({m3TrimCodeName:data.data.requiredQuantity})
            trimForm.setFieldsValue({indentCode:data.data.indentCode})
            trimForm.setFieldsValue({m3TrimCode:data.data.m3TrimCode})
        }
    },[data])
    const getAllSizes =() =>{
        sizeService.getAllActiveSize().then(res=>{
          if(res.status){
            setSizeData(res.data)
          }else{
            setSizeData([])
            AlertMessages.getInfoMessage(res.internalMessage)
          }
        })
      }

    const getTax = () => {
        taxService.getAllActiveTaxes().then((res) => {
            if (res.status) {
                setTax(res.data)
            }
        })
    }

    const getUom = () => {
        uomService.getAllUoms().then(res => {
            if(res.status) {
                setUom(res.data)
            }
        })
    }

    const indentTrimData = (value) =>{
        indentservice.getAllIndentTrimDetailsAgainstIndent({indentId:value}).then(res =>{
            if(res.status){
                setTrimtableVisible(true)
                props(res.data)
                setTrimTableData(res.data);
            }
        })
    }
    const sampleTrimData = (sampleReqId,sampleItemId) =>{
        sampleService.getTrimDetailsOfSample({sampleReqId:sampleReqId,sampleItemId:sampleItemId}).then(res =>{
            if(res.status){
                // console.log(res.data)
                setTrimtableVisible(true)
                props(res.data)
                setTrimTableData(res.data);
            }
            else{
                setTrimtableVisible(false)
                props([])
                setTrimTableData([]);
            }
        })
    }
    const getColor = () => {
        colorService.getAllActiveColour().then(res =>{
            if(res.status) {
                setColor(res.data)
            }
        })
    }

    const getTrimType = () => {
        sampleService.getTrimType().then(res =>{
            if(res.status) {
                setTrimType(res.data)
            }
        })
    }

    const TrimTypeOnchange = (value,option) =>{
        trimForm.setFieldsValue({productGroup:option?.name})
        getTrimCodeAgainstTrimType(value)
    }

    const getTrimCodeAgainstTrimType = (value) => {
        sampleService.getTrimCodeAgainstTrimType({productGroupId:value}).then(res =>{
            if(res.status) {
                setTrimCode(res.data)
            }
        })
    }

    const getM3TrimCodes = () => {
        m3TrimService.getM3Trims().then(res => {
            if(res.status){
                setTrimM3Code(res.data)
            }
        })
    }

    const setEditForm = (rowData: any, index: any) => {
        console.log(rowData)
        setUpdate(true)
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
        if(rowData.indentTrimId != undefined){
            if(rowData?.trimUomId > 0){
                rowData.quantityUomId = rowData.trimUomId
                rowData.quantityUomName = rowData.trimUomName
            }
        setInputDisable(true)
        trimForm.setFieldsValue({poQuantity:Number(rowData.indentQuantity) - Number(rowData.poQuantity)})
        trimForm.setFieldsValue({indentId:rowData.indentId})
        // trimForm.setFieldsValue({m3TrimCode:rowData.m3TrimCodeId})    
        trimForm.setFieldsValue({m3TrimCodeName:rowData.m3TrimCodeName})    
        trimForm.setFieldsValue({indentQuantity:rowData.indentQuantity})  
        trimForm.setFieldsValue({ unitPrice: Number(rowData.unitPrice) > 0 ? Number(rowData.unitPrice):undefined })
        trimForm.setFieldsValue({ discount:   Number(rowData.discount) > 0 ? Number(rowData.discount):null })
        trimForm.setFieldsValue({ discountAmount: rowData.discountAmount })
        trimForm.setFieldsValue({ tax: rowData.tax })
        trimForm.setFieldsValue({ taxAmount: rowData.taxAmount })
        trimForm.setFieldsValue({ subjectiveAmount: rowData.subjectiveAmount })
        trimForm.setFieldsValue({ transportation: rowData.transportation })
        trimForm.setFieldsValue({indentCode:rowData.indentCode})
        trimForm.setFieldsValue({indentTrimId:rowData.indentTrimId})
        trimForm.setFieldsValue({quantityUomName:rowData?.quantityUomName})
        trimForm.setFieldsValue({quantityUomId:rowData?.quantityUomId})
        trimForm.setFieldsValue({styleId: rowData?.styleId})
        trimForm.setFieldsValue({trimParams: rowData?.trimParams})
        trimForm.setFieldsValue({taxPercentage: rowData?.taxPercentage})
        trimForm.setFieldsValue({hsnCode: rowData?.hsnCode})
        
        
        // trimForm.setFieldsValue({poQuantity: rowData?.quantity})
        }
        if(rowData.sampleTrimInfoId != undefined){
            if(defaultTrimFormData?.uomId > 0){
                defaultTrimFormData.quantityUomId = defaultTrimFormData.uomId
                defaultTrimFormData.quantityUomName = defaultTrimFormData.uomName
            }
            trimForm.setFieldsValue({poQuantity:rowData.sampleOrderQuantity})
            trimForm.setFieldsValue({ unitPrice: rowData.unitPrice })
            trimForm.setFieldsValue({ discount: rowData.discount })
            trimForm.setFieldsValue({ discountAmount: rowData.discountAmount })
            trimForm.setFieldsValue({ tax: rowData.tax })
            trimForm.setFieldsValue({ taxAmount: rowData.taxAmount })
            trimForm.setFieldsValue({ subjectiveAmount: rowData.subjectiveAmount })
            trimForm.setFieldsValue({ transportation: rowData.transportation })
            trimForm.setFieldsValue({quantityUomName:rowData?.quantityUomName})
            trimForm.setFieldsValue({quantityUomId:rowData?.quantityUomId,})
            trimForm.setFieldsValue({styleId: rowData?.styleId})
            trimForm.setFieldsValue({trimParams: rowData?.trimParams})
            trimForm.setFieldsValue({styleId:rowData?.styleId,})
            trimForm.setFieldsValue({taxPercentage: rowData?.taxPercentage})
            trimForm.setFieldsValue({hsnCode: rowData?.hsnCode})

        setInputDisable(true)
        }
   
    }

    // const deleteData = (index:any,rowData) => {
    //     console.log(trimTableData)
    //     console.log(rowData)
    //     }

    // const deleteData = (index:any) => {
    //     console.log(trimTableData)
    //     tableData = [...trimTableData]
    //     tableData.splice(index,1)
    //     // props(tableData)
    //     setTrimTableData(tableData)
    //     // if (tableData.length == 0) {
    //     //     setTrimtableVisible(false)
    //     // }
    //     }

        const deleteData = (index: any) => {
            setTrimTableData((prevData) => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
            });
        };

    const columns  =[
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:' Indent Code',
            dataIndex:'indentCode',
            // width:'100px' 
        },
        {
            title:'Trim Params',
            dataIndex:'trimParams',
            // width:'100px' 
        },
        {
            title:'M3 Trim Code',
            dataIndex:'m3TrimCodeName',
            // width:'100px'
        },
        {
            title:'UOM',
            dataIndex:'quantityUomName',
            // width:'100px',
            render:(value,row)=>{
                return<>{value ? value : row.trimUomName ? row.trimUomName:'NA' }</>
            }
        },
        // {
        //     title:'Color',
        //     dataIndex:'colourName',
        //     width:'100px'
        // },
        {
            title:'Indent Quantity',
            dataIndex:'indentQuantity',
        },
        {
            title:'Po Quantity',
            dataIndex:'poQuantity',
            // width:'100px'
            
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            // width:'100px'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            // width:'100px'
        },
        {
            title: 'Tax Percentage',
            dataIndex: 'taxPercentage',
        },
        {
            title: 'Transportation',
            dataIndex: 'transportation',
        },
        {
            title: 'Subjective Amount',
            dataIndex: 'subjectiveAmount',
        },
        {
            title: "Action",
            dataIndex: 'action',
            fixed:'right',
            render: (text: any, rowData: any, index: any) => (
                <span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    setEditForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' 
                        onConfirm={e =>{deleteData(index);}}
                        >
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]
    const sampleColumns  =[
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:' Sample Request Number',
            dataIndex:'sampleReqNo',
            width:'190px'
        },
        {
            title:'Trim Params',
            dataIndex:'trimParams',
            // width:'100px' 
        },
        {
            title:'M3 Trim Code',
            dataIndex:'m3TrimCodeName',
            width:'100px'
        },
        
        // {
        //     title:'Color',
        //     dataIndex:'colourName',
        //     width:'100px'
        // },
        {
            title:'Sample Order Quantity',
            dataIndex:'sampleOrderQuantity',
        },
        {
            title:'UOM',
            dataIndex:'quantityUomName',
            render:(value,row)=>{
                console.log(row)
                return <>{value?value:(row.uomName)?row.uomName:'NA'}</>
            }
            
        },
        {
            title:'Po Quantity',
            dataIndex:'poQuantity',
            
        },
        
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
        },
        {
            title: 'Tax Percentage',
            dataIndex: 'taxPercentage',
        },
        {
            title: 'Transportation',
            dataIndex: 'transportation',
        },
        {
            title: 'Subjective Amount',
            dataIndex: 'subjectiveAmount',
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text: any, rowData: any, index: any) => (
                <span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    setEditForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' 
                        onConfirm={e =>{deleteData(index);}}
                        >
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]

    const colorChange= (value,option) =>{
        console.log(option,'oooooooo');
        
        trimForm.setFieldsValue({ colorName: option?.type ? option.type : '' })
    }
    
    const OnTrimAdd = (values) =>{
        console.log(values); 
        values.materialType = defaultTrimFormData.materialType   
        trimForm.validateFields().then(() =>{
          if(trimIndexVal !== undefined){
            trimTableData[trimIndexVal] = values;
            tableData=[...trimTableData]
            setTrimIndexVal(undefined)
          }else{
            tableData=[...trimTableData,values]
          }
        //   console.log(tableData)
          setTrimTableData(tableData)
          props(tableData)
          setInputDisable(false)
          trimForm.resetFields()
          setUpdate(false)
          setTrimtableVisible(true)
        })
    }

    const trimCodeOnchange = (value,option) =>{
        trimForm.setFieldsValue({trimCodeName:option.type})
    }

    useEffect(() =>{
        if(defaultTrimFormData){
            console.log(defaultTrimFormData)
           if (defaultTrimFormData.sampleReqId != undefined){
            if(defaultTrimFormData?.uomId > 0){
                defaultTrimFormData.quantityUomId = defaultTrimFormData.uomId
                defaultTrimFormData.quantityUomName = defaultTrimFormData.uomName
            }
                trimForm.setFieldsValue({sampleReqId:defaultTrimFormData.sampleReqId,
                poQuantity:defaultTrimFormData.sampleOrderQuantity,
                sampleOrderQuantity:defaultTrimFormData.sampleOrderQuantity,
                sampleTrimInfoId:defaultTrimFormData.sampleTrimInfoId,
                sampleReqNo:defaultTrimFormData.sampleReqNo,
                colourName: defaultTrimFormData.colourName,
                colourId : defaultTrimFormData.colourId,
                consumption : defaultTrimFormData.consumption,
                m3TrimCode: defaultTrimFormData.m3TrimCode,
                trimCodeName: defaultTrimFormData.trimCodeName,
                quantityUomName:defaultTrimFormData.quantityUomName,
                quantityUomId:defaultTrimFormData.quantityUomId,
                m3TrimCodeName:defaultTrimFormData.m3TrimCodeName,
                trimParams: defaultTrimFormData.trimParams,
                styleId: defaultTrimFormData.styleId,
                taxPercentage: defaultTrimFormData?.taxPercentage,
                hsnCode: defaultTrimFormData?.hsnCode
            })

            }
            if(defaultTrimFormData.indentId != undefined){
                if(defaultTrimFormData.trimUomId > 0){
                    defaultTrimFormData.quantityUomId = defaultTrimFormData.trimUomId
                    defaultTrimFormData.quantityUomName = defaultTrimFormData.trimUomName
                }
                trimForm.setFieldsValue({unitPrice: defaultTrimFormData.unitPrice > 0 ? Number(defaultTrimFormData.unitPrice):undefined})
                trimForm.setFieldsValue({ discount: defaultTrimFormData.discount })
                trimForm.setFieldsValue({ discountAmount: defaultTrimFormData.discountAmount })
                trimForm.setFieldsValue({ tax: defaultTrimFormData.tax })
                trimForm.setFieldsValue({ taxAmount: defaultTrimFormData.taxAmount })
                trimForm.setFieldsValue({ subjectiveAmount: defaultTrimFormData.subjectiveAmount })
                trimForm.setFieldsValue({ transportation: defaultTrimFormData.transportation })
                trimForm.setFieldsValue({ hsnCode: defaultTrimFormData.hsnCode })
                trimForm.setFieldsValue({poQuantity:(defaultTrimFormData.poQuantity > 0) ?(Number(defaultTrimFormData.poQuantity)) : Number(defaultTrimFormData.indentQuantity) - Number(defaultTrimFormData.poQuantity)})
                trimForm.setFieldsValue({
                    colourName: defaultTrimFormData.colourName,
                    colourId : defaultTrimFormData.colourId,
                    consumption : defaultTrimFormData.consumption,
                    m3TrimCode: defaultTrimFormData.m3TrimCode,
                    trimCodeName: defaultTrimFormData.trimCodeName,
                    indentTrimId:defaultTrimFormData.indentTrimId,
                    indentQuantity:defaultTrimFormData.indentQuantity,
                    indentQuantityUnit:defaultTrimFormData.indentQuantityUnit,
                    quantityUomId:defaultTrimFormData.quantityUomId,
                    m3TrimCodeName:defaultTrimFormData.m3TrimCodeName,
                    indentCode:defaultTrimFormData.indentCode,
                    quantityUomName:defaultTrimFormData.quantityUomName,
                    indentId:defaultTrimFormData.indentId,
                    styleId: defaultTrimFormData.styleId,
                    trimParams: defaultTrimFormData.trimParams,
                    taxPercentage: defaultTrimFormData?.taxPercentage

                    
                })
            }
           
        }

    },[defaultTrimFormData])

    const m3trimOnchange = (value,option) =>{
        trimForm.setFieldsValue({m3TrimCodeName:option?.name})

    }
    const quantityUomOnchange = (value,option) =>{
        trimForm.setFieldsValue({quantityUomName:option?.name?option?.name:''})
    }

    let totalUniPrice
    const unitPriceOnchange = (value) => {
        const unitPrice=trimForm.getFieldValue('poQuantity')
        totalUniPrice=Number(unitPrice)*Number(value)
        setTotalUnit(totalUniPrice)
    }

    let disAmount
    let totalValueAfterDiscount
    function discountOnChange(value) {
       const percent=(Number(value/100))
        const disAmount=(percent*totalUnit)
        trimForm.setFieldsValue({discountAmount:disAmount})
        totalValueAfterDiscount=totalUnit-disAmount
    }

    let taxAmount
    const handleTaxChange = (value, option) => {
        const percent=Number(option?.name/100)
        taxAmount=(totalValueAfterDiscount*percent)
        const totalAmount=taxAmount+totalValueAfterDiscount
        trimForm.setFieldsValue({taxAmount:Number(taxAmount).toFixed(2)})
        trimForm.setFieldsValue({subjectiveAmount:Number(totalAmount).toFixed(2)})
        trimForm.setFieldsValue({ tax: value })
        trimForm.setFieldsValue({ taxPercentage: option?.name ? option?.type + '- ' + option?.name : '' })
        console.log('tax %')
        console.log(value);
        setSubAmount(Number(totalAmount))
    }

    function transportationOnChange(value){
        console.log(Number(subAmount).toFixed(2))
        const amount = Number(subAmount).toFixed(2) ;
        const subjecAmout = Number(amount) + Number(value)
        trimForm.setFieldsValue({subjectiveAmount:subjecAmout})
    }
    const finalCalculation=()=>{
        let taxAmount=0;
        let discAmnt=0;
        const unitPrice=trimForm.getFieldValue('unitPrice');
        const quantity=trimForm.getFieldValue('poQuantity')
        let transportation=trimForm.getFieldValue('transportation')
       
        if(transportation==undefined ||transportation==0){
            transportation=0;
        }
        // console.log('tax')
        // console.log(taxPercentageNew)
        let baseValue=Number(unitPrice)*Number(quantity);
        const disc_per=trimForm.getFieldValue('discount')
        if(disc_per!==''&&disc_per>0){
            discAmnt=Math.round(baseValue*disc_per/100);
            baseValue=Number(baseValue)-Number(discAmnt);
        }
        if(taxPer!=0){
            taxAmount=(baseValue*taxPer/100)
        }else{
            taxAmount=0
        }
        
       
        const totalAmount=Number(taxAmount)+Number(baseValue)+Number(transportation)
        trimForm.setFieldsValue({taxAmount:Number(taxAmount).toFixed(2)})
        trimForm.setFieldsValue({discountAmount:Number(discAmnt).toFixed(2)})
        trimForm.setFieldsValue({subjectiveAmount:Number(totalAmount).toFixed(2)})
        trimForm.setFieldsValue({ taxAmount: taxAmount })
       
        // setTaxAmountVisible(false)        
    }
    const priceCalculation = async (value, option) => {        
        const percent=Number(option.name)
        
        let status= await setTaxPer(Number(option.name));
        trimForm.setFieldsValue({ taxPercentage: option?.name ? option.type + '- ' + option?.name : '' })
       
    }
    useEffect(() =>{
        finalCalculation();
    },[taxPer])
    return(
        // <div style={{ width: '100%', overflowX: 'auto' }}>
        <Card title={<span style={{color:'blue', fontSize:'17px'}} >Trim Details</span>}  style={{ width: '100%', overflowX: 'auto' }}>
            <Form form={trimForm} layout="vertical" onFinish={OnTrimAdd} style={{width:'100%'}}>
                <Row gutter={12}>
                   <Form.Item name='sampleReqId' hidden ><Input/></Form.Item>
                    <Form.Item name='indentId' hidden ><Input/></Form.Item>
                    <Form.Item name={'colourName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentTrimId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleTrimInfoId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantity'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantityUnit'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'m3TrimCodeName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleReqNo'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleOrderQuantity'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'quantityUomName'} hidden><Input></Input></Form.Item>
                    <Form.Item name='taxPercentage' hidden ><Input/></Form.Item>
                    <Form.Item name='styleId' hidden ><Input/></Form.Item>
                    <Form.Item name='trimParams' hidden ><Input/></Form.Item>
                    <Form.Item name='sampleOrderQuantity' hidden ><Input/></Form.Item>
                    <Form.Item name={'indentQuantity'} label={'Indent Quantity'} style={{display:'none'}}>
                            <Input disabled={inputDisable}></Input>
                        </Form.Item>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 10 }}>
                    <Form.Item name='m3TrimCode' label='M3 Trim Code' rules={[{required:true,message:'M3 code is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'
                             disabled={inputDisable}
                             onChange={m3trimOnchange}
                             >
                            {trimM3Code.map(e => {
                                return(
                                    <Option key={e.m3TrimsId} value={e.m3TrimsId} name={e.trimCode}>{e.trimCode}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                            <Form.Item
                            name="colourId"
                            label="Color"
                        >
                            <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Color"
                            onChange={onColorChange}
                            disabled={inputDisable}
                            >
                                {color.map((e) => {
                                  return (
                                    <Option key={e.colourId} value={e.colourId} name={e.colour}>
                                  {e.colour}
                                </Option>
                              );
                            })}
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name={'poQuantity'} label={'PO Quantity'} 
                         rules={[
                            {
                              required: true,
                              message: "poQuantity Is Required",
                            }
                        ]}>
                            <Input type="number" placeholder="PoQuantity" addonAfter={<Form.Item name='quantityUomId' style={{width:'90px', height:"10px"}} rules={[{required:false,message:'Quantity unit is required'}]} >
                        <Select showSearch allowClear disabled optionFilterProp="children" placeholder='Unit'
                        onChange={finalCalculation}
                        >
                            {uom.map(e => {
                                return(
                                    <Option key={e.uomId} value={e.uomId} name={e.uom}>{e.uom}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>}/>
                        </Form.Item>
                    </Col>
                        
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='unitPrice' label='Unit Price'
                            rules={[{ required: true, message: 'unit price is required' }]}
                        >
                            <Input type="number" placeholder="unit price" onChange={(e) => finalCalculation()} />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name='colourId' label='Color'>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Color'
                                 onChange={colorChange}
                                  disabled={inputDisable}
                            >
                                {color.map(e => {
                                    return (
                                        <Option type={e.colour} key={e.colourId} value={e.colourId} name={e.colour}> {e.colour}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col> */}
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name='sizeId' label='Size'>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Size'
                               
                            >
                                {sizeData.map(e => {
                                    return (
                                        <Option type={e.size} key={e.sizeId} value={e.sizeId} name={e.size}>{e.size}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col> */}
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name='itemDescription' label='Item Description'>
                            <Input  allowClear type="string"  placeholder='Enter Item Description'/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='discount' label='Discount(%)'
                            rules={[{ required: false, message: 'Discount is required' }]}
                        >
                            <Input type="number" placeholder="discount" onChange={(e) => finalCalculation()} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='discountAmount' label='Discount Amount'
                            rules={[{ required: false, message: 'Discount is required' }]}
                        >
                            <Input type = "number" disabled placeholder="discount amount" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='tax' label='Tax Percentage(%)'
                            rules={[{ required: true, message: 'tax% is required' }]}
                        >
                            <Select
                                placeholder="Select Tax"
                                onChange={priceCalculation}
                                allowClear
                            >
                                {tax.map((e) => {
                                    return (
                                        <Option key={e.taxId} value={e.taxId} name={e.taxPercentage} type={e.taxCategory}>
                                           {e.taxCategory}-{e.taxPercentage}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='taxAmount' label='Tax Amount'
                            rules={[{ required: true, message: 'Tax is required' }]}
                        >
                            <Input disabled placeholder="Tax amount" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='transportation' label='Transportation'
                            rules={[{ required: false, message: 'Transportation is required' }]}
                        >
                            <Input onChange={e=>finalCalculation()} placeholder="Transportation" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='subjectiveAmount' label='Subjective Amount'
                            rules={[{ required: true, message: 'Subjective Amount is required' }]}
                        >
                            <Input disabled placeholder="Subjective amount" />
                        </Form.Item>
                        <Form.Item name='styleId'  style={{display:'none'}}
                            rules={[{ required: true, message: 'Style is required' }]}
                        >
                            <Input name='styleId' disabled placeholder="Subjective amount"  style={{display:'none'}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='hsnCode' label='HSN Code'
                            rules={[{ required: true, message: 'HSN Code is required' }]}
                        >
                            <Input placeholder="HSN Code" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                    {update?
                    <Button type='primary' htmlType="submit">{update ?'Update':'Add'}</Button>:<></>
                    }
                
                </Row>
            </Form>
                <Row>
                {trimtableVisible ? 
                <Table 
                bordered={true}
                size="small"
                scroll={{x:true}}
                columns={tableColumns} 
                dataSource={trimTableData}
                 pagination={{
                    onChange(current) {
                      setPage(current);
                    }
                  }}
                     />
                :<></>}
                </Row>

        </Card>
        // </div>
    )

}
export default PurchaseOrderTrim;