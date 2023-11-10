import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const QualityForm = () => {

    const navigate = useNavigate()

    return (
        <div>
            <Card title={<span>QUALITY</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
                className="card-header"
                extra={<Button
                    onClick={() => navigate('/masters/quality-view')}
                    type="primary"
                    style={{ background: "white", color: "#3C085C" }}
                >View</Button>
                }>
                <Form >
                    <Row>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Form.Item label="Quality" name="quality">  
                                <Input placeholder=" Enter Quality " />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default QualityForm