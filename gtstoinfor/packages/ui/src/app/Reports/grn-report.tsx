import { PurchaseOrderStatus } from '@project-management-system/shared-models';
import { GRNService, PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Statistic, Table } from 'antd'
import React, { useEffect, useState } from 'react'

 const GrnReport =() =>{
    const [form] =Form.useForm();
    const [grnData, setgrnData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])

    const [page,setPage] = useState<number>(1);
    const {Option} = Select
    const grnService = new GRNService()
    const poService = new PurchaseOrderservice()


    const getGrnReportData = () =>{
        grnService.getGrnReportData().then(res =>{
            if(res.status){
                setgrnData(res.data)
            }else{
                setgrnData([])
            }
        })
    }
    const getPoNumber = () =>{
        poService.getAllPos().then(res =>{
            if(res.status){
                setPoData(res.data)
            }else{
                setPoData([])
            }
        })
    }

    useEffect(() =>{
        getGrnReportData()
        getPoNumber()
    },[])

    const columns:any =[
        {
            title: 'S No',
            key: 'sno',
            style: { background: 'red' },
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
            onCell: (record: any) => ({
              rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Grn Number",
            dataIndex: "grnNumber",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Grn Item Number",
            dataIndex: "grnItemNo",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Style",
            dataIndex: "style",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
        },
          {
              title: "Po Number",
              dataIndex: "poNumber",
              onCell: (record: any) => ({
                  rowSpan: record.rowSpan,
              }),
              fixed: 'left',
          },
          {
            title: "Grn Aginst",
            dataIndex: "poAgainst",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Indent Number",
            dataIndex: "indentNo",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Sample Order",
            dataIndex: "sampleReqNo",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
          },
          {
            title: "Item Type",
            dataIndex: "itemType",
            width:'110px',
            sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
            sortDirections: ["descend", "ascend"],
      
          },
    ]
    return(
        <Form form={form} layout='vertical'>
        <Card title={'Grn Report'}>
           
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item name='poNumber' label='Po Number'>
                            <Select>
                                {poData.map(e =>{
                                    return(<Option key={e.purchase_order_id} value={e.purchase_order_id}>{e.po_number}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='grnDate' label='Grn Date'>
                                <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='poStatus' label='Po Status'>
                            <Select placeholder='Po Status' showSearch allowClear>
                                    {Object.values(PurchaseOrderStatus).map((key,value) =>{
                                        return <Option key={key} value={key}>{key}</Option>
                                    })
                                        
                                    }
                                </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{paddingTop:'20px'}}>
                       <Button type='primary'>{'Search'}</Button>
                    </Col>
                    <Col span={4}  style={{paddingTop:'20px'}} >
                       <Button >{'Reset'}</Button>
                    </Col>
                </Row>
                <Card>
                <Table 
                    columns={columns}
                    dataSource={grnData}
                    bordered
                    pagination={{
                        onChange(current) {
                          setPage(current);
                        }
                      }}
                    //   scroll={{x:true}}
                    />
                </Card>
                 

             
        </Card>
        </Form>

    )
}
export default GrnReport