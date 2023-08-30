import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { DestinationDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { DestinationService } from '@project-management-system/shared-services';
export interface DestinationFormProps {
  Data: DestinationDto;
  updateItem: (Data: DestinationDto) => void;
  isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const DestinationForm = (props: DestinationFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)

  const service = new DestinationService();
  let history = useLocation();

  let createdUser = "";
  if (!props.isUpdate) {
    // createdUser= localStorage.getItem("createdUser");
    createdUser = 'admin';
  }

  const save = (Data: DestinationDto) => {
    setDisable(true)
    Data.destinationId = 0;
    service.createDestination(Data).then((res) => {
      setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Destination Created Successfully');
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
  const saveData = (values: DestinationDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");

    if (props.isUpdate) {
      props.updateItem(values);
    } else {
      setDisable(false)
      save(values);
    }



  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Card title={<span style={{ color: 'white' }}>Destination</span>}
      style={{ textAlign: 'center' }}
      extra={props.isUpdate == true ? "" : <Link to='/global/destination/destination-grid' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
    >



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="destinationId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}> <Form.Item
            name="destination"
            label="Destination"
            rules={[
              {
                required: true,
                message: 'Destination Is Required'
              }
            ]}
          >
            <Input />
          </Form.Item>
          </Col>
        </Row>
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

export default DestinationForm;
