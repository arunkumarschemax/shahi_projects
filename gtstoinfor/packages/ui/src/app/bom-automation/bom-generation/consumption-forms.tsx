import { UOMEnum } from '@project-management-system/shared-models'
import { Col, Form, Input, InputNumber, Row, Select, Table } from 'antd'
import React from 'react'
import UOMConversion from './uom-convserion-form'

type Props = {
    selectedStyles: string[],
    itemId: number
}
export default function ConsumptionForms(props: Props) {

    const { selectedStyles, itemId } = props


    const handleFieldChange = (consumption: number, style: string,uom?:UOMEnum) => {
        const consumptions: { style: string, consumption: number, itemId: number }[] = []
        const consmptionObj = { style, consumption, itemId }
        consumptions.push(consmptionObj)
        console.log(consumptions)
    };

    function UOMDropdown(record) {
        return <Select key={record.id} onChange={value => handleFieldChange(value, record.style)} style={{ width: '100px' }} placeholder='Select UOM' >
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
                onChange={(value:any) => handleFieldChange(Number(value), r.style)}
                key={r.id}
            />
        }
    ]
    return (
        <Row gutter={24} justify={'center'}>
            <Col span={24}>
                <Table bordered pagination={false} columns={columns} dataSource={selectedStyles.map((v) => { return { style: v } })} />
            </Col>

        </Row>
    )
}
