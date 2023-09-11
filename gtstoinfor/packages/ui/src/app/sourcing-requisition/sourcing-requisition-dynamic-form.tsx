import { Card, Col, Form, Input, Row, Segmented } from "antd"

export const SourcingRequisitionDynamicForm = () => {

    return(
        <Card title='Sourcing Requisition'>
            <Form>
                <Row gutter={8}>
                    <Col>
                    <Form.Item name='style' label='Style'>
                        <Input/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Segmented options={['Fabric','Trim']}>
                        
                    </Segmented>
                </Row>
            </Form>
            
        </Card>
    )
}
export default SourcingRequisitionDynamicForm