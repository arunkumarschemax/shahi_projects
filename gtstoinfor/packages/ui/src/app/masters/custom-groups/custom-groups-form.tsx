import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CustomGroupsDto } from '@project-management-system/shared-models';
import { CustomGroupsService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';


const { TextArea } = Input;

export interface CustomGroupFormProps {
  data:CustomGroupsDto;
  updateCustomGroups:(dto:CustomGroupsDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function CustomGroupForm(props: CustomGroupFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new CustomGroupsService()

  const createCustomGroup=(dto:CustomGroupsDto)=>{
    dto.createdUser = 'admin'
    Service.createCustomGroup(dto).then(res => {
      if (res.status) {
        message.success('Custom Group Created Successfully',2);
        navigate("/masters/custom-groups/custom-groups-view");
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

  const saveData = (values: CustomGroupsDto) => {
    if(props.isUpdate){
      props.updateCustomGroups(values);
    }else{
      createCustomGroup(values);
    }
  
  };

  return (
    <Card title={props.isUpdate ? 'Custom Groups':'Custom Groups'}   extra={(props.isUpdate==false) && <span><Button onClick={()=>navigate('/masters/custom-groups/custom-groups-view')} type={'primary'}>View</Button></span>}>
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="customGroupId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >   
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="customGroup"
                  label="Custom Group"
                  rules={[
                    {
                      required: true,
                      message:"Custom Group Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Custom Group' allowClear/>
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

export default CustomGroupForm;
