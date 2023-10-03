import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, message } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export default function DPOMSyncManually() {
    const nikeService = new NikeService();
    const [filesData, setFilesData] = useState([])
    const [syncdata, setsyncdata] = useState<any[]>([])
    let navigate = useNavigate();

    useEffect(() => {
        getUploadFilesData();
        getDpomSyncDetails();
    }, [])

    const getUploadFilesData = () => {
        nikeService.getUploadFilesData().then((res) => {
            if (res.status) {
                console.log(res.data.length)
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

    const getDpomSyncDetails = () => {
        nikeService.getDpomSyncDetails().then((res) => {
            if (res.status) {
                setsyncdata(res.data)
            } else {
                setsyncdata([])

            }
        })
    }

    return (
        <>
            <Card title="Nike PPM Data Preparation">
                <span>
                    <Descriptions style={{ alignItems: 'right' }} column={4}>
                        <Descriptions.Item>{<b>Last Sync Details</b>}</Descriptions.Item>
                        <Descriptions.Item label={<b>Last Sync Date & Time</b>}>
                            {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Last Sync Status</b>}>
                            {'DPOM : ' + filesData[0]?.status} <br /> {'CRM : ' + filesData[0]?.status}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Last Sync data</b>}>
                            {'Total Records : ' + (syncdata[0]?.totalRecords == '0' ? '0' : syncdata[0]?.totalRecords)} <br />
                            {'New Reocrds : ' + (syncdata[0]?.todayrecords == '0' ? '0' : syncdata[0]?.todayrecords)}
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
