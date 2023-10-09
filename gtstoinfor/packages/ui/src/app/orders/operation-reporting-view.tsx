import { StyleRequest, OperationReportingRequest, TabNameReq } from "@project-management-system/shared-models";
import { ItemsService, OperationReportingService, OperationSequenceService, OperationsService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Segmented, Select, Space, Table } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import Operation from "antd/es/transfer/operation";

const {Option}  =Select
export const OperationReportingView = () => {
    const [page, setPage] = useState<number>(1);
    const [reportedQuantity,SetReportedQuantity] = useState<number>()
    const [rejectedQuantity,SetRejectedQuantity] = useState<number>(0)
    const [wastedQuantity,SetWastedQuantity] = useState<number>(0)
    const service = new OperationReportingService()
    const [data,setData] = useState<any[]>([])
    const operationSequenceService = new OperationSequenceService()
    const [operations,setOperations] = useState<any[]>([])
    const [itemCode,setItemCode] = useState<any[]>([])
    const itemService = new ItemsService()
    const [showTable,setShowTable] = useState<boolean>()
    const [form] = Form.useForm()
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])

    useEffect(() => {
        getItemCodes()
        getStyle()
    },[])

    const getData = (val) => {
        const req = new TabNameReq(val,form.getFieldValue('itemCode'))
        service.getOperationReportingData(req).then(res => {
            if(res.status){
                setData(res.data)
                setShowTable(true)
            }
        })
    }

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res => {
          setStyle(res.data)
        })
       }


    const getSegmentLabel = (val) => {
        const req = new StyleRequest(val)
        operationSequenceService.getOperationSequenceInfoByStyleCode(req).then(res => {
            if(res.status){
                setOperations(res.data[0].operatrionsInfo)
            }
        })
    }

    const getItemCodes = () =>{
        itemService.getAllItems().then(res => {
            if(res.status){
                setItemCode(res.data)
            }
        })
    }

    const setReportedInfo = (e,index,record) => {
        SetReportedQuantity(e.target.value)
    }

    const setRejectedInfo = (e,index,record) => {
        SetRejectedQuantity(e.target.value)
    }

    const setWastedInfo = (e,index,record) => {
        SetWastedQuantity(e.target.value)
    }

    const onJobCompleted = (record) => {
        const req = new OperationReportingRequest(form.getFieldValue('itemCode'),record.jobNumber,record.skuCode,record.poNumber,record.issuedQuantity,reportedQuantity,rejectedQuantity,wastedQuantity)
        service.createOperationReporting(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const generateSegmentedOptions = () => {
        return operations.map((operation, index) => (
            {
          label: <b>{operation.operationName}</b>, // Change this to the appropriate property from your data
          value: operation.operationName,    // Change this to the appropriate property from your data
          key: index.toString(),           // Use a unique key for each option
        }
        ));
      };

      const segmentedOptions = generateSegmentedOptions();


    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
          },
          {
            title:'Job Number',
            dataIndex:'jobNumber'
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
            title:'Reported Quantity',
            dataIndex:'reportedQuantity',
            render:(text,record,index) => {
                return(
                    <>
                    {<Input key={index} defaultValue={record.issuedQuantity} 
                    onChange={e=> setReportedInfo(e,index,record)}/>}
                    </>
                )
            }
          },
          {
            title:'Rejected Quantity',
            dataIndex:'rejectedQuantity',
            render:(text,record,index) => {
                return(
                    <>
                    {<Input defaultValue={0} onChange={e=> setRejectedInfo(e,index,record)}/>}
                    </>
                )
            }
          },
        //   {
        //     title:'Wasted Quantity',
        //     dataIndex:'wastedQuantity',
        //     render:(text,record,index) => {
        //         return(
        //             <>
        //             {<Input  defaultValue={0} onChange={e=> setWastedInfo(e,index,record)}/>}
        //             </>
        //         )
        //     }
        //   },
          {
            title:'Job Completed',
            dataIndex:'jobCompleted',
            render:(text,record) => {
                return(
                    <>
                    {<Button onClick={ () => onJobCompleted(record)} type='primary' shape="round">Yes</Button>}
                    </>
                )
            }
          },
    ]

    const onSegmentChange = (view) => {
        getData(view)
    }

    const onStyleChange = (val) => {
        if(val){
            getSegmentLabel(val)
            // setShowTable(true)

        }
    }

    
    return(
        <Card title='Operation Reporting' className='card-header'>
            <Form form={form}>
                <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                    <Form.Item label='Style' name='itemCode'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style' onChange={onStyleChange}>
                            {
                                style.map(e => {
                                    return(
                                        <Option key={e.styleId} value={e.style}>{e.style}-{e.description}</Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                </Col>
                </Row>
            </Form>
            <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
        <Segmented 
        style={{backgroundColor:'#dde5b6'}}
        options={segmentedOptions} 
        onChange={onSegmentChange}
        />
            {
                showTable ? (<>
            <div style={{width:'100%'}}>

            <Table columns={columns} dataSource={data}/>
            </div>
            </>) : (<></>)
            }
            </Space>
           

        </Card>
    )

}

export default OperationReportingView