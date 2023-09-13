import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { DpomApproveRequest, nikeFilterRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, message } from "antd";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Highlighter from 'react-highlight-words';

export function OrderAcceptance() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [data, setData] = useState<any[]>([])
    const [searchedColumn, setSearchedColumn] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [filterData, setFilterData] = useState<any>([]);
    const { RangePicker } = DatePicker;
    const [productCode, setProductCode] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const service = new NikeService();

    const Finish = (values: any) => {
        // if (values.DPOMLineItemStatus !== undefined) {
        //     // getFactoryStatus(values)
        // }/

        // if (!values.DPOMLineItemStatus || values.DPOMLineItemStatus.length === 0) {
        //     setFilterData(data);
        // } else {
        //     const filteredData = data.filter(item =>
        //         values.DPOMLineItemStatus.includes(item.DPOMLineItemStatus)
        //     );
        //     setFilterData(filteredData);
        // }
    }

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button size="small" style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters)
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) { setTimeout(() => searchInput.current.select()); }
        },
        render: text =>
            text ? (
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : text
            )
                : null
    })

    const ClearData = () => {
        form.resetFields();
    }

    useEffect(() => {
        getOrderAcceptanceData()
        getProductCode()
        getPoLine()
    }, [])

    const getProductCode = () => {
        service.getPpmProductCodeForOrderCreation().then(res => {
            setProductCode(res.data)
        })
    }

    const getPoLine = () => {
        service.getPpmPoLineForOrderCreation().then(res => {
            setPoLine(res.data)
        })
    }

    const onReset = () => {
        form.resetFields()
        getOrderAcceptanceData()
    }

    const getOrderAcceptanceData = () => {
        const req = new nikeFilterRequest();
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentEndDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('productCode') !== undefined) {
            req.productCode = form.getFieldValue('productCode');
        }
        if (form.getFieldValue('poandLine') !== undefined) {
            req.poandLine = form.getFieldValue('poandLine');
        }
        if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
            req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
        }
        service.getOrderAcceptanceData1(req).then((res) => {
            if (res.data) {
                setData(res.data)
                Finish(data)
                // message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }

    const approveDpomLineItemStatus = (record) => {
        const req = new DpomApproveRequest();
        req.poLineItemNumber = record.poLineItemNumber
        req.purchaseOrderNumber = record.purchaseOrderNumber
        req.scheduleLineItemNumber = record.scheduleLineItemNumber
        service.createCOline(req).then((res) => {
            if (res.status) {
                getOrderAcceptanceData()
                message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }



    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            fixed: 'left',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',
            fixed: 'left',
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            fixed: 'left',
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Plant Name',
            dataIndex: 'plant_name'
        },
        {
            title: 'Purchase Group Name',
            dataIndex: 'purchase_group_name'
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code'
        },
        {
            title: 'Category',
            dataIndex: 'category_desc'
        },
        {
            title: 'Size',
            dataIndex: 'size_description'
        },
        {
            title: 'Order Quantity',
            dataIndex: 'size_qty'
        },
        {
            title: 'Total Order Quantity',
            dataIndex: 'total_item_qty'
        },
        {
            title: 'Shipping Type',
            dataIndex: 'shipping_type'
        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'dpom_item_line_status',
            filters: [
                { text: 'Accepted', value: 'Accepted' },
                { text: 'Unaccepted', value: 'Unaccepted' },
            ],
            filterMultiple: false,
            onFilter: (value, record) => { return record.dpom_item_line_status === value }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, record) => {
                if (record.dpom_item_line_status === 'Unaccepted') {
                    return (
                        <Popconfirm title="Are you sure to approve" onConfirm={() => approveDpomLineItemStatus(record)}>
                            <Button>Accept</Button>
                        </Popconfirm>
                    );
                } else {
                    return null;
                }
            }

        }
    ]

    return (
        <>
            <Card title="Nike Orders Register" headStyle={{ fontWeight: 'bold' }}>
                <Form
                    onFinish={getOrderAcceptanceData}
                    form={form}
                    layout='vertical'>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} style={{ padding: '20px' }} >
                            <Form.Item label="Document Date" name="documentDate">
                                <RangePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
                            <Form.Item name='poandLine' label='Po+Line' >
                                <Select
                                    showSearch
                                    placeholder="Select Po+Line"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {poLine.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.po_and_line}>{inc.po_and_line}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
                            <Form.Item name="DPOMLineItemStatus" label="Line Item Status">
                                <Select
                                    showSearch
                                    placeholder="Select Status"
                                    optionFilterProp="children"
                                    allowClear mode='multiple'>
                                    <Option value="Accepted">ACCEPTED</Option>
                                    <Option value="Unaccepted">UNACCEPTED</Option>
                                    {/* <Option value="Closed">CLOSED</Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
                            <Form.Item name='productCode' label='Product Code' >
                                <Select
                                    showSearch
                                    placeholder="Select Product Code"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {productCode.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.product_code}>{inc.product_code}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 40, }} >
                            <Form.Item>
                                <Button htmlType="submit"
                                    icon={<SearchOutlined />}
                                    type="primary">SEARCH</Button>

                                <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>Reset</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {/* <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                >
                </Table> */}

                <Table
                    columns={columns}
                    dataSource={filterData.length > 0 ? filterData : data}
                    bordered
                    className="custom-table-wrapper"
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                >
                </Table>
            </Card>
        </>
    )
}

export default OrderAcceptance;