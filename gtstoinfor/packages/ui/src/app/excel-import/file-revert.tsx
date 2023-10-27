import { Button, Card, Col, DatePicker, Form, Popconfirm, Row, Select, Table, Tabs, TabsProps, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { RestOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import { FileIdReq, FileTypeDto, FileTypesEnum } from '@project-management-system/shared-models';

const {RangePicker} = DatePicker
const {Option} = Select;

export function FileRevert() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(100);
    const service = new OrdersService()
    const [data, setData] = useState<any[]>([])
    const [trimData, setTrimData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const [form] = Form.useForm()
    // let successRecordIndex : number
    const [successRecord,setSuccessRecord] = useState<any>(undefined)
    useEffect(() => {
        getUploadFilesData()
    }, [])

    const getUploadFilesData = () => {
        const req = new FileTypeDto(null)
        req.type = 'UploadView'
        if(form.getFieldValue('uploadDate') != undefined){
            req.fromDate = (form.getFieldValue('uploadDate')[0]).format('YYYY-MM-DD')
            req.toDate = (form.getFieldValue('uploadDate')[1]).format('YYYY-MM-DD')
        }
        if(form.getFieldValue('uploadStatus') != undefined){
            req.uploadStatus = form.getFieldValue('uploadStatus')
        }
        service.getUploadFilesData(req).then((res) => {
            if (res.status) {
                setData(res.data)
                setSuccessRecord(res.data.find(e => e.status === 'Success' && e.isActive == 1))
                setTrimData(res.data.filter(e => e.fileType === 'Trim Order'));
                setPoData(res.data.filter(e => e.fileType === 'Projection Order'));            
            } else {
                setData([])
                setTrimData([])
                setPoData([])
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
            width:'60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: <div style={{textAlign:'center'}}>Uploaded Date</div>,
            dataIndex: 'uploadedDate',
            // render: (value, record) => {
            //     return (
            //         moment(value).format('YYYY-MM-DD HH:mm:ss')
            //     )
            // }
        },
        {
            title: <div style={{textAlign:'center'}}>File Name</div>,
            dataIndex: 'fileName',
            width:'200px'
        },
        {
            title: <div style={{textAlign:'center'}}>No of Records</div>,
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
            title: <div style={{textAlign:'center'}}>Total Order Quantity</div>,
            dataIndex: 'orderqty',
            align:'right',
            sorter: (a,b) => a.fileType === FileTypesEnum.PROJECTION_ORDERS ? (a.proorderqty - b.proorderqty) : (a.trimorderqty - b.trimorderqty),
            sortDirections:['ascend','descend'],
            render:(text,record) => {
                return(
                    <>
                    {record.fileType === FileTypesEnum.PROJECTION_ORDERS ? `${record.proorderqty ? (record.proorderqty).toLocaleString('en-IN') : 0}` : `${record.trimorderqty ? (record.trimorderqty).toLocaleString('en-IN') : 0}`}
                    </>
                )
            }
        },
        {
            title: <div style={{textAlign:'center'}}>Upload Status</div>,
            dataIndex: 'status'
        },
        {
            title: <div style={{textAlign:'center'}}>Failed Reason</div>,
            dataIndex: 'failedReason'
        },
        {
            title: <div style={{textAlign:'center'}}>Columns</div>,
            dataIndex: 'columns'
        },
        {
            title: <div style={{textAlign:'center'}}>Uploaded User</div>,
            dataIndex: 'createdUser'
        },
        {
            title:<div style={{textAlign:'center'}}>Upload Type</div>,
            dataIndex: 'uploadType',
            filters: [
                {
                  text: 'Manual',
                  value: "Manual",
                },
                {
                  text: 'Email',
                  value: "Email",
                },
              ],
              onFilter: (value,record) =>{ return record.uploadType === value},
            render:(text,record)=>{
                return(
                    <>
                    {record.uploadType ? record.uploadType : '-'}
                    </>
                )
            }
        },
        {
            title: <div style={{textAlign:'center'}}>Action</div>,
            dataIndex: 'Action',
            render: (text, record, index) => {
                // const isFirstRecord = index === 0 && page === 1;
                // console.log(index,successRecordIndex,'---')
                const isFirstRecord = record.fileId === successRecord.fileId
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

        // const items: TabsProps['items'] = [
           
        //     {
        //       key: '1',
        //       label: `Projection Order :${poData.length}`,
        //       children:   <Table
        //       size='small'
        //       columns={columns}
        //       dataSource={poData}
        //       className="custom-table-wrapper"
        //       scroll={{ x: 'max-content',y:500 }}
        //       pagination={{
        //           onChange(current, pageSize) {
        //               setPage(current);
        //               setPageSize(pageSize);
        //           },
        //       }}
        //       bordered />,
        //     },
        //     {
        //         key: '2',
        //         label: `Trim Order :${trimData.length}`,
        //         children:  <Table
        //         size='small'
        //         columns={columns}
        //         dataSource={trimData}
        //         className="custom-table-wrapper"
        //         scroll={{ x: 1000,y:500 }}
        //         pagination={{
        //             onChange(current, pageSize) {
        //                 setPage(current);
        //                 setPageSize(pageSize);
        //             },
        //         }}
        //         bordered />,
        //       },
           
        //   ];

    const onReset = () => {
        form.resetFields()
        getUploadFilesData()
    }

    const onFinish = () =>{
        getUploadFilesData()
    }
    return (
        <>
            <Card
                title="Uploaded Files List">
                    <Form form={form} onFinish={onFinish}>
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 7 }} >
                        <Form.Item name='uploadDate' label='Upload Date'>
                            <RangePicker style={{width:'100%'}}/>
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} >
                        <Form.Item name='uploadStatus' label='Upload Status'>
                            <Select showSearch placeholder="Select Upload Status" optionFilterProp="children" allowClear>
                                <Option key={'success'} value='Success'>Success</Option>
                                <Option key={'failed'} value='Failed'>Failed</Option>
                            </Select>
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 2 }} >
                        <Form.Item>
                            <Button icon={<SearchOutlined/>} type='primary' htmlType='submit'>Search</Button>
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 2 }} >
                        <Form.Item>
                            <Button icon={<UndoOutlined/>} danger onClick={onReset}>Reset</Button>
                        </Form.Item>
                        </Col>
                        
                        </Row>
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                        <Card size='small' title={'Total:' +`${poData ?  poData.length : '-'}` } style={{ textAlign: 'center',  height: 30, backgroundColor: '#CBB1F8' }}></Card>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                        <Card size='small' title={'Success:' +`${poData ?  poData.filter(e => e.status === 'Success').length : '-'}` } style={{ textAlign: 'center',  height: 30, backgroundColor: 'lightgreen' }}></Card>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                        <Card size='small' title={'Failed:' +`${poData ?  poData.filter(e => e.status === 'Failed').length : '-'}` } style={{ textAlign: 'center',  height: 30, backgroundColor: 'tomato' }}></Card>
                        </Col>
                        </Row>
                        <br/>
                    </Form>
                    {/* <Tabs items={items}/> */}
                    <Table
              size='small'
              columns={columns}
              dataSource={poData}
              className="custom-table-wrapper"
              scroll={{x:1700,y:500}}
            //   pagination={{
            //       onChange(current, pageSize) {
            //           setPage(current);
            //           setPageSize(pageSize);
            //       },
            //   }}
            pagination={{
                pageSize: 50, 
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                }
            }}
              bordered />,
              
            </Card>
        </>

    )
}



export default FileRevert