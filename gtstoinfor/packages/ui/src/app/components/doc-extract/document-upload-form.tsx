import { Col, Form, Select } from "antd";
import { useState } from "react";
import UploadDocumentForm from "./upload-document-form";

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
                {/* <Card title={"Document Details"} headStyle={{ backgroundColor: '#77dfec', border: 0 }} bordered={true} style={{marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: '#fff',borderTop: '1px solid #e8e8e8' }}> */}
                    {/* <DocumentForm form={mainForm}/> */}
                    {/* <DocumentItemForm form={itemform} data={undefined} /> */}
                    <Col span={24}>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30, float:'right' }} className="ant-submit-btn" disabled={submitVisible}>
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Col>
                {/* </Card> */}
            </div>
        </div>
        </>
    )
}
export default DocumentUploadForm;