import { Button, Card, Popconfirm, Table, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { UndoOutlined } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import { FileIdReq } from '@project-management-system/shared-models';

export function FileRevert() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);

    useEffect(() => {
        getUploadFilesData()
    }, [])

    const service = new OrdersService()

    const [data, setData] = useState<any[]>([])

    const getUploadFilesData = () => {
        service.getUploadFilesData().then((res) => {
            if (res.status) {
                setData(res.data)
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    const revertFileData = (value) => {
        const req = new FileIdReq()
        req.fileId = value
        service.revertFileData(req).then((res) => {
            if (res.status) {
                getUploadFilesData()
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    const columns: ColumnProps<any>[] = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Uploaded Date ',
            dataIndex: 'uploadedDate',
            render: (value, record) => {
                return (
                    moment(value).utc().format('YYYY-MM-DD HH:mm:ss')
                )
            }
        },
        {
            title: 'File Name',
            dataIndex: 'fileName'
        },
        {
            title: 'Upload Status',
            dataIndex: 'status'
        },
        {
            title: 'Uploaded User',
            dataIndex: 'createdUser'
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (text, record, index) => {
                const isFirstRecord = index === 0 && page === 1;
                return (
                    <>
                        {isFirstRecord && (
                            <Popconfirm
                                title="Are you sure to revert this file?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => revertFileData(record?.fileId)}
                            >
                                <Button icon={<UndoOutlined style={{ color: 'red' }} />}>Revert File</Button>
                            </Popconfirm>
                        )}
                        {!isFirstRecord && <></>}
                    </>
                )
            },
        }];


    return (
        <>
            <Card
                title="Uploaded Files List">
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1000 }}
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    bordered />
            </Card>
        </>

    )
}



export default FileRevert