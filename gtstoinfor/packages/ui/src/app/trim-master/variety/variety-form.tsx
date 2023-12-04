
import React, { useState,} from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { VarietyDtos } from "@project-management-system/shared-models";
import { VarietyService } from "@project-management-system/shared-services";
import { __values } from "tslib";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface VarietyFormProps {
    varietyData: VarietyDtos;
  updateItem: (VarietyDto: VarietyDtos) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const VarietyForm = (props: VarietyFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false);

  const service = new VarietyService();
  let history = useLocation();
  const navigate = useNavigate()

  let createdUser = "";
  if (!props.isUpdate) {
    createdUser = "admin";
  }

  const savePayment = (Data: VarietyDtos) => {
    // setDisable(true)
    Data.varietyId = 0;
    service
      .createVariety(Data)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          navigate('/trim-master/variety/variety-view')
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
  const saveData = (values: VarietyDtos) => {
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
      title={<span>Variety</span>}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/variety/variety-view">
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
        initialValues={props.varietyData}
        name="control-hooks"
        onFinish={saveData}
      >
       <Form.Item name="varietyId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
            <Form.Item
            name="variety"
            label="Variety"
            rules={[
              {
                required: true,
                message:'Variety Is Required'
              },
            //   {
            //     pattern: /^[^-\s\\0-9\[\]()!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]$/,
            //     message: `Should contain only alphabets.`
            //   }
            ]}
          >
            <Input placeholder="Enter Variety"/>
          </Form.Item>
          </Col>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
            <Form.Item
            name="varietyCode"
            label="Variety Code"
            rules={[
              {
                required: true,
                message:'VarietyCode Is Required'
              },

            ]}
          >
            <Input placeholder="Enter Variety Code"/>
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
