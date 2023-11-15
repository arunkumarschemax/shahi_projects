import { UploadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { VendorNameEnum } from '@xpparel/shared-models';
import { Button, Card, Col, Form, FormInstance, Radio, Row, Select, Spin, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import loadingSymbol from '../../../assets/images/1_yE-S7HG0Rg-ACAcnjvKf5Q.gif';
import { checkIsScannedPdf, extractApl, extractDart, extractDhl, extractEfl, extractMsn, extractExpeditors, extractMaersk, extractNagel, extractOocl, extractPDFDataToLinesData, extractFredexfrieght, extractFredexCourier, extractDhlCourierfrieght, extractDhlairduty, extractTotalTransport, extractSanjayForwarder, extractOneTime, extractTiger, extractOia, extractTextiles,extractedUnicorn, extractedUnique, extractedTvs, extractedVelogicIndia, extracteWiderlogistics, extractedWorldLine, extractedKwe, extractedUps, extractedCube, extractedAps, extractChRowbin, extractSavinoDell, extractLxpantos, extractMgh, extractDelmar, extractToll, extractDBSCHENKAR } from './schemax-ai-docx-pdf';
import { extractDataFromScannedImages, extractDpInvoiceDataFromScanned, extractEflInvoiceDataFromScanned, extractKrsnaInvoiceDataFromScanned, extractKsrInvoiceDataFromScanned, extractLigiInvoiceDataFromScanned,  extractNikkouInvoiceDataFromScanned, extractNipponInvoiceDataFromScanned, extractOoclInvoiceDataFromScanned, extractRingoCargoInvoiceDataFromScanned, extractSrijiInvoiceDataFromScanned, extractSrivaruInvoiceDataFromScanned, extractTriwayInvoiceDataFromScanned, extractVinayakaInvoiceDataFromScanned, extractWaymarknvoiceDataFromScanned, getImagesFromPdf } from './schemax-ai-docx-scanned-pdf';
;
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
    const [downloadLink, setDownloadLink] = useState(null);
    const [imageDownloadLinks, setImageDownloadLinks] = useState([]);

    const handleFileChange = (info) => {
        if (info?.file?.type === 'application/pdf') {
            if (info?.fileList[0]) {
                setFile(info.fileList[0]);
                displayPdf(info.fileList[0].originFileObj);
                // message.success(`${info.file.name} file uploaded successfully`);
            } else {
                setFile(null);
                setPdfData(null);
            }
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
        if (pdfDataUrl) {
            const response = await fetch(pdfDataUrl);
            const pdfBuffer = await response.arrayBuffer();
            const pdfData = await pdfjs.getDocument({ data: pdfBuffer }).promise;
            let processedData: any = {};
            switch (selectedVendor) {
                case VendorNameEnum.extractedSavinoDell:
                    processedData = await extractSavinoDell(pdfData);
                    console.log('PDF DATA SAVINO DELL:', processedData);
                    break;
                case VendorNameEnum.extractedLxpantos:
                    processedData = await extractLxpantos(pdfData);
                    console.log('PDF DATA Lxpantos:', processedData);
                    break;
                case VendorNameEnum.extractedMgh:
                    processedData = await extractMgh(pdfData);
                    console.log('PDF DATA MGH:', processedData);
                    break;
                case VendorNameEnum.extractedNagel:
                    processedData = await extractNagel(pdfData);
                    console.log('PDF DATA NAGEL:', processedData);
                    break;
                case VendorNameEnum.extractedDelmar:
                    processedData = await extractDelmar(pdfData);
                    console.log('PDF DATA DELMAR:', processedData);
                    break;
                case VendorNameEnum.extractedToll:
                    processedData = await extractToll(pdfData);
                    console.log('PDF DATA TOLL:', processedData);
                    break;
                case VendorNameEnum.extractedDhl:
                    processedData = await extractDhl(pdfData);
                    console.log('PDF DATA DHL:', processedData);
                    break;
                case VendorNameEnum.extractedDhlCourierfrieght:
                    processedData = await extractDhlCourierfrieght(pdfData);
                    console.log('PDF DATA DHL COURIER:', processedData);
                    break;
                case VendorNameEnum.extractedDhlairduty:
                    processedData = await extractDhlairduty(pdfData);
                    console.log('PDF DATA DHL AIR FREIGHT:', processedData);
                    break;
                case VendorNameEnum.extractedMsn:
                    processedData = await extractMsn(pdfData);
                    console.log('PDF DATA MSN:', processedData);
                    break;
                case VendorNameEnum.extractedDart:
                    processedData = await extractDart(pdfData);
                    console.log('PDF DATA DART:', processedData);
                    break;
                case VendorNameEnum.extractedExpeditors:
                    processedData = await extractExpeditors(pdfData);
                    console.log('PDF DATA EXPEDITORS:', processedData);
                    break;
                case VendorNameEnum.extractedApl:
                    processedData = await extractApl(pdfData);
                    console.log('PDF DATA Fredexfrieght:', processedData);
                    break;
                case VendorNameEnum.extractedFredexFrieght:
                    processedData = await extractFredexfrieght(pdfData);
                    console.log('PDF DATA Fredexfrieght:', processedData);
                    break;
                case VendorNameEnum.extractedFredexCourier:
                    processedData = await extractFredexCourier(pdfData);
                    console.log('PDF DATA FREDEX FREIGHT COURIER:', processedData);
                    break;
                case VendorNameEnum.extractedOocl:
                    processedData = await extractOocl(pdfData);
                    console.log('PDF DATA OOCL:', processedData);
                    break;
                case VendorNameEnum.extractedTotalTransport:
                    processedData = await extractTotalTransport(pdfData);
                    console.log('PDF DATA TOTAL TRANSPORT:', processedData);
                    break;
                case VendorNameEnum.extractedSanjayForwarder:
                    processedData = await extractSanjayForwarder(pdfData);
                    console.log('PDF DATA SanjayForwarder:', processedData);
                    break;
                case VendorNameEnum.extractedOneTime:
                    processedData = await extractOneTime(pdfData);
                    console.log('PDF DATA OneTime:', processedData);
                    break;
                case VendorNameEnum.extractedTiger:
                    processedData = await extractTiger(pdfData);
                    console.log('PDF DATA TIger:', processedData);
                    break;
                case VendorNameEnum.extractedOia:
                    processedData = await extractOia(pdfData);
                    console.log('PDF DATA OIA:', processedData);
                    break;
                case VendorNameEnum.extractedTextiles:
                    processedData = await extractTextiles(pdfData);
                    console.log('PDF DATA TEXTILES:', processedData);
                    break;
                case VendorNameEnum.extractedUnicorn:
                    processedData = await extractedUnicorn(pdfData);
                    console.log('UNICORN:', processedData);
                    break;
                case VendorNameEnum.extractedUnique:
                    processedData = await extractedUnique(pdfData);
                    console.log('UNIQUE:', processedData);
                    break;
                case VendorNameEnum.extractedTvs:
                    processedData = await extractedTvs(pdfData);
                    console.log('TVS:', processedData);
                    break;
                // case VendorNameEnum.extractedUnitedLiner:
                //                 processedData = await extractedUnitedLiner(pdfData);
                //                 console.log('UNITED LINER:', processedData);
                //                 break;
                  case VendorNameEnum.extractedVelogicIndia:
                                processedData = await extractedVelogicIndia(pdfData);
                                console.log('VELOGIC INDIA:', processedData);
                                break;
                   case VendorNameEnum.extracteWiderlogistics:
                                processedData = await extracteWiderlogistics(pdfData);
                                console.log('WIDER LOGISTICS:', processedData);
                                break;
                                // extracteWorldLine
                    case VendorNameEnum.extractedWorldLine:
                                processedData = await extractedWorldLine(pdfData);
                                console.log('WORLD LINE:', processedData);
                                break;
                    case VendorNameEnum.extractedKwe:
                                processedData = await extractedKwe(pdfData);
                                console.log('KWE:', processedData);
                                 break;
                    case VendorNameEnum.extractedUps:
                                processedData = await extractedUps(pdfData);
                                console.log('UPS:', processedData);
                                 break;
                    case VendorNameEnum.extractedCube:
                                processedData = await extractedCube(pdfData);
                                console.log('20 CUBE:', processedData);
                                 break;
                    case VendorNameEnum.extractedAps:
                                processedData = await extractedAps(pdfData);
                                console.log('20 CUBE:', processedData);
                                 break;
                    case VendorNameEnum.extractChRowbin:
                                processedData = await extractChRowbin(pdfData);
                                console.log('20 CUBE:', processedData);
                                 break;     
                    case VendorNameEnum.extractDBSCHENKAR:
                                processedData = await extractDBSCHENKAR(pdfData);
                                console.log('20 CUBE:', processedData);
                                 break;       
                // case VendorNameEnum.extractedEfl:
                //     {
                //         const isScannedPdf = await checkIsScannedPdf(pdfData)
                //         if (isScannedPdf) {
                //             const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //             const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //             processedData = await extractAplInvoiceDataFromScanned(allLines);
                //         } else {
                //             processedData = await extractEfl(pdfData);
                //         }
                //         break;
                //     }

                case VendorNameEnum.extractedKrsna:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractKrsnaInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }
                case VendorNameEnum.extractedKsr:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractKsrInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedDp:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractDpInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedLigi:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractLigiInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedNikkou:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractNikkouInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedRingoCarago:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractRingoCargoInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedSriji:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractSrijiInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedTriway:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractTriwayInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }


                case VendorNameEnum.extractedVinayaka:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractVinayakaInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedNippon:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractNipponInvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                case VendorNameEnum.extractedWaymark:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractWaymarknvoiceDataFromScanned(allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                // case VendorNameEnum.extractedApl:
                //     {
                //         const isScannedPdf = await checkIsScannedPdf(pdfData)
                //         if (isScannedPdf) {
                //             const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //             const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //             processedData = await extractAplInvoiceDataFromScanned(allLines);
                //         } else {
                //             processedData = await extractEfl(pdfData);
                //         }
                //         break;
                //     }

                case VendorNameEnum.extractedSrivaru:
                    {
                        const isScannedPdf = await checkIsScannedPdf(pdfData)
                        if (isScannedPdf) {
                            const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                            const allLines = await extractDataFromScannedImages(pageImages, [0]);
                            processedData = await extractSrivaruInvoiceDataFromScanned
                                (allLines);
                        } else {
                            processedData = await extractEfl(pdfData);
                        }
                        break;
                    }

                // case VendorNameEnum.extractedOocl:
                //     processedData = await extractOocl(pdfData);
                //     console.log('PDF DATA OOCL:', processedData)
                //     break;
                // case VendorNameEnum.extractedNagel:
                //     processedData = await extractNagel(pdfData);
                //     console.log('PDF DATA Nagel:', processedData);
                //     break;
                // case VendorNameEnum.extractedApl:
                //     processedData = await extractApl(pdfData);
                //     console.log('PDF DATA Apl:', processedData);
                //     break;

                // case VendorNameEnum.extractedApl: {
                //     const aplPDFData = await extractApl(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0, pageImages.length - 1]);
                //     // const allLines = await extractPDFDataToLinesData(pdfData);
                //     const scannedData = await extractAplInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData;
                //     // processedData['extractedData']['invoiceAmount']=aplPDFData.extractedData.invoiceAmount;
                //     // processedData['extractedData']['igst']=aplPDFData.extractedData.igst;
                //     // processedData['extractedData']['cgst']=aplPDFData.extractedData.cgst;
                //     // processedData['extractedData']['sgst']=aplPDFData.extractedData.sgst;

                //     processedData['extractedHsnData'] = aplPDFData.extractedHsnData;
                //     break;
                // }


                // case VendorNameEnum.extractedDhl: {
                //     const dhlPDFData = await extractDhl(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //     const scannedData = await extractDhlInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData||{};
                //     processedData['extractedData']['invoiceAmount']=dhlPDFData.extractedData.invoiceAmount;
                //     processedData['extractedData']['igst']=dhlPDFData.extractedData.igst;
                //     processedData['extractedData']['cgst']=dhlPDFData.extractedData.cgst;
                //     processedData['extractedData']['sgst']=dhlPDFData.extractedData.sgst;
                //     processedData['extractedHsnData'] = dhlPDFData.extractedHsnData;
                //     break;
                // }

                // case VendorNameEnum.extractedDart: {
                //     const dartPDFData = await extractDart(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //     const scannedData = await extractDartInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData||{};
                //     processedData['extractedData']['invoiceAmount']=dartPDFData.extractedData.invoiceAmount;
                //     processedData['extractedData']['igst']=dartPDFData.extractedData.igst;
                //     processedData['extractedData']['cgst']=dartPDFData.extractedData.cgst;
                //     processedData['extractedData']['sgst']=dartPDFData.extractedData.sgst;
                //     processedData['extractedHsnData'] = dartPDFData.extractedHsnData;
                //     break;
                // }

                case VendorNameEnum.extractedEfl: {
                    const eflPDFData = await extractEfl(pdfData);
                    // const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                    // const allLines = await extractDataFromScannedImages(pageImages, [0]);
                    // const scannedData = await extractEflInvoiceDataFromScanned(allLines);
                    // processedData['extractedData'] = scannedData.extractedData||{};
                    // processedData['extractedData']['invoiceAmount']=eflPDFData.extractedData.invoiceAmount;
                    // processedData['extractedData']['igst']=eflPDFData.extractedData.igst;
                    // processedData['extractedData']['cgst']=eflPDFData.extractedData.cgst;
                    // processedData['extractedData']['sgst']=eflPDFData.extractedData.sgst;
                    // processedData['extractedHsnData'] = eflPDFData.extractedHsnData;
                    processedData = eflPDFData;
                    break;
                }

                // case VendorNameEnum.extractedExpeditors: {
                //     const expeditorsPDFData = await extractExpeditors(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //     const scannedData = await extractExpeditorsInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData||{};
                //     processedData['extractedData']['invoiceAmount']=expeditorsPDFData.extractedData.invoiceAmount;
                //     processedData['extractedData']['igst']=expeditorsPDFData.extractedData.igst;
                //     processedData['extractedData']['cgst']=expeditorsPDFData.extractedData.cgst;
                //     processedData['extractedData']['sgst']=expeditorsPDFData.extractedData.sgst;
                //     processedData['extractedHsnData'] = expeditorsPDFData.extractedHsnData;
                //     break;
                // }

                // case VendorNameEnum.extractedOocl: {
                //     const ooclPDFData = await extractOocl(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //     const scannedData = await extractOoclInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData || {};
                //     processedData['extractedData']['invoiceAmount'] = ooclPDFData.extractedData.invoiceAmount;
                //     processedData['extractedData']['igst'] = ooclPDFData.extractedData.igst;
                //     processedData['extractedData']['cgst'] = ooclPDFData.extractedData.cgst;
                //     processedData['extractedData']['sgst'] = ooclPDFData.extractedData.sgst;
                //     processedData['extractedHsnData'] = ooclPDFData.extractedHsnData;
                //     break;
                // }

                // case VendorNameEnum.extractedNagel: {
                //     const nagelPDFData = await extractNagel(pdfData);
                //     const pageImages = await getImagesFromPdf(pdfData, setImageDownloadLinks);
                //     const allLines = await extractDataFromScannedImages(pageImages, [0]);
                //     const scannedData = await extractNagelInvoiceDataFromScanned(allLines);
                //     processedData['extractedData'] = scannedData.extractedData || {};
                //     processedData['extractedData']['invoiceAmount'] = nagelPDFData.extractedData.invoiceAmount;
                //     processedData['extractedData']['igst'] = nagelPDFData.extractedData.igst;
                //     processedData['extractedData']['cgst'] = nagelPDFData.extractedData.cgst;
                //     processedData['extractedData']['sgst'] = nagelPDFData.extractedData.sgst;
                //     processedData['extractedHsnData'] = nagelPDFData.extractedHsnData;
                //     break;
                // }

                case VendorNameEnum.extractedMaersk:
                    processedData = await extractMaersk(pdfData);
                    console.log('PDF DATA Maersk:', processedData);
                    break;

                default:
                    console.log('Unknown source:', selectedVendor);
                    break;
            }
            extractedData(processedData.extractedData);
            extractedHsnData(processedData.extractedHsnData);

            const extractionTime = new Date().toLocaleString();
            setTimeout(() => {
                setIsLoading(false);
                message.success(' File Uploaded Successfully');
                setExtractionCompleted(true);
                setShowCancelButton(true);
            }, 2000);
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
            if (!file.name.match(/\.(pdf)$/)) {
                message.warning("Only pdf files are allowed!");
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
                                            showSearch
                                            placeholder="Vendors"
                                            optionFilterProp="children"
                                            onChange={(value) => handleVendorOnChange(value)}
                                        >
                                            {Object.keys(VendorNameEnum)
                                                .sort()
                                                .map(vendor => (
                                                    <Select.Option key={VendorNameEnum[vendor]} value={VendorNameEnum[vendor]}>
                                                        {VendorNameEnum[vendor]}
                                                    </Select.Option>
                                                ))}
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
                                            accept=".pdf"
                                            multiple={false}
                                            onChange={handleFileChange}
                                            customRequest={({ file }) => handleFileChange(file)}
                                            {...imageFileUpload}
                                        >
                                            <Button
                                                style={{ color: "black", backgroundColor: selectedVendor ? "#7ec1ff" : '#0000000a' }}
                                                icon={<UploadOutlined />}
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
                                                                <img src={loadingSymbol} alt="Please wait..." height={100} width={100} />
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
                    {downloadLink}
                    <div>
                        {imageDownloadLinks.map((link, index) => (
                            <div key={index}>
                                <a href={link.url} download={link.filename}>
                                    Download {link.filename}
                                </a>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DocReader;
