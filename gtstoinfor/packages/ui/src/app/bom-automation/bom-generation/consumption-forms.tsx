import { BomGenerationReq, UOMEnum } from '@project-management-system/shared-models'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, message } from 'antd'
import React, { Suspense, useState } from 'react'
import UOMConversion from './uom-convserion-form'
import { DownloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { BomService } from '@project-management-system/shared-services'

type Props = {
    selectedStyles: string[],
    itemId: number,
    poLines: string[]
    printComponent: string
    setTrimWiseConsumptions: (consumptions: any) => void
    generateBom: () => void
    updatedSizes : any[]

}
export default function ConsumptionForms(props: Props) {

    const { selectedStyles, itemId, setTrimWiseConsumptions, poLines,printComponent,updatedSizes } = props
    const [consumptions, setConsumptions] = useState<any[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [DynamicComponent, setDynamiComponent] = useState<any>(null)
    const bomService = new BomService()

    const handleFieldChange = (value: any, style: string, field: string) => {
        const existingIndex = consumptions.findIndex(item => item.style === style);
        const newConsumption = { style, itemId, [field]: value };
        if (existingIndex !== -1) {
            const updatedConsumptions = [...consumptions];
            updatedConsumptions[existingIndex][field] = value;
            setConsumptions(updatedConsumptions);
        } else {
            setConsumptions([...consumptions, newConsumption]);
        }
        setTrimWiseConsumptions(consumptions)
    };


    function UOMDropdown(record) {
        return <Select key={record.id} onChange={value => handleFieldChange(value, record.style, "uom")} style={{ width: '100px' }} placeholder='Select UOM' >
            {
                Object.values(UOMEnum).map((v) => {
                    return <Select.Option key={v} value={v}>{v}</Select.Option>
                })
            }
        </Select>
    }

    const columns = [
        {
            title: 'Style',
            dataIndex: 'style'
        }, {
            title: 'Consumption',
            render: (v, r) => <InputNumber addonBefore={UOMDropdown(r)}
                onChange={(value: any) => handleFieldChange(Number(value), r.style, "consumption")}
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
            }else{
                message.info(res.internalMessage)
            }
        })
    }

    function onGenerateBom() {
        // Convert consumptions array to a Map for easier lookup
        const consumptionsMap = new Map(consumptions.map(item => [item.style, item]));

        // Check if all selected styles have corresponding entries in consumptions array
        for (const style of selectedStyles) {
            if (!consumptionsMap.has(style)) {
                break // Style not found in consumptions array
            }

            const consumptionEntry: any = consumptionsMap.get(style);
            if (!consumptionEntry?.consumption || !consumptionEntry?.uom) {
                break// Missing consumption or uom value
            }
        }
        generateBom()
      
        
    }

    const onView = () => {
        setDynamiComponent(null)
        // console.log(printComponent,"at 103")
        const Comp = React.lazy(() => import(`../../trims/trim-prints/${printComponent}`))
        // console.log(Comp," at 105")
        setDynamiComponent(Comp)
        setModalOpen(true)
    }

    function onCancel() {
        setModalOpen(false)
    }

    // console.log(poLines,'po lines')


    return (
        <Row gutter={[24, 24]} justify={'center'}>
            <Col span={24}>
                <Table rowKey={(row) => row.style} bordered pagination={false} columns={columns} dataSource={selectedStyles.map((v) => { return { style: v } })} />
            </Col>
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
