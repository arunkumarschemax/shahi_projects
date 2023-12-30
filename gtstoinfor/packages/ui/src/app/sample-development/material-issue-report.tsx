import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
// import { RequestNoDto } from 'packages/libs/shared-models/src/common/material-issue/requestno.dto';
import { useEffect, useState } from 'react';
import './marerial.css';
import moment from 'moment';
import { AllocationReportReq, ItemTypeEnumDisplay, RequestNoDto } from '@project-management-system/shared-models';


const { Option } = Select;
const MaterialIssueReport = () => {
  const [form] = Form.useForm();
  const service = new MaterialIssueService();
  const [data, setData] = useState<[]>([]);
  const [req, setReq] = useState<[]>([]);
  const [racks, setRacks] = useState<any[]>([]);
  const page = 1;


  useEffect(() => {
    getAllMaterial();
    getRacks()
    getReqNo()
  }, []);

  const getAllMaterial = () => {
    const req = new AllocationReportReq()
    if (form.getFieldValue('requestNo') !== undefined) {
      req.requestNo = form.getFieldValue('requestNo')
    }
    if (form.getFieldValue('rackPosition') !== undefined) {
      req.rackPosition = form.getFieldValue('rackPosition')
    }
    service.getMaterialAllocationReport(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };

  const resetHandler = () => {
    form.resetFields();
    getAllMaterial();

}

  const getRacks = () => {
    service.getRackPositions().then(res => {
      if (res.status) {
        setRacks(res.data)
      }
    }).catch(err => console.log(err))
  }

  const getReqNo = () => {
    service.getSampleReq().then(res => {
      if (res.status) {
        setReq(res.data)
      }
    }).catch(err => console.log(err))
  }


  
  const Columns: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      // onCell: (record: any) => ({
      //   rowSpan: record.rowSpan,
      // }),
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      width: '150px'
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
      width: '150px',
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },

    },
    {
      title: "Rack Position",
      dataIndex: "rackPosition"
    },
    {
      title: "Allocated Qty",
      dataIndex: "allocateQty"
    },
    {
      title: "Consumption",
      dataIndex: "combinedConsumption"
    },
    {
      title: "Status ",
      dataIndex: "status",
    },
  ]


  return (
    <>
      <Card title="Material Issue Report"  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <div>
          <Form form={form} layout='vertical' onFinish={getAllMaterial}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name='requestNo' label='Request No'
                  style={{ marginBottom: '10px' }}>
                  <Select 
                  placeholder='Select Request No' 
                   optionFilterProp="children"
                   allowClear
                   showSearch >
                  {req?.map((inc: any) => {
                    return <Option key={inc.requestId} value={inc.requestNo}>{inc.requestNo}</Option>
                  })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='rackPosition' label='Rack Position'
                  style={{ marginBottom: '10px' }}>
                  <Select 
                  placeholder='Select Rack Position' 
                   optionFilterProp="children"
                   allowClear
                   showSearch >
                  {racks?.map((inc: any) => {
                    return <Option key={inc.positionId} value={inc.rackPosition}>{inc.rackPosition}</Option>
                  })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item style={{ marginTop: '22px' }}>
                  <Button
                    htmlType='submit'
                    type="primary"
                    style={{ width: '80px', marginRight: "10px" }}
                  >Submit</Button>
                  <Button htmlType='reset' danger style={{ width: '80px' }} onClick={resetHandler}>Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Table columns={Columns} dataSource={data} />
        </div>
      </Card>
    </>
  );
};

export default MaterialIssueReport;
