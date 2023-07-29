import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, DatePicker, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmployeeDetailsResponse, EmployeeMarritalStatusEnum } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CurrencyService, EmployeeDetailsService } from '@project-management-system/shared-services';
import dayjs from 'dayjs';


export interface EmployeeDetailsFormProps {
  employeeData: EmployeeDetailsResponse;
  updateItem: (employeeData: EmployeeDetailsResponse) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const EmployeeDetsilsForm = (props:EmployeeDetailsFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const {Option} =Select
  const service = new EmployeeDetailsService();
  let history = useLocation();
  let navigate = useNavigate();

  let createdUser="";
  if(!props.isUpdate){
    createdUser= 'admin';
  }
  
  const saveEmployee = (data: EmployeeDetailsResponse) => {
    data.employeeId = 0;
   if( data.mobileNumber == data.alterNativeMobileNumber){
    message.info('Please Add alternative mobile number')
    form.resetFields(['alterNativeMobileNumber'])
   }else{
    service.createEmployee(data).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('employee Created Successfully');
          navigate("/masters/employee-details/employee-details-grid")
          onReset();
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      });
   }
   
  };

  const saveData = (values: EmployeeDetailsResponse) => {
    setDisable(false)
      if (props.isUpdate) {
        console.log(props.isUpdate)
        props.updateItem(values);
      } else {
        setDisable(false)
        saveEmployee(values);
      }
    
  };
const alertNativeOnchange = (value) =>{
  console.log('hiiii')
  const number1= form.getFieldValue('mobileNumber')
  if(number1 == value){
  console.log('hiiii')
    message.info('Enter alternative mobile number')
  }
  
}

  const onReset = () => {
    form.resetFields();
  };
  return (
 <Card title={<span style={{color:'black'}}>Add Employee</span>}
    style={{textAlign:'left'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/employee-details/employee-details-grid' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >

      <Form layout={'vertical'} form={form} initialValues={props.employeeData} name="control-hooks"   onFinish={saveData}
      >
        <Form.Item name="employeeId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row>
         <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message:'First Name Is Required'
              }
            ]}>
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message:'Last Name Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Should contain only alphabets.`
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}>
           <Form.Item  name="dateOfBirth" label="Date of Birth"
            rules={[ { required: true, message: 'Please select from date' }]}
               >
                <DatePicker style={{ width: '95%', }} showToday/>
               </Form.Item>
           </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
          name="mobileNumber"
          label="Contact Number"
          rules={[
            {
              required: true,
              message:'Last Name Is Required'
            },
            {
              pattern: /^[0-9]{10}$/, 
              message:'Invalid phone number'
            }
          ]}
        >
          <Input />
          </Form.Item>
          </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> 
          <Form.Item
          name="alterNativeMobileNumber"
          label="Alter Native Number"
          rules={[
            {
              required: true,
              message:'AlterNative number s Is Required'
            },
            {
              pattern: /^[0-9]{10}$/, 
              message:'Invalid phone number'
            }
          ]}
        >
          <Input onChange={alertNativeOnchange}/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:5}} style={{margin:'1%'}}> <Form.Item
          name="emial"
          label="Email"
          rules={[
            {
              required: true,
              message:'Email Is Required'
            },{
              pattern :/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:'Please enter a valid Email'
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
       
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}>
           <Form.Item
          name="pinCode"
          label="Postal Code"
          rules={[
            {
              required: true,
              message:'PinCode Is Required'
            },{
              pattern: /^[0-9]{6}$/,
              message:'please enter a valid pin number'
            }
          ]}
        >
          <Input type='Number'/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}} style={{margin:'1%'}}> <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message:'Address Is Required'
            }
          ]}
        >
          <Input.TextArea rows={2}/>
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
          {/* } */}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EmployeeDetsilsForm;
