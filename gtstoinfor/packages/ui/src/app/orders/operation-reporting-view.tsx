import { StyleRequest, OperationReportingRequest, TabNameReq, MaterialIssueRequest, OperationTrackingDto } from "@project-management-system/shared-models";
import { ItemsService, MaterialIssueService, OperationReportingService, OperationSequenceService, OperationsService, StyleService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Segmented, Select, Space, Table } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import Operation from "antd/es/transfer/operation";
import { useNavigate } from "react-router-dom";

const {Option}  =Select
export const OperationReportingView = () => {
    const [page, setPage] = useState<number>(1);
    const [reportedQuantity, setReportedQuantity] = useState<number>();
    const [rejectedQuantity,SetRejectedQuantity] = useState<number>(0)
    const [reportedUom,setReportedUom] = useState<number>()
    const [rejectedUom,setRejectedUom] = useState<number>()
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
    const issueService = new MaterialIssueService()
    const [selectedOperationSequenceId, setSelectedOperationSequenceId] = useState(null);
    const [selectedOperationName, setSelectedOperationName] = useState(null);
    const [currentSequence, setCurrentSequence] = useState(1);
    const [saveId, setSaveId] = useState<number>()
    const uomService = new UomService()
    const [uomData, setUomData] = useState<any[]>([])
    const [currentSegment, setCurrentSegment] = useState(1);
    const navigate = useNavigate();
    const trackingService = new OperationReportingService()
    const [trackData, setTrackData] = useState<any[]>([])




    useEffect(() => {
        getItemCodes()
        getStyle()
        getUom()
        // getMaterialIssue()
    },[])

    // const getData = (val) => {
    //     const req = new TabNameReq(val,form.getFieldValue('styleNo'))
    //     service.getOperationReportingData(req).then(res => {
    //         if(res.status){
    //             setData(res.data)
    //             setShowTable(true)
    //         }
    //     })
    // }

    const getUom = () => {
        uomService.getAllActiveUoms().then(res => {
          setUomData(res.data)
        })
    }

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res => {
          setStyle(res.data)
        })
    }

    const getMaterialIssue = () => {
        const req = new MaterialIssueRequest(form.getFieldValue('styleId'));
        issueService.getDataByStyleId(req).then((res) => {
            const filteredData = res.data.filter((record) => record.reportedStatus !== 'COMPLETED');
            setData(filteredData);
            setShowTable(true);
        });
      };


    const getOperationInventoryData = () => {
        trackingService.getOperationInventoryData().then((res) => {
            setData(res.data);
            setShowTable(true);
        });
      };
      


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
        // Update the state with the reported quantity
        setReportedQuantity(e.target.value);
        // console.log(value,'-------------------------')
    };
    

    const setRejectedInfo = (e,index,record) => {
        SetRejectedQuantity(e.target.value)
    }

    const reportedUomId = (e, index, record) => {
        console.log(e,'===============')
        // if (e && e.target) {
            setReportedUom(e);
        // }
    }

    const rejectedUomId = (e, index, record) => {
        if (e && e.target) {
            setRejectedUom(e);
        }
    }
    

    const onJobCompleted = (record) => {
        const nextSequence = currentSequence + 1;

        const nextOperation = operations.find((operation) => operation.sequence === nextSequence);
console.log(record,'^^^^^^^^^^^^^^^^^^')
        if(nextOperation){
        const req = new OperationTrackingDto(
            record.fabricCode,
            saveId,
            record.requestNo,
            selectedOperationSequenceId,
            selectedOperationName,
            nextOperation.operationName,
            record.issuedQuantity,
            record.issuedUomId,
            reportedQuantity,
            reportedUom,
            rejectedQuantity,
            record.rejectedUomId,
            record.status,0,'',undefined,'',undefined,'',0,0,'',0)
        console.log(req,'%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        service.createOperationReporting(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }
    // navigate(`/next-segment/${JSON.stringify(record)}`);
    }

    const generateSegmentedOptions = () => {
        return operations.map((operation, index) => ({
          label: <b>{operation.operationName}</b>,
          value: operation.operationName,
          key: index.toString(),
          sequence: operation.sequence, // Add the 'sequence' property from your data
        }));
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
            title:<div style={{textAlign:"center"}}>Issued Quantity</div>,
            dataIndex:'issuedQuantity',
            align: "right",
            render: (issuedQuantity, row) => `${issuedQuantity} ${row.issuedUom}`,
          },
          {
            title: 'Reported Quantity',
            dataIndex: 'reportedQuantity',
            render: (text, record, index) => {
              return (
                <>
                  <Input
                    key={index}
                    defaultValue={record.issuedQuantity}
                    // value={reportedQuantity}
                    onChange={(e) => setReportedInfo(e,index,record)}
                  />
                </>
              );
            },
          },
          {
            title: 'Uom',
            dataIndex: 'reportedUomId',
            render: (text,record,index) => (
                <Select
                value={reportedUom}
                onChange={(e) => reportedUomId(e, index, record)}
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
            >
                {uomData?.map((e) => {
                    return (
                        <Option key={e.uomId} value={e.uomId}>
                            {e.uom}
                        </Option>
                    );
                })}
            </Select>
              ),
          },
          {
            title:'Rejected Quantity',
            dataIndex:'rejectedQuantity',
            render:(text,record,index) => {
                return(
                    <>
                    {<Input 
                    // defaultValue={0} 
                    onChange={e=> setRejectedInfo(e,index,record)}/>}
                    </>
                )
            }
          },
          {
            title: 'Uom',
            dataIndex: 'rejectedUomId',
            render: (text,record,index) => (
                <Select
                value={rejectedUom}
                onChange={(e) => rejectedUomId(e, index, record)}
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
            >
                {uomData?.map((e) => {
                    return (
                        <Option key={e.uomId} value={e.uomId}>
                            {e.uom}
                        </Option>
                    );
                })}
            </Select>
            ),
          },
          {
            title:'Job Completed',
            dataIndex:'jobCompleted',
            render:(text,record) => {
                return(
                    <>
                    <Button onClick={() => onJobCompleted(record)} type='primary' shape="round">Yes</Button>
                    </>
                )
            }
          },
    ]

    const onSegmentChange = (selectedValue) => {
        const selectedOption = segmentedOptions.find((option) => option.value === selectedValue);
        if (selectedOption) {
          setCurrentSequence(selectedOption.sequence);
          setSelectedOperationSequenceId(selectedOption.sequence);
          setSelectedOperationName(selectedOption.value);
          if (selectedOption.sequence === 1 && selectedOption.value !== 'COMPLETED') {
            getMaterialIssue();
          } else {
            getOperationInventoryData()
            // setShowTable(true);
          }
        }
      };


    const onStyleChange = (val) => {
        console.log(val,'<<<<<<<<<<<<<')
        if(val){
            getSegmentLabel(val)
            setSaveId(val)
            // setShowTable(true)

        }
    }

    
    return(
        <Card title={data?.length > 0 ? (
            <>
            <span>{'Consumption Code : ' +(data[0].consumptionCode)}</span>
            <span style={{marginLeft: "60px"}}>{'Request No : ' +(data[0].requestNo)}</span>
            </>
        ):"Operation Reporting"} className='card-header'>
            <Form form={form}>
                <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                    <Form.Item label='Style' name='styleId'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style' onChange={onStyleChange}>
                            {
                                style.map(e => {
                                    return(
                                        <Option key={e.styleId} value={e.styleId}>{e.style}-{e.description}</Option>
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

            <Table columns={columns} dataSource={data} bordered/>
            </div>
            </>) : (<></>)
            }
            </Space>
           

        </Card>
    )

}

export default OperationReportingView