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

const { Option } = Select;

export interface UploadDocumentFormProps {}

export function UploadDocumentForm(props: UploadDocumentFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();

    const [submitVisible,setSubmitVisible] = useState<boolean>(false)

    return (
        <>
        <Card title={"Upload Document"}>
            
        </Card>
       </>            
    )
}
export default UploadDocumentForm;