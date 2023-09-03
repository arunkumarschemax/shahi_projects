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
        // <Card title={"Document Details"}>
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
                                ]} label='GST No' name='gstNo'>
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
                                ]} label='IFSC Code' name='ifscCode'>
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
                                ]} label='Invoice No' name='invoiceNo'>
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
                                ]} label='Payment Reference' name='PayRef'>
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
                                ]} label='Customer' name='customer'>
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
                                ]} label='Volume' name='volume'>
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
                                ]} label='Weight' name='weight'>
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
                                ]} label='Chargeable' name='chargeable'>
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
                                ]} label='Invoice Date' name='invoiceDate'>
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
                                ]} label='Cartons' name='cartons'>
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
                                ]} label='Po' name='po'>
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
                                ]} label='Packages' name='packages'>
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
                                ]} label='RCM' name='rcm'>
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
                                ]} label='ETA' name='eta'>
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
                                ]} label='House Bill' name='houseBill'>
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
                                ]} label='Goods Description' name='goodsDescription'>
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
                                ]} label='Ocean Bill' name='oceanBill'>
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
                                ]} label='Containers' name='containers'>
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
                                ]} label='Vessel' name='vessel'>
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
                                ]} label='Voyage' name='Voyage'>
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
                                ]} label='Cosign' name='Cosign'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        // </Card>
    )
}
export default DocumentForm;