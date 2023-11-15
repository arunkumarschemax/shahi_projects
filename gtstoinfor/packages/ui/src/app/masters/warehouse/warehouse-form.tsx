import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";

// import './currencies-form.css';
import {  ItemGroupEnum, WarehouseDto } from '@project-management-system/shared-models';
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
  let navigate = useNavigate();
  const {Option}=Select

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const save = (Data: WarehouseDto) => {
    console.log(Data,"dto")
    setDisable(true)
    Data.warehouseId = 0;
    service.createWarehouse(Data).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Warehouse Created Successfully');
          navigate('/global/warehouse/warehouse-grid')
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
<Card title={<span style={{color:'Black'}}>Warehouse</span>}
     
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
        <Row gutter={16}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}> <Form.Item
          name="warehouseName"
          label="Warehouse Name"
          rules={[
            {
              required: true,
              message:'Warehouse Name Is Required'
            }
          ]}
        >
          <Input placeholder='Enter Warehouse Name' />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}> <Form.Item
          name="warehouseCode"
          label="Warehouse Code"
          rules={[
            {
              required: true,
              message:'Warehouse Code Is Required'
            }
          ]}
        >
          <Input  placeholder='Enter Warehouse Code'/>
        </Form.Item>
        </Col>
        <Col>
        <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Enter Category" }]}
                  >
                    <Select
                    showSearch
                  
                        placeholder="Select Category" allowClear>
                     {Object.values(ItemGroupEnum).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })}
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
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
