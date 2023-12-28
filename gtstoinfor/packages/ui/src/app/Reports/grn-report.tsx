import { PurchaseOrderStatus, grnReportReq } from '@project-management-system/shared-models';
import { GRNService, PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Statistic, Table, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

 const GrnReport =() =>{
    const [form] =Form.useForm();
    const [grnData, setgrnData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])

    const [page,setPage] = useState<number>(1);
    const {Option} = Select
    const grnService = new GRNService()
    const poService = new PurchaseOrderservice()


    const getGrnReportData = (poStatus:string,ponum:number,grnDate:string) =>{
        grnService.getGrnReportData({poStatus:poStatus,poId:ponum,grnDate:grnDate}).then(res =>{
            if(res.status){
                setgrnData(res.data)
            }else{
                setgrnData([])
                message.info(res.internalMessage)
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
        getGrnReportData(undefined,undefined,undefined)
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
          {
            title: "Fabric Item",
            dataIndex: "m3ItemDescription",
            width:'110px',
            sorter: (a, b) => a.m3ItemDescription.localeCompare(b.m3ItemDescription),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Trim Item",
            dataIndex: "m3TrimDesc",
            width:'110px',
            sorter: (a, b) => a.m3TrimDesc.localeCompare(b.m3TrimDesc),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "UOM",
            dataIndex: "uom",
            width:'110px',
            sorter: (a, b) => a.uom.localeCompare(b.uom),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Unit price",
            dataIndex: "unitPrice",
            width:'110px',
            sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Total price",
            dataIndex: "totalPoAmount",
            width:'110px',
            sorter: (a, b) => a.totalPoAmount.localeCompare(b.totalPoAmount),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Required Quantity",
            dataIndex: "poQuantity",
            width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.poQuantity),
            sortDirections: ["descend", "ascend"],
      
          },
          
          {
            title: "Recived Quantity",
            dataIndex: "receivedQuantity",
            width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.receivedQuantity),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Rejected Quantity",
            dataIndex: "rejectedQuantity",
            width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.rejectedQuantity),
            sortDirections: ["descend", "ascend"],
      
          },
          {
            title: "Po Status",
            dataIndex: "poStatus",
            width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.rejectedQuantity),
            sortDirections: ["descend", "ascend"],
      
          },
    ]
    const getData =() =>{
           const ponum =form.getFieldValue('poNumber') !=undefined ?form.getFieldValue('poNumber'):undefined
        const poStatus =form.getFieldValue('poStatus') !=undefined ?form.getFieldValue('poStatus'):undefined
        const grnDate =form.getFieldValue('grnDate') !=undefined ?form.getFieldValue('grnDate').format("YYYY-MM-DD"):undefined
        getGrnReportData(poStatus,ponum,grnDate)

    }
    const onReset =() =>{
        getGrnReportData(undefined,undefined,undefined)
        form.resetFields()
    }
    return(
        <div>
                   
        <Card title={'Grn Report'}>
        <Form form={form} layout='vertical'>
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
                       <Button type='primary' onClick={getData}>{'Search'}</Button>
                    </Col>
                    <Col span={4}  style={{paddingTop:'20px'}} >
                       <Button onClick={onReset} >{'Reset'}</Button>
                    </Col>
                </Row>
                </Form>
                <Table 
                    columns={columns}
                    dataSource={grnData}
                    bordered
                    pagination={{
                        onChange(current) {
                          setPage(current);
                        }
                      }}
                      scroll={{x:true}}
                    />
        </Card>
        </div>


    )
}
export default GrnReport