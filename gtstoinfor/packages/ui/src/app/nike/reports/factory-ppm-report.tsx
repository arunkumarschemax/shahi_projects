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
    const [filterData, setFilterData] = useState<any>([])

    const Finish = (values: any) => {
        // if (values.DPOMLineItemStatus !== undefined) {
        //     // getFactoryStatus(values)
        // }/
        if (values.DPOMLineItemStatus === undefined) {
            setFilterData(gridData)
        } else if (values.DPOMLineItemStatus === "Accepted") {
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Accepted"))
        } else if (values.DPOMLineItemStatus === "Unaccepted") {
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Unaccepted"))
        } else if (values.DPOMLineItemStatus === "Cancelled") {
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Cancelled"))

        } else if (values.DPOMLineItemStatus === "Closed") {
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Closed"))
        }
    }

    const getFactoryStatus = (values: any) => {
        service.getByFactoryStatus().then(res => {
            if (res.status) {
                setGridData(res.data)
            } else {
                setGridData([])
            }
        })
    }

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
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



    const EstimatedETDDate = (value) => {
        if (value) {
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }


    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        service.getFactoryReportData().then(res => {
            if (res.status) {
                setGridData(res.data)
                setFilterData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    // const handleExport = (e: any) => {
    //     e.preventDefault();

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
            { title: 'Total Item Qty', dataIndex: 'totalItemQty' },
            { title: 'Factory', dataIndex: 'factory' },
            { title: 'Document Date', dataIndex: 'documentDate' },
            { title: 'Purchase Order Number', dataIndex: 'purchaseOrderNumber' },
            { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Product Code', dataIndex: 'productCode' },
            { title: 'Colour Description', dataIndex: 'colorDesc' },
            { title: 'CO', dataIndex: ' ' },
            { title: 'CO Final Approval Date', dataIndex: ' ' },
            { title: 'Plan No', dataIndex: ' ' },
            { title: 'Lead Time', dataIndex: ' ' },
            { title: 'Category', dataIndex: 'categoryCode' },
            { title: 'Category Description', dataIndex: 'categoryDesc' },
            { title: 'Vendor Code', dataIndex: 'vendorCode' },
            { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode' },
            { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc' },
            { title: 'Gender Age', dataIndex: ' ' },
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
            { title: 'Track Out Date', dataIndex: ' ' },
            { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate' },
            { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate' },
            { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
            { title: 'GAC Reason Description', dataIndex: ' ' },
            { title: 'Shipping Type', dataIndex: 'shippingType' },
            { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode' },
            { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc' },
            { title: 'Launch Code', dataIndex: 'launchCode' },
            { title: 'Mode Of Transportation', dataIndex: ' ' },
            { title: 'In Co Terms', dataIndex: 'inCoTerms' },
            { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
            { title: 'Purchase Group', dataIndex: 'purchaseGroupCode' },
            { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
            { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
            { title: '2XL', dataIndex: ' ' },
            { title: '2XL-S', dataIndex: ' ' },
            { title: '2XL-T', dataIndex: ' ' },
            { title: '2XLTT', dataIndex: ' ' },
            { title: '2XS', dataIndex: ' ' },
            { title: '3XL', dataIndex: ' ' },
            { title: '3XL-T', dataIndex: ' ' },
            { title: '3XL-TT', dataIndex: ' ' },
            { title: '4XL', dataIndex: ' ' },
            { title: '4XL-S', dataIndex: ' ' },
            { title: '4XL-T', dataIndex: ' ' },
            { title: '5XL', dataIndex: ' ' },
            { title: 'CUSTM', dataIndex: ' ' },
            { title: 'L', dataIndex: ' ' },
            { title: 'L+', dataIndex: ' ' },
            { title: 'L-S', dataIndex: ' ' },
            { title: 'L-T', dataIndex: ' ' },
            { title: 'LTT', dataIndex: ' ' },
            { title: 'M', dataIndex: ' ' },
            { title: 'M+', dataIndex: ' ' },
            { title: 'M-S', dataIndex: ' ' },
            { title: 'M-T', dataIndex: ' ' },
            { title: 'S', dataIndex: ' ' },
            { title: 'S+', dataIndex: ' ' },
            { title: 'S-S', dataIndex: ' ' },
            { title: 'S-T', dataIndex: ' ' },
            { title: 'XL', dataIndex: ' ' },
            { title: 'XL+', dataIndex: ' ' },
            { title: 'XL-S', dataIndex: ' ' },
            { title: 'XL-T', dataIndex: ' ' },
            { title: 'XLTT', dataIndex: ' ' },
            { title: 'XS', dataIndex: ' ' },
            { title: 'XS-S', dataIndex: ' ' },
            { title: 'XS-T', dataIndex: ' ' },
            { title: 'Grand Total', dataIndex: ' ' },
            { title: 'Actual Shipped Qty', dataIndex: ' ' },
            { title: 'VAS-Size', dataIndex: 'VASSize' },
            { title: 'Item Vas Text', dataIndex: 'itemVasText' },
            { title: 'Item Text', dataIndex: 'itemText' },

        ]


        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`factory-report-${currentDate}.xlsx`);
    }



    function convertToYYYYMMDD(inputDate) {
        const formatsToTry = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'YYYY-MM-DD'];
        let formattedDate;
        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('YYYY-MM-DD');
                break;
            }
        }
        return formattedDate;
    }

    const totalItemQty = gridData?.map(i => i.totalItemQty)
    const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

    const columns: ColumnsType<any> = [
        {
            title: 'Po+Line',
            dataIndex: 'purchaseOrderNumber-poLineItemNumber',
            render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}`,

        },
        {
            title: 'Last Modified Date',
            dataIndex: 'lastModifiedDate',

        },
        {
            title: 'Item',
            dataIndex: 'Item',
            ...getColumnSearch('Item'),

        },
        {
            title: 'Total Item Qty',
            dataIndex: 'totalItemQty',

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
            dataIndex: '',

        },
        {
            title: 'CO Final Approval Date',
            dataIndex: '',

        },
        {
            title: 'Plan No',
            dataIndex: '',

        },
        {
            title: 'Lead Time',
            dataIndex: '',

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
            dataIndex: '',

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



    ];



    return (
        <>
            <Card title="Factory PPM" headStyle={{ fontWeight: 'bold' }}

                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
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
                            <Form.Item name="DPOMLineItemStatus" label="Factory Status">
                                <Select
                                    showSearch
                                    placeholder="Select Factory Status"
                                    optionFilterProp="children"
                                    allowClear>
                                    <Option value="Accepted">ACCEPTED</Option>
                                    <Option value="Unaccepted">UNACCEPTED</Option>
                                    <Option value="Cancelled">CANCELLED</Option>
                                    <Option value="Closed">CLOSED</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '42px' }}>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Filter</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row gutter={80}>
                    <Col >
                        <Card title={'Total order Qty : ' + count} style={{ textAlign: 'left', width: 250, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Total Shipped : ' + factory.length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Balance to ship : ' + factory.length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                </Row><br></br>

                <Row gutter={70}>
                    <Col >
                        <Card title={'Total PO Count : ' + gridData.length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Accepted PO Count : ' + gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} style={{ textAlign: 'left', width: 200, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Unaccepted PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Closed PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Cancelled PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col>
                </Row><br></br>
                <Card >
                    <Table
                        columns={columns}
                        // dataSource={gridData}
                        dataSource={filterData}
                        scroll={{ x: 1000 }}
                        bordered />
                </Card>
            </Card>
        </>
    )
}

export default FactoryPPMReport;
