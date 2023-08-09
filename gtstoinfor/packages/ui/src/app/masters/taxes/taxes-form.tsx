import React, { useState } from 'react';
import { Select, Input, Card, Form, Col, Row, Divider, Button, Popconfirm, message, InputNumber } from 'antd';
import { Link } from "react-router-dom";
import { TaxCategoriesEnum, TaxesDto } from '@project-management-system/shared-models';
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

    let createdUser="";
    if(!props.isUpdate){
      createdUser= localStorage.getItem("createdUser");
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
      // history.push("/taxes-view");
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
    
   <Card title={'Taxes'}
    
    extra={props.isUpdate==true?"":<Link to='/masters/taxes/taxes-grid' ><Button className='panel_button' >View </Button></Link>}
    >

      <Form form={form} onFinish={saveData} initialValues={props.taxesData} layout="vertical" name="control-hooks"> 
      <Form.Item name="taxId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser"  initialValue={createdUser}>
      <Input hidden/>
    </Form.Item>
    <Row>
    
        <Col span={8} style={{margin:'2%'}}>
            <Form.Item
                name="taxName"
                label="Tax Name"
                rules={[
                  {
                     required: true,message: 'Tax name is mandatory'
                  },
                  {
                    pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/`~{}:";'<>,.?|\s-]*$/,
                      message: `Invalid Tax Name`
                  }
                ]}>
    
          <Input/>
          </Form.Item>
    </Col>
    <Col style={{margin:'2%'}}>
    <Form.Item
      name="taxPercentage"
      label="Tax Percentage(%)"
      rules={[
        {
          required: true, message: 'Tax Percentage(%) is mandatory, enter a correct value',
          
        },
        {
          pattern: /^[^-\s\\a-zA-Z\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][Z0-9.\s]*$/,
          message: `Invalid Tax Percentage`
        }

      ]}
    >
      <Input />
        </Form.Item>
      </Col>
      <Col style={{margin:'2%'}}>
    <Form.Item
      name="taxCategory"
      label="Tax Category"
      rules={[
        {
          required: true, message: 'Tax Category is mandatory',
          
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
                <Option key={0} value={null}>Select State Category</Option>
                <Option key={TaxCategoriesEnum.Central} value={TaxCategoriesEnum.Central}>Central</Option>
                <Option key={TaxCategoriesEnum.State} value={TaxCategoriesEnum.State}>State</Option>
               
              </Select>
        </Form.Item>
      </Col>
      
    
      <Col span={24} style={{ textAlign: 'right' }}>
          
          <Button type="primary"disabled={disable} htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate===false) &&
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          }
         </Col>
      </Row>
      </Form>
    </Card>
  



  );
      
  

}

export default TaxesForm