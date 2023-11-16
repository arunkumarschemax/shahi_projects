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
    <Card title={props.isUpdate ? 'Update Factory' : 'Factories'}
    extra={props.isUpdate==true?"":<Link to='/global/factories/factories-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
    >
        <Form form={form} title='Factories' layout='vertical' onFinish={submitForm}  initialValues={props.factoryData}>
            <Row gutter={24}>
              <Form.Item name='id' style={{display:'none'}}>
                <Input hidden/>
              </Form.Item>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='name' label='Factory Name'  rules={[
                    {
                      required: true,
                      message:"Factory Name Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='address' label='Address'>
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
            {(props.isUpdate===false) &&
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          }
            </Col>
          </Row>
        </Form>

{/* <Form form={form } layout={'vertical'} initialValues={props.RangeData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="id" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row gutter={12}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="rangeCode"
                  label="Range Code"
                  rules={[
                    {
                      required: true,
                      message:"Range Code Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Range Code'/>
                </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="rangeDescription"
                  label="Range Description"
                  rules={[
                    {
                      required: true,
                      message:"Range Description Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Range Description'/>
                </Form.Item>
        </Col>
      </Row>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
            {(props.isUpdate===false) &&
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          }
            </Col>
          </Row>
      </Form> */}
    </Card>
   
  )
}
