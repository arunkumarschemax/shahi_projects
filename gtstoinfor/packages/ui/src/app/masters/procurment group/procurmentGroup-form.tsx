import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Card, Row, Col, InputNumber} from 'antd';


import TextArea from 'antd/lib/input/TextArea';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProcurmentGroupService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ProcurmentGroupDto, ProcurmentGroupRequest } from '@project-management-system/shared-models';

/* eslint-disable-next-line */
export interface ProcurmentGroupFormProps {
  ProcurmentGroupData: ProcurmentGroupDto;
  updateProcurmentGroup: (ProcurmentGroup: ProcurmentGroupDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function ProcurmentGroupForm(
  props: ProcurmentGroupFormProps
) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [display, setDisplay] = useState<string>('none');
  let history = useLocation();
  const ProcurmentGroupervice = new ProcurmentGroupService();
  const [disable, setDisable] = useState<boolean>(false);
  const { state } = useLocation();


  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({ProcurmentGroupGroupId:state?.id})
    }
  },[state])



  const createProcurmentGroup = (ProcurmentGroupData : ProcurmentGroupRequest) => {
    setDisable(true)
    ProcurmentGroupervice.createProcurmentGroup(ProcurmentGroupData).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage('Procurment Group Created Successfully');
        // location.push("/ProcurmentGroup-view");
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
  
  const saveData = (values: ProcurmentGroupRequest) => {
    setDisable(false)
    if(props.isUpdate){
      // form.setFieldValue({'ProcurmentGroupGroup'})
      console.log(values,'===========')
      props.updateProcurmentGroup(values);
    }else{
      setDisable(false)
      console.log(values,'=======----')
      createProcurmentGroup(values);
    }
  
  };
  let navigate = useNavigate()
  return (
    <Card title={props.isUpdate ? 'Update ProcurmentGroup' : 'Add ProcurmentGroup'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/ProcurmentGroup/ProcurmentGroup-view')} type={'primary'}>View</Button></span>}>

      <Form layout="vertical" form={form} initialValues={props.ProcurmentGroupData} name="control-hooks" onFinish={saveData}>
      <Form.Item name="procurmentGroupId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      
      <Row gutter={24}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}>
          <Form.Item
                      name="procurmentGroup"
                      label="Procurment Group "
                    
                  
                      rules={[
                        {
                          required: true,
                          message:'ProcurmentGroup  is required',
                        },
                        {
                          pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                          message: `Enter valid ProcurmentGroup `,
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

export default ProcurmentGroupForm;
