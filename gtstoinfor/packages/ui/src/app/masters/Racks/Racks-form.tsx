import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import {   useNavigate } from 'react-router-dom'

const RackForm = () => {

const navigate=useNavigate()
// const [form] = Form.useForm();

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
        <Form  layout={'vertical'}>
      <Row gutter={24}>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Rack Name" name="rackName"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Rack Code" name="rackCode"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Unit" name="unit"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Rack Type" name="rackType"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                // onClick={clearData}
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