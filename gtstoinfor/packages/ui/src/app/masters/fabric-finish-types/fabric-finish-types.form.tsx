import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { FabricFinishTypeService } from '@project-management-system/shared-services';
import { FabricFinishTypesDTO } from '@project-management-system/shared-models';

/* eslint-disable-next-line */

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



export interface FabricFinishTypesFormProps {

  FabriFinishTypesData: FabricFinishTypesDTO;
  updateDetails:(fabricFinishTypeDto:FabricFinishTypesDTO)=>void;
 isUpdate:boolean;
closeForm: () => void;

}

export function FabricFinishTypesForm(
  props: FabricFinishTypesFormProps
) {

  const [form] = Form.useForm();
  const service = new FabricFinishTypeService();
  const [disable, setDisable] = useState<boolean>(false)
  let history = useLocation();
  let navigate = useNavigate()
  const save = (Data: FabricFinishTypesDTO) => {
    setDisable(true)
       service.create(Data).then(res => {
        setDisable(false)
      if (res.status) {

        AlertMessages.getSuccessMessage('Created Successfully');
        // history.push("/delivery-terms-view")
        onReset();
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  
  const saveData = (values: FabricFinishTypesDTO) => {
    setDisable(false)
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

  return (

    <Card title={props.isUpdate ? ' Fabric Finish Type' : 'Fabric Finish Type'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/fabric-finish-type/fabric-finish-type-grid')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.FabriFinishTypesData} >
    <Form.Item name="fabricFinishTypeId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>
      <Row>
     
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
        <Form.Item
          name="fabricFinishType"
          label="Fabric Finish Type"
          rules={[
            {
              required: true,
              message: 'Enter the Fabric Finish Type'

            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?| ]*$/,
              message: `Invalid Fabric Finish Type.`
            }
          ]}
        >
          <Input placeholder='Enter Fabric Finish Type'/>
        </Form.Item>
        </Col>
        </Row>
      
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          
      {/* {props.isUpdate?<Link to='/FabriFinishTypes-view' >  <Button htmlType="button" style={{ margin: '0 8px' }}>
            Cancel
          </Button></Link>: <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>} */}

          {(props.isUpdate===false) && 
          <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>}
         
          </Col>
          </Row>
    </Form>
          </Card>

   
  );
}

export default FabricFinishTypesForm;
