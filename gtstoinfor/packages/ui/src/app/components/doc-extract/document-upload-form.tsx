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
import UploadDocumentForm from "./upload-document-form";

const { Option } = Select;

export interface DocumentUploadFormProps {}

export function DocumentUploadForm(props: DocumentUploadFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();

    const [submitVisible,setSubmitVisible] = useState<boolean>(false)

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: "50%" }}>
                <UploadDocumentForm />
            </div>
            <div style={{ width: "50%" }}>
                <Card title={"Invoice"}>
                    <DocumentForm form={mainForm}/>
                    <DocumentItemForm form={itemform}/>
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
                            ]}>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} className="ant-submit-btn" disabled={submitVisible}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Card>
            </div>
        </div>
        {/* <Row gutter={24}>
                <Col span={12}>
                    <DocExtractForm />
                </Col>
                <Col span={12}>
                    <DocumentForm />
                </Col>
            </Row> */}
        </>
    )
}
export default DocumentUploadForm;