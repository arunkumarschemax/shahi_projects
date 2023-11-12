import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tooltip } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PurchaseOrderView = () => {
  const page = 1;
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  let navigate = useNavigate();



  const DetailView = (rowData, cancel) => {
    const navigateData = filterData.filter(req => req.sample_request_id === rowData)
    return navigate(`/purchase-detali-view`, { state: { data: navigateData, cancelVisible: cancel } });
  };
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
    {
      title: 'Aging',
      dataIndex: 'requestNumber',
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
                DetailView(rowData.SampleRequestId, false);
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
          <Form.Item label="EDD Date" name="eddDate">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Po Date" name="poDate">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Button  htmlType='submit' type="primary"> Get Detail </Button>
        </Col>
        <Col span={2}>
          <Button  htmlType='reset' danger >Reset</Button>
        </Col>
      </Row>
      </Form>
      <Card>
        <Table columns={columns} bordered />
      </Card>
    </Card>

    </div>
  )
}

export default PurchaseOrderView;