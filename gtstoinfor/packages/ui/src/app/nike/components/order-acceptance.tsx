import { SearchOutlined } from "@ant-design/icons";
import { DpomApproveRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Input, Popconfirm, Table, message } from "antd";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Highlighter from 'react-highlight-words';

export function OrderAcceptance() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [data, setData] = useState<any[]>([])
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
    const service = new NikeService();

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

    useEffect(() => {
        getOrderAcceptanceData()
    }, [])

    const getOrderAcceptanceData = () => {
        service.getOrderAcceptanceData().then((res) => {
            if (res.data) {
                setData(res.data)
                // message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }

    const approveDpomLineItemStatus = (record) => {
        const req = new DpomApproveRequest();
        req.poLineItemNumber = record.poLineItemNumber
        req.purchaseOrderNumber = record.purchaseOrderNumber
        req.scheduleLineItemNumber = record.scheduleLineItemNumber
        service.approveDpomLineItemStatus(req).then((res) => {
            if (res.status) {
                getOrderAcceptanceData()
                message.success(res.internalMessage)
            } else (
                message.error(res.internalMessage)
            )
        })
    }

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Plant Name',
            dataIndex: 'plantName',
            ...getColumnSearchProps('plantName')
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber',
            ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Purchase Group Name',
            dataIndex: 'purchaseGroupName'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            ...getColumnSearchProps('productCode')
        },
        {
            title: 'Category',
            dataIndex: 'categoryDesc'
        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType'
        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'DPOMLineItemStatus',
            filters: [
                { text: 'Accepted', value: 'Accepted' },
                { text: 'Unaccepted', value: 'Unaccepted' },
                { text: 'Closed', value: 'Closed' },
                { text: 'Cancelled', value: 'Cancelled' }
            ],
            filterMultiple: false,
            onFilter: (value, record) => { return record.DPOMLineItemStatus === value }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, record) => {
                if (record.DPOMLineItemStatus === 'Unaccepted') {
                    return (
                        <Popconfirm title="Are you sure to accept" onConfirm={() => approveDpomLineItemStatus(record)}>
                            <Button>Accept</Button>
                        </Popconfirm>
                    );
                } else {
                    return null;
                }
            }

        }
    ]
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <>
            <Card title="Order Acceptance" headStyle={{ fontWeight: 'bold' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    onChange={onChange}
                    scroll={{x:1500}}
                >
                </Table>
            </Card>
        </>
    )
}
export default OrderAcceptance;