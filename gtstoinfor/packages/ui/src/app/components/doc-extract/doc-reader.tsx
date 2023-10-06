/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Radio, Row, Upload, UploadProps, message, Spin, FormInstance } from 'antd';
import { UploadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import Tesseract from 'tesseract.js';
import { pdfjs } from 'react-pdf';
import { PriceListRequestModel } from '@xpparel/shared-models';
import { PricesService, VendorNamereq, VendorService } from '@xpparel/shared-services';

export interface DocReaderProps {
    form: FormInstance<any>;
    extractedData: (data: any) => void;
    extractedHsnData: (data: any[]) => void;

}

export const DocReader = (props: DocReaderProps) => {
    const [file, setFile] = useState(null);
    const [showIframe, setShowIframe] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [extractedLines, setExtractedLines] = useState<any[]>([]);
    const maxZoomLevel = 3;
    const minZoomLevel = 0.5;



    const [hsnData, setHsnData] = useState([]);
    const [GstForm] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [zoomFactor, setZoomFactor] = useState(1);

    const [venName, setVenName] = useState("");

    const [buttonClicked, setButtonClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedData, setExtractedData] = useState<any>([]);
    const [extractionCompleted, setExtractionCompleted] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);


    const [pdfData, setPdfData] = useState(null);
    const [jsonData, setJsonData] = useState(null);


    const parseExtractedText = (text) => {
        const lines = text.split('\n');
        const data = [];

        lines.forEach((line, index) => {
            data.push({
                id: index + 1,
                content: line.trim(),
            });
        });
        return data;
    };


    useEffect(() => {
        if (hsnData && hsnData.length > 0) {
            setHsnData(hsnData);
        }
    }, [hsnData]);

    const handleFileChange = (info) => {
        if (info?.file?.type === 'application/pdf') {
            if (info?.fileList[0]) {
                setFile(info.fileList[0]);
                displayPdf(info.fileList[0].originFileObj);
                message.success(`${info.file.name} file uploaded successfully`);
            } else {
                setFile(null);
                setPdfData(null);
            }
        } else if (['image/png', 'image/jpeg', 'image/jpg'].includes(info?.file?.type)) {
            handleUploadDocument();
        }
    };

    const displayPdf = (pdfBlob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const pdfDataUrl = reader.result;
            setPdfData(pdfDataUrl);
            handlePdfToJSON(pdfDataUrl);
        };
        reader.readAsDataURL(pdfBlob);
    };

    const extractTextFromPdf = async (pdfBuffer) => {
        const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise;
        const numPages = pdf.numPages;
        const extractedData = [];
        let idCounter = 1;

        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const textContent: any = await page.getTextContent();
            let line = '';
            let rec = null;
            // eslint-disable-next-line no-loop-func
            textContent.items.forEach((item) => {
                if (rec !== null) {
                    rec = item.transform[5];
                }
                if (item.transform[5]) {
                    extractedData.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                    idCounter++;
                    line = '';
                }
                line += item.str + ' ';
            });
            extractedData.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
        }

        const structuredHSNLines = [];
        let currentHSN = null;
        let hsnId = null;
        let linesId = 0
        for (const line of extractedData) {
            if (line.content.match(/^\d{6}$/)) {
                hsnId = linesId;
                if (currentHSN) {
                    structuredHSNLines.push(currentHSN);
                }
                currentHSN = {
                    description: extractedData[hsnId + 1].content,
                    HSN: line.content.includes("HSN")
                        ? line.content.match(/\d+/)
                        : line.content.trim(),
                    unitQuantity: extractedData[hsnId - 1].content,
                    unitPrice: extractedData[hsnId - 2].content,
                    taxType: line.content.match(/IGST|CGST|SGST|GST/),
                    charge: extractedData[hsnId - 10].content,
                    taxPercentage: extractedData[hsnId - 5].content,
                    taxAmount: extractedData[hsnId - 6].content,
                    amount: extractedData[hsnId - 10].content,
                };
            }
            linesId += 1;
        }
        if (currentHSN) {
            structuredHSNLines.push(currentHSN);
        }

        const InvoiceLines = [];
        let currentInvoice = null;
        let gstNumberExtracted = false;

        const vendorId = '1-2';
        const invoiceDateId = '1-64';
        const invoiceNumberId = '1-86';
        const invoiceCurrency = 'INR';
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const financialYear = `${currentYear}-${nextYear}`;

        if (extractedData && Array.isArray(extractedData)) {
            for (const line of extractedData) {
                const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
                if (gstMatch && !gstNumberExtracted) {
                    const gstnumber = gstMatch[0];

                    const vendorNameData = extractedData.find((item) => item.id === vendorId);
                    const venName = vendorNameData ? vendorNameData.content : '';

                    const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                    const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                    const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                    const invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                    const invoiceamount = structuredHSNLines.reduce((acc, hsnLine) => {
                        const charge = parseFloat(hsnLine.charge) || 0;
                        return acc + charge;
                    }, 0).toFixed(2);

                    const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                        const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                        return acc + taxAmount;
                    }, 0).toFixed(2);
                    

                    let cgst = "0.00";
                    let sgst = "0.00";

                    if (igst !== "0.00") {
                        cgst = "0.00";
                        sgst = "0.00";
                    }
                    currentInvoice = {
                        "venName": venName,
                        "gstnumber": gstnumber,
                        "invoiceDate": invoiceDate,
                        "invoiceNumber": invoiceNumber,
                        "invoiceCurrency": invoiceCurrency,
                        "financialYear": financialYear,
                        "invoiceamount": invoiceamount,
                        "igst": igst,
                        "cgst": cgst,
                        "sgst": sgst,
                    };
                    InvoiceLines.push(currentInvoice);
                    gstNumberExtracted = true;
                }
            }
        }

        console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
        console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
        setExtractedData(structuredHSNLines);
        setExtractedData(InvoiceLines);
        props.extractedData(InvoiceLines[0]);
        props.extractedHsnData(structuredHSNLines);
        return extractedData;

    }


    const handlePdfToJSON = async (pdfDataUrl) => {
        setButtonClicked(true);
        setIsLoading(true);
        setIsLoading(false);
        if (pdfDataUrl) {
            const response = await fetch(pdfDataUrl);
            const pdfBuffer = await response.arrayBuffer();
            const extractedData = await extractTextFromPdf(pdfBuffer);
            setJsonData(extractedData);
            console.log('PDF data in JSON format:', extractedData);
            const extractionTime = new Date().toLocaleString();
            setTimeout(() => {
                setIsLoading(false);
                setExtractionCompleted(true);
                setShowCancelButton(true);
            }, 2000);
        }
    };

    const handleUploadDocument = () => {
        if (file && !buttonClicked) {
            // eslint-disable-next-line no-empty
            if (file.name.match(/\.(pdf)$/)) {
            } else {
                setButtonClicked(true);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedImage(e.target.result);
                };
                reader.readAsDataURL(file);
                setIsLoading(true);
                console.log("Uploading file:", file);
                Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
                    ({ data: { text } }) => {
                        setIsLoading(false);
                        const parsedData = parseExtractedText(text);
                        console.log(parsedData, 'ALL CONSOLE');

                        const lines = text.split("\n");
                        const allLines = lines.map((line, index) => ({
                            id: index + 1,
                            content: line.trim(),
                        }));

                        const structuredHSNLines = [];
                        let currentHSN = null;

                        for (const line of allLines) {
                            if (line.content.includes("HSN") || line.content.match(/^\d{6}$/)) {
                                if (currentHSN) {
                                    currentHSN.variance = currentHSN.chargeINR - currentHSN.quotation;
                                    structuredHSNLines.push(currentHSN);
                                }
                                currentHSN = {
                                    HSN: line.content.includes("HSN")
                                        ? line.content.match(/\d+/)
                                        : line.content.trim(),
                                    Taxtype: line.content.match(/IGST|CGST|SGST|GST/),
                                    Taxamount: null,
                                    description: null,
                                    chargeINR: null,
                                    quotation: null,
                                    unitPrice: null,
                                };

                                const taxAmountMatch = line.content.match(
                                    /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
                                );
                                if (taxAmountMatch) {
                                    currentHSN.Taxamount = {
                                        Taxpercentage: parseFloat(taxAmountMatch[1]),
                                        Taxamount: parseFloat(taxAmountMatch[3]),
                                    };
                                }
                            } else if (line.content.includes("IGST|CGST|GSTS|GST")) {
                                currentHSN.Taxtype = "IGST";
                            }
                            if (line.content.includes("chargeINR")) {
                                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
                                if (chargeValueMatch) {
                                    currentHSN.chargeINR = parseFloat(
                                        chargeValueMatch[1].replace(/,/g, "")
                                    );
                                }
                            }

                            if (line.content.includes("quotation")) {
                                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
                                if (quotationValueMatch) {
                                    currentHSN.quotation = parseFloat(
                                        quotationValueMatch[1].replace(/,/g, "")
                                    );
                                }
                            }

                            if (currentHSN && !currentHSN.description) {
                                currentHSN.description = line.content.trim();
                            }
                        }
                        structuredHSNLines.forEach((line) => {
                            if (line.Taxamount) {
                                line.Taxpercentage = line.Taxamount.Taxpercentage;
                                line.Taxamount = line.Taxamount.Taxamount;
                            }
                        });
                        console.log(
                            "IMAGE HSN DATA",
                            JSON.stringify(structuredHSNLines, null, 2)
                        );

                        setExtractedData(structuredHSNLines);

                        const result = {
                            "Entire Data": allLines,
                        };

                        setTimeout(() => {
                            setIsLoading(false);
                            setExtractionCompleted(true);
                            setShowCancelButton(true);
                        }, 2000);

                        console.log("Result (JSON):", JSON.stringify(result, null, 2));
                    }
                );

            }
        }
    };

    const gstUploadFieldProps: UploadProps = {
        onRemove: () => {
            setFile(null);
            setPdfData(null);
            setSelectedImage(null);
            GstForm.resetFields([]);
            uploadForm.resetFields([]);
            window.location.reload();
        },
        beforeUpload: async (file: any) => {
            if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
                message.error("Only pdf and image files are allowed!");
                return false;
            }
            setFile(file);
            return false;
        },
        progress: {
            strokeColor: {
                "0%": "#108ee9",
                "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const handleCancel = () => {
        setButtonClicked(true);
        window.location.reload();
    };

    const handleZoomIn = () => {
        if (zoomFactor < 2) {
            setZoomFactor(zoomFactor + 0.1);
        }
    };

    const handleZoomOut = () => {
        if (zoomFactor > 0.2) {
            setZoomFactor(zoomFactor - 0.1);
        }
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={24}>
                    <Card
                        title={<span style={{ textAlign: "center", color: "#FFFFFF" }}>Upload Document</span>}
                        bordered={true}
                        headStyle={{ backgroundColor: "#000000" }}
                        size="small"
                    >
                        <Form layout="vertical" form={props.form}>
                            <Row gutter={12}>
                                <Col span={6}>
                                    <Form.Item name={"poType"}>
                                        <Radio.Group name="radiogroup" defaultValue={"po"}>
                                            <Radio value={"po"}>PO</Radio>
                                            <Radio value={"non_po"}>NON PO</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 8 }}
                                    sm={{ span: 8 }}
                                    md={{ span: 8 }}
                                    lg={{ span: 8 }}
                                    xl={{ span: 8 }}>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Document is required",
                                            },
                                        ]}
                                        label="Upload Document"
                                        name="file"
                                    >
                                        <Upload
                                            name="file"
                                            {...gstUploadFieldProps}
                                            accept=".pdf,.jpeg,.png,.jpg"
                                            multiple
                                            // showUploadList={false}
                                            onChange={handleFileChange}
                                            customRequest={({ file }) => handleFileChange(file)}
                                        >
                                            <Button
                                                style={{ color: "black", backgroundColor: "#7ec1ff" }}
                                                icon={<UploadOutlined />}
                                                onClick={handleUploadDocument}
                                            >
                                                Choose File
                                            </Button>
                                        </Upload>
                                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                            <Row>
                                                {extractionCompleted ? (
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="primary"
                                                        icon={<UploadOutlined />}
                                                        onClick={handleUploadDocument}
                                                        disabled={true}
                                                    >
                                                        {isLoading ? (
                                                            <span
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: '0',
                                                                    left: '0',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    zIndex: 9999,
                                                                    background: 'rgba(0, 0, 0, 0.5)',
                                                                }}
                                                            >
                                                                <Spin size="large" />
                                                                <span style={{ marginTop: '10px', color: 'white' }}>
                                                                    Please wait...
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            'Upload'
                                                        )}
                                                    </Button>
                                                )}
                                            </Row>
                                        </span>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    <Card
                        title={<span style={{ textAlign: "center", color: "#FFFFFF" }}>Document Viewer</span>}
                        bordered={true}
                        headStyle={{ backgroundColor: "#000000" }}
                        size="small"
                    >
                        {selectedImage && (
                            <div>
                                <div
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%",
                                        height: "300px",
                                        cursor: "grab",
                                    }}
                                >
                                    <div
                                        style={{
                                            overflow: "auto",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <img
                                            id="imageToDrag"
                                            src={selectedImage}
                                            style={{
                                                width: "100%",
                                                transform: `scale(${zoomFactor})`,
                                                transformOrigin: "top left",
                                                transition: "transform 0.2s",
                                            }}
                                        />
                                    </div>
                                </div>
                                <span style={{ textAlign: "center", marginTop: "10px" }}>
                                    <Button onClick={handleZoomIn}>Zoom In</Button>
                                    <Button onClick={handleZoomOut}>Zoom Out</Button>
                                </span>
                            </div>
                        )}
                        {pdfData && (
                            <div id="pdfContainer" >
                                <iframe
                                    src={pdfData}
                                    title="PDF Viewer"
                                    width="650px"
                                    height="400px"
                                    frameBorder="0"
                                />
                            </div>
                        )}
                    </Card>

                    {fileType === 'image' && (
                        <span style={{ textAlign: "center", marginTop: "10px" }}>
                            <Button type='primary' icon={<ZoomInOutlined />} onClick={handleZoomIn} >Zoom In</Button>
                            <Button type='primary' icon={<ZoomOutOutlined />} style={{ marginLeft: "10px" }} onClick={handleZoomOut}>Zoom Out</Button>
                        </span>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default DocReader;
