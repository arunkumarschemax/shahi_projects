import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Typography, UploadProps, Upload, Radio } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate, useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";
import DocumentForm from "./document-form";
import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { UploadOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const { Option } = Select;

export interface UploadDocumentFormProps { }

export function UploadDocumentForm(props: UploadDocumentFormProps) {
    const [mainForm] = Form.useForm();
    const [itemform] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [submitVisible, setSubmitVisible] = useState<boolean>(false);
    const [file, setFile] = useState<any | null>(null);
    //   const [btndisable, setBtnDisable] = useState<boolean>(true);

    //   const handleUploadDocument = () => {
    //     if (file) {
    //       // Perform the upload logic for the 'file' here
    //       console.log("Uploading file:", file);
    //     } else {
    //       message.error("Please select a file to upload.");
    //     }
    //   };

    // const handleUploadDocument = () => {
    //   if (file) {
    //     console.log("Uploading file:", file);

    //     Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
    //       .then(({ data: { text } }) => {
    //         const lines = text.split('\n');

    //         const lineObjects = lines.map((line, index) => ({
    //           id: index + 1,
    //           content: line.trim(), 
    //         }));

    //         console.log("File Data (JSON):", JSON.stringify(lineObjects, null, 2));
    //       });
    //   } else {
    //     message.error("Please select a file to upload.");
    //   }
    // };

    // const handleUploadDocument = () => {
    //     if (file) {
    //       console.log("Uploading file:", file);

    //       Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
    //         .then(({ data: { text } }) => {
    //           const lines = text.split('\n');

    //           // Map all lines into line objects with IDs and content
    //           const allLines = lines.map((line, index) => ({
    //             id: index + 1,
    //             content: line.trim(),
    //           }));

    //           // Filter lines containing "HSN" and extract relevant information
    //           const structuredHSNLines = [];
    //           let currentHSN = null;

    //           for (const line of allLines) {
    //             if (line.content.includes('HSN')) {
    //               // Start of a new HSN entry
    //               if (currentHSN) {
    //                 structuredHSNLines.push(currentHSN);
    //               }
    //               currentHSN = {
    //                 HSN: line.content.match(/\d+/)[0], // Extract the HSN code
    //                 tax_type: null,
    //                 chargeINR: null,
    //               };
    //             } else if (line.content.includes('IGST')) {
    //               currentHSN.tax_type = 'IGST';
    //             } else if (line.content.includes('chargeINR')) {
    //               const chargeValue = line.content.match(/\d+,\d+\.\d+/);
    //               if (chargeValue) {
    //                 currentHSN.chargeINR = chargeValue[0].replace(',', '');
    //               }
    //             }
    //           }

    //           if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //           }

    //           console.log("Structured HSN Lines (JSON):", JSON.stringify(structuredHSNLines, null, 2));

    //           const result = {
    //             "Entire Data": allLines,
    //           };

    //           console.log("Result (JSON):", JSON.stringify(result, null, 2));
    //         });
    //     } else {
    //       message.error("Please select a file to upload.");
    //     }
    //   };

    const handleUploadDocument = () => {
        if (file) {
          console.log("Uploading file:", file);
      
          Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
            .then(({ data: { text } }) => {
              const lines = text.split('\n');
      
              // Map all lines into line objects with IDs and content
              const allLines = lines.map((line, index) => ({
                id: index + 1,
                content: line.trim(),
              }));
      
              const structuredHSNLines = [];
              let currentHSN = null;
      
              for (const line of allLines) {
                if (line.content.includes('HSN')) {
                  // Start of a new HSN entry
                  if (currentHSN) {
                    structuredHSNLines.push(currentHSN);
                  }
                  currentHSN = {
                    HSN: line.content.match(/\d+/)[0], // Extract the HSN code
                    tax_type: line.content.match(/IGST|CGST|SGST|GST/), // Corrected typo here
                    chargeINR: null,
                    tax_amount: null, // Initialize tax_amount
                  };
                } else if (line.content.includes('IGST')) {
                  currentHSN.tax_type = 'IGST';
                } else if (line.content.includes('chargeINR')) {
                  // Use a regular expression to match chargeINR in various formats
                  const chargeValue = line.content.match(/[\d,]+(?:\.\d+)?/);
                  if (chargeValue) {
                    // Remove commas and convert to a numeric format
                    currentHSN.chargeINR = parseFloat(chargeValue[0].replace(',', ''));
                    
                    // Calculate tax_amount based on tax_type
                    if (currentHSN.tax_type) {
                      const taxRate = 0.18; // Example tax rate (you can change this)
                      currentHSN.tax_amount = currentHSN.chargeINR * taxRate;
                    }
                  }
                }
              }
      
              if (currentHSN) {
                structuredHSNLines.push(currentHSN);
              }
      
              console.log("Structured HSN Lines (JSON):", JSON.stringify(structuredHSNLines, null, 2));
      
              const result = {
                "Entire Data": allLines,
              };
      
              console.log("Result (JSON):", JSON.stringify(result, null, 2));
            });
        } else {
          message.error("Please select a file to upload.");
        }
      };
      
      



    const gstUploadFieldProps: UploadProps = {
        // Remove 'multiple' property
        onRemove: () => {
            setFile(null); // Clear the selected file when removed
            //   setBtnDisable(true); // Disable the "Upload" button
        },
        beforeUpload: async (file: any) => {
            if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
                message.error("Only pdf and image files are allowed!");
                return false;
            }

            Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
                console.log(text);
            });

            setFile(file); // Set the selected file
            //   setBtnDisable(false); // Enable the "Upload" button
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
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            <Card
                title={"Upload Document"}
                headStyle={{ backgroundColor: '#77dfec', border: 0 }}
                bordered={true}
                style={{ marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: '#fff', borderTop: '1px solid #e8e8e8' }}
            >
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
                                        message: 'Document is required',
                                    },
                                ]}
                                label='Upload Document'
                                name='file'
                            >
                                <Upload
                                    key={"file"}
                                    name={"file"}
                                    {...gstUploadFieldProps}
                                    accept=".jpeg,.pdf,.png,.jpg"
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
                                    onClick={handleUploadDocument} // Call the upload function
                                //   disabled={btndisable}
                                >
                                    Upload
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default UploadDocumentForm;
