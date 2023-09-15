import { FactoryService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FactoriesView from './factories-view';
import { FactoryDto } from '@project-management-system/shared-models';

export interface FactoriesFormProps{
  factoryData: FactoryDto;
  updateFactory: (factoryData:FactoryDto)=>void
      isUpdate:boolean;
      closeForm:()=>void;
  
}

export default function FactoriesForm(props:FactoriesFormProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const factoryService = new FactoryService()

  console.log(props.factoryData)

  const submitForm = (values) => {
    if(props.isUpdate){
      props.updateFactory(values)
    } else{
      const factoriesDto = new FactoryDto(null,values.name,values.address,'admin',true)
      factoryService.createFactory(factoriesDto).then((res) => {
        if(res.status){
          form.resetFields()
          message.success(res.internalMessage)
        }else{
          message.error(res.internalMessage)
        }
      }).catch((err) => {
        message.error('Something went wrong')
      })
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Card title={props.isUpdate ? 'Update Factory' : 'Add factory'}
    extra={props.isUpdate==true?"":<Link to='/global/factories/factories-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
    >
        <Form form={form} title='Factories' layout='vertical' onFinish={submitForm}  initialValues={props.factoryData}>
            <Row gutter={24}>
              <Form.Item name='id' style={{display:'none'}}>
                <Input hidden/>
              </Form.Item>
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
