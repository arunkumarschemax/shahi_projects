import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { DeliveryTermsDto, DeliveryTermsStatusWiseResponseModel } from '@project-management-system/shared-models';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { DeliveryTermsService } from '@project-management-system/shared-services';

/* eslint-disable-next-line */

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



export interface DeliveryTermsFormProps {

  deliverytermsData: DeliveryTermsDto;
  updateDetails:(deliverydto:DeliveryTermsDto)=>void;
 isUpdate:boolean;
closeForm: () => void;

}

export function DeliveryTermsForm(
  props: DeliveryTermsFormProps
) {

  const [form] = Form.useForm();
  const service = new DeliveryTermsService();
  const [disable, setDisable] = useState<boolean>(false)
  let history = useLocation();
  let navigate = useNavigate()
  const save = (Data: DeliveryTermsDto) => {
    setDisable(true)
       service.create(Data).then(res => {
        setDisable(false)
      if (res.status) {

        AlertMessages.getSuccessMessage('Created Successfully');
        // history.push("/delivery-terms-view")
        onReset();
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  
  const saveData = (values: DeliveryTermsDto) => {
    setDisable(false)
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

  return (

    <Card title={props.isUpdate ? 'Update Delivery Terms' : 'Add Delivery Term'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/delivery-terms/delivery-terms-view')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.deliverytermsData} >
    <Form.Item name="deliveryTermsId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>
      <Row>
        {/* <Col span={8}>
        <Form.Item
          name="deliverytermId"
          label="Delivery Term Id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        </Col> */}
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
        <Form.Item
          name="deliveryTermsName"
          label="Delivery Term Name"
          rules={[
            {
              required: true,
              message: 'Enter the Delivery Term Name'

            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?| ]*$/,
              message: `Invalid Delivery Term Name.`
            }
          ]}
        >
          <Input/>
        </Form.Item>
        </Col>
        </Row>
      
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          
      {/* {props.isUpdate?<Link to='/Deliveryterms-view' >  <Button htmlType="button" style={{ margin: '0 8px' }}>
            Cancel
          </Button></Link>: <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>} */}

          {(props.isUpdate===false) && 
          <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>}
         
          </Col>
          </Row>
    </Form>
          </Card>

   
  );
}

export default DeliveryTermsForm;
