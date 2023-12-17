import { Card, Upload, message, Form, Row, Col, Button, Result, Input } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react'

const { Dragger } = Upload;
import { Document, pdfjs } from 'react-pdf';

import { DiaPDFModel, LegalPoPdfModel } from '@project-management-system/shared-models';
import { AdobeAcrobatApiService, NikeService } from '@project-management-system/shared-services';
import PoPdfTable from './po-pdf-table';
import { extractDataFromPoPdf } from './po-pdf-extraction-helper'
import { DiaPdfDataExtractor } from './dia-pdf-extraction-helper';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface IPdfUploadProps {

}

class ResultPropsModel {
    status: any;
    title: any;
    subtitle: any;
    extra: any
}

const pdfFilesValidationObject = [
    {
        pdfName: 'DIA Document',
        pdfKeyText: 'D E L I V E R Y   I N S T R U C T I O N S'
    }, {
        pdfName: 'PO PDF',
        pdfKeyText: 'BUYER:'
    }
]

const pdfIndexes = {
    poNumber: 6
}


const PdfUpload: React.FC<IPdfUploadProps> = (props) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [diaPDFValues, setDiaPDFValues] = useState<DiaPDFModel>()
    const [resultProps, setResultProps] = useState<ResultPropsModel>()
    const [poPdfData, setPoPdfData] = useState<any>()


    const [diaPDfForm] = Form.useForm()
    const nikeDpomService = new NikeService();
    const adobeAcrobatApi = new AdobeAcrobatApiService()

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

    async function extractPoPdfData(pdf: any, pdfText: any) {
        const poData = await extractDataFromPoPdf(pdf)
        setPoPdfData(poData)
    }

    async function extractDiaDocumentData(pdf: any, pdfText: any) {
        const data: DiaPDFModel = await DiaPdfDataExtractor(pdf)
        if (data.cabCode.length > 5) {
            data.cabCode = null
        }
        setDiaPDFValues(data)
        diaPDfForm.setFieldsValue(data)
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
        updateResultProps(title)
    };

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

    function renderDiaForm() {
        return (
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

    const savePdfFields = () => {
        if (resultProps?.title.includes('DIA Document')) {
            const formValues = diaPDfForm.getFieldsValue();
            nikeDpomService.saveDIAPDFData(formValues).then((res) => {
                if (res.status) {
                    onReset()
                    alert(res.internalMessage)
                    message.success(res.internalMessage)
                } else {
                    message.error(res.internalMessage)
                }
            })
        } else {
            nikeDpomService.saveLegalPOPDFData(poPdfData).then((res) => {
                if (res.status) {
                    onReset()
                    alert(res.internalMessage)
                    message.success(res.internalMessage)
                } else {
                    message.error(res.internalMessage)
                }
            })
        }
    }

    function onReset() {
        setDiaPDFValues(undefined);
        setFileList([]);
        setPoPdfData(undefined)
        setResultProps(undefined)
    }

    function renderPDFOutPut() {
        if (resultProps && resultProps.status == 'success') {
            if (resultProps?.title.includes('PO PDF') && poPdfData) {
                return <PoPdfTable data={poPdfData} />
            }
            if (resultProps?.title.includes('DIA Document') && diaPDFValues) {
                return renderDiaForm()
            }
        }
        return <></>
    }

    return (
        <Card title='Upload PDF'>
            {resultProps === undefined &&
                <Row gutter={24} >
                    <Col span={24}>
                        <Dragger {...uploadProps} >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Please upload only valid documents .
                            </p>

                        </Dragger>
                    </Col>
                </Row>}
            <Row gutter={24} justify={'center'}  >
                {resultProps !== undefined &&
                    <>
                        <Col span={24}>
                            <Result {...resultProps} />
                        </Col>
                        {resultProps.status == 'success' ? <>
                            <Col span={24}>
                                {renderPDFOutPut()}
                            </Col>
                            <Col span={2}>
                                <Button onClick={savePdfFields} type={'primary'} >Submit</Button>
                            </Col>
                            <Col span={2}>
                                <Button onClick={onReset} >Reset</Button>
                            </Col>
                        </> : <>
                            <Col span={2}>
                                <Button onClick={onReset} >Reset</Button>
                            </Col>
                        </>
                        }
                    </>
                }
            </Row>
        </Card>
    )
}

export default PdfUpload;