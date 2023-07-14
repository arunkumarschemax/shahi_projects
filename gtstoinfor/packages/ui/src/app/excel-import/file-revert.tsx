import { Button, Card, Popconfirm, Table } from 'antd'
import React from 'react'
import { DeleteOutlined } from '@ant-design/icons';

export function FileRevert() {

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
            <Table columns={columns} scroll={{ x: 1000 }} />
            </Card>
        </>

    )
}



export default FileRevert