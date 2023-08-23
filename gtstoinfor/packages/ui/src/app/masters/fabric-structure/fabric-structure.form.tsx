import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { FabricStructuresDTO } from '@project-management-system/shared-models';
import { FabricStructuresService } from '@project-management-system/shared-services';

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



export interface FabricStructuresFormProps {

  FabriStructuresData: FabricStructuresDTO;
  updateDetails:(fabricStructureDto:FabricStructuresDTO)=>void;
 isUpdate:boolean;
closeForm: () => void;

}

export function FabricStructuresForm(
  props: FabricStructuresFormProps
) {

  const [form] = Form.useForm();
  const service = new FabricStructuresService();
  const [disable, setDisable] = useState<boolean>(false)
  let history = useLocation();
  let navigate = useNavigate()
  const save = (Data: FabricStructuresDTO) => {
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


  
  const saveData = (values: FabricStructuresDTO) => {
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

    <Card title={props.isUpdate ? 'Update Fabric Structure' : 'Add Fabric Structure'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/delivery-terms/delivery-terms-view')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.FabriStructuresData} >
    <Form.Item name="fabricStructureId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>
      <Row>
     
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
        <Form.Item
          name="fabricStructure"
          label="Fabric Structure"
          rules={[
            {
              required: true,
              message: 'Enter the Fabric Structure'

            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?| ]*$/,
              message: `Invalid Fabric Structure.`
            }
          ]}
        >
          <Input/>
        </Form.Item>
        </Col>
        </Row>
      
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          
      {/* {props.isUpdate?<Link to='/FabriStructures-view' >  <Button htmlType="button" style={{ margin: '0 8px' }}>
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

export default FabricStructuresForm;
