import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Card, Row, Col, InputNumber} from 'antd';


import TextArea from 'antd/lib/input/TextArea';
import { OperationsDTO } from '@project-management-system/shared-models';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { OperationsService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';

/* eslint-disable-next-line */
export interface OperationsFormProps {
  operationData: OperationsDTO;
  updateOperation: (operation: OperationsDTO) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function OperationsForm(
  props: OperationsFormProps
) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [display, setDisplay] = useState<string>('none');
  let history = useLocation();
  const operationService = new OperationsService();
  const [disable, setDisable] = useState<boolean>(false);
  const { state } = useLocation();


  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({operationGroupId:state?.id})
    }
  },[state])



  const createOperation = (operationsData : OperationsDTO) => {
    setDisable(true)
    operationService.createOperations(operationsData).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage('Operation Created Successfully');
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
  
  const saveData = (values: OperationsDTO) => {
    setDisable(false)
    if(props.isUpdate){
      // form.setFieldValue({'operationGroup'})
      console.log(values,'===========')
      props.updateOperation(values);
    }else{
      setDisable(false)
      console.log(values,'=======----')
      createOperation(values);
    }
  
  };
  let navigate = useNavigate()
  return (
    <Card title={props.isUpdate ? 'Update Operation' : 'Add Operation'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/operations/operation-view')} type={'primary'}>View</Button></span>}>

      <Form layout="vertical" form={form} initialValues={props.operationData} name="control-hooks" onFinish={saveData}>
      <Form.Item name="operationId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Form.Item name="operationGroupId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Row gutter={24}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}>
          <Form.Item
                      name="operationCode"
                      label="Operation Code"
                    
                  
                      rules={[
                        {
                          required: true,
                          message:'Operation Code is required',
                        },
                        {
                          pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                          message: `Enter valid Operation Code`,
                          },
                        ]}
                      >
                      <Input placeholder='Enter Operation Code'/>
                    </Form.Item>
        </Col>

        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}} >
          <Form.Item
            name="operationName"
            label="Operation Name"
            rules={[
              {
                required: true,
                message: 'Operation Name is Required',

              },
              {
                pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Operation Name`
              }

              
            ]}>
            <Input placeholder='Enter Operation Name'/>
          </Form.Item>
        </Col>

        {/* <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}} >
          <Form.Item
            name="workstationCategoryId"
            label="Work Station Category"
            rules={[
              {
                required: true,
                message: 'Work Station Category required'
              },
              {
                pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                message: `Don't Allow Spaces`
              }

            ]}>
            <Select
              showSearch
              //style={{ width: 210 }}
              placeholder="Select Work Station"
              optionFilterProp="children"
              onSelect={handleWorkStationCategory}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key={0} value={null}>Select WorkStation</Option>
              {workstationCategoryData.map((workstationCategoryData) => {
                return <Option key={workstationCategoryData.workstationCategoryId} value={workstationCategoryData.workstationCategoryId}>{workstationCategoryData.workstationCategory}</Option>
              })}
            </Select>
          </Form.Item>
        </Col> */}
        {/* <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}} >

          <Form.Item name="isValueAddition" label="Is Val Addition" rules={[{ required: true,message: 'Missing brand design' }]}>
              <Select
                  placeholder="Is Value Addition"
                  allowClear
                  defaultValue = "0"
              >
                  <Option value='1'>Yes</Option>
                  <Option value='0'>No</Option>

              </Select>
          </Form.Item>

      </Col> */}
        

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

export default OperationsForm;
