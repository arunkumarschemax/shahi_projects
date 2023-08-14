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
  

    useEffect(() => {
      
    }, [])

    const columns: ColumnProps<any>[] = [

     

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
  
  
  
    ]
   


    return (
        <>
        <Card title="Shipment Planning Chart" headStyle={{ fontWeight: 'bold',backgroundColor:"skyblue" }}
            // extra={ <Button
            //     type="default"
            //     style={{ color: 'green' }}
            //     onClick={handleExport}
            //     icon={<FileExcelFilled />}>Download Excel</Button>}
                >

                        <Card >
                <Table
                    columns={columns}
                    className="custom-table-wrapper"
                   // dataSource={modifiedCombinedData}
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





