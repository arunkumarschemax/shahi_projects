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
    console.log(grnData, "grnData");

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [vendorData, setVendorData] = useState<[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [prevTransactionsInfo, sePrevTransactionsInfo] = useState<any[]>([]);
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
    const [locationStatusValue, setValue] = useState<string>('Occupied');
    const [showQrSacn, setShowQrScan] = useState<boolean>(false);
    const [vendorName, setVendorName] = useState<string>("Hello")

    useEffect(() => {
        if (grnData) {
            form.setFieldsValue({quantity : grnData.balance, itemName:grnData.itemCode, itemId:grnData.itemId})
            if (grnData.grnItemId) {
                const id = grnData.grnItemId;
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
            console.log(res.data, "locataionsData")
            setLocations(res.data);
        });
    }

    const saveLocation = (result: any) => {
        console.log(grnData)
        if(form.getFieldValue("locationId") === undefined || null){
         AlertMessages.getErrorMessage('Please select the Location')
        }
        const locationId = form.getFieldValue("locationId");
        const qty = form.getFieldValue("quantity");
        console.log(qty)
      
        // const req = new LocationMappingReq(grnData.m3_items_Id
        //     , locationId, qty, grnData.grnItemId, shahi_item_code, item_type_id, plant_id,grnData.style_id, grnData.item_id, grnData.style_id,grnData.buyer_id );
            const req = new LocationMappingReq(grnData.itemId,locationId,qty,grnData.grnItemId,1,grnData.buyerId,grnData.uomId,grnData.materialType,grnData.m3itemDescription,grnData.uom);
        if (req) {
            locationService.postToStockLogs(req).then((res) => {
                if (res.status === true) {
                    AlertMessages.getSuccessMessage("Stock Added Succesufully")
                    form.resetFields();
                    if (locationStatusValue === "partially Occupied") {
                        const isActive = 1;
                        const request = new RackLocationStatusReq(locationStatusValue, locationId, isActive);
                        locationService.updateRackLocationStatus(request).then((res) => {
                            if (res.status) {
                                AlertMessages.getSuccessMessage("Rack location updated Succesufully")
                                // if (result === "close") {
                                //     navigate("/grn-pending-info-grid");
                                // } else if (result === "continue") {
                                    navigate("/grn-pending-info-grid");
                                // }
                            } else{
                                AlertMessages.getErrorMessage("Error while updating rack location")
                                // if (result === "close") {
                                //     navigate("/grn-pending-info-grid");
                                // } else if (result === "continue") {
                                //     navigate("/grn-pending-info-grid");
                                // }
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
            title: 'Item Code',
            dataIndex: 'itemcode',
            width:120
        },
        {
            title: 'Location',
            dataIndex: 'rack_position_name',
        },
        {
            title: 'Item Type',
            dataIndex: 'type',
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
        {
            title:'Uom',
            dataIndex:'uom'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarn_count'
        },
        {
            title:'Accepted Qty',
            dataIndex:'accepted_quantity'
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ]

    return (
        <div>
            <Card size="small" title={<span style={{ color: 'white' }} >Location Mapping</span>}
                style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/grn-pending-info-grid' ><span style={{ color: 'white' }} ><Button style={{ marginTop: "10%", marginBottom: "10%" }} className='panel_button' >View </Button> </span></Link>} >
                <Row gutter={24}>
                    <Col span={24}>
                        <Descriptions column={4}>
                            <Descriptions.Item label="GRN Number" style={{ width: '33%' }}>
                                {grnData.grnNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Buyer" style={{ width: '33%' }}>
                                {grnData.buyerName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Received Quantity" style={{ width: '33%' }}>
                                {Number(grnData.acceptedQuantity)}
                            </Descriptions.Item>
                            {/* <Descriptions.Item label="Stock" style={{ width: '33%' }}>
                                {grnData.quantity > 0 ? Number(grnData.quantity) : 0}
                            </Descriptions.Item> */}
                            <Descriptions.Item label="Location Mapping Quantity" style={{ width: '33%' }}>
                                {grnData.balance}
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                            <Form.Item name="vendorName" label="Vendor" rules={[{ required: true, message: 'Vendor is required' }]}>
                                <Input disabled={grnData} defaultValue={grnData.vendor_name} style={{fontWeight:'bold',color:'black'}} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 8 }}>
                            <Form.Item name="itemName" label="Item" rules={[{ required: true, message: ' Item is required ' }]}>
                                <Input.TextArea disabled={grnData} style={{fontWeight:'bold',color:'black'}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name="locationId" label="Location" rules={[{ required: true, message: ' Location is required' }]}>
                                <Select
                                    // onChange={getPreviousTransactions}
                                    showSearch allowClear placeholder="Select Location" optionFilterProp="children"
                                    // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    dropdownMatchSelectWidth={false}
                                >
                                    {locations.map((locationData) => {
                                        // return <Option style={{ backgroundColor: locationData.status === "NOT OCCUPIED" ? "green" : locationData.status === "PARTIALLY OCCUPIED" ? "orange" : "red", color: "white", marginTop: 5 }} value={locationData.position_Id}>{locationData.rack_position_name}</Option>
                                        return <Option  value={locationData.position_Id}>{locationData.rack_position_name}</Option>

                                    })}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Missed Quantity' }]}  >
                                <InputNumber min={1} disabled style={{fontWeight:'bold',width: "100%", color:'black'}}
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
                {tableData?.length > 0 ? <Table
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
