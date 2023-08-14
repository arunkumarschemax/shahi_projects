import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Input, Table } from 'antd'
import { NikeService } from '@project-management-system/shared-services';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';

function ShipmentTrackerReport() {

    const [filterData, setFilterData] = useState<any>([])
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const service = new NikeService();
    const searchInput = useRef<any>(null);
    const [searchText, setSearchText] = useState<any>([]);
    const [searchedColumn, setSearchedColumn] = useState<any>([]);

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
            { title: 'Unit', dataIndex: 'unit' },
            { title: 'Item', dataIndex: 'Item' },
            { title: 'Plan#', dataIndex: 'plan' },
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
            { title: 'Truckout Date', dataIndex: 'truckoutdate' },
            { title: 'Origin Receipt date', dataIndex: 'originReceiptDate' },
            { title: 'Factory Delivery Actual date', dataIndex: 'factoryDeliveryActDate' },
            { title: 'Mode of Transportation', dataIndex: 'modeOfTransportationCode' },
            { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
            { title: 'ACTUAL SHIPPED QTY', dataIndex: 'Actalshippedqty' },
            { title: 'ACTUAL SHIPPED %', dataIndex: 'actualShippedper' },
            { title: 'SHIPPED VALUE $', dataIndex: 'ShippedVAlue' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'GAC-OGAC', dataIndex: 'GAC-OGAC' },

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


        },
        {
            title: 'Unit',
            dataIndex: 'unit',

        },

        {
            title: 'Item',
            dataIndex: 'Item',
            ...getColumnSearch('Item'),

        },
        {
            title: 'Plan#',
            dataIndex: 'plan',

        },
        {
            title: 'Purchase Order Number',
            dataIndex: 'purchaseOrderNumber',
            ...getColumnSearch('purchaseOrderNumber'),

        },
        {
            title: 'PO Line Item Number',
            dataIndex: 'poLineItemNumber',

        },
        {
            title: 'Doc Type Description',
            dataIndex: 'docTypeDesc',

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
            title: 'Plant Code',
            dataIndex: 'plantCode',
            ...getColumnSearch('plantCode'),

        },
        {
            title: 'Planning Season Code',
            dataIndex: 'planningSeasonCode',

        },
        {
            title: 'Planning Season Year',
            dataIndex: 'planningSeasonYear',
            ...getColumnSearch('planningSeasonYear'),

        },
        {
            title: 'General Age Description',
            dataIndex: 'generalAgeDescription',

        },
        {
            title: 'Destination Country Name',
            dataIndex: 'destinationCountry',
            ...getColumnSearch('destinationCountry'),

        },
        {
            title: 'OGAC',
            dataIndex: 'OGAC',

        },
        {
            title: 'GAC',
            dataIndex: 'GAC',

        },
        {
            title: 'MRGAC',
            dataIndex: 'MRGAC',

        },
        {
            title: 'GAC reason Code',
            dataIndex: 'GACReasonCode',

        },
        {
            title: 'GAC reason Description',
            dataIndex: 'generalagedescription',

        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType',
            ...getColumnSearch('shippingType'),

        },
        {
            title: 'Truckout Date',
            dataIndex: 'truckoutdate',

        },
        {
            title: 'Origin Receipt date',
            dataIndex: 'originReceiptDate',

        },
        {
            title: 'Factory Delivery Actual date',
            dataIndex: 'factoryDeliveryActDate',
            ...getColumnSearch('factoryDeliveryActDate'),

        }, ,

        {
            title: 'Mode of Transportation',
            dataIndex: 'modeOfTransportationCode',

        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'totalItemQty',

        },
        {
            title: 'ACTUAL SHIPPED QTY',
            dataIndex: 'Actalshippedqty',

        },
        {
            title: 'ACTUAL SHIPPED %',
            dataIndex: 'actualShippedper',

        },
        {
            title: 'SHIPPED VALUE $',
            dataIndex: 'ShippedVAlue',

        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'DPOMLineItemStatus',

        },
        {
            title: 'GAC-OGAC',
            dataIndex: 'GAC-OGAC',

        },


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
                    <Table
                        columns={columns}

                        dataSource={gridData}
                        // dataSource={filterData}
                        scroll={{ x: 1000 }}
                    />
                </Card>
            </Card>
        </div>
    )
}

export default ShipmentTrackerReport