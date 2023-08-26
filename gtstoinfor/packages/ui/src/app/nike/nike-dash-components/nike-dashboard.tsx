
import { Card, Col, Row, theme, Descriptions } from "antd"
import { PlantWisePoOrderGraph } from "./plant-wise-po"
import { StatusWiseOrders } from "./status-wise-items"
import { CategoryWiseItemQtyGraph } from "./category-wise-item-qty"
import { ShipmentGraph } from "./shipment-tracker"
import { ShipmentPlanWisePoOrderGraph } from "./plan-shipment"
import { DestinationWisePoOrderGraph } from "./destination-wise-po"
import { SeasonWisePoOrderGraph } from "./season-wise-po"
import { NikeService } from "@project-management-system/shared-services"
import { useEffect, useState } from 'react';
import moment from "moment"
import PoQuantityWiseGraph from "./po-quantity-dwmq-wis"
const { useToken } = theme

export const NikeDashboard = () => {
    const { token: { colorPrimary } } = useToken()
    const nikeService = new NikeService();
    const [filesData, setFilesData] = useState([])

    useEffect(() => {
        getUploadFilesData();
    }, [])

    const getUploadFilesData = () => {
        nikeService.getUploadFilesData().then((res) => {
            if (res.status) {
                setFilesData(res.data)
                // message.success(res.internalMessage)
            }
        })
    }

    return (
        <>
            <Card title="DASHBOARDS">
                <span>
                    <Descriptions style={{ alignItems: 'right' }}>
                        <Descriptions.Item>{<b>Last Data Sync Details</b>}</Descriptions.Item>
                        <Descriptions.Item label={<b>File Name</b>}>
                            {filesData[0]?.fileName}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Data Sync Date & Time</b>}>
                            {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Descriptions.Item>
                    </Descriptions>
                </span>
            </Card>
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
            <Card>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <PoQuantityWiseGraph />
                    </Col>

                </Row>
            </Card>
        </>

    )
}
