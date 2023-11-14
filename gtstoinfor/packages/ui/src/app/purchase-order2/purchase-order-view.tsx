import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PurchaseOrderView = () => {
  const page = 1;
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  let navigate = useNavigate();
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

  // const DetailView = (rowData, cancel) => {
  //   const navigateData = filterData.filter(req => req.sample_request_id === rowData)
  //   return navigate(`/purchase-detali-view`, { state: { data: navigateData, cancelVisible: cancel } });
  // };
  const columns: any = [
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
      title: 'Indent No ',
      dataIndex: 'requestNumber',
    },
    {
      title: 'Po Number',
      dataIndex: 'poNumber',
    },
    {
      title: 'Style',
      dataIndex: 'style',
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
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Aging',
      dataIndex: 'requestNumber',
      render: (value, record) => {
        const currentDate = new Date();
        const deliveryDate = new Date(moment(record.deliveryDate).format('YYYY-MM-DD'));
        const aging = deliveryDate.getTime() - currentDate.getTime();
        const daysDifference = Math.floor(aging / (1000 * 60 * 60 * 24));
            const isAboveDueDate = daysDifference > 0;
    
        return (
          <>
            {isAboveDueDate ? '-' : ''}
            {Math.abs(daysDifference)}
          </>
        );
      }
    },
    
    {
      title: 'Action',
      dataIndex: 'requestNumber',
      align: "center",
      render: (text, rowData, index) => (
        <span>
          <Tooltip placement="top" title="Detail View">
            <EyeOutlined
              onClick={() => {
                navigate('/purchase-detali-view')
                // setHideCancelButton(false);
                // DetailView(rowData.SampleRequestId, false);
              }}
              style={{ color: "blue", fontSize: 20 }}
            />
          </Tooltip>
        </span>
      ),

    },


  ]
  return (
    <div><Card title="Purchase Orders" className='card-header' >
      <Form>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="EDD Date" name="deliveryDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Po Date" name="orderDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button htmlType='submit' type="primary"> Get Detail </Button>
          </Col>
          <Col span={2}>
            <Button htmlType='reset' danger >Reset</Button>
          </Col>
        </Row>
      </Form>
      <Card>
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    </Card>

    </div>
  )
}

export default PurchaseOrderView;

