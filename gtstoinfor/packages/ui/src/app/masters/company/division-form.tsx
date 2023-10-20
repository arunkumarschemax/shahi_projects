import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import {  DivisionDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { DivisionService } from '@project-management-system/shared-services';

export interface DivisionFormProps {
  Data: DivisionDto;
  updateItem: (Data: DivisionDto) => void;
  isUpdate: boolean;
  // saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const DivisionForm = (props:DivisionFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new DivisionService();
  let history = useLocation();

  let createdUser="";
  if(!props.isUpdate){
    createdUser= 'admin';
  }
  
  const saveDivision = (Data: DivisionDto) => {
    // setDisable(true)
    Data.divisionId = 0;
    service.createDivision(Data).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Division Created Successfully');
        //   location.push("/Currencies-view");
          onReset();
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      });
  };
  
  const saveData = (values: DivisionDto) => {
    setDisable(false)
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        saveDivision(values);
      }
    

    
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
<Card title={<span style={{color:'white'}}>Division</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }}
    extra={props.isUpdate==true? (
      ""):(
    <Link to='/masters/division/division-view' ><span ><Button className='panel_button' type={'primary'} >View {""}</Button> {""}</span></Link>)}
 
      >
      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
       <Row gutter={24}>
        <Col >
              <Form.Item style={{display:'none'}} label="Company Id" name="companyId">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col >
              <Form.Item style={{display:'none'}} label="Company Id" name="divisionId">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Division Name" name="divisionName"  rules={[
                {
                  required: true,
                  message: " Division Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Division Should contain only alphabets.`,
                },
              ]}>
                <Input placeholder='Enter Division Name'/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Division Code" name="divisionCode"  rules={[ {
                  required: true,
                  message: " Division Code Is Required",
                },]}>
                <Input placeholder='Enter Division Code'/>
              </Form.Item>
            </Col>
          </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
         {/* }  */}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DivisionForm;
