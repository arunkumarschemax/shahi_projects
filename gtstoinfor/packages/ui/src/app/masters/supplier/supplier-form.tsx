import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { offset } from 'highcharts';
import SupplierService from 'packages/libs/shared-services/src/supplier/supplier-service';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

export function SupplierForm() {
    const navigate = useNavigate();
    const pathToreDirect = '/masters/supplier/supplier-view'

    const service = new SupplierService();
    const [form] = Form.useForm();


    const onFinish = (values) => {
        form.validateFields().then(values => {
            service.create(values).then(res => {
                console.log(values, "valuessssssssssssssssssssss")

                if (res.status) {
                    AlertMessages.getSuccessMessage("Created Successfully")
                    setTimeout(() => {
                        navigate(pathToreDirect)
                    }, 500);
                } else {
                    AlertMessages.getErrorMessage("Failed")
                }
            }).catch(err => console.log(err.message, "err message"));
        })
    }
    const handleReset = () => {
        form.resetFields();
    }

    return (


        <Card
            extra={<span><Button type='primary' onClick={() => navigate('/masters/supplier/supplier-view')}>View</Button></span>} headStyle={{ backgroundColor: 'lightblue', height: '50px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'center' }}>Suppliers</h4>}>
            <Form layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Form.Item name="id" hidden={true} >
                        <Input />
                    </Form.Item>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="category" label="Category"
                        // rules={[{ required: true },]}
                        >
                            <Select placeholder="Select Category" style={{ width: 150 }}>
                                <Select.Option value="">''</Select.Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="supplierCode" label="Supplier Code"
                        >
                            <Input />
                        </Form.Item>

                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="supplierName" label="Supplier Name"
                        // rules={[{ required: true },]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="GstNumber" label="GST Number" >
                            <Input />

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="contactPerson" label="Contact Person" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="street" label="Street" >
                            <Input />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="apartment" label="Apartment" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="city" label="City" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="state" label="State" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="district" label="District" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="postalCode" label="Postal Code" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="commision" label="Commision" >
                            <Input />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="bankAccountNo" label="Bank Account No" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankIFSC" label="Bank IFSC" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankName" label="Bank Name" >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankBranch" label="Bank Branch" >
                            <Input />

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="contactNumber" label="Contact Number"
                            rules={[
                                { pattern: /^\d{10}$/ }
                            ]} >
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="email" label="Email" >
                            <Input />
                        </Form.Item>

                    </Col>

                </Row>
                <Row gutter={24}>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="creditPaymentPeriod" label="Credit Payment Period" >
                            <Input />
                        </Form.Item>

                    </Col>
                </Row>

                <Row style={{ textAlign: 'right', marginRight: '30px' }}>
                    <Col span={24}>
                        <Form.Item>
                            <Button htmlType='submit' style={{ marginRight: '18px', backgroundColor: ' green' }}>Submit</Button>

                            <Button htmlType='reset' onClick={handleReset} style={{ backgroundColor: ' red' }} >Reset</Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>

        </Card>

    )

}

export default SupplierForm;