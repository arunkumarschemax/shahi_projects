import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Table } from 'antd'
import { NikeService } from '@project-management-system/shared-services';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';

function ShipmentTrackerReport() {

    const [filterData, setFilterData] = useState<any>([])
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const service = new NikeService();
    const searchInput = useRef<any>(null);
    const [searchText, setSearchText] = useState<any>([]);
    const [searchedColumn, setSearchedColumn] = useState<any>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        service.getShipmentTrackerReport().then(res => {
            console.log(res.data, 'aaaaaaaaaaa')
            if (res.status) {
                setGridData(res.data)
                setFilterData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
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

    const handleExport = (e: any) => {
        e.preventDefault();


        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}`, },
            { title: 'Unit', dataIndex: '' },
            { title: 'Item', dataIndex: 'item' },
            { title: 'Plan#', dataIndex: '' },
            { title: 'Purchase Order Number', dataIndex: 'purchase Order Number' },
            { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
            { title: 'Doc Type Description', dataIndex: 'docTypeDesc' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Product Code', dataIndex: 'productCode' },
            { title: 'Colour Description', dataIndex: 'colorDesc' },
            { title: 'Plant Code', dataIndex: 'plantCode' },
            { title: 'Planning Season Code', dataIndex: 'planningSeasonCode' },
            { title: 'Planning Season Year', dataIndex: 'planningSeasonYear' },
            { title: 'General Age Description', dataIndex: 'generalAgeDescription' },
            { title: 'Destination Country Name', dataIndex: 'destinationCountry' },
            { title: 'OGAC', dataIndex: 'OGAC' },
            { title: 'GAC', dataIndex: 'GAC' },
            { title: 'MRGAC', dataIndex: 'MRGAC' },
            { title: 'GAC reason Code', dataIndex: 'GACReasonCode' },
            { title: 'GAC reason Description', dataIndex: 'generalagedescription' },
            { title: 'Shipping Type', dataIndex: 'shippingType' },
            { title: 'Truckout Date', dataIndex: 'truckOutDate' },
            { title: 'Origin Receipt date', dataIndex: 'originReceiptDate' },
            { title: 'Factory Delivery Actual date', dataIndex: 'factoryDeliveryActDate' },
            { title: 'Mode of Transportation', dataIndex: 'modeOfTransportationCode' },
            { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
            { title: 'ACTUAL SHIPPED QTY', dataIndex: '' },
            { title: 'ACTUAL SHIPPED %', dataIndex: '' },
            { title: 'SHIPPED VALUE $', dataIndex: '' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'GAC-OGAC', dataIndex: '' },

        ]


        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`factory-report-${currentDate}.xlsx`);
    }




    const columns: ColumnsType<any> = [

        {
            title: 'Po+Line',
            dataIndex: 'purchaseOrderNumber-poLineItemNumber',
            render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}`,
            width:"150  "

        },
        {
            title: 'Unit',
            dataIndex: '',width:70,

        },

        {
            title: 'Item',
            dataIndex: 'item',width:70,
            ...getColumnSearch('item'),
            render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },

        },
        {
            title: 'Plan#',
            dataIndex: '',width:70,

        },
        {
            title: 'Purchase Order Number',
            dataIndex: 'purchaseOrderNumber',
            ...getColumnSearch('purchaseOrderNumber'),width:70,

        },
        {
            title: 'PO Line Item Number',
            dataIndex: 'poLineItemNumber',width:70,align:'center'

        },
        {
            title: 'Doc Type Description',
            dataIndex: 'docTypeDesc',width:70,

        },
        {
            title: 'Style Number',
            dataIndex: 'styleNumber',
            ...getColumnSearch('styleNumber'),width:70,

        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            ...getColumnSearch('productCode'),width:70,

        },
        {
            title: 'Colour Description',
            dataIndex: 'colorDesc',width:70,

        },
        {
            title: 'Plant Code',
            dataIndex: 'plant',
            ...getColumnSearch('plantCode'),width:70,

        },
        {
            title: 'Planning Season Code',
            dataIndex: 'planningSeasonCode',width:70,

        },
        {
            title: 'Planning Season Year',
            dataIndex: 'planningSeasonYear',
            ...getColumnSearch('planningSeasonYear'),width:70,

        },
        {
            title: 'General Age Description',
            dataIndex: 'gender_age_desc',width:70,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },

        },

        {
            title: 'Destination Country Name',
            dataIndex: 'destinationCountry',width:70,
            ...getColumnSearch('destinationCountry'),

        },
        {
            title: 'OGAC',
            dataIndex: 'OGAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 


        },
        {
            title: 'GAC',
            dataIndex: 'GAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 


        },
        {
            title: 'MRGAC',
            dataIndex: 'MRGAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 


        },
        {
            title: 'GAC reason Code',
            dataIndex: 'GACReasonCode',width:70, render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },

        },
        {
            title: 'GAC reason Description',
            dataIndex: 'generalagedescription',width:70,

        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType',width:70,
            ...getColumnSearch('shippingType'),

        },
        {
            title: 'Truckout Date',
            dataIndex: 'truckoutdate',width:70,

        },
        {
            title: 'Origin Receipt date',
            dataIndex: 'originReceiptDate',width:70,

        },
        {
            title: 'Factory Delivery Actual date',
            dataIndex: 'factoryDeliveryActDate',width:70,
            ...getColumnSearch('factoryDeliveryActDate'),

        }, ,

        {
            title: 'Mode of Transportation',
            dataIndex: 'modeOfTransportationCode',width:70,

        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'totalItemQty',width:70,
            align:'right',
            render:(text, record) =>
            <span>{Number(record.totalItemQty).toLocaleString()}</span>
          

        },
        {
            title: 'ACTUAL SHIPPED QTY',
            dataIndex: '',width:70,

        },
        {
            title: 'ACTUAL SHIPPED %',
            dataIndex: '',width:70,

        },
        {
            title: 'SHIPPED VALUE $',
            dataIndex: '',width:70,

        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'DPOMLineItemStatus',width:70,

        },
       
        {
            title: 'GAC-OGAC',
            dataIndex: '',width:70,
            render: (text, record) => {
              const ogac = moment(record.OGAC);
              const gac = moment(record.GAC);
              const differenceInDays = gac.diff(ogac, 'days');
              return `${differenceInDays} days`;
            },
          }
          
          
          
          
          
          


    ];
    //         return [...columns];
    // }

    return (
        <div>
            <Card title="SHIPMENT TRACKER REPORT" headStyle={{ fontWeight: 'bold' }}
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Card>
                    <Form>
                    <Row gutter={50}>
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
                </Row>
                    </Form><br></br>
                    <Table
                        columns={columns}
                        dataSource={gridData}
                        // dataSource={filterData}
                        scroll={{ x: 'max-content',y:600 }}
                        className="custom-table-wrapper" pagination={{
                            pageSize:50,
              
                            onChange(current, pageSize) {
                              setPage(current);
                              setPageSize(pageSize);
                            }
                          }}


                    />
                </Card>
            </Card>
        </div>
    )
}

export default ShipmentTrackerReport