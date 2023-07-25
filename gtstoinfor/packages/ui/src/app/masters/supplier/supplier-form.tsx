import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { offset } from 'highcharts';
import React from 'react'

const SupplierForm = () => {


    const [form] = Form.useForm();


    const submitHandler = () => {

    }

    return (


        <Card
            extra={<span><Button href="">View</Button></span>} headStyle={{ backgroundColor: 'lightblue', height: '50px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'center' }}>Suppliers</h4>}>
            <Form layout="vertical" form={form}
            >
                <Row gutter={24}>
                    <Form.Item name="id" hidden={true} >
                        <Input />
                    </Form.Item>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="Category" label="Category"
                            rules={[
                                { required: true },
                            ]}
                        >
                        </Form.Item>
                        <Select placeholder="Select Category" style={{ width: 150 }}>
                            <Select.Option value="">''</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="supplierCode" label="Supplier Code"
                        >
                        </Form.Item>
                        <Input />
                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="supplierName" label="Supplier Name"
                            rules={[
                                { required: true },
                            ]}
                        >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="GSTNumber" label="GST Number" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="contactPerson" label="Contact Person" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="street" label="Street" >
                        </Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="apartment" label="Apartment" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="city" label="City" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="state" label="State" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="district" label="District" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="postalCode" label="Postal Code" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="commision" label="Commision" >
                        </Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="bankAccountNo" label="Bank Account No" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="bankIFSC" label="Bank IFSC" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="bankName" label="Bank Name" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="bankBranch" label="Bank Branch" >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="contactNumber" label="Contact Number"
                            rules={[
                                { pattern: /^\d{10}$/ }
                            ]} >
                        </Form.Item>
                        <Input />
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="email" label="Email" >
                        </Form.Item>
                        <Input />
                    </Col>

                </Row>
                <Row gutter={24}>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item style={{ marginBottom: "-30px" }} name="creditPaymentPeriod" label="Credit Payment Period" >

                        </Form.Item>
                        <Input />
                    </Col>
                </Row>

                <Row style={{ textAlign: 'right', marginRight: '30px' }}>
                    <Col span={24}>
                        <Form.Item>
                            <Button htmlType='submit' onClick={submitHandler} style={{ marginRight: '18px', backgroundColor: ' green' }}>Submit</Button>

                            <Button style={{ backgroundColor: ' red' }} htmlType='reset'>Reset</Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>

        </Card>

    )
}

export default SupplierForm;