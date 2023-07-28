import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { offset } from 'highcharts';
import SupplierService from 'packages/libs/shared-services/src/supplier/supplier-service';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

export function SupplierForm( ) {
    const navigate = useNavigate();
    const pathToreDirect = '/masters/supplier/supplier-view'

    const service = new SupplierService();
    const [form] = Form.useForm();


    const submitHandler = () => {
        form.validateFields().then(values => {
            service.create(values).then(res => {
                if (res) {
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
                 onFinish={submitHandler}
                >
                    <Row gutter={24}>
                        <Form.Item name="id" hidden={true} >
                            <Input />
                        </Form.Item>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                            <Form.Item style={{ marginBottom: "-30px" }} name="category" label="Category"
                                // rules={[{ required: true },]}
                                >
                            </Form.Item>
                            <Select placeholder="Select Category" style={{ width: 150 }}>
                                <Select.Option value="suplier">Suplier</Select.Option>
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
                                // rules={[{ required: true },]}
                                >
                            </Form.Item>
                            <Input />
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item style={{ marginBottom: "-30px" }} name="GstNumber" label="GST Number" >
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

                                <Button htmlType='reset'  onClick={handleReset} style={{ backgroundColor: ' red' }} >Reset</Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Card>

        )
    
}

export default SupplierForm;