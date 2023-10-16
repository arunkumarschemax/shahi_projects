import { Button, Card, Popconfirm, Table, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { UndoOutlined } from '@ant-design/icons';
import { NikeService } from '@project-management-system/shared-services';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import { FileIdReq } from '@project-management-system/shared-models';

export function NikeFileRevert() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const service = new NikeService()
    const [data, setData] = useState<any[]>([])


    useEffect(() => {
        getUploadFilesData()
    }, [])

    const getUploadFilesData = () => {
        service.getUploadFilesData().then((res) => {
            if (res.status) {
                setData(res.data)
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
            // render: (value, record) => {
            //     return (
            //         moment(record.uploadedDate).format('YYYY-MM-DD HH:mm:ss')
            //     )
            // }
        },
        {
            title: 'DPOM API (sync status)',
            dataIndex: 'status',align:'center'
        },
        {
            title: 'CRM API (sync status)',
            dataIndex: 'status',align:'center'
        },
        {
            title: 'Uploaded User',
            dataIndex: 'createdUser',align:'center'
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            width:150,
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
                                <Button size='small' icon={<UndoOutlined style={{ color: 'red' }} />}>Revert File</Button>
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
                    
                    className="custom-table-wrapper"
                    scroll={{ x: 'max-content', y: 450 }}
                    pagination={{
                        pageSize: 50,
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



export default NikeFileRevert