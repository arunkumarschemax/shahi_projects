import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, Button, Checkbox } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';
import { NikeService } from '@project-management-system/shared-services';


interface IExcelColumn {
    title: string;
    dataIndex: string;
    //    children?: CustomExcelColumn[];
}

interface ExpandedRows {
    [key: string]: boolean;
}

const DivertReport = () => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const [dataLength, setDataLength] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const service = new NikeService();
    const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});
    const [textareaValues, setTextareaValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getData();
       // getCount();
    }, [])

    const handleCheckboxChange = (id: string) => {
        if (expandedRows[id]) {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: false }));
        } else {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: true }));
        }
    };

    const handleTextareaChange = (id: string, value: string) => {
        setTextareaValues(prevTextareaValues => ({ ...prevTextareaValues, [id]: value }));
    };

    const handleSubmit = (id: string) => {
        console.log(`Textarea value for ID ${id}:`, textareaValues[id]);
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

    const getCount = () => {
        service.getCountForDivertReport().then(res => {

            if (res.status) {
                setDataLength(res.data)
            }
        })
    }

    const getData = () => {
        service.getDivertReportData().then(res => {
            if (res.status) {
                setItems(res.data);
            }
        })
    }

    const exportedData = [];
    const execlData = items
    let i = 1;
    const data = [
        { title: 'S No', dataIndex: 'sNo', render: (text, object, index) => { return i++; } },
        { title: 'Old Request Date', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plant : '-'; } },
        { title: 'O.From Item', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plant : '-'; } },
        { title: 'O.Unit', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plant : '-'; } },
        { title: 'O.Plant', dataIndex: ['oldPo', 'Plant'], render: (text, record) => { return record.oldPo.Plant ? record.oldPo.Plant : '-'; } },
        { title: 'O.Product Code', dataIndex: ['oldPo', 'productCode'], render: (text, record) => { return record.oldPo.productCode ? record.oldPo.productCode : '-'; } },
        { title: 'O.Line Status', dataIndex: ['oldPo', 'LineStatus'], render: (text, record) => { return record.oldPo.LineStatus ? record.oldPo.LineStatus : '-'; } },
        {
            title: 'O.Document Date',
            dataIndex: ['oldPo', 'DocumentDate'],
            render: (text, record) => {
                return record.oldPo.DocumentDate ? moment(record.oldPo.DocumentDate).utc().format('MM/DD/YYYY') : '-';
            }
        },
        { title: 'Old Po', dataIndex: ['oldPo', 'poNumber'], render: (text, record) => { return record.oldPo.poNumber ? record.oldPo.poNumber : '-'; } },
        {
            title: 'Old Po Line',
            dataIndex: ['oldPo', 'poLine'],
            render: (text, record) => { return record.oldPo.poLine ? record.oldPo.poLine : '-'; }
        },
        { title: 'Old Qantity', dataIndex: ['oldPo', 'Quantity'], render: (text, record) => { return record.oldPo.Quantity ? record.oldPo.Quantity : '-'; } },
        { title: 'Balance Qty', dataIndex: ['oldPo', 'Quantity'], render: (text, record) => { return record.oldPo.Quantity ? record.oldPo.Quantity : '-'; } },
        { title: 'Destination', dataIndex: ['oldPo', 'destination'], render: (text, record) => { return record.oldPo.destination ? record.oldPo.destination : '-'; } },
        { title: 'Shipment Type', dataIndex: ['oldPo', 'shipmentType'], render: (text, record) => { return record.oldPo.shipmentType ? record.oldPo.shipmentType : '-'; } },
        {
            title: 'No of Days to GAC',
            dataIndex: ['oldPo', 'DocumentDate'],
            render: (text, record) => {
                if (record.oldPo.dpomCreatedDates && record.newpo.nogac) {
                    const dpomCreatedDate = moment(record.oldPo.dpomCreatedDates);
                    const nogacDate = moment(record.newpo.nogac);
                    const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                    return daysDifference + ' days';
                } else {
                    return "-";
                }
            }
        },
        { title: 'N.Unit', dataIndex: 'unit', render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plnt : '-'; } },
        { title: 'N.Plant', dataIndex: ['newpo', 'nPlant'], render: (text, record) => { return record.newpo.nPlant ? record.newpo.nPlant : '-'; } },
        { title: 'N.Product Code', dataIndex: ['newpo', 'nproductCode'], render: (text, record) => { return record.newpo.nproductCode ? record.newpo.nproductCode : '-'; } },
        { title: 'N.Line Status', dataIndex: ['newpo', 'nLineStatus'], render: (text, record) => { return record.newpo.nLineStatus ? record.newpo.nLineStatus : '-'; } },
        {
            title: 'N.Document Date',
            dataIndex: ['newpo', 'nDocumentDate'],
            render: (text, record) => {
                return record.newpo.nDocumentDate ? moment(record.newpo.nDocumentDate).utc().format('MM/DD/YYYY') : '-';
            }
        }, { title: 'New Po', dataIndex: ['newpo', 'npoNumber'], render: (text, record) => { return record.newpo.npoNumber ? record.newpo.npoNumber : '-'; } },
        { title: 'New Po Line', dataIndex: ['newpo', 'npoLine'], render: (text, record) => { return record.newpo.npoLine ? record.newpo.npoLine : '-'; } },
        { title: 'N.Quantity', dataIndex: ['newpo', 'nQuantity'], render: (text, record) => { return record.newpo.nQuantity ? record.newpo.nQuantity : '-'; } },
        { title: 'N.Destination', dataIndex: ['newpo', 'ndestination'], render: (text, record) => { return record.newpo.ndestination ? record.newpo.ndestination : '-'; } },
        { title: 'N.Inventory Segment Code', dataIndex: ['newpo', 'ninventorySegmentCode'], render: (text, record) => { return record.newpo.ninventorySegmentCode ? record.newpo.ninventorySegmentCode : '-'; } },
        { title: 'Item Vas', dataIndex: ['newpo', 'nitemVasText'], render: (text, record) => { return record.newpo.nitemVasText ? record.nitemVasText : '-'; } },
        { title: 'Shipment Type', dataIndex: 'nshipmentType', render: (text, record) => { return record.nshipmentType ? record.newpo.nshipmentType : '-'; } },
        { title: 'Item Vas Diff Check', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plant ? record.oldPo.Pant : '-'; } },
        { title: 'Qty Tally-Check	', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plant ? record.oldPo.Pant : '-'; } },
        { title: 'Price-Fob Tally-Check', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plant : '-'; } },
        { title: 'Price-Net Includding Discount Tally-Check', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plant ? record.oldPo.Pant : '-'; } },
        { title: 'Price-Trading Co Net Includding Discount Tally-Check', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo.Plnt ? record.oldPo.Plant : '-'; } },
    ];

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('Divert-report')
            .addColumns(data)
            .addDataSource(items, { str2num: true })
            .saveAs('Divert report.xlsx');
    }

    const columns: ColumnProps<any>[] = [
        {
            title: (
                <div style={{ background: '#CFCFF4 ', padding: '10px' , borderRadius: '5px', display: 'flex', alignItems: 'center', height: 40, justifyContent: 'center' }}>
                  Old
                </div>
              ),
            children: [
                {
                    title: 'S.No',
                    key: 'sno',
                    responsive: ['sm'],
                    render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                },
                {
                    title: "Product Code",
                    dataIndex: ['oldPo', 'productCode'],
                    sorter: (a, b) => a.oldPo.productCode?.localeCompare(b.oldPo.productCode),
                    sortDirections: ["descend", "ascend"],
                    //  fixed:'left'
                },
                {
                    title: "Request Date",
                    dataIndex: "DocumentDate",
                    render: (text, record) => {
                        return record.oldPo.DocumentDate ? moment(record.oldPo.DocumentDate).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: "From Item",
                    dataIndex: "",
                    width:70,
                },
                {
                    title: "Unit",
                    dataIndex: "",width:70,
                },
                {
                    title: "Plant",
                    dataIndex: ['oldPo', 'Plant'],width:70,
                },

                {
                    title: "Line Status",
                    dataIndex: ['oldPo', 'LineStatus'],width:70,
                    // ...getColumnSearchProps("lineStatus"),
                },
                // {
                //     title: 'Document Date',
                //     dataIndex: ['oldPo', 'DocumentDate'],
                //     render: (text, record) => {
                //         return record.oldPo.DocumentDate ? moment(record.oldPo.DocumentDate).format('MM/DD/YYYY') : "-";
                //     }
                // },
                {
                    title: 'Old Po',
                    dataIndex: ['oldPo', 'poNumber'],
                    sorter: (a, b) => a.oldPo.poNumber?.localeCompare(b.oldPo.poNumber),
                    sortDirections: ["descend", "ascend"],width:70,
                },
                {
                    title: 'Old Po Line',
                    dataIndex: ['oldPo', 'poLine'],
                    sorter: (a, b) => a.oldPo.poLine - b.oldPo.poLine,
                    sortDirections: ["descend", "ascend"],width:70,
                },
                {
                    title: 'Old Qantity',
                    //from yesterdays ppm
                    dataIndex: ['oldPo', 'Quantity'],
                    // sorter: (a, b) => a.oldPo.Quantity.localeCompare(b.oldPo.Quantity),
                    // sortDirections: ["descend", "ascend"],
                    width:70,align:'right'
                },
                {
                    title: 'Balance Qty',
                    // from dpom
                    dataIndex: ['oldPo', 'Quantity'],
                    // sorter: (a, b) => a.oquantity.localeCompare(b.oquantity),
                    // sortDirections: ["descend", "ascend"],
                    width:70,align:'right'
                },
                {
                    title: 'Destination',
                    dataIndex: ['oldPo', 'destination'],
                    // sorter: (a, b) => a.oldPo.destination.localeCompare(b.oldPo.destination),
                    // sortDirections: ["descend", "ascend"],
                    width:70,
                },
                {
                    title: 'Shipment Type',
                    dataIndex: ['oldPo', 'shipmentType'],
                    // sorter: (a, b) => a.oldPo.shipmentType.localeCompare(b.oldPo.shipmentType),
                    // sortDirections: ["descend", "ascend"],
                    width:70,
                },
                {
                    title: 'OLD OGAC',
                    dataIndex: ['oldPo', 'ogac'],width:70,
                    render: (text, record) => {
                        return record.oldPo.ogac ? moment(record.oldPo.ogac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'OLD GAC',
                    dataIndex: ['oldPo', 'gac'],width:70,
                    render: (text, record) => {
                        return record.oldPo.gac ? moment(record.oldPo.gac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'Inventory Segment Code',
                    dataIndex: ['oldPo', 'inventorySegmentCode'],width:70,
                    sorter: (a, b) => a.oldPo.inventorySegmentCode.localeCompare(b.oldPo.inventorySegmentCode),
                    sortDirections: ["descend", "ascend"],
                },
                {
                    title: 'GAC Difference',
                    dataIndex: '',width:70,align:'right',
                    render: (text, record) => {
                        if (record.oldPo.ogac && record.newpo.nogac) {
                            const ogacDate = moment(record.oldPo.ogac, 'YYYY-MM-DD');
                            const nogacDate = moment(record.newpo.nogac, 'YYYY-MM-DD');
                            const daysDifference = nogacDate.diff(ogacDate, 'days');
                            return daysDifference + ' days';
                        } else {
                            return "-";
                        }
                    },
                    sorter: (a, b) => a.daysDifference.localeCompare(b.daysDifference),
                    sortDirections: ["descend", "ascend"],
                },
                {
                    title: 'Item Vas',width:70,
                    dataIndex: ['oldPo', 'itemVasText'],
                },
            ] as unknown as null,
        },
        {
            title: (
                <div style={{ background: '#D1D1FF', borderRadius: '5px', display: 'flex', alignItems: 'center', height: 40, justifyContent: 'center', padding: '8px'  }}>
                  New
                </div>
              ),
            children: [
                {
                    title: 'OGAC Date',
                    dataIndex: ['newpo', 'nogac'],width:70,
                    render: (text, record) => {
                        return record.newpo.nogac ? moment(record.newpo.nogac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'GAC Date',
                    dataIndex: ['newpo', 'ngac'],width:70,
                    render: (text, record) => {
                        return record.newpo.ngac ? moment(record.newpo.ngac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: "No of Days to GAC",
                    align: 'right',width:70,
                    render: (text, record) => {
                        if (record.oldPo.dpomCreatedDates && record.newpo.nogac) {
                            const dpomCreatedDate = moment(record.oldPo.dpomCreatedDates);
                            const nogacDate = moment(record.newpo.nogac);
                            const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                            return daysDifference + ' days';
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    title: "To item",
                    align: 'center',width:70,
                    dataIndex: ['newpo', 'item'],
                },
                {
                    title: "Unit",
                    dataIndex: "",width:70,
                },

                {
                    title: "Plant",
                    dataIndex: ['newpo', 'nPlant'],width:70,align:'center'
                },
                {
                    title: "Product Code",
                    dataIndex: ['newpo', 'nproductCode'],
                    sorter: (a, b) => a.newpo.nproductCode.localeCompare(b.newpo.nproductCode),
                    sortDirections: ["descend", "ascend"],width:70,
                },
                {
                    title: "Line Status",
                    dataIndex: ['newpo', 'nLineStatus'],width:70,
                },
                {
                    title: 'Document Date',
                    dataIndex: ['newpo', 'nDocumentDate'],width:70,
                    render: (text, record) => {
                        return record.newpo.nDocumentDate ? moment(record.newpo.nDocumentDate).format("MM/DD/YYYY") : "-";
                    }
                },
                {
                    title: 'New Po',width:70,
                    dataIndex: ['newpo', 'npoNumber'],
                },
                {
                    title: 'New Po Line',width:70,
                    dataIndex: ['newpo', 'npoLine'],align:'center'
                },
                {
                    title: 'Quantity',width:70,
                    dataIndex: ['newpo', 'nQuantity'],align:'right'
                },
                {
                    title: 'Destination',width:70,
                    dataIndex: ['newpo', 'ndestination'],
                },
                {
                    title: 'Inventory Segment Code',width:70,
                    dataIndex: 'ninventorySegmentCode',
                },
                {
                    title: 'Item Vas',width:70,
                    dataIndex: ['newpo', 'nitemVasText'],
                },

                {
                    title: 'Shipment Type',width:70,
                    dataIndex: ['newpo', 'nshipmentType'],
                },
                {
                    title: 'Item Vas Diff Check',width:70,
                    dataIndex: '',
                },
                {
                    title: 'Qty Tally-Check',width:70,
                    dataIndex: '',
                },
                {
                    title: 'Price-Fob Tally-Check',
                    dataIndex: '',width:70,
                },
                {
                    title: 'Price-Net Includding Discount Tally-Check',
                    dataIndex: '',width:100,
                },
                {
                    title: 'Price-Trading Co Net Including Discount Tally-Check',
                    dataIndex: '',width:100,
                },
                {
                    title: 'CO-update',width:70,
                    children: [
                        {
                            title: 'Approve',
                            dataIndex: '',width:70,
                            render: (text, rowData) => (
                                <span>

                                    <Form.Item>
                                        <Checkbox value={'yes'}
                                        // checked={rowData.selectedLevel === 'L1'}
                                        //onChange={() => handleCheckboxChange('L1', rowData.qResponseId)}
                                        ></Checkbox>
                                    </Form.Item>
                                </span>
                            )
                        },
                        {
                            title: 'Edit',
                            dataIndex: 'id',width:70,
                            render: (text, rowData) => (
                                <span>
                                    <Form.Item>
                                        <Checkbox
                                            onChange={() => handleCheckboxChange(rowData.id)}
                                            checked={expandedRows[rowData.id] || false}
                                        ></Checkbox>
                                    </Form.Item>
                                </span>
                            ),
                        },
                        {
                            title: 'Manual Type Item',
                            dataIndex: 'id',width:70,
                            render: (text, rowData) => (
                                <div>
                                    {expandedRows[rowData.id] ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Input
                                                allowClear
                                                style={{ marginRight: '10px' }}
                                                placeholder="Enter text"
                                                value={textareaValues[rowData.id] || ''}
                                                onChange={e =>
                                                    handleTextareaChange(rowData.id, e.target.value)
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                onClick={() => handleSubmit(rowData.id)}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="link"
                                            onClick={() =>
                                                setExpandedRows(prevExpandedRows => ({
                                                    ...prevExpandedRows,
                                                    [rowData.id]: true,
                                                }))
                                            }
                                        >
                                            Manual Edit
                                        </Button>
                                    )}
                                </div>
                            ),
                        },
                    ]
                }
            ] as unknown as null,
        }
    ]

    return (
        <>
            <Card title="Divert Report" headStyle={{ fontWeight: 'bold' }}
                extra={<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={exportExcel}
                    icon={<FileExcelFilled />}>Download Excel</Button>}>
                <Row gutter={70}>
                    {/* <Col >
                    <Card title={'Total Line Status Count  : ' + Number(dataLength[0]?.totalCount)} style={{ textAlign: 'left', width: 280, height: 38, backgroundColor: ' lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Accepted  : ' + Number(dataLength[0]?.acceptedCount)} style={{ textAlign: 'left', width: 200, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Unaccepted : ' +Number(dataLength[0]?.unacceptedCount)} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>  */}

                </Row><br></br>
                <Card >
                    <Table
                        columns={columns}
                        className="custom-table-wrapper"
                        dataSource={items}
                        // pagination={{
                        //     onChange(current, pageSize) {
                        //         setPage(current);
                        //         setPageSize(pageSize)
                        //     },
                        // }}
                        pagination = {false}
                        scroll={{ x: 'max-content', y: 600}}
                        bordered
                        size='small'
                    // expandedRowRender={(record) => record.additionalData} 
                    />
                </Card>
            </Card>
        </>
    )
}

export default DivertReport





