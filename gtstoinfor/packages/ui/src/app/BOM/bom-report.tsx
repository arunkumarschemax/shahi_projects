import React, { useState, useEffect, useRef } from 'react';
import {Table, Card, Button, Row, Col, Form, Select, Tabs } from 'antd';
import {DownloadOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { CoBomService, StyleOrderService } from '@project-management-system/shared-services';
import { StyleOrderid } from '@project-management-system/shared-models';
import { Excel } from 'antd-table-saveas-excel';


const BomReport = () => {
  const styleorderService = new StyleOrderService()
  const Bomservice = new CoBomService()
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const {Option} = Select;
  const [page, setPage] = React.useState(1);
  const [codata, setCOData] = useState<any[]>([]);
  const [bom, setBom] = useState<any[]>([]);
  const [key, setKey] = useState();





  useEffect(() => {
    getBom();
    getCoData();

  }, []);


const getBom =()=>{
  const req = new StyleOrderid();
  if (form.getFieldValue('CoNumber') !== undefined) {
      req.styleOrderId = form.getFieldValue('CoNumber');
  }
  Bomservice.getBomAgainstItem().then((res)=>{
    if (res.status){
      setBom(res.data)
    }else{
      setBom([])

    }
  })
}
    


const getCoData = () => {
  Bomservice.getcoOrderNumber().then((res) => {
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
      dataIndex: "CoNumber",
      align:'center',
    
      // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      // sortDirections: ['descend', 'ascend'],
    },

    {
      title: "Customer OrderLine",
      dataIndex: "coLineNumber",
      align:'center',
    },
    {
      title: "Rm Item Sku",
      dataIndex: "rmitemCode",
      align:'center',
    
      // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      // sortDirections: ['descend', 'ascend'],
    },

    // {
    //   title: "Rm Item Sku",
    //   dataIndex: "rm_item_code",
    //   align:'center',
    
    //   // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
    //   // sortDirections: ['descend', 'ascend'],
    // },
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
      // {
      //   title: "Item Type",
      //   dataIndex: "item_type",
      //   align:'center',
      //        sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: "RM item Code",
      //   dataIndex: "rm_item_code",
      //   align:'center',
      //        sortDirections: ['descend', 'ascend'],
      // },
    
  ];

  const  onReset =() =>{
    form.resetFields();
  }


  const exportExcel = () => {
    const currentDate = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("/");

if (key === 'Bom'){
  const excel = new Excel();
excel
  .addSheet('Bom-report')
  .addColumns(exceldata)
  .addDataSource(bom, { str2num: true })
  .saveAs(`Bom-report-${currentDate}.xlsx`);
} 

}
  
const exceldata:any=[
  {
    title: 'S No',
    key: 'sno',
    responsive: ['sm'],
    render: (text, object, index) => (page - 1) * 10 + (index + 1)
  },
  {
    title: "Customer Order",
    dataIndex: "CoNumber",
    align:'center',
  
    // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
    // sortDirections: ['descend', 'ascend'],
  },

  {
    title: "Customer OrderLine",
    dataIndex: "coLineNumber",
    align:'center',
  },
  {
    title: "Rm Item Sku",
    dataIndex: "rmitemCode",
    align:'center',
  
    // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
    // sortDirections: ['descend', 'ascend'],
  },

  // {
  //   title: "Rm Item Sku",
  //   dataIndex: "rm_item_code",
  //   align:'center',
  
  //   // sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
  //   // sortDirections: ['descend', 'ascend'],
  // },
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
   
]

  return (
    <Card title='Bom Report' >
      <div>
      <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
            GET EXCEL
          </Button>
      </div>
       {/* <Card title={<span >Bom Report</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }}> */}
        <Form  form={form} layout="horizontal" onFinish={getBom}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 4 }}
                      lg={{ span: 4 }}
                      xl={{ span: 6}} >
                        <Form.Item name='CoNumber' label='Customer Order' >
                            <Select showSearch placeholder="Select Customer Order" optionFilterProp="children" allowClear >
                            {
                           codata.map((e) => {
                                    return(
                                        <Option key={e.co_number} value={e.co_number}>{e.CoNumber}</Option>
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
                      dataSource={ bom}
                      scroll={{ x: true }}
                      bordered
                      pagination ={false}
                  />
        </Form>

  
     
      </Card> 
      
  );
}


export default BomReport