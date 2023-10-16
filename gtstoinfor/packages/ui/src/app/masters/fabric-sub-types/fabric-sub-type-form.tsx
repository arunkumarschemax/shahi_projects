import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Select } from 'antd';
import { FabricSubTypeDto,FabricTypesDto } from '@project-management-system/shared-models';
import { FabricTypeService } from '@project-management-system/shared-services';
import { FabricSubtypeservice } from '@project-management-system/shared-services';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
 

const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable-next-line */
export interface FabricSubTypeFormProps {
  fabricsubtypeData: FabricSubTypeDto;
  updateData: (subType: FabricSubTypeDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function FabricSubTypeForm(
  props: FabricSubTypeFormProps
) {
  const [form] = Form.useForm();
  const service = new FabricSubtypeservice;
  const services = new FabricTypeService;
  let navigate = useNavigate();

  const [fabricSubtype, setFabricSubtypeData] = useState<FabricTypesDto[]>([]);
  // const FabricSubtypeService = new FabricTypeService();
  const [selectedFabricSubtype, setSelectedFabricSubtype] = useState<number>(null);

  useEffect(() => {
    getAllFabrictype();
  }, []);

  const getAllFabrictype = () => {
    services.getAllActiveFabricType().then(res => {
      if (res.status) {
        setFabricSubtypeData(res.data);
        console.log(res.data,'kkkkkkkkkkkkkkkkkkkkkkkk')
      } 
    })
  }

  const save = (Data: FabricSubTypeDto) => {
    service.createFabricSubType(Data).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate("/masters/fabric-sub-type-view/fabric-sub-type-view")
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const saveData = (values: FabricSubTypeDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      save(values);
    }
  }

  const handleFabricSubType = (value, item) => {
    // setFabricSubtypeData(value);
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={<span >Fabric Sub-Type</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }} extra={props.isUpdate == true ? "" : <Link to='/masters/fabricSubType/fabric-sub-type-view' ><Button type={'primary'} >View </Button></Link>}
    >
      <Form layout="vertical" form={form} initialValues={props.fabricsubtypeData} name="control-hooks" onFinish={saveData}>
        <Form.Item name="fabricSubTypeId" style={{ display: "none" }} >
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser" initialValue={props.fabricsubtypeData}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="fabricTypeId"
              label="Fabric Type"
              rules={[
                {
                  required: true,
                  message: 'Fabric Type is required'
                },
              ]}>
              <Select
                placeholder="Select Fabric Type"
                onSelect={handleFabricSubType}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {fabricSubtype?.map(dropData => {
                  return <Option key={dropData.fabricTypeId} value={dropData.fabricTypeId}>{dropData.fabricTypeName}</Option>
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="fabricSubTypeName"
              label=" Fabric Sub Type"
              rules={[
                {
                  required: true, message: 'Fabric Sub Type is required'

                },
                {
                  pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Fabric Sub Type'/>
            </Form.Item>
          </Col>
          
        </Row>

        <Col span={24} style={{ textAlign: 'right' }}>

          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate === false) &&
            <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
              Reset
            </Button>
          }


        </Col>
      </Form>
    </Card>

  );
}

export default FabricSubTypeForm;
