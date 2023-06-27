import { Button, Card, Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function FactoriesForm() {
  const navigate = useNavigate();
  return (
    <Card title='Add factory' extra={<span><Button onClick={() => navigate('/masters/factories/factories-view')} type={'primary'}>View</Button></span>}>
        <Form title='Factories' layout='vertical'  >
            <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='name' label='Name'>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='address' label='Address'>
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
        </Form>
    </Card>
   
  )
}
