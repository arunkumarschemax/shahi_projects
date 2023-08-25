import { Card, Upload, message, Form, Row, Col, Button, Result } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react'

const { Dragger } = Upload;
import { pdfjs } from 'react-pdf';
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

const PdfUpload: React.FC<IPdfUploadProps> = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pdfText, setPdfText] = useState<string>(undefined);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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

    const extractTextFromPdf = async (pdfFile) => {
        const pdfData = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        let text = '';

        for (let i = 1; i <= 1; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            console.log(textContent);

            text += textContent.items.map((item: any) => item.str).join(' ');
        }

        setNumPages(pdf.numPages);
        setPdfText(text);
    };
    console.log(pdfText)

    const renderPdfresult = () => {
        console.log(pdfText)
        let title = pdfFilesValidationObject.filter((val) => pdfText.match(val.pdfKeyText) != undefined)[0]?.pdfName  
        console.log(title)

        let status:any='';
        let subtitle = '';
        let extra;
        if(title == undefined){
            status = 'error'
            title = 'Wrong document uploaded'
            subtitle='Document doesnt match the criteria,please upload correct documet'
            
        }else{
            status='success'
            title= 'Document found  : ' +  title 
            subtitle='Please check the values below'
            // extra = <><Descriptions></Descriptions></>
        }
        function onBack(){

        }
        
        return (
            <Result
                status={status}
                title={title}
                subTitle={subtitle}
                extra={[
                    <Button type="primary" key="console">
                        Back
                    </Button>,
                    <Button key="buy">Home</Button>,
                ]}
            />
        )
    }
    return (
        <Card title='Upload PDF'>
           { pdfText === undefined ? <Row gutter={24} >
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
            <Row gutter={24} justify={'end'} >
                <Col span={24}>
                    {renderPdfresult()}
                </Col>
                <Col span={2}>
                    <Button type={'primary'} >Submit</Button>
                </Col>
                <Col span={2}>
                    <Button  >Reset</Button>
                </Col>
            </Row>}
        </Card>
    )
}

export default PdfUpload;