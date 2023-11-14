import { LocationMappingService } from '@project-management-system/shared-services';
import { Card, Col, Descriptions, Input, Row, Table, Form, Select, InputNumber, Radio, Button, Modal, RadioChangeEvent } from 'antd'
import { Option } from 'antd/es/mentions';
import { ColumnProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

export const LocationMapping = () => {

    let location = useLocation();
    const [form] = Form.useForm();
    const grnData = location.state.data;
    console.log(grnData, "grnData");

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [vendorData, setVendorData] = useState<[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    // const [tableData, setTableData] = useState<any[]>([]);
    const [prevTransactionsInfo, sePrevTransactionsInfo] = useState<any[]>([]);
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
    const [locationStatusValue, setValue] = useState<string>('Occupied');
    const [showQrSacn, setShowQrScan] = useState<boolean>(false);
    const [vendorName, setVendorName] = useState<string>("Hello")

    useEffect(() => {
        getLocationsData();
    }, [])

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const getLocationsData = () => {
        locationService.getAllActiveRackPositions().then(res => {
            setLocations(res.data);
            console.log(res.data, '//////////////////////////////');
        });
    }

    const tableData = [
        {
            itemName: grnData.item,
            location: "A1L1",
            quantity: "200",
        },
        {
            itemName: grnData.item,
            location: "A1L2",
            quantity: "500",
        },
        {
            itemName: grnData.item,
            location: "A1L3",
            quantity: "1000",
        },
    ]

    const columnsSkelton: ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
            title: 'Item',
            dataIndex: 'itemName',
        },
        {
            title: 'Location',
            dataIndex: 'location',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, object, index) => {
                return <>{Number(text)}</>
            }

        },
    ]

    return (
        <div>
            <Card size="small" title={<span style={{ color: 'white' }} >Location Mapping</span>}
                style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/grn-pending-info-grid' ><span style={{ color: 'white' }} ><Button style={{ marginTop: "10%", marginBottom: "10%" }} className='panel_button' >View </Button> </span></Link>} >
                <Row gutter={24}>
                    <Col span={12}>
                        <Descriptions column={2}>
                            <Descriptions.Item label="GRN Number" style={{ width: '33%' }}>
                                {grnData.grnNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Received Quantity" style={{ width: '33%' }}>
                                {Number(grnData.receivedQuantity)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Stock" style={{ width: '33%' }}>
                                {grnData.physicalQuantity > 0 ? Number(grnData.physicalQuantity) : 0}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location Pending Quantity" style={{ width: '33%' }}>
                                {Number((grnData.receivedQuantity) - (grnData.physicalQuantity))}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Form layout={"vertical"} autoComplete="off" form={form} >
                    <Form.Item name="vendorId" style={{ display: "none" }} >
                        <Input hidden />
                    </Form.Item>
                    <Form.Item name="itemId" style={{ display: "none" }} >
                        <Input hidden />
                    </Form.Item>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                            <Form.Item name="vendorName" label="Vendor" rules={[{ required: true, message: 'Missed Vendor' }]}>
                                <Input disabled={grnData} defaultValue={grnData.vendorName} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                            <Form.Item name="itemName" label="Item" rules={[{ required: true, message: 'Missed Item' }]}>
                                <Input disabled={grnData} defaultValue={grnData.item} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name="locationId" label="Location" rules={[{ required: true, message: 'Missed Location' }]}>
                                <Select
                                    // onChange={getPreviousTransactions}
                                    showSearch allowClear placeholder="Select Location" optionFilterProp="children"
                                    // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    dropdownMatchSelectWidth={false}
                                >
                                    {locations.map((locationData) => {
                                        return <Option style={{ color: locationData.color }} value={locationData.position_id}>{locationData.rack_position_name}</Option>
                                    })}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Missed Quantity' }]}>
                                <InputNumber min={1} style={{ width: "100%" }}
                                // onChange={e => validateQty(e)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                            Location Status : <Radio.Group name='locationStatus'
                                onChange={onChange}
                                value={locationStatusValue}>
                                {/* <Radio value={'Empty'}>Empty</Radio> */}
                                <Radio value={'Occupied'}>Fully Occupied</Radio>
                                <Radio value={'partially Occupied'}>Partially Occupied</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                            <Form.Item >
                                <Button type='primary'
                                    // onClick={e => (saveLocation('continue'))} 
                                    block disabled={btnDisable}>
                                    Save & Continue...
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item >
                                <Button type='primary' danger
                                    //  onClick={e => (saveLocation('close'))} 
                                    block disabled={btnDisable}>
                                    Save & Close
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {tableData.length > 0 ? <Table
                    columns={columnsSkelton}
                    dataSource={tableData}
                    // pagination={{
                    //   onChange(current) {
                    //     setPage(current);
                    //   }
                    // }}
                    // onChange={onChange}
                    bordered
                /> : <></>}
            </Card>
        </div>
    )
}
