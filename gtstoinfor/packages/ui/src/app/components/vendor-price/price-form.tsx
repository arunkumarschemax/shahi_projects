import { UndoOutlined } from '@ant-design/icons';
import { AllPriceDto } from '@xpparel/shared-models';
import { BuyersService, PricesService, VendorService } from '@xpparel/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PriceForm = () => {
  const navigate = useNavigate();
  const service = new PricesService();
  const [form] = Form.useForm();
  const [vendor, setVendor] = useState("");
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const servicess = new VendorService();
  const buyerss = new BuyersService();


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

  useEffect(() => {
    getdata2();
  }, []);



  const getdata2 = () => {
    buyerss
      .getAllBuyersInfo()
      .then((res) => {
        if (res.status) {
          setData2(res.data);
        } else {
          setData2([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onFinish = (values) => {
    console.log(values, "values");
    const req = new AllPriceDto(values.headOfChargers, values.perUnit, values.dpLogistics, values.vendor, values.buyersName, values.hsnCode, values.serviceDescription, values.nsh, values.ksr, values.unitPrice);
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
    <div>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'black' }}>Vendor Price List</span>
            <Button type="primary" onClick={handleViewClick}>View</Button>
          </div>
        }
        bordered={true}
        style={{ flex: 1 }}
        headStyle={{ backgroundColor: "#00FFFF", color: 'white', border: 0 }}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        // labelCol={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}
        // wrapperCol={{ xs: 16, sm: 16, md: 16, lg: 16, xl: 16 }}
        >
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Vendor Name"
                name="vendor"

                rules={[{ required: true, message: "Enter Vendor Name" }]}
              >
                <Select placeholder="Select Vendor Name">
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
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Buyers Name"
                name="buyersName"

                rules={[{ required: true, message: "Enter Buyers Name" }]}
              >
                <Select placeholder="Select Buyers Name">
                  {data2.map((option) => (
                    <Select.Option key={option.id} value={option.buyerName}>
                      {option.buyerName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="HSN Code"
                name="hsnCode"
                rules={[{ required: true, message: "Please Enter HSN Code" }]}
              >
                <Input placeholder='Enter HSN Code' />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Service Description"
                name="serviceDescription"
                rules={[{ required: true, message: "Please Enter Service Description" }]}
              >
                <Input placeholder='Enter Service Description' />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Head Of Charges"
                name="headOfChargers"
                rules={[{ required: true, message: "Please Enter Head Of Charges" }]}
              >
                <Input placeholder='Enter Head Of Charges' />
              </Form.Item>
            </Col>






            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Per Unit"
                name="perUnit"
                rules={[{ required: true, message: "Please Enter Per Unit" }]}
              >
                <Input placeholder='Enter Per Unit' />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Dp Logistics"
                name="dpLogistics"
                rules={[{ required: true, message: "Please Enter Dp Logistics" }]}
              >
                <Input placeholder='Enter Per Dp Logistics' />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="NSH"
                name="nsh"
                rules={[{ required: true, message: "Please Enter NSH" }]}
              >
                <Input placeholder='Enter NSH' />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="KSR"
                name="ksr"
                rules={[{ required: true, message: "Please Enter KSR" }]}
              >
                <Input placeholder='Enter KSR' />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[{ required: true, message: "Please Enter Unit Price" }]}
              >
                <Input type="number" placeholder='Enter Unit Price' />
              </Form.Item>
            </Col>

          </Row>

          <Row justify="end">
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
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default PriceForm;


