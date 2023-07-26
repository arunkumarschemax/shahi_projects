import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";

// import './currencies-form.css';
import { CurrencyDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CurrencyService } from '@project-management-system/shared-services';

/* eslint-disable-next-line */
// const { Option } = Select;
// const layout = {
//   labelCol: {
//     span: 10,
//   },
//   wrapperCol: {
//     span: 8,
//   },
// };

// const tailLayout = {
//   wrapperCol: {
//     offset: 10,
//     span: 10,
//   },
// };

export interface CurrenciesFormProps {
  currencyData: CurrencyDto;
  updateItem: (currencyData: CurrencyDto) => void;
  isUpdate: boolean;
//   saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const CurrenciesForm = (props:CurrenciesFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new CurrencyService();
  let history = useLocation();

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const saveCurrency = (currencyData: CurrencyDto) => {
    setDisable(true)
    currencyData.currencyId = 0;
    service.createCurrency(currencyData).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Currency Created Successfully');
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
  const saveData = (values: CurrencyDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        saveCurrency(values);
      }
    

    
  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
<Card title={<span style={{color:'white'}}>Currencies</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/currencies/currency-view' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.currencyData}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="currencyId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="currencyName"
          label="Currency Name"
          rules={[
            {
              required: true,
              message:'Currency Name Is Required'
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

export default CurrenciesForm;
