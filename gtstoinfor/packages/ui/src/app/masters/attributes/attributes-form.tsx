import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import {
  AttributeAgainstEnum,
  AttributesDto,
} from "@project-management-system/shared-models";
import { AttributeService } from "@project-management-system/shared-services";

const { TextArea } = Input;
const {Option} = Select;

export interface AttributesFormProps {
  attributesData: AttributesDto;
  updateAttribute: (attribute: AttributesDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function AttributesForm(props: AttributesFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const service = new AttributeService();

  const createAttribute = (dto: AttributesDto) => {
    dto.createdUser = "admin";
    service
      .createAttribute(dto)
      .then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage("Attribute Created Successfully");
          navigate("/masters/attributes/attributes-view");
          onReset();
        } else {
          if (res.status) {
            AlertMessages.getErrorMessage(res.internalMessage);
          } else {
            AlertMessages.getErrorMessage(res.internalMessage);
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

  const saveData = (values: AttributesDto) => {
    console.log(values, "----------va");
    if (props.isUpdate) {
      props.updateAttribute(values);
    } else {
      createAttribute(values);
    }
  };

  return (
    <>
      <Card
        title={<span>Attributes</span>}
        style={{ textAlign: "center" }}
        headStyle={{ border: 0 }}
        extra={
          props.isUpdate == true ? (
            ""
          ) : (
            <Link to="/masters/attributes/attributes-view">
              <span style={{ color: "white" }}>
                <Button type={"primary"}>View </Button>{" "}
              </span>
            </Link>
          )
        }
      >
        <Form
          form={form}
          layout={"vertical"}
          initialValues={props.attributesData}
          name="control-hooks"
          onFinish={saveData}
        >
          <Form.Item name="attributeId" style={{ display: "none" }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: "none" }} name="createdUser">
            <Input hidden />
          </Form.Item>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                name="attributeName"
                label="Attribute"
                rules={[
                  {
                    required: true,
                    message: "Attribute Is Required",
                  },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Should contain only alphabets.",
                  },
                ]}
              >
                <Input placeholder="Enter Attribute" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ width: "95%", marginLeft: 5 }}
                name="attributeAgainst"
                label="Attribute Against"
                rules={[{ required: true, message: "Please select Severity" }]}
              >
                <Select
                  showSearch
                  placeholder="Select Attribute"
                  optionFilterProp="children"
                  allowClear
                >
                  {Object.values(AttributeAgainstEnum).map((val) => {
                    return (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    );
                  })}
                </Select>
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
    </>
  );
}

export default AttributesForm;
