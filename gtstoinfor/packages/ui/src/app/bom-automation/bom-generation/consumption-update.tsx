import { UOMEnum, UpdatedConsumptions, updateItemId } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Col, Drawer, InputNumber, Modal, Row, Select, Table, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import UOMConversion from './uom-convserion-form';
import ConsumptionForms from './consumption-forms';

type Props = {
    setItemId: (value: any) => void
    setTrimWiseConsumptions: (value: any) => void
    distinctValues: any
    generateBom: () => void;
    poLines: string[]
    updatedSizes: any[]
}

export default function ConsumptionUpdate(props: Props) {
    const service = new BomService();
    const [trims, setTrims] = useState<any>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [viewModal, setViewModal] = useState<boolean>(false)

    useEffect(() => {
        getAllTrims();
    }, [])


    const getAllTrims = () => {
        service.getAllConsumptionRequiredTrims().then(res => {
            if (res.status) {
                setTrims(res.data);
            }
        })
    }


    function openConversionModal() {
        setViewModal(true)
    }

    function closeConversionModal() {
        setViewModal(false)
    }

    function setActiveKey(activeKey) {
        props.setItemId(activeKey)
    }
    return (
        <>
            {/* <Row gutter={24} justify={'end'}>
                <Col span={5}>
                    <Typography.Link onClick={openConversionModal}>{"Conversion tool >>"}</Typography.Link>
                </Col>
            </Row> */}
            {/* <Table className="custom-table-wrapper"
                    size='small'
                    //  pagination={false}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 450 }}
                    bordered
                    columns={columns}
                    dataSource={trims} /> */}
            <Tabs
                
                
                tabPosition={'left'}
                onChange={setActiveKey}
                style={{ height: 420, left: 0 }}
                items={trims.map((v, i) => {
                    const id = v.itemId;
                    return {
                        label: v.item,
                        key: id,
                        children: <>
                       { v.consumptionRequired ?<Typography.Link onClick={openConversionModal}>{"Converter"}</Typography.Link> : <></>}
                        <ConsumptionForms updatedSizes={props.updatedSizes} poLines={props.poLines} generateBom={props.generateBom} setTrimWiseConsumptions={props.setTrimWiseConsumptions} itemDetails={v} distinctValues={props.distinctValues} key={id} /></>,
                    };
                })}
            />
            <Modal style={{ top: 20, right: 20 }} width={'50%'} open={viewModal} closable onCancel={closeConversionModal} footer={false} >
                <UOMConversion />
            </Modal>
        </>
    )
}
