import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { ProfitControlHeadDto } from '@project-management-system/shared-models';
import { ProfitControlHeadService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

export interface ProfitControlHeadFromProps{
    profitCenterData: ProfitControlHeadDto;
    updateItem: (profitCenterData:ProfitControlHeadDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    
}

export const ProfitControlHeadForm=(props:ProfitControlHeadFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)

    const service = new ProfitControlHeadService();
    let history =useLocation();

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    const savePayment = (profitCenterData:ProfitControlHeadDto ) => {
        // setDisable(true)
        profitCenterData.profitControlHeadId= 0;
        service.createProfitControlHead(profitCenterData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Profit Control Head Created Successfully');
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
          const saveData =(values:ProfitControlHeadDto)=>{
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
        <Card title={<span>Profit Control Head</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} 
        extra={props.isUpdate==true?"":<Link to='/masters/profit-control-head/profit-control-head-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
       >
<Form
layout={'vertical'}
form={form}
initialValues={props.profitCenterData}
name="control-hooks"
onFinish={saveData}>

<FormItem name="profitControlHeadId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row>
<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="profitControlHead"
          label="Profit Control Head"
          rules={[
            {
              required: true,
              message:' profitControlHead Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `profitControlHead Should contain only alphabets.`
            }
          ]}
        >
          <Input />
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