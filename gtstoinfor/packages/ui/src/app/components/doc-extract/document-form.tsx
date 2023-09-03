import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Card } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";

const { Option } = Select;

export interface DocumentFormProps {
    form:any;
}

export function DocumentForm(props: DocumentFormProps) {

    const handleDocument = () => {
        console.log("hiii")
    }

    return (
        <Card title={"Document Details"}>
            <Form layout='vertical' form={props.form} onFinish={handleDocument}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='GST No' label='gstNo'>
                            <Input type={"text"} />
                        </Form.Item>    
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='IFSC Code' label='ifscCode'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Invoice No' label='invoiceNo'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Payment Reference' label='PayRef'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Customer' label='customer'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Volume' label='volume'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Weight' label='weight'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Chargeable' label='chargeable'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Invoice Date' label='invoiceDate'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Cartons' label='cartons'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Po' label='po'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Packages' label='packages'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='RCM' label='rcm'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='ETA' label='eta'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='House Bill' label='houseBill'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Goods Description' label='goodsDescription'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Ocean Bill' label='oceanBill'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Containers' label='containers'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Vessel' label='vessel'>
                            <Input type={"text"} />
                        </Form.Item> 
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Voyage' label='Voyage'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Owner is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='Cosign' label='Cosign'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}
export default DocumentForm;