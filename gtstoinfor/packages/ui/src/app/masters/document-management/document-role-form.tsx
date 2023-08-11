import React, { useEffect, useState } from 'react';
import { Card, Form, Select, Button, Row, Col, Input, message, MessageArgsProps } from 'antd';
import { Link } from 'react-router-dom';
import DocumentService from 'packages/libs/shared-services/src/document-service/document-shared-service';
const { Option } = Select;

const DocumentForm = () => {
    useEffect(() => {
        getDocuments();

    }, []);


    const [data, setRoleData] = useState<any>([]);

const services = new DocumentService ();
const [form] = Form.useForm();

    // const handleSubmit = (values: any) => {
    //     console.log('Form values:', values);

    //     form.resetFields();
    // };
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


    const getDocuments = () => {
        services.getAllDocuments()
            .then((res) => {
                console.log(res, 'dddddddddddddd')
                console.log(res.data, '"gggg')

                setRoleData(res.data);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    const handleReset = () => {
        form.resetFields();
    };


    return (
        <div>
            <Card title="department Form"
                extra={
                    <Link to='/navpage/Department-data' >
                        <span style={{ color: "white" }}>
                            <Button>Grid</Button>
                        </span>
                    </Link>
                }>
                <Form
                    form={form}
                    onFinish={onFinish}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item name="role" label="Role"
                                rules={[
                                    { required: true, message: "Enter role Name" },
                                    
                                    {
                                        message: "role should contain only letters",
                                        pattern: /^[A-Za-z]+$/,
                                    },
                                ]}>
                               <Input/>
                            </Form.Item>
                            </Col>
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
                               <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="select DepartmentName">

                                    {data?.
                                        filter((item: any, index: any, self: any[]) => self.findIndex(i => i === item) === index)
                                        .map(item => {
                                            return (
                                                <Option
                                                    value={item}>

                                                    {item}
                                                </Option>
                                            )
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item
                                name="departmentCode"
                                label="Department Code"
                                style={{ height: '30px' }}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="select departmentCode">

                                    {data?.
                                        filter((item, index, self) => self.findIndex(i => i === item) === index)

                                        .map(item => {
                                            return (
                                                <Option
                                                    value={item} key={Date.now()}>


                                                </Option>
                                            )
                                        })}
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>

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