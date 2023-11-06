import { OperationsRequest, TabNameReq } from '@project-management-system/shared-models'
import { OperationInventoryService, OperationReportingService, OperationsService } from '@project-management-system/shared-services'
import { Card, Row, Col, Select, Space, Segmented, Table, Form } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

export const InventoryView = () => {

    const { Option } = Select
    const [form] = Form.useForm()
    const [page, setPage] = useState<number>(1);
    const [operation, setOperation] = useState<any[]>([])
    const [showTable, setShowTable] = useState<boolean>()
    const operationservice = new OperationsService()
    const service = new OperationInventoryService()
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        getOperations()
    }, [])

    const getOperations = () => {
        operationservice.getAllActiveOperations().then(res => {
            if (res.status) {
                setOperation(res.data)
            }
        })
    }

    const onOperationChange = (OperationId: number) => {
        const req = new OperationsRequest(OperationId)
        service.getOperationinventory(req).then(res => {
            if (res.status) {
                setData(res.data)

            }
        })
    }


    const columns: ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
            title: 'Style',
            dataIndex: 'style',
            width: '150px',
            // render: (text, record) => {
            //     return (
            //         <>
            //             {record.style ? `${record.style}-${record.styleDescription}` : '-'}
            //         </>
            //     )
            // }
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width:"100px"

        },
        {
            title: 'Quantity',
            dataIndex: 'physicalQuantity',
            align:"right",
            width:"50px"

        },
        // {
        //     title: 'UOM ',
        //     dataIndex: 'physicalUom',
        //     align:"right",
        //     width:"100px"
        // },
        {
            title: 'IssuedQuantity ',
            dataIndex: 'issuedQuantity',
            align:"right",
            width:"100px"
        },
        // {
        //     title: 'ISSUEDUOM` ',
        //     dataIndex: 'issuedUom',
        //     align:"right",
        //     width:"100px"
        // },
        // {
        //     title: 'DAMAGEDQUANTITY ',
        //     dataIndex: 'damagedQuantity'
        // },
        // {
        //     title: 'DAMAGEDUOM`',
        //     dataIndex: 'damagedUom'
        // },
        {
            title: 'RejectedQuantity`',
            dataIndex: 'rejectedQuantity',
            align:"right",
            width:"100px"

        },
        // {
        //     title: 'REJECTEDUOM',
        //     dataIndex: 'rejectedUom'
        // },

    ]

    return (
        <Card title='Stock View' className='card-header'>
            <Form form={form}>
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                        <Form.Item label='Operation' name='operationCode'>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Operation' onChange={(value) => onOperationChange(value)}>
                                {
                                    operation.map(e => {
                                        return (
                                            <Option key={e.operationId} value={e.operationId}>{e.operationName}</Option>
                                        )
                                    })
                                }

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            {data.length > 0 &&
                <Table style={{width:"1150px"}} columns={columns} bordered
                    dataSource={data}
                />
            }
            {/* <Table columns={columns}
                dataSource={data}
            /> */}



        </Card>
    )
}
export default InventoryView