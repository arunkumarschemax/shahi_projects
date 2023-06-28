import { FactoryService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import FactoriesView from './factories-view';
import { FactoryDto } from '@project-management-system/shared-models';

export default function FactoriesForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const factoryService = new FactoryService()

  const submitForm = (values) => {
    const factoriesDto = new FactoryDto(null,values.name,values.address,'admin',true)
    factoryService.createFactory(factoriesDto).then((res) => {
      if(res.status){
        message.success(res.internalMessage)
      }else{
        message.error(res.internalMessage)
      }
    }).catch((err) => {
      message.error('Something went wrong')
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Card title='Add factory' extra={<span><Button onClick={() => navigate('/masters/factories/factories-view')} type={'primary'}>View</Button></span>}>
        <Form form={form} title='Factories' layout='vertical' onFinish={submitForm}  >
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
            <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
            </Row>
        </Form>
    </Card>
   
  )
}
