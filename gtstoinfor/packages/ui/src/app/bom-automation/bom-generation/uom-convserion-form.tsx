import { UOMEnum } from '@project-management-system/shared-models'
import { Card, Col, Form, Input, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertDimensions } from '../../utils/uom-conversion'
const { Option } = Select
export default function UOMConversion() {
    const [form] = Form.useForm()
    const [convertedValue, setConvertedValue] = useState<number>()

    useEffect(() => {
        return () => {
            setConvertedValue(null);
            form.resetFields()// Reset state
        };
    }, [])

    function convert(val) {
        const { fromUOM, toUOM, inputValue } = form.getFieldsValue()
        const value = convertDimensions(fromUOM, toUOM, inputValue)
        console.log(value)
        setConvertedValue(value)
    }
    
    return (
        <Card>

            <Form form={form} layout='vertical'>
                <Row gutter={24} justify={'center'}>
                    <Col span={12} >
                        <Form.Item name='fromUOM' label='From UOM' >
                            <Select style={{width:'100%'}} placeholder='select from uom' popupMatchSelectWidth >
                                {
                                    Object.values(UOMEnum).map((v) => {
                                        return <Option key={v} value={v}>{v}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='toUOM' label='To UOM'>
                            <Select  style={{width:'100%'}} placeholder='select from uom' popupMatchSelectWidth >
                                {
                                    Object.values(UOMEnum).map((v) => {
                                        return <Option key={v} value={v}>{v}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={'inputValue'} label='Value'>
                            <Input onChange={convert} type='number' />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={24} justify={'center'}>
                    <Col span={20}>
                        <Typography.Title copyable >{convertedValue}</Typography.Title>
                    </Col>

                </Row>
            </Form>
        </Card>
    )
}
