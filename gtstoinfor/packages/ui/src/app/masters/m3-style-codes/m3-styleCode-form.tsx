import React from 'react'
import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { M3StyleService } from '@project-management-system/shared-services'
import { M3StyleDTO } from '@project-management-system/shared-models'
import AlertMessages from '../../common/common-functions/alert-messages'

const M3StyleCode = () => {

    const navigate = useNavigate()
    const service = new M3StyleService();
    const [form] = Form.useForm();

    const onFinish = (m3StyleDto: M3StyleDTO) => {
        service.createM3Style(m3StyleDto).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage)
                setTimeout(() => {
                    message.success('Submitted successfully');
                    window.location.reload();
                    navigate("/masters/m3-styleCodes-view")
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
            <Card title={<span>M3 STYLE CODES</span>} style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
                extra={<Button
                    onClick={() => navigate('/masters/m3-styleCodes-view')}
                    type="primary"
                    style={{ background: "white", color: "#3C085C" }}
                >View</Button>
                }>
                <Form
                 form={form} onFinish={onFinish}
                 >
                    <Row>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 5 }}>
                            <Form.Item label="M3 Style Code" name="m3StyleCode">
                                <Input placeholder=" Enter Style Code " />
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

export default M3StyleCode