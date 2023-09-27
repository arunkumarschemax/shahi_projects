import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tag, Typography } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';

const ShipmentChangesCompareGrid = () => {

    const service = new NikeService()
    const [poStatusData, setPOStatusData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [itemChangeData, setItemChangeData] = useState([])
    const [filteredPOStatusData, setFilteredPOStatusData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredItemChangeData, setFilteredItemChangeData] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [phaseData, setPhaseWiseData] = useState<any[]>([]);
    const [phaseExcelData, setPhaseWiseExcelData] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [unitChangeData, setUnitChangeData] = useState([])
    const [page, setPage] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select
    const [poLine, setPoLine] = useState<any>([]);


    useEffect(() => {
        getGACChangeData()
        getPlantCodeChangeData()

        getMRGACChangeData()
        getModeOfTransportChangeData()
        getPoLine()
    }, [])
    const getPoLine = () => {
        service.getPpmPoLineForNikeOrder().then(res => {
            setPoLine(res.data)
        })
    }

    const getGACChangeData = () => {
        service.getGACChangeData().then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
        })
        console.log(filteredQtyData, "filteredQtyData")
    }

    const getMRGACChangeData = () => {
        service.getMRGACChangeData().then((res) => {
            setUnitChangeData(res.data)
        })
    }

    const getModeOfTransportChangeData = () => {
        service.getModeOfTransportChangeData().then((res) => {
            setItemChangeData(res.data)
            setFilteredItemChangeData(res.data)
        })
    }

    const getPlantCodeChangeData = () => {
        service.getPlantCodeChangeData().then((res) => {
            setPOStatusData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }

    const getShippingTypeChangeData = () => {
        service.getShippingTypeChangeData().then((res) => {
            setPOStatusData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }




    function convertToYYYYMMDD(inputDate) {
        const formatsToTry = ['DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
        let formattedDate = null;

        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('MM/DD/YYYY');
                break;
            }
        }
        return formattedDate;
    }

    const exportExcel = () => {
        const excel = new Excel();
        if (filteredQtyData?.length > 0) {
            excel
                .addSheet('Quantity changes')
                .addColumns(data1)
                .addDataSource(filteredQtyData, { str2num: true })
        }
        if (unitChangeData?.length > 0) {
            excel
                .addSheet('Unit changes')
                .addColumns(data4)
                .addDataSource(unitChangeData, { str2num: true })
        }
        if (itemChangeData?.length > 0) {
            excel
                .addSheet('Item changes')
                .addColumns(data2)
                .addDataSource(itemChangeData, { str2num: true })
        }
        if (poStatusData?.length > 0) {
            excel
                .addSheet('PO Line Item Status Change')
                .addColumns(data3)
                .addDataSource(poStatusData, { str2num: true })
        }
        excel.saveAs('revisedPOs.xlsx');
    }

    const data1 = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'new_val',
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ]

    const data2 = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'new_val',
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs'
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date'
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const data3 = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Contracted Date',
            dataIndex: 'new_val',
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const data4 = [
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: ' sum Of Qrd Qty last Week',
            dataIndex: 'old_qty_value',
        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'new_qty_value',
        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diff'
        },

    ];

    let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'Production Plan Type Name', dataIndex: 'prodPlanTypeName' },
        { title: 'Sum of Ord Qty last week', dataIndex: 'oldOrderQtyPcs' },
        { title: 'Sum of Ord Qty this week', dataIndex: 'newOrderQtyPcs' },
        { title: 'Difference Qty', dataIndex: 'difference' }
    ]

    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

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

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item'
        },
        {
            title: 'Unit',
            dataIndex: 'factory'
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Change from OGAC',
            dataIndex: 'change_from_ogac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Change to OGAC',
            dataIndex: 'change_to_ogac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Change from GAC',
            dataIndex: 'old_val',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Change to GAC',
            dataIndex: 'new_val',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'RC Code',
            dataIndex: 'rc_code'
        }
    ];

    const columns1: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'report_generate_date',
        },
        {
            title: 'Item',
            dataIndex: 'item'
        },
        {
            title: 'Unit',
            dataIndex: 'unit'
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'CO Number',
            dataIndex: 'co_number'
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date'
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Mode of Transportation Code in DPOM',
            dataIndex: 'mode_of_transportation_code_in_DPOM'
        },
        {
            title: 'Mode of Transportation Code in CRM CO',
            dataIndex: 'mode_of_transportation_code_in_crm_co'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous Item',
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Item',
            dataIndex: 'new_val',
            // width :'190px',
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? convertToYYYYMMDD(record.last_update_date) : '-'
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];

    const columns2: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous Line Item Status',
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Line Item Status',
            dataIndex: 'new_val',
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )

        },
        {
            title: 'Order Status',
            dataIndex: 'dpom_item_line_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];

    const columns3: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Genarate Date',
            dataIndex: 'created_at',
            // ...getColumnSearchProps('po_number')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            // ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            //...getColumnSearchProps('factory')
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'CO Number',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
            ...getColumnSearchProps('ogac')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            ...getColumnSearchProps('gac')
        },
        {
            title: 'Mode of Transportation Code in DPOM',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Mode of Transportation Code in CRM CO',
            dataIndex: '',
            ...getColumnSearchProps('')
        },

    ];

    const columns4: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        // {
        //     title: 'PO Number',
        //     dataIndex: 'po_number',
        // },
        {
            title: 'PO And Line ',
            dataIndex: 'po_and_line', align: 'center',
            ...getColumnSearchProps('po_and_line')
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            align: 'center',
            ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous MRGAC',
            dataIndex: 'old_val',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Revised MRGAC',
            dataIndex: 'new_val',
            render: (text) => moment(text).format('MM/DD/YYYY')
        }
    ];

    const columns5: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Genarate Date',
            dataIndex: '',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
        },
        {
            title: 'Document Date',
            dataIndex: '',
            //  ...getColumnSearchProps('factory')
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'PRODUCT CODE',
            dataIndex: ''
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
            ...getColumnSearchProps('ogac')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            ...getColumnSearchProps('gac')
        },
        {
            title: 'Change from Inventory Segment Code',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change To Inventory Segment Code',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change from Destination Country Name',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change To Destination Country Name',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change from Ship To Customer Number',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change to Ship To Customer Number',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Ship To Customer Number in DIA',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change from Plant Code',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change to Plant Code',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        }
    ];

    const EstimatedETDDate = (value) => {
        if (value) {
            const fromDate = value[0];
            const toDate = value[1];
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#B229DE' }}>GAC Revised PO's : {filteredQtyData?.length} </b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={filteredQtyData} columns={columns} scroll={{ x: 'max-content' }}
            />,
        },
        {
            key: '2',
            label: <b>MRGAC Revised PO's : {unitChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={unitChangeData} columns={columns4} scroll={{ x: 'max-content' }}
            />,
        },
        {
            key: '3',
            label: <b style={{ color: '#29D6DE' }} >Mode of Transportation Revised PO's : {itemChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={itemChangeData} columns={columns3} scroll={{ x: 'max-content' }}
            />,
        },
        {
            key: '4',
            label: <b>Plant Code Revised PO's : {poStatusData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={poStatusData} columns={columns5} scroll={{ x: 'max-content' }}
            />,
        }
    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
    }

    return (
        <Card title='Compare Orders' extra={(<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>)}>
            {/* <Form form={form} layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 4 }} >
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ marginRight: 50, width: 100 }}
                            htmlType="button"
                        // onClick={getFilterdData}
                        >Search</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<UndoOutlined />}
                            htmlType="submit"
                            onClick={onReset}>Reset</Button>
                    </Col>
                </Row>
            </Form> */}
            {filteredQtyData || unitChangeData || itemChangeData || poStatusData ? <>
                <Tabs type='card' items={items} />
            </> : <></>}

        </Card>
    );
};

export default ShipmentChangesCompareGrid;