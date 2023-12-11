
import { Card, Col, Row, theme } from "antd"
import { UnitWiseOrderGraph } from "./unit-wise-orders"
import { DivisionWiseOrders } from "./division-wise-orders"
import ChangesGrid from "../../excel-import/changes-grid"
import ItemChanges from "./item-change"
import VersionChanges from "../../excel-import/version-wise-table"
const { useToken } = theme

export const Dashboard = () => {
    const { token: { colorPrimary } } = useToken()
    return (
        <>
            {/* <div>
                <Card title={<span style={{ color: 'white' }}>Dashboard</span>} headStyle={{ backgroundColor: colorPrimary, border: 0 }}>
                </Card>
            </div> */}
            <Card>
                <Row gutter={24}>
                    <Col className="cardComp" xs={24} sm={24} md={8} xl={12}>
                        <div >
                            <UnitWiseOrderGraph />
                        </div>
                    </Col>
                    <Col className="cardComp" xs={24} sm={24} md={8} xl={12}>
                        <div >
                            <DivisionWiseOrders />
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} xl={24}>
                        <ChangesGrid />
                    </Col>

                </Row>
                <br />
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} xl={10}>
                        <ItemChanges />
                    </Col>
                    <Col xs={24} sm={24} md={24} xl={14}>
                        <VersionChanges />
                    </Col>
                </Row>
            </Card>
        </>

    )
}