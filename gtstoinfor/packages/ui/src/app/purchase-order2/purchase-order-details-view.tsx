import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Row, Select, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { type } from 'os';
import { PurchaseViewDto } from '@project-management-system/shared-models';

export const PurchaseOrderDetailsView = () => {
  const [data, setData] = useState<any[]>([])
  const page = 1
  const navigate = useNavigate();
  const Service = new PurchaseOrderservice()
  const [form] = Form.useForm()
  const [material,setMaterial] = useState<any[]>([])
  const { Option } = Select
  const [drop,setDrop] = useState('')
  const location = useLocation()


  useEffect(() => {
    getPo();
    getMaterialTypeDate();

  }, [])

  const renderCellData = (data) => {
    return data ? data : "-";
  }
  const getPo = () => {
    const req = new PurchaseViewDto(location.state)
    console.log(req,'-----------');
    
    // Service.getPurchaseOrder(req).then(res => {
    //   if (res.status) {
    //     setData(res.data)
    //   }
    // })
    Service.getPodetailsById(req).then(res => {
      if (res.status) {
        console.log(res.data)
        console.log(res.data.fabricInfo)
        setData(res.data)
      }
    })
  }
const getMaterialTypeDate=(()=>{
  const req = new PurchaseViewDto(location.state)
  // console.log(req,'5555555555555555555555555')
  Service.getPAllPurchaseOrderData(req).then(res=>{
    if (res.status) {
      // console.log(res.data,'44444444444444444444444444')
      setMaterial(res.data)
    }
  })

})

 const onChange =((value)=>{
  setDrop(value)
  // console.log(value,'[[[[[[[[[[[[[[')
 })
const itemColumns :any = [
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
    title: 'Material Type',
    key: 'Material Type',
    dataIndex: 'po_material_type',
  },
  {
    title: 'Item Code',
    key: 'Item Code',
    dataIndex: 'item_code',
  },
  {
    title: 'PO Quantity',
    key: 'PO Quantity',
    dataIndex: 'po_quantity',
  },
  {
    title: 'GRN Quantity',
    key: 'GRN Quantity',
    dataIndex: 'grn_quantity',
    render:(text,record)=>{
      return (<span>{record.grn_quantity > 0? record.grn_quantity : 0}</span>)
    }
  },
  
  {
    title: 'Unit Price',
    key: 'Unit Price',
    dataIndex: 'unit_price',
  },
  {
    title: 'Discount %',
    key: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Tax %',
    key: 'Tax %',
    dataIndex: 'tax',
  },
  {
    title: 'Total Amount',
    key: 'Tax %',
    dataIndex: 'subjective_amount',
  },
  
]
// const column1 : any =[
//   {
//     title: 'S No',
//     key: 'sno',
//     width: '70px',
//     responsive: ['sm'],
//     render: (text, object, index) => (page - 1) * 10 + (index + 1),
//     onCell: (record: any) => ({
//       rowSpan: record.rowSpan,
//     }),
//     fixed: 'left',
//   },
//   {
//     title: 'Indent Code',
//     dataIndex: 'indentTrimId',
//   },
//   {
//     title: 'Trim Code',
//     dataIndex: 'm3trimCode',
//   },
//   // {
//   //   title: 'M3 Code',
//   //   dataIndex: 'm3trimCode',
//   // },
//   // {
//   //   title: 'Colour',
//   //   dataIndex: 'trimColor', 
//   // },
//   {
//     title: 'Po Quantity',
//     dataIndex: 'poQuantity',
//   },
 
//   {
//     title: 'Grn Quantity',
//     dataIndex: 'grnQuantity',
//   }, {
//     title: 'Status',
//     dataIndex: 'trimItemStaus',
//   },

  
// ]

  // const columns : any=[
  //   {
  //     title: 'S No',
  //     key: 'sno',
  //     width: '70px',
  //     responsive: ['sm'],
  //     render: (text, object, index) => (page - 1) * 10 + (index + 1),
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //     fixed: 'left',
  //   },
  //   // {
  //   //   title: 'Fabric Type',
  //   //   dataIndex: 'trimtype',
  //   //   render: text => (text ? text : "-")

  //   // },
  //   {
  //     title: 'Fabric Code',
  //     key: 'Fabric Code',
  //     dataIndex: 'itemCode',
  //     render: text => (text ? text : "-")

  //   },
  //   // {
  //   //   title: 'M3 Code',
  //   //   dataIndex: 'm3fabricCode',
  //   // },
  //   // {
  //   //   title: 'Colour',
  //   //   dataIndex: 'fabricColor', 
  //   // },
  //   {
  //     title: 'Po Quantity',
  //     key: 'Po Quantity',
  //     dataIndex: 'poQuantity',
  //     render: text => (text ? text : "-")

  //   }, 
  //   {
  //     title: 'Grn Quantity',
  //     dataIndex: 'grn_quantity',
  //     render: text => (text ? text : "-")

  //   },
  //   // {
  //   //   title: 'Indent Quantity',
  //   //   dataIndex: 'indentQuantity',
  //   // },
  //   {
  //     title: 'Status',
  //     dataIndex: 'fabItemStatus',
  //     render: text => (text ? text : "-")

  //   },
    
  // ]

  return (
    <div>
      <Card>
      <Card title="PO Detail View"  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}  extra={<span style={{ color: 'white' }} > <Button className='panel_button' onClick={() => navigate('/purchase-view')}>Po View</Button> </span>} >
      <Descriptions size='small' >
      <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>PO Against</span>}>{data[0]?.po_against}</DescriptionsItem>
     
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Number</span>}>{data[0]?.po_number}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Date</span>}>{moment(data[0]?.purchase_order_date).format('YYYY-MM-DD')}
{data[0]?.orderDates}</DescriptionsItem>
{/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Material Type</span>}>{data[0]?.materialType}</DescriptionsItem> */}

    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Vendor Name</span>}>{data[0]?.vendor_name}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>ETD</span>}>{moment(data[0]?.expected_delivery_date).format('YYYY-MM-DD')}
</DescriptionsItem>

    <DescriptionsItem label={<span style={{ marginBottom:'30px', fontWeight: 'bold', color: 'darkblack' }}>Delivery Address</span>}>
      {data[0]?.address}
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
      <Table
      rowKey={record=>record.purchase_order_item_id}
      columns={itemColumns}
      dataSource={data}
      />
    {/* {data[0]?.materialType === 'Fabric'?(<Table  columns={columns} dataSource={data.filter(item => item.po_material_type)} />):('')}
    {data[0]?.materialType === 'Trim'?(<Table  columns={column1} dataSource={material?.[0]?.triminfo} />):('')}
    

       {material && material[0]?.fabInfo.length >0 ?(<Table  columns={columns} dataSource={material?.[0]?.fabInfo} />):('')}
      {material && material[0]?.triminfo.length >0 ?(<Table  columns={column1} dataSource={material?.[0]?.triminfo} />):('')} */}
    </Card>
    </Card>
    </Card>
    </div>
  )
}

export default PurchaseOrderDetailsView;