import React, { useState, useEffect, useRef } from 'react';
import {Table, Card, Button, Row, Col, Form, Select, Tabs } from 'antd';
import {SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { StyleOrderService } from '@project-management-system/shared-services';


const BomReport = () => {
  const styleorderService = new StyleOrderService()

  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const {Option} = Select;
  const [page, setPage] = React.useState(1);
  const [codata, setCOData] = useState<any[]>([]);




  useEffect(() => {
    getCoData();
   
  }, []);

  const getCoData = () => {

    styleorderService.getCoNumber().then((res) => {
      if (res.status) {
        setCOData(res.data);
       }
    });
}

    



  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: "Customer Order",
      dataIndex: "co_number",
      align:'center',
    
      // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Rm Item Sku",
      dataIndex: "rm_sku_id",
      align:'center',
    
      // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      // sortDirections: ['descend', 'ascend'],
    },
    {
        title: "Consumption",
        dataIndex: "consumption",
        align:'center',
        // sorter: (a, b) => a.item_code.localeCompare(b.item_code),
        //     sortDirections: ['descend', 'ascend'],
      },
     

      {
        title: "Quantity",
        dataIndex: "quantity",
        align:'center',
             sortDirections: ['descend', 'ascend'],
      }, 
      {
        title: "Item Type",
        dataIndex: "item_type_id",
        align:'center',
             sortDirections: ['descend', 'ascend'],
      },
      {
        title: "RM item Code",
        dataIndex: "rm_item_code",
        align:'center',
             sortDirections: ['descend', 'ascend'],
      },
    
  ];

  const  onReset =() =>{
    form.resetFields();
  }



  


  return (
       <Card title={<span >Bom Report</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }}>
        <Form  form={form} layout="horizontal">
                <Row gutter={24}>
                    <Col xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 4 }}
                      lg={{ span: 4 }}
                      xl={{ span: 6}} >
                        <Form.Item name='customerOrder' label='Customer Order' >
                            <Select showSearch placeholder="Select Customer Order" optionFilterProp="children" allowClear >
                            {
                           codata.map((e) => {
                                    return(
                                        <Option key={e.coId} value={e.coId}>{e.coNumber}</Option>
                                    )
                                })
                            } 
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemGroup' label='Item Group'>
                            <Select showSearch placeholder="Select Item Group" optionFilterProp="children" allowClear>
                               
                            </Select>
                        </Form.Item>
                    </Col> */}
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} style={{marginTop:'0%'}}>
                    <Form.Item>
                        <Button  icon={<SearchOutlined />} htmlType="submit" type="primary">Get Report</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 2 }} style={{marginTop:'0%'}}>
                    <Form.Item>
                        <Button danger icon={<UndoOutlined />} onClick={onReset}>Reset</Button>
                    </Form.Item>
                    </Col>
                  
                </Row>
                
                  {/* </TabPane> */}
                      <Table
                      size="small"
                      columns={columnsSkelton}
                      // dataSource={rowData[0]?.sampleTrimInfo}
                      scroll={{ x: true }}
                      bordered
                      pagination ={false}
                  />
        </Form>

  
     
      </Card> 
      
  );
}


export default BomReport