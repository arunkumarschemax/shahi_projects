import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Card } from 'antd';
import { AllPriceDto } from 'packages/libs/shared-models/src/price-model';
import { useNavigate } from 'react-router-dom';
import { PricesService } from '@project-management-system/shared-services';

const PriceForm = () => {
  const navigate = useNavigate();
  const service = new PricesService();
  const [form] = Form.useForm();


  const handleViewClick = () => {
    navigate('/priceview'); 
  }

  const handleReset = () => {
    form.resetFields(); // Reset all form fields
  }

  const onFinish = (values) => {
    console.log(values, "values");
    const req = new AllPriceDto(values.headOfChargers, values.perUnit, values.dpLogistics,values.vendor,values.nsh,values.ksr,values.unitPrice);
    service
      .postdata(req)
      .then((res) => {
        if (res.status) {
          message.success("Success");
          navigate('/priceview')
        } else {
          message.error("Failed");
        }
      })
      .catch((err) => {
        console.log(err.message, 'err message');
      });
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white' }}>Upload Document</span>
          <Button type="primary" onClick={handleViewClick}>View</Button>
        </div>
      }
      bordered={true}
      style={{ flex: 1 }}
      headStyle={{ backgroundColor: '#4bc5eb', color: 'white', border: 0 }}
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
          <div style={{ color: 'black', fontWeight: 'bold', marginBottom: 8 }}>Head Of Chargers</div>
            <Form.Item
              name="headOfChargers"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div style={{color: 'black', fontWeight: 'bold', marginBottom: 8 }}>Per Unit</div>
            <Form.Item
              name="perUnit"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div style={{ color: 'black', fontWeight: 'bold', marginBottom: 8 }}>Dp Logistics</div>
            <Form.Item
              name="dpLogistics"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <div style={{ color: 'black', fontWeight: 'bold',marginBottom: 8 }}>NSH</div>
            <Form.Item
              name="nsh"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div style={{ color: 'black', fontWeight: 'bold', marginBottom: 8 }}>KSR</div>
            <Form.Item
              name="ksr"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div style={{ color: 'black', fontWeight: 'bold', marginBottom: 8 }}>Unit Price</div>
            <Form.Item
              name="unitPrice"
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <div style={{ color: 'black', fontWeight: 'bold', marginBottom: 8 }}>Vendor</div>
            <Form.Item
              name="vendor"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button  style={{position:"relative",left:"900px"}} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary"  style={{position:"relative",left:"910px"}} danger onClick={handleReset}>Reset</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PriceForm;

