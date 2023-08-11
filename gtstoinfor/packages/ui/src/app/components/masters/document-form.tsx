import React from 'react';
import { Card, Form, Radio, Select, Button, Row, Col, DatePicker, Input, message, MessageArgsProps } from 'antd';
import { Link } from 'react-router-dom';
import DocumentService from 'packages/libs/shared-services/src/document-service/document-shared-service';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const DocumentForm = () => {

const services = new DocumentService ();
const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        console.log('Form values:', values);

        form.resetFields();
    };
    const onFinish = (values: any) => {
        services.createForm(values).then(res => {
            if (res.status) {
                setTimeout(() => {
                    message.success("Created Successfully");
                    form.resetFields();
                }, 1000);
            } else {
                message.error(res.internalMessage);
            }
        }).catch((err: { message: any; }) => {
            console.log(err.message);
            alert(err.message)
        })

    };
    const handleReset = () => {
        form.resetFields();
    };

    const [form] = Form.useForm();

    return (
        <div>
            <Card title="department Form"

        extra={<span><Button onClick={() => navigate('/masters/document-management/document-grid')} type={'primary'}>View</Button></span>}>

                <Form
                    // autoComplete='off'
                    form={form}
                    onFinish={onFinish}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item name="documentName" label="Document Name"
                                rules={[
                                    { required: true, message: "Enter Document Name" },
                                    {
                                        message: "Document should contain only letters",
                                        pattern: /^[A-Za-z]+$/,
                                    },
                                ]}>
                               <Input/>
                            </Form.Item>
                        </Col>

                       
                       
                       
                    </Row>

                    <Row justify="end">
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>

                                <Button htmlType="reset" onClick={handleReset} >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

        </div>
    );
};

export default DocumentForm;