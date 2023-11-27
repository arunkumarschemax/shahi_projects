import React, { useEffect } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest } from '@project-management-system/shared-models';
import { LocationMappingService } from '@project-management-system/shared-services';

export const MaterialAllocationView = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [fabData, setFabData] = React.useState<any>()
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();


    const navigate = useNavigate();

    // useEffect(() => {
    //     getAllData()
    // }, [])

    // const getAllData = () => {
    //     locationService.getAllFabrics().then((res) => {
    //         setFabData(res.data);
    //         console.log(res.data, "?????????????????????????????");
    //     })
    // }

    const sampleTypeColumns: ColumnsType<any> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Buyer',
            dataIndex: "grn_number",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Sample Request No',
            dataIndex: "vendor_name",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
       
        {
            title: 'Material Type',
            dataIndex: "item_type",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Item',
            dataIndex: "m3_item_code",
            align: 'left',
            //   sorter: (a, b) => a.vendorName.trim().localeCompare(b.vendorName.trim()),
            //   sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Quantity',
            dataIndex: 'conversion_quantity',
            align: 'left',
            // sorter: (a, b) => a.receivedQuantity - b.receivedQuantity,
            // sortDirections: ['descend', 'ascend'],
        },
       
       
        

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <div>
            <Card title={<span style={{ color: 'white' }}>Material Allocation View</span>}
                style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
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

