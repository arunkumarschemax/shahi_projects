import { Col, Form, Select } from "antd";
import { useState } from "react";
import UploadDocumentForm from "./upload-document-form";

const { Option } = Select;

export interface DocumentUploadFormProps { }

export function DocumentUploadForm(props: DocumentUploadFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();
    const [collapsed, setcollapsed] = useState(true);
    const [submitVisible, setSubmitVisible] = useState<boolean>(false)
    const toggle = () => {
        setcollapsed(!collapsed);
    }
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <UploadDocumentForm />
            </div>
        </>
    )
}
export default DocumentUploadForm;