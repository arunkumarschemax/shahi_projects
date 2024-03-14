import { TrimBuyerDto } from "@project-management-system/shared-models";
import { TrimBuyerService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface TrimBuyerProps {
  data: TrimBuyerDto;
  updateData: (req: TrimBuyerDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

const TrimBuyerForm = (props: TrimBuyerProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const service = new TrimBuyerService();

  const createBuyer = (dto: TrimBuyerDto) => {
    service
      .createTrimBuyer(dto)
      .then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          navigate("/trim-master/buyer/buyer-view");
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

  const saveData = (values: TrimBuyerDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      createBuyer(values);
    }
  };

  return (
    <Card
      title={<span>Buyer</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/buyer/buyer-view">
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
        <Form.Item name="trimBuyerId" style={{ display: "none" }}>
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
              name="trimBuyer"
              label="Buyer"
              rules={[
                {
                  required: true,
                  message: "Buyer is Required",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Buyer" />
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

export default TrimBuyerForm;
