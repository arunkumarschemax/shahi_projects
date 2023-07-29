import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tag, message } from 'antd';
import { useEffect, useRef, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import React from 'react';


const PhaseWiseData = () => {
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = useState<number>(null)
    const [gridData, setGridData] = useState<any[]>([]);
    const service = new OrdersService();

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        service.getPhaseWiseData().then(res => {
            if (res.status) {
                setGridData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

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

    const childColumns: any = [
        {
            title: 'Production Plan Type Name',
            dataIndex: 'prodPlanTypeName',
            key: 'prodPlanTypeName',
        },
        {
            title: 'Sum of Ord Qty last week',
            dataIndex: 'oldOrderQtyPcs',
            key: 'oldOrderQtyPcs',
            render: (text: any, record: any) => {
                return Number(record.oldOrderQtyPcs).toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                })
            }
        },
        {
            title: 'Sum of Ord Qty this week',
            dataIndex: 'newOrderQtyPcs',
            key: 'newOrderQtyPcs',
            render: (text: any, record: any) => {
                return Number(record.newOrderQtyPcs).toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                })
            }
        },
        {
            title: 'Difference',
            dataIndex: 'diff',
            render: (text: any, record: any) => (
                < >

                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) === 0 ? '-' : ''}
                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) < 0 ? <span style={{ color: 'red' }} > {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) > 0 ? <span style={{ color: 'green' }} > {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}

                </>
            )
        }
    ]

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode',
            ...getColumnSearchProps('itemCode')
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            ...getColumnSearchProps('itemName')
        },
        {
            title: 'Phase Wise Data',
            dataIndex: 'prod_plan_type_name',
            align: 'center',
            render: (text: any, record: any) => (
                <Table
                    dataSource={record.phaseWiseData}
                    columns={childColumns}
                    pagination={false} // Hide pagination for child table
                    rowKey={record => record.itemCode}
                />
            ),
        }
    ];



    const handleExport = (e: any) => {
        e.preventDefault();

        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'Item code', dataIndex: 'item_code' },
            { title: 'Item Name', dataIndex: 'itemName' },
            { title: 'Production Plan Type Name', dataIndex: 'prod_plan_type_name' },
            { title: 'Sum of Ord Qty last week', dataIndex: 'old_qty_value' },
            { title: 'Sum of Ord Qty this week', dataIndex: 'new_qty_value' },
        ]

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Orders-Report-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Phase Wise Sum of Order Quantity"
            // extra={gridData.length > 0 ? (<Button
            //     type="default"
            //     style={{ color: 'green' }}
            //     onClick={handleExport}
            //     icon={<FileExcelFilled />}>Download Excel</Button>) : null}
            >
                <Table columns={columns} dataSource={gridData} pagination={{
                    onChange(current, pageSize) {
                        setPage(current);
                        setPageSize(pageSize)
                    }
                }} bordered />
            </Card>
        </div>
    )
}

export default PhaseWiseData;