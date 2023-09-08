import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MarketingRequisitionDto } from "@project-management-system/shared-models";
import { ColourService, MarketingReqService, SizeService } from "@project-management-system/shared-services";
import AlertMessages from "../common/common-functions/alert-messages";

const { TextArea } = Input;
const { Option } = Select

export interface MarketingReqFormProps {
  data: MarketingRequisitionDto;
  update: (dto: MarketingRequisitionDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function MarketingReqForm(props: MarketingReqFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [size, setSize] = useState<any[]>([])
  const [color, setColor] = useState<any[]>([])

  const Service = new MarketingReqService();
  const sizeService = new SizeService
  const colorService = new ColourService


  useEffect(()=>{
    getSize()
    getColor()
  },[])

  const create = (dto: MarketingRequisitionDto) => {
    dto.createdUser = "admin";
    Service.createMarketingReqGroup(dto)
      .then((res) => {
        if (res.status) {
          message.success("Created Successfully", 2);
          navigate("/marketing-requisition-view");
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

  const getSize = () =>{
    sizeService.getAllActiveSize().then((res)=>{
        if(res.status){
            setSize(res.data)
        }
    })
  }

  const getColor = () =>{
    colorService.getAllActiveColour().then((res)=>{
        if(res.status){
            setColor(res.data)
        }
    })
  }

  const onReset = () => {
    form.resetFields();
  };

  const saveData = (values: MarketingRequisitionDto) => {
    if (props.isUpdate) {
      props.update(values);
    } else {
      create(values);
    }
  };

  return (
    <Card
      title={<span>Marketing Requisition</span>}
      style={{ textAlign: "center" }}
      headStyle={{ border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/marketing-requisition-view">
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
        initialValues={props.data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="marketingReqId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser">
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="trimType"
              label="Trim Type"
              rules={[
                {
                  required: true,
                  message: "Trim Type Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Trim Type" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="trimCode"
              label="Trim Code"
              rules={[
                {
                  required: true,
                  message: "Trim Code Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Trim Code" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="sizeId"
              label="Size"
              rules={[{ required: true, message: "Please Select Size" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Size"
              >
                {size.map((e) => {
                  return (
                    <Option key={e.sizeId} value={e.sizeId}>
                      {e.size}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="colorId"
              label="Color"
              rules={[{ required: true, message: "Please Select Color" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Color"
              >
                {color.map((e) => {
                  return (
                    <Option key={e.colourId} value={e.colourId}>
                      {e.colour}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Quantity Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Quantity" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
            <Form.Item
              name="description"
              label="Trim Description"
              rules={[
                {
                  required: true,
                  message: "Trim Description Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <TextArea rows={1} placeholder="Enter Trim Description" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}
          >
            <Form.Item
              name="remarks"
              label="Remarks"
            >
              <TextArea rows={1} placeholder="Enter Remarks" />
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

export default MarketingReqForm;
