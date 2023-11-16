import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROSLGroupsDto } from '@project-management-system/shared-models';
import { ROSLGroupsService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';


const { TextArea } = Input;

export interface ROSLGroupsFormProps {
  data:ROSLGroupsDto;
  updateROSLGroups:(dto:ROSLGroupsDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function ROSLGroupsForm(props: ROSLGroupsFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new ROSLGroupsService()

  const createROSLGroup=(dto:ROSLGroupsDto)=>{
    dto.createdUser = 'admin'
    Service.createROSLGroup(dto).then(res => {
      if (res.status) {
        message.success('ROSL Group Created Successfully',2);
        navigate("/masters/rosl-groups/rosl-groups-view");
        onReset();
      } else {
        if (res.status) {
          message.error(res.internalMessage,2);
        } else {
          message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const onReset=()=>{
    form.resetFields();
  }

  const saveData = (values: ROSLGroupsDto) => {
    if(props.isUpdate){
      props.updateROSLGroups(values);
    }else{
      createROSLGroup(values);
    }
  
  };

  return (
    <Card title={<span >ROSL Groups</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/rosl-groups/rosl-groups-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="roslGroupId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="roslGroup"
                  label="ROSL Group"
                  rules={[
                    {
                      required: true,
                      message:"ROSL Group Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter ROSL Group'/>
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

export default ROSLGroupsForm;
