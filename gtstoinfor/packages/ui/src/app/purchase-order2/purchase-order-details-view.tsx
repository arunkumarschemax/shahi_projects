import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Row, Select, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { type } from 'os';

export const PurchaseOrderDetailsView = () => {
  const [data, setData] = useState<any[]>([])
  const page = 1
  const navigate = useNavigate();
  const Service = new PurchaseOrderservice()
  const [form] = Form.useForm()
 const [material,setMaterial] = useState<any[]>([])
  const { Option } = Select
  const [drop,setDrop] = useState('')



  useEffect(() => {
    getPo();
    getMaterial();

  }, [])

  const renderCellData = (data) => {
    return data ? data : "-";
  }
  const getPo = () => {
    Service.getPurchaseOrder().then(res => {
      if (res.status) {
        setData(res.data)
        console.log(res.data?.[0].type,'>>>>>>>>>>>>>>>')
      }
    })
  }
const getMaterial=(()=>{
  Service.getMaterialTpye().then(res=>{
    if (res.status) {
      setMaterial(res.data)
    }
  })

})

 const onChange =((value)=>{
  setDrop(value)
  console.log(value,'[[[[[[[[[[[[[[')
 })

const column1 : any =[
  {
    title: 'S No',
    key: 'sno',
    width: '70px',
    responsive: ['sm'],
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
    onCell: (record: any) => ({
      rowSpan: record.rowSpan,
    }),
    fixed: 'left',
  },
  {
    title: 'Indent Code',
    dataIndex: 'indentCode',
  },
  {
    title: 'Trim Code',
    dataIndex: '',
  },
  {
    title: 'Size',
    dataIndex: 'trimsize',
  },
  {
    title: 'Colour',
    dataIndex: 'trimColor', 
  },
  {
    title: 'Po Quantity',
    dataIndex: 'trQuantity',
  },
  {
    title: 'Indent Quantity',
    dataIndex: 'indentTQuantity',
  },
]

  const columns : any=[
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: 'Indent Code',
      dataIndex: 'indentFbCode',
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabricCode',
    },
    {
      title: 'Size',
      dataIndex: '',
    },
    {
      title: 'Colour',
      dataIndex: 'fabricColor', 
    },
    {
      title: 'Po Quantity',
      dataIndex: 'poQuantity',
    },
    {
      title: 'Indent Quantity',
      dataIndex: 'indentQuantity',
    },
    
    
  ]

  return (
    <div>
      <Card>
      <Card title="PO Detail View"  extra={<span style={{ color: 'white' }}> <Button className='panel_button' onClick={() => navigate('/purchase-view')}>Po View</Button> </span>} >
      <Descriptions size='small' >
     
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Number</span>}>{data[0]?.poNumber}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Date</span>}>{moment(data[0]?.orderDates).format('YYYY-MM-DD')}
{data[0]?.orderDates}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>VenderName</span>}>{data[0]?.vendorName}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Expected Date</span>}>{moment(data[0]?.deliveryDate).format('YYYY-MM-DD')}
</DescriptionsItem>
    <DescriptionsItem label={<span style={{ marginBottom:'30px', fontWeight: 'bold', color: 'darkblack' }}>Delivery Address</span>}>
      {data[0]?.location_name}
    </DescriptionsItem>
 
</Descriptions>

{/* <Form form={form}>
                  <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                          <Form.Item label='Material Type' name='materialType'>
                              <Select showSearch allowClear optionFilterProp="children" placeholder='Select Operation' onChange={onChange}>
                                  {
                                      material.map(e => {
                                          return (
                                              <Option key={e.purchaseOrderId} value={e.materialType}>{e.materialType}</Option>
                                          )
                                      })
                                  }

                              </Select>
                          </Form.Item>
                      </Col>
                  </Row>
            </Form> */}

    <Card >
    {/* {drop === 'Fabric'? (
        <Table columns={columns} dataSource={data?.[0].type} bordered />
      ):[]}
      {drop === 'Trim'? (
       <Table columns={column1}dataSource={data?.[0].type} bordered  />
       ):[]} */}
       <Table  columns={columns} dataSource={data} />
    </Card>
    </Card>
    </Card>
    </div>
  )
}

export default PurchaseOrderDetailsView;