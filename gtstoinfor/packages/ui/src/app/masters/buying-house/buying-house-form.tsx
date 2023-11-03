import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BuyingHouseDto } from "@project-management-system/shared-models";
import { BuyingHouseService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

const { TextArea } = Input;

export interface BuyingHouseFormProps {
  data: BuyingHouseDto;
  updateBuyingHouse: (dto: BuyingHouseDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function BuyingHouseForm(props: BuyingHouseFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new BuyingHouseService();

  const createBuyingHouse = (dto: BuyingHouseDto) => {
    dto.createdUser = "admin";
    Service.createBuyingHouse(dto)
      .then((res) => {
        if (res.status) {
          message.success("Buying House Created Successfully", 2);
          navigate("/masters/buying-house/buying-house-view");
          onReset();
        } else {
          if (res.status) {
            message.error(res.internalMessage, 2);
          } else {
            message.error(res.internalMessage, 2);
          }
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const saveData = (values: BuyingHouseDto) => {
    if (props.isUpdate) {
      props.updateBuyingHouse(values);
    } else {
      createBuyingHouse(values);
    }
  };

  return (
    <Card
      title={props.isUpdate ?
      'Buying House':'Buying House'}
      extra={(props.isUpdate === false) && <span><Button onClick={()=> navigate('//masters/buying-house/buying-house-view')} type={"primary"}>View</Button></span>}
      
    >
      <Form
        form={form}
        layout={"vertical"}
        initialValues={props.data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="buyingHouseId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser">
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="buyingHouse"
              label="Buying House"
              rules={[
                {
                  required: true,
                  message: "Buying House Is Required",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Should contain only alphabets",
                },
              ]}
            >
              <Input placeholder="Enter Buying House" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="contactPerson"
              label="Contact Person"
              rules={[
                {
                  required: true,
                  message: "Contact Person Is Required",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Should contain only alphabets.",
                },
              ]}
            >
              <Input placeholder="Enter Contact Person" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email Is Required",
                },
                {
                  type: "email",
                  message: "Invalid email address",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="contact"
              label="Contact"
              rules={[
                {
                  required: true,
                  message: "Contact Is Required",
                },
                {
                  pattern: /^[0-9\s-]*$/,
                  message: "Should contain only numbers",
                  validator: (rule, value) => {
                    const strippedValue = value.replace(/\s/g, ""); // Remove spaces
                    if (
                      strippedValue.length < 10 ||
                      strippedValue.length > 12
                    ) {
                      return Promise.reject(
                        "Contact should have 10 to 12 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Enter Contact" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Address Is Required",
                },
                {
                  pattern: /^[a-zA-Z0-9\s.,-:]*$/,
                  message:
                    "Should contain only alphabets, numbers, spaces, and hyphens.",
                },
              ]}
            >
              <TextArea rows={1} placeholder="Enter Address" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "City Is Required",
                },
                {
                  pattern: /^[a-zA-Z\s-]*$/,
                  message:
                    "Should contain only alphabets, spaces, and hyphens.",
                },
              ]}
            >
              <Input placeholder="Enter City" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Country Is Required",
                },
                {
                  pattern: /^[a-zA-Z\s-]*$/,
                  message:
                    "Should contain only alphabets, spaces, and hyphens.",
                },
              ]}
            >
              <Input placeholder="Enter Country" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {props.isUpdate === false && (
              <Button
                htmlType="button"
                style={{ margin: "0 14px" }}
                onClick={onReset}
              >
                Reset
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default BuyingHouseForm;
