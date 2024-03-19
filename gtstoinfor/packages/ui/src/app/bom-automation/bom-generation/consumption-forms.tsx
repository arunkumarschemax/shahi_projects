import { BomGenerationReq, UOMEnum } from '@project-management-system/shared-models'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Tag, message } from 'antd'
import React, { Suspense, useState } from 'react'
import UOMConversion from './uom-convserion-form'
import { DownloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { BomService } from '@project-management-system/shared-services'

type Props = {
    distinctValues: any,
    poLines: string[]
    itemDetails: any
    setTrimWiseConsumptions: (consumptions: any) => void
    generateBom: () => void
    updatedSizes: any[]

}

export default function ConsumptionForms(props: Props) {

    const { distinctValues, setTrimWiseConsumptions, poLines, itemDetails, updatedSizes } = props
    const { itemId, printComponent, consumptionAgainst, uom, consumptionRequired } = itemDetails
    const { distinctStyles, distinctItems } = distinctValues
    const [consumptions, setConsumptions] = useState<any[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [DynamicComponent, setDynamiComponent] = useState<any>(null)
    const bomService = new BomService()
    const handleFieldChange = (value: any, styleOrItem: string, field: string) => {
        const existingIndex = consumptions.findIndex(item => item[consumptionAgainst] === styleOrItem);
        const newConsumption = { [consumptionAgainst]: styleOrItem, consumptionAgainst, itemId, [field]: value, uom };
        if (existingIndex !== -1) {
            const updatedConsumptions = [...consumptions];
            updatedConsumptions[existingIndex][field] = value;
            setConsumptions(updatedConsumptions);
        } else {
            setConsumptions([...consumptions, newConsumption]);
        }
        setTrimWiseConsumptions(consumptions)
    };


    // function UOMDropdown(record) {
    //     console.log(record,"record")
    //     return <Select defaultValue={uom} key={record.id} disabled style={{ width: '100px' }} placeholder='Select UOM' >
    //         {
    //             Object.values(UOMEnum).map((v) => {
    //                 return <Select.Option key={v} value={v}>{v}</Select.Option>
    //             })
    //         }
    //     </Select>
    // }
    function UOMDropdown(record) {
        return (
            <Select defaultValue={uom} style={{ width: '100px' }} placeholder='Select UOM'>
                {Object.values(UOMEnum).map((v, index) => ( 
                    <Select.Option key={index} value={v}>{v}</Select.Option>
                ))}
            </Select>
        );
    }
    
    const columns = [
        {
            title: consumptionAgainst,
            dataIndex: 'value'
        }, {
            title: 'Consumption',
            render: (v, r) => <InputNumber addonBefore={UOMDropdown(r)}
                onChange={(value: any) => handleFieldChange(Number(value), r.value, "consumption")}
                key={r.id}
            />
        }
    ]

    const generateBom = () => {
        const req = new BomGenerationReq()
        req.poLine = poLines
        req.updatedConsumptions = consumptions
        req.updatedSizes = updatedSizes
        req.itemId = Number(itemId)
        bomService.generateBom(req).then((res) => {
            if (res.status) {
                onView()
                message.success('Bom generated sucessfully', 3)
                // setCurrent(current + 1);
            } else {
                message.info(res.internalMessage)
            }
        })
    }
    // console.log(consumptions)
    function onGenerateBom() {
        // Convert consumptions array to a Map for easier lookup
        generateBom()
    }

    function handleDynamicDataSource() {
        if (consumptionAgainst == 'item') {
            return distinctItems.map((v) => { return { value: v } })
        } else {
            return distinctStyles.map((v) => { return { value: v } })
        }
    }

    const onView = () => {
        setDynamiComponent(null)
        //  console.log(printComponent,"at 103")
        const Comp = React.lazy(() => import(`../../trims/trim-prints/${printComponent}`))
        // console.log(Comp," at 105")
        setDynamiComponent(Comp)
        setModalOpen(true)
    }

    function onCancel() {
        setModalOpen(false)
    }
    return (
        <Row gutter={[24, 24]} justify={'center'}>
            <Col span={24} >
                { consumptionRequired ?
                    <Table rowKey={(row) => row.style} bordered pagination={false} columns={columns} dataSource={handleDynamicDataSource()} /> 
                    : 
                    <Tag>Consumption not required,Download the O/P</Tag>
                }            </Col>
            {/* <Col span={4}>
                <Button icon={<DownloadOutlined />} onClick={props.generateBom} type='primary'>Download BOM </Button>
            </Col> */}
            <Col span={4}>
                <Button icon={<DownloadOutlined />} onClick={onGenerateBom} type='primary'>View BOM </Button>
            </Col>
            <Modal key={moment().format("dd-mm-yyy hh:mm:ss")} open={modalOpen} onCancel={onCancel} onOk={() => setModalOpen(false)} footer={[]} width={'85%'}>
                <div>
                    {DynamicComponent ? (
                        <Suspense fallback={<p>Loading..</p>}>
                            <DynamicComponent itemId={itemId} poLines={poLines} />
                        </Suspense>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            </Modal>

        </Row>
    )
}
