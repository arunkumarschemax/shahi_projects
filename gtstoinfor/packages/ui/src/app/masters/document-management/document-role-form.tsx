import React, { useEffect, useState } from 'react';
import { Card, Form, Select, Button, Row, Col, Input, message, MessageArgsProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentService } from '@project-management-system/shared-services';
// import DocumentService from 'packages/libs/shared-services/src/document-service/document-shared-service';
const { Option } = Select;

const RoleMappingForm = () => {
    useEffect(() => {
        getDocuments();

    }, []);


    const [data, setRoleData] = useState<any>([]);

const services = new DocumentService ();
const [form] = Form.useForm();
const navigate=useNavigate();

    // const handleSubmit = (values: any) => {
    //     console.log('Form values:', values);

    //     form.resetFields();s
    // };
    const onFinish = (values: any) => {
        services.createDocument(values).then(res => {
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
        extra={<span><Button onClick={() => navigate('/masters/document-management/document-role-grid')} type={'primary'}>View</Button></span>}>
               
                
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
                            
                               <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="select DocumentName">

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

export default RoleMappingForm;