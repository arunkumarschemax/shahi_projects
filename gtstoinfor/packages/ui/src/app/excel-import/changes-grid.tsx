import React, { useEffect, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tabs, TabsProps, Tooltip } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [contractDateData, setContractDateData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [warehouseDateData, setWarehouseDateDate] = useState([])
    const [filteredContractDateData, setFilteredContractDateData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredWarehouseDateData, setFilteredWarehouseDateDate] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
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
            setFilteredContractDateData(res.data)
        })
    }

    const getQtyChangeData = () => {
        service.getQtyChangeData().then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
        })
    }

    const getWharehouseDateChangeData = () => {
        service.getWharehouseDateChangeData().then((res) => {
            setWarehouseDateDate(res.data)
            setFilteredWarehouseDateDate(res.data)
        })
    }

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
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'new_val',
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '150px' }} title={`Previous Value:  ${record.old_val} Revised Value:  ${record.new_val}`}>
                    <span style={{ color: 'red' }}>
                        {record.new_val}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Contract Date',
            dataIndex: 'contracted_date'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
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
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'new_val',
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Value:  ${record.old_val} Revised Value:  ${record.new_val}`}>
                    <span style={{ color: 'red' }}>
                        {record.new_val}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs'
        },
        {
            title: 'Contract Date',
            dataIndex: 'contracted_date'
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
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
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Contract Date',
            dataIndex: 'new_val',
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Value:  ${record.old_val} Revised Value:  ${record.new_val}`}>
                    <span style={{ color: 'red' }}>
                        {record.new_val}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const EstimatedETDDate = (value) => {
        if (value) {
            console.log(value)
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    const getFilterdData = () => {
        let orderStatus = form.getFieldValue('orderStatus');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredContractData = contractDateData;
        let filteredQtyData = qtyData
        let filteredReqWhData = warehouseDateData
        if (orderStatus) {
            filteredContractData = filteredContractData.filter(record => record.order_status === orderStatus);
            filteredQtyData = filteredQtyData.filter(record => record.order_status === orderStatus)
            filteredReqWhData = filteredReqWhData.filter(record => record.order_status === orderStatus)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
        if (startDate && endDate) {
            filteredContractData = filteredContractData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate);
            filteredQtyData = filteredQtyData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate)
            filteredReqWhData = filteredReqWhData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Order Qty : {filteredQtyData?.length} </b>,
            children: <Table dataSource={filteredQtyData} columns={columns} />,
        },
        {
            key: '2',
            label: <b >Requested Warehouse Date : {filteredWarehouseDateData?.length}</b>,
            children: <Table dataSource={filteredWarehouseDateData} columns={columns1} />,
        },
        {
            key: '3',
            label: <b>Contract date : {filteredContractDateData?.length}</b>,
            children: <Table dataSource={filteredContractDateData} columns={columns2} />,
        },
    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
    }

    return (
        <Card title='Revised orders'>
            <Form form={form} layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name="contractDate"
                            label="Contract Date"
                        >
                            <RangePicker onChange={EstimatedETDDate} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name="orderStatus"
                            label="Order Status"
                        >
                            <Select
                                allowClear
                                placeholder='select order status'
                            >
                                <Option key='new' value="NEW">NEW</Option>
                                <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                        <Button type="primary" style={{ marginTop: '25px' }} onClick={getFilterdData}>Search</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Button onClick={onReset} style={{ marginTop: '25px' }}>Reset</Button>
                    </Col>
                </Row>
            </Form>
            <Tabs items={items} />
        </Card>
    );
};

export default ChangesGrid;