import { M3MastersReq } from "@project-management-system/shared-models"
import { M3MastersService } from "@project-management-system/shared-services"
import { Button, Card, Col, Form, Input, Row } from "antd"
import { useNavigate } from "react-router-dom"
import AlertMessages from "../common/common-functions/alert-messages"

export const M3Masters = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const service = new M3MastersService()

    const onSubmit = (val) => {
        const req = new M3MastersReq(val.category,val.m3Code)
        service.create(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                form.resetFields()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    return(
        <Card extra={<span><Button onClick={() => navigate('/m3-masters-view')} type={'primary'}>View</Button></span>} className="card-header">
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='category' label='Category' rules={[{required:true,message:'Category is required'}]}>
                            <Input placeholder="Enter Category"/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='m3Code' label='M3 Code' rules={[{required:true,message:'M3 is required'}]}>
                            <Input placeholder="Enter M3 Code"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button danger>Reset</Button>
                </Col>
                </Row>
            </Form>

        </Card>
    )

}

export default M3Masters