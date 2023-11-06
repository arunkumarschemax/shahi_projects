import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { MaterrialIssueServices } from 'packages/libs/shared-services/src/common/material-issue-service';
import React, { useEffect, useState } from 'react'


const MaterialIssueReport = () => {
  const service = new MaterrialIssueServices()
  const [data, setData] = useState<any[]>([])
  const page = 1;


  useEffect(() => {
    getAllMaterial();
  }, [])
  const getAllMaterial = () => {
    service.getAllMaterialIssues().then((res) => {
      if (res.status) {
        setData(res.data);
      }
    })
  }
 


  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },


    {
      title: "Request No",
      dataIndex: "requestNo",
    },
    {
      title: "M3 Style No",
      dataIndex: "styleno",
    },
    {
      title: "Consumption Code",
      dataIndex: "consumptioncode",
    },
    {
      title: "Sample Type",
      dataIndex: "sampletype",

    },
    {
      title: "PCH",
      dataIndex: "pchId",
    },
    {
      title: "Sample Indent Date",
      dataIndex: "date",
    },

    {
      title: "Location",
      dataIndex: "locationId",
    },
    {
      title: "Style",
      dataIndex: "style",
    },
    {
      title: " Buyer",
      dataIndex: "buyer",
    },
    {
      title: "Issued Date",
      dataIndex: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  
    {
      title: "Fabric Code",
      dataIndex: "fabricCode",
    },
    {
      title: "	Description",
      dataIndex: "description",
    },
    {
      title: "color",
      dataIndex: "colorId",
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
    },
    {
      title: "Issued Quantity",
      dataIndex: "issuedQuantity",
    },

  ]


  return (
    <div>
      <Card>
        <Form><Row gutter={16}>
          <Col span={6}>
            <Form.Item name={'consumptioncode'} label={'Consumption Code'}>
              <Select placeholder='Input Consumption Code'>
                {data.map((rec) => {
                  return <Select.Option key={rec.id} value={rec.consumptioncode}>{rec.consumptioncode}</Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name={'requestNo'} label={'Request No'}>
              <Select placeholder='Input Request No'>
                {data.map((rec) => {
                  return <Select.Option key={rec.id} value={rec.requestNo}>{rec.requestNo}</Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button >Search</Button>
          </Col>
          <Col span={1}>
            <Button htmlType='reset'>Reset</Button>
          </Col>
        </Row>
        </Form>
         <div style={{ overflowX: 'auto' }}>
          <Table bordered columns={columns} dataSource={data}   />
        </div>        


        <br />
      </Card>
    </div>
  );
};

export default MaterialIssueReport;
