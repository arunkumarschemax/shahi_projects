import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FabricsDto } from '@project-management-system/shared-models';
import { FabricsService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

export interface FabricsFromProps{
    fabricData: FabricsDto;
    updateItem: (fabricData:FabricsDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    
}

export const FabricsForm=(props:FabricsFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()

    const service = new FabricsService();
    let history =useLocation();

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    const savefabrics = (fabricData:FabricsDto ) => {
        // setDisable(true)
        fabricData.fabricId= 0;
        service.createFabrics(fabricData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Fabric Created Successfully');
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
          const saveData =(values:FabricsDto)=>{
            setDisable(false)
            if (props.isUpdate) {
                props.updateItem(values);
              } else {
                setDisable(false)
                savefabrics(values);
              }
          }
          const onReset = () => {
            form.resetFields();
          };

      

      return(
        <Card title={props.isUpdate ? 'Fabrics' : 'Fabrics'} 
        extra={(props.isUpdate==false ) && <span><Button onClick={()=> navigate('/masters/fabrics/fabrics-view')} type={'primary'}>View</Button></span>}>
        
      
<Form
layout={'vertical'}
form={form}
initialValues={props.fabricData}
name="control-hooks"
onFinish={saveData}>
<Row gutter={16}>


<FormItem name="fabricsId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>

<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:4}} xl={{span:4}}> <Form.Item
          name="fabricsName"
          label="Fabrics"
          rules={[
            {
              required: true,
              message:' Fabrics Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Fabrics Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder=' Enter Fabrics' />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:4}} lg={{span:4}} xl={{span:4}}> <Form.Item
          name="fabricsCode"
          label="FabricsCode"
          rules={[
            {
              required: true,
              message:' FabricsCode Is Required'
            },
            {
              pattern: /^[a-zA-Z0-9]*$/,
              message: `FabricsCode Should contain only alphabets & numbers.`
            }
          ]}
        >
          <Input  placeholder=' Enter FabricsCode'/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:4}} lg={{span:4}} xl={{span:4}}> <Form.Item
          name="description"
          label="Description"
          rules={[
            // {
            //   required: true,
            //   message:' Description Is Required'
            // },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Description Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder=' Enter Description' />
        </Form.Item>
        </Col>
        </Row>

<Row>
          <Col span={24} style={{ textAlign: 'right'}}>
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