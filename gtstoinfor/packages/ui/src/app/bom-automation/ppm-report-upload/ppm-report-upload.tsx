import { InboxOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Row, UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { UploadFile } from 'antd/lib/upload'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

export default function PPMReportUpload() {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const uploadProps: UploadProps = {
        name: 'file',
        accept: '.xlsx' || '.xls',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            processExcelData(file)
            // return false;
        },
        fileList,
        showUploadList: false
    };

    console.log(fileList)

    async function processExcelData(file: any) {
        console.log(file)
        // const data = new Uint8Array(fileList[0]);
        // console.log(data)
        const workbook = await XLSX.readFile(fileList[0].name, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(json)
    }
    return (
        <PageContainer title='Upload PPM'>
            <Row>
                <Dragger {...uploadProps} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Please upload only valid documents .
                    </p>

                </Dragger>
            </Row>
        </PageContainer>
    )
}

