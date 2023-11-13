import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { DpomApproveRequest, FactoryReportModel, nikeFilterRequest } from "@project-management-system/shared-models";
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
        service.getFactoryReportData(req).then((res) => {
            if (res.data) {
                const unacceptedData = res.data.filter(item => item.DPOMLineItemStatus === "Unaccepted" || item.DPOMLineItemStatus === "Accepted" && item.customerOrder == null && item.docType == 'ZP26');
                setData(unacceptedData)
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
        req.itemNo = itemNoValues[record.key]
        service.coLineCreationReq(req).then((res) => {
            if (res.status) {
                // getOrderAcceptanceData()
                message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }

    const getSizeWiseHeaders = (data: FactoryReportModel[]) => {
        const sizeHeaders = new Set<string>();
        data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
            sizeHeaders.add('' + version.sizeDescription);
        }))
        return Array.from(sizeHeaders);
    };

    const getMap = (data: FactoryReportModel[]) => {
        const sizeWiseMap = new Map<string, Map<string, number>>();
        data?.forEach(rec => {
            if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
                sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
            }
            rec.sizeWiseData?.forEach(version => {
                sizeWiseMap.get(rec.purchaseOrderNumber).set(' ' + version.sizeDescription, version.sizeQty);
            })
        });
        return sizeWiseMap;
    }

    const renderReport = (data: FactoryReportModel[]) => {
        const sizeHeaders = getSizeWiseHeaders(data);
        const sizeWiseMap = getMap(data);

        const columns: any = [
            {
                title: "S.No",
                key: "sno", width: 50,
                responsive: ["sm"],
                render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                fixed: 'left'
            },
            {
                title: 'PO Number',
                dataIndex: 'purchaseOrderNumber',
                fixed: 'left',
                width: 80,
                ...getColumnSearchProps('po_number')
            },
            {
                title: 'PO Line Item No',
                dataIndex: 'poLineItemNumber', width: 80,
                fixed: 'left', align: 'center'
            },
            {
                title: 'Document Date',
                dataIndex: 'documentDate', width: 80,
                render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            // {
            //     title: 'Aging',
            //     dataIndex: '', width: 80, align: 'right',
            //     render: (text, record) => {
            //         const documentDate = moment(record.document_date);

            //         const today = moment();
            //         const aging = today.diff(documentDate, 'days');
            //         return aging;
            //     },
            //     sorter: (a, b) => {
            //         const aAging = moment(a['documentDate']);
            //         const bAging = moment(b['documentDate']);

            //         if (!aAging.isValid() && !bAging.isValid()) {
            //             return 0;
            //         } else if (!aAging.isValid()) {
            //             return 1;
            //         } else if (!bAging.isValid()) {
            //             return -1;
            //         }

            //         return aAging.diff(bAging, 'days');
            //     },

            //     // sortOrder: null
            // },
            {
                title: 'Product Code',
                dataIndex: 'productCode', width: 80,
            },
            {
                title: 'Color Description',
                dataIndex: 'colorDesc', width: 80,
            },
            {
                title: 'Destination Country Code',
                dataIndex: 'destinationCountryCode', width: 75,
            },
            {
                title: 'Destination country Name',
                dataIndex: 'destinationCountry', width: 75,
            },
            {
                title: 'Item',
                dataIndex: 'item', align: 'center', width: 70,
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        const firstFourDigits = text.substring(0, 4);
                        return firstFourDigits;
                    }
                },
            },
            {
                title: 'CO No', width: 70,
                dataIndex: 'customerOrder',
            },
            {
                title: 'MRGAC', dataIndex: 'MRGAC', className: "right-column", width: 70, render: (text, record) => {
                    return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'OGAC', dataIndex: 'OGAC', className: "right-column", width: 70, render: (text, record) => {
                    return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'GAC', dataIndex: 'GAC', className: "right-column", width: 70, render: (text, record) => {
                    return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'Category',
                dataIndex: 'categoryDesc',
                width: 80,
            },
            // {
            //     title: 'Total Order Quantity',
            //     dataIndex: 'totalItemQty',
            //     width: 80,
            //     align: 'right',
            //     render: (text, record) => {
            //         return record.totalItemQty_OLD ? (
            //             <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${record.totalItemQty_OLD} Revised Date:  ${record.totalItemQty_NEW} Difference :  `}>
            //                 {record.totalItemQty_OLD < record.totalItemQty_NEW ? (
            //                     <span style={{ color: 'green' }}>
            //                         {Number(record.totalItemQty_NEW).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            //                     </span>
            //                 ) : (
            //                     ''
            //                 )}
            //                 {record.totalItemQty_OLD > record.totalItemQty_NEW ? (
            //                     <span style={{ color: 'red' }}>
            //                         {Number(record.totalItemQty_NEW).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            //                     </span>
            //                 ) : (
            //                     ''
            //                 )}
            //                 &nbsp;&nbsp;
            //                 <span>
            //                     {record.totalItemQty_OLD < record.totalItemQty_NEW ? (
            //                         <ArrowUpOutlined style={{ color: 'green' }} />
            //                     ) : (
            //                         <ArrowDownOutlined style={{ color: 'red' }} />
            //                     )}
            //                 </span>
            //             </Tooltip>
            //         ) : (
            //             Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })
            //         );
            //     }
            // }
            // ,
            // {
            //     title: 'MRGAC',
            //     dataIndex: 'mrgac', width: 80,
            //     render: (text, record) => {
            //         return (record.MRGAC_OLD ?
            //             (
            //                 <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.MRGAC_OLD).format('MM/DD/YYYY')} Revised Date:  ${moment(record.MRGAC_NEW).format('MM/DD/YYYY')} Difference : ${Math.floor((new Date(moment(record.MRGAC_NEW).format('MM/DD/YYYY')).getTime() - new Date(moment(record.MRGAC_NEW).format('MM/DD/YYYY')).getTime()) / (1000 * 60 * 60 * 24)) + 1}  Days  `}>
            //                     {moment(record.MRGAC_OLD).format('MM/DD/YYYY') < moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'green' }}>{moment(record.MRGAC_NEW).format('MM/DD/YYYY')}</span> : ''}
            //                     {moment(record.MRGAC_OLD).format('MM/DD/YYYY') > moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'red' }}>{moment(record.MRGAC_NEW).format('MM/DD/YYYY')}</span> : ''}
            //                     &nbsp;&nbsp;
            //                     <span>
            //                         {moment(record.MRGAC_OLD).format('MM/DD/YYYY') < moment(record.MRGAC_NEW).format('MM/DD/YYYY') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
            //                     </span>
            //                 </Tooltip>
            //             ) : (record.mrgac ? record.mrgac : '-'))
            //     }
            // },
            // {
            //     title: 'GAC',
            //     dataIndex: 'gac', width: 80,
            //     render: (text, record) => {
            //         return (record.GAC_OLD ?
            //             (
            //                 <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.GAC_OLD).format('MM/DD/YYYY')} Revised Date:  ${moment(record.GAC_NEW).format('MM/DD/YYYY')}Difference : ${Math.floor((new Date(moment(record.GAC_NEW).format('MM/DD/YYYY')).getTime() - new Date(moment(record.GAC_NEW).format('MM/DD/YYYY')).getTime()) / (1000 * 60 * 60 * 24)) + 1}  Days  `}>
            //                     {moment(record.GAC_OLD).format('MM/DD/YYYY') < moment(record.GAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'green' }}>{moment(record.GAC_NEW).format('MM/DD/YYYY')}</span> : ''}
            //                     {moment(record.GAC_OLD).format('MM/DD/YYYY') > moment(record.GAC_NEW).format('MM/DD/YYYY') ? <span style={{ color: 'red' }}>{moment(record.GAC_NEW).format('MM/DD/YYYY')}</span> : ''}
            //                     &nbsp;&nbsp;
            //                     <span>
            //                         {moment(record.GAC_OLD).format('MM/DD/YYYY') < moment(record.GAC_NEW).format('MM/DD/YYYY') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
            //                     </span>
            //                 </Tooltip>
            //             ) : record.gac)
            //     }
            // },
            // {
            //     title: 'Gross Price', align: 'right',
            //     dataIndex: 'gross_price_fob', width: 80,
            //     render: (text, record) => {
            //         return (record.grossPriceFOB_OLD ?
            //             (
            //                 <Tooltip overlayStyle={{ font: 'bold', maxWidth: '140px' }} title={`Previous Price:  ${record.grossPriceFOB_OLD} Revised Price:  ${record.grossPriceFOB_NEW} Difference : ${(parseFloat(record.grossPriceFOB_NEW) - parseFloat(record.grossPriceFOB_OLD)).toFixed(2)} `}>
            //                     {record.grossPriceFOB_OLD < record.grossPriceFOB_NEW ? <span style={{ color: 'green' }}>{record.grossPriceFOB_NEW}</span> : ''}
            //                     {record.grossPriceFOB_OLD > record.grossPriceFOB_NEW ? <span style={{ color: 'red' }}>{record.grossPriceFOB_NEW}</span> : ''}
            //                     &nbsp;&nbsp;
            //                     <span>
            //                         {record.grossPriceFOB_OLD < record.grossPriceFOB_NEW ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
            //                     </span>
            //                 </Tooltip>
            //             ) : record.gross_price_fob)
            //     }
            // },
            // {
            //     title: 'Gross Price Currency',
            //     dataIndex: 'fob_currency_code', width: 80,
            // },
            {
                title: 'Shipping Type',
                dataIndex: 'shippingType', width: 80, render: (text) => {
                    const transformedText = text ? text.replace(/_/g, ' ') : '-';
                    return transformedText;
                },
            },
        ];

        sizeHeaders?.forEach(version => {
            columns.push({
                title: version,
                dataIndex: version,
                key: version,
                width: 70,
                align: 'center',
                children: [
                    {
                        title: 'Quantity',
                        dataIndex: '',
                        key: '',
                        width: 70,
                        className: 'centered-column',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                                    return (
                                        formattedQty
                                    );
                                } else {
                                    return (
                                        '-'
                                    );
                                }
                            } else {
                                return '-';
                            }
                        }
                    }
                ]
            });
        });

        columns.push(
            {
                title: 'DPOM Line Item Status',
                dataIndex: 'DPOMLineItemStatus', width: 80,
            },
            {
                title: "Item No",
                dataIndex: "itemNo", width: 100,
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
                dataIndex: "action", width: 80,
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
        )

        return (
            <>
                {data.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filterData.length > 0 ? filterData : data}
                        size='small'
                        // pagination={false}
                        pagination={{
                            pageSize: 50,
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize);
                            }
                        }}
                        className="custom-table-wrapper"
                        scroll={{ x: 'max-content', y: 450 }}
                        bordered
                    />
                ) : (<Table size='large' />
                )}
            </>
        );
    }


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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 40 }} >
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>SEARCH</Button>
                                <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>RESET</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Card>
                    {renderReport(filterData.length > 0 ? filterData : data)}
                </Card>

            </Card>
        </>
    )
}

export default OrderAcceptance;