import { RacksService } from '@project-management-system/shared-services'
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import React from 'react'
import {   useNavigate } from 'react-router-dom'
import AlertMessages from '../../common/common-functions/alert-messages'
import { RackDTO } from '@project-management-system/shared-models'

const RackForm = () => {

const navigate=useNavigate()
const service = new RacksService();
const [form] = Form.useForm();
const Rules = /^[a-zA-Z0-9]+$/;

const onFinish = (rackDto: RackDTO) => {
    service.createRacks(rackDto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage)
        setTimeout(() => {
          message.success('Submitted successfully');
          window.location.reload();
        }, 500);;
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }


  const clearData = () => {
    form.resetFields()
  }



  return (
    <div>
      <Card title={<span>RACKS</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
      className="card-header"
        extra={<Button
          onClick={() => navigate('/masters/rack-view')}
          type="primary"
          style={{ background: "white", color: "#3C085C" }}
        >View</Button>
        
        }>
        <Form form={form} layout={'vertical'} onFinish={onFinish}>
      <Row gutter={24}>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Rack Name" name="rackName"
               rules={[
                { required: true, message: 'Field is required' },
                {
                  pattern: Rules,
                  message: 'Only numbers and characters are allowed',
                },
              ]}
              >
                <Input placeholder=" Enter Rack Name"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Rack Code" name="rackCode"
               rules={[
                { required: true, message: 'Field is required' },
                {
                  pattern: Rules,
                  message: 'Only numbers and characters are allowed',
                },
              ]}
              >
                <Input placeholder=" Enter Rack Code"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Unit" name="unit"
               rules={[
                { required: true, message: 'Field is required' },
                {
                  pattern: Rules,
                  message: 'Only numbers and characters are allowed',
                },
              ]}
              >
                <Input placeholder=" Enter unit"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Rack Type" name="rackType"
               rules={[
                { required: true, message: 'Field is required' },
                {
                  pattern: Rules,
                  message: 'Only numbers and characters are allowed',
                },
              ]}
              >
                <Input placeholder=" Rack Type"/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                onClick={clearData}
              >
                Reset
              </Button>
            </Col>
          </Row>
      </Form>
      </Card>
    </div>
  )
}

export default RackForm