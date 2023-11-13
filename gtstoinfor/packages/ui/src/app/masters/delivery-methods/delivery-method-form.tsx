import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Select,Card, Row, Col, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DeliveryMethodDto } from '@project-management-system/shared-models';
import { DeliveryMethodService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';


const { TextArea } = Input;

export interface DeliveryMethodFormProps {
  deliveryMethodData:DeliveryMethodDto;
  updateDeliveryMethod:(deliveryMethod:DeliveryMethodDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function DeliveryMethodForm(props: DeliveryMethodFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const deliveryMethodService = new DeliveryMethodService()

  const createDeliveryMethod=(deliveryMethodDto:DeliveryMethodDto)=>{
    console.log(deliveryMethodDto,'--------deliveryMethodDto')
    deliveryMethodDto.createdUser = 'admin'
    deliveryMethodService.createDeliveryMethod(deliveryMethodDto).then(res => {
      if (res.status) {
        message.success('Delivery Method Created Successfully',2);
        navigate("/global/delivery-methods/delivery-method-view");
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

  const saveData = (values: DeliveryMethodDto) => {
    if(props.isUpdate){
      props.updateDeliveryMethod(values);
    }else{
      createDeliveryMethod(values);
    }
  
  };

  return (
    <Card title={<span >Delivery Method</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={props.isUpdate==true?"":<Link to='/global/delivery-methods/delivery-method-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.deliveryMethodData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="deliveryMethodId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="deliveryMethod"
                  label="Delivery Method"
                  rules={[
                    {
                      required: true,
                      message:"Delivery Method Is Required"
                      
                    },
                    {
                      pattern: /^[a-zA-Z][a-zA-Z\s]*$/,
                      message: `Should contain only alphabets.`
                    }
                  ]}>
                  <Input placeholder='Enter Delivery Method'/>
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

export default DeliveryMethodForm;