import { HMStyleSharedService } from '@project-management-system/shared-services'
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../../common/common-functions/alert-messages'
import { HMStylesModelDto } from '@project-management-system/shared-models'

const HMStyleCreation = () => {

    const navigate=useNavigate()
    const service = new HMStyleSharedService();
    const [form] = Form.useForm();

    const onFinish = (hmDto: HMStylesModelDto) => {  
        console.log(hmDto,"staaaaaaaatussss");    
        service.createHMStyle(hmDto).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage)
                setTimeout(() => {
                    message.success('Submitted successfully');
                    window.location.reload();
                    navigate("/bom/hm-style-view")
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
        <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/hm-style-view')}>View</Button></span>} headStyle={{  height: '40px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'left', padding: '20px' }}>HM STYLES</h4>}>
           <Form layout="vertical" form={form} onFinish={onFinish}>
           <Row gutter={24}>
                    <Form.Item name="hmId" 
                    hidden={true} 
                    >
                        <Input />
                    </Form.Item>
                    
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="styleNumber" label="Style Number"
                        >
                            <Input placeholder='Enter Style Number' />
                        </Form.Item>

                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="teflonSheetSize" label="Teflon Sheet Size"
                        
                        >
                            <Input placeholder='Enter Teflon Sheet Size' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="consumption" label="Consumption"
                          
                        >
                            <Input placeholder='Enter Color Consumption ' />

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

export default HMStyleCreation