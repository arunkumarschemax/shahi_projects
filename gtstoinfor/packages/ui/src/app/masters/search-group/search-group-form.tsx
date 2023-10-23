import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PaymentTermsDto, searchGroupDto } from '@project-management-system/shared-models';
import { PaymentTermsService, SearchGroupService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';



const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 8,
  },
};


const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 10,
  },
};
/* eslint-disable-next-line */
export interface SearchGroupFormProps {
  // Data: PaymentTermsDto;
  Data:any
  updateDetails:(dto:searchGroupDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;

}

export function SearchGroupForm(props:SearchGroupFormProps) {

  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const service = new SearchGroupService;

  let history = useLocation();

  const save = (Data: searchGroupDto) => {
    setDisable(true)
       service.createSearchGroup(Data).then(res => {
        setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate('/masters/searchGroup/searchGroup-grid')
        
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  
  const saveData = (values: searchGroupDto) => {
    console.log(values,"paaaaaaaa")
    setDisable(false)
    // console.log(values);
    if(props.isUpdate){
      props.updateDetails(values);
    }else{
      setDisable(false)
      save(values);
    }
  
  };
  const onReset = () => {
    form.resetFields();
  };

 console.log(searchGroupDto,"999999")

  return (
    <Card title='Search Group' extra={(props.isUpdate === false) && <span>
      <Button
     onClick={() => navigate('/masters/searchGroup/searchGroup-grid')
     } type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.Data} >
    <Row>
    <Form.Item name="Id" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>      
      <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}>
        <Form.Item
          name="searchGrpCode"
          label="Search Group Code"
          rules={[
            {
              required: true,
              message: 'Search Group Code Is Required'
            },
          ]}
        >
         <Input />

        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}>
        <Form.Item
          name="searchGrpName"
          label="Search Group Name"
          style={{width:'120%'}}
          rules={[
            {
              required: true,
              message:"Search Group Name Is Required."
            },
            
          ]}
        >
          <Input  />
        </Form.Item>
        </Col>
        </Row>
      
        
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate === false) &&
          <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>
           } 
         
          </Col>
          
    </Form>
          </Card>
  );
}

export default SearchGroupForm;
