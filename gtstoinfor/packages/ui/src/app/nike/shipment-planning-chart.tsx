
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

const ShipmentPlanningChart = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const service = new NikeService();
    const [shipmentData, setShipmentData] = useState<any>();


    useEffect(() => {
        getShipmentData();
    }, [])

    const getShipmentData = () => {
        service.getShipmentPlaningChart().then(res => {
            if (res.status) {
                setShipmentData(res.data)

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


    const columns: ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'PO+Line',
            dataIndex: "poLine"
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Factory',
            dataIndex: 'factory'
        },
        {
            title: 'Plan',
            dataIndex: 'plan'

        },
        {
            title: 'Purchase Order Number',
            dataIndex: 'purchaseOrderNumber'

        },
        {
            title: 'PO Line Item Number',
            dataIndex: 'poLineItemNumber',
            align: 'center'


        },
        {
            title: 'Style Number',
            dataIndex: 'styleNumber',
        },
        {
            title: 'Destination Country Name',
            dataIndex: 'destinationCountryName',
        },
        {
            title: 'SHIP TO ADDRESS(lpo)',
            dataIndex: 'shipToAddressToLegalPo',

        }, {
            title: 'SHIP TO ADDRESS(DIA)',
            dataIndex: 'shipToAddressDia',

        }, {
            title: 'Hanger',
            dataIndex: 'hanger',

        },
        {
            title: 'FOB',
            dataIndex: 'fob'
        },
        {
            title: 'CO',
            dataIndex: 'co'
        },
        {
            title: 'Prooduct Code',
            dataIndex: 'productCode',
        },
        {
            title: 'Color Description',
            dataIndex: 'colorDescription',
        },
        {
            title: 'Planning Season Code',
            dataIndex: 'planningSeasonCode',
            align: "center"
        },
        {
            title: 'Plant Serason Year',
            dataIndex: 'planningSeasonYear',
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
        },
        {
            title: 'EX FACTORY',
            dataIndex: '',
        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'totalItemQuantity',
        }, {
            title: 'Mode of Transportation',
            dataIndex: 'modeofTransport',
        },
        {
            title: 'PAYMENT TERMS LC/TT/TC',
            dataIndex: 'paymentTerm',
        },
        {
            title: 'DESCRIPTION WITH FABRIC CONTENT',
            dataIndex: 'desFabricContent',
        },
        {
            title: 'Gender Age Description',
            dataIndex: 'gender_age_desc',
        },
        {
            title: 'Fabric Content as per washcare label',
            dataIndex: '',
        },
        {
            title: 'FABRIC IMPORTED/DOMESTIC',
            dataIndex: 'fabricLocation',
        },
        {
            title: 'COMMISSION(IF ANY)',
            dataIndex: 'commission',
        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType',
        },
        {
            title: 'Doc Type Description',
            dataIndex: 'docTypeDescription',
        },
        {
            title: 'Purchase Group Name',
            dataIndex: 'purchaseGroupName',
        },
        {
            title: 'CAB CODE',
            dataIndex: 'cabCode',
        },

    ]

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
                title: 'PO+Line',
                dataIndex: "poLine"
            },
            {
                title: 'Item',
                dataIndex: 'item',
            },
            {
                title: 'Factory',
                dataIndex: 'factory'
            },
            {
                title: 'Plan',
                dataIndex: 'plan'
            },
            {
                title: 'Purchase Order Number',
                dataIndex: 'purchaseOrderNumber'
            },
            {
                title: 'PO Line Item Number',
                dataIndex: 'poLineItemNumber',
                align: 'center'
            },
            {
                title: 'Style Number',
                dataIndex: 'styleNumber',
            },
            {
                title: 'Destination Country Name',
                dataIndex: 'destinationCountryName',
            },
            {
                title: 'SHIP TO ADDRESS(lpo)',
                dataIndex: 'shipToAddressToLegalPo',

            }, {
                title: 'SHIP TO ADDRESS(DIA)',
                dataIndex: 'shipToAddressDia',

            }, {
                title: 'Hanger',
                dataIndex: 'hanger',
            },
            {
                title: 'FOB',
                dataIndex: 'fob'
            },
            {
                title: 'CO',
                dataIndex: 'co'
            },
            {
                title: 'Prooduct Code',
                dataIndex: 'productCode',
            },
            {
                title: 'Color Description',
                dataIndex: 'colorDescription',
            },
            {
                title: 'Planning Season Code',
                dataIndex: 'planningSeasonCode',
                align: "center"
            },
            {
                title: 'Plant Serason Year',
                dataIndex: 'planningSeasonYear',
            },
            {
                title: 'OGAC',
                dataIndex: 'ogac',
            },
            {
                title: 'GAC',
                dataIndex: 'gac',
            },
            {
                title: 'EX FACTORY',
                dataIndex: '',
            },
            {
                title: 'Total Item Quantity',
                dataIndex: 'totalItemQuantity',
            },
            {
                title: 'Mode of Transportation',
                dataIndex: 'modeofTransport',
            },
            {
                title: 'PAYMENT TERMS LC/TT/TC',
                dataIndex: 'paymentTerm',
            },
            {
                title: 'DESCRIPTION WITH FABRIC CONTENT',
                dataIndex: 'desFabricContent',
            },
            {
                title: 'Gender Age Description',
                dataIndex: '',
            },
            {
                title: 'Fabric Content as per washcare label',
                dataIndex: '',
            },
            {
                title: 'FABRIC IMPORTED/DOMESTIC',
                dataIndex: 'fabricLocation',
            },
            {
                title: 'COMMISSION(IF ANY)',
                dataIndex: 'commission',
            },
            {
                title: 'Shipping Type',
                dataIndex: 'shippingType',
            },
            {
                title: 'Doc Type Description',
                dataIndex: 'docTypeDescription',
            },
            {
                title: 'Purchase Group Name',
                dataIndex: 'purchaseGroupName',
            },
            {
                title: 'CAB CODE',
                dataIndex: 'cabCode',
            },
        ]

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(shipmentData);
        excel.saveAs(`shipment-planning-chart-${currentDate}.xlsx`);
    }

    return (
        <>
            <Card title="Shipment Planning Chart" headStyle={{ fontWeight: 'bold' }}
                extra={<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>}
            >
                <Card >
                    <Table
                        columns={columns}
                        className="custom-table-wrapper"
                        dataSource={shipmentData}
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

export default ShipmentPlanningChart;





