import { UploadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { VendorNameEnum } from '@xpparel/shared-models';
import { Button, Card, Col, Form, FormInstance, Radio, Row, Select, Spin, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import Tesseract from 'tesseract.js';
import { extractDhl, extractDart, extractExpeditors, extractEfl, extractOocl, extractNagel, extractApl, extractMaersk } from './schemax-ai-docx-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export interface DocReaderProps {
    form: FormInstance<any>;
    extractedData: (data: any) => void;
    extractedHsnData: (data: any[]) => void;

}

export const DocReader = (props: DocReaderProps) => {
    const { extractedData, extractedHsnData } = props;
    const [file, setFile] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState();
    const [fileType, setFileType] = useState(null);
    const [GstForm] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [zoomFactor, setZoomFactor] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractionCompleted, setExtractionCompleted] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [pdfData, setPdfData] = useState(null);


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

    const handlePdfToJSON = async (pdfDataUrl) => {
        setButtonClicked(true);
        setIsLoading(true);
        setIsLoading(false);
        if (pdfDataUrl) {
            const response = await fetch(pdfDataUrl);
            const pdfBuffer = await response.arrayBuffer();
            const pdfData=await pdfjs.getDocument({ data: pdfBuffer }).promise
            let processedData;
            switch (selectedVendor) {
                case VendorNameEnum.extractedDhl:
                    processedData = await extractDhl(pdfData);
                    console.log('PDF DATA DHL:', processedData);
                    break;
                case VendorNameEnum.extractedDart:
                    processedData = await extractDart(pdfData);
                    console.log('PDF DATA DART:', processedData);
                    break;
                case VendorNameEnum.extractedExpeditors:
                    processedData = await extractExpeditors(pdfData);
                    console.log('PDF DATA EXPEDITORS:', processedData);
                    break;
                case VendorNameEnum.extractedEfl:
                    processedData = await extractEfl(pdfData);
                    console.log('PDF DATA EFL:', processedData);
                    break;
                case VendorNameEnum.extractedOocl:
                    processedData = await extractOocl(pdfData);
                    console.log('PDF DATA OOCL:', processedData);
                    break;
                case VendorNameEnum.extractedNagel:
                    processedData = await extractNagel(pdfData);
                    console.log('PDF DATA Nagel:', processedData);
                    break;
                case VendorNameEnum.extractedApl:
                    processedData = await extractApl(pdfData);
                    console.log('PDF DATA Apl:', processedData);
                    break;
                case VendorNameEnum.extractedMaersk:
                    processedData = await extractMaersk(pdfData);
                    console.log('PDF DATA Maersk:', processedData);
                    break;
                default:
                    console.log('Unknown source:', selectedVendor);
                    break;
            }
            console.log(processedData)
            extractedData(processedData.extractedData);
            extractedHsnData(processedData.extractedHsnData);

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


                        if (file.name.match(/\bexpo\b/i)) {
                            const Expo = () => {
                                const structuredHSNLines = [];
                                let currentHSN = null;

                                for (const line of allLines) {
                                    if (line.content.includes("HSN") || line.content.match(/^\d{6}$/)) {
                                        if (currentHSN) {
                                            currentHSN.variance = currentHSN.charge - currentHSN.quotation;
                                            structuredHSNLines.push(currentHSN);
                                        }
                                        currentHSN = {
                                            HSN: line.content.includes("HSN")
                                                ? line.content.match(/\d+/)
                                                : line.content.trim(),
                                            taxType: line.content.match(/IGST|CGST|SGST/),
                                            taxAmount: null,
                                            description: null,
                                            charge: null,
                                            quotation: null,
                                            unitPrice: null,
                                        };

                                        const taxAmountMatch = line.content.match(
                                            /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
                                        );
                                        if (taxAmountMatch) {
                                            currentHSN.taxAmount = {
                                                taxPercentage: parseFloat(taxAmountMatch[1]),
                                                taxAmount: parseFloat(taxAmountMatch[3]),
                                            };
                                        }
                                    } else if (line.content.includes("IGST|CGST|SGST|GST")) {
                                        currentHSN.taxType = "IGST";
                                    }
                                    if (line.content.includes("charge")) {
                                        const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
                                        if (chargeValueMatch) {
                                            currentHSN.charge = parseFloat(
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
                                    if (line.taxAmount) {
                                        line.taxPercentage = line.taxAmount.taxPercentage;
                                        line.taxAmount = line.taxAmount.taxAmount;
                                    }
                                });

                                const InvoiceLines = [];
                                let currentInvoice = null;
                                let gstNumberExtracted = false;
                                const invoiceDateId = '9';
                                const invoiceNumberId = '8';
                                const invoiceCurrency = 'INR';
                                const currentYear = new Date().getFullYear();
                                const nextYear = currentYear + 1;
                                const financialYear = `${currentYear}-${nextYear}`;

                                const gstVendorMapping = {
                                    '33AAACE2126J1Z3': 'EXPO FREIGHT PRIVATE LIMITED',
                                };

                                if (allLines && Array.isArray(allLines)) {
                                    for (const line of allLines) {
                                        const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

                                        if (gstMatch && !gstNumberExtracted) {
                                            const gstNumber = gstMatch[0];
                                            const vendorName = gstVendorMapping[gstNumber];

                                            const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                                            const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                                            const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                                            const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                                            const invoiceNumberMatch = invoiceNumberNew.match(/\|([^|]+)\|/);
                                            const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : '';

                                            const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                                                const amount = parseFloat(hsnLine.amount) || 0;
                                                const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                                                return add + amount + taxAmount * 2;
                                            }, 0).toFixed(2);

                                            let igst = "0.00";
                                            let cgst = "0.00";
                                            let sgst = "0.00";

                                            for (const hsnLine of structuredHSNLines) {
                                                if (hsnLine.taxPercentage === 18) {
                                                    igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                } else if (hsnLine.taxPercentage === 9) {
                                                    cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                    sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                }
                                            }

                                            currentInvoice = {
                                                "venName": vendorName || '',
                                                "gstNumber": gstNumber,
                                                "invoiceDate": invoiceDate,
                                                "invoiceNumber": invoiceNumber,
                                                "invoiceCurrency": invoiceCurrency,
                                                "financialYear": financialYear,
                                                "invoiceAmount": invoiceAmount,
                                                "cgst": cgst,
                                                "sgst": sgst,
                                                "igst": igst,
                                            };

                                            InvoiceLines.push(currentInvoice);
                                            gstNumberExtracted = true;
                                        }
                                    }
                                }

                                console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
                                console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(structuredHSNLines, null, 2)
                                );

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(InvoiceLines, null, 2)
                                );
                                props.extractedHsnData(structuredHSNLines);
                                props.extractedData(InvoiceLines[0]);
                            }
                            Expo();


                        }

                        else if (file.name.match(/\KRSNA 1_page-0001\b/i)) {
                            const Krsna = () => {
                                const structuredHSNLines = [];
                                let currentHSN = null;

                                for (const line of allLines) {
                                    if (line.content.includes("9967") || line.content.match(/^\d{6}$/)) {
                                        if (currentHSN) {
                                            currentHSN.variance = currentHSN.charge - currentHSN.quotation;
                                            structuredHSNLines.push(currentHSN);
                                        }
                                        currentHSN = {
                                            HSN: line.content.includes("9967")
                                                ? line.content.match(/\d+/)
                                                : line.content.trim(),
                                            taxType: line.content.match(/IGST|CGST|SGST|GST/),
                                            taxAmount: null,
                                            description: null,
                                            charge: null,
                                            quotation: null,
                                            unitPrice: null,
                                        };

                                        const taxAmountMatch = line.content.match(
                                            /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
                                        );
                                        if (taxAmountMatch) {
                                            currentHSN.taxAmount = {
                                                taxPercentage: parseFloat(taxAmountMatch[1]),
                                                taxAmount: parseFloat(taxAmountMatch[3]),
                                            };
                                        }
                                    } else if (line.content.includes("IGST|CGST|SGST|GST")) {
                                        currentHSN.taxType = "IGST";
                                    }
                                    if (line.content.includes("charge")) {
                                        const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
                                        if (chargeValueMatch) {
                                            currentHSN.charge = parseFloat(
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
                                    if (line.taxAmount) {
                                        line.taxPercentage = line.taxAmount.taxPercentage;
                                        line.taxAmount = line.taxAmount.taxAmount;
                                    }
                                });

                                const InvoiceLines = [];
                                let currentInvoice = null;
                                let gstNumberExtracted = false;
                                const invoiceDateId = '8';
                                const invoiceNumberId = '7';
                                const invoiceCurrency = 'INR';
                                const currentYear = new Date().getFullYear();
                                const nextYear = currentYear + 1;
                                const financialYear = `${currentYear}-${nextYear}`;

                                const gstVendorMapping = {
                                    '29AAGCI8183K1ZP': 'INSTANT PANTHER LOGISTICS PVT LTD',
                                };

                                if (allLines && Array.isArray(allLines)) {
                                    for (const line of allLines) {
                                        const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

                                        if (gstMatch && !gstNumberExtracted) {
                                            const gstNumber = gstMatch[0];
                                            const vendorName = gstVendorMapping[gstNumber];

                                            const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                                            const invoiceDateNew = invoiceDateData ? invoiceDateData.content : '';

                                            const invoiceDateMatch = invoiceDateNew.match(/(?<=:).*$/);
                                            const invoiceDate = invoiceDateMatch ? invoiceDateMatch[0] : '';

                                            const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                                            const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                                            const invoiceNumberMatch = invoiceNumberNew.match(/(?<=:).*$/);
                                            const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[0] : '';

                                            const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                                                const amount = parseFloat(hsnLine.amount) || 0;
                                                const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                                                return add + amount + taxAmount * 2;
                                            }, 0).toFixed(2);

                                            let igst = "0.00";
                                            let cgst = "0.00";
                                            let sgst = "0.00";

                                            for (const hsnLine of structuredHSNLines) {
                                                if (hsnLine.taxPercentage === 18) {
                                                    igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                } else if (hsnLine.taxPercentage === 9) {
                                                    cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                    sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                }
                                            }

                                            currentInvoice = {
                                                "venName": vendorName || '',
                                                "gstNumber": gstNumber,
                                                "invoiceDate": invoiceDate,
                                                "invoiceNumber": invoiceNumber,
                                                "invoiceCurrency": invoiceCurrency,
                                                "financialYear": financialYear,
                                                "invoiceAmount": invoiceAmount,
                                                "cgst": cgst,
                                                "sgst": sgst,
                                                "igst": igst,
                                            };

                                            InvoiceLines.push(currentInvoice);
                                            gstNumberExtracted = true;
                                        }
                                    }
                                }

                                console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
                                console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(structuredHSNLines, null, 2)
                                );

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(InvoiceLines, null, 2)
                                );
                                props.extractedHsnData(structuredHSNLines);
                                props.extractedData(InvoiceLines[0]);
                            }

                            Krsna();
                        }

                        else if (file.name.match(/\KSR 1_page-0001\b/i)) {
                            const Ksr = () => {
                                const structuredHSNLines = [];
                                let currentHSN = null;

                                for (const line of allLines) {
                                    if (line.content.includes("9967") || line.content.match(/^\d{6}$/)) {
                                        if (currentHSN) {
                                            currentHSN.variance = currentHSN.charge - currentHSN.quotation;
                                            structuredHSNLines.push(currentHSN);
                                        }
                                        currentHSN = {
                                            HSN: line.content.includes("9967")
                                                ? line.content.match(/\d+/)
                                                : line.content.trim(),
                                            taxType: line.content.match(/IGST|CGST|SGST|GST/),
                                            taxAmount: null,
                                            description: null,
                                            charge: null,
                                            quotation: null,
                                            unitPrice: null,
                                        };

                                        const taxAmountMatch = line.content.match(
                                            /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
                                        );
                                        if (taxAmountMatch) {
                                            currentHSN.taxAmount = {
                                                taxPercentage: parseFloat(taxAmountMatch[1]),
                                                taxAmount: parseFloat(taxAmountMatch[3]),
                                            };
                                        }
                                    } else if (line.content.includes("IGST|CGST|SGST|GST")) {
                                        currentHSN.taxType = "IGST";
                                    }
                                    if (line.content.includes("charge")) {
                                        const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
                                        if (chargeValueMatch) {
                                            currentHSN.charge = parseFloat(
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
                                    if (line.taxAmount) {
                                        line.taxPercentage = line.taxAmount.taxPercentage;
                                        line.taxAmount = line.taxAmount.taxAmount;
                                    }
                                });

                                const InvoiceLines = [];
                                let currentInvoice = null;
                                let gstNumberExtracted = false;
                                const invoiceDateId = '13';
                                const invoiceNumberId = '12';
                                const invoiceCurrency = 'INR';
                                const currentYear = new Date().getFullYear();
                                const nextYear = currentYear + 1;
                                const financialYear = `${currentYear}-${nextYear}`;

                                const gstVendorMapping = {
                                    '33AAACK1360L1ZR': 'K.S.R Freight Forwarders Pvt. Ltd',
                                };

                                if (allLines && Array.isArray(allLines)) {
                                    for (const line of allLines) {
                                        const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

                                        if (gstMatch && !gstNumberExtracted) {
                                            const gstNumber = gstMatch[0];
                                            const vendorName = gstVendorMapping[gstNumber];

                                            const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                                            const invoiceDateNew = invoiceDateData ? invoiceDateData.content : '';
                                            const invoiceDate = invoiceDateNew.replace(/.*?(\d.*)/, '$1').trim();

                                            const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                                            const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                                            // Use a regular expression to remove any text before ":"
                                            const invoiceNumber = invoiceNumberNew.replace(/.*:/, '').trim();



                                            const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                                                const amount = parseFloat(hsnLine.amount) || 0;
                                                const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                                                return add + amount + taxAmount * 2;
                                            }, 0).toFixed(2);

                                            let igst = "0.00";
                                            let cgst = "0.00";
                                            let sgst = "0.00";

                                            for (const hsnLine of structuredHSNLines) {
                                                if (hsnLine.taxPercentage === 18) {
                                                    igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                } else if (hsnLine.taxPercentage === 9) {
                                                    cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                    sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                                                }
                                            }

                                            currentInvoice = {
                                                "venName": vendorName || '',
                                                "gstNumber": gstNumber,
                                                "invoiceDate": invoiceDate,
                                                "invoiceNumber": invoiceNumber,
                                                "invoiceCurrency": invoiceCurrency,
                                                "financialYear": financialYear,
                                                "invoiceAmount": invoiceAmount,
                                                "cgst": cgst,
                                                "sgst": sgst,
                                                "igst": igst,
                                            };

                                            InvoiceLines.push(currentInvoice);
                                            gstNumberExtracted = true;
                                        }
                                    }
                                }

                                console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
                                console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(structuredHSNLines, null, 2)
                                );

                                console.log(
                                    "IMAGE HSN DATA",
                                    JSON.stringify(InvoiceLines, null, 2)
                                );
                                props.extractedHsnData(structuredHSNLines);
                                props.extractedData(InvoiceLines[0]);
                            }

                            Ksr();
                        }

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

    const imageFileUpload: UploadProps = {
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
                message.warning("Only pdf and image files are allowed!");
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

    const handleVendorOnChange = (val: any) => {
        setSelectedVendor(val);
    }

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
                                    <Form.Item label="Vendors" name="vendors">
                                        <Select
                                            placeholder="Vendors"
                                            onChange={(value) => handleVendorOnChange(value)}
                                        >
                                            {Object.keys(VendorNameEnum).map(vendors => {
                                                return <Select.Option value={VendorNameEnum[vendors]}>{VendorNameEnum[vendors]}</Select.Option>
                                            })}

                                        </Select>
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
                                            disabled={!selectedVendor}
                                            name="file"
                                            accept=".pdf,.jpeg,.png,.jpg"
                                            multiple
                                            onChange={handleFileChange}
                                            customRequest={({ file }) => handleFileChange(file)}
                                        >
                                            <Button
                                                style={{ color: "black", backgroundColor: selectedVendor ? "#7ec1ff" : '#0000000a' }}
                                                icon={<UploadOutlined />}
                                                onClick={handleUploadDocument}
                                                disabled={!selectedVendor}
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
                                    width="100%"
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
