import React, { useEffect, useState } from 'react';
import { Card, Col, DatePicker, Form, Row, Select, Table, Tabs, TabsProps, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { OrdersService } from '@project-management-system/shared-services';

const ChangesGrid = () => {
    const service = new OrdersService();
    const [qtyData, setQtyData] = useState<any[]>([])
    const [reqWhrDateData, setReqWhrDateData] = useState<any[]>([])
    const [contDateData, setContDateData] = useState<any[]>([])
    const { RangePicker } = DatePicker

    useEffect(() => {
        getQtyChangedData()
    }, [])

    const getQtyChangedData = () => {
        service.getQtyChangeData().then(res => {
            if (res.status) {
                setQtyData(res.data)
            }
        })
    }

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'S.No',
            key: 'S.No',
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode'
        },
        {
            title: 'Quantity',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'oldValue',
                    key: 'oldValue',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'newValue',
                    key: 'newValue',
                },
            ],
        },
        {
            title: 'Contract Date',
            dataIndex: 'contractDate'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requestedWarehuse Date'
        }
    ];

    const columns1 = [
        {
            title: 'S.No',
            dataIndex: 'S.No',
            key: 'S.No',
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode'
        },
        {
            title: 'Requested Warehouse Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'oldValue',
                    key: 'oldValue',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'newValue',
                    key: 'newValue',
                },
            ],
        },
        {
            title: 'Contract Date',
            dataIndex: 'contractDate'
        },
        {
            title: 'Quantity',
            dataIndex: 'orderQtyPcs'
        }
    ];

    const columns2 = [
        {
            title: 'S.No',
            dataIndex: 'S.No',
            key: 'S.No',
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode'
        },
        {
            title: 'Contract Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'oldValue',
                    key: 'oldValue',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'newValue',
                    key: 'newValue',
                },
            ],
        },
        {
            title: 'Quantity',
            dataIndex: 'orderQtyPcs'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requestedWarehuse Date'
        }
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Order Quantity',
            children: <Table dataSource={qtyData} columns={columns} />,
        },
        {
            key: '2',
            label: 'Requested Warehouse Date',
            children: <Table dataSource={reqWhrDateData} columns={columns1} />,
        },
        {
            key: '3',
            label: 'Contract Date',
            children: <Table dataSource={contDateData} columns={columns2} />,
        },
    ];

    return (
        <Card title='Revised orders'>
            <Form layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name="contractDate"
                            label="Contract Date"
                        >
                            <RangePicker />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name="orderStatus"
                            label="Order Status"
                        >
                            <Select></Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name=""
                            label=""
                        >
                        </Form.Item>
                    </Col> */}
                </Row>
            </Form>
            <Tabs items={items} />
        </Card>
    );
};

export default ChangesGrid;