
import { Card, Col, Row, theme } from "antd"
import ChangesGrid from "../../excel-import/changes-grid"
import VersionChanges from "../../excel-import/version-wise-table"
import { DivisionWiseOrders } from "../../common/dashboards/division-wise-orders"
import { PlantWisePoOrderGraph } from "./plant-wise-po"
import { StatusWiseOrders } from "./status-wise-items"
import { CategoryWiseItemQtyGraph } from "./category-wise-item-qty"
import { ShipmentGraph } from "./shipment-tracker"
import { ShipmentPlanWisePoOrderGraph } from "./plan-shipment"
import { DestinationWisePoOrderGraph } from "./destination-wise-po"
import { SeasonWisePoOrderGraph } from "./season-wise-po"
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
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <StatusWiseOrders />
                    </Col>
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <CategoryWiseItemQtyGraph />
                    </Col>
                   
                </Row>
            </Card>
            <Card>
                <Row gutter={24}>
                    
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <SeasonWisePoOrderGraph />
                    </Col>

                    <Col xs={24} sm={24} md={24} xl={12}>
                        <ShipmentPlanWisePoOrderGraph />
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row gutter={24}>
                    
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <DestinationWisePoOrderGraph />
                    </Col>

                    <Col xs={24} sm={24} md={24} xl={12}>
                        <ShipmentGraph />
                    </Col>
                </Row>
            </Card>
        </>

    )
}