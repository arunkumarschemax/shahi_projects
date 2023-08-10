import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button } from 'antd';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
// import { NikeService } from '@project-management-system/shared-services';
import Highlighter from 'react-highlight-words';
import Item from 'antd/es/descriptions/Item';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { ColumnProps } from 'antd/es/table';
import { Tooltip } from 'highcharts';


const DivertReport = () => {
 
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);

    const [factory, setFactory] = useState([]);
    const { RangePicker } = DatePicker;
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const { Option } = Select;
    // const service = new NikeService();
    const [form] = Form.useForm();
    const [filterData,setFilterData] = useState<any>([])

    const Finish = (values: any) => {
        console.log(values,'vallllll');
        // if (values.DPOMLineItemStatus !== undefined) {
        //     // getFactoryStatus(values)
        // }/
        if (values.DPOMLineItemStatus === undefined) {
            setFilterData(gridData)
        }else if(values.DPOMLineItemStatus === "Accepted"){
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Accepted"))
        }else if(values.DPOMLineItemStatus === "Unaccepted"){
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Unaccepted"))
        }else if(values.DPOMLineItemStatus === "Cancelled"){
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Cancelled"))
        }else if(values.DPOMLineItemStatus === "Closed"){
            setFilterData(gridData.filter(a => a.DPOMLineItemStatus === "Closed"))
        }
    }

    const getFactoryStatus = (values: any) => {
        // service.getByFactoryStatus().then(res => {
        //     if (res.status) {
        //         setGridData(res.data)
        //     } else {
        //         setGridData([])
        //     }
        // })
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
        // service.getFactoryReportData().then(res => {
        //     if (res.status) {
        //         setGridData(res.data)
        //         setFilterData(res.data)
        //         setFilteredData(res.data)
        //     }
        // }).catch(err => {
        //     console.log(err.message)
        // })
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
            { title: 'Po+Line ', dataIndex: 'Po+Line' },
            { title: 'Last Modified Date', dataIndex: 'lastModifiedDate' },
            { title: 'Item', dataIndex: 'Item' },
            { title: 'Total Item Qty', dataIndex: 'totalItemQty' },
            { title: 'Factory', dataIndex: 'Factory' },
            { title: 'Document Date', dataIndex: 'documentDate' },
            { title: 'Purchase Order Number', dataIndex: 'purchase Order Number' },
            { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Product Code', dataIndex: 'productCode' },
            { title: 'Colour Description', dataIndex: 'colorDesc' },
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
        let formattedDate = null;
        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('YYYY-MM-DD');
                break;
            }
        }
        return formattedDate;
    }
    const columns: ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: "Plant",
            dataIndex: "",
            // ...getColumnSearchProps("indentCode"),
        },
        {
            title: "Product Code",
            dataIndex: "",
            sorter: (a, b) => a.owner.localeCompare(b.owner),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps("owner"),
        },   {
            title: "Line Status",
            dataIndex: "",
            sorter: (a, b) => a.indentType.localeCompare(b.indentType),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps("indentType"),
        },
        {
            title: 'Document Date',
            dataIndex: '',
            render: (_, record) => {
                const pickupDate = moment(record.pickRequestsInfo[0]?.pickupDate);
                return (
                    <>
                        {pickupDate.format('YYYY-MM-DD HH:MM:SS')}
                    </>
                );
            }
        },
        {
            title: 'Old Po',
            dataIndex: 'dueDate',
            
        },
        {
            title: 'Old Po Line',
            dataIndex: 'dueDate',
            
        },
        {
            title: 'Balance Qty',
            dataIndex: '', 
        },
        {
            title: 'Destination',
            dataIndex: '', 
        },
        {
            title: 'Shipment Type',
            dataIndex: '', 
        },
        {
            title: 'Inventory Segment Code',
            dataIndex: '', 
        },
        {
            title: 'OGAC',
            dataIndex: '', 
        },
        {
            title: 'GAC',
            dataIndex: '', 
        },
        {
            title: 'Product Code',
            dataIndex: '', 
        },
        {
            title: 'Line Status',
            dataIndex: '', 
        },
        {
            title: 'Document Date',
            dataIndex: '', 
        },
        {
            title: 'New Po',
            dataIndex: '', 
        },{
            title: 'New Po Line',
            dataIndex: '', 
        },
        {
            title: 'Quantity',
            dataIndex: '', 
        },{
            title: 'Item Vas',
            dataIndex: '', 
        },{
            title: 'Shipment Type',
            dataIndex: '', 
        },
    
        
  
        // {
        //     title: `Action`,
        //     dataIndex: "action",
        //     fixed:"right",
        //     render: (text, rowData, index) => (
        //       <span>
        //         <Tooltip placement="top" title="Detail View">
        //           <Button type="link" onClick={() => DetailView(rowData.id)}>
        //             <EyeOutlined type="view" />
        //           </Button>
        //         </Tooltip>
        //         <Tooltip placement="top" title='Edit'>
        //           <Tag>
        //             <EditOutlined
        //               className={'editSamplTypeIcon'}
        //               type="edit"
        //               onClick={() => {
        //                 console.log(rowData, '---------rowdaatta')
        //                 openFormWithData(rowData, rowData.id)
        //               }}
        //               style={{ color: '#1890ff', fontSize: '14px' }}
        //             />
        //           </Tag>
        //         </Tooltip>
        //         {rowData.indentStatus !== "CANCELLED" || rowData.indentStatus !== "VENDOR CONFRIMED" ? (<Tooltip placement='top' title='Cancel Indent'>
        //             <Popconfirm onConfirm={vale => { cancelIndent(rowData.id) }} title={"Are you sure to Cancel ?"}>
        //               <Tag > <CloseOutlined style={{ color: 'red', fontSize: '14px', tabSize: 20 }} /></Tag>
        //             </Popconfirm>
        //           </Tooltip>
        //         ) : null}
        //       </span>
        //     ),
        //   },
    ]



    return (
        <>
            <Card title="Divert Report" headStyle={{ fontWeight: 'bold',backgroundColor:"skyblue" }}
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
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Factory Report Date" name="fromDate">
                                <RangePicker onChange={EstimatedETDDate} />
                            </Form.Item>
                        </Col> */}
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
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
                        </Col> */}
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '42px' }}>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Filter</Button>
                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
                {/* <Row gutter={80}>
                    <Col >
                        <Card title={'Total order Qty : ' + gridData.length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: '#B1A44C' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Total Shipped : ' + factory.length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: '#B1A44C' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Balance to ship : ' + factory.length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: '#B1A44C' }}></Card>
                    </Col>
                </Row><br></br>

                <Row gutter={70}>
                    <Col >
                        <Card title={'Total PO Count : ' + gridData.length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: ' lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Accepted PO Count : ' + gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} style={{ textAlign: 'left', width: 200, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Unaccepted PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Closed PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Cancelled PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col>
                </Row><br></br> */}
                <Card >
                    <Table
                        columns={columns}
                        className="custom-table-wrapper"
                        //size="small"
                        // dataSource={gridData}
                        dataSource={filterData}
                        scroll={{ x: 'max-content' }}
                        bordered style={{ backgroundColor: "green" }} />
                </Card>
            </Card>
        </>
    )
}

export default DivertReport
