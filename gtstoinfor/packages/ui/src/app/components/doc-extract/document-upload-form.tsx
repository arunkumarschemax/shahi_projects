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
import { MenuFoldOutlined } from "@ant-design/icons";

const { Option } = Select;

export interface DocumentUploadFormProps {}

export function DocumentUploadForm(props: DocumentUploadFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();
    const [collapsed, setcollapsed] = useState(true);
    const [submitVisible,setSubmitVisible] = useState<boolean>(false)
    const toggle = () => {
        setcollapsed(!collapsed);
    }
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: "50%" }}>
            {/* <MenuFoldOutlined className="trigger" type={collapsed ? 'menu-unfold' : 'menu-unfold'} onClick={toggle} /> */}
                <UploadDocumentForm />
            </div>
            <div style={{ width: "50%" }}>
                <Card title={"Document Details"} headStyle={{ backgroundColor: '#77dfec', border: 0 }} bordered={true} style={{marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: '#fff',borderTop: '1px solid #e8e8e8' }}>
                    <DocumentForm form={mainForm}/>
                    <DocumentItemForm form={itemform} data={undefined} />
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30, float:'right' }} className="ant-submit-btn" disabled={submitVisible}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Card>
            </div>
        </div>
        </>
    )
}
export default DocumentUploadForm;