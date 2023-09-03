import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";
import DocumentForm from "./document-form";
import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import Upload from "rc-upload";

const { Option } = Select;

export interface UploadDocumentFormProps {}

export function UploadDocumentForm(props: UploadDocumentFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [submitVisible,setSubmitVisible] = useState<boolean>(false)

    const handleUploadDocument = () => {
        console.log("hi")
    }

    return (
        <>
        <Card title={"Upload Document"}>
            <Form layout='vertical' form={uploadForm} onFinish={handleUploadDocument}>
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
                </Row>
            </Form>
        </Card>
       </>            
    )
}
export default UploadDocumentForm;