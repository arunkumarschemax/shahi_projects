
import React, { useState,} from "react";
import { Form, Input, Button, Card, Row, Col, Select } from "antd";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ContentDtos, ItemEnum, TypeEnum, VarietyDtos } from "@project-management-system/shared-models";
import { ContentService, VarietyService } from "@project-management-system/shared-services";
import { __values } from "tslib";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface ContentFormProps {
    Data: ContentDtos;
  updateItem: (Dto: ContentDtos) => void;
  isUpdate: boolean;
  closeForm: () => void;
}
const {Option} = Select;

export const ContentForm = (props: ContentFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false);

  const service = new ContentService();
  let history = useLocation();
  const navigate = useNavigate()

  let createdUser = "";
  if (!props.isUpdate) {
    createdUser = "admin";
  }

  const savePayment = (Data: ContentDtos) => {
    // setDisable(true)
    Data.contentId = 0;
    service
      .createContent(Data)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          navigate('/trim-master/content/content-view')
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
  const saveData = (values: ContentDtos) => {
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
      title={<span>Content</span>}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/content/content-view">
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
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
       <Form.Item name="contentId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='itemType' label='Item Type' rules={[{ required: true, message: 'Type is required' }]}>
          <Select showSearch allowClear optionFilterProp="children" placeholder='Select Type'>
          {Object.values(ItemEnum).map((val) => {
                    return (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    );
                  })}
          </Select>
        </Form.Item>
        </Col>
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
            <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message:'Content Is Required'
              },
            //   {
            //     pattern: /^[^-\s\\0-9\[\]()!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]$/,
            //     message: `Should contain only alphabets.`
            //   }
            ]}
          >
            <Input placeholder="Enter Content"/>
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
