import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Descriptions, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Column } from 'typeorm';

export const PurchaseOrderDetailsView = () => {
  const [data, setData] = useState<any[]>([])
  const page = 1
  const navigate = useNavigate();
  const Service = new PurchaseOrderservice()

  useEffect(() => {
    getPo();
  }, [])

  const getPo = () => {
    Service.getPurchaseOrder().then(res => {
      if (res.status) {
        setData(res.data)
      }
    })
  }


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
      title: 'Fabric Color',
      dataIndex: 'fabricColor',
    },
    {
      title: 'Po type',
      dataIndex: 'fabricTypeName',
    },
    // {
    //   title: 'Customer Po',
    //   dataIndex: 'm3FabricCode',
    // },
    {
      title: 'Po Number',
      dataIndex: 'content',
    },
    {
      title: 'Po Date',
      dataIndex: 'orderDate',
      render: (text, record) => {
        return record.orderDate
          ? moment(record.orderDate).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: 'VenderName',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Expected Date',
      dataIndex: 'deliveryDate',
      render: (text, record) => {
        return record.deliveryDate
          ? moment(record.deliveryDate).format('YYYY-MM-DD')
          : "";
      },
    },
  ]

  return (
    <div>
      <Card>
      <Card title="PO Detail View" className='card-header' extra={<span style={{ color: 'white' }}> <Button className='panel_button' onClick={() => navigate('/purchase-view')}>Po View</Button> </span>} >
      <Descriptions size='small' >
     
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Unit</span>}>{data[0]?.purchaseOrderId}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po type</span>}>{data[0]?.poNumber}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Style</span>}>{data[0]?.style}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Number</span>}>{data[0]?.poNumber}</DescriptionsItem>
  <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Po Date</span>}>{moment(data[0]?.orderDates).format('YYYY-MM-DD')}
{data[0]?.orderDates}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>VenderName</span>}>{data[0]?.location_name}</DescriptionsItem>
    <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Expected Date</span>}>{moment(data[0]?.deliveryDate).format('YYYY-MM-DD')}
</DescriptionsItem>
    <DescriptionsItem label={<span style={{ marginBottom:'30px', fontWeight: 'bold', color: 'darkblack' }}>Delivery Address</span>}>
      {data[0]?.location_name}
    </DescriptionsItem>
 <DescriptionsItem  label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Billing Address</span>}>
      {data[0]?.location_name}
    </DescriptionsItem>
</Descriptions>

     

    <Card >
       <Table columns={columns} dataSource={data} bordered/>
    </Card>
    </Card>
    </Card>
    </div>
  )
}

export default PurchaseOrderDetailsView;