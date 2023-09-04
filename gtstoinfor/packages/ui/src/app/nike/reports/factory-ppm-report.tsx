import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button } from 'antd';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { NikeService } from '@project-management-system/shared-services';
import Highlighter from 'react-highlight-words';
import Item from 'antd/es/descriptions/Item';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { ColumnsType } from 'antd/es/table';
import { FactoryReportModel, PpmDateFilterRequest } from '@project-management-system/shared-models';


const FactoryPPMReport = () => {

    const [factory, setFactory] = useState([]);
    const { RangePicker } = DatePicker;
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const { Option } = Select;
    const service = new NikeService();
    const [form] = Form.useForm();
    const searchInput = useRef<any>(null);
    const [searchText, setSearchText] = useState<any>([]);
    const [searchedColumn, setSearchedColumn] = useState<any>([]);
    const [filterData, setFilterData] = useState<any>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);




    const getFactoryStatus = (values: any) => {
        service.getByFactoryStatus().then(res => {
            if (res.status) {
                setGridData(res.data)
            } else {
                setGridData([])
            }
        })
    }

    const resetHandler = () => {
        form.resetFields();
        getData();

    }
    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        window.location.reload();
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearch = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters);
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select());
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const ClearData = () => {
        form.resetFields();
    }

    // const EstimatedETDDate = (value) => {
    //     if (value) {
    //         const fromDate = value[0].format('YYYY-MM-DD');
    //         const toDate = value[1].format('YYYY-MM-DD');
    //         setSelectedEstimatedFromDate(fromDate)
    //         setSelectedEstimatedToDate(toDate)
    //     }
    // }


    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        const req = new PpmDateFilterRequest()
        if (form.getFieldValue('lastModifiedDate') !== undefined) {
            req.lastModifedStartDate = (form.getFieldValue('lastModifiedDate')[0]).format('YYYY-MM-DD')
        }
        if (form.getFieldValue('lastModifiedDate') !== undefined) {
            req.lastModifedEndtDate = (form.getFieldValue('lastModifiedDate')[1]).format('YYYY-MM-DD')
        }
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD')
        }
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentEndtDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD')
        }
        service.getFactoryReportData(req).then(res => {
            if (res.status) {
                setGridData(res.data)
                setFilterData(res.data)
                setFilteredData(res.data)
                Finish(res.data)
            }

        }).catch(err => {
            console.log(err.message)
        })
        console.log(req)

    }

    const Finish = (data: any) => {
        const values = form.getFieldsValue();

        if (!values.DPOMLineItemStatus || values.DPOMLineItemStatus.length === 0) {
            setFilterData(gridData);
        } else {
            const filteredData = gridData.filter(item =>
                values.DPOMLineItemStatus.includes(item.DPOMLineItemStatus)
            );
            setFilterData(filteredData);
        }
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
            { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}` },
            { title: 'Last Modified Date', dataIndex: 'lastModifiedDate' },
            { title: 'Item', dataIndex: 'item' },
            // { title: 'Total Item Qty', dataIndex: 'totalItemQty' },
            { title: 'Factory', dataIndex: 'factory' },
            { title: 'Document Date', dataIndex: 'documentDate' },
            { title: 'Purchase Order Number', dataIndex: 'purchaseOrderNumber' },
            { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Product Code', dataIndex: 'productCode' },
            { title: 'Colour Description', dataIndex: 'colorDesc' },
            { title: 'CO', dataIndex: 'customerOrder' },
            { title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate' },
            { title: 'Plan No', dataIndex: 'planNo' },
            { title: 'Lead Time', dataIndex: 'leadTime' },
            { title: 'Category', dataIndex: 'categoryCode' },
            { title: 'Category Description', dataIndex: 'categoryDesc' },
            { title: 'Vendor Code', dataIndex: 'vendorCode' },
            { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode' },
            { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc' },
            { title: 'Gender Age', dataIndex: 'genderAgeCode' },
            { title: 'Gender Age Description', dataIndex: ' ' },
            { title: 'Destination Country Code ', dataIndex: 'destinationCountryCode' },
            { title: 'Destination Country Name', dataIndex: 'destinationCountry' },
            { title: 'Plant Code', dataIndex: 'plant' },
            { title: 'Plant Name', dataIndex: 'plantName' },
            { title: 'Trading Co PO Number', dataIndex: 'tradingCoPoNumber' },
            { title: 'UPC', dataIndex: 'UPC' },
            { title: 'Sales Order Number', dataIndex: ' ' },
            { title: 'Sales Order Item Number', dataIndex: ' ' },
            { title: 'Customer PO', dataIndex: 'customerPO' },
            { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber' },
            { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName' },
            { title: 'Planning Season Code', dataIndex: 'planningSeasonCode' },
            { title: 'Planning Season Year', dataIndex: 'planningSeasonYear' },
            { title: 'Doc Type', dataIndex: 'docTypeCode' },
            { title: 'Doc Type Description ', dataIndex: 'docTypeDesc' },
            { title: 'MRGAC', dataIndex: 'MRGAC' },
            { title: 'OGAC', dataIndex: 'OGAC' },
            { title: 'GAC', dataIndex: 'GAC' },
            { title: 'Truck Out Date', dataIndex: 'truckOutDate' },
            { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate' },
            { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate' },
            { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
            { title: 'GAC Reason Description', dataIndex: ' ' },
            { title: 'Shipping Type', dataIndex: 'shippingType' },
            { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode' },
            { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc' },
            { title: 'Launch Code', dataIndex: 'launchCode' },
            { title: 'Mode Of Transportation', dataIndex: 'modeOfTransportationCode' },
            { title: 'In Co Terms', dataIndex: 'inCoTerms' },
            { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
            { title: 'Purchase Group', dataIndex: 'purchaseGroupCode' },
            { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
            { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
            { title: 'Grand Total', dataIndex: ' ' },
            { title: 'Actual Shipped Qty', dataIndex: 'actualShippedQty' },
            { title: 'VAS-Size', dataIndex: 'VASSize' },
            { title: 'Item Vas Text', dataIndex: 'itemVasText' },
            { title: 'Item Text', dataIndex: 'itemText' },

        ]
        const sizeHeaders = new Set<string>();

        const excelData = gridData.map(item => {
            const excelItem: any = {
                'Po+Line': `${item.purchaseOrderNumber}-${item.poLineItemNumber}`,
                'Last Modified Date': item.lastModifiedDate,
                'Item': item.item,
            };
            sizeHeaders.forEach(sizeHeader => {
                excelItem[sizeHeader] = item[sizeHeader];
            });

            return excelItem;
        });

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`factory-report-${currentDate}.xlsx`);
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

    const totalItemQty = gridData?.map(i => i.totalItemQty)
    const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

    const renderReport = (data: FactoryReportModel[]) => {
        const sizeHeaders = getSizeWiseHeaders(data);
        const sizeWiseMap = getMap(data);


        const columns: ColumnsType<any> = [
            {
                title: 'Po+Line',
                dataIndex: 'purchaseOrderNumber-poLineItemNumber',
                fixed: 'left',
                render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}`,
            },
            {
                title: 'Last Modified Date',
                dataIndex: 'lastModifiedDate',
            },
            {
                title: 'Item',
                dataIndex: 'item',
                ...getColumnSearch('item'),
            },
            {
                title: 'Factory',
                dataIndex: 'factory',
                ...getColumnSearch('factory'),
            },
            {
                title: 'Document Date',
                dataIndex: 'documentDate',
                // render: (text, record) => {
                //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
                // },
            },
            {
                title: 'Purchase Order Number',
                dataIndex: 'purchaseOrderNumber',
            },
            {
                title: 'PO Line Item Number',
                dataIndex: 'poLineItemNumber',
            },
            {
                title: 'DPOM Line Item Status',
                dataIndex: 'DPOMLineItemStatus',
            },
            {
                title: 'Style Number',
                dataIndex: 'styleNumber',
                ...getColumnSearch('styleNumber'),
            },
            {
                title: 'Product Code',
                dataIndex: 'productCode',
                ...getColumnSearch('productCode'),
            },
            {
                title: 'Colour Description',
                dataIndex: 'colorDesc',
            },
            {
                title: 'CO',
                dataIndex: 'customerOrder',
            },
            {
                title: 'CO Final Approval Date',
                dataIndex: 'coFinalApprovalDate',
            },
            {
                title: 'Plan No',
                dataIndex: 'planNo',
            },
            {
                title: 'Lead Time',
                dataIndex: 'leadTime',
            },
            {
                title: 'Category',
                dataIndex: 'categoryCode',
            },
            {
                title: 'Category Description',
                dataIndex: 'categoryDesc',
            },
            {
                title: 'Vendor Code',
                dataIndex: 'vendorCode',
            },
            {
                title: 'Global Category Core Focus',
                dataIndex: 'gccFocusCode',
            },
            {
                title: 'Global Category Core Focus Description',
                dataIndex: 'gccFocusDesc',
            },
            {
                title: 'Gender Age',
                dataIndex: 'genderAgeCode',
            },
            {
                title: 'Gender Age Description',
                dataIndex: '',
            },
            {
                title: 'Destination Country Code',
                dataIndex: 'destinationCountryCode',
            },
            {
                title: 'destination country Name',
                dataIndex: 'destinationCountry',
            },
            {
                title: 'Plant Code',
                dataIndex: 'plant',
            },
            {
                title: 'Plant Name',
                dataIndex: 'plantName',
            },
            {
                title: 'Trading Co PO Number',
                dataIndex: 'tradingCoPoNumber',
            },
            {
                title: 'UPC',
                dataIndex: 'UPC',
            },
            {
                title: 'Sales Order Number',
                dataIndex: '',
            },
            {
                title: 'Sales Order Item Number',
                dataIndex: '',
            },
            {
                title: 'Customer PO',
                dataIndex: 'customerPO',
            },
            {
                title: 'Change Register',
                dataIndex: 'displayName',
                align: 'center',
            },
            {
                title: 'Total Item Qty',
                dataIndex: 'totalItemQty',
                align: 'center',
                render: (text) => <strong>{text}</strong>
            },


        ];
        sizeHeaders?.forEach(version => {
            columns.push({
                title: version,
                dataIndex: version,
                key: version,
                width: 130,
                align: 'center',
                children: [
                    {
                        title: 'Quantity',
                        dataIndex: '',
                        key: '',
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
                    },
                    {
                        title: 'Legal PO Price',
                        dataIndex: '',
                        key: '',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    return (
                                        sizeData.price
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
                    },
                    {
                        title: 'CO Price',
                        dataIndex: '',
                        key: '',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    return (
                                        sizeData.coPrice
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
                    },
                    {
                        title: 'Price Variation',
                        dataIndex: '',
                        key: '',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    const priceVariation = sizeData.price - sizeData.coPrice;
                                    return (
                                        priceVariation
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
                    },
                ],
                render: (text, record) => {
                    return record.sizeWiseData.find(item => item.sizeDescription === version);
                }
            });
        });

        const getRowClassName = (record) => {
            if (record.displayName) {
                return 'colored-row';
            }
            return '';
        };

        return (<Table columns={columns} dataSource={filterData} pagination={{
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize)
            }
        }} scroll={{ x: 'max-content' }}
            rowClassName={getRowClassName}
        />)
    }

    return (
        <>
            <Card title="Factory PPM" headStyle={{ fontWeight: 'bold' }}

                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Form
                    onFinish={getData}
                    form={form}
                    layout='vertical'>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Last Modified Date" name="lastModifiedDate">
                                <RangePicker />

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Document Date" name="documentDate">
                                <RangePicker />

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
                            <Form.Item name="DPOMLineItemStatus" label="Factory Status">
                                <Select
                                    showSearch
                                    placeholder="Select Factory Status"
                                    optionFilterProp="children"
                                    allowClear mode='multiple'>
                                    <Option value="Accepted">ACCEPTED</Option>
                                    <Option value="Unaccepted">UNACCEPTED</Option>
                                    {/* <Option value="Cancelled">CANCELLED</Option> */}
                                    <Option value="Closed">CLOSED</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '42px' }}>
                            <Form.Item>
                                <Button htmlType="submit"
                                    icon={<SearchOutlined />}
                                    type="primary">SEARCH</Button>
                                <Button
                                    htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                                >
                                    RESET
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row gutter={80}>
                    <Col >
                        <Card title={'Total order Qty : ' + count} style={{ textAlign: 'left', width: 250, height: 45 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Total Shipped : ' + factory.length} style={{ textAlign: 'left', width: 180, height: 45 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Balance to ship : ' + factory.length} style={{ textAlign: 'left', width: 200, height: 45 }}></Card>
                    </Col>
                </Row><br></br>

                <Row gutter={70}>
                    <Col >
                        <Card title={'Total PO Count : ' + gridData.length} style={{ textAlign: 'left', width: 200, height: 45 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Accepted PO Count : ' + gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} style={{ textAlign: 'left', width: 250, height: 45 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Unaccepted PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} style={{ textAlign: 'left', width: 200, height: 45 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Closed PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} style={{ textAlign: 'left', width: 200, height: 45 }}></Card>
                    </Col>
                    <Col>
                        {/* <Card title={'Cancelled PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card> */}
                    </Col>
                </Row><br></br>
                <Card >
                    {/* <Table
                        columns={columns}
                        // dataSource={gridData}
                        dataSource={filterData}
                        scroll={{ x: 1000 }}
                        bordered /> */}
                    {renderReport(filterData)}
                </Card>
            </Card>
        </>
    )
}

export default FactoryPPMReport;