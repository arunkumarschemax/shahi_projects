import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Card, Row, Col, InputNumber} from 'antd';


import TextArea from 'antd/lib/input/TextArea';
import {  SampleSubTypesDTO } from '@project-management-system/shared-models';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { OperationsService, SampleSubTypesService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';

/* eslint-disable-next-line */
export interface SampleSubTypesFormProps {
    SampleSubTypesData: SampleSubTypesDTO;
  updateSampleSubTypes: (sampleSubTypes: SampleSubTypesDTO) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function SampleSubTypesForm(
  props: SampleSubTypesFormProps
) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [display, setDisplay] = useState<string>('none');
  let history = useLocation();
  const Service = new SampleSubTypesService();
  const [disable, setDisable] = useState<boolean>(false);
  const { state } = useLocation();


  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({sampleTypeId:state?.id})
    }
  },[state])



  const createSampleSubType = (data : SampleSubTypesDTO) => {
    setDisable(true)
    Service.createSampleSubType(data).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage('Sample Sub Type Created Successfully');
        // location.push("/operations-view");
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
  
  const saveData = (values: SampleSubTypesDTO) => {
    setDisable(false)
    if(props.isUpdate){
      // form.setFieldValue({'operationGroup'})
      props.updateSampleSubTypes(values);
    }else{
      setDisable(false)
      createSampleSubType(values);
    }
  
  };
  let navigate = useNavigate()
  return (
    <Card title={props.isUpdate ? 'Update SampleSubType' : 'Add SampleSubType'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/sampleSubTypes/sampleSubTypes-grid')} type={'primary'}>View</Button></span>}>

      <Form layout="vertical" form={form} initialValues={props.SampleSubTypesData} name="control-hooks" onFinish={saveData}>
      <Form.Item name="sampleTypeId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Form.Item name="sampleSubTypeId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Row gutter={24}>
       

        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}} >
          <Form.Item
            name="sampleSubType"
            label="Sample Sub Type"
            rules={[
              {
                required: true,
                message: 'Sample Sub Type is Required',

              },
              {
                pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Sample Sub Type`
              }

              
            ]}>
            <Input placeholder='Enter Sample Sub Type'/>
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

export default SampleSubTypesForm;
