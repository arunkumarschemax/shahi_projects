import { FactoryService, FobService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import FactoriesView from './factories-view';
import { AlertMessages, FactoryDto, Fobdto } from '@project-management-system/shared-models';


export interface Formprops {
  Data: Fobdto;
  updateItem: (Data:Fobdto ) => void;
  isUpdate: boolean;
  closeForm: () => void;
}


export  function FobPriceListForm( props:Formprops) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new FobService();
  const [disable,setDisable] = useState<boolean>(false)
//   const pathToreDirect = '/masters/fob-price-list-view'

  
  const create = (data: Fobdto) =>{
    setDisable(true)
    service.createFobplist(data).then(res => {
      setDisable(false)
      if(res.status){
        AlertMessages.getSuccessMessage("Created Successfully")
                setTimeout(() => {
                    navigate('/masters/fob-price-list-view')
                }, 500);
      }else {
        AlertMessages.getErrorMessage("Data Already Exist")
    }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  const saveData = (values: Fobdto) => {
    setDisable(false)
    if(props.isUpdate){
      props.updateItem(values);
    }else{
      setDisable(false)
      create(values);
    }
  };

 const submitForm = (values : Fobdto ) =>{
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
    
    <Card title='Add Fob Price List' extra={<span><Button onClick={() => navigate('/masters/fob-price-list-view')} type={'primary'}>View</Button></span>}>
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
                <Form.Item name='planningSeasonCode' label='Planning Season Code'
                 rules={[{ required: true, message: 'Please enter the Planning Season Code', },
                    {
                        
                        message: 'Please enter a valid code ',
                      },
                  ]}>
                  <Input placeholder='Planning Season Code'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item name='planningSeasonYear' label='Planning Season Year'
                   rules={[
                            { required: true, message: 'Please enter the Planning Season Year', },
                           { pattern: /^[0-9]{4}$/,  
                            message: 'Please enter a valid 4-digit year', },
                           ]}>
                    <Input placeholder='Planning Season Year' /></Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='styleNumber' label='Style Number'
                                 rules={[{ required: true, message: 'Please enter the Style Number', }]}>
                <Input placeholder='Style Number'
                 />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='colorCode' label='Color Code'  rules={[{ required: true, message: 'Please enter the Color Code', },]}>
                <Input placeholder='Color Code'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='sizeDescription' label='Size Description'  rules={[{ required: true, message: 'Please enter the Color Code', },]}>
                <Input placeholder='Size Description'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='shahiConfirmedGrossPrice' label='Shahi Confirmed Gross Price'
                 rules={[{ required: true, message: 'Please enter the Color Code', },
                  { pattern: /^(?!0\d)(\d{1,5}(\.\d{2})?)?$/,  
                  message: 'Please enter a valid price 00.00 type is required', }
                 ]}>
                <Input placeholder='Shahi Confirmed Gross Price' />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='shahiConfirmedGrossPriceCurrencyCode' label='Shahi Confirmed Gross Price Currency Code'
                                 rules={[{ required: true, message: 'Please enter the Color Code' },
                                 {
                                    pattern: /^[A-Z]{0,5}$/,
                                    message: 'Please enter up to 5 capital letters',
                                  }
                                 ]}
                                  >
                <Input  placeholder='Shahi Confirmed Gross Price Currency Code'/>
                </Form.Item>
              </Col>
            </Row>
            <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset} style={{ backgroundColor: ' red' }}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit' style={{ backgroundColor: ' green' }} >Submit</Button></Col>
            </Row>
        </Form>
    </Card>
   
  )
}
export default FobPriceListForm;
