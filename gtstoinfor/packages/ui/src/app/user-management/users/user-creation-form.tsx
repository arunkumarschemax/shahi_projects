import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col, theme } from "antd";
import { UserManagementServices } from "@project-management-system/shared-services";
const { useToken } = theme

const { Option } = Select;

export function UserCreationForm() {
  const service = new UserManagementServices();
  const [form] = Form.useForm();
  const {token : {colorPrimary}} = useToken()

  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinish = (values: any) => {
    console.log(values, "aaaaaaaaaaa");
    // service.createUser(values)
    //     .then((res) => {
    //         // Handle success
    //     })
    //     .catch((error) => {
    //         // Handle error
    //     });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card
      title={"User Creation"}
      headStyle={{ backgroundColor: colorPrimary, color: "white" }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* <Row>
                    <Col> */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password />
        </Form.Item>
        {/* </Col>
                    <Col> */}
        <Form.Item
          label="Contact"
          name="contact"
          rules={[{ required: true, message: "Please enter a contact" }]}
        >
          <Input />
        </Form.Item>
        {/* </Col>
                </Row>
                <Row>
                    <Col> */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input />
        </Form.Item>
        {/* </Col>
                    <Col> */}

        {/* </Col>
                </Row>
                <Row>
                    <Col> */}

        {/* </Col>
                    <Col> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="button"
            style={{ margin: "0 14px" }}
            onClick={onReset}
          >
            Reset
          </Button>
        </Form.Item>
        {/* </Col>
                </Row> */}
      </Form>
    </Card>
  );
}

export default UserCreationForm;
