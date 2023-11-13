import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DivisionDto, SizeDto } from "@project-management-system/shared-models";
import AlertMessages from "../../common/common-functions/alert-messages";
import { DivisionService, SizeService } from "@project-management-system/shared-services";
import { __values } from "tslib";
import FormItem from "antd/es/form/FormItem";
import Dropdown from "antd/es/dropdown/dropdown";

export interface SizeFormProps {
  sizeData: SizeDto;
  updateItem: (sizeData: SizeDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const SizeForm = (props: SizeFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false);
  const { Option } = Select;
  const service = new SizeService();
  const [DivsionData, setDivsionData] = useState<DivisionDto[]>([]);

  const [division, setdivision] = useState<number>(null);
 const services= new DivisionService
  let history = useLocation();
  let navigate = useNavigate()


  useEffect(()=>{
    getAllDivison();
  },[])
  let createdUser = "";
  if (!props.isUpdate) {
    createdUser = "admin";
  }

  const getAllDivison=()=>{
services.getAllActiveDivision().then(res=>{
  if(res.status){
    setDivsionData(res.data);

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

  const savePayment = (sizeData: SizeDto) => {
    // setDisable(true)
    sizeData.sizeId == 0;
    service
      .createsize(sizeData)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage("Size Created Successfully");
          navigate('/masters/size/size-view')
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

  const saveData = (values: SizeDto) => {
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

  const handleItemCategory = (value, item) => {
    setdivision(value);
  }
  return (
    <Card
      title={props.isUpdate?
      'Size':'Size'}
      extra={( props.isUpdate == false) && <span> <Button onClick={()=>navigate('/masters/size/size-view')} type={'primary'}>View</Button></span>}>
        
       
      <Form
        layout={"vertical"}
        form={form}
        initialValues={props.sizeData}
        name="control-hooks"
        onFinish={saveData}
      >
        <FormItem name="sizeId" style={{ display: "none" }}>
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item name="divisionId" label="Division Name"
           rules={[
            {
              required: true,
              message: 'Division Name is required'
            },
          ]} >

            <Select placeholder="select Divison Name"
            onSelect={handleItemCategory}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
               {DivsionData?.map(Drop=>{
            return<Option key={Drop.divisionId} value={Drop.divisionId}>{Drop.divisionName}</Option>
           })

           }
            </Select>
          </Form.Item>
          </Col>
          
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="optionGroup"
              label="Option Group"
              rules={[
                {
                  required: true,
                  message: " Option Group Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Option Group Should contain only alphabets.`,
                },
              ]}
            >
                <Input placeholder='Enter Option Group'/>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="sizeCode"
              label="Size Code"
              rules={[
                {
                  required: true,
                  message: " Size Code Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Size Code Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Size Code'/>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="size"
              label="Size"
              rules={[
                {
                  required: true,
                  message: " Size Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Size Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Size'/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: " Description Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Description Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Description'/>
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
export default SizeForm;
