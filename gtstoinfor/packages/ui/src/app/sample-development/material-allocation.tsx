import React, { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest } from '@project-management-system/shared-models';
import { LocationMappingService } from '@project-management-system/shared-services';

export const MaterialAllocationGrid = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();


    const navigate = useNavigate();

    const hardcoreData = [
        {
          sample_req: 'SAM/23-24/000001',
          location: 'A1L1',
          sample_type: 'Fabric',
          buyer_name: 'Uniqlo',
          product_group: 'Electronics',
          quantity: 50,
        },
        {
          sample_req: 'SAM/23-24/000002',
          location: 'A1L2',
          sample_type: 'Trim',
          buyer_name: 'Nike',
          product_group: 'Clothing',
          quantity: 150,
        },
        // Add more data as needed
      ];
      
      const [data, setData] = useState<any[]>(hardcoreData)


    const sampleTypeColumns: ColumnsType<any> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Sample Request No',
            dataIndex: "sample_req",
            align: 'left',
              sorter: (a, b) => a.sample_req.trim().localeCompare(b.sample_req.trim()),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Sample Type',
            dataIndex: "sample_type",
            align: 'left',
              sorter: (a, b) => a.sample_type.trim().localeCompare(b.sample_type.trim()),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Buyer',
            dataIndex: "buyer_name",
            align: 'left',
              sorter: (a, b) => a.buyer_name.trim().localeCompare(b.buyer_name.trim()),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Location',
            dataIndex: "location",
            align: 'left',
              sorter: (a, b) => a.location.trim().localeCompare(b.location.trim()),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Quantity',
            dataIndex: "quantity",
            align: 'left',
              sorter: (a, b) => a.quantity.trim().localeCompare(b.quantity.trim()),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
       
     
        {
            title: 'Action',
            // render:(record) =>{
            //     console.log(record,"rowdata")
            //     return('')
            // }
            render: (rowData) => (
                
                <span>
                    <Button type="primary" shape="round" size="small"
                        disabled={(rowData.conversion_quantity - rowData.quantity) <= 0}
                        // onClick={() => {
                        //     setData(rowData);
                        // }}
                        >
                        Approve
                    </Button>
                </span>
            )
        },

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    // const setData = (rowdata) => {
    //     console.log(rowdata)

    //     if (rowdata) {
    //         navigate("/location-mapping", { state: { data: rowdata } });
    //     }
    // }

    return (
        <div>
            <Card title={<span style={{ color: 'white' }}>Material Allocation</span>}
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

