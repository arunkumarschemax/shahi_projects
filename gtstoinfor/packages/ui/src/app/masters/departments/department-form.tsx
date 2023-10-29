import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { DepartmentsDtos } from '@project-management-system/shared-models';
import { DepartmentService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

export interface DepartmentFromProps{
    DepartmentData: DepartmentsDtos;
    updateItem: (DepartmentData:DepartmentsDtos)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    
}

export const DepartmentForm=(props:DepartmentFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)

    const service = new DepartmentService();
    let history =useLocation();

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    const savePayment = (depart:DepartmentsDtos ) => {
        // setDisable(true)
        depart.deptId== 0;
        service.createDepartment(depart).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Department Created Successfully');
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
        }
          const saveData =(values:DepartmentsDtos)=>{
            setDisable(false)
            if (props.isUpdate) {
                props.updateItem(values);
              } else {
                setDisable(false)
                savePayment(values);
              }
          }
          const onReset = () => {
            form.resetFields();
          };

      

      return(
        <Card title={<span>Departments</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} 
        extra={props.isUpdate==true?"":<Link to='/masters/department/department-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
       >
<Form
layout={'vertical'}
form={form}
initialValues={props.DepartmentData}
name="control-hooks"
onFinish={saveData}>

<FormItem name="deptId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row gutter={8}>
<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
     <Form.Item
          name="deptName"
          label="Department"
          rules={[
            {
              required: true,
              message:' Department Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Department Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Department' />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
     <Form.Item
          name="deptHead"
          label="Department Head"
          rules={[
            {
              required: true,
              message:' Department Head Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Department Head Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Department Head' />
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
      )
}
export default DepartmentForm;