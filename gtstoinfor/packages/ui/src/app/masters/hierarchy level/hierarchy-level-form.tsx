import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Card, Row, Col, InputNumber} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { HierarchyLevelDto, HierarchyLevelRequest } from '@project-management-system/shared-models';
import { HierachyLevelService } from '@project-management-system/shared-services';


/* eslint-disable-next-line */
export interface HierarchyLevelFormProps {
  hierarchyLevelData : HierarchyLevelDto;
  updateHierarchyLevel : (HierachyLevel : HierarchyLevelDto) => void
 isUpdate: boolean;
  closeForm: () => void;
}

export function HierarchyLevelForm(
  props: HierarchyLevelFormProps
) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [display, setDisplay] = useState<string>('none');
  let history = useLocation();
  const hierarchyLevelervice = new HierachyLevelService();
  const [disable, setDisable] = useState<boolean>(false);
  const { state } = useLocation();


  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({HierarchyLevelGroupId:state?.id})
    }
  },[state])



  const createHierarchyLevel = (HierarchyLevelData : HierarchyLevelRequest) => {
    setDisable(true)
    hierarchyLevelervice.createhierachyLevel(HierarchyLevelData).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage('Hierarchy Level Created Successfully');
        // location.push("/HierarchyLevel-view");
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
  
//   const saveData = (values: HierarchyLevelRequest) => {
//     setDisable(false)
//     if(props.isUpdate){
//       // form.setFieldValue({'HierarchyLevelGroup'})
//       console.log(values,'===========')
//  props.updateHierarchyLevel(values)
//     }else{
//       setDisable(false)
//       console.log(values,'=======----')
//       createHierarchyLevel(values);
//     }
  
//   };
const saveData = (values: HierarchyLevelRequest) => {
  setDisable(false)
  if(props.isUpdate){
    // form.setFieldValue({'ProcurmentGroupGroup'})
    console.log(values,'===========')
    props.updateHierarchyLevel(values);
  }else{
    setDisable(false)
    console.log(values,'=======----')
    createHierarchyLevel(values);
  }

};
  let navigate = useNavigate()
  return (
    <Card title={props.isUpdate ? 'Update HierarchyLevel' : 'Add HierarchyLevel'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/HierarchyLevel/HierarchyLevel-view')} type={'primary'}>View</Button></span>}>

      <Form layout="vertical" form={form} initialValues={props.hierarchyLevelData} name="control-hooks" onFinish={saveData}>
    
      <Form.Item name="hierarchyLevelId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Row gutter={24}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:6}} lg={{span:6}} xl={{span:6}}>
          <Form.Item
                      name="hierarchyLevel"
                      label="Hierarchy Level"
                    
                  
                      rules={[
                        {
                          required: true,
                          message:'HierarchyLevel  is required',
                        },
                        {
                          pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                          message: `Enter valid HierarchyLevel `,
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

export default HierarchyLevelForm;
