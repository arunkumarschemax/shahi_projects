import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Typography, UploadProps, Upload, Radio } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";
import DocumentForm from "./document-form";
import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { UploadOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const { Option } = Select;

export interface UploadDocumentFormProps {}

export function UploadDocumentForm(props: UploadDocumentFormProps) {

    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [submitVisible,setSubmitVisible] = useState<boolean>(false)
    const [fileList, setFileList] = useState<any[]>([]);
    const [btndisable, setBtnDisable] = useState<boolean>(true);

    const handleUploadDocument = () => {
        console.log("hi")
    }

    const gstUploadFieldProps: UploadProps = {
        multiple: true,
        onRemove: (file: any) => {
            setFileList([]);
            // uploadFileList([]);
        },
        // onDownload: handleFileDownload,
        beforeUpload: async (file: any) => {
            if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
                message.error("Only pdf and image files are allowed!");
                return true;
            }
            Tesseract.recognize(
                file,
                'eng',
                { logger: m => console.log(m) }
              ).then(({ data: { text } }) => {
                console.log(text);
              })
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = data => {  
                    setFileList([...fileList, file]);
                    console.log("*****************************")
                    console.log(fileList)
                    console.log([...fileList, file])
    
    
                    setBtnDisable(false)
                    // uploadFileList([...filelist, file]);
                    return false;
            };
            return false;
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
        },
        
        
        // fileList: fileList
    
    };
    const handleUpload = (documentsListId, info) => {
        // Handle the file upload for the specific documentListId
        // You can use the 'documentListId' to identify which row is being interacted with
    };

    const uploadFile = () => {

    }
    // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const uploadedImage = event.target.files && event.target.files[0];
    //     if (uploadedImage) {
    //         setFileSelected(true);
    //         const {
    //             data: { text },
    //         } = await Tesseract.recognize(uploadedImage);

    //         setImage(uploadedImage);
    //         setImageText(text);
    //         setOriginalImageText(text);
    //         setCurrent(1);
    //         console.log("imageText");
    //         console.log(imageText);
    //     }
    // }

    return (
        <>
        <Card title={"Upload Document"} bordered={true} style={{marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: '#fff',borderTop: '1px solid #e8e8e8' }}>
            <Form layout='vertical' form={uploadForm} onFinish={handleUploadDocument}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name={"poType"}>
                            <Radio.Group name="radiogroup" defaultValue={"po"}>
                                <Radio value={"po"}>PO</Radio>
                                <Radio value={"non_po"}>NON PO</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item 
                            rules={[
                                    {
                                        required: true,
                                        message: 'Document is required'
                                    },
                                ]} label='Upload Document' name='file'>
                            <Upload
                                key={"file"}
                                name={"file"}
                                {...gstUploadFieldProps}
                                accept=".jpeg,.pdf,.png,.jpg"
                                onChange={(info) => handleUpload("file", info)}

                                >
                                <Button
                                    key={"file"}
                                    style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                                    icon={<UploadOutlined />}
                                >
                                    Choose File
                                </Button>
                                <br />
                                <Typography.Text type="secondary">
                                    (Supported formats pdf, jpeg, jpg, png)
                                </Typography.Text>
                            </Upload>
                            <br />
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                onClick={() => uploadFile}
                                disabled={btndisable}
                            >
                                Upload
                            </Button>
                        </Form.Item>    
                    </Col>
                </Row>
            </Form>
        </Card>
       </>            
    )
}
export default UploadDocumentForm;