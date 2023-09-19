import { TabNameReq } from '@project-management-system/shared-models'
import { OperationReportingService, OperationsService } from '@project-management-system/shared-services'
import { Card, Row, Col, Select, Space, Segmented, Table,Form } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

export const InventoryView = () => {
    
    const {Option} = Select
    const [form] = Form.useForm()
    const [page, setPage] = useState<number>(1);
    const [operation, setOperation] = useState<any[]>([])
    const [showTable,setShowTable] = useState<boolean>()
    const operationservice = new OperationsService()
    const service = new OperationReportingService()
    const [data,setData] = useState<any[]>([])

    useEffect(() => {
        getOperations()
    },[])

    const getData = (val) => {
        const req = new TabNameReq(val,form.getFieldValue('operationCode'))
        service.getOperationWiseData(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const getOperations = () =>{
        operationservice.getAllActiveOperations().then(res => {
            if(res.status){
                setOperation(res.data)
            }
        })
    }

    const onOperationChange = (val) => {
        console.log(val)
        if(val){
            getData(val)
            setShowTable(true)
        }
    }


    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
          },
          {
            title:'Style',
            dataIndex:'style',
            width: '250px',
            render:(text,record) => {
                return(
                    <>
                    {record.style ? `${record.style}-${record.styleDescription}` : '-'}
                    </>
                )
            }
          },
          {
            title:'SKU Code',
            dataIndex:'skuCode'
          },
          {
            title:'PO Number',
            dataIndex:'poNumber'
          }, 
          {
            title:'Inventory',
            dataIndex:'inventory'
          },
          {
            title:'Issued Quantity',
            dataIndex:'issuedQuantity'
          },
          {
            title:'Rejected Quantity',
            dataIndex:'rejectedQuantity'
          },
         
    ]

    return(
        <Card title='Stock View' className='card-header'>
            <Form form={form}>
                <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>
                    <Form.Item label='Operation' name='operationCode'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Operation' onChange={onOperationChange}>
                            {
                                operation.map(e => {
                                    return(
                                        <Option key={e.operationId} value={e.operationName}>{e.operationName}</Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                </Col>
                </Row>
            </Form>
            {
                showTable ? (<>
                <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
            <div style={{width:'100%'}}>

            <Table columns={columns} 
            dataSource={data}
            />
            </div>
            </Space>
            </>) : (<></>)
            }
           

        </Card>
    )
}
export default InventoryView