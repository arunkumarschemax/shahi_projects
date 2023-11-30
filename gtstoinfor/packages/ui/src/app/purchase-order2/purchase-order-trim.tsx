import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { M3MastersCategoryReq } from "@project-management-system/shared-models";
import { ColourService, IndentService, M3MastersService, M3TrimsService, SampleDevelopmentService, TaxesService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { VALUE_SPLIT } from "rc-cascader/lib/utils/commonUtil";
import React, { useEffect } from "react";
import { useState } from "react";

export const PurchaseOrderTrim = ({props,indentId,data,sampleReqId}) =>{
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

    const [color,setColor] = useState<any[]>([])
    const colorService = new ColourService();
    const m3MasterService = new M3MastersService()
    const sampleService = new SampleDevelopmentService()
    const indentservice = new IndentService()
    const uomService =  new UomService()
    const m3TrimService = new M3TrimsService()
    const taxService = new TaxesService();


    useEffect(() =>{
        getColor()
        getM3TrimCodes()
        getTrimType()
        getUom()
        getTax()
    },[])

    useEffect(() =>{
        if(indentId.length != 0){
            setTableColumns([...columns])
            indentTrimData(indentId)
        }
    },[indentId])

    useEffect(() =>{
        if(sampleReqId.length != 0){
            setTableColumns([...sampleColumns])
            sampleTrimData(sampleReqId)
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
    const sampleTrimData = (value) =>{
        sampleService.getTrimDetailsOfSample({sampleReqId:value}).then(res =>{
            if(res.status){
                setTrimtableVisible(true)
                props(res.data)
                setTrimTableData(res.data);
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
        setUpdate(true)
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
        if(rowData.indentTrmId != undefined){
        setInputDisable(true)
        trimForm.setFieldsValue({poQuantity:rowData.indentQuantity})
        trimForm.setFieldsValue({indentId:rowData.indentId})
        }
        if(rowData.sampleTrimInfoId != undefined){
            trimForm.setFieldsValue({poQuantity:rowData.sampleOrderQuantity})
            trimForm.setFieldsValue({ unitPrice: rowData.unitPrice })
            trimForm.setFieldsValue({ discount: rowData.discount })
            trimForm.setFieldsValue({ discountAmount: rowData.discountAmount })
            trimForm.setFieldsValue({ tax: rowData.tax })
            trimForm.setFieldsValue({ taxAmount: rowData.taxAmount })
            trimForm.setFieldsValue({ subjectiveAmount: rowData.subjectiveAmount })
            trimForm.setFieldsValue({ transportation: rowData.transportation })
        setInputDisable(true)
        }
   
    }

    const deleteData = (index:any) => {
        tableData = [...trimTableData]
        tableData.splice(index,1)
        props(tableData)
        setTrimTableData(tableData)
        if (tableData.length == 0) {
            setTrimtableVisible(false)
        }
        }

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
            width:'100px' 
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
            title:'Indent Quantity',
            dataIndex:'indentQuantity',
        },
        {
            title:'Po Quantity',
            dataIndex:'poQuantity',
            width:'100px'
            
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            width:'100px'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            width:'100px'
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
            title:'Po Quantity',
            dataIndex:'poQuantity',
            
        },
        {
            title:'Quantity UOM',
            dataIndex:'quantityUomName',
            
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

    const onColorChange= (value,option) =>{
        trimForm.setFieldsValue({colourName:option?.name ? option?.name:''})
    }
    
    const OnTrimAdd = (values) =>{
        trimForm.validateFields().then(() =>{
          if(trimIndexVal !== undefined){
            trimTableData[trimIndexVal] = values;
            tableData=[...trimTableData]
            setTrimIndexVal(undefined)
          }else{
            tableData=[...trimTableData,values]
          }
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
                trimForm.setFieldsValue({sampleReqId:defaultTrimFormData.sampleReqId,
                poQuantity:defaultTrimFormData.sampleOrderQuantity,
                sampleTrimInfoId:defaultTrimFormData.sampleTrimInfoId,
                sampleReqNo:defaultTrimFormData.sampleReqNo,
                colourName: defaultTrimFormData.colourName,
                colourId : defaultTrimFormData.colourId,
                consumption : defaultTrimFormData.consumption,
                m3TrimCode: defaultTrimFormData.m3TrimCode,
                trimCodeName: defaultTrimFormData.trimCodeName,
                quantityUomName:defaultTrimFormData.quantityUomName,
                quantityUomId:defaultTrimFormData.quantityUomId,

            })

            }
            if(defaultTrimFormData.indentId != undefined){
                trimForm.setFieldsValue({
                    colourName: defaultTrimFormData.colourName,
                    colourId : defaultTrimFormData.colourId,
                    consumption : defaultTrimFormData.consumption,
                    m3TrimCode: defaultTrimFormData.m3TrimCode,
                    trimCodeName: defaultTrimFormData.trimCodeName,
                    indentTrmId:defaultTrimFormData.indentTrmId,
                    indentQuantity:defaultTrimFormData.indentQuantity,
                    indentQuantityUnit:defaultTrimFormData.indentQuantityUnit,
                    quantityUomId:defaultTrimFormData.quantityUomId,
                    poQuantity:defaultTrimFormData.indentQuantity,
                    m3TrimCodeName:defaultTrimFormData.m3TrimCodeName,
                    indentCode:defaultTrimFormData.indentCode,
                    quantityUomName:defaultTrimFormData.quantityUomName,
                    indentId:defaultTrimFormData.indentId
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
    }

    let disAmount
    let totalValueAfterDiscount
    function discountOnChange(value) {
       const percent=(Number(value/100))
        const disAmount=(percent*totalUniPrice)
        trimForm.setFieldsValue({discountAmount:disAmount})
        totalValueAfterDiscount=totalUniPrice-disAmount
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
    }

    return(
        <Card title={<span style={{color:'blue', fontSize:'17px'}} >Trim Details</span>}>
            <Form form={trimForm} layout="vertical" onFinish={OnTrimAdd} style={{width:'100%'}}>
                <Row gutter={24}>
                   <Form.Item name='sampleReqId' hidden ><Input/></Form.Item>
                    <Form.Item name='indentId' hidden ><Input/></Form.Item>
                    <Form.Item name={'colourName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentTrmId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleTrimInfoId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantity'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantityUnit'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'m3TrimCodeName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleReqNo'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleOrderQuantity'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'quantityUomName'} hidden><Input></Input></Form.Item>
                    <Form.Item name='taxPercentage' hidden ><Input/></Form.Item>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'poQuantity'} label={'PO Quantity'}
                         rules={[
                            {
                              required: true,
                              message: "poQuantity Is Required",
                            }
                        ]}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='quantityUomId'  rules={[{required:true,message:'Quantity unit is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'
                        onChange={quantityUomOnchange}
                        >
                            {uom.map(e => {
                                return(
                                    <Option key={e.uomId} value={e.uomId} name={e.uom}>{e.uom}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{display:'none'}}>
                        <Form.Item name={'indentQuantity'} label={'Indent Quantity'}>
                            <Input disabled={inputDisable}></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                        <Form.Item name='unitPrice' label='Unit Price'
                            rules={[{ required: true, message: 'unit price of Fabric is required' }]}
                        >
                            <InputNumber style={{ width: '90px' }} placeholder="unit price" onChange={(e) => unitPriceOnchange(e)} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='discount' label='Discount'
                            rules={[{ required: false, message: 'Discount of Fabric is required' }]}
                        >
                            <InputNumber style={{ width: '90px' }} placeholder="discount" onChange={(e) => discountOnChange(e)} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='discountAmount' label='Discount Amount'
                            rules={[{ required: false, message: 'Discount of Fabric is required' }]}
                        >
                            <Input disabled placeholder="discount amount" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='tax' label='Tax Percentage(%)'
                            rules={[{ required: true, message: 'tax of Fabric is required' }]}
                        >
                            <Select
                                placeholder="Select Tax"
                                onChange={handleTaxChange}
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
                            rules={[{ required: true, message: 'Tax of Fabric is required' }]}
                        >
                            <Input disabled placeholder="Tax amount" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='transportation' label='Transportation'
                            rules={[{ required: false, message: 'Transportation of Fabric is required' }]}
                        >
                            <Input placeholder="Transportation" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='subjectiveAmount' label='Subjective Amount'
                            rules={[{ required: true, message: 'Subjective Amount of Fabric is required' }]}
                        >
                            <Input disabled placeholder="Subjective amount" />
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row justify={'end'}>
                    {update?
                    <Button type='primary' htmlType="submit">{update ?'Update':'Add'}</Button>:<></>
                    }
                
                </Row>
                <Row>
                {trimtableVisible ? <Table columns={tableColumns} dataSource={trimTableData}
                 pagination={{
                    onChange(current) {
                      setPage(current);
                    }
                  }}
                     />
                :<></>}
                </Row>
            </Form>

        </Card>
    )

}
export default PurchaseOrderTrim;