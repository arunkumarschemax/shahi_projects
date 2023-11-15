import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { M3MastersCategoryReq } from "@project-management-system/shared-models";
import { ColourService, IndentService, M3MastersService, SampleDevelopmentService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { VALUE_SPLIT } from "rc-cascader/lib/utils/commonUtil";
import React, { useEffect } from "react";
import { useState } from "react";

export const PurchaseOrderTrim = ({props,indentId}) =>{
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

    const [color,setColor] = useState<any[]>([])
    const colorService = new ColourService();
    const m3MasterService = new M3MastersService()
    const sampleService = new SampleDevelopmentService()
    const indentservice = new IndentService()
    const uomService =  new UomService()

    useEffect(() =>{
        getColor()
        getM3TrimCodes()
        getTrimType()
        getUom()
    },[])

    useEffect(() =>{
        if(indentId != undefined){
            indentTrimData(indentId)
        }
    },[indentId])

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
        console.log(value)
        trimForm.setFieldsValue({productGroup:option.name})
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
        const req = new M3MastersCategoryReq('Trim')
        m3MasterService.getByCategory(req).then(res => {
            if(res.status){
                setTrimM3Code(res.data)
            }
        })
    }

    const setEditForm = (rowData: any, index: any) => {
        console.log(rowData)
        if(rowData.indentTrmId != undefined){
            setInputDisable(true)
        }
        setUpdate(true)
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
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

    const columns : ColumnProps<any>[] =[
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Trim Type',
            dataIndex:'trimType',
            width:'100px'
        },
        {
            title:'Trim Code',
            dataIndex:'trimCodeName',
            width:'100px'
            
        },
        {
            title:'Color',
            dataIndex:'colourName',
            width:'100px'
        },
        {
            title:'Indent Quantity',
            dataIndex:'indentQuantity',
        },
        {
            title:'Po Quantity',
            dataIndex:'poQuantity',
            
        },
        {
            title:'M3 Trim Code',
            dataIndex:'m3TrimCode',
            width:'200px'
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
        trimForm.setFieldsValue({colourName:option.name?option.name:''})
    }
    
    const OnTrimAdd = (values) =>{
        console.log(values)
        trimForm.validateFields().then(() =>{
          if(trimIndexVal !== undefined){
            trimTableData[trimIndexVal] = values;
            tableData=[...trimTableData]
            setTrimIndexVal(undefined)
          }else{
            tableData=[...trimTableData,values]
            console.log(tableData)
          }
          setTrimTableData(tableData)
          props(tableData)
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
            trimForm.setFieldsValue({
                colourName: defaultTrimFormData.colourName,
                productGroup: defaultTrimFormData.productGroup,
                trimId: defaultTrimFormData.trimId,
                colourId : defaultTrimFormData.colourId,
                consumption : defaultTrimFormData.consumption,
                m3TrimCode: defaultTrimFormData.m3TrimCode,
                description: defaultTrimFormData.description,
                remarks: defaultTrimFormData.remarks,
                trimCodeName: defaultTrimFormData.trimCodeName,
                productGroupId: defaultTrimFormData.productGroupId,
                indentTrmId:defaultTrimFormData.indentTrmId,
                indentQuantity:defaultTrimFormData.indentQuantity,
                indentQuantityUnit:defaultTrimFormData.indentQuantityUnit,
                quantityUomId:defaultTrimFormData.quantityUomId,
                poQuantity:defaultTrimFormData.poQuantity
            })
        }

    },[defaultTrimFormData])

    return(
        <Card >
            <Form form={trimForm} layout="vertical" onFinish={OnTrimAdd} style={{width:'100%'}}>
                <Row gutter={24}>
                <Form.Item name={'productGroup'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'trimCodeName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'colourName'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentTrmId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantity'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'indentQuantityUnit'} hidden><Input></Input></Form.Item>

                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'productGroupId'} label={'Trim type'}
                         rules={[
                            {
                              required: true,
                              message: "Trim Type Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}
                        >
                            <Select
                             allowClear
                             showSearch
                             optionFilterProp="children"
                             placeholder="Select TrimType"
                             onChange={TrimTypeOnchange}
                             disabled={inputDisable}
                            >
                            {trimType.map((item) =>{
                                return (<Option name={item.productGroup} key={item.productGroupId} value
                                ={item.productGroupId}>{item.productGroup}</Option>)
                            }) }
                            </Select>
                            {/* <Input></Input> */}
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="trimId"
                        label="Trim"
                        rules={[
                            {
                                required: true,
                                message: "Trim Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}>
                            <Select
                             allowClear
                             showSearch
                             optionFilterProp="children"
                             placeholder="Select Trim"
                             onChange={trimCodeOnchange}
                             disabled={inputDisable}
                            >
                            {trimCode.map((item) =>{
                                return (<Option type={item.trimCode} name={item.trimCode} key={item.trimId} value
                                ={item.trimId}>{item.trimCode}</Option>)
                            }) }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
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
                    </Col>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2.8%'}}>
                    <Form.Item name='quantityUomId'  rules={[{required:true,message:'Quantity unit is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            {uom.map(e => {
                                return(
                                    <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'indentQuantity'} label={'Indent Quantity'}>
                            <Input disabled={inputDisable}></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='m3TrimCode' label='M3 Trim Code' rules={[{required:true,message:'M3 code is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'
                             disabled={inputDisable}
                             >
                            {trimM3Code.map(e => {
                                return(
                                    <Option key={e.m3Code} value={e.m3Code}> {e.m3Code}-{e.category}</Option>
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
                {trimtableVisible ? <Table columns={columns} dataSource={trimTableData}
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