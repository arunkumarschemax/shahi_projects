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
                        rules={[{ required: true },]}
                        >
                            <Select placeholder="Select Category" style={{ width: 150 }}>
                                <Select.Option value=" Supplier">Supplier</Select.Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="supplierCode" label="Supplier Code"
                        >
                            <Input placeholder='Enter Supplier Code' />
                        </Form.Item>

                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="supplierName" label="Supplier Name"
                            rules={[{ required: true },
                            { min: 3, message: 'Supplier Name must be at least 3 characters' }

                            ]}
                        >
                            <Input placeholder='Enter Supplier Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="GstNumber" label="GST Number"
                            rules={[
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: 'Please enter valid GstNumber',
                                },
                            ]}
                        >
                            <Input placeholder='Enter GstNumber ' />

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="contactPerson" label="Contact Person"
                            rules={[{ required: true },
                            { min: 3, message: 'Contact Person must be at least 3 characters' }

                            ]} >
                            <Input placeholder='Enter Contact person' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="street" label="Street"
                            rules={[
                                {
                                    min: 3,
                                    message: 'Street Name contains atleast 3 characters ',
                                },

                            ]}
                        >
                            <Input placeholder='Enter Street Name ' />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="apartment" label="Apartment"
                            rules={[
                                {
                                    min: 3,
                                    message: 'Apartment Name contains atleast 3 characters ',
                                },

                            ]}
                        >
                            <Input placeholder='Enter Apartment Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="city" label="City"
                            rules={[
                                {
                                    min: 3,
                                    message: 'City Name contains atleast 3 characters ',
                                },

                            ]}
                        >
                            <Input placeholder=' Enter city Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="state" label="State"
                            rules={[
                                {
                                    min: 3,
                                    message: 'State Name contains atleast 3 characters ',
                                },

                            ]}

                        >
                            <Input placeholder='Enter State Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="district" label="District"
                            rules={[
                                {
                                    min: 3,
                                    message: 'District Name contains atleast 3 characters ',
                                },

                            ]} >
                            <Input placeholder='Enter District Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="postalCode" label="Postal Code"
                            rules={[
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'Postal Code can only contain numbers',
                                },
                            ]}

                        >
                            <Input placeholder='Enter PostalCode' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="commision" label="Commision"
                            rules={[
                                {
                                    pattern: /^[0-9]+(%?)$/,
                                    message: 'Commission must be a number, optionally followed by a percentage sign (%)',
                                },
                            ]}
                        >
                            <Input placeholder='Enter Commision' />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="bankAccountNo" label="Bank Account No"
                            rules={[
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: 'Please enter valid bankAccountNo',
                                },
                            ]}
                        >
                            <Input placeholder='Enter Bank Account No' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankIFSC" label="Bank IFSC" >
                            <Input placeholder='Enter Bank IFSC code' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankName" label="Bank Name"
                            rules={[
                                {
                                    pattern: /^[A-Z][a-zA-Z\s]+$/,
                                    message: 'Bank Name should start with a capital letter and can only contain letters and spaces',
                                },
                            ]} >
                            <Input placeholder='Enter Bank Name' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="bankBranch" label="Bank Branch"
                            rules={[
                                {
                                    pattern: /^[A-Z][a-zA-Z\s]+$/,
                                    message: 'Bank Branch should start with a capital letter and can only contain letters and spaces',
                                },
                            ]} >
                            <Input placeholder='Enter  Bank Branch' />

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="contactNumber" label="Contact Number"
                            rules={[
                                { pattern: /^\d{10}$/ }
                            ]} >
                            <Input placeholder='Enter contact Number' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="email" label="Email"
                            rules={[
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address',
                                },
                            ]}
                        >
                            <Input placeholder='Enter Email' />
                        </Form.Item>

                    </Col>

                </Row>
                <Row gutter={24}>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="creditPaymentPeriod" label="Credit Payment Period"
                            rules={[
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: 'Credit Payment Period should contain only numbers',
                                },
                            ]}
                        >
                            <Input placeholder='Enter  creditPaymentPeriod' />
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