import { RestOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { ComponentMappingFilterReq } from "@project-management-system/shared-models";
import { ComponentMappingService } from "@project-management-system/shared-services"
import { Button, Card, Col, Form, Row, Select, Table } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {Option} = Select;

export const ComponentMappingView = () => {
    const [page, setPage] = useState<number>(1);
    const [data,setData] = useState<any[]>([])
    const [tableData,setTableData] = useState<any[]>([])
    const service = new ComponentMappingService()
    const [styleInfo,setStyleInfo] = useState<any[]>([]);
    const [garmentCategoryInfo,setGarmentCategoryInfo] = useState<any[]>([])
    const [garmentInfo,setGarmentInfo] = useState<any[]>([])
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        getMappedComponents();
        getStyles();
        getGarmentCategories();
        getGarments();
    },[])

    const getStyles = () => {
        service.getStyleDropDown().then(res => {
            if(res.status){
                setStyleInfo(res.data)
            }
        })

    }

    const getGarmentCategories = () => {
        service.getGarmentCategoryDropDown().then(res => {
            if(res.status){
                setGarmentCategoryInfo(res.data)
            }
        })

    }

    const getGarments = () => {
        service.getGarmentDropDown().then(res => {
            if(res.status){
                setGarmentInfo(res.data)
            }
        })

    }

    const getMappedComponents = () =>{
        const req = new ComponentMappingFilterReq()
        if(form.getFieldValue('styleId') != undefined){
            req.styleId = form.getFieldValue('styleId')
        }
        if(form.getFieldValue('garmentCategoryId') != undefined){
            req.garmentCategoryId = form.getFieldValue('garmentCategoryId')
        }
        if(form.getFieldValue('garmentId') != undefined){
            req.garmentId = form.getFieldValue('garmentId')
        }
        service.getMappedComponents(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const columns: ColumnProps<any>[]  = [
        {
            title: <div style={{textAlign:'center'}}>S No</div>,
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            // align:'center',
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:<div style={{textAlign:'center'}}>Style</div>,
            dataIndex:'style',
            sorter: (a, b) => a.style.localeCompare(b.style),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:<div style={{textAlign:'center'}}>Garment Category</div>,
            dataIndex:'garmentCategory',
            sorter: (a, b) => a.garmentCategory.localeCompare(b.garmentCategory),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:<div style={{textAlign:'center'}}>Garment</div>,
            dataIndex:'garment',
            sorter: (a, b) => a.garment.localeCompare(b.garment),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:<div style={{textAlign:'center'}}>Components</div>,
            dataIndex:'component',
            
            render: (text, record) => {
                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {record.componentDeatils.map((component) => (
                      <Card key={component.componentName} style={{marginLeft:'1%',backgroundColor:'#FFDAB9'}} size='small'>
                        <p>{component.componentName}</p>
                      </Card>
                    ))}
                  </div>
                );
              },

            // render: (text, record) => {
            //     let array: any[]= [];
            //     record.componentDeatils.map((e:any) => {
            //         array = [...array,e.componentName]
            //     })
            //     console.log(array,'--------array')
            //     return (
            //         <>
            //         {array[0] != null ? <Card>{array.join(',')}</Card> : '-'}
            //         </>
            //     )
            // },
        },
    ]

    const onSearch = () => {
        getMappedComponents()
    }

    const onReset = () => {
        form.resetFields()
        getMappedComponents()
    }

    const onChange=(pagination, filters, sorter, extra)=> {
        console.log('params', pagination, filters, sorter, extra);
    }

    return(
        <Card title='Mapped Components' extra={<span><Button onClick={() => navigate('/style-management/component-mapping/component-mapping-form')} type="primary">New</Button></span>}>
            <Form form={form} onFinish={onSearch}>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Style' name='styleId'>
                        {/* <Input onChange={(val) => onStyleChange(val)}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Style'
                        >
                            {
                                styleInfo.map((e) => {
                                    return(
                                        <Option key={e.style} value={e.styleId}>{e.style}--{e.styleDescription}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                      <Form.Item label='Garment Category' name='garmentCategoryId'>
                        {/* <Input onChange={onGarmentCategoryChange}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Garment Category'
                        >
                            {
                                garmentCategoryInfo.map((e) => {
                                    return(
                                        <Option key={e.garmentCategory} value={e.garmentCategoryId}>{e.garmentCategory}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Garment' name='garmentId'>
                        {/* <Input onChange={onGarmentChange}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Garment'
                        >
                            {
                                garmentInfo.map((e) => {
                                    return(
                                        <Option key={e.garment} value={e.garmentId}>{e.garment}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col> 
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                      <Form.Item>
                        <Button icon={<SearchOutlined/>} htmlType="submit" type="primary">Search</Button>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                      <Form.Item>
                        <Button icon={<UndoOutlined/>} danger onClick={onReset}>Reset</Button>
                      </Form.Item>
                    </Col>
                </Row>

            </Form>
            <Table columns={columns} dataSource={data} size="small" bordered
            scroll={{ x: 'max-content' }}
            pagination={{
              onChange(current) {
                setPage(current);
              }
            }}
            onChange={onChange}
            />
        </Card>
    )

}
export default ComponentMappingView