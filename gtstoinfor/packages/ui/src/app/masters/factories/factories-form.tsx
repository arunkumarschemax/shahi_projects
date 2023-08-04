import { FactoryService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FactoriesView from './factories-view';
import { AlertMessages, FactoryDto } from '@project-management-system/shared-models';


export interface FactoryFormprops {
  Data: FactoryDto;
  updateItem: (Data:FactoryDto ) => void;
  isUpdate: boolean;
  closeForm: () => void;
}


export  function FactoriesForm( props:FactoryFormprops) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new FactoryService();
  const [disable,setDisable] = useState<boolean>(false)
  const pathToreDirect = '/masters/supplier/factories-view'

  // const submitForm = (values) => {
  //   const factoriesDto = new FactoryDto(null,values.name,values.address,'admin',true)
  //   factoryService.createFactory(factoriesDto).then((res) => {
  //     if(res.status){
  //       form.resetFields()
  //       message.success(res.internalMessage)
  //     }else{
  //       message.error(res.internalMessage)
  //     }
  //   }).catch((err) => {
  //     message.error('Something went wrong')
  //   })
  // }
  const create = (data: FactoryDto) =>{
    setDisable(true)
    service.createFactory(data).then(res => {
      console.log(res,'resssss')
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage("Created Successfully")
                setTimeout(() => {
                    navigate(pathToreDirect)
                }, 500);
      }else {
        AlertMessages.getErrorMessage("Failed")
    }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  const saveData = (values: FactoryDto) => {
    setDisable(false)
    if(props.isUpdate){
      console.log(values,'--------------values')
      props.updateItem(values);
    }else{
      setDisable(false)
      create(values);
    }
  };

 const submitForm = (values : FactoryDto ) =>{
    setDisable(false)

    if(props.isUpdate){
      props.updateItem(values)
    } else {
        setDisable(false)
        saveData(values)

    }

 } 
  const onReset = () => {
    form.resetFields()
  }

  return (
    
    <Card title='Add factory' extra={<span><Button onClick={() => navigate('/masters/factories/factories-view')} type={'primary'}>View</Button></span>}>
        <Form form={form}
         title='Factories'
          layout='vertical'
           onFinish={submitForm} 
           initialValues={props.Data} >
            <Row gutter={24}>
            <Form.Item name='id' hidden={true}>
                  <Input/>
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
export default FactoriesForm;
