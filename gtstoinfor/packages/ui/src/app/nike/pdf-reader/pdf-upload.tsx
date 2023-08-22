import { Card, Upload, message, Form, Row, Col, Button, Result, Input } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react'

const { Dragger } = Upload;
import { Document, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

import { DiaPDFModel, LegalPoPdfModel } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface IPdfUploadProps {

}

const pdfFilesValidationObject = [
    {
        pdfName: 'DIA Document',
        pdfKeyText: 'D E L I V E R Y   I N S T R U C T I O N S'
    }, {
        pdfName: 'PO PDF',
        pdfKeyText: 'BUYER:  NIKE Trading Company'
    }
]
const pdfIndexes = {
    poNumber: 6
}


const PdfUpload: React.FC<IPdfUploadProps> = (props) => {

    const [pdfText, setPdfText] = useState<string>(undefined);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [diaPDFValues,setDiaPDFValues] = useState<DiaPDFModel>()
    const [diaPDfForm] = Form.useForm()
    const nikeDpomService  = new NikeService()

    const uploadProps: UploadProps = {
        name: 'file',
        accept: '.pdf',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            extractTextFromPdf(file)
            return false;
        },
        fileList,
        showUploadList: false
    };

    async function extractPoPdfData(pdf: PDFDocumentProxy, pdfText: any) {
        type LegalPoPdfType = InstanceType<typeof LegalPoPdfModel>;
        const legalPoPdf: LegalPoPdfType = new LegalPoPdfModel()
        const legalPoPdfArr: LegalPoPdfType[] = []
        const indexOfPoNumber = pdfText.items.findIndex((val: any) => val.str === "PO NUMBER")
        let poNumber = pdfText.items[`${indexOfPoNumber + pdfIndexes.poNumber}`].str.split("/")[1]
        legalPoPdf.poNumber = poNumber
        legalPoPdfArr.push(legalPoPdf)
        for (let i = 1; i < pdf.numPages; i++) {
            const page = await pdf.getPage(1);
            const textContent: any = await page.getTextContent();
            console.log(textContent, 'page no : ', i)
            for (const [index, rec] of textContent.items.entries()) {
                console.log(rec.str, ' - ', index)
            }
        }
        return poNumber
    }

    async function extractDiaDocumentData(pdf: PDFDocumentProxy, pdfText: any) {
        const diaPDF: DiaPDFModel = new DiaPDFModel()
        const targetStrForPo = 'Delivery Instructions';
        const deliveryInstrunctionStr = pdfText.items.find(item => item.str.includes(targetStrForPo)).str.split(":")[1];
        console.log(deliveryInstrunctionStr);

        diaPDF.poNumber = deliveryInstrunctionStr.split("-")[0].replace(/ /g, '')
        diaPDF.lineNo = deliveryInstrunctionStr.split("-")[1].replace(/ /g, '')
        const extractedShipToAddressStr = [];
        const page = await pdf.getPage(2);
        const textContent: any = await page.getTextContent();

        const startStrShipToAdd = 'Ship To Address:';
        const endStrShipToAdd = 'Notify Parties:';
        let shipToAddresFound = false;

        for (const  rec of textContent.items) {
            if (rec.str === startStrShipToAdd) {
                shipToAddresFound = true;
                continue;
            }
            if (rec.str === endStrShipToAdd) {
                shipToAddresFound = false;
                break;
            }

            if (shipToAddresFound) {
                if (rec.str.length) {
                    extractedShipToAddressStr.push(rec.str);
                }
            }
        }
        console.log(extractedShipToAddressStr)
        const cabCodeIndex = textContent.items.findIndex((val: any) => val.str === "CAB Code:")
        diaPDF.shipToAddress = extractedShipToAddressStr.join(",")
        diaPDF.cabCode = textContent.items[cabCodeIndex + 2].str;
        setDiaPDFValues(diaPDF)
        diaPDfForm.setFieldsValue(diaPDF)
        console.log(diaPDF)
    }


    const extractTextFromPdf = async (pdfFile) => {
        const pdfData = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        let text = '';
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(' ');
        let title = pdfFilesValidationObject.filter((val) => text.match(val.pdfKeyText) != undefined)[0]?.pdfName
        if (title === "PO PDF") {
            extractPoPdfData(pdf, textContent)
        } else if (title === "DIA Document") {
            extractDiaDocumentData(pdf, textContent)
        }
        setPdfText(text);
    };
    console.log(pdfText)
    const renderPdfresult = () => {
        let title = pdfFilesValidationObject.filter((val) => pdfText.match(val.pdfKeyText) != undefined)[0]?.pdfName
        console.log(title,'title')

        let status: any = '';
        let subtitle = '';
        let extra;
        if (title == undefined) {
            status = 'error'
            title = 'Wrong document uploaded'
            subtitle = 'Document doesnt match the criteria,please upload correct documet'

        } else {
            status = 'success'
            title = 'Document found  : ' + title
            subtitle = 'Please check the values below'
            extra = <>{renderFormFromValues()}</>
        }

        return (
            <Result
                status={status}
                title={title}
                subTitle={subtitle}
                extra={extra}
            />
        )
    }
    console.log(diaPDFValues,'2')

    function renderFormFromValues(){
        console.log(diaPDFValues,'1')
        return(
            <Form form={diaPDfForm} initialValues={diaPDFValues} layout='vertical'>
                <Row gutter={24} justify={'center'}>
                    <Col span={4}>
                        <Form.Item name={'poNumber'} label='PO Numnber'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name={'lineNo'} label='Line item No'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name={'cabCode'} label='CAB code'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={'shipToAddress'} label='Ship to address'>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>    
            </Form>
        )
    }

    const saveDiaPdfFields = (values) => {
        nikeDpomService.saveDiaPDFFields(values).then((res) => {
            if(res.status){
                message.success(res.internalMessage)
            }else{
                message.error(res.internalMessage)
            }
        })
    }

    function onReset(){
            setPdfText(undefined)
            setDiaPDFValues(undefined);
            setFileList(undefined)
    }
    return (
        <Card title='Upload PDF'>
            {pdfText === undefined ? <Row gutter={24} >
                <Dragger {...uploadProps} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>

                </Dragger>
            </Row> :
                <Row gutter={24} justify={'center'} >
                    <Col span={24}>
                        {renderPdfresult()}
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'} >Submit</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={onReset} >Reset</Button>
                    </Col>
                </Row>}
        </Card>
    )
}



export default PdfUpload;