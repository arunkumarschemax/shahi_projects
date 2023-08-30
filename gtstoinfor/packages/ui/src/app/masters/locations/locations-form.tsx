import React, { useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import {  LocationDto } from '@project-management-system/shared-models';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { LocationsService } from '@project-management-system/shared-services';

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



export interface LocationsFormProps {

  locationsData: LocationDto;
  updateDetails:(locationdto:LocationDto)=>void;
 isUpdate:boolean;
closeForm: () => void;

}

export function LocationsForm(
  props: LocationsFormProps
) {

  const [form] = Form.useForm();
  const service = new LocationsService();
  const [disable, setDisable] = useState<boolean>(false)
  let history = useLocation();
  let navigate = useNavigate()
  const save = (Data: LocationDto) => {
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


  
  const saveData = (values: LocationDto) => {
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

    <Card title={props.isUpdate ? 'Update Locations' : 'Add location'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/global/locations/locations-view')} type={'primary'}>View</Button></span>}>
    <Form layout="vertical" form={form} onFinish={saveData} initialValues={props.locationsData} >
    <Form.Item name="locationId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>
      <Row>
      
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
        <Form.Item
          name="locationName"
          label="Location Name"
          rules={[
            {
              required: true,
              message: 'Enter the Location Name'

            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?| ]*$/,
              message: `Invalid Location Name.`
            }
          ]}
        >
          <Input/>
        </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
        <Form.Item
          name="locationCode"
          label="Location Code"
          rules={[
            {
              required: true,
              message: 'Enter the Location Code'

            },
            {
              pattern: /^[^-\s\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?| ]*$/,
              message: `Invalid Location Code.`
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
          
      {/* {props.isUpdate?<Link to='/Deliveryterms-view' >  <Button htmlType="button" style={{ margin: '0 8px' }}>
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

export default LocationsForm;
