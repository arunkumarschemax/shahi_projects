import React, { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Divider, Row, Table, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest } from '@project-management-system/shared-models';
import { LocationMappingService, SampleDevelopmentService } from '@project-management-system/shared-services';
import TabPane from 'antd/es/tabs/TabPane';

export const MaterialAllocationGrid = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();
    const service = new SampleDevelopmentService()
    const [data,setData] = useState<any[]>([])
    const navigate = useNavigate();
    const [openData, setOpenData] = useState<any[]>([]);
    const [approvedData, setApprovedData] = useState<any[]>([]);



    useEffect(()=>{
        getData()
    },[])

    const getData = () =>{
         service.getAllMaterialAllocation().then(res=>{
            if(res.status){
                const openItems = res.data.filter(item => item.status === 'APPROVAL_PENDING');
                const approvedItems = res.data.filter(item => item.status === 'APPROVED');

                setOpenData(openItems);
                setApprovedData(approvedItems);
            }

         })
    }

    console.log(data,"dddd")

    // const hardcoreData = [
    //     {
    //       sample_req: 'SAM/23-24/000001',
    //       location: 'A1L1',
    //       sample_type: 'Fabric',
    //       buyer_name: 'Uniqlo',
    //       product_group: 'Electronics',
    //       quantity: 50,
    //     },
    //     {
    //       sample_req: 'SAM/23-24/000002',
    //       location: 'A1L2',
    //       sample_type: 'Trim',
    //       buyer_name: 'Nike',
    //       product_group: 'Clothing',
    //       quantity: 150,
    //     },
    //     // Add more data as needed
    //   ];
      
    //   const [data, setData] = useState<any[]>(hardcoreData)


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
            dataIndex: "buyer_name",
            align: 'left',
            sorter: (a, b) => a.buyer_name.localeCompare(b.buyer_name),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Sample Type',
            dataIndex: "item_type",
            align: 'left',
            sorter: (a, b) => a.item_type.localeCompare(b.item_type),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        // {
        //     title: 'Sample Request No',
        //     dataIndex: "sample_req",
        //     align: 'left',
        //     sorter: (a, b) => a.sample_req.localeCompare(b.sample_req),
        //       sortDirections: ['descend', 'ascend'],
        //     //   ...getColumnSearchProps('vendorName')
        // },
        
        
        {
            title: 'Location',
            dataIndex: "location_name",
            align: 'left',
            sorter: (a, b) => a.location_name.localeCompare(b.location_name),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Quantity',
            dataIndex: "quantity",
            align: 'left',
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
       
     
        {
            title: 'Action',
            render: (rowData) => (
              <Row>
                <span>
                  <Button type="primary" shape="round" size="small" style={{background:"green"}}>
                    Approve
                  </Button>
                  <Divider type="vertical" />
                  {/* <Button type="primary" shape="round" size="small" style={{background:"red"}}>
                    Reject
                  </Button> */}
                </span>
              </Row>
            )
          }
];

const sampleTypeColumns1: ColumnsType<any> = [
    {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * pageSize + (index + 1)
    },
    {
        title: 'Buyer',
        dataIndex: "buyer_name",
        align: 'left',
        sorter: (a, b) => a.buyer_name.localeCompare(b.buyer_name),
          sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('vendorName')
    },
    {
        title: 'Sample Type',
        dataIndex: "item_type",
        align: 'left',
        sorter: (a, b) => a.item_type.localeCompare(b.item_type),
          sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('vendorName')
    },
    // {
    //     title: 'Sample Request No',
    //     dataIndex: "sample_req",
    //     align: 'left',
    //     sorter: (a, b) => a.sample_req.localeCompare(b.sample_req),
    //       sortDirections: ['descend', 'ascend'],
    //     //   ...getColumnSearchProps('vendorName')
    // },
    
    
    {
        title: 'Location',
        dataIndex: "location_name",
        align: 'left',
        sorter: (a, b) => a.location_name.localeCompare(b.location_name),
          sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('vendorName')
    },
    {
        title: 'Quantity',
        dataIndex: "quantity",
        align: 'left',
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),
          sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('vendorName')
    },
   
 
    {
        title: 'Action',
        render: (rowData) => (
          <Row>
            <span>
              <Button type="primary" shape="round" size="small" >
                Issue Material
              </Button>
            </span>
          </Row>
        )
      }
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
               
            <Tabs type={'card'} tabPosition={'top'}>
                <TabPane key="1" tab={<span style={{fontSize:'15px'}}><b>{`OPEN`}</b></span>}>
                <Table
                size="small"
                columns={sampleTypeColumns}
                dataSource={openData}
                scroll={{ x: true }}
                bordered
                pagination ={false}
            />
                </TabPane>
                <TabPane key="2" tab={<span style={{fontSize:'15px'}}><b>{`APPROVED`}</b></span>}>
                <Table
                size="small"
                columns={sampleTypeColumns1}
                dataSource={approvedData}
                scroll={{ x: true }}
                bordered
                pagination ={false}
            />
                </TabPane>
            </Tabs>
            </Card> 
        </div>
    )
}

