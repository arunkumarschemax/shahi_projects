import { TrimSizeDto, TrimSizeTypeEnum } from "@project-management-system/shared-models";
import { TrimSizeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface TrimSizeProps {
  data: TrimSizeDto;
  updateData: (req: TrimSizeDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

const TrimSizeForm = (props: TrimSizeProps) => {
  const [form] = Form.useForm();
  const {Option}= Select
  const navigate = useNavigate();
  const service = new TrimSizeService();

  const createSize = (dto: TrimSizeDto) => {
    service.createTrimSize(dto).then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          navigate("/trim-master/size/size-view");
        } else {
          message.error(res.internalMessage, 2);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const saveData = (values: TrimSizeDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      createSize(values);
    }
  };

  return (
    <Card
      title={<span>Size</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/size/size-view">
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
        <Form.Item name="trimSizeId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser">
          <Input hidden />
        </Form.Item>
        <Row gutter={12}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <Form.Item
              name="trimSize"
              label="Size"
              rules={[
                {
                  required: true,
                  message: "Size is Required",
                },
                {
                  pattern: /^[A-Za-z0-9\s/]+$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Size" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <Form.Item
              name="type"
              label="Type"
              rules={[{required: true,message: "Type is Required"}]}
            >
              <Select
               showSearch
               placeholder='Select Type'
               optionFilterProp="children"
               allowClear>
                {Object.values(TrimSizeTypeEnum).map((val)=>{
                  return <Option key={val} value={val}>{val}</Option>
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
  );
};

export default TrimSizeForm;
