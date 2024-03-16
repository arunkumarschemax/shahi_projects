import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout'
import { BomCreationFiltersReq, ItemInfoFilterReq, PpmDateFilterRequest, UpdatedSizes, bomGenerationColumnsMapping } from '@project-management-system/shared-models';
import { BomService, NikeService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Table, message, notification } from 'antd'
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker


type Props = {
    sendSelectedData: (value: any[]) => void;
    sendUpdatedData: (value: any[]) => void;
    sendSelectedKeys: (values: UpdatedSizes[]) => void
}

export default function BomGeneration(props: Props) {
    const [form] = Form.useForm();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const service = new NikeService();
    const [filterData, setFilterData] = useState<any>([])
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const { Option } = Select;
    const navigate = useNavigate()
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [geoCode, setGeoCode] = useState<any>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const bomservice = new BomService();
    const [changedSizes, setChangedSizes] = useState<any>([])
    const [updatedData, setUpdatedData] = useState<any>([])
    const [selectedData, setSelectedData] = useState<any[]>()
    const [itemDropdownData, setItemDropdownData] = useState<any[]>([])
    const [planSesCode, setPlanSesCode] = useState<any>([]);
    const [planSesYear, setPlanSesYear] = useState<any>([]);
    const [itemDisable, setItemDisable] = useState<boolean>(true);
    const [productCode, setProductCode] = useState<any>([]);

    const bomService = new BomService()
    useEffect(() => {
        // getData();
        // getStyleNumber();
        // getItem();
        // getGeoCode();
    }, [])

    const createdDateHandler = (val) => {
        console.log(val)
        if (val) {
            setItemDisable(false)
        }

    }

    const getData = () => {
        const req = new BomCreationFiltersReq();
        if (form.getFieldValue('item') !== undefined) {
            req.item = form.getFieldValue('item');
        }
        if (form.getFieldValue('styleNumber') !== undefined) {
            req.style = form.getFieldValue('styleNumber');
        }
        if (form.getFieldValue('geoCode') !== undefined) {
            req.geoCode = form.getFieldValue('geoCode');
        }
        if (form.getFieldValue('planningSeasonCode') !== undefined) {
            req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
        }
        if (form.getFieldValue('planningSeasonYear') !== undefined) {
            req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
        }
        if (form.getFieldValue('productCode') !== undefined) {
            req.productCode = form.getFieldValue('productCode');
        }
        req.fromDate = dayjs(form.getFieldValue('createdAt')[0]).format('YYYY-MM-DD')
        req.toDate = dayjs(form.getFieldValue('createdAt')[1]).format('YYYY-MM-DD')
        setTableLoading(true)
        bomservice.getBomCreationData(req).then(res => {
            if (res.status) {
                setFilterData(res.data);
            } else {
                setFilterData([]);
            }
        })
            .catch(_err => {
            }).finally(() => {
                setTableLoading(false)
            });
    };

    // const getStyleNumber = () => {
    //     const req = new ItemInfoFilterReq()
    //     req.fromDate = dayjs(form.getFieldValue('createdAt')[0]).format('YYYY-MM-DD')
    //     req.toDate = dayjs(form.getFieldValue('createdAt')[1]).format('YYYY-MM-DD')
    //     bomService.getPpmStyleNumberByCreatedAt(req).then(res => {
    //         setStyleNumber(res.data)
    //     })
    // }

    const getItem = () => {
        // service.getPpmItemForFactory().then(res => {
        //     setItem(res.data)
        // })
        const req = new ItemInfoFilterReq()
        req.fromDate = dayjs(form.getFieldValue('createdAt')[0]).format('YYYY-MM-DD')
        req.toDate = dayjs(form.getFieldValue('createdAt')[1]).format('YYYY-MM-DD')
        bomService.getItemDropdownByCreatedAt(req).then(res => {
            if (res.status) {
                setItemDropdownData(res.data)
            } else {
                setItemDropdownData([])
            }
        })
    }

    const getSesonYear = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getSeasonYearDropdownByCreatedAt(req).then(res => {
                setPlanSesYear(res.data)
            }).catch(error => {
                console.error("Error fetching season year dropdown:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }

    const getSesonCode = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getSeasonCodeDropdownByCreatedAt(req).then(res => {
                setPlanSesCode(res.data)
            }).catch(error => {
                console.error("Error fetching season code dropdown:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }


    const getStyleNumber = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getPpmStyleNumberByCreatedAt(req).then(res => {
                setStyleNumber(res.data)
            }).catch(error => {
                console.error("Error fetching style numbers:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }
    const getGeoCode = () => {
        service.getPpmdesGeoCodeFactory().then(res => {
            setGeoCode(res.data)
        })
    }
    const getProductCode = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getProductCodeDropdownByCreatedAt(req).then(res => {
                setProductCode(res.data)
            }).catch(error => {
                console.error("Error fetching product code dropdown:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }

    function formatInput(value) {
        return value.replace(/\D/g, '');
    }

    function parseInput(value) {
        // Remove non-numeric characters and parse to number
        return parseFloat(value.replace(/\D/g, ''));
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
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    });

    const onSizeChange = useCallback((size, rec, val) => {
        // Your existing logic for onSizeChange function
        const existingIndex = changedSizes.findIndex(item => item.poLine === rec.poLine && item.size === size);
        if (existingIndex !== -1) {
            const changedSizesTemp = [...changedSizes];
            changedSizesTemp[existingIndex] = { ...changedSizesTemp[existingIndex], qty: val, };
            setChangedSizes(changedSizesTemp);
        } else {
            const newSizeObj = { poLine: rec.poLine, qty: val, size, key: rec.poLine + size };
            setChangedSizes(prevState => [...prevState, newSizeObj]);

        }
        props.sendUpdatedData(changedSizes)
    }, [changedSizes, setChangedSizes]);

    const columns = [
        {
            title: 'Sno',
            render: (v, r, i) => i + 1
        }, {
            title: "PO + Line",
            dataIndex: 'poLine',
            ...getColumnSearchProps('poLine'),
        }, {
            title: "Style",
            dataIndex: 'styleNumber'
        }, {
            title: "Item",
            dataIndex: 'item'
        }, {
            title: "Geo code",
            dataIndex: 'geoCode'
        }, {
            title: "Destination",
            dataIndex: 'destinationCountry'
        },
        {
            title: "Destination",
            dataIndex: 'destinationCountry'
        }, {
            title: "Plant",
            dataIndex: 'plant'
        },
        {
            title: "Season Code",
            dataIndex: 'planningSeasonCode'
        },
        {
            title: "Year",
            dataIndex: 'planningSeasonYear'
        },


    ]

    function renderColumns(): any {
        const unWantedColumns = ['poNumber', 'poLineItemNumber', 'destinationCountryCode', 'genderAgeDesc',]
        if (filterData.length)
            return Object.keys(filterData[0]).filter((k) => !unWantedColumns.includes(k)).map((key) => {
                return {
                    title: bomGenerationColumnsMapping[key] ? bomGenerationColumnsMapping[key] : key,
                    dataIndex: key,
                    width: '100px',
                    key,
                    fixed: key == 'poLine',
                    ...getColumnSearchProps(key),
                    render: (value, row, index) => {
                        if (bomGenerationColumnsMapping[key]) {
                            return value
                        }
                        else {
                            return <InputNumber type='number' onChange={(v) => onSizeChange(key, row, v)} key={row.poAndLine + key + index} defaultValue={value} formatter={formatInput} parser={parseInput} />
                        }
                    }
                    // bomGenerationColumnsMapping[key] && bomGenerationColumnsMapping[key] !='Item' ?
                    //     value
                    //     :
                    //     <InputNumber onChange={(v) => onSizeChange(key, row, v)}  key={row.poAndLine + key + index} defaultValue={value} formatter={formatInput} parser={parseInput} />
                }
            }
            );

        return undefined
    }


    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        // window.location.reload();

    };

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    };


    const onSelectChange = (newSelectedRowKeys: any, selectedRows: any[]) => {
        const isItemNoNull = selectedRows.find((v) => v.item == null)
        if (isItemNoNull) {
            notification.info({ message: `Please update ItemNo for all the selected PO's`, placement: 'topRight' })
            return
        }
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedData(selectedRows)
        props.sendSelectedData(selectedRows)
        props.sendSelectedKeys(newSelectedRowKeys)

    };

    const onSelectAllChange = (e) => {
        const checked = e.target.checked;
        const allRowKeys = filterData.map((v) => v.poLine)
        setSelectedRowKeys(checked ? allRowKeys : []);
    };

    const rowSelection = {
        selectedRowKeys,
        selectedData,
        onChange: onSelectChange,
        // onSelectAll: onSelectAllChange,
    };


    const changedSizesColumns = [
        {
            title: 'Po+Line',
            dataIndex: 'poLine',

        },
        {
            title: 'Size',
            dataIndex: 'size',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
        }
    ]

    function onReset() {
        setFilterData([])
        setSelectedData([])
        setChangedSizes([])
        setSelectedRowKeys([])
        form.resetFields()
    }
    const handleExport = (e: any) => {
        e.preventDefault();


        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [

            {
                title: 'PO + Line',
                dataIndex: 'poLine',

            },
            {
                title: 'Bom Item',
                dataIndex: 'item',
            },
            {
                title: 'Style',
                dataIndex: 'styleNumber',
            },

            {
                title: 'Geo Code',
                dataIndex: 'geoCode',
            },
            {
                title: 'Destination Country',
                dataIndex: 'destinationCountry'
            },

            {
                title: ' Season Code',
                dataIndex: 'planningSeasonCode',

            },
            {
                title: ' Season Year',
                dataIndex: 'planningSeasonYear'
            },
            {
                title: "Product Code",
                dataIndex: 'productCode'
            },
            {
                title: "Color Desc",
                dataIndex: 'colorDesc'
            },
        ]


        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(filterData);
        excel.saveAs(`Generate-proposal-${currentDate}.xlsx`);
    }


    return (
        <> <Card headStyle={{ fontWeight: 'bold' }} extra={filterData.length > 0 ? <Button
            type="default"
            style={{ color: 'green' }}
            onClick={handleExport}
            icon={<FileExcelFilled />}>Download Excel</Button> : null}>
            <Form onFinish={getData}
                form={form}
                layout='vertical'
            >
                <Row gutter={[24, 4]}>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='item' label='Item' >
                            <Select
                                onDropdownVisibleChange={getItem}
                                showSearch placeholder="Select Item" optionFilterProp="children" allowClear mode='multiple'>
                                {item?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5 }}   >
                        <Form.Item name='createdAt' label='Created Date' rules={[{ required: true, message: 'Created Date is required' }]}>
                            <RangePicker style={{ width: '100%' }} onChange={createdDateHandler} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='item' label='Item' >
                            <Select onFocus={getItem} mode='multiple' placeholder='Select Item' showSearch disabled={itemDisable} allowClear>
                                {
                                    itemDropdownData.map(e => {
                                        return (
                                            <Option key={e.item} value={e.item}>{e.item}</Option>
                                        )
                                    })
                                }

                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }}  >
                        <Form.Item name='styleNumber' label='Style Number' >
                            <Select
                                mode='multiple'
                                onFocus={getStyleNumber}
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
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 3 }}  >
                        <Form.Item name='geoCode' label='Geo Code' >
                            <Select
                                mode='multiple'
                                onDropdownVisibleChange={getGeoCode}
                                showSearch
                                placeholder="Select Geo Code"
                                optionFilterProp="children"
                                allowClear
                            >
                                {geoCode?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.geo_code}>{inc.geo_code}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 3 }} xl={{ span: 3 }} >
                        <Form.Item name='planningSeasonCode' label=' Season' >
                            <Select
                                showSearch
                                onDropdownVisibleChange={getSesonCode}

                                placeholder=" Season Code"
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='planningSeasonYear' label='Year' >
                            <Select
                                showSearch
                                onDropdownVisibleChange={getSesonYear}

                                placeholder=" Year"
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='productCode' label='Product Code' >
                            <Select
                                showSearch
                                onDropdownVisibleChange={getProductCode}
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType="submit"
                            icon={<SearchOutlined />}
                            type="primary">Submit</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType='button' icon={<UndoOutlined />} onClick={() => onReset()}>
                            RESET
                        </Button>
                    </Col>
                </Row>

            </Form>
            <Row gutter={[24, 4]}>
                <Table
                    loading={tableLoading}
                    size='small'
                    // pagination={false}
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        }
                    }}
                    scroll={{ x: 'max-content', y: 450 }}
                    bordered
                    rowKey={record => record.poLine}
                    columns={renderColumns()}
                    dataSource={filterData}
                    rowSelection={rowSelection}
                />

                {/* <Col span={8}>
                    <Table size='small'
                        //  pagination={false}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 450 }}
                        bordered
                        rowKey={record => record.poLine}
                        columns={changedSizesColumns}
                        dataSource={changedSizes}
                    />
                </Col> */}
            </Row>
            <br />
        </Card>

        </>
    )
}
