import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Row, Col, Card, Select } from 'antd';
import { AllPriceDto } from 'packages/libs/shared-models/src/price-model';
import { useNavigate } from 'react-router-dom';
import { PricesService, VendorService } from '@project-management-system/shared-services';
import { UndoOutlined } from '@ant-design/icons';

const PriceForm = () => {
  const navigate = useNavigate();
  const service = new PricesService();
  const [form] = Form.useForm();
  const [vendor, setVendor] = useState("");
  const [data1, setData1] = useState<any[]>([]);
  const servicess = new VendorService();


  const handleViewClick = () => {
    navigate('/priceview');
  }

  const handleReset = () => {
    form.resetFields(); // Reset all form fields
  }



  useEffect(() => {
    getdata1();
  }, []);



  const getdata1 = () => {
    servicess
      .getAllVendors()
      .then((res) => {
        if (res.status) {
          setData1(res.data);
        } else {
          setData1([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onFinish = (values) => {
    console.log(values, "values");
    const req = new AllPriceDto(values.headOfChargers, values.perUnit, values.dpLogistics, values.vendor, values.nsh, values.ksr, values.unitPrice);
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
          <span style={{ color: 'white' }}>Vendor Price List</span>
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
        layout="vertical"
        labelCol={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}
        wrapperCol={{ xs: 16, sm: 16, md: 16, lg: 16, xl: 16 }}
      >
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="Vendor Name"
              name="vendor"
              rules={[{ required: true, message: "Vendor Name" }]}
            >
              <Select>
                {data1.map((option) => (
                  <Select.Option key={option.id} value={option.businessName}>
                    {option.businessName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>


          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="Head Of Charges"
              name="headOfChargers"
              rules={[{ required: true, message: "Head Of Charges" }]}
            >
              <Input />
            </Form.Item>
          </Col>






          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="Per Unit"
              name="perUnit"
              rules={[{ required: true, message: "Per Unit" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="Dp Logistics"
              name="dpLogistics"
              rules={[{ required: true, message: "Dp Logistics" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="NSH"
              name="nsh"
              rules={[{ required: true, message: "NSH" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="KSR"
              name="ksr"
              rules={[{ required: true, message: "KSR" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Form.Item
              label="Unit Price"
              name="unitPrice"
              rules={[{ required: true, message: "Unit Price" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="ant-submit-btn"
            style={{ position: "relative", float: "left", marginLeft: 10 }}
          >
            Submit
          </Button>
          <Button
            type="default"
            danger
            icon={<UndoOutlined />}
            onClick={handleReset}
            style={{ position: "relative", float: "left", marginLeft: 10 }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PriceForm;
