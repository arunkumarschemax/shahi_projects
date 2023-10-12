import { Card, Col, Row } from 'antd';
import AutomatedInvSummery from './automated-inv-summery';

export const LandingPageDashBoard = () => {
    return (
        <Card title="Dashboard" className='default-card-class'
            style={{ overflow: 'auto' }}
            bodyStyle={{ overflow: 'auto', height: '90vh' }}
        >
            <Row style={{ paddingTop: '1rem' }}>
                <Col span={12}>
                    <AutomatedInvSummery  key={1} />
                </Col>
                <Col span={12}>
                    <AutomatedInvSummery  key={2} />
                </Col>
            </Row>

        </Card>
    )
}

export default LandingPageDashBoard;