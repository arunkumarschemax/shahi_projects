import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CommissionDto } from "@project-management-system/shared-models";
import { CommissionService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

const { TextArea } = Input;

export interface CommissionFormProps {
  data: CommissionDto;
  updateCommission: (dto: CommissionDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function CommissionForm(props: CommissionFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new CommissionService();

  const createCommission = (dto: CommissionDto) => {
    dto.createdUser = "admin";
    Service.createCommission(dto)
      .then((res) => {
        if (res.status) {
          message.success("Commission Created Successfully", 2);
          navigate("/masters/commission/commission-view");
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

  const saveData = (values: CommissionDto) => {
    if (props.isUpdate) {
      props.updateCommission(values);
    } else {
      createCommission(values);
    }
  };

  return (
    <Card
      title={props.isUpdate ?
      'Buying House Commision':'Buying House Commision'}
      extra={(props.isUpdate === false) && <span><Button onClick={()=>navigate('/masters/commission/commission-view')} type={'primary'}>View</Button></span> }>
      
    
      <Form
        form={form}
        layout={"vertical"}
        initialValues={props.data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="commissionId" style={{ display: "none" }}>
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
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <Form.Item
              name="commission"
              label="Buying House Commission"
              rules={[
                {
                  required: true,
                  message: "Commission Is Required",
                },
                {
                  pattern: /^[a-zA-Z0-9%]*$/,
                  message: `Should contain only alphabets and numbers.`,
                },
              ]}
            >
              <Input placeholder="Enter Buying House Commission" />
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

export default CommissionForm;
