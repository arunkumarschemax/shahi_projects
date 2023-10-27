import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Card, Row, Col, InputNumber} from 'antd';


import TextArea from 'antd/lib/input/TextArea';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductGroupService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ProductGroupDto, ProductGroupRequest } from '@project-management-system/shared-models';

/* eslint-disable-next-line */
export interface ProductGroupFormProps {
  ProductGroupData: ProductGroupDto;
  updateProductGroup: (ProductGroup: ProductGroupDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function ProductGroupForm(
  props: ProductGroupFormProps
) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [display, setDisplay] = useState<string>('none');
  let history = useLocation();
  const ProductGroupervice = new ProductGroupService();
  const [disable, setDisable] = useState<boolean>(false);
  const { state } = useLocation();


  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({ProductGroupGroupId:state?.id})
    }
  },[state])



  const createProductGroup = (ProductGroupData : ProductGroupRequest) => {
    setDisable(true)
    ProductGroupervice.createProductGroup(ProductGroupData).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage('Product Group Created Successfully');
        // location.push("/ProductGroup-view");
        onReset();
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const onReset=()=>{
    console.log('');
    form.resetFields();
    
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

  // const handleWorkStationCategory=(value)=>{
  //   setSelectedWorkStationCategory(value);
  //   if(value == ''){
  //     setDisplay('block');
  //   } else {
  //     setDisplay('none');
  //   } 
  // }
  
  const saveData = (values: ProductGroupRequest) => {
    setDisable(false)
    if(props.isUpdate){
      console.log(values,'===========')
      props.updateProductGroup(values);
    }else{
      setDisable(false)
      console.log(values,'=======----')
      createProductGroup(values);
    }
  
  };
  let navigate = useNavigate()
  return (
    <Card title={props.isUpdate ? 'Update ProductGroup' : 'Add ProductGroup'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/ProductGroup/ProductGroup-view')} type={'primary'}>View</Button></span>}>

      <Form layout="vertical" form={form} initialValues={props.ProductGroupData} name="control-hooks" onFinish={saveData}>
      <Form.Item name="productGroupId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
    
      <Row gutter={24}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}>
          <Form.Item
                      name="productGroup"
                      label="Product Group "
                    
                  
                      rules={[
                        {
                          required: true,
                          message:'ProductGroup  is required',
                        },
                        {
                          pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                          message: `Enter valid ProductGroup `,
                          },
                        ]}
                      >
                      <Input/>
                    </Form.Item>
        </Col>

    
    
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>

          <Button type="primary"disabled={disable} htmlType="submit" >
            Submit
         </Button>
          {(props.isUpdate === false) &&
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

export default ProductGroupForm;
