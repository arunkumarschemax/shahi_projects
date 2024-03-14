import { Button, Card, Col, Form, Input, Row, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { LogoDto } from "../../../../../libs/shared-models/src";
import { LogoService } from "../../../../../libs/shared-services/src";

export interface LogoProps {
  data: LogoDto;
  updateData: (req: LogoDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

const LogoForm = (props: LogoProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const service = new LogoService();

  const createLogo = (dto: LogoDto) => {
    service
      .createLogo(dto)
      .then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          navigate("/trim-master/logo/logo-view");
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

  const saveData = (values: LogoDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      createLogo(values);
    }
  };

  return (
    <Card
      title={<span>Logo</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/logo/logo-view">
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
        <Form.Item name="logoId" style={{ display: "none" }}>
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
              name="logo"
              label="Logo"
              rules={[
                {
                  required: true,
                  message: "Logo is Required",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: `Should contain only alphabets.`,
                },
              ]}
            >
              <Input placeholder="Enter Logo" />
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

export default LogoForm;
