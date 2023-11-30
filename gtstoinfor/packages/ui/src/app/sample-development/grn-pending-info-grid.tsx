import React, { useEffect } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest } from '@project-management-system/shared-models';
import { LocationMappingService } from '@project-management-system/shared-services';

export const GrnPendingInfoGrid = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [fabData, setFabData] = React.useState<any>()
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();


    const navigate = useNavigate();

    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = () => {
        locationService.getAllFabrics().then((res) => {
            setFabData(res.data);
            console.log(res.data, "?????????????????????????????");
        })
    }

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
            sorter: (a, b) => a.grnNumber - b.grnNumber,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Vendor',
            dataIndex: "vendor_name",
            align: 'left',
            sorter: (a, b) => a.vendor_name - b.vendor_name,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Buyer',
            dataIndex: "fabBuyerName",
            align: 'left',
            sorter: (a, b) => a.fabBuyerName - b.fabBuyerName,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Material Type',
            dataIndex: "materialType",
            align: 'left',
            sorter: (a, b) => a.materialType - b.materialType,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Item',
            dataIndex: "itemCode",
            align: 'left',
            sorter: (a, b) => a.itemCode - b.itemCode,
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Grn Quantity',
            dataIndex: 'acceptedQuantity',
            align: 'left',
            sorter: (a, b) => a.acceptedQuantity - b.acceptedQuantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Location Mapped',
            dataIndex: 'allocatedQty',
            align: 'left',
            sorter: (a, b) => a.allocatedQty - b.allocatedQty,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            align: 'left',
            sorter: (a, b) => a.balance - b.balance,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Allocate',
            // render:(record) =>{
            //     console.log(record,"rowdata")
            //     return('')
            // }
            render: (rowData) => (
                
                <span>
                    <Button type="primary" shape="round" size="small"
                        disabled={(rowData.conversion_quantity - rowData.quantity) <= 0}
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

        if (rowdata) {
            navigate("/location-mapping", { state: { data: rowdata } });
        }
    }

    return (
        <div>
            <Card 
            title={<span >GRN Pending Details</span>}
                // style={{ textAlign: 'center' }}
                 headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
                <Table
                    rowKey={record => record.productId}
                    className="components-table-nested"
                    columns={sampleTypeColumns}
                    dataSource={fabData}
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

