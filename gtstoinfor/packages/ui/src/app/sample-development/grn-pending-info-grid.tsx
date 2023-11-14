import React from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest } from '@project-management-system/shared-models';

export const GrnPendingInfoGrid = () => {

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();


    const navigate = useNavigate();


    const data = [
        {
            grnNumber: "GRN0001",
            vendorName: "H&M",
            materialType: "Fabric",
            item: "013K",
            receivedQuantity: 500,
            physicalQuantity: 500,
        },
        {
            grnNumber: "GRN0002",
            vendorName: "Nike",
            materialType: "Fabric",
            item: "224G",
            receivedQuantity: 1500,
            physicalQuantity: 500,
        },
        {
            grnNumber: "GRN0003",
            vendorName: "Denim",
            materialType: "Fabric",
            item: "668J",
            receivedQuantity: 1000,
            physicalQuantity: 200,
        },

    ]

    const sampleTypeColumns: ColumnsType<any> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'GRN number',
            dataIndex: "grnNumber",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Vendor',
            dataIndex: "vendorName",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Material Type',
            dataIndex: "materialType",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Item',
            dataIndex: "item",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Grn Quantity',
            dataIndex: 'receivedQuantity',
            align: 'left',
            // sorter: (a, b) => a.receivedQuantity - b.receivedQuantity,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Location Mapped',
            dataIndex: 'physicalQuantity',
            align: 'left',
            // sorter: (a, b) => a.physicalQuantity - b.physicalQuantity,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Balance',
            align: 'left',
            // sorter: (a, b) => a.balance - b.balance,
            render: (record) => {
                const balance = record.receivedQuantity - record.physicalQuantity
                return balance
            }
        },
        {
            title: 'Allocate',
            render: (rowData) => (
                <span>
                    <Button type="primary" shape="round" size="small"
                        disabled={(rowData.receivedQuantity - rowData.physicalQuantity) <= 0}
                        onClick={() => {
                            setData(rowData);
                        }}>
                        Allocate
                    </Button>
                </span>
            )
        },

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    const setData = (rowdata) => {
        console.log(rowdata)
        const testdata = new GRNLocationPropsRequest(rowdata.grnNumber, rowdata.vendorName, rowdata.materialType, rowdata.item, rowdata.receivedQuantity, rowdata.physicalQuantity, rowdata.balance,)

        if (testdata) {
            navigate("/location-mapping", { state: { data: rowdata } });
        }
    }

    return (
        <div>
            <Card title={<span style={{ color: 'white' }}>GRN Pending Details</span>}
                style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
                <Table
                    rowKey={record => record.productId}
                    className="components-table-nested"
                    columns={sampleTypeColumns}
                    dataSource={data}
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize)
                        }
                    }}
                    onChange={onChange}
                    scroll={{ x: 500 }}
                    // size='small'
                    bordered
                />
            </Card>
        </div>
    )
}

