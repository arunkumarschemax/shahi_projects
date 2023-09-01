import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";

const { Option } = Select;

export interface DocFormProps {}

export function DocForm(props: DocFormProps) {

    return (
        <Row gutter={24}>
            <Col span={24}>
                <DocExtractForm />
            </Col>
        </Row>
    )
}
export default DocForm;