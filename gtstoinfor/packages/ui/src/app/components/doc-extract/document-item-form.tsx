import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Card } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";

const { Option } = Select;

export interface DocumentItemFormProps {
    form:any;
}

export function DocumentItemForm(props: DocumentItemFormProps) {

    const [submitVisible,setSubmitVisible] = useState<boolean>(false)
    const handleDocument = () => {
        console.log("hiii")
    }

    return (
        <Card title={"Document Item Details"}>
            <Form layout='vertical' form={props.form} onFinish={handleDocument}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'HSN is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='hsnCode' label='HSN Code'>
                            <Input type={"text"} />
                        </Form.Item>    
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Description is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='description' label='Description'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Tax Type is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='taxType' label='Tax Type'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'tax amount is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='taxAmount' label='Tax Amount'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'charge Amount is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='amount' label='Charge Amount'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}
export default DocumentItemForm;