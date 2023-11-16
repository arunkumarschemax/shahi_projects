import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { SizeDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { SizeService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import FormItem from 'antd/es/form/FormItem';

export interface SizeFormProps{
    sizeData: SizeDto;
    updateItem:(sizeData:SizeDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    }
    

    export const SizeForm =(props:SizeFormProps)=>{
        const [form] = Form.useForm();
        const [disable, setDisable] = useState<boolean>(false)
       
        const service = new SizeService();
        let history =useLocation();

        let createdUser="";
        if(!props.isUpdate){
          createdUser= 'admin';
        }

        const savePayment = (sizeData:SizeDto ) => {
            // setDisable(true)
            sizeData.sizeId= 0;
            service.createsize(sizeData).then((res) => {
              setDisable(false)
                if (res.status) {
                  AlertMessages.getSuccessMessage('Size Created Successfully');
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

          const saveData =(values:SizeDto)=>{
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
            <Card title={<span >Size </span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
            extra={props.isUpdate==true?"":<Link to='/masters/size/size-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
>
    <Form 
    layout={'vertical'}
    form={form}
    initialValues={props.sizeData}
    name="control-hooks"
    onFinish={saveData}>

<FormItem name="sizeId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
              message:' Size Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Size Should contain only alphabets.`
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
 export default SizeForm;