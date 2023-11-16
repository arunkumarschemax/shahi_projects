import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessages from '../../common/common-functions/alert-messages';
import { ComponentsDto } from '@project-management-system/shared-models';
import { ComponentService } from '@project-management-system/shared-services';


const { TextArea } = Input;

export interface ComponentsFormProps {
  componentsData:ComponentsDto;
  updateComponent:(Component:ComponentsDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function ComponentsForm(props: ComponentsFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const componentService = new ComponentService()

  const createComponent=(componentDto:ComponentsDto)=>{
    componentDto.createdUser = 'admin'
    componentService.createComponent(componentDto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Component Created Successfully');
        navigate("/masters/components/components-view");
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

  const onReset=()=>{
    form.resetFields();
  }

  const saveData = (values: ComponentsDto) => {
    console.log(values,'----------va')
    if(props.isUpdate){
      props.updateComponent(values);
    }else{
      createComponent(values);
    }
  
  };

  return (
    <Card title={<span >Components</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/components/components-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.componentsData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="componentId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="componentName"
                  label="Component"
                  rules={[
                    {
                      required: true,
                      message:"Component Is Required"
                      
                    },
                    {
                      pattern: /^[a-zA-Z ]+$/,
                      message: `Should contain only alphabets.`
                    }
                  ]}>
                  <Input placeholder='Enter Component'/>
                </Form.Item>
        </Col>
      </Row>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" >
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
}

export default ComponentsForm;
