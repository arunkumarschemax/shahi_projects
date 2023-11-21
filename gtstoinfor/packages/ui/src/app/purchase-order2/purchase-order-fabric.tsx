import { EditOutlined, EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons"
import { M3MastersCategoryReq } from "@project-management-system/shared-models"
import { ColourService, FabricTypeService, FabricWeaveService, IndentService, M3ItemsService, M3MastersService, M3StyleService, ProfitControlHeadService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Space, Tag, Tooltip, message } from "antd"
import Table, { ColumnProps } from "antd/es/table"
import { table } from "console"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const PurchaseOrderfabricForm =({props,indentId,data}) =>{
    const [fabricForm]=Form.useForm()
    const [weave,setWeave] = useState<any[]>([])
    const [uom,setUom] = useState<any[]>([])
    const [fabricM3Code,setFabricM3Code] = useState<any[]>([])
    const [color,setColor] = useState<any[]>([])
    const [pch,setPch] = useState<any[]>([])
    const [fabricTableData,setFabricTableData] = useState<any[]>([])
    const [fabricTableVisible,setFabricTableVisible] = useState<boolean>(false)
    const [fabricIndexVal, setFabricIndexVal] = useState(undefined);
    const [defaultFabricFormData, setDefaultFabricFormData] = useState<any>(undefined);
    const [update, setUpdate]=useState<boolean>(false)
    const [fabricType, setFabricType]= useState<any[]>([])
    const [inputDisbale, setInputDisable]= useState<boolean>(false)

    const [page, setPage] = React.useState(1);
    const {Option}=Select
    const weaveService = new FabricWeaveService()
    const uomService =  new UomService()
    const m3MasterService = new M3MastersService()
    const colorService = new ColourService();
    const pchService = new ProfitControlHeadService()
    const fabricTypeService = new FabricTypeService()
    const indentService = new IndentService()
    const [indentData, setIndentData]=useState<any[]>([])
    let tableData: any[] = []
    const m3StyleService = new M3StyleService()
    const m3ItemsService = new M3ItemsService()



    console.log(fabricTableVisible)
    console.log(data)

    useEffect(() =>{
        getweave()
        getUom()
        getColor()
        getPCH()
        getFabricType()
        getM3FabricStyleCodes()
    },[])


    useEffect(() =>{
        if(indentId != undefined){
            AllIndnetDetails(indentId)
        }
    },[indentId])

    const getM3FabricStyleCodes = () => {
        m3ItemsService.getM3Items().then(res => {
            if(res.status){
                setFabricM3Code(res.data)
            }
        })
    }

    const AllIndnetDetails = (value) =>{
        indentService.getAllIndentItemDetailsAgainstIndent({indentId:value}).then(res =>{
            if(res.status){
                console.log(res.data)
                message.info('Please Update Po Quantity')
                props(res.data)
                setFabricTableData(res.data)
                setFabricTableVisible(true)
            }else{
                setFabricTableData([])
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

    const getFabricType = () => {
        fabricTypeService.getAllActiveFabricType().then(res =>{
            if(res.status) {
                setFabricType(res.data)
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

  
    const colorOnchange = (value,option) =>{
        console.log(option.type)
        fabricForm.setFieldsValue({colorName:option?.type?option.type:''})
    }
    const setEditForm = (rowData: any, index: any) => {
        console.log(rowData)
        setUpdate(true)
        if(rowData.indentFabricId != undefined){
            setInputDisable(true)
            fabricForm.setFieldsValue({poQuantity:rowData.indentQuantity})
        }
        setDefaultFabricFormData(rowData)
        setFabricIndexVal(index)
    }

    useEffect(() => {
        if(defaultFabricFormData){
            console.log(defaultFabricFormData)
             fabricForm.setFieldsValue({
                m3FabricCode: defaultFabricFormData.m3FabricCode,
                colourId : defaultFabricFormData.colourId,
                colorName:defaultFabricFormData.colorName,
                shahiFabricCode:defaultFabricFormData.shahiFabricCode,
                poQuantity:defaultFabricFormData.indentQuantity,
                quantityUomId:defaultFabricFormData.quantityUomId,
                indentQuantity:defaultFabricFormData.indentQuantity,
                indentFabricId:defaultFabricFormData.indentFabricId,
                itemCode:defaultFabricFormData.itemCode,
                quantityUom:defaultFabricFormData.quantityUom
            })
        }

    },[defaultFabricFormData])

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'M3 Fabric Code',
            dataIndex:'itemCode',
            width:'170px'
        },
        {
            title:'Shahi Fabric Code',
            dataIndex:'shahiFabricCode',
            width:'170px'
        },
        
        {
            title:'Color',
            dataIndex:'colorName',
        },
        {
            title:'Indent Quantity',
            dataIndex:'indentQuantity',
        },
        {
            title:'PO Quantity',
            dataIndex:'poQuantity',
        },
        {
            title:'UOM',
            dataIndex:'quantityUom',
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
    
    const deleteData = (index:any) => {
        tableData = [...fabricTableData]
        tableData.splice(index,1)
        props(tableData)
        setFabricTableData(tableData)
        if (tableData.length == 0) {
            setFabricTableVisible(false)
        }
        }

    const onFabricAdd = (values) =>{
        console.log(values)
        fabricForm.validateFields().then(() =>{
          if(fabricIndexVal !== undefined){
            fabricTableData[fabricIndexVal] = values;
            tableData=[...fabricTableData]
            setFabricIndexVal(undefined)
          }else{
            tableData=[...fabricTableData,values]
            console.log(tableData)
          }
          setFabricTableData(tableData)
          props(tableData)
          fabricForm.resetFields()
          setUpdate(false)
          setInputDisable(false)
          setFabricTableVisible(true)
        })
    }
    useEffect(() =>{
        if(data.length != 0){
            fabricForm.setFieldsValue({m3FabricCode:data.data.m3StleNo})
            fabricForm.setFieldsValue({colourId:data.data.colourId})
            fabricForm.setFieldsValue({poQuantity:data.data.requiredQuantity})
        }
    },[data])
 
    const m3FabricOnchange = (value,option) =>{
        fabricForm.setFieldsValue({itemCode:option.name})
    }

    const quantityUomOnchange = (value,option) =>{
        console.log(value)
        console.log(option.name)
        fabricForm.setFieldsValue({quantityUom:option.name})
    }
    const quantiyOnchange = (value) =>{
        console.log(value)
        
    }
    return (
    <Card title={<span style={{color:'blue', fontSize:'17px'}} >Fabric Details</span>}>
       <Form form={fabricForm} layout="vertical" onFinish={onFabricAdd}>
        <Row gutter={24}>
            <Form.Item name='colorName' hidden><Input ></Input></Form.Item>
            <Form.Item name='indentQuantity' hidden><Input></Input></Form.Item>
            <Form.Item name={'indentFabricId'} hidden><Input></Input></Form.Item>
            <Form.Item name={'itemCode'} hidden><Input></Input></Form.Item>
            <Form.Item name={'quantityUom'} hidden><Input></Input></Form.Item>


                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='m3FabricCode' label='M3 Fabric Code' rules={[{required:true,message:'M3 Code is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'  onChange={m3FabricOnchange}>
                            {fabricM3Code.map(e => {
                                return(
                                    <Option key={e.m3ItemsId} value={e.m3ItemsId} name={e.itemCode}> {e.itemCode}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                       <Form.Item name='shahiFabricCode' label='Shahi Fabric Code'
                        >
                        <Input/>
                       </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='colourId' label='Color'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Color'
                        onChange={colorOnchange}
                        disabled={inputDisbale}
                         >
                            {color.map(e => {
                                return(
                                    <Option type={e.colour} key={e.colourId} value={e.colourId} name={e.colour}> {e.colour}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='poQuantity' label='PO Quantity'
                   rules={[{required:true,message:'Quantity of Fabric is required'}]}
                    >
                        <Input placeholder="Enter Quantity"   onChange={(e) => quantiyOnchange(e.target.value)}/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{marginTop:'2%'}}>
                    <Form.Item name='quantityUomId' rules={[{required:true,message:'Quantity unit is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit' onChange={quantityUomOnchange}>
                            {uom.map(e => {
                                return(
                                    <Option key={e.uomId} value={e.uomId} name={e.uom}>{e.uom}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row justify={'end'}>
                    <Button type='primary' htmlType="submit">{update ?'Update':'Add'}</Button>
                </Row>
                <Row>
                    {fabricTableVisible && <Table columns={columns} dataSource={fabricTableData}
                     />
                   }

                </Row>
        </Form> 
    </Card>
    )

}
export default PurchaseOrderfabricForm