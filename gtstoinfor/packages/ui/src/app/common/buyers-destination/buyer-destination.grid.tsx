import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { BuyersDestinationRequest } from "@project-management-system/shared-models"
import { BuyerDestinationService, DestinationService, SizeService } from "@project-management-system/shared-services"
import { Button, Row, Col, Select, Table,Form } from "antd"
import Card from "antd/es/card/Card"
import form from "antd/es/form"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BuyersDestinationGrid =() =>{
    const [form] = Form.useForm()
    const {Option}= Select;
    const [data,setData] = useState<any[]>([]);
    const [sizes,setSizes] = useState<any[]>([]);
    const [destinations,setDestinations] = useState<any[]>([])
    const navigate = useNavigate()
const [page, setPage] = useState<number>(1);
const sizeService = new SizeService()
const desService = new DestinationService()
const service = new BuyerDestinationService()

    useEffect(()=>{
        getSizes();
        getDestinations();
        getData();
    },[])
    
    const getSizes = ()=>{
        sizeService.getAllActiveSize().then(res=>{
            if(res.status){
                setSizes(res.data)
            }
            else{
                setSizes([])
            }
        })
    }
    const getDestinations = ()=>{
        desService.getAllActiveDestination().then(res=>{
            if(res.status){
                setDestinations(res.data)
            }
            else{
                setDestinations([])
            }
        })
    }
    const getData = ()=>{
        const request = new BuyersDestinationRequest()
        if(form.getFieldValue('sizeId') != undefined){
            request.sizeId = form.getFieldValue('sizeId')
        }
        if(form.getFieldValue('destinationId') != undefined){
            request.destinationId = form.getFieldValue('destinationId')
        }
        if(form.getFieldValue('colourId') != undefined){
            request.colourId = form.getFieldValue('colourId')
        }
        service.getAll(request).then(res=>{
            if(res.status){
                setData(res.data)
            }
            else{
                setData([])
            }
        })
    }
const columns: ColumnProps<any>[]  = [
    {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
        title:'Size',
        dataIndex:'size',
        sorter: (a, b) => a.size.localeCompare(b.size),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Destination',
        dataIndex:'destination',
        sorter: (a, b) => a.destination.localeCompare(b.destination),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Colour',
        dataIndex:'colour',
        sorter: (a, b) => a.colour.localeCompare(b.colour),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Buyers',
        dataIndex:'buyer',
        
        // render: (text, record) => {
        //     return (
        //       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        //         {record.componentDeatils.map((component) => (
        //           <Card key={component.componentName} style={{marginLeft:'1%',backgroundColor:'#FFDAB9'}} size='small'>
        //             <p>{component.componentName}</p>
        //           </Card>
        //         ))}
        //       </div>
        //     );
        //   },

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

    return(
        <Card size='small' title='Buyers Destination' extra={<span><Button onClick={() => navigate('/global/buyers-destination/buyers-destination-form')} type="primary">New</Button></span>}>
            <Form form={form} >
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Size' name='sizeId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Size'
                        >
                            {
                                sizes.map((e) => {
                                    return(
                                        <Option key={e.sizeId} value={e.sizeId}>{e.sizes}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                      <Form.Item label='Destination' name='destinationId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Destination'
                        >
                            {
                                destinations.map((e) => {
                                    return(
                                        <Option key={e.destinationId} value={e.destinationId}>{e.destination}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Colour' name='colourId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Colour'
                        >
                            {/* {
                                colour.map((e) => {
                                    return(
                                        <Option key={e.colour} value={e.colourId}>{e.colour}</Option>
                                    )
                                })
                            } */}
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
                        <Button icon={<UndoOutlined/>} danger>Reset</Button>
                      </Form.Item>
                    </Col>
                </Row>

            </Form>
            <Table columns={columns} dataSource={data} size="small" bordered/>
        </Card>
    )
}
export default BuyersDestinationGrid