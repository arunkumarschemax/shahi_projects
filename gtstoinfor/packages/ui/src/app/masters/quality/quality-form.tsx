import { QualityDTO } from '@project-management-system/shared-models'
import { QualityService } from '@project-management-system/shared-services'
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../common/common-functions/alert-messages'

const QualityForm = () => {

    const navigate = useNavigate()
    const service = new QualityService();
    const [form] = Form.useForm();

    const onFinish = (qualityDto: QualityDTO) => {
        service.createQuality(qualityDto).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage)
                setTimeout(() => {
                    message.success('Submitted successfully');
                    window.location.reload();
                    navigate("/masters/quality-view")
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
            <Card title={<span>QUALITY</span>} style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
                extra={<Button
                    onClick={() => navigate('/masters/quality-view')}
                    type="primary"
                    style={{ background: "white", color: "#3C085C" }}
                >View</Button>
                }>
                <Form form={form} onFinish={onFinish}>
                    <Row>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Form.Item label="Fabric Quality" name="quality">
                                <Input placeholder=" Enter Quality " />
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

export default QualityForm