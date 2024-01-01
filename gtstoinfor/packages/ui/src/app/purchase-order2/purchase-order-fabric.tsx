import { ConsoleSqlOutlined, EditOutlined, EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { M3MastersCategoryReq } from "@project-management-system/shared-models"
import { ColourService, FabricTypeService, FabricWeaveService, IndentService, M3ItemsService, M3MastersService, M3StyleService, ProfitControlHeadService, SampleDevelopmentService, TaxesService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tag, Tooltip, message } from "antd"
import Table, { ColumnProps } from "antd/es/table"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const PurchaseOrderfabricForm = ({ props, indentId, data, sampleReqId, itemData}) => {
    const [fabricForm] = Form.useForm()
    const [weave, setWeave] = useState<any[]>([])
    const [uom, setUom] = useState<any[]>([])
    const [fabricM3Code, setFabricM3Code] = useState<any[]>([])
    const [color, setColor] = useState<any[]>([])
    const [pch, setPch] = useState<any[]>([])
    const [fabricTableData, setFabricTableData] = useState<any[]>([])
    const [fabricTableVisible, setFabricTableVisible] = useState<boolean>(false)
    const [fabricIndexVal, setFabricIndexVal] = useState(undefined);
    const [defaultFabricFormData, setDefaultFabricFormData] = useState<any>(undefined);
    const [update, setUpdate] = useState<boolean>(false)
    const [fabricType, setFabricType] = useState<any[]>([])
    const [inputDisbale, setInputDisable] = useState<boolean>(false)
    const [tableColumns, setTableColumns] = useState([]);
    const [tax, setTax] = useState([])
    const [page, setPage] = React.useState(1);
    const [taxVisible ,setTaxVisible] = useState(true)
    const [taxAmountVisible, setTaxAmountVisible] = useState(true)
    const [dicountVisible,setDiscountVisible] = useState(true)
    const [totalUnit,setTotalUnit] = useState(Number)
    const [subAmount,setSubAmount] = useState(Number)
    const { Option } = Select
    const weaveService = new FabricWeaveService()
    const uomService = new UomService()
    const colorService = new ColourService();
    const pchService = new ProfitControlHeadService()
    const fabricTypeService = new FabricTypeService()
    const indentService = new IndentService()
    let tableData: any[] = []
    const m3ItemsService = new M3ItemsService()
    const sampleservice = new SampleDevelopmentService()
    const taxService = new TaxesService();
    const [taxPer, setTaxPer] = useState(0);

    useEffect(() => {
        getweave()
        getUom()
        getColor()
        getPCH()
        getFabricType()
        getM3FabricStyleCodes()
        getTax()
    }, [])

    useEffect(() => {
        console.log(itemData);
        console.log(itemData?.filter((i) => i.checkStatus === true))
        if (indentId.length != 0) {
            setTableColumns([...columns])
            // AllIndnetDetails(indentId)
            setFabricTableData(itemData?.filter((i) => i.checkStatus === true))
            setFabricTableVisible(true)
        }
    }, [indentId,itemData])


    useEffect(() => {
        console.log(sampleReqId)
        // console.log(sampleReqId.data[1].sampleReqIds)
        // console.log(sampleReqId.data[2].m3itemid)
        if (sampleReqId.length != 0) {
            getAllSampleDetails(sampleReqId.data[1].sampleReqIds,sampleReqId.data[2].m3itemid)
            setTableColumns([...samplecolumns])
        }

    }, [sampleReqId])

    const getTax = () => {
        taxService.getAllActiveTaxes().then((res) => {
            if (res.status) {
                setTax(res.data)
            }
        })
    }

    useEffect(()=> {
        if(taxPer){
           finalCalculation();
        }    
    },[taxPer])

    const getM3FabricStyleCodes = () => {
        m3ItemsService.getM3Items().then(res => {
            if (res.status) {
                setFabricM3Code(res.data)
            }
        })
    }

    const AllIndnetDetails = (value) => {
        indentService.getAllIndentItemDetailsAgainstIndent({ indentId: value }).then(res => {
            if (res.status) {
                message.info('Please Update Po Quantity')
                props(res.data)
                setFabricTableData(res.data)
                setFabricTableVisible(true)
            } else {
                setFabricTableData([])
            }
        })
    }

    const getAllSampleDetails = (sampleReqId,sampleItemId) => {
        sampleservice.getfabricDetailsOfSample({ sampleReqId: sampleReqId,sampleItemId:sampleItemId }).then(res => {
            if (res.status) {
                setFabricTableData(res.data)
                setFabricTableVisible(true)
            } else {
                setFabricTableData([])
                setFabricTableVisible(false)
            }
        })
    }

    const getweave = () => {
        weaveService.getAllActiveFabricWeave().then(res => {
            if (res.status) {
                setWeave(res.data)
            }
        })
    }

    const getFabricType = () => {
        fabricTypeService.getAllActiveFabricType().then(res => {
            if (res.status) {
                setFabricType(res.data)
            }
        })
    }
    const getUom = () => {
        uomService.getAllUoms().then(res => {
            if (res.status) {
                setUom(res.data)
            }
        })
    }

    const getColor = () => {
        colorService.getAllActiveColour().then(res => {
            if (res.status) {
                setColor(res.data)
            }
        })
    }
    const getPCH = () => {
        pchService.getAllActiveProfitControlHead().then(res => {
            if (res.status) {
                setPch(res.data)
            }
        })
    }

    const colorOnchange = (value, option) => {
        fabricForm.setFieldsValue({ colorName: option?.type ? option.type : '' })
    }

    const setEditForm = (rowData: any, index: any) => {
        console.log(rowData)
        setUpdate(true)
        setDefaultFabricFormData(rowData)
        console.log(rowData)
        if (rowData.indentFabricId != undefined) {
            if(rowData?.colorId > 0){
                rowData.colourId = rowData.colorId
            }
            
            setInputDisable(true)
            console.log("**********************************************************************")
            fabricForm.setFieldsValue({ poQuantity: Number(rowData.indentQuantity) - Number(rowData.poQuantity) })
            fabricForm.setFieldsValue({ unitPrice: defaultFabricFormData?.unitPrice})
            fabricForm.setFieldsValue({ discount: rowData.discount })
            fabricForm.setFieldsValue({ discountAmount: rowData.discountAmount })
            fabricForm.setFieldsValue({ tax: rowData.tax })
            fabricForm.setFieldsValue({ taxAmount: rowData.taxAmount })
            fabricForm.setFieldsValue({ subjectiveAmount: rowData.subjectiveAmount })
            fabricForm.setFieldsValue({ transportation: rowData.transportation })
            fabricForm.setFieldsValue({ quantityUomId: rowData.quantityUomId })
            fabricForm.setFieldsValue({ quantityUom: rowData.quantityUom })
            fabricForm.setFieldsValue({ colourId: rowData.colourId })
            fabricForm.setFieldsValue({ m3FabricCode: rowData.m3FabricCode })
            fabricForm.setFieldsValue({ itemCode: rowData.itemCode })
            fabricForm.setFieldsValue({ styleId: rowData.styleId })
            fabricForm.setFieldsValue({ taxPercentage: rowData?.taxPercentage })
            fabricForm.setFieldsValue({ fabricCode: rowData?.fabricCode })

        }
        if (rowData.samplereFabId != undefined) {
            if(rowData?.uom_id > 0){
                rowData.quantityUomId = rowData.uom_id
            }
            if(rowData?.uom){
                rowData.quantityUom = rowData.uom
            }
            if(rowData?.style){
                rowData.styleId = rowData.style
            }
            setInputDisable(true)
            fabricForm.setFieldsValue({ poQuantity: rowData.sampleQuantity })
            fabricForm.setFieldsValue({ unitPrice: defaultFabricFormData?.unitPrice})
            fabricForm.setFieldsValue({ discount: rowData.discount })
            fabricForm.setFieldsValue({ discountAmount: rowData.discountAmount })
            fabricForm.setFieldsValue({ tax: rowData.tax })
            fabricForm.setFieldsValue({ taxAmount: rowData.taxAmount })
            fabricForm.setFieldsValue({ subjectiveAmount: rowData.subjectiveAmount })
            fabricForm.setFieldsValue({ transportation: rowData.transportation })
            fabricForm.setFieldsValue({ quantityUomId: rowData.quantityUomId })
            fabricForm.setFieldsValue({ quantityUom: rowData.uom })
            fabricForm.setFieldsValue({ styleId: rowData.styleId })
            fabricForm.setFieldsValue({ taxPercentage: rowData?.taxPercentage })
            fabricForm.setFieldsValue({ description: rowData?.description })
        }
        setFabricIndexVal(index)
    }


    useEffect(() => {
        if (defaultFabricFormData) {
            console.log(defaultFabricFormData)
            if(defaultFabricFormData.sampleReqId != undefined){
                if(defaultFabricFormData?.uom_id > 0){
                    defaultFabricFormData.quantityUomId = defaultFabricFormData.uom_id
                }
                if(defaultFabricFormData?.uom){
                    defaultFabricFormData.quantityUom = defaultFabricFormData.uom
                }
                if(defaultFabricFormData?.style){
                    defaultFabricFormData.styleId = defaultFabricFormData.style
                }
                fabricForm.setFieldsValue({ unitPrice: defaultFabricFormData?.unitPrice})
                fabricForm.setFieldsValue({ discount: defaultFabricFormData?.discount })
                fabricForm.setFieldsValue({ discountAmount: defaultFabricFormData?.discountAmount })
                fabricForm.setFieldsValue({ tax: defaultFabricFormData?.tax })
                fabricForm.setFieldsValue({ taxAmount: defaultFabricFormData?.taxAmount })
                fabricForm.setFieldsValue({ subjectiveAmount: defaultFabricFormData?.subjectiveAmount })
                fabricForm.setFieldsValue({ transportation: defaultFabricFormData?.transportation })
                // trimForm.setFieldsValue({poQuantity:(defaultFabricFormData.poQuantity > 0) ?(Number(defaultFabricFormData.poQuantity)) : Number(defaultFabricFormData.indentQuantity) - Number(defaultFabricFormData.poQuantity)})
                fabricForm.setFieldsValue({
                    poQuantity: defaultFabricFormData.sampleQuantity,
                    sampleReqId:defaultFabricFormData.sampleReqId,
                    samplereFabId: defaultFabricFormData.samplereFabId,
                    sampleReqNo: defaultFabricFormData.sampleReqNo,
                    sampleQuantity:defaultFabricFormData.sampleQuantity,
                    m3FabricCode: defaultFabricFormData.m3FabricCode,
                  colourId: defaultFabricFormData.colourId,
                 colorName: defaultFabricFormData.colorName,
                shahiFabricCode: defaultFabricFormData.shahiFabricCode,
                itemCode:defaultFabricFormData.itemCode,
                quantityUomId: defaultFabricFormData.quantityUomId,
                quantityUom: defaultFabricFormData.quantityUom,
                styleId: defaultFabricFormData.styleId,
                taxPercentage: defaultFabricFormData?.taxPercentage,
                description: defaultFabricFormData?.description


                })
            }
            if(defaultFabricFormData.indentId != undefined){
                if(defaultFabricFormData?.colorId > 0){
                    defaultFabricFormData.colourId = defaultFabricFormData.colorId
                }
                
                fabricForm.setFieldsValue({ unitPrice: defaultFabricFormData?.unitPrice })
                fabricForm.setFieldsValue({ discount: defaultFabricFormData?.discount })
                fabricForm.setFieldsValue({ discountAmount: defaultFabricFormData?.discountAmount })
                fabricForm.setFieldsValue({ subjectiveAmount: defaultFabricFormData?.subjectiveAmount })
                fabricForm.setFieldsValue({ transportation: defaultFabricFormData?.transportation })
                fabricForm.setFieldsValue({poQuantity:(defaultFabricFormData.poQuantity > 0) ?(Number(defaultFabricFormData.poQuantity)) : Number(defaultFabricFormData.indentQuantity) - Number(defaultFabricFormData.poQuantity)})
                fabricForm.setFieldsValue({
                    // poQuantity: Number(defaultFabricFormData.indentQuantity) - Number(defaultFabricFormData.poQuantity),
                    m3FabricCode: defaultFabricFormData.m3FabricCode,
                    colourId: defaultFabricFormData.colourId,
                    colorName: defaultFabricFormData.colorName,
                    tax: defaultFabricFormData.tax,
                    taxAmount: defaultFabricFormData.taxAmount,
                    shahiFabricCode: defaultFabricFormData.shahiFabricCode,
                    quantityUomId: defaultFabricFormData.quantityUomId,
                    indentQuantity: defaultFabricFormData.indentQuantity,
                    indentFabricId: defaultFabricFormData.indentFabricId,
                    itemCode: defaultFabricFormData.itemCode,
                    quantityUom: defaultFabricFormData.quantityUom,
                    indentCode: defaultFabricFormData.indentCode,
                    indentId:defaultFabricFormData.indentId,
                    taxPercentage: defaultFabricFormData?.taxPercentage,
                    fabricCode: defaultFabricFormData?.fabricCode

                    // styleId: defaultFabricFormData.style
                })
            }
       
           
        }

    }, [defaultFabricFormData])

    const columns = [
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        // {
        //     title:'Sample Code',
        //     dataIndex:'indentCode',
        // },
        {
            title: 'Indent Code',
            dataIndex: 'indentCode',
        },
        {
            title: 'M3 Fabric Code',
            dataIndex: 'itemCode',
            // width: '170px',
            render:(text,row)=>{
                console.log(row)
                return <>{`${row.fabricCode}-${row.itemCode}`}</>
            }
        },
        {
            title: 'Color',
            dataIndex: 'colorName',
        },
        {
            title: 'Indent Quantity',
            dataIndex: 'indentQuantity',
        },
        {
            title: 'PO Quantity',
            dataIndex: 'poQuantity',
        },
        {
            title: 'UOM',
            dataIndex: 'quantityUom',
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
            fixed:'right',
            render: (text: any, rowData: any, index: any) => {
                console.log(rowData)
                return (<span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    setEditForm(rowData, index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />

                    <Tooltip placement="top" title='delete'>
                        <Tag >
                            <Popconfirm title='Sure to delete?'
                                onConfirm={e => { deleteData(index); }}
                            >
                                <MinusCircleOutlined

                                    style={{ color: '#1890ff', fontSize: '14px' }} />
                            </Popconfirm>
                        </Tag>
                    </Tooltip>
                </span>
                )
        }
        }
    ]


    const samplecolumns: ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
            title: 'Sample Request No',
            dataIndex: 'sampleReqNo',
        },
        {
            title: 'M3 Fabric Code',
            dataIndex: 'itemCode',
            // width: '170px',
            render:(text,row)=>{
                console.log(row)
                return <>{`${row.itemCode}-${row.description}`}</>
            }
        },
        {
            title: 'Color',
            dataIndex: 'colorName',
        },
        {
            title: 'Sample Quantity',
            dataIndex: 'sampleQuantity',
        },
        {
            title: 'PO Quantity',
            dataIndex: 'poQuantity',
        },
        {
            title: 'UOM',
            dataIndex: 'quantityUom',
            render:(text,row)=>{
                return <>{row.uom ? row.uom : text}</>
            }
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
                                    setEditForm(rowData, index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    <Tooltip placement="top" title='delete'>
                        <Tag >
                            <Popconfirm title='Sure to delete?'
                                onConfirm={e => { deleteData(index); }}
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

    const deleteData = (index: any) => {
        tableData = [...fabricTableData]
        tableData.splice(index, 1)
        props(tableData)
        setFabricTableData(tableData)
        if (tableData.length == 0) {
            setFabricTableVisible(false)
        }
    }

    const onFabricAdd = (values) => {
        console.log(values);
        console.log(fabricTableData);
        values.materialType = defaultFabricFormData.materialType
        fabricForm.validateFields().then(() => {
            if (fabricIndexVal !== undefined) {
                fabricTableData[fabricIndexVal] = values;
                tableData = [...fabricTableData]
                setFabricIndexVal(undefined)
            } else {
                tableData = [...fabricTableData, values]
            }
            setFabricTableData(tableData)
            console.log(tableData)
            props(tableData)
            fabricForm.resetFields()
            setUpdate(false)
            setInputDisable(false)
            setFabricTableVisible(true)
        })
    }
    useEffect(() => {
        if (data.length != 0) {
            fabricForm.setFieldsValue({ m3FabricCode: data.data.m3StleNo })
            fabricForm.setFieldsValue({ colourId: data.data.colourId })
            fabricForm.setFieldsValue({ poQuantity: data.data.requiredQuantity })
        }
    }, [data])

    const m3FabricOnchange = (value, option) => {
        fabricForm.setFieldsValue({ itemCode: option?.name })
    }

    const quantityUomOnchange = (value, option) => {
        fabricForm.setFieldsValue({ quantityUom: option?.name })
    }

    const quantiyOnchange = (value) => {
    }

    let totalUniPrice ;
    const unitPriceOnchange = (value) => {
        console.log(fabricForm.getFieldValue('poQuantity'))
        const unitPrice=fabricForm.getFieldValue('poQuantity')
        totalUniPrice=Number(unitPrice)*Number(value)
        setDiscountVisible(false)
        setTotalUnit(totalUniPrice)
    }

    let disAmount
    let totalValueAfterDiscount
    function discountOnChange(value) {
       const percent=(Number(value/100))
        const disAmount=(percent*totalUnit)
        fabricForm.setFieldsValue({discountAmount:disAmount})
        totalValueAfterDiscount=totalUnit-disAmount
        setTaxVisible(false)
    }

    const finalCalculation=()=>{
        let taxAmount=0;
        let discAmnt=0;
        const unitPrice=fabricForm.getFieldValue('unitPrice');
        const quantity=fabricForm.getFieldValue('poQuantity')
        let transportation=fabricForm.getFieldValue('transportation')
        if(transportation==undefined ||transportation==0){
            transportation=0;
        }
        console.log('Transportation')
        console.log(transportation)
        let baseValue=Number(unitPrice)*Number(quantity);
        const disc_per=fabricForm.getFieldValue('discount')
        if(disc_per!==''&&disc_per>0){
            discAmnt=baseValue*disc_per/100;
            baseValue=Number(baseValue)-Number(discAmnt);
        }
        console.log('Tax Percentage')
        console.log(taxPer)
        console.log(baseValue)
        if(taxPer!=0){
            taxAmount=(baseValue*taxPer/100)
        }else{
            taxAmount=0
        }
        
        console.log('TaxAmount + base+transport');
        console.log(taxAmount+' B '+baseValue+' T '+transportation)
       
        const totalAmount=Number(taxAmount)+Number(baseValue)+Number(transportation)
        fabricForm.setFieldsValue({taxAmount:Number(taxAmount).toFixed(2)})
        fabricForm.setFieldsValue({discountAmount:Number(discAmnt).toFixed(2)})
        fabricForm.setFieldsValue({subjectiveAmount:totalAmount>0?Number(totalAmount).toFixed(2):0})
        // fabricForm.setFieldsValue({ taxAmount: taxAmount })
       
        setTaxAmountVisible(false)        
    }
    const priceCalculation = async (value, option) => {        
        console.log(option.name)
        const percent=Number(option.name)
        
        let status= await setTaxPer(Number(option.name));
        fabricForm.setFieldsValue({ taxPercentage: option?.name ? option.type + '- ' + option?.name : '' })
        // console.log(taxPer)
        // finalCalculation();
    }
    useEffect(() =>{
        finalCalculation();
    },[taxPer])
    return (
        <Card title={<span style={{ color: 'blue', fontSize: '17px' }} >Fabric Details</span>}>
            <Form form={fabricForm} layout="vertical" onFinish={onFabricAdd}>
                <Row gutter={24}>
                    <Form.Item name='colorName' hidden><Input ></Input></Form.Item>
                    <Form.Item name='indentQuantity' hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentFabricId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'itemCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'description'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'fabricCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'quantityUom'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'samplereFabId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'sampleReqNo'} hidden><Input></Input></Form.Item>
                    <Form.Item name='taxPercentage' hidden ><Input/></Form.Item>
                    <Form.Item name='sampleQuantity' hidden ><Input/></Form.Item>
                    <Form.Item name='sampleReqId' hidden ><Input/></Form.Item>
                    <Form.Item name='indentId' hidden ><Input/></Form.Item>
                    <Form.Item name = 'styleId' hidden><Input/></Form.Item>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 8 }}>
                        <Form.Item name='m3FabricCode' label='M3 Fabric Code' rules={[{ required: true, message: 'M3 Code is required' }]}>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code' onChange={m3FabricOnchange}disabled={inputDisbale}>
                                {fabricM3Code.map(e => {
                                    return (
                                        <Option key={e.m3ItemsId} value={e.m3ItemsId} name={e.itemCode}> {e.itemCode + "-" + e.description}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item name='shahiFabricCode' label='Shahi Fabric Code' style={{ display: 'none' }}
                        >
                            <Input hidden />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name='colourId' label='Color'>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Color'
                                onChange={colorOnchange}
                                disabled={inputDisbale}
                            >
                                {color.map(e => {
                                    return (
                                        <Option type={e.colour} key={e.colourId} value={e.colourId} name={e.colour}> {e.colour}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='poQuantity' label='PO Quantity'
                            rules={[{ required: true, message: 'Quantity is required' }]}
                        >
                            <Input placeholder="Enter Quantity" onChange={(e) => quantiyOnchange(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{ marginTop: '2%' }}>
                        <Form.Item name='quantityUomId' rules={[{ required: true, message: 'Quantity unit is required' }]}>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Unit' onChange={finalCalculation}>
                                {uom.map(e => {
                                    return (
                                        <Option key={e.uomId} value={e.uomId} name={e.uom}>{e.uom}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                        <Form.Item name='unitPrice' label='Unit Price'
                            rules={[{ required: true, message: 'unit price is required' }]}
                        >
                            <InputNumber style={{ width: '90px' }} placeholder="unit price" onChange={(e) => finalCalculation()} min={0}/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{paddingLeft:'41px'}}>
                        <Form.Item name='discount' label='Discount(%)'
                            rules={[{ required: false, message: 'Discount is required' }]}
                        >
                            <InputNumber  placeholder="discount" onChange={(e) => finalCalculation()} min={0}/>
                        </Form.Item>
                    </Col>
                    
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='discountAmount' label='Discount Amount'
                            rules={[{ required: false, message: 'Discount is required' }]}
                        >
                            <Input disabled placeholder="discount amount" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='tax' label='Tax Percentage(%)'
                            rules={[{ required: true, message: 'tax%  is required' }]}
                        >
                             <Select
                                placeholder="Select Tax"
                                onChange={priceCalculation}
                                allowClear
                                optionFilterProp="children"
                                // disabled={taxVisible}
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
                            <Input placeholder="Transportation" onChange={(e) => finalCalculation()} min={0} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='subjectiveAmount' label='Subjective Amount'
                            rules={[{ required: true, message: 'Subjective Amount is required' }]}
                        >
                            <Input disabled placeholder="Subjective amount" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                    {update ?
                        <Button type='primary' htmlType="submit">{update ? 'Update' : 'Add'}</Button> : <></>
                    }
                </Row>
                <Row>
                    {fabricTableVisible && <Table columns={tableColumns} dataSource={fabricTableData}  scroll={{x:true}} size="small"  bordered
                    />
                    }

                </Row>
            </Form>
        </Card>
    )

}
export default PurchaseOrderfabricForm