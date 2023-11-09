import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  ItemGroupDto, ItemGroupEnum } from "@project-management-system/shared-models";
import AlertMessages from "../../common/common-functions/alert-messages";
import { DivisionService, ItemGroupService, ItemsService, SizeService } from "@project-management-system/shared-services";
import { __values } from "tslib";
import FormItem from "antd/es/form/FormItem";
import Dropdown from "antd/es/dropdown/dropdown";

export interface ItemGroupProps {
  groupData: ItemGroupDto;
  updateItem: (groupData: ItemGroupDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const ItemGroupForm = (props: ItemGroupProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false);
  const { Option } = Select;
  const services = new ItemGroupService
  const [group,setGroup] =useState<any[]>([])
  const navigate = useNavigate();


  const [division, setdivision] = useState<number>(null);
  let history = useLocation();


  useEffect(()=>{
    getAllItemGroups();
  },[])
  let createdUser = "";
  if (!props.isUpdate) {
    createdUser = "admin";
  }

  const getAllItemGroups=()=>{
services.getAllitemGroup().then(res=>{
  if(res.status){
    setGroup(res.data);

  }else{
    if (res.status) {
      AlertMessages.getErrorMessage(res.internalMessage);
    } else {
      AlertMessages.getErrorMessage(res.internalMessage);
    }
  }
}).catch(err=>{
  AlertMessages.getErrorMessage(err.message);

})
  }

  const saveItemGroup = (saveData: ItemGroupDto) => {
    // setDisable(true)
    saveData.itemGroupId = 0;
    services.createItemGroup(saveData)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage("ItemGroup Created Successfully");
          navigate("/masters/item-group/item-group-view");
          //   location.push("/Currencies-view");
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

  const saveData = (values: ItemGroupDto) => {
    
    setDisable(false);
    if (props.isUpdate) {
      props.updateItem(values);
    } else {
      setDisable(false);
      saveItemGroup(values);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const handleItemCategory = (value, item) => {
    setdivision(value);
  }
  return (
    <Card
      title={<span>ItemGroup </span>}style={{ textAlign: "left" }}headStyle={{ border: 0 }}
      extra={ props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/masters/item-group/item-group-view">
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
        initialValues={props.groupData}
        name="control-hooks"
        onFinish={saveData}
      >
        <FormItem name="itemGroupId" style={{ display: "none" }}>
          <Input hidden />
        </FormItem>
        <FormItem
          name="createdUser"
          initialValue={createdUser}
          style={{ display: "none" }}
        >
          <Input hidden />
        </FormItem>
        <Row gutter={24}>
          <Col xs={{ span: 24 }}sm={{ span: 24 }}md={{ span: 8 }}lg={{ span: 8 }}xl={{ span: 6 }}>
            {" "}
            <Form.Item name="itemGroup" label="ItemGroup "
           rules={[
            {
              required: true,
              message: 'ItemGroup is required'
            },
          ]} >
            <Input />
           
          </Form.Item>
          </Col>

          
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
            <Button
              htmlType="button"
              style={{ margin: "0 14px" }}
              onClick={onReset}
            >
              Reset
            </Button>
            {/* } */}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default ItemGroupForm;
