import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { DpomApproveRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, message } from "antd";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Highlighter from 'react-highlight-words';

export function OrderAcceptance() {
    const [page, setPage] = React.useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([])
    const [searchedColumn, setSearchedColumn] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [filterData, setFilterData] = useState<any>([]);
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const { RangePicker } = DatePicker;
    const pageSize = 10;


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

        if (!values.DPOMLineItemStatus || values.DPOMLineItemStatus.length === 0) {
            setFilterData(data);
        } else {
            const filteredData = data.filter(item =>
                values.DPOMLineItemStatus.includes(item.DPOMLineItemStatus)
            );
            setFilterData(filteredData);
        }
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

    const EstimatedETDDate = (value) => {
        if (value) {
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    useEffect(() => {
        getOrderAcceptanceData()
    }, [])

    const getOrderAcceptanceData = () => {
        service.getOrderAcceptanceData().then((res) => {
            if (res.data) {
                setData(res.data)
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
        service.approveDpomLineItemStatus(req).then((res) => {
            if (res.status) {
                getOrderAcceptanceData()
                message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }

    console.log(data)

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (currentPage - 1) * pageSize + (index + 1),
        },
        {
            title: 'Plant Name',
            dataIndex: 'plantName'
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber',
            ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Purchase Group Name',
            dataIndex: 'purchaseGroupName'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode'
        },
        {
            title: 'Category',
            dataIndex: 'categoryDesc'
        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType'
        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'DPOMLineItemStatus',
            filters: [
                { text: 'Accepted', value: 'Accepted' },
                { text: 'Unaccepted', value: 'Unaccepted' },
                { text: 'Closed', value: 'Closed' },
                { text: 'Cancelled', value: 'Cancelled' }
            ],
            filterMultiple: false,
            onFilter: (value, record) => { return record.DPOMLineItemStatus === value }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, record) => {
                if (record.DPOMLineItemStatus === 'Unaccepted') {
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
                    onFinish={Finish}
                    form={form}
                    layout='vertical'>
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Factory Report Date" name="fromDate">
                                <RangePicker onChange={EstimatedETDDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '42px' }}>
                            <Form.Item>
                                <Button htmlType="submit"
                                    icon={<SearchOutlined />}
                                    type="primary">SEARCH</Button>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ padding: '42px' }}>
                            <Form.Item>
                                <Button
                                    htmlType='button'
                                    icon={<UndoOutlined />}
                                    style={{ left: '-150px', width: 80, backgroundColor: "#162A6D", color: "white", position: "relative" }}
                                    onClick={() => { ClearData(); }}
                                >
                                    RESET
                                </Button>
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
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: (page) => {
                            setCurrentPage(page);
                        },
                    }}
                >
                </Table>
            </Card>
        </>
    )
}

export default OrderAcceptance;