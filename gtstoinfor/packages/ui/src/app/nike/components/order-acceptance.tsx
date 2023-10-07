import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { DpomApproveRequest, nikeFilterRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, Tooltip, message } from "antd";
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
    const [itemNoValues, setItemNoValues] = useState({});


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

    const handleItemNoChange = (value, record) => {
        setItemNoValues((prevValues) => ({
            ...prevValues,
            [record.key]: value,
        }));
    };

    const isActionButtonEnabled = (record) => {
        return itemNoValues[record.key] && itemNoValues[record.key].trim() !== "";
    };

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
        if (form.getFieldValue('purchaseOrder') !== undefined) {
            req.poandLine = form.getFieldValue('purchaseOrder');
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
        req.poLineItemNumber = record.po_line_item_number
        req.purchaseOrderNumber = record.po_number
        req.scheduleLineItemNumber = record.schedule_line_item_number
        req.itemNo = itemNoValues[record.key]
        req.itemDesc = ''
        req.orderQty = record.size_qty
        req.size = record.size_description
        req.price = record.gross_price_fob
        req.currency = record.fob_currency_code
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
            title: 'Aging',
            dataIndex: '',
            render: (text, record) => {
                const documentDate = moment(record.document_date);

                const today = moment();
                const aging = today.diff(documentDate, 'days');
                return aging;
            },
            sorter: (a, b) => {
                const aAging = moment(a['document_date']);
                const bAging = moment(b['document_date']);

                if (!aAging.isValid() && !bAging.isValid()) {
                    return 0;
                } else if (!aAging.isValid()) {
                    return 1;
                } else if (!bAging.isValid()) {
                    return -1;
                }

                return aAging.diff(bAging, 'days');
            },

            // sortOrder: null
        }
        , {
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
            dataIndex: 'size_description',
            render: (text, record) => {
                if (typeof text === 'string' && text.trim() === '') {
                    return '-';
                } else if (typeof text === 'undefined' || text === null) {
                    return '-';
                } else {
                    return text;
                }
            },
        },
        {
            title: 'Order Quantity',
            dataIndex: 'size_qty',
            render: (text, record) => {
                if (typeof text === 'string' && text.trim() === '') {
                    return '-';
                } else if (typeof text === 'undefined' || text === null) {
                    return '-';
                } else {
                    return text;
                }
            },
        },
        {
            title: 'Total Order Quantity',
            dataIndex: 'total_item_qty',
            render: (text, record) => {
                return (record.totalItemQty_OLD ?
                    (
                        <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${record.totalItemQty_OLD} Revised Date:  ${record.totalItemQty_NEW} Difference :  `}>
                            {record.totalItemQty_OLD < record.totalItemQty_NEW ? <span style={{ color: 'green' }}>{record.totalItemQty_NEW}</span> : ''}
                            {record.totalItemQty_OLD > record.totalItemQty_NEW ? <span style={{ color: 'red' }}>{record.totalItemQty_NEW}</span> : ''}
                            &nbsp;&nbsp;
                            <span>
                                {record.totalItemQty_OLD < record.totalItemQty_NEW ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                            </span>
                        </Tooltip>
                    ) : record.total_item_qty)
            }
        },
        {
            title: 'MRGAC',
            dataIndex: 'mrgac',
            render: (text, record) => {
                return (record.MRGAC_OLD ?
                    (
                        <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.MRGAC_OLD).format('MM/DD/YYYY')} Revised Date:  ${moment(record.MRGAC_NEW).format('MM/DD/YYYY')} Difference : ${Math.floor((new Date(moment(record.MRGAC_NEW).format('MM/DD/YYYY')).getTime() - new Date(moment(record.MRGAC_NEW).format('MM/DD/YYYY')).getTime()) / (1000 * 60 * 60 * 24)) + 1}  Days  `}>
                            {moment(record.MRGAC_OLD).format('MM/DD/YYYY') < moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'green' }}>{moment(record.MRGAC_NEW).format('MM/DD/YYYY')}</span> : ''}
                            {moment(record.MRGAC_OLD).format('MM/DD/YYYY') > moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'red' }}>{moment(record.MRGAC_NEW).format('MM/DD/YYYY')}</span> : ''}
                            &nbsp;&nbsp;
                            <span>
                                {moment(record.MRGAC_OLD).format('MM/DD/YYYY') < moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                            </span>
                        </Tooltip>
                    ) : (record.mrgac ? record.mrgac : '-'))
            }
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text, record) => {
                return (record.GAC_OLD ?
                    (
                        <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.GAC_OLD).format('MM/DD/YYYY')} Revised Date:  ${moment(record.GAC_NEW).format('MM/DD/YYYY')}Difference : ${Math.floor((new Date(moment(record.GAC_NEW).format('MM/DD/YYYY')).getTime() - new Date(moment(record.GAC_NEW).format('MM/DD/YYYY')).getTime()) / (1000 * 60 * 60 * 24)) + 1}  Days  `}>
                            {moment(record.GAC_OLD).format('MM/DD/YYYY') < moment(record.GAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'green' }}>{moment(record.GAC_NEW).format('MM/DD/YYYY')}</span> : ''}
                            {moment(record.GAC_OLD).format('MM/DD/YYYY') > moment(record.GAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'red' }}>{moment(record.GAC_NEW).format('MM/DD/YYYY')}</span> : ''}
                            &nbsp;&nbsp;
                            <span>
                                {moment(record.GAC_OLD).format('MM/DD/YYYY') < moment(record.GAC_NEW).format('MM/DD/YYYY') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                            </span>
                        </Tooltip>
                    ) : record.gac)
            }
        },
        {
            title: 'Gross Price',
            dataIndex: 'gross_price_fob',
            render: (text, record) => {
                return (record.grossPriceFOB_OLD ?
                    (
                        <Tooltip overlayStyle={{ font: 'bold', maxWidth: '140px' }} title={`Previous Price:  ${record.grossPriceFOB_OLD} Revised Price:  ${record.grossPriceFOB_NEW} Difference : ${(parseFloat(record.grossPriceFOB_NEW) - parseFloat(record.grossPriceFOB_OLD)).toFixed(2)} `}>
                            {record.grossPriceFOB_OLD < record.grossPriceFOB_NEW ? <span style={{ color: 'green' }}>{record.grossPriceFOB_NEW}</span> : ''}
                            {record.grossPriceFOB_OLD > record.grossPriceFOB_NEW ? <span style={{ color: 'red' }}>{record.grossPriceFOB_NEW}</span> : ''}
                            &nbsp;&nbsp;
                            <span>
                                {record.grossPriceFOB_OLD < record.grossPriceFOB_NEW ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                            </span>
                        </Tooltip>
                    ) : record.gross_price_fob)
            }
        },
        {
            title: 'Gross Price Currency',
            dataIndex: 'fob_currency_code'
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
        // {
        //     title: 'Item No',
        //     dataIndex: '',
        // },
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: (value, record) => {
        //         if (record.dpom_item_line_status === 'Unaccepted') {
        //             return (
        //                 <Popconfirm title="Are you sure to approve" onConfirm={() => approveDpomLineItemStatus(record)}>
        //                     <Button>Accept</Button>
        //                 </Popconfirm>
        //             );
        //         } else {
        //             return null;
        //         }
        //     }

        // }
        {
            title: "Item No",
            dataIndex: "itemNo",
            render: (text, record) => {
                return (
                    <Form>
                        <Form.Item>
                            <Input
                                placeholder="Enter Item No"
                                onChange={(e) => handleItemNoChange(e.target.value, record)}
                            />
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (value, record) => {
                const isEnabled = isActionButtonEnabled(record);

                return (
                    <Popconfirm
                        title="Are you sure to approve"
                        onConfirm={() => approveDpomLineItemStatus(record)}
                        disabled={!isEnabled}
                    >
                        <Button disabled={!isEnabled}>Accept</Button>
                    </Popconfirm>
                );
            },
        },
    ]

    return (
        <>
            <Card title="Nike Orders Register - Unaccepted Orders" headStyle={{ fontWeight: 'bold' }}>
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
                            <Form.Item name='purchaseOrder' label='Purchase Order' >
                                <Select
                                    showSearch
                                    placeholder="Select PO"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {poLine?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
                                    })
                                    }
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
                                    {productCode?.map((inc: any) => {
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
                    rowKey={record => record.id}
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
                    scroll={{ x: 'max-content' }}
                >
                </Table>



            </Card>
        </>
    )
}

export default OrderAcceptance;