import { LocationMappingReq, MaterialIssueIdreq, RackLocationStatusReq } from '@project-management-system/shared-models';
import { LocationMappingService } from '@project-management-system/shared-services';
import { Card, Col, Descriptions, Input, Row, Table, Form, Select, InputNumber, Radio, Button, Modal, RadioChangeEvent } from 'antd'
import { Option } from 'antd/es/mentions';
import { ColumnProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../common/common-functions/alert-messages';

export const LocationMapping = () => {

    let location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const grnData = location.state.data;
    // console.log(grnData, "grnData");

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [vendorData, setVendorData] = useState<[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [prevTransactionsInfo, sePrevTransactionsInfo] = useState<any[]>([]);
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
    const [locationStatusValue, setValue] = useState<string>('partially Occupied');
    const [showQrSacn, setShowQrScan] = useState<boolean>(false);
    const [vendorName, setVendorName] = useState<string>("Hello")

    useEffect(() => {
        if (grnData) {
            if (grnData.grn_item_id) {
                const id = grnData.grn_item_id;
                getOneItemAllocateDetailsData(id);
            } else {
                AlertMessages.getInfoMessage("GRN Item Id not found");
            }
        }
        getLocationsData();
    }, [])

    const onChange = (e: RadioChangeEvent) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const getOneItemAllocateDetailsData = (id) => {
        const req = new MaterialIssueIdreq(id)
        locationService.getOneItemAllocateDetails(req).then((res) => {
            setTableData(res.data);
        })
    }

    const getLocationsData = () => {
        locationService.getAllActiveRackPositions().then(res => {
            // console.log(res.data, "locataionsData")
            setLocations(res.data);
        });
    }

    const saveLocation = (result) => {
        const locationId = form.getFieldValue("locationId");
        const qty = form.getFieldValue("quantity");
        const m3_item_code = 1
        const shahi_item_code = 1;
        const item_type_id = 11;
        const plant_id = 1;
        const m3_style_id = 1;
        const req = new LocationMappingReq(m3_item_code, locationId, qty, grnData.grn_item_id, shahi_item_code, item_type_id, plant_id, m3_style_id, grnData.item_id, grnData.style_id);
        if (req) {
            locationService.postToStockLogs(req).then((res) => {
                if (res.status === true) {
                    AlertMessages.getSuccessMessage("Stock Added Succesufully")
                    form.resetFields();
                    if (locationStatusValue === "partially Occupied") {
                        const isActive = 1;
                        const request = new RackLocationStatusReq(locationStatusValue, locationId, isActive);
                        locationService.updateRackLocationStatus(request).then((res) => {
                            if (res.status === true) {
                                AlertMessages.getSuccessMessage("Rack location updated Succesufully")
                                if (result === "close") {
                                    navigate("/grn-pending-info-grid");
                                } else if (result === "continue") {
                                    navigate("/grn-pending-info-grid");
                                }
                            } else if (res.status === false) {
                                AlertMessages.getErrorMessage("Error while updating rack location")
                                if (result === "close") {
                                    navigate("/grn-pending-info-grid");
                                } else if (result === "continue") {
                                    navigate("/grn-pending-info-grid");
                                }
                            }
                        })
                    } else if (locationStatusValue === "Occupied") {
                        const isActive = 0;
                        const request = new RackLocationStatusReq(locationStatusValue, locationId, isActive);
                        locationService.updateRackLocationStatus(request).then((res) => {
                            if (res.status === true) {
                                AlertMessages.getSuccessMessage("Rack location updated Succesufully")
                                if (result === "close") {
                                    navigate("/grn-pending-info-grid");
                                } else if (result === "continue") {
                                    navigate("/grn-pending-info-grid");
                                }
                            } else if (res.status === false) {
                                AlertMessages.getErrorMessage("Error while updating rack location")
                                if (result === "close") {
                                    navigate("/grn-pending-info-grid");
                                } else if (result === "continue") {
                                    navigate("/grn-pending-info-grid");
                                }
                            }                        
                        })
                    }
                } else if (res.status === false) {
                    AlertMessages.getErrorMessage("Error while adding stock")
                }
            })
        }
    }

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
            dataIndex: 'item_code',
        },
        {
            title: 'Location',
            dataIndex: 'rack_position_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'total_quantity',
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
                                {grnData.grn_number}
                            </Descriptions.Item>
                            <Descriptions.Item label="Received Quantity" style={{ width: '33%' }}>
                                {Number(grnData.conversion_quantity)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Stock" style={{ width: '33%' }}>
                                {grnData.quantity > 0 ? Number(grnData.quantity) : 0}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location Pending Quantity" style={{ width: '33%' }}>
                                {Number((grnData.conversion_quantity) - (grnData.quantity))}
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
                                <Input disabled={grnData} defaultValue={grnData.vendor_name} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                            <Form.Item name="itemName" label="Item" rules={[{ required: true, message: 'Missed Item' }]}>
                                <Input disabled={grnData} defaultValue={grnData.item_name} />
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
                                        return <Option style={{ backgroundColor: locationData.status === "NOT OCCUPIED" ? "green" : locationData.status === "PARTIALLY OCCUPIED" ? "orange" : "red", color: "white", marginTop: 5 }} value={locationData.position_Id}>{locationData.rack_position_name}</Option>
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
                        {/* <Col span={4}>
                            <Form.Item >
                                <Button type='primary' danger
                                    onClick={e => (updateRackStatus())}
                                    block disabled={btnDisable}>
                                    Save & Continue...
                                </Button>
                            </Form.Item>
                        </Col> */}
                        <Col span={4}>
                            <Form.Item >
                                <Button type='primary'
                                    onClick={e => (saveLocation('close'))}
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
