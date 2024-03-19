import { Card, Upload, message, Form, Row, Col, Button, Result, Input } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react'

const { Dragger } = Upload;
import { Document, pdfjs } from 'react-pdf';

import { DiaPDFModel, LegalPoPdfModel } from '@project-management-system/shared-models';
import { AdobeAcrobatApiService,  LevisService} from '@project-management-system/shared-services';
import PoPdfTable from './po-pdf-table';
import { extractDataFromPoPdf } from './po-pdf-extraction-helper'
// import { DiaPdfDataExtractor } from './dia-pdf-extraction-helper';
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
    // {
    //     pdfName: 'PO PDF',
    //     pdfKeyText: 'RALPH'
    // },
    {
        pdfName: 'PO PDF',
        pdfKeyText: 'Purchase Order'
    }
]

const pdfIndexes = {
    poNumber: 6
}


const LevisPdfUpload: React.FC<IPdfUploadProps> = (props) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [diaPDFValues, setDiaPDFValues] = useState<DiaPDFModel>()
    const [resultProps, setResultProps] = useState<ResultPropsModel>()
    const [poPdfData, setPoPdfData] = useState<any>()


    const [diaPDfForm] = Form.useForm()
    const levisService = new LevisService();
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

    const extractTextFromPdf = async (pdfFile) => {
        const pdfData = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        let text = '';
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(' ');
        let title = pdfFilesValidationObject.filter((val) => text.match(val.pdfKeyText) != undefined)[0]?.pdfName
        if (title) {
            extractPoPdfData(pdf, textContent)
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

    const savePdfFields = () => {
        levisService.saveLevisOrder(poPdfData).then((res) => {
            if (res.status) {
                onReset()
                if (fileList) {
                    const formData = new FormData();
                    fileList.forEach((file: any) => {
                        formData.append('file', file);
                        formData.append('poNumber', poPdfData?.poNumber);
                        formData.append('jsonData',JSON.stringify(poPdfData))
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
        <Card title='Order Upload'>
            {resultProps === undefined &&
                <Row gutter={24} >
                     <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 5 }}
                        lg={{ span: 5 }}
                        xl={{ span: 4 }}
                    >
                        <Form.Item>
                            <Button type='primary' onClick={levisBot}>Auto Upload Bot</Button>
                        </Form.Item>
                    </Col> 

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

export default LevisPdfUpload;