import { Button, Card, Popconfirm, Table, Tabs, TabsProps, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { UndoOutlined } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import { FileIdReq, FileTypesEnum } from '@project-management-system/shared-models';

export function FileRevert() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(100);
    const service = new OrdersService()
    const [data, setData] = useState<any[]>([])
    const [trimData, setTrimData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    useEffect(() => {
        getUploadFilesData()
    }, [])

    const getUploadFilesData = () => {
        service.getUploadFilesData().then((res) => {
            if (res.status) {
                setData(res.data)
                setTrimData(res.data.filter(e => e.fileType === 'Trim Order'));
                setPoData(res.data.filter(e => e.fileType === 'Projection Order'));            } else {
                message.error(res.internalMessage)
            }
        })
    }

    const revertFileData = (value,fileType) => {
        console.log(fileType)
        const req = new FileIdReq()
        req.fileId = value
        if(fileType == FileTypesEnum.PROJECTION_ORDERS){
            service.revertFileData(req).then((res) => {
                if (res.status) {
                    getUploadFilesData()
                    message.success(res.internalMessage)
                } else {
                    message.error(res.internalMessage)
                }
            })
        }
        else if(fileType == FileTypesEnum.TRIM_ORDERS){
            service.revertTrimFileData(req).then((res) => {
                if (res.status) {
                    getUploadFilesData()
                    message.success(res.internalMessage)
                } else {
                    message.error(res.internalMessage)
                }
            })
        }else{
            message.error('Something went wrong')
        }
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
                    moment(value).format('YYYY-MM-DD HH:mm:ss')
                )
            }
        },
        {
            title: 'File Name',
            dataIndex: 'fileName'
        },
        {
            title: 'No of Records',
            dataIndex: 'noofRecords',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.fileType === FileTypesEnum.PROJECTION_ORDERS ? `${record.projectionRecords ? (record.projectionRecords).toLocaleString('en-IN') : 0}` : `${record.trimRecords ? (record.trimRecords).toLocaleString('en-IN') : 0}`}
                    </>
                )
            }
        },
        {
            title: 'Total Order Quantity',
            dataIndex: 'orderqty',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.fileType === FileTypesEnum.PROJECTION_ORDERS ? `${record.proorderqty ? (record.proorderqty).toLocaleString('en-IN') : 0}` : `${record.trimorderqty ? (record.trimorderqty).toLocaleString('en-IN') : 0}`}
                    </>
                )
            }
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
                                onConfirm={() => revertFileData(record?.fileId,record?.fileType)}
                            >
                                <Button icon={<UndoOutlined style={{ color: 'red' }} />}>Revert File</Button>
                            </Popconfirm>
                        )}
                        {!isFirstRecord && <></>}
                    </>
                )
            },
        }];

        const items: TabsProps['items'] = [
           
            {
              key: '1',
              label: `Projection Order :${poData.length}`,
              children:   <Table
              columns={columns}
              dataSource={poData}
              className="custom-table-wrapper"
              scroll={{ x: 1000,y:500 }}
              pagination={{
                  onChange(current, pageSize) {
                      setPage(current);
                      setPageSize(pageSize);
                  },
              }}
              bordered />,
            },
            {
                key: '2',
                label: `Trim Order :${trimData.length}`,
                children:  <Table
                columns={columns}
                dataSource={trimData}
                className="custom-table-wrapper"
                scroll={{ x: 1000,y:500 }}
                pagination={{
                    onChange(current, pageSize) {
                        setPage(current);
                        setPageSize(pageSize);
                    },
                }}
                bordered />,
              },
           
          ];
    return (
        <>
            <Card
                title="Uploaded Files List">
                    <Tabs items={items}/>
              
            </Card>
        </>

    )
}



export default FileRevert