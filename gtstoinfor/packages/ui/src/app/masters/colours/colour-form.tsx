import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { ColourDto } from '@project-management-system/shared-models';
import { ColourService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

export interface ColourFromProps{
    colourData: ColourDto;
    updateItem: (colourData:ColourDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    
}

export const ColourForm=(props:ColourFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)

    const service = new ColourService();
    let history =useLocation();

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    const savePayment = (colourData:ColourDto ) => {
        // setDisable(true)
        colourData.colourId= 0;
        service.createColour(colourData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Color Created Successfully');
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
          const saveData =(values:ColourDto)=>{
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
        <Card title={<span>Color</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
        extra={props.isUpdate==true?"":<Link to='/masters/colour/colour-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
       >
<Form
layout={'vertical'}
form={form}
initialValues={props.colourData}
name="control-hooks"
onFinish={saveData}>

<FormItem name="colourId" style={{display:'none'}} wrapperCol={{
          offset: 8,
          span: 16,
        }}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row>
<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="colour"
          label="Color"
          rules={[
            {
              required: true,
              message:' Color Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Color Should contain only alphabets.`
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