import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag, Statistic, Modal, TreeSelect, Tooltip, Checkbox, Popconfirm, Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react'


const DivertDataEntry = () => {
    const [form] = Form.useForm();
    const service = new NikeService();

    useEffect(() => {

    }, [])

    const submitData = () => {
        const req = form.getFieldsValue()
        service.updateDivertData(req).then(res => {
            if (res.status) {
                onReset()
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <>
            <Card title="Divert Report Data Insertion" headStyle={{ color: 'black', fontWeight: 'bold' }}>
                <Form
                    onFinish={submitData}
                    form={form}
                    layout='vertical'>
                    <Card>
                        <Row gutter={24} style={{ paddingTop: '10px' }}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
                                <Form.Item label="Request Date" name="requestDate">
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                                <Form.Item name='item' label='Item' >
                                    <Select showSearch placeholder="Select Item" optionFilterProp="children" allowClear mode='multiple'>
                                        {item?.map((inc: any) => {
                                            return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                                <Form.Item name='factory' label='Factory' >
                                    <Select
                                        showSearch
                                        placeholder="Select Factory"
                                        optionFilterProp="children"
                                        allowClear
                                    >
                                        {factory?.map((inc: any) => {
                                            return <Option key={inc.id} value={inc.factory}>{inc.factory}</Option>
                                        })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col> */}
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                                <Form.Item name='oldPoNumber' label='From PO Number' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} >
                                <Form.Item name='oldPoLineItemNo' label='From PO Line Item Number' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                                <Form.Item name='oldQty' label='Old Quantity' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
                                <Form.Item name='balQty' label='Balance Qty' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                                <Form.Item name='newPoNumber' label='To PO Number' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} >
                                <Form.Item name='newPoLineItemNo' label='To PO Line Item Number' >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 10 }} style={{ padding: '15px' }}>
                                <Form.Item>
                                    <Button htmlType="submit"
                                        icon={<SearchOutlined />}
                                        type="primary">Submit</Button>
                                    <Button
                                        htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={onReset}
                                    >
                                        RESET
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </Card>
        </>
    )
}

export default DivertDataEntry;
