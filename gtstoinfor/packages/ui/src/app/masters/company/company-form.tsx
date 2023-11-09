import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { CompanyDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CompanyService } from '@project-management-system/shared-services';

export interface CompanyFormProps {
  Data: CompanyDto;
  updateItem: (Data: CompanyDto) => void;
  isUpdate: boolean;
  // saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const CompanyForm = (props:CompanyFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new CompanyService();
  let history = useLocation();

  let createdUser="";
  // if(!props.isUpdate){
  //   // createdUser= localStorage.getItem("createdUser");
  //   createdUser= 'admin';
  // }
  
  const saveCompany = (companyData: CompanyDto) => {
    setDisable(true)
    companyData.companyId = 0;
    service.createCompany(companyData).then((res) => {
      setDisable(false)
        if (res.status) {
          AlertMessages.getSuccessMessage('Company Created Successfully');
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
  const saveData = (values: CompanyDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");
   
      if (props.isUpdate) {
        props.updateItem(values);
      } else {
        setDisable(false)
        saveCompany(values);
      }
    

    
  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Card title="Company" style={{textAlign:"start"}} 
     extra={props.isUpdate==true?"":<Link to='/global/company/company-grid' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="companyId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="companyName"
          label="Company Name"
          rules={[
            {
              required: true,
              message:'Company Name Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Should contain only alphabets.`
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:5}}> <Form.Item
          name="companyCode"
          label="Company Code"
          rules={[
            {
              required: true,
              message:'Company Code Is Required'
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:5}}> <Form.Item
          name="organizationCode"
          label="Organization Name"
          rules={[
            {
              required: true,
              message:'Oraganization Name Is Required'
            },
          ]}
        >
          
          <Input />
        </Form.Item>
        </Col></Row>
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

export default CompanyForm;
