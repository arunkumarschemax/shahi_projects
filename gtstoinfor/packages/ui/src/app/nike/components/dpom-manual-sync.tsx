import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, message } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export default function DPOMSyncManually() {
    const nikeService = new NikeService();
    const [filesData, setFilesData] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        getUploadFilesData();
    }, [])

    const getUploadFilesData = () => {
        nikeService.getUploadFilesData().then((res) => {
            if (res.status) {
                setFilesData(res.data)
                // message.success(res.internalMessage)
            }
        })
    }

    const syncDpomData = () => {
        nikeService.saveDPOMDataToDataBase().then((res) => {
            if (res.status) {
                message.success('Data Sync Successful')
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    return (
        <>
            <Card title="Sync Nike DPOM & CRM Data Manually">
                <span>
                    <Descriptions style={{ alignItems: 'right' }}>
                        <Descriptions.Item>{<b>Last Sync Details</b>}</Descriptions.Item>
                        <Descriptions.Item label={<b>Last Sync Date & Time</b>}>
                            {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Last Sync Status</b>}>
                            {'DPOM : ' + filesData[0]?.status} <br /> {'CRM : ' + filesData[0]?.status}
                        </Descriptions.Item>
                    </Descriptions>
                </span>
                <Divider></Divider>
                <Button
                    type="primary"
                    onClick={syncDpomData}
                >
                    Sync DPOM & CRM Data
                </Button>
            </Card>
        </>
    );
}
