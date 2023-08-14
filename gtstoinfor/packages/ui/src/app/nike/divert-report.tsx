    import React, { useState, useEffect, useRef } from 'react';
    import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button, message } from 'antd';
    import { ColumnProps } from 'antd/lib/table';
    import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
    import moment from 'moment';
    import Highlighter from 'react-highlight-words';
    import Item from 'antd/es/descriptions/Item';
    import { IExcelColumn } from 'antd-table-saveas-excel/app';
    import { Excel } from 'antd-table-saveas-excel';
    import { Tooltip, numberFormat } from 'highcharts';
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
        const [dataLength, setDataLength] = useState<any[]>([]);

        const [acceptedItems, setAcceptedItems] = useState<any[]>([]);
        const [unacceptedItems, setUnacceptedItems] = useState<any[]>([])
        const { Option } = Select;
        const service = new NikeService();
        const [form] = Form.useForm();

        useEffect(() => {
            getData();
            getCount();
        }, [])


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
    let oldSno = 0;
    let newSno = 0;

        

        const getCount= () =>{
            service.getCountForDivertReport().then(res => {

                if (res.status) {
                    setDataLength(res.data)
                }
            })
        
        
    }
        const getData = () =>{
         service.getDivertReportData().then(res=>{
            if (res.status) {
                setAcceptedItems(res.data.accepted);
                console.log(acceptedItems)
                setUnacceptedItems(res.data.unaccepted);
                // getCount();
            }
         }) 
        }

       

        const handleExport = (e: any) => {
            e.preventDefault();
        
            const currentDate = new Date()
                .toISOString()
                .slice(0, 10)
                .split("-")
                .join("/");
        
            let exportingColumns: IExcelColumn[] = [
                { title: 'Section', dataIndex: 'section' },
                { title: 'S.No', dataIndex: 'sno' },
                { title: 'Plant', dataIndex: 'plant' },
                { title: 'Product Code', dataIndex: 'productCode' },
                { title: 'Line Status', dataIndex: 'lineStatus' },
                { title: 'Document Date', dataIndex: 'documentDate' },
                { title: 'Old Po', dataIndex: 'poNumber' },
                { title: 'Old Po Line', dataIndex: 'poLine' },
                { title: 'Balance Qty', dataIndex: 'balanceQty' },
                { title: 'Destination', dataIndex: 'destination' },
                { title: 'Shipment Type', dataIndex: 'shipmentType' },
                { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
                { title: 'OGAC Date', dataIndex: 'ogac' },
                { title: 'GAC Date', dataIndex: 'gac' },
                { title: 'Item Vas', dataIndex: 'item_vas_text' },
            ];
        
            const excel = new Excel();
    excel.addSheet("Sheet1");

    const formattedDataForExcel = modifiedCombinedData.map(item => ({
        ...item,
        sno: item.section === 'old' ? item.sno : newSno++,
    }));

    let newSno = 1;
    const newSectionStart = formattedDataForExcel.findIndex(item => item.section === 'new');
    if (newSectionStart >= 0) {
        formattedDataForExcel.slice(newSectionStart).forEach((item, index) => {
            if (item.section === 'new') {
                item.sno = newSno++; 
            }
        });
    }

    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(formattedDataForExcel);
    excel.saveAs(`Divert-report-${currentDate}.xlsx`);
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

            },
               {
                title: "Line Status",
                dataIndex: "lineStatus",
                // ...getColumnSearchProps("lineStatus"),
                render: (text, record) => (record.section === 'old' ? record.lineStatus : ''),

            },
            {
                title: 'Document Date',
                dataIndex: 'documentDate', 
                render: (text, record) => {
                    return record.section === 'old'
                        ? (record.documentDate
                            ? moment(record.documentDate).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },
            {
                title: 'Old Po',
                dataIndex: 'poNumber',
                render: (text, record) => (record.section === 'old' ? record.poNumber : ''),

                
            },
            {
                title: 'Old Po Line',
                dataIndex: 'poLine',
                render: (text, record) => (record.section === 'old' ? record.poLine : "-"),

                
            },
            {
                title: 'Balance Qty',
                dataIndex: '-', 
                render: (text, record) => (record.section === 'old' ? record.plant : "-"),

            },
            {
                title: 'Destination',
                dataIndex: 'destination',
                render: (text, record) => (record.section === 'old' ? record.destination : "-"),
 
            },
            {
                title: 'Shipment Type',
                dataIndex: 'shipmentType', 
                render: (text, record) => (record.section === 'old' ? record.shipmentType : "-"),

            },
            {   
                title: 'Inventory Segment Code',
                dataIndex: ' inventorySegmentCode',
                render: (text, record) => (record.section === 'old' ? record.inventorySegmentCode : "-"),
 
            },
            {
                title: 'OGAC Date',
                dataIndex: 'ogac', 
                render: (text, record) => {
                    return record.section === 'old'
                        ? (record.ogac
                            ? moment(record.ogac).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },
            {
                title: 'GAC Date',
                dataIndex: 'gac', 
                render: (text, record) => {
                    return record.section === 'old'
                        ? (record.gac
                            ? moment(record.gac).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },
            ,
            {
                title: 'Item Vas',
                dataIndex: 'item_vas_text',
                render: (text, record) => (record.section === 'old' ? (record.item_vas_text !== null ? record.item_vas_text : "null") : ""),
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
                title: 'OGAC Date',
                dataIndex: 'ogac', 
                render: (text, record) => {
                    return record.section === 'new'
                        ? (record.ogac
                            ? moment(record.ogac).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },
            {
                title: 'GAC Date',
                dataIndex: 'gac', 
                render: (text, record) => {
                    return record.section === 'new'
                        ? (record.gac
                            ? moment(record.gac).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },{
            title:"No of Days to GAC",
            dataIndex:"",
            }, 
            {
                title:"To item",
                dataIndex:"",
                }, 
            {
               title:"Unit",
               dataIndex:"",
               },

            {
                title: "Plant",
                dataIndex: "plant",
                // ...getColumnSearchProps("plant"),
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
                render: (text, record) => (record.section === 'new' ? record.lineStatus : ''),

            },
            {
                title: 'Document Date',
                dataIndex: 'documentDate', 
                render: (text, record) => {
                    return record.section === 'new'
                        ? (record.documentDate
                            ? moment(record.documentDate).format("YYYY-MM-DD")
                            : "-")
                        : "";
                }
            },
            {
                title: 'New Po',
                dataIndex: 'poNumber',
                render: (text, record) => (record.section === 'new' ? record.poLine : "-"),

                
            },
            {
                title: 'New Po Line',
                dataIndex: 'poLine',
                render: (text, record) => (record.section === 'new' ? record.poLine : "-"),

                
            },
            {
                title: 'Quantity',
                dataIndex: '', 
              //  render: (text, record) => (record.section === 'new' ? record.poLine : "-"),

            },
            {
                title: 'Destination',
                dataIndex: 'destination',
                render: (text, record) => (record.section === 'new' ? record.destination : "-"),
 
            },
            
            {
                title: 'Inventory Segment Code',
                dataIndex: 'inventorySegmentCode', 
                render: (text, record) => (record.section === 'new' ? record.inventorySegmentCode : "-"),
            },
            {
                title: 'Item Vas',
                dataIndex: 'item_vas_text',
                render: (text, record) => (record.section === 'new' ? (record.item_vas_text !== null ? record.item_vas_text : "null") : ""),
            },
            
            {
                title: 'Shipment Type',
                dataIndex: 'shipmentType',
                render: (text, record) => (record.section === 'new' ? record.shipmentType : "-"),
            },
            {
                title: 'Item Vas Diff Check',
                dataIndex: '', 
            },
            {
                title: 'Qty Tally-Check',
                dataIndex: '', 
            },
            {
                title: 'Price-Fob Tally-Check',
                dataIndex: '', 
            },
            {
                title: 'Price-Net Includding Discount Tally-Check',
                dataIndex: '', 
            },
            {
                title: 'Price-Trading Co Net Includding Discount Tally-Check',
                dataIndex: '', 
            },
        
        ]as unknown as null,}
        ]
        const combinedData = [
            ...acceptedItems.map(item => ({ ...item, section: 'old' })),
            ...unacceptedItems.map(item => ({ ...item, section: 'new' })),
        ]
        const newSectionStart = combinedData.findIndex(item => item.section === 'new');
        const modifiedCombinedData = combinedData.map((item, index) => {
            if (item.section === 'new') {
                return { ...item, sno: index + 301 - newSectionStart };
            }
            return item;
        });



        return (
            <>
                <Card title="Divert Report" headStyle={{ fontWeight: 'bold' }}
                    extra={ <Button
                        type="default"
                        style={{ color: 'green' }}
                        onClick={handleExport}
                        icon={<FileExcelFilled />}>Download Excel</Button>}>
                            <Row gutter={70}>
                     <Col >
                        <Card title={'Total Line Status Count  : ' + Number(dataLength[0]?.totalCount)} style={{ textAlign: 'left', width: 280, height: 38, backgroundColor: ' lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Accepted  : ' + Number(dataLength[0]?.acceptedCount)} style={{ textAlign: 'left', width: 200, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col>
                    <Col>
                        <Card title={'Unaccepted : ' +Number(dataLength[0]?.unacceptedCount)} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                    </Col> 
                   
                    
                </Row><br></br>
                                <Card >
                        <Table
                            columns={columns}
                            className="custom-table-wrapper"
                            dataSource={modifiedCombinedData}
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



