import React, { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Divider, Form, Row, Select, Table, Tabs, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BuyersDto, GRNLocationPropsRequest, MaterialStatusEnum, buyerReq, statusReq } from '@project-management-system/shared-models';
import { BuyersService, LocationMappingService, SampleDevelopmentService } from '@project-management-system/shared-services';
import TabPane from 'antd/es/tabs/TabPane';
import AlertMessages from '../common/common-functions/alert-messages';

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
      const [buyersData,setBuyersData] = useState<BuyersDto[]>([]);
     const [approvedData, setApprovedData] = useState<any[]>([]);
     const buyerService = new BuyersService()
    const [form] = Form.useForm()





    useEffect(()=>{
        getData()
        getBuyersData()
    },[])

    const getData = () =>{
        const req = new buyerReq()
        
        if(form.getFieldValue('buyerId') !== undefined){
            req.buyerId = form.getFieldValue('buyerId')
        }
         service.getAllMaterialAllocation(req).then(res=>{
            if(res.status){
                const openItems = res.data.filter(item => item.status === 'APPROVAL_PENDING');
                const approvedItems = res.data.filter(item => item.status === 'APPROVED');

                setOpenData(openItems);
                setApprovedData(approvedItems);
            } else {
                setOpenData([])
                setApprovedData([])
                message.success("No Data Found")

            }

         })
    }

     const onApprove =(rowData) =>{
        console.log(rowData,"rrrrrrrr")
        console.log(rowData.material_allocation_id,"rrrrrrrr")

        

        const req = new statusReq(rowData.material_allocation_id,MaterialStatusEnum.APPROVED)
        service.updateStatus(req).then(res=>{
            if (res.status){
                AlertMessages.getSuccessMessage(res.internalMessage);
                getData()

            }else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }

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
            title: 'Buyer',
            dataIndex: "buyer_name",
            align: 'left',
            sorter: (a, b) => a.buyer_name.localeCompare(b.buyer_name),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Sample Request No',
            dataIndex: "request_no",
            align: 'left',
            sorter: (a, b) => a.request_no.localeCompare(b.request_no),
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
            // align: 'center',
            render: (rowData) => (
              <Row>
                <span style={{ textAlign: 'center' }}>
                  <Button type="primary"  size="small" style={{background:"green"}} onClick={() => onApprove(rowData)}>
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
        title: 'Sample Request No',
        dataIndex: "request_no",
        align: 'left',
        sorter: (a, b) => a.request_no.localeCompare(b.request_no),
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
        // align: 'center',
        render: (rowData) => (
          <Row>
            <span>
              <Button type="primary" size="small" >
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




  const getBuyersData = () => {
    buyerService.getAllActiveBuyers().then(res => {
      if(res.status){
        setBuyersData(res.data)
      }
    })
  }

  const OnReset = () => {
    form.resetFields()
      getData()

}

  


    return (
        <div>
             <Card title={<span style={{ color: 'white' }}>Material Allocation</span>}
                style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
                
              
                <Form  form={form} onFinish={getData} >
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5}}>
              <Form.Item
                name="buyerId"
                label="Buyer"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                 <Select
                  placeholder="Select Buyer"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                 
                  {buyersData.map((e) => {
                  return (
                    <option
                      key={e.buyerId}
                      value={e.buyerId}
                    >
                      {e.buyerName}
                    </option>
                  );
                })}
                </Select>
              </Form.Item>
            </Col> 
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                <Form.Item >
                    <Button  type="primary" htmlType="submit">Search</Button>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 2 }}>
                <Form.Item>
                    <Button  onClick={OnReset}>Reset</Button>
                </Form.Item>
                </Col>
            </Row>

                </Form>
                  
               
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

