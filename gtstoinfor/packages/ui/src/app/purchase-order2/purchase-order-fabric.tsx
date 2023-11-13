import { EditOutlined, EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons"
import { M3MastersCategoryReq } from "@project-management-system/shared-models"
import { ColourService, FabricTypeService, FabricWeaveService, M3MastersService, ProfitControlHeadService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Space, Tag, Tooltip, message } from "antd"
import Table, { ColumnProps } from "antd/es/table"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const PurchaseOrderfabricForm =({props}) =>{
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

    const [page, setPage] = React.useState(1);
    const {Option}=Select
    const weaveService = new FabricWeaveService()
    const uomService =  new UomService()
    const m3MasterService = new M3MastersService()
    const colorService = new ColourService();
    const pchService = new ProfitControlHeadService()
    const fabricTypeService = new FabricTypeService()
    let tableData: any[] = []


    useEffect(() =>{
        getweave()
        getUom()
        getM3FabricCodes()
        getColor()
        getPCH()
        getFabricType()
    },[])

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
    const getM3FabricCodes = () => {
        const req = new M3MastersCategoryReq('Fabric')
        m3MasterService.getByCategory(req).then(res => {
            if(res.status){
                setFabricM3Code(res.data)
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

    const fabrictyprOnchange = (value,option) =>{
        console.log(option.type)
        fabricForm.setFieldsValue({fabricTypeName:option?.type?option.type:''})
    }
    const colorOnchange = (value,option) =>{
        console.log(option.type)
        fabricForm.setFieldsValue({colorName:option?.type?option.type:''})
    }
    const weaveOnchange = (value,option) =>{
        console.log(option.type)
        fabricForm.setFieldsValue({weaveName:option?.type?option.type:''})
    }
    const pchOnchange = (value,option) =>{
        console.log(option.type)
        fabricForm.setFieldsValue({pchName:option?.type?option.type:''})
    }

    const setEditForm = (rowData: any, index: any) => {
        setUpdate(true)
        setDefaultFabricFormData(rowData)
        setFabricIndexVal(index)
    }

    useEffect(() => {
        if(defaultFabricFormData){
            fabricForm.setFieldsValue({
                content: defaultFabricFormData.content,
                fabricTypeId: defaultFabricFormData.fabricTypeId,
                weaveId: defaultFabricFormData.weaveId,
                weight : defaultFabricFormData.weight,
                weightUnit : defaultFabricFormData.weightUnit,
                width: defaultFabricFormData.width,
                construction: defaultFabricFormData.construction,
                yarnCount: defaultFabricFormData.yarnCount,
                yarnUnit: defaultFabricFormData.yarnUnit,
                finish : defaultFabricFormData.finish,
                shrinkage : defaultFabricFormData.shrinkage,
                m3FabricCode: defaultFabricFormData.m3FabricCode,
                colourId : defaultFabricFormData.colourId,
                pch  : defaultFabricFormData.pch,
                moq  : defaultFabricFormData.moq,
                colorName:defaultFabricFormData.colorName,
                weaveName:defaultFabricFormData.weaveName,
                fabricTypeName:defaultFabricFormData.fabricTypeName,
                pchName:defaultFabricFormData.pchName,
                shahiFabricCode:defaultFabricFormData.shahiFabricCode

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
            title:'Content',
            dataIndex:'content',
            width:'100px'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricTypeName',
            width:'130px'
            
        },
        {
            title:'Weave',
            dataIndex:'weaveName',
            width:'130px'
        },
        {
            title:'Weight',
            dataIndex:'weight',
            width:'100px'

        },
        {
            title:'Width',
            dataIndex:'width',
            width:'100px'
        },
        {
            title:'Construction',
            dataIndex:'construction',
            width:'100px'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount',
            width:'100px'
        },
        {
            title:'Finish',
            dataIndex:'finish',
            width:'100px'
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage',
            width:'100px'
        },
        {
            title:'M3 Fabric Code',
            dataIndex:'m3FabricCode',
            width:'170px'
        },
        {
            title:'Color',
            dataIndex:'colorName',
        },
        {
            title:'PCH',
            dataIndex:'pchName',
            width:'100px'
        },
        {
            title:'MOQ',
            dataIndex:'moq',
            width:'100px'
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
    
    const onFabricAdd=(values) =>{
        console.log(values)
        fabricForm.validateFields().then(() =>{
            console.log(fabricIndexVal)
            if(fabricIndexVal !== undefined){
                fabricTableData[fabricIndexVal] = values;
                tableData = [...fabricTableData]
                setFabricIndexVal(undefined)
            } else{
                tableData = [...fabricTableData,values]
            }
            setFabricTableData(tableData)
            props(tableData)
            fabricForm.resetFields()
            setUpdate(false)
            setFabricTableVisible(true)
        }).catch(() => {
            message.error('Please fill all required fields')

        })
    }

    return (
    <Card>
       <Form form={fabricForm} layout="vertical" onFinish={onFabricAdd}>
        <Row gutter={24}>
            <Form.Item name='colorName' hidden><Input ></Input></Form.Item>
            <Form.Item name='weaveName' hidden><Input ></Input></Form.Item>
            <Form.Item name='fabricTypeName' hidden><Input ></Input></Form.Item>
            <Form.Item name='pchName' hidden><Input ></Input></Form.Item>


         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='content' label='Content' >
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content'>
                        <Option key='naturalFabrics' value='naturalFabrics'>Natural Fabrics</Option>
                            <Option key='manufacturedFabrics' value='manufacturedFabrics'>Manufactured Fabrics</Option>
                        </Select>
                    </Form.Item>
         </Col>
         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='fabricTypeId' label='Type of Fabric' rules={[{required:true,message:'Type of Fabric is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Fabric Type'
                        onChange={fabrictyprOnchange}
                        >
                            {fabricType.map(e => {
                                    return(
                                        <Option type={e.fabricTypeName} key={e.fabricTypeId} value={e.fabricTypeId} name={e.fabricTypeName}> {e.fabricTypeName}</Option>
                                    )
                                })}
                            </Select>
                    </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weaveId' label='Weave'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select weave'
                        onChange={weaveOnchange}>
                        {weave.map(e => {
                                return(
                                    <Option type={e.fabricWeaveName} key={e.fabricWeaveId} value={e.fabricWeaveId} name={e.fabricWeaveName}> {e.fabricWeaveName}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
         </Col>
         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weight' label='Weight'>
                        <Input placeholder="Enter Weight"/>
                    </Form.Item>
         </Col>
        
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
            <Form.Item name='yarnCount' label='Yarn Count'
             rules={[
                {
                  required: true,
                  message: "YarnCount Is Required",
                }
               ]}
               >
                <Input placeholder="Enter Yarn Count"/>
            </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
            <Form.Item name='yarnUnit'  rules={[
                            {
                              required: true,
                              message: "Uom Type Is Required",
                            }
                        ]}>
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
            <Form.Item name='width' label='Width'>
                <Input placeholder="Enter Width"/>
            </Form.Item>
          </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
           <Form.Item name='finish' label='Finish'>
               <Input placeholder="Enter Finish"/>
           </Form.Item>
           </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
           <Form.Item name='shrinkage' label='Shrinkage'>
               <Input placeholder="Enter Shrinkage"/>
           </Form.Item>
           </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
           <Form.Item name='m3FabricCode' label='M3 Fabric Code' rules={[{required:true,message:'M3 Code is required'}]}>
           <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'>
              {fabricM3Code.map(e => {
                return(
                 <Option key={e.m3Code} value={e.m3Code}> {e.m3Code}-{e.category}</Option>
                       )
                      })}
                  </Select>
                 </Form.Item>
                </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                       <Form.Item name='shahiFabricCode' label='Shahi Fabric Code' rules={[{required:true,message:'M3 Code is required'}]}>
                        <Input/>
                       </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='colourId' label='Color'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Color'
                        onChange={colorOnchange}
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
                    <Form.Item name='construction' label='Construction(EPI XPPI)'>
                        <Input placeholder="Enter Construction"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='pch' label='PCH'>
                         <Select showSearch allowClear optionFilterProp="children" placeholder='Select PCH' 
                         onChange={pchOnchange}
                         >
                         {pch.map(e => {
                                return(
                                    <Option type={e.profitControlHead} key={e.profitControlHeadId} value={e.profitControlHeadId} name={e.profitControlHead}> {e.profitControlHead}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='moq' label='MOQ'
                    >
                        <Input placeholder="Enter MOQ"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='remarks' label='Remarks'
                    >
                        <Input placeholder="Enter Remarks"/>
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row justify={'end'}>
                    <Button type='primary' htmlType="submit">{update ?'Update':'Add'}</Button>
                </Row>
                <Row>
                    {fabricTableVisible ? <Table columns={columns} dataSource={fabricTableData}
                    //  scroll={{x:'max-content'}}
                     />
                :<></>}

                </Row>
        </Form> 
    </Card>
    )

}
export default PurchaseOrderfabricForm