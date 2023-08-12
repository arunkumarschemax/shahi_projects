
import { Card, Col, Row, theme } from "antd"
import ChangesGrid from "../../excel-import/changes-grid"
import VersionChanges from "../../excel-import/version-wise-table"
import { DivisionWiseOrders } from "../../common/dashboards/division-wise-orders"
import { PlantWisePoOrderGraph } from "./plant-wise-po"
import { StatusWiseOrders } from "./status-wise-items"
const { useToken } = theme

export const NikeDashboard = () => {
    const { token: { colorPrimary } } = useToken()
    return (
        <>
            {/* <div>
                <Card title={<span style={{ color: 'white' }}>Dashboard</span>} headStyle={{ backgroundColor: colorPrimary, border: 0 }}>
                </Card>
            </div> */}
            <Card>
                <Row gutter={24}>
                    <Col className="cardComp" xs={24} sm={24} md={24} xl={24}>
                        <div >
                            <PlantWisePoOrderGraph />
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} xl={24}>
                        <StatusWiseOrders />
                    </Col>

                </Row>
                <br />
                {/* <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} xl={10}>
                        <ItemChanges />
                    </Col>
                    <Col xs={24} sm={24} md={24} xl={14}>
                        <VersionChanges />
                    </Col>
                </Row> */}
            </Card>
        </>

    )
}