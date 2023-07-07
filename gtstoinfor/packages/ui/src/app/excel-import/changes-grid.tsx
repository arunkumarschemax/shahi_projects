import React, { useEffect, useState } from 'react';
import { Card, Col, DatePicker, Form, Row, Select, Table, Tabs, TabsProps, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { OrdersService } from '@project-management-system/shared-services';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [contractDateData, setContractDateData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [warehouseDateData, setWarehouseDateDate] = useState([])
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const { RangePicker } = DatePicker
    const { Option } = Select

    useEffect(() => {
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
    }, [])

    const getContractDateChangeData = () => {
        service.getContractDateChangeData().then((res) => {
            setContractDateData(res.data)
        })
    }

    const getQtyChangeData = () => {
        service.getQtyChangeData().then((res) => {
            setQtyData(res.data)

        })
    }

    const getWharehouseDateChangeData = () => {
        service.getWharehouseDateChangeData().then((res) => {
            setWarehouseDateDate(res.data)
        })
    }

    console.log(contractDateData)

    const columns = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production plan id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Order Quantity Pieces',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'old_val',
                    key: 'old_val',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'new_val',
                    key: 'new_val',
                },
            ],
        },
        {
            title: 'Contract Date',
            dataIndex: 'contracted_date'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        }
    ];

    const columns1 = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Requested Warehouse Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'old_val',
                    key: 'old_val',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'new_val',
                    key: 'new_val',
                },
            ],
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs'
        },
        {
            title: 'Contract Date',
            dataIndex: 'contracted_date'
        }
    ];

    const columns2 = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Contract Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'old_val',
                    key: 'old_val',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'new_val',
                    key: 'new_val',
                },
            ],
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        }
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Order Qty : {qtyData?.length} </b>,
            children: <Table dataSource={qtyData} columns={columns} />,
        },
        {
            key: '2',
            label: <b >Requested Warehouse Date : {warehouseDateData?.length}</b>,
            children: <Table dataSource={warehouseDateData} columns={columns1} />,
        },
        {
            key: '3',
            label: <b>Contract date : {contractDateData?.length}</b>,
            children: <Table dataSource={contractDateData} columns={columns2} />,
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
                            <Select>
                                <Option key='new' value="new">New</Option>
                                <Option key='unaccepted' value="unaccepted">Unaccepted</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Tabs items={items} />
        </Card>
    );
};

export default ChangesGrid;