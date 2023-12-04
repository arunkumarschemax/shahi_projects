
import React, { useState} from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { TrimDtos, } from "@project-management-system/shared-models";
import {  TrimService } from "@project-management-system/shared-services";
import { __values } from "tslib";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface TrimFormProps {
    TrimData: TrimDtos;
  updateItem: (Dto: TrimDtos) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const TrimForm = (props: TrimFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false);

  const service = new TrimService();
  let history = useLocation();
  const navigate = useNavigate()

  let createdUser = "";
  if (!props.isUpdate) {
    createdUser = "admin";
  }

  const savePayment = (Data: TrimDtos) => {
    Data.trimId = 0;
    service
      .createTrim(Data)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          navigate('/trim-master/trim/trim-view')
          onReset();
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDisable(false);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const saveData = (values: TrimDtos) => {
    setDisable(false);
    if (props.isUpdate) {
      props.updateItem(values);
    } else {
      setDisable(false);
      savePayment(values);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card
      title={<span>Trim</span>}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/trim/trim-view">
            <span style={{ color: "white" }}>
              <Button className="panel_button" type={"primary"}>
                View{" "}
              </Button>{" "}
            </span>
          </Link>
        )
      }
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={props.TrimData}
        name="control-hooks"
        onFinish={saveData}
      >
       <Form.Item name="trimId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
            <Form.Item
            name="trimCategory"
            label="Trim Category"
            rules={[
              {
                required: true,
                message:'Trim Category Is Required'
              },
            //   {
            //     pattern: /^[^-\s\\0-9\[\]()!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]$/,
            //     message: `Should contain only alphabets.`
            //   }
            ]}
          >
            <Input placeholder="Enter Trim Category"/>
          </Form.Item>
          </Col>
        
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" disabled={disable} htmlType="submit">
                Submit
              </Button>
              {(props.isUpdate===false) &&
           <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
              Reset
            </Button>
             }
            </Col>
          </Row>
      </Form>
    </Card>
  );
};
