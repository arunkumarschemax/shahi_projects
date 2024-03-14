import { Card, Upload, message, Form, Row, Col, Button, Result, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
const { Dragger } = Upload;
import { Document, pdfjs } from 'react-pdf';

import { DiaPDFModel, LegalPoPdfModel } from '@project-management-system/shared-models';
import { AdobeAcrobatApiService, LevisService } from '@project-management-system/shared-services';
import PoPdfTable from './po-pdf-table';
import { extractDataFromPoPdf } from './po-pdf-extraction-helper'
// import { DiaPdfDataExtractor } from './dia-pdf-extraction-helper';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface IPdfUploadProps { }

class ResultPropsModel {
    status: any;
    title: any;
    subtitle: any;
    extra: any
}

const pdfFilesValidationObject = [
    // {
    //     pdfName: 'PO PDF',
    //     pdfKeyText: 'RALPH'
    // },
    {
        pdfName: 'PO PDF',
        pdfKeyText: /\<\/\w+\>/
    }
]

const pdfIndexes = {
    poNumber: 6
}


const PvhPdfUpload: React.FC<IPdfUploadProps> = (props) => {
    const [fileList, setFileList] = useState([]);
    const [diaPDFValues, setDiaPDFValues] = useState<DiaPDFModel>()
    const [resultProps, setResultProps] = useState<ResultPropsModel>()
    const [poPdfData, setPoPdfData] = useState<any>()
    const [xmlText, setXmlText] = useState(null);



    const [diaPDfForm] = Form.useForm()
    const levisService = new LevisService();
    const adobeAcrobatApi = new AdobeAcrobatApiService()




    const uploadProps = {
        name: 'file',
        accept: '.xml',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            if (file.type === 'text/xml') {
                setFileList([file]);
                extractTextFromPdf(file);
            } else {
                message.error('Please upload only XML files.');
            }
            return false;
        },
        fileList,
        showUploadList: false
    };
    async function extractPoPdfData(pdf: any, pdfText: any) {
        const poData = await extractDataFromPoPdf(pdf)
        setPoPdfData(poData)
    }

    /* xml format ///////////////********************* */
    // const xmlFormat = (xml) => {
    //     if (xml.nodeType === Node.TEXT_NODE) {
    //         return xml.textContent.trim();
    //     }
    //     let result = '';
    //     if (xml.nodeType === Node.ELEMENT_NODE) {
    //         result += '<' + xml.tagName;

    //         for (let i = 0; i < xml.attributes.length; i++) {
    //             result += ' ' + xml.attributes[i].name + '="' + xml.attributes[i].value + '"';
    //         }
    //         result += '>';
    //         for (let i = 0; i < xml.childNodes.length; i++) {
    //             result += xmlFormat(xml.childNodes[i]);
    //         }
    //         if (xml.childNodes.length > 0) {
    //             result += '</' + xml.tagName + '>';
    //         } else {
    //             result += '/>';
    //         }
    //     }
    //     result += '\n';
    //     return result;
    // };

  
    /* extraction of xml */////////////////////////**************** */
    // const extractTextFromPdf = async (file) => {
    //     const reader = new FileReader();
    //     console.log(reader, "reader")
    //     reader.onload = async (e) => {
    //         let xmlText = e.target.result;

    //         if (typeof xmlText !== 'string') {
    //             const arrayBufferView = new Uint8Array(xmlText);
    //             const blob = new Blob([arrayBufferView], { type: 'text/xml' });

    //             const reader = new FileReader();

    //             reader.onload = (event) => {
    //                 xmlText = event.target.result.toString();
    //                 const parser = new DOMParser();
    //                 console.log(parser, "parser")

    //                 const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    //                 console.log(xmlDoc, "xmlDoc")

    //                 const textContent :any= (xmlDoc.documentElement);
    //                 console.log(textContent, "textContent");

    //                 // const formattedXmlText = textContent;
    //                 // console.log(JSON.stringify(formattedXmlText),null, "formattedXmlText");
    //                 extractDataFromPoPdf(textContent);

    //                 const title = pdfFilesValidationObject.find((val) => textContent.match(val.pdfKeyText))?.pdfName;
    //                 if (title) {
    //                     extractPoPdfData(xmlText, textContent);
    //                 }
    //                 updateResultProps(title);
    //             };
    //             reader.readAsText(blob);
    //         } else {
    //             const parser = new DOMParser();
    //             const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    //             const textContent:any = (xmlDoc.documentElement);
    //             console.log(textContent, "textContent");

    //             // const formattedXmlText = xmlFormat(textContent);
    //             // console.log(formattedXmlText, "formattedXmlText");
    //             extractDataFromPoPdf(textContent);

    //             const title = pdfFilesValidationObject.find((val) => textContent.match(val.pdfKeyText))?.pdfName;
    //             if (title) {
    //                 extractPoPdfData(xmlText, textContent);
    //             }
    //             updateResultProps(title);
    //         }
    //     };
    //     reader.readAsArrayBuffer(file);
    // };

    const extractTextFromPdf = async (file) => {
        const reader = new FileReader();
        console.log(reader, "reader")

        reader.onload = async (e) => {
            let xmlText = e.target.result;

            if (typeof xmlText !== 'string') {
                const arrayBufferView = new Uint8Array(xmlText);
                const blob = new Blob([arrayBufferView], { type: 'text/xml' });

                const reader = new FileReader();
                reader.onload = (event) => {
                    xmlText = event.target.result.toString();
                    xmlProcess(xmlText);
                };
                reader.readAsText(blob);
            } else {
                xmlProcess(xmlText);
            }
        };
        reader.readAsArrayBuffer(file);

        const xmlProcess = (xmlText) => {
            const parser = new DOMParser();
            console.log(parser, "parser")

            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            console.log(xmlDoc, "xmlDoc")

            const textContent = xmlDoc.documentElement;
            console.log(textContent, "textContent")
            extractDataFromPoPdf(textContent);

            const title = pdfFilesValidationObject.find((val) => xmlText.match(val.pdfKeyText))?.pdfName;
            console.log(title,"title")
            if (title) {
                extractPoPdfData(xmlText, textContent);
            }
            updateResultProps(title);
        };
    };

    // const extractTextFromPdf = async (file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         let xmlText = e.target.result;
    //         console.log(xmlText, "xmlText")

    //         if (typeof xmlText !== 'string') {
    //             const arrayBufferView = new Uint8Array(xmlText);
    //             const blob = new Blob([arrayBufferView], { type: 'text/xml' });
    //             console.log(blob, "blob")


    //             const reader = new FileReader();
    //             console.log(reader, "reader")

    //             reader.onload = (event) => {
    //                 xmlText = event.target.result.toString();

    //                 const parser = new DOMParser();
    //                 console.log(parser, "parser")

    //                 const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    //                 console.log(xmlDoc, "xmlDoc")

    //                 const extractedXmlData = xmlFormat(xmlDoc.documentElement);
    //                 extractPoPdfData(xmlText, extractedXmlData);
    //                 console.log(extractedXmlData, "extractedXmlData");
    //                 // console.log(JSON.stringify(extractedXmlData,null));
    //             };
    //             reader.readAsText(blob);
    //         } else {
    //             const parser = new DOMParser();
    //             const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    //             const extractedXmlData = xmlFormat(xmlDoc.documentElement);
    //             extractPoPdfData(xmlText, extractedXmlData);
    //             console.log(extractedXmlData, "extractedXmlData");
    //             // console.log(JSON.stringify(extractedXmlData,null));
    //         }
    //     };
    //     reader.readAsArrayBuffer(file);
    //     if (file) {
    //         // Remove this line as it's redundant
    //         // extractPoPdfData(xmlText, extractedXmlData);
    //     }
    //     updateResultProps(file);
    // };

    const updateResultProps = (title) => {
        const resultProps: ResultPropsModel = new ResultPropsModel()
        if (title == undefined) {
            resultProps.status = 'error'
            resultProps.title = 'Wrong document uploaded'
            resultProps.subtitle = 'Document doesnt match the criteria,please upload correct documet'
        } else {
            resultProps.status = 'success'
            resultProps.title = 'Document found  : ' + title
            resultProps.subtitle = 'Please check the values below'
        }
        setResultProps(resultProps)
    }


    const savePdfFields = () => {
        levisService.saveLevisOrder(poPdfData).then((res) => {
            if (res.status) {
                onReset()
                if (fileList) {
                    const formData = new FormData();
                    fileList.forEach((file: any) => {
                        formData.append('file', file);
                        formData.append('poNumber', poPdfData?.poNumber);
                        formData.append('jsonData', JSON.stringify(poPdfData))
                    })
                    console.log(formData, "form")
                    levisService.fileUpload(formData).then((res) => {
                        if (res.status) {
                            message.success(res.internalMessage)
                        }
                    })
                }
                // alert(res.internalMessage)
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    console.log(poPdfData?.poNumber, "addddddddd")

    function onReset() {
        setFileList([]);
        setPoPdfData(undefined)
        setResultProps(undefined)
    }

    function renderPDFOutPut() {
        if (resultProps && resultProps.status == 'success') {
            if (poPdfData) {
                return <PoPdfTable data={poPdfData} />
            }
        }
        return <></>
    }

    const levisBot = (req) => {
        levisService.levisBot().then(res => {
            if (res.status) {
                // setBuyer(res.data);
                // setPoPdfData(res.data)
                message.success("Button CLicked")
            }
        });
    };


    return (
        <Card title="Order Upload">
            {resultProps === undefined &&
                <Row gutter={24}>
                    <Col span={24}>
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Please upload only valid documents.</p>
                        </Dragger>
                    </Col>
                </Row>
            }
            < Row gutter={24} justify={'center'} >
                {resultProps !== undefined && <>
                    <Col span={24}>
                        <Result {...resultProps} />
                    </Col>
                    {
                        resultProps.status == 'success' ? <>
                            <Col span={24}>
                                {renderPDFOutPut()}
                            </Col>
                            < Col span={2} >
                                <Button onClick={savePdfFields} type={'primary'} > Submit </Button>
                            </Col>
                            < Col span={2} >
                                <Button onClick={onReset} > Reset </Button>
                            </Col>
                        </> : <>
                            < Col span={2} >
                                <Button onClick={onReset}> Reset </Button>
                            </Col>
                        </>
                    }
                </>

                }
            </Row>

        </Card>
    );
};

export default PvhPdfUpload;
