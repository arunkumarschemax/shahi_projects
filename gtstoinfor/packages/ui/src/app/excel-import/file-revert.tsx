import { Button, Card, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';

export function FileRevert() {

    useEffect(() => {
        getUploadFilesData()
    }, [])

    const service = new OrdersService()

    const [data, setData] = useState<any[]>([])

    const getUploadFilesData =() =>{
        service.getUploadFilesData().then((res)=>{
            if(res.status){
                setData(res.data)
                AlertMessages.getSuccessMessage(res.internalMessage)
            }else{
                AlertMessages.getErrorMessage(res.internalMessage)

            }
        })
    }

    

    const columns = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',

        },
        {
            title: 'Uploaded Date ',
            dataIndex: 'Uploaded Date'
        },
        {
            title: 'File Name',
            dataIndex: 'File Name'
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (text, record) => (
                <>
                    <Popconfirm
                        title="Are you sure you want to delete this file?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined style={{ color: 'red' }} />} />
                    </Popconfirm>


                </>
            )
        }]

    return (
        <>
        <Card 
        title="Revert Files">
            <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />
            </Card>
        </>

    )
}



export default FileRevert