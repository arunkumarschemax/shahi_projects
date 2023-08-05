import React from "react";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { UndoOutlined } from "@ant-design/icons";

export const BuyersOrderAttributeForm = () => {
  const [form] = Form.useForm();

  const column:any = [
    {
      title: "Attribute Name",
      dataIndex: "Attribute",
    },

    {
      title: "Attribute Value",
      dataIndex: "AttributeValue",
      render: (_: any, record: any) => {
        return <Input placeholder="Enter Value" />;
      },
    },
  ];

  // Hardcoded data for Attribute Names
  const data :any = [
    {
      key: "1",
      Attribute: "Attribute  Name 1",
    },
    {
      key: "2",
      Attribute: "Attribute  Name 2",
    },
    // Add more attributes here if needed
  ];

  const onSubmit = (value:any) => {
    console.log(value,"values")
  };

  const onReset = () => {};

  return (
    <Card title="Buyer Order Attributes">
      <Col span={12}>
        <Table columns={column} dataSource={data} pagination={false} />
      </Col>
      <Col>
        <Form form ={form} onFinish={onSubmit}>
          <Row>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                style={{ marginLeft: "855px", marginTop: "20px" }}
                onClick={onReset}
                icon={<UndoOutlined />}
              >
                Reset
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                style={{ marginTop: "20px" }}
                // onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </Row>
        </Form>
      </Col>
    </Card>
  );
};

export default BuyersOrderAttributeForm;
