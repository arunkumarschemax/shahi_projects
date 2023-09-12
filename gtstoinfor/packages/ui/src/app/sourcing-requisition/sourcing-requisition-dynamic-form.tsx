import { Button, Card, Col, DatePicker, Divider, Form, Input, Popconfirm, Row, Segmented, Select, Space, Table, Tag, Tooltip } from "antd"
import { ColumnProps } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react"
import { BuyersService, ColourService, FabricWeaveService, ProfitControlHeadService, SizeService, StyleService, VendorsService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { SourcingRequisitionReq } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";


const {Option} = Select;


export const SourcingRequisitionDynamicForm = () => {
    const [tabName,setTabName] = useState<string>('Fabric')
    const [page, setPage] = React.useState(1);
    const [fabricTableData,setFabricTableData] = useState<any[]>([])
    const [fabricForm] = Form.useForm()
    const colorService = new ColourService();
    const [color,setColor] = useState<any[]>([])
    const [fabricColor,setFabricColor] = useState<string>('')
    const pchService = new ProfitControlHeadService()
    const [pch,setPch] = useState<any[]>([])
    const [fabricPch,setFabricPch] = useState<string>('')
    const supplierService = new VendorsService()
    const [supplier,setSupplier] = useState<any[]>([])
    const [fabricSupplier,setFabricSupplier] = useState<string>('')
    const buyerService = new BuyersService()
    const [buyer,setBuyer] = useState<any[]>([])
    const [fabricBuyer,setFabricBuyer] = useState<string>('')
    const navigate = useNavigate()
    const weaveService = new FabricWeaveService()
    const [weave,setWeave] = useState<any[]>([])
    const [fabricWeave,setFabricWeave] = useState<string>('')
    const [defaultFabricFormData, setDefaultFabricFormData] = useState<any>(undefined);
    const [fabricIndexVal, setFabricIndexVal] = useState(undefined);
    const [sourcingForm] = Form.useForm()
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])
    const [fabricTableVisible,setFabricTableVisible] = useState<boolean>(false)
    const [trimsTableData,setTrimsTableData] = useState<any[]>([])
    const [trimTableVisible,setTrimTableVisible] = useState<boolean>(false)
    const [defaultTrimFormData, setDefaultTrimFormData] = useState<any>(undefined);
    const [trimIndexVal, setTrimIndexVal] = useState(undefined);
    const [size,setSize] = useState<any[]>([])
    const [trimForm] = Form.useForm()
    const [trimColor,setTrimColor] = useState<string>('')
    const [trimSize , setTrimSize] = useState<string>('')
    const sizeService = new SizeService()



    let tableData: any[] = []


    useEffect(()=>{
        getColor()
        getPCH()
        getSupplier()
        getBuyer()
        getweave()
        getStyle()
        getSize()
    },[])

    const getColor = () => {
        colorService.getAllActiveColour().then(res =>{
            if(res.status) {
                setColor(res.data)
            }
        })
    }

    const getPCH = () => {
        pchService.getAllActiveProfitControlHead().then(res =>{
            if(res.status) {
                setPch(res.data)
            }
        })
    }

    const getSupplier = () => {
        supplierService.getAllActiveVendors().then(res =>{
            if(res.status) {
                setSupplier(res.data)
            }
        })
    }

    const getBuyer = () => {
        buyerService.getAllActiveBuyers().then(res =>{
            if(res.status) {
                setBuyer(res.data)
            }
        })
    }

    const getweave = () => {
        weaveService.getAllActiveFabricWeave().then(res =>{
            if(res.status) {
                setWeave(res.data)
            }
        })
    }

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }

    const getSize = () => {
        sizeService.getAllActiveSize().then(res =>{
            if(res.status) {
                setSize(res.data)
            }
        })
    }


    const onSegmentChange = (val) => {
        setTabName(val)
    }

    const setEditForm = (rowData: any, index: any) => {
        setDefaultFabricFormData(rowData)
        setFabricIndexVal(index)
    }

    const editForm = (rowData : any , index:any) =>{
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
    }

    const deleteData = (index:any) => {
    tableData = [...fabricTableData]
    tableData.splice(index,1)
    setFabricTableData(tableData)
    if (tableData.length == 0) {
        setFabricTableVisible(false)
    }
    }

    const deleteTrim = (index:any) => {
        tableData = [...trimsTableData]
        tableData.splice(index,1)
        setTrimsTableData(tableData)
        if (tableData.length == 0) {
            setTrimTableVisible(false)
        }
    }

    useEffect(() => {
        if(defaultFabricFormData){
            fabricForm.setFieldsValue({
                content: defaultFabricFormData.content,
                fabricType: defaultFabricFormData.fabricType,
                weave: defaultFabricFormData.weave,
                weight : defaultFabricFormData.weight,
                weightUnit : defaultFabricFormData.weightUnit,
                width: defaultFabricFormData.width,
                construction: defaultFabricFormData.construction,
                yarnCount: defaultFabricFormData.yarnCount,
                yarnUnit: defaultFabricFormData.yarnUnit,
                finish : defaultFabricFormData.finish,
                shrinkage : defaultFabricFormData.shrinkage,
                color : defaultFabricFormData.color,
                pch  : defaultFabricFormData.pch,
                moq  : defaultFabricFormData.moq,
                moqUnit  : defaultFabricFormData.moqUnit,
                season  : defaultFabricFormData.season,
                moqPrice  : defaultFabricFormData.moqPrice,
                supplier  : defaultFabricFormData.supplier,
                grnDate  : dayjs(defaultFabricFormData.grnDate),
                buyer  : defaultFabricFormData.buyer,
                xlNo  : defaultFabricFormData.xlNo,
                qunatity  : defaultFabricFormData.qunatity,
            })
        }

    },[defaultFabricFormData])


    useEffect(()=>{
        if(defaultTrimFormData){
            trimForm.setFieldsValue({
                trimType : defaultTrimFormData.trimType,
                trimCode : defaultTrimFormData.trimCode,
                size : defaultTrimFormData.size,
                color : defaultTrimFormData.color,
                quantity : defaultTrimFormData.quantity,
                description : defaultTrimFormData.description,
                remarks : defaultTrimFormData.remarks
            })
        }
    },[defaultTrimFormData])

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Content',
            dataIndex:'content'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricType',
            
        },
        {
            title:'Weave',
            dataIndex:'weave',
            
        },
        {
            title:'Weight',
            dataIndex:'weight',
        },
        {
            title:'Width',
            dataIndex:'width'
        },
        {
            title:'Construction',
            dataIndex:'construction'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount'
        },
        {
            title:'Finish',
            dataIndex:'finish',
          //   sorter: (a, b) => a.finish.length - b.finish.length,
          // sortDirections: ['descend', 'ascend'],
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage',
        },
        {
            title:'Color',
            dataIndex:'color',
            render: (text,record) => {
                return(
                    <>
                    {record.color ? fabricColor : '-'}
                    </>
                )
            }
            
        },
        {
            title:'PCH',
            dataIndex:'pch',
            render: (text,record) => {
                return(
                    <>
                    {record.pch ? fabricPch : '-'}
                    </>
                )
            }
            
        },
        {
            title:'MOQ',
            dataIndex:'moq'
        },
        {
            title:'Season',
            dataIndex:'season',
            
        },
        {
            title:'MOQ Price',
            dataIndex:'moqPrice'
        },
        {
            title:'Supplier',
            dataIndex:'supplier',
            render: (text,record) => {
                return(
                    <>
                    {record.supplier ? fabricSupplier : '-'}
                    </>
                )
            }
            
        },
        {
            title:'GRN Date',
            dataIndex:'grnDate',
            render:(text,record) => {
                const date = new Date(record.grnDate)
                return(
                    <>
                    {record.grnDate ? moment(date).format('YYYY-MM-DD') : '-'}
                    </>
                )
            }
        },
        {
            title:'Buyer',
            dataIndex:'buyer',
            render: (text,record) => {
                return(
                    <>
                    {record.buyer ? fabricBuyer : '-'}
                    </>
                )
            }
            
        },
        {
            title:'XL No',
            dataIndex:'xlNo'
        },
         {
            title:'Quantity',
            dataIndex:'quantity'
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text: any, rowData: any, index: any) => (
                <span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                        {/* <Popconfirm title='Sure to Edit?' onConfirm={e =>{setEditForm(rowData,index);}}> */}

                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    setEditForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        {/* </Popconfirm> */}
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' onConfirm={e =>{deleteData(index);}}>
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]

    const columnsSkelton: any = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
          title: 'Trim Type',
          dataIndex: 'trimType',
        },
        {
          title: 'Trim Code',
          dataIndex: 'trimCode',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          render: (text,record) => {
            return(
                <>
                {record.size ? trimSize : '-'}
                </>
            )
        }
        },
        {
          title: 'Color',
          dataIndex: 'color',
            render: (text,record) => {
              return(
                  <>
                  {record.color ? trimColor : '-'}
                  </>
              )
          }
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
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
                                    editForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' onConfirm={e =>{deleteTrim(index);}}>
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]



    const onFabricAdd = (values) => {
        if(fabricIndexVal !== undefined){
            console.log(fabricIndexVal)
            fabricTableData[fabricIndexVal] = values;
            tableData = [...fabricTableData]
            setFabricIndexVal(undefined)
        } else{
            tableData = [...fabricTableData,values]
        }
        setFabricTableData(tableData)
        fabricForm.resetFields()
        setFabricTableVisible(true)
    }

    const onTrimAdd = (values) => {
        if(trimIndexVal !== undefined){
            console.log(trimIndexVal)
            trimsTableData[trimIndexVal] = values;
            tableData = [...trimsTableData]
            setTrimIndexVal(undefined)
        } else{
            tableData = [...trimsTableData,values]
        }
        setTrimsTableData(tableData)
        trimForm.resetFields()
        setTrimTableVisible(true)
        console.log(values,'namaste')
    }


    const onFabricColorChange = (val,option) => {
        setFabricColor(option?.name)
    }

    const onPCHChange = (val,option) => {
        setFabricPch(option?.name)
    }

    const onSupplierChange = (val,option) => {
        setFabricSupplier(option?.name)
    }

    const onBuyerChange = (val,option) => {
        setFabricBuyer(option?.name)
    }

    const onColorChange = (val,option) => {
        setTrimColor(option?.name)
    }

    const onSizeChange = (val, option) => {
    const selectedSize = option?.name || ''; // Ensure a fallback value
    setTrimSize(selectedSize);
}

    const onReset = () => {
        setFabricTableVisible(false)
        fabricForm.resetFields()
        sourcingForm.resetFields()
        trimForm.resetFields()
    }

    const onSubmit = () =>{
        const req = new SourcingRequisitionReq(sourcingForm.getFieldValue('style'),fabricTableData,trimsTableData)
        console.log(req)
    }


    return(
        <Card title='Sourcing Requisition' className="card-header">
            <Form form={sourcingForm}>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='style' label='Style' rules={[{required:true,message:'Style is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style'>
                            {style.map(e => {
                                return(
                                    <Option key={e.styleId} value={e.styleId} name={e.style}> {e.style}-{e.description}</Option>
                                )
                            })}
                        </Select>
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
                    <div>
                        {
                            tabName === 'Fabric' ? (<>
                            <Card>
                                <Form layout="vertical" onFinish={onFabricAdd} form={fabricForm}>
                    <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>FABRIC DETAILS</h1>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='content' label='Content' rules={[{required:true,message:'Content is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content'>
                        <Option key='naturalFabrics' value='naturalFabrics'>Natural Fabrics</Option>
                            <Option key='manufacturedFabrics' value='manufacturedFabrics'>Manufactured Fabrics</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='fabricType' label='Type of Fabric'>
                        <Input placeholder="Enter Fabric Type"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weave' label='Weave'  rules={[{required:true,message:'Weave is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select weave'>
                        {weave.map(e => {
                                return(
                                    <Option key={e.fabricWeaveId} value={e.fabricWeaveId} name={e.fabricWeaveName}> {e.fabricWeaveName}</Option>
                                )
                            })}
                        </Select>
                        {/* <Input placeholder="Enter Weave"/> */}
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weight' label='Weight'  rules={[{required:true,message:'Weight is required'}]}>
                        <Input placeholder="Enter Weight"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='weightUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='kg' value='kg'>
                                Kg
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='width' label='Width'>
                        <Input placeholder="Enter Width"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='construction' label='Construction(EPI XPPI)'  rules={[{required:true,message:'Construction is required'}]}>
                        <Input placeholder="Enter Construction"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='yarnCount' label='Yarn Count'  rules={[{required:true,message:'Yarn Count is required'}]}>
                        <Input placeholder="Enter Yarn Count"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='yarnUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='tex' value='tex'>TEX</Option>

                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='finish' label='Finish'  rules={[{required:true,message:'Finish is required'}]}>
                        <Input placeholder="Enter Finish"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='shrinkage' label='Shrinkage'>
                        <Input placeholder="Enter Shrinkage"/>
                    </Form.Item>
                    </Col>
                </Row>
                {/* <Row gutter={24}>
                    <h1 style={{ color: '#6b54bf', fontSize: '20px', textAlign: 'left' }}>ITEM DETAILS</h1>
                </Row> */}
                    <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>ITEM DETAILS</h1>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='color' label='Color'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content' onChange={onFabricColorChange}>
                            {color.map(e => {
                                return(
                                    <Option key={e.colourId} value={e.colourId} name={e.colour}> {e.colour}</Option>
                                )
                            })}
                        </Select>
                        {/* <Input placeholder="Enter Color"/> */}
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='pch' label='PCH'>
                         <Select showSearch allowClear optionFilterProp="children" placeholder='Select PCH' onChange={onPCHChange}>
                         {pch.map(e => {
                                return(
                                    <Option key={e.profitControlHeadId} value={e.profitControlHeadId} name={e.profitControlHead}> {e.profitControlHead}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='moq' label='MOQ'>
                        {/* <Select showSearch allowClear optionFilterProp="children">
                            <Option key='content' value='content'>
                                Content
                            </Option>
                        </Select> */}
                        <Input placeholder="Enter MOQ"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='moqUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='pieces' value='pieces'>
                                Pieces
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='season' label='Season'>
                        {/* <Input placeholder="Enter Season"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='spring' value='spring'>Spring</Option>
                            <Option key='autumn' value='autumn'>Autumn</Option>
                            <Option key='summer' value='summer'>Summer</Option>
                            <Option key='winter' value='winter'>Winter</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='moqPrice' label='MOQ Price'>
                        <Input placeholder="Enter MOQ Price"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='moqPriceUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='inr' value='inr'>
                                INR
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='supplier' label='Supplier'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Supplier' onChange={onSupplierChange}>
                        {supplier.map(e => {
                                return(
                                    <Option key={e.vendorId} value={e.vendorId} name={e.vendorName}>{e.vendorCode}-{e.vendorName}</Option>
                                )
                            })} 
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='grnDate' label='GRN Date'>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='buyer' label='Buyer'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Buyer' onChange={onBuyerChange}>
                        {buyer.map(e => {
                                return(
                                    <Option key={e.buyerId} value={e.buyerId} name={e.buyerName}>{e.buyerCode}-{e.buyerName}</Option>
                                )
                            })} 
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='xlNo' label='XL No'>
                        <Input placeholder="Enter XL No"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='quantity' label='Quantity'>
                        <Input placeholder="Enter Quantity"/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                    <Button type='primary' htmlType="submit">Add</Button>
                </Row>
                </Form>
                </Card>
                {
                    fabricTableVisible ? (<>
                        <Table columns={columns} dataSource={fabricTableData} scroll={{x:'max-content'}}/>
                    </>) : (<></>)
                }
                {/* <Card>
                </Card> */}
                </>) : (<></>)}
            </div>
            <div>
                {tabName === 'Trim' ? (<>
                <Card title='Trim Details'>
                    <Form layout="vertical" onFinish={onTrimAdd} form={trimForm}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="trimType"
                        label="Trim Type"
                        rules={[
                            {
                              required: true,
                              message: "Trim Type Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}>
                            <Input placeholder="Enter Trim Type" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="trimCode"
                        label="Trim Code"
                        rules={[
                            {
                                required: true,
                                message: "Trim Code Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}>
                            <Input placeholder="Enter Trim Code" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="size"
                        label="Size"
                        rules={[{ required: true, message: "Please Select Size" }]}
                        >
                            <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Size"
                            onChange={onSizeChange}
                            >
                                {size.map((e) => {
                                  return (
                                    <Option key={e.sizeId} value={e.sizeId} name={e.size}>
                                  {e.size}
                                </Option>
                              );
                            })}
                            </Select>
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                            <Form.Item
                            name="color"
                            label="Color"
                            rules={[{ required: true, message: "Please Select Color" }]}
                        >
                            <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Color"
                            onChange={onColorChange}
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
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            {
                              required: true,
                              message: "Quantity Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}>
                            <Input placeholder="Enter Quantity" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                        <Form.Item
                        name="description"
                        label="Description"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Trim Description Is Required",
                        //     },
                        //     {
                        //         pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                        //         message: `Should contain only alphabets.`,
                        //     },
                        // ]}
                        >
                            <TextArea rows={1} placeholder="Enter Trim Description" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                        <Form.Item
                        name="remarks"
                        label="Remarks"
                        >
                            <TextArea rows={1} placeholder="Enter Remarks" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row justify={'end'}>
                        <Button type='primary' htmlType="submit">Add</Button>
                    </Row>
                    </Form>
                </Card>
                {
                    trimTableVisible ? (<>
                        <Table columns={columnsSkelton} dataSource={trimsTableData} scroll={{x:'max-content'}}/>
                    </>) : (<></>)
                }
                </>) : (<></>)}
            </div>
                        
                </Space>
                </Row>
                <Row justify={'end'}>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button type="primary" onClick={onSubmit}>Submit</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2}}>
                    <Button onClick={onReset}>Reset</Button>
                    </Col>

                </Row>
        </Card>
    )
}
export default SourcingRequisitionDynamicForm