import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, DatePicker, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmployeeDetailsResponse, EmployeeMarritalStatusEnum, ItemsDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CurrencyService, EmployeeDetailsService, ItemCategoryService, ItemSubCategoryService, ItemsService } from '@project-management-system/shared-services';
import dayjs from 'dayjs';


export interface ItemFormProps {
    itemData: ItemsDto;
  updateItem: (employeeData: ItemsDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const ItemsForm = (props:ItemFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const [itemCategory,setIteCategory] = useState<any[]>([])
  const [itemSubCategory,setIteSubCategory] = useState<any[]>([])

  const {Option} =Select
  const service = new ItemsService();
  const itemCategoryService = new ItemCategoryService()
  const itemSubCategoryService = new ItemSubCategoryService()
  let history = useLocation();
  let navigate = useNavigate();

  let createdUser="";
  if(!props.isUpdate){
    createdUser= 'admin';
  }
  
  const saveItem = (data: ItemsDto) => {
    data.itemId = 0;
    service.creteItems(data).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Items Created Successfully');
        //   navigate("/masters/employee-details/employee-details-grid")
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

  const saveData = (values: ItemsDto) => {
    setDisable(false)
      if (props.isUpdate) {
        console.log(props.isUpdate)
        props.updateItem(values);
      } else {
        setDisable(false)
        saveItem(values);
      }
    
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() =>{
    getItemCategoryDropDown()
  },[])

const getItemCategoryDropDown =()=>{
  itemCategoryService.getActiveItemCategories().then((res) =>{
    if(res.status){
      setIteCategory(res.data)
    }else{
      setIteCategory([])
    }
  })
}
const getItemSubCategoryDropDown =(value)=>{
  itemSubCategoryService.getItemSubCategoriesForCategoryDropDown({itemCategoryId:value}).then((res) =>{
    if(res.status){
      setIteSubCategory(res.data)
    }else{
      setIteSubCategory([])
    }
  })
}
const itemCategoryOnchange = (value) =>{
  console.log(value)
  getItemSubCategoryDropDown(value)
}
  return (
 <Card title={<span style={{color:'black'}}>Items</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/employee-details/employee-details-grid' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >

      <Form layout={'vertical'} form={form} initialValues={props.itemData} name="control-hooks"   onFinish={saveData}
      >
        <Form.Item name="itemId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row>
         <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
            name="itemName"
            label="Item Name"
            rules={[
              {
                required: true,
                message:'Item Name Is Required'
              }
            ]}>
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
          name="itemCode"
          label="Item Code"
          rules={[
            {
              required: true,
              message:'Item Code Is Required'
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}>
           <Form.Item  name="itemCategoryId" label="Item Category"
            rules={[ { required: true, message: 'Please select Item Sub Category' }]}
               >
              <Select placeholder={"Select Item Category"} showSearch onChange={value =>itemCategoryOnchange(value)}>
                    {itemCategory.map(dropData => {
                    return <Option key={dropData.itemCategoryId} value={dropData.itemCategoryId}>{dropData.itemCategory}</Option>
                         })}
                </Select>
               </Form.Item>
           </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
          name="itemSubCategoryId"
          label="Item SubCategory"
          rules={[
            {
              required: true,
              message:'Item SubCategory Is Required'
            }
          ]}
        >
          <Select placeholder={"Select Item Category"} showSearch >
                    {itemSubCategory.map(dropData => {
                    return <Option key={dropData.itemSubCategoryId} value={dropData.itemSubCategoryId}>{dropData.itemSubCategory}</Option>
                         })}
                </Select>
          {/* <Input /> */}
          </Form.Item>
          </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:5}} style={{margin:'1%'}}> 
          <Form.Item
          name="brandId"
          label="brand"
          rules={[
            {
              required: true,
              message:'Brand Is Required'
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:3}} style={{margin:'1%'}}> <Form.Item
          name="minQuantity"
          label=" Min Quantity"
          rules={[
            {
              required: true,
              message:'Min Quantity is Required'
            }
          ]}
        >
          <Input type='number' min={1}/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}> <Form.Item
          name="uomId"
          label="UOM"
          rules={[
            {
              required: true,
              message:'UOM Is Required'
            }
          ]}
        >
          <Input/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:4}} style={{margin:'1%'}}>
           <Form.Item
          name="remarks"
          label="Remarks"
         
        >
          <Input.TextArea rows={2}/>
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
