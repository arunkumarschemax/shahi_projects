import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HMStyleCreation = () => {

    const navigate=useNavigate()
  return (
    <div>
        <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/hm-style-view')}>View</Button></span>} headStyle={{  height: '40px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'left', padding: '20px' }}>HM STYLES</h4>}>
           <Form layout="vertical">
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
                
            </Form> 
        </Card>
    </div>
  )
}

export default HMStyleCreation