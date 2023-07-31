import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";

// import './currencies-form.css';
import { CurrencyDto, GarmentsDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CurrencyService, GarmentService } from '@project-management-system/shared-services';

export interface GarmentsFormProps {
  garmentData: GarmentsDto;
  updateItem: (garmentData: GarmentsDto) => void;
  isUpdate: boolean;
  // saveItem:(garmentData:GarmentsDto) => void;
  closeForm: () => void;
}

export const GarmentsForm = (props:GarmentsFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new GarmentService();
  let history = useLocation();

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const saveGarment = (garmentData: GarmentsDto) => {
    setDisable(true)
    garmentData.garmentId = 0;
    service.createGarment(garmentData).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Garment Created Successfully');
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
  /**
   *
   * @param values //Dto values
   */
  const saveData = (values: GarmentsDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        saveGarment(values);
      }
    

    
  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
<Card title={<span style={{color:'white'}}>Garments</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/garments/garments-view' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >
      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.garmentData}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="garmentId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="garmentName"
          label="Garment Name"
          rules={[
            {
              required: true,
              message:'Garment Name Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Should contain only alphabets.`
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col></Row>
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
  );
};

export default GarmentsForm;
