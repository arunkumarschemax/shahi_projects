import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { DpomApproveRequest, FactoryReportModel, PpmDateFilterRequest, nikeFilterRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Statistic, Table, Tooltip, message } from "antd";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
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
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [planSesCode, setPlanSesCode] = useState<any>([]);
    const [planSesYear, setPlanSesYear] = useState<any>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const formatter = (value: number) => <CountUp end={value} separator="," />;

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

    useEffect(() => {
        getOrderAcceptanceData()
        getProductCode()
        getPoLine()
        getStyleNumber();
        getSesonCode();
        getSesonYear();
    }, [])

    const getProductCode = () => {
        service.getPpmProductCodeForOrderCreation().then(res => {
            setProductCode(res.data)
        })
    }

    const getSesonYear = () => {
        service.getPpmPlanningSeasonYearFactory().then(res => {
            setPlanSesYear(res.data)
        })
    }

    const getSesonCode = () => {
        service.getPpmPlanningSeasonCodeFactory().then(res => {
            setPlanSesCode(res.data)
        })
    }

    const getStyleNumber = () => {
        service.getStyleNumberForOrderCreation().then(res => {
            setStyleNumber(res.data)
        })
    }

    const getPoLine = () => {
        service.getPpmPoLineForOrderCreation().then(res => {
            setPoLine(res.data)
        })
    }

    const onReset = () => {
        let resetObj = {};
        data.forEach((record) => {
            resetObj[`itemNo${`${record.purchaseOrderNumber}${record.poLineItemNumber}`}`] = ''
        })
        console.log(data.map((record) => { return { name: `itemNo${`${record.purchaseOrderNumber}${record.poLineItemNumber}`}`, value: '' } }))
        form.setFieldsValue(resetObj);
        setItemNoValues({})
        getOrderAcceptanceData()
    }

    const getOrderAcceptanceData = () => {
        const req = new PpmDateFilterRequest();
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
            req.poNumber = form.getFieldValue('purchaseOrder');
        }
        if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
            req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
        }
        if (form.getFieldValue('styleNumber') !== undefined) {
            req.styleNumber = form.getFieldValue('styleNumber');
        }
        if (form.getFieldValue('planningSeasonCode') !== undefined) {
            req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
        }
        if (form.getFieldValue('planningSeasonYear') !== undefined) {
            req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
        }
        service.getOrderAcceptanceData(req).then((res) => {
            if (res.data) {
                setData(res.data)
                message.success(res.internalMessage)
            } else (
                setData([]),
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
                getOrderAcceptanceData();
                form.resetFields([`itemNo${record.key}`])
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
        const sizeHeadersArr = Array.from(sizeHeaders)
        const customOrder = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "XS-S", "S-S", "M-S", "L-S", "XL-S", "2XL-S", "3XL-S", "4XL-S", "XS-T", "S-T", "M-T", "L-T", "XS-T", "S-T", "M-T", "L-T", "XL-T", "2XL-T", "3XL-T", "4XL-T", "5XL-T", "STT", "MTT", "LTT", "XLTT", "2XLTT", "3XLTT", "Custm"];
        sizeHeadersArr?.sort((a, b) => customOrder.indexOf(a) - customOrder.indexOf(b));
        return sizeHeadersArr;
    };

    const getMap = (data: FactoryReportModel[]) => {
        const sizeWiseMap = new Map<string, Map<string, number>>();
        data?.forEach(rec => {
            if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
                sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
            }
            rec.sizeWiseData?.forEach(size => {
                sizeWiseMap.get(rec.purchaseOrderNumber).set(size.sizeDescription, size.sizeQty);
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
                title: 'Destination Country Name',
                dataIndex: 'destinationCountry', width: 75,
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
                title: 'Planning Season Code',
                dataIndex: 'planningSeasonCode',
                align: 'center', width: 70,
            },
            {
                title: 'Planning Season Year',
                dataIndex: 'planningSeasonYear', width: 70,
                align: 'center',
            },
            {
                title: 'Category',
                dataIndex: 'categoryDesc',
                width: 80,
            },
            {
                title: 'Shipping Type',
                dataIndex: 'shippingType', width: 80, render: (text) => {
                    const transformedText = text ? text.replace(/_/g, ' ') : '-';
                    return transformedText;
                },
            },
            {
                title: 'Total Item Qty',
                dataIndex: 'totalItemQty', width: 70,
                align: 'right',
                render: (text) => <strong>{text}</strong>
            }
        ];

        sizeHeaders?.forEach(size => {
            columns.push({
                title: size,
                dataIndex: size,
                key: size,
                width: 70,
                align: 'center',
                render: (text, record) => {
                    const sizeData = sizeWiseMap?.get(record.purchaseOrderNumber)?.get(size)
                    return sizeData ? sizeData : '-'
                }
            });
        });

        columns.push(
            {
                title: 'DPOM Line Item Status',
                dataIndex: 'DPOMLineItemStatus', width: 80,
            },
            {
                title: 'CO Line Status',
                dataIndex: 'coLineStatus', width: 80,
            },
            {
                title: "Item No",
                dataIndex: "itemNo", width: 100,
                render: (text, record) => {
                    return (
                        <Form.Item name={`itemNo${record.purchaseOrderNumber}${record.poLineItemNumber}`}>
                            <Input
                                placeholder="Enter Item No"
                                onChange={(e) => handleItemNoChange(e.target.value, record)}
                            />
                        </Form.Item>
                    );
                },
            },
            {
                title: "Action",
                dataIndex: "action", width: 80,
                render: (value, record) => {
                    const isEnabled = isActionButtonEnabled(record);
                    return (
                        <Button onClick={() => approveDpomLineItemStatus(record)} disabled={record.coLineStatus == 'Open' ? true : !isEnabled}>Accept</Button>
                    );
                },
            },
        )

        return (
            <>
                {data.length > 0 ? (
                    <Table
                        rowKey={(record) => `${record.purchaseOrderNumber}${record.poLineItemNumber}`}
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

    const totalItemQty = data?.map(i => i.totalItemQty)
    const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

    return (
        <>
            <Card title="Nike Orders Register - Unaccepted Orders" headStyle={{ fontWeight: 'bold' }}>
                <Form
                    onFinish={getOrderAcceptanceData}
                    form={form}
                    layout='vertical'>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} >
                            <Form.Item label="Document Date" name="documentDate">
                                <RangePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                            <Form.Item name='purchaseOrder' label='Purchase Order' >
                                <Select
                                    showSearch
                                    placeholder="Select PO"
                                    optionFilterProp="children"
                                    allowClear
                                    mode='multiple'
                                >
                                    {poLine?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='styleNumber' label='Style Number' >
                                <Select
                                    showSearch
                                    placeholder="Select Style Number"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {styleNumber?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='planningSeasonCode' label='Planning Season Code' >
                                <Select
                                    showSearch
                                    placeholder="Select Planning Season Code"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {planSesCode?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.planning_season_code}>{inc.planning_season_code}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='planningSeasonYear' label='Planning Season Year' >
                                <Select
                                    showSearch
                                    placeholder="Select Planning Season Year"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {planSesYear?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.planning_season_year}>{inc.planning_season_year}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 20 }} >
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>SEARCH</Button>
                                <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>RESET</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} justify={'space-evenly'}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={3}> <Card bordered style={{ backgroundColor: 'aqua', height: 100, alignItems: 'center' }}  >
                            <b> <Statistic loading={tableLoading} title="Total Order Qty:" style={{ color: 'white' }} value={count} formatter={formatter} /></b></Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={3}> <Card bordered style={{ backgroundColor: '#E1F5A5', height: 100, alignItems: 'center' }}>
                            <b><Statistic loading={tableLoading} title="Total PO's:" value={data.length} formatter={formatter} />
                            </b> </Card> </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#A5F5D7', height: 100, alignItems: 'center' }}>
                            <b><Statistic loading={tableLoading} title="Accepted PO's:" value={data.filter(el => el.DPOMLineItemStatus === "Accepted").length} formatter={formatter} />
                            </b></Card></Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#F5BCB1', height: 100, alignItems: 'center' }}>
                            <b><Statistic loading={tableLoading} title="Unaccepted PO's:" value={data.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} formatter={formatter} />
                            </b></Card> </Col>
                    </Row><br></br>
                    <Card>
                        {renderReport(filterData.length > 0 ? filterData : data)}
                    </Card>
                </Form>
            </Card>
        </>
    )
}

export default OrderAcceptance;