import { OperationsService } from '@project-management-system/shared-services'
import { Card, Row, Col, Select, Space, Segmented, Table,Form } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

export const InventoryView = () => {
    
    const {Option} = Select
    const [form] = Form.useForm()
    const [page, setPage] = useState<number>(1);
    const [operation, setOperation] = useState<any[]>([])
    const [showTable,setShowTable] = useState<boolean>()
    const service = new OperationsService

    useEffect(() => {
        getOperations()
    },[])

    // const getData = (val) => {
    //     const req = new TabNameReq(val,form.getFieldValue('itemCode'))
    //     service.getOperationReportingData(req).then(res => {
    //         if(res.status){
    //             setData(res.data)
    //         }
    //     })
    // }

    const getOperations = () =>{
        service.getAllActiveOperations().then(res => {
            if(res.status){
                setOperation(res.data)
            }
        })
    }

    const onOperationChange = (val) => {
        if(val){
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
            title:'SKU Code',
            dataIndex:'skuCode'
          },
          {
            title:'PO Number',
            dataIndex:'poNumber'
          },
          {
            title:'Issued Quantity',
            dataIndex:'issuedQuantity'
          },
          {
            title:'Inventory',
            dataIndex:'inventory'
          },
    ]

    return(
        <Card title='Operation Reporting' size='small'>
            <Form form={form}>
                <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>
                    <Form.Item label='Operation' name='operations'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Item' onChange={onOperationChange}>
                            {
                                operation.map(e => {
                                    return(
                                        <Option key={e.itemCode} value={e.itemCode}>{e.itemCode}-{e.itemName}</Option>
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
            // dataSource={data}
            />
            </div>
            </Space>
            </>) : (<></>)
            }
           

        </Card>
    )
}
export default InventoryView