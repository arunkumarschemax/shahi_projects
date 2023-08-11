    import React, { useState, useEffect, useRef } from 'react';
    import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button } from 'antd';
    import { ColumnProps } from 'antd/lib/table';
    import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
    import moment from 'moment';
    // import { NikeService } from '@project-management-system/shared-services';
    import Highlighter from 'react-highlight-words';
    import Item from 'antd/es/descriptions/Item';
    import { IExcelColumn } from 'antd-table-saveas-excel/app';
    import { Excel } from 'antd-table-saveas-excel';
    // import { ColumnProps } from 'antd/es/table';
    import { Tooltip } from 'highcharts';
    import { NikeService } from '@project-management-system/shared-services';


    const DivertReport = () => {
    
        const [page, setPage] = useState<number>(1);
        const [pageSize, setPageSize] = useState<number>(1);
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<any>(null);

        const [factory, setFactory] = useState([]);
        const { RangePicker } = DatePicker;
        const [gridData, setGridData] = useState<any[]>([]);
        const [acceptedItems, setAcceptedItems] = useState<any[]>([]);
        const [unacceptedItems, setUnacceptedItems] = useState<any[]>([])
        const { Option } = Select;
        const service = new NikeService();
        const [form] = Form.useForm();

        const Finish = (values: any) => {
            console.log(values,'vallllll');
            // if (values.DPOMLineItemStatus !== undefined) {
            //     // getFactoryStatus(values)
            // }/
            
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


        useEffect(() => {
            getData();
        }, [])

        const getData = async () => {
            try {
                const res = await service.getDivertReportData();
                if (res.status) {
                    setGridData(res.data.accepted);
                    setAcceptedItems(res.data.accepted);
                    
                    console.log(acceptedItems)
                    setUnacceptedItems(res.data.unaccepted);
                }
            } catch (err) {
                console.log(err.message);
            }
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
                { title: 'Plant', dataIndex: 'Plant' },
                { title: 'Product Code', dataIndex: 'lastModifiedDate' },
                { title: 'Line Status', dataIndex: 'Item' },
                { title: 'Document Date', dataIndex: 'totalItemQty' },
                { title: 'Old Po', dataIndex: 'Factory' },
                { title: 'Old Po Line', dataIndex: 'documentDate' },
                { title: 'Balance Qty', dataIndex: 'purchase Order Number' },
                { title: 'Destination', dataIndex: 'poLineItemNumber' },
                { title: 'Shipment Type', dataIndex: 'DPOMLineItemStatus' },
                { title: 'Inventory Segment Code', dataIndex: 'styleNumber' },
                { title: 'Product Code', dataIndex: 'productCode' },
                { title: 'OGAC', dataIndex: 'colorDesc' },
            ]


            const excel = new Excel();
            excel.addSheet("Sheet1");
            excel.addRow();
            excel.addColumns(exportingColumns);
            excel.addDataSource(gridData);
            excel.saveAs(`factory-report-${currentDate}.xlsx`);
        }

        


        const columns: ColumnProps<any>[] = [
            
        { title: 'old',  
        children: [
            {
                title: 'S.No',
                key: 'sno',
                responsive: ['sm'],
                render: (text, object, index) => (page - 1) * pageSize + (index + 1)
            },
            {
                title: "Plant",
                dataIndex: "plant",
                render: (text, record) => (record.section === 'old' ? record.plant : ''),
            },
            {
                title: "Product Code",
                dataIndex: "productCode",
                sorter: (a, b) => a.productCode.localeCompare(b.productCode),
                sortDirections: ["descend", "ascend"],
                // ...getColumnSearchProps("productCode"),
                render: (text, record) => (record.section === 'old' ? record.productCode : ''),

            },   {
                title: "Line Status",
                dataIndex: "lineStatus",
                // ...getColumnSearchProps("lineStatus"),
            },
            {
                title: 'Document Date',
                dataIndex: ' documentDate',
                render: (text, record) => {
                    return record.documentDate
                    ? moment(record.documentDate).format("YYYY-MM-DD")
                    : "-";
                }
            },
            {
                title: 'Old Po',
                dataIndex: 'poNumber',
                
            },
            {
                title: 'Old Po Line',
                dataIndex: 'poLine',
                
            },
            {
                title: 'Balance Qty',
                dataIndex: '-', 
            },
            {
                title: 'Destination',
                dataIndex: 'destination', 
            },
            {
                title: 'Shipment Type',
                dataIndex: 'shipmentType', 
            },
            {
                title: 'Inventory Segment Code',
                dataIndex: ' inventorySegmentCode', 
            },
            {
                title: 'OGAC',
                dataIndex: 'ogac',
                render: (text, record) => {
                    return record.ogac
                    ? moment(record.ogac).format("YYYY-MM-DD")
                    : "-";
                }
            },
            {
                title: 'GAC',
                dataIndex: 'gac', 
                render: (text, record) => {
                    return record.gac
                    ? moment(record.gac).format("YYYY-MM-DD")
                    : "-";
                }
            }
            ,
            {
                title: 'Product Code',
                dataIndex: 'productCode', 
            },
            
            ,
            {
                title: 'Item Vas',
                dataIndex: 'item_vas_text', 
            },
        
        ]  as unknown as null, 
        },
        
        { title: 'New',
        
        children:[
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
                render: (text, record) => (record.section === 'new' ? record.plant : ''),

            },
            {
                title: "Product Code",
                dataIndex: "productCode",
                sorter: (a, b) => a.owner.localeCompare(b.owner),
                sortDirections: ["descend", "ascend"],
                //...getColumnSearchProps("owner"),
            render: (text, record) => (record.section === 'new' ? record.productCode : ''),

            },
            {
                title: "Line Status",
                dataIndex: "",
                sorter: (a, b) => a.indentType.localeCompare(b.indentType),
                sortDirections: ["descend", "ascend"],
                // ...getColumnSearchProps("indentType"),
            },
            {
                title: 'Document Date',
                dataIndex: '',
            //     render: (_, record) => {
            //         const pickupDate = moment(record.pickRequestsInfo[0]?.pickupDate);
            //         return (
            //             <>
            //                 {pickupDate.format('YYYY-MM-DD HH:MM:SS')}
            //             </>
            //         );
            // }
            },
            {
                title: 'New Po',
                dataIndex: 'dueDate',
                
            },
            {
                title: 'New Po Line',
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
        
        ]as unknown as null,}
        ]
        const combinedData = [
            ...acceptedItems.map(item => ({ ...item, section: 'old' })),
            ...unacceptedItems.map(item => ({ ...item, section: 'new' })),
            // console.log(acceptedItems,"pppppppppppppppppppppppppppppppppppppp")
        ]



        return (
            <>
                <Card title="Divert Report" headStyle={{ fontWeight: 'bold',backgroundColor:"skyblue" }}
                    extra={ <Button
                        type="default"
                        style={{ color: 'green' }}
                        onClick={handleExport}
                        icon={<FileExcelFilled />}>Download Excel</Button>}>
                                <Card >
                        <Table
                            columns={columns}
                            className="custom-table-wrapper"
                            dataSource={combinedData}
                            pagination={{
                                onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize)
                                },   
                            }}
                            scroll={{ x: 'max-content' }}
                            bordered  
                            />
                        
            
                    </Card>
                </Card>
            </>
        )
    }

    export default DivertReport
