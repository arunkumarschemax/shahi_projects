import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, message, Row, theme, Typography, Upload, UploadProps } from 'antd';
import { InboxOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadFile } from 'antd/lib';
import { AlertMessages } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
const { useToken } = theme;

export class FileStatusReq {
    fileId: number; 
    status: string;
} 

const BomExcelUpload = () => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[] | any>([]);
    const { token: { colorPrimary } } = useToken();
    const [visible, setVisible] = useState(true);
    const service = new BomService();

//    console.log(fileList,"fileListfileList*********************************");
   

    const handleUpload = async () => {
        AlertMessages.getCustomIconMessage("excelupload", "Excel is uploading", <LoadingOutlined style={{ color: '#22C55E' }} />);
        if (fileList.length) {
            const formData = new FormData();
            formData.append('file', fileList[0]);
            service.saveExcelData(formData).then((res) => {
                if (res.data.status === true) {
                    AlertMessages.getCustomIconMessage("excelupload", "Excel Uploaded Successfully", <CheckCircleOutlined style={{ color: '#22C55E' }} />, 2);
                } else {
                    AlertMessages.getInfoMessage("excelupload");
                }
            }).catch((err) => {
                AlertMessages.getErrorMessage("excelupload");
            }).finally(() => {
                setFileList([]);
            });
        }
    }

    const uploadProps: UploadProps = {
        name: 'file',
        accept: '.xlsx',
        multiple: false,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            setVisible(true);
        },
        beforeUpload: (file) => {
            setVisible(false);
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        showUploadList: true,
        listType: 'picture-card'
    };

    console.log("changes reflected", visible);

    return (
        <>
        <Card title="Bom Excel Upload" headStyle={{ color: 'black', fontWeight: 'bold' }}>
            <Form>
            <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item>
                            <Dragger    {...uploadProps} >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: colorPrimary }} />
                                </p>
                                <Typography.Text>Click or drag file to this area to upload</Typography.Text>
                                <Typography.Text>
                                    Please upload only valid documents .
                                </Typography.Text>
                            </Dragger>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                    <Col span={2} >
                        <Button disabled={visible} type='primary' onClick={handleUpload}>Upload</Button>
                    </Col>
                </Row>
            </Form></Card>
        </>
    );
}

export default BomExcelUpload;

