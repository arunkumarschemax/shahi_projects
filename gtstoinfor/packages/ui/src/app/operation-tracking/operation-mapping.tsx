import { MinusCircleOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { OperationsRequest, SamplieMappingDto } from '@project-management-system/shared-models';
import { LocationsService, OperationInventoryService, SampleDevelopmentService, SizeService } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Input, Row, Select, Space, Table, message } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SampleInventoryLogEntity } from './../../../../services/common/src/app/sample-dev-request/entities/sample-inventory-log-entity';
import AlertMessages from '../common/common-functions/alert-messages';

export const OperationMapping = () => {
    const [data, setData] = useState<any[]>([])
    const [drop, setDrop] = useState<any[]>([])
    const [size, setSize] = useState<any[]>([])
    const services = new SizeService()
    const page = 1;
    let navigate = useNavigate();
    const service = new LocationsService()
    const service1 = new SampleDevelopmentService()
    const services1 = new OperationInventoryService()
    const { Option } = Select
    let Location = useLocation()
    const stateData = Location.state.data

console.log(stateData,'pppp');


    useEffect(() => {
        getLocation();
        getSize();
        getOperation();
    }, [])

    const getLocation = () => {
        service.getAllLocationDropDown().then(res => {
            if (res.status) {
                setDrop(res.data)
            }
        })
    }

    const getOperation =()=>{
        const req = new OperationsRequest(stateData?.[0])
        console.log(req,'ppppppp');
        
        services1.getOperationInverntoryData(req).then(res =>{
            if (res.status) {
                setData(res.data)
                console.log(res.data,'pppppppppppp');
                
            } 
        })
    }
    const getSize = () => {
        services.getAllSize().then(res => {
            if (res.status) {
                setSize(res.data)
            }
        })
    }
    const onSave = (value: any) => { 
        // if (qtyTotal > stateData[1]) {
        //     return AlertMessages.getErrorMessage("Do Not Enter The Quantity To More Than Remaing Mapped Quantity")
        // }
        service1.createMapping({ ...value, operation: stateData[0] }).then((res: any) => {
            if (res.status) {
                message.success(res.internalMessage)
            } else {
                message.error(res.data.message)
            }

        })
    }

    const location = () => {
        const onFinish = (values) => {
            console.log('Received values:', values);
        };
    }
    // const columms: any = [
    //     {
    //         title: 'S No',
    //         key: 'sno',
    //         width: '20px',
    //         responsive: ['sm'],
    //         render: (text, object, index) => (page - 1) * 10 + (index + 1),
    //         onCell: (record: any) => ({
    //             rowSpan: record.rowSpan,
    //         }),
    //         fixed: 'left',
    //     },
    //     {
    //         title: 'Size',
    //         dataIndex: 'styleName',
    //         width: '80px'
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'physicalQuantity',
    //         width: '80px'
    //     },
    //     {
    //         title: 'Location',
    //         dataIndex: '',
    //         width: '80px'
    //     },
    // ]





    return (
        <div>
            <Card title="ALLocation" className='card-header' extra={<span style={{ color: 'white' }}> <Button className='panel_button' onClick={() => navigate('/operation-tracking/operation-inventory-view')}>Alloaction View</Button> </span>} >
                <Card>
                    <Descriptions size='small' >

                        <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Style</span>}>{data[0]?.styleName}</DescriptionsItem>
                        <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Operation</span>}>{data[0]?.operation}</DescriptionsItem>
                        <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Physical Quantity</span>}>{data[0]?.physicalQuantity}</DescriptionsItem>
                        <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Mapped Quantity</span>}>{data[0]?.mappedQuantity}</DescriptionsItem>
                        {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Buyer</span>}>{moment(data[0]?.deliveryDate).format('YYYY-MM-DD')}
                        </DescriptionsItem>
                        <DescriptionsItem label={<span style={{ marginBottom: '30px', fontWeight: 'bold', color: 'darkblack' }}>Buyer Address</span>}>
                            {data[0]?.location_name}
                        </DescriptionsItem> */}

                    </Descriptions>
                </Card>
                <Card>
                <Form
                    onFinish={onSave}>
                    <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                            <Form.List name='addressInfo' initialValue={[{}]}>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={field.key} style={{ marginBottom: 16 }}>
                                                {/* Your existing form item components */}
                                                <Row gutter={16}>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...field}
                                                            label='Size'
                                                            name={[field.name, 'size']}
                                                            fieldKey={[field.key, 'sizeId']}
                                                            rules={[
                                                                {
                                                                    required: true, message: 'Missing country',
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                placeholder="Select Size"
                                                                showSearch
                                                                optionFilterProp='children'
                                                                allowClear
                                                            >
                                                                {size.map(dropData => (
                                                                    <Option key={dropData.sizeId} value={dropData.sizeId}>{dropData.size}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...field}
                                                            label='Quantity'
                                                            name={[field.name, 'quantity']}
                                                            fieldKey={[field.key, 'quantity']}
                                                            rules={[
                                                                {
                                                                    required: true, message: 'Missing Quantity',
                                                                },
                                                                {
                                                                    pattern: /^\d+$/,
                                                                    message: 'Should contain only numbers.',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder='Enter State' />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...field}
                                                            label='Location'
                                                            name={[field.name, 'location']}
                                                            fieldKey={[field.key, 'locationId']}
                                                            rules={[
                                                                {
                                                                    required: true, message: 'Missing Location',
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                placeholder="Select Size"
                                                                showSearch
                                                                optionFilterProp='children'
                                                                allowClear
                                                            >
                                                                {drop.map(dropData => (
                                                                    <Option key={dropData.locationId} value={dropData.locationId}>{dropData.locationName}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    {fields.length > 1 && (
                                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                    )}
                                                </Row>

                                            </div>
                                        ))}
                                        <Row gutter={16}>
                                            <Col style={{ paddingLeft: '800px' }}>
                                                <Button type='dashed' style={{ backgroundColor: 'darkseagreen' }} onClick={() => add()} block >Add Location</Button>
                                            </Col>
                                            <Col >
                                                <Button type='primary' htmlType="submit" block >Submit</Button>
                                            </Col>
                                            <Col >
                                                <Button danger icon={<UndoOutlined />} htmlType="reset" block >Reset</Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
                </Card>

                {/* <Table columns={columms}/> */}
            </Card>
        </div>
    )
}


export default OperationMapping;