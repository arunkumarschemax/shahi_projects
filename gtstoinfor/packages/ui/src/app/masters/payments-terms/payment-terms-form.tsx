import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PaymentTermsDto } from '@project-management-system/shared-models';
import { PaymentTermsService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';



const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 8,
  },
};


const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 10,
  },
};
/* eslint-disable-next-line */
export interface PaymentTermsFormProps {
  paymentTermsData: PaymentTermsDto;
  updateDetails:(paymentdto:PaymentTermsDto)=>void;
 isUpdate:boolean;
closeForm: () => void;

}

export function PaymentTermsForm(props:PaymentTermsFormProps) {

  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const service = new PaymentTermsService;

  let history = useLocation();

  const save = (Data: PaymentTermsDto) => {
    setDisable(true)
       service.createPaymentTerms(Data).then(res => {
        setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate('/masters/payment-terms/payment-terms-view')
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  
  const saveData = (values: PaymentTermsDto) => {
    console.log(values,"paaaaaaaa")
    setDisable(false)
    // console.log(values);
    if(props.isUpdate){
      props.updateDetails(values);
    }else{
      setDisable(false)
      save(values);
    }
  
  };
  const onReset = () => {
    form.resetFields();
  };

 console.log(PaymentTermsDto,"999999")

  return (
    <Card title='Payment Terms' extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/payment-terms/payment-terms-view')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.paymentTermsData} >
    <Row>
    <Form.Item name="paymentTermsId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>      
      <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}>
        <Form.Item
          name="paymentTermsCategory"
          label="Category"
          rules={[
            {
              required: true,
              message: 'Payment Terms Category Is Required'
            },
          ]}
        >
         <Select placeholder="Select category" 
         //style={{ width: 200}} 
         >
          <Option value="Customer">Customer</Option>
          <Option value="Vendor">Vendor</Option>
          
        </Select>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}>
        <Form.Item
          name="paymentTermsName"
          label="Payment Term Name"
          style={{width:'120%'}}
          rules={[
            {
              required: true,
              message:"Enter valid payment term name."
            },
            {
              pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
              message: `Should contain only alphabets and numbers.`
            }
          ]}
        >
          <Input  />
        </Form.Item>
        </Col>
        </Row>
      
        
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate === false) &&
     <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>
           } 
         
          </Col>
          
    </Form>
          </Card>
  );
}

export default PaymentTermsForm;
