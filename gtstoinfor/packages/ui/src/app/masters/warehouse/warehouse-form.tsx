import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";

// import './currencies-form.css';
import {  WarehouseDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { WarehouseService } from '@project-management-system/shared-services';

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

export interface WarehouseFormProps {
  Data: WarehouseDto;
  updateItem: (Data: WarehouseDto) => void;
  isUpdate: boolean;
//   saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const WarehouseForm = (props:WarehouseFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new WarehouseService();
  let history = useLocation();

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const save = (Data: WarehouseDto) => {
    setDisable(true)
    Data.warehouseId = 0;
    service.createWarehouse(Data).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Warehouse Created Successfully');
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
  const saveData = (values: WarehouseDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        save(values);
      }
    

    
  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
<Card title={<span style={{color:'white'}}>Warehouse</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/global/warehouse/warehouse-grid' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="warehouseId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="warehouseName"
          label="WareHouse Name"
          rules={[
            {
              required: true,
              message:'Warehouse Name Is Required'
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="warehouseCode"
          label="WareHouse Code"
          rules={[
            {
              required: true,
              message:'Warehouse Code Is Required'
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
  );
};

export default WarehouseForm;
