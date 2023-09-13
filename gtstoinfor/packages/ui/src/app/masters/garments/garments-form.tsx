import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Select } from 'antd';
import { GarmentsDto } from '@project-management-system/shared-models';
import { GarmentService } from '@project-management-system/shared-services';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
 

const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable-next-line */
export interface GarmentsFormProps {
  garmentData: GarmentsDto;
  updateData: (garment: GarmentsDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function GarmentsForm(
  props: GarmentsFormProps
) {
  const [form] = Form.useForm();
  const service = new GarmentService;
  let navigate = useNavigate();
  const { state } = useLocation();

  // const [garmentCategoryData, setGarmentCategoryData] = useState<GarmentCategoriesDto[]>([]);
  // const garmentCategoryService = new GarmentCategoryService();
  const [selectedGarmentCategory, setSelectedGarmentCategory] = useState<number>(null);

  

  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({garmentCategoryId:state?.id})
    }
  },[state])
  // const getAllGarmentCategories = () => {
  //   garmentCategoryService.getActiveItemCategories().then(res => {
  //     if (res.status) {
  //       setGarmentCategoryData(res.data);
  //     } else {
  //       if (res.status) {
  //         AlertMessages.getErrorMessage(res.internalMessage);
  //       } else {
  //         AlertMessages.getErrorMessage(res.internalMessage);
  //       }
  //     }
  //   }).catch(err => {
  //     AlertMessages.getErrorMessage(err.message);
  //   })
  // }

  const save = (Data: GarmentsDto) => {
    service.createGarment(Data).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate("/masters/garments/garments-view")
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

  const saveData = (values: GarmentsDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      save(values);
    }
  }

  const handleGarmentCategory = (value, item) => {
    setSelectedGarmentCategory(value);
  }

  const onReset = () => {
    form.resetFields();
  };

  const garmentCategoryDropdown = props.isUpdate ? (
    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
      <Form.Item
        name="garmentCategoryId"
        label="Garment Category"
        rules={[
          {
            required: true,
            message: 'Garment Category is required'
          }
        ]}
      >
        <Select placeholder="Select Garment Category">
          {/* Render your options here */}
        </Select>
      </Form.Item>
    </Col>
  ) : null;

  return (
    <Card title={<span >Garments</span>} extra={props.isUpdate == true ? "" : <Link to='/masters/garments/garments-view' ><Button type={'primary'} >View </Button></Link>}
    >
      <Form layout="vertical" form={form} initialValues={props.garmentData} name="control-hooks" onFinish={saveData}>
      <Form.Item name="garmentId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
        <Form.Item name="garmentCategoryId" style={{ display: "none" }} >
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser" initialValue={props.garmentData}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="garmentName"
              label="Garment Name"
              rules={[
                {
                  required: true, message: 'Garment Name is required'

                },
                {
                  pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Garment'/>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="remarks"
              label="Remarks"
              rules={[
                {
                  pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/`~{}:";'<>,.?|\s-]*$/,
                  message: `Invalid Remarks`
                }
              ]}>
              <TextArea rows={1} placeholder='Enter Remarks'/>
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

export default GarmentsForm;
