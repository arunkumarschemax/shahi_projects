import React, { useState } from 'react';
import { Select, Input, Card, Form, Col, Row, Divider, Button, Popconfirm, message, InputNumber } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { TaxCategoriesEnum, TaxesDto, TaxtypeEnum } from '@project-management-system/shared-models';
import { TaxesService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';


/* eslint-disable-next-line */
export interface TaxesFormProps {
  
  taxesData:TaxesDto;
  updateTax: (taxesData:TaxesDto) => void;
  isUpdate: boolean;
  // saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;

}

const tailLayout = {
  wrapperCol: { offset: 18, span: 16 },
};
const layout = {
  wrapperCol: { span: 8},
labelCol:{span:8}
}


  export function TaxesForm(props: TaxesFormProps) {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    const service = new TaxesService();
    const { Option } = Select;
    const navigate = useNavigate()

    // let createdUser="";
    // if(!props.isUpdate){
    //   createdUser= localStorage.getItem("createdUser");
    // }
    const userName = JSON.parse(localStorage.getItem("currentUser")).user.userName;
    if (userName){
     form.setFieldsValue({createdUser:userName})
    }
    
    const onReset = () => {
      console.log('hhhhhh');
      form.resetFields();
    };

const saveData = (values: TaxesDto) => {
  setDisable(false)
  // console.log(values);
  if(props.isUpdate){
    props.updateTax(values);
  }else{
    setDisable(false)
    save(values);
  }

};

const save = (taxesData: TaxesDto) => {
  setDisable(true)
  taxesData.isActive=true;
  service.createTax(taxesData).then(res => {
    setDisable(false)
    if (res.status) {
      AlertMessages.getSuccessMessage('Tax Created Successfully');
      navigate('/global/taxes/taxes-grid' )
      onReset();
    } else {
      if (res.status) {
        AlertMessages.getErrorMessage(res.internalMessage);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }
   })
   .catch(err => {
    setDisable(false)
    //  AlertMessages.getErrorMessage(err.message);
  })
  
}

const onFocus=() =>{
  console.log('focus');
}

const onSearch=(val)=> {
  console.log('search:', val);
}
const onBlur=() =>{
  console.log('blur');
}


  return (
    
   <Card title={'Tax'}
    
    extra={props.isUpdate==true?"":<Link to='/global/taxes/taxes-grid' ><Button className='panel_button' type={'primary'}>View </Button></Link>}
    >

      <Form form={form} onFinish={saveData} initialValues={props.taxesData} layout="vertical" name="control-hooks"> 
      <Form.Item name="taxId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
    
        <Col span={5} style={{margin:'2%'}}>
            <Form.Item
                name="taxName"
                label="Tax Name"
                rules={[
                  {
                     required: true,message: 'Tax Name is required'
                  },
                  {
                    pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/`~{}:";'<>,.?|\s-]*$/,
                      message: `Invalid Tax Name`
                  }
                ]}>
    
          <Input placeholder='Enter Tax Name'/>
          </Form.Item>
    </Col>
    <Col span ={5}  style={{margin:'2%'}}>
    <Form.Item
      name="taxPercentage"
      label="Tax Percentage(%)"
      rules={[
        {
          required: true, message: 'Tax Percentage(%) is required',
          
        },
        {
          pattern: /^[^-\s\\a-zA-Z\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][Z0-9.\s]*$/,
          message: `Invalid Tax Percentage`
        }

      ]}
    >
      <Input placeholder='Enter Tax Percentage ' />
        </Form.Item>
      </Col>
      <Col span ={5} style={{margin:'2%'}}>
    <Form.Item
      name="taxCategory"
      label="Tax Category"
      rules={[
        {
          required: true, message: 'Tax Category is required',
          
        },
       

      ]}
    >
      <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Tax Category"
                optionFilterProp="children"
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                
              >
                {/* <Option key={TaxCategoriesEnum.Central} value={TaxCategoriesEnum.Central}>Central</Option>
                <Option key={TaxCategoriesEnum.State} value={TaxCategoriesEnum.State}>State</Option> */}
                {Object.values(TaxtypeEnum).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })}
               
              </Select>
        </Form.Item>
      </Col>
      
    
      <Col span={24} style={{ textAlign: 'right' }}>
          
          <Button type="primary"disabled={disable} htmlType="submit" >
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
      
  

}

export default TaxesForm