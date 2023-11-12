import { Button, Card, Descriptions, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Column } from 'typeorm';

export const PurchaseOrderDetailsView = () => {
  const [data, setData] = useState<any[]>([])
  const page = 1
  const navigate = useNavigate();


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
      title: 'Unit',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Po type',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Customer Po',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Po Number',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Po Date',
      dataIndex: 'requestNumber',
    },
    {
      title: 'VenderName',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Expected Date',
      dataIndex: 'requestNumber',
    },
  ]

  return (
    <div>
      <Card>
      <Card title="PO Detail View" className='card-header' extra={<span style={{ color: 'white' }}> <Button className='panel_button' onClick={() => navigate('/purchase-view')}>Po View</Button> </span>} >
      <Descriptions size='small' >
     
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Unit</span>}>{data[0]?.request_no}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po type</span>}>{data[0]?.location_name}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Customer Po</span>}>{data[0]?.location_name}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Number</span>}>{data[0]?.location_name}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Date</span>}>{data[0]?.location_name}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>VenderName</span>}>{data[0]?.location_name}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Expected Date</span>}>{data[0]?.location_name}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ marginBottom:'30px', fontWeight: 'bold', color: 'darkblack' }}>Delivery Address</span>}>
      {data[0]?.location_name}
    </DescriptionsItem>
 <DescriptionsItem  label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Billing Address</span>}>
      {data[0]?.location_name}
    </DescriptionsItem>
</Descriptions>

     

    <Card >
       <Table columns={columns} bordered/>
    </Card>
    </Card>
    </Card>
    </div>
  )
}

export default PurchaseOrderDetailsView;