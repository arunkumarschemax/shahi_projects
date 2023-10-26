import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CompositionDto, DeliveryMethodDto} from '@project-management-system/shared-models';
import { CompositionService, DeliveryMethodService, LiscenceTypeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';

export interface FormProps {
  compositionData:CompositionDto;
  updateData:(composition:CompositionDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}
export function  CompositionForm (props: FormProps) {

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const service = new CompositionService()

  const createComposition=(compositionDto:CompositionDto)=>{
    service.createComposition(compositionDto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Composition Created Successfully');
        navigate("/masters/composition/composition-grid");
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

  const saveData = (values: CompositionDto) => {
    if(props.isUpdate){
      props.updateData(values);
    }else{
      createComposition(values);
    }
  
  };

  return (
    <Card title={<span >Composition Master</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/composition/composition-grid' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.compositionData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="id" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row gutter={12}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="compositionCode"
                  label="Composition Code"
                  rules={[
                    {
                      required: true,
                      message:"Composition Code Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Composition Code'/>
                </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="compositionDescription"
                  label="Composition Description"
                  rules={[
                    {
                      required: true,
                      message:"Composition Description Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Composition Description'/>
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

export default CompositionForm;
