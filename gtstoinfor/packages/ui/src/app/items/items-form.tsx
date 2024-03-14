import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";

// import './currencies-form.css';
import { ItemsDto } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import { ItemsService } from '@project-management-system/shared-services';

export interface ItemsFormProps {
  itemData: ItemsDto;
  updateItem: (itemData: ItemsDto) => void;
  isUpdate: boolean;
//   saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const ItemsForm = (props:ItemsFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new ItemsService();
  let history = useLocation();

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const saveItems = (itemData: ItemsDto) => {
    setDisable(true)
    itemData.itemId = 0;
    service.createItems(itemData).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Item Created Successfully');
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
  const saveData = (values: ItemsDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        saveItems(values);
      }
    

    
  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
<Card title={<span style={{color:'white'}}>Items</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/items-view' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.itemData}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="itemId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row gutter={[12,12]}>
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="item"
          label="item"
          rules={[
            {
              required: true,
              message:'Item Name Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Item'/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
        <Form.Item
          name="consumptionrequired"
          label="Consumption Required"
          rules={[
            {
              required: true,
              message: 'Consumption Required Is Required'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Should contain only numbers.'
            }
          ]}
        >
          <Input placeholder='Enter Consumption Required' />
        </Form.Item>
      </Col>

        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="consumption"
          label="Consumption "
          rules={[
            {
              required: true,
              message:'Consumption  Is Required'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Should contain only numbers.'
            }
          ]}
        >
          <Input placeholder='Enter Consumption '/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="wastage"
          label="wastage "
          rules={[
            {
              required: true,
              message:'wastage  Is Required'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Should contain only numbers.'
            }
          ]}
        >
          <Input placeholder='Enter wastage '/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="moq"
          label="moq "
          rules={[
            {
              required: true,
              message:'moq  Is Required'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Should contain only numbers.'
            }
          ]}
        >
          <Input placeholder='Enter moq '/>
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
  );
};

export default ItemsForm;
