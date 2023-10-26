import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DeliveryMethodDto, LiscenceTypesdDto } from '@project-management-system/shared-models';
import { DeliveryMethodService, LiscenceTypeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';


const { TextArea } = Input;




export interface LiscenceTypesFormProps {
  liscenceData:LiscenceTypesdDto;
  updateData:(liscenceType:LiscenceTypesdDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function LiscenceTypesForm(props: LiscenceTypesFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const service = new LiscenceTypeService()

  const createLiscenceType=(liscenceTypeDto:LiscenceTypesdDto)=>{
    service.createLiscenceType(liscenceTypeDto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Liscence Type Created Successfully');
        navigate("/masters/liscence-type/liscence-type-grid");
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

  const saveData = (values: LiscenceTypesdDto) => {
    if(props.isUpdate){
      props.updateData(values);
    }else{
      createLiscenceType(values);
    }
  
  };

  return (
    <Card title={<span >Liscence Type</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/liscence-type/liscence-type-grid' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.liscenceData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="liscenceTypeId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="liscenceType"
                  label="Liscence Type"
                  rules={[
                    {
                      required: true,
                      message:"Liscence Type Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Liscence Type'/>
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

export default LiscenceTypesForm