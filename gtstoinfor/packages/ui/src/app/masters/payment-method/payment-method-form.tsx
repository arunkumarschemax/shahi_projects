import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PaymentMethodDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { PaymentMethodService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import FormItem from 'antd/es/form/FormItem';
export interface PaymentMethodFormProps{
    paymentMethodData: PaymentMethodDto;
    updateItem:(paymentMethodData:PaymentMethodDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    }
    

    export const PaymentMethodForm =(props:PaymentMethodFormProps)=>{
        const [form] = Form.useForm();
        const [disable, setDisable] = useState<boolean>(false)
       
        const service = new PaymentMethodService();
        let history =useLocation();
        let navigate = useNavigate()

        let createdUser="";
        if(!props.isUpdate){
          createdUser= 'admin';
        }

        const savePayment = (paymentMethodData:PaymentMethodDto ) => {
            // setDisable(true)
            paymentMethodData.paymentMethodId= 0;
            service.createPaymentMethod(paymentMethodData).then((res) => {
              setDisable(false)
                if (res.status) {
                  AlertMessages.getSuccessMessage('Payment Created Successfully');
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
          };

          const saveData =(values:PaymentMethodDto)=>{
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
            <Card title={props.isUpdate ?
            'Payment Method':'Payment Method'}
            extra={(props.isUpdate === false) && <span><Button onClick={()=>navigate('/global/paymentmethod/paymentmethod-view')} type={'primary'}>View</Button></span>}>
            
    <Form 
    layout={'vertical'}
    form={form}
    initialValues={props.paymentMethodData}
    name="control-hooks"
    onFinish={saveData}>

<FormItem name="paymentMethodId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[
            {
              required: true,
              message:' PaymentMethod Is Required'
            },
            {
              // pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `PaymentMethod Should contain only alphabets.`
            }
          ]}
        >
          <Input  placeholder='enter PaymentMethod'/>
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
 export default PaymentMethodForm;