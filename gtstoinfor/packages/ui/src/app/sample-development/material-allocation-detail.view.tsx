import React, { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Descriptions, Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest, MaterialAllocationitemsIdreq } from '@project-management-system/shared-models';
import { LocationMappingService, SampleDevelopmentService } from '@project-management-system/shared-services';
import DescriptionsItem from 'antd/es/descriptions/Item';

export const MaterialAllocationDetailView = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [fabData, setFabData] = React.useState<any>()
    const [data, setData] = useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();


    const navigate = useNavigate();
    const location = useLocation()
    console.log(location.state,"loo")
     const service = new SampleDevelopmentService();
     console.log(data,data)


  

    const sampleTypeColumns: ColumnsType<any> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
       
        {
            title: 'Location',
            dataIndex: "rack_position_name",
            align: 'left',
            width:130,
            sorter: (a, b) => a.rack_position_name - b.rack_position_name,
             sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
       
        // {
        //     title: 'Quantity',
        //     dataIndex: 'quantity',
        //     align: 'left',
        //     width:130,
        //     sorter: (a, b) => a.quantity - b.quantity,
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Allocate Quantity',
            dataIndex: 'allocate_quantity',
            align: 'left',
            width:130,
            sorter: (a, b) => a.allocate_quantity - b.allocate_quantity,
            sortDirections: ['descend', 'ascend'],
        }
       
        

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    
  
  useEffect(() => {
    getallMaterialAllocationItemsById();
  }, []);

  const getallMaterialAllocationItemsById = () => {
    const req = new MaterialAllocationitemsIdreq(location?.state?.material_allocation_id);

    service.getallMaterialAllocationItemsById(req).then((res) => {
      if (res.status) {
        setData(res.data)
       
      } 
      
       
        });
  };



    return (
        <div>
            <Card title={<span style={{ color: 'white' }}>Material Allocation Details</span>}
                // style={{ textAlign: 'center' }} 
                headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
                extra={
                    <span>
                      <Button
                        onClick={() =>
                          navigate("/sample-development/material-allocation")
                        }
                        type={"primary"}
                      >
                        View
                      </Button>
                    </span>
                  }
                >

                <Descriptions size='small'>
                <DescriptionsItem label='Sample Request No'>{location?.state?.request_no}</DescriptionsItem>
                 <DescriptionsItem label='Buyer'>{location?.state?.buyer_name}</DescriptionsItem>
                <DescriptionsItem label='Item Type'>{location?.state?.item_type}</DescriptionsItem>
                {/* <DescriptionsItem label='Quantity'>{location?.state?.quantity}</DescriptionsItem> */}
                <DescriptionsItem label='Total Allocated Quantity'>{location?.state?.total_allocated_quantity}</DescriptionsItem>
               
            </Descriptions>
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
                    size='small'
                    bordered
                />
            </Card>
        </div>
    )
}

