import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";

// import './currencies-form.css';
import {  WarehouseDto, categoryEnum, categoryEnumDisplay } from '@project-management-system/shared-models';
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
  const navigate = useNavigate();
  const { Option } = Select

  let createdUser="";
  if(!props.isUpdate){
    // createdUser= localStorage.getItem("createdUser");
    createdUser= 'admin';
  }
  
  const save = (Data: WarehouseDto) => {
    setDisable(true)
    Data.warehouseId = 0;
    service.createWarehouse(Data).then((res) => {
      console.log(Data,'uuuuuu');
      
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Warehouse Created Successfully');
        //   location.push("/Currencies-view");
          onReset();
          navigate('/global/warehouse/warehouse-grid')

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
    console.log(values,'ooooooooooo');
    
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
<Card title={<span >WareHouse</span>}
     style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}  
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
        <Row gutter={12}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}} > <Form.Item
          name="warehouseName"
          label="WareHouse Name"
          rules={[
            {
              required: true,
              message:'Warehouse Name should contain letters and numbers only',
              // pattern: /^*$/,
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="warehouseCode"
          label="WareHouse Code"
          rules={[
            {
              required: true,
              message:'Warehouse Code should contain letters and numbers only',
              // pattern: /^[a-zA-Z0-9!@#$%^&*()-_+=<>?/\\.,;:'"[\]{}|]+$/, 

            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
            <Form.Item label="Category	" name="category"  rules={[
            {
              required: true,
              message:'category is required'
            }
          ]}>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Select category'>   
            {categoryEnumDisplay.map(e => {
            return (
                <Option key={e.name} value={e.displayVal} > {e.displayVal}</Option>
            )
        })}</Select>
            {/* <Select
                mode="multiple"
                tagRender={tagRender}
                defaultValue={['OPEN', 'IN PROGRESS']}
                style={{ width: '100%' }}
                options={options}
                
              /> */} 
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
