import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PackageTermsDto, PaymentTermsDto } from '@project-management-system/shared-models';
import { PackageTermsService } from '@project-management-system/shared-services';
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
export interface PackagesTermsFormProps {
    packageTermsData: PackageTermsDto;
    updateDetails:(packagedto:PackageTermsDto)=>void;
    isUpdate:boolean;
    closeForm: () => void;

}

export function PackagesTermsForm(props:PackagesTermsFormProps) {

  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const service = new PackageTermsService;

  let history = useLocation();

  const save = (Data: PackageTermsDto) => {
    setDisable(true)
       service.createPackageTerms(Data).then(res => {
        setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate('/global/package-terms/package-terms-view')
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


  
  const saveData = (values: PackageTermsDto) => {
    console.log(values,"paaaaaaaa")
    setDisable(false)
    console.log(values);
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

 console.log(PaymentTermsDto,"999999")

  return (
    <Card title='Package Terms' extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/global/package-terms/package-terms-view')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form}  onFinish={saveData}  initialValues={props.packageTermsData}>
    <Row>
    <Form.Item name="packageTermsId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>      
        <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}>
        <Form.Item
          name="packageTermsName"
          label="Package Term Name"
          style={{width:'120%'}}
          rules={[
            {
              required: true,
              message:"Enter valid package term name."
            },
            {
              pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
              message: `Should contain only alphabets and numbers.`
            }
          ]}
        >
          <Input placeholder='Enter Package Term Name'  />
        </Form.Item>
        </Col>
        </Row>
      
        
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          {/* {(props.isUpdate === false) && */}
              <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>
           {/* }    */}
         
          </Col>
          
    </Form>
          </Card>
  );
}

export default PackagesTermsForm;
