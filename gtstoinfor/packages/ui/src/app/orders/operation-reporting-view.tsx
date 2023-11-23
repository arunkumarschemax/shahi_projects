import { StyleRequest, OperationReportingRequest, TabNameReq, MaterialIssueRequest, OperationTrackingDto } from "@project-management-system/shared-models";
import { ItemsService, MaterialIssueService, OperationReportingService, OperationSequenceService, OperationsService, SampleDevelopmentService, StyleService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Segmented, Select, Space, Table, message } from "antd"
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
    const sampleDevelopmentService = new SampleDevelopmentService()

    const [uomData, setUomData] = useState<any[]>([])
    const [reqNo, setReqNo] = useState<any[]>([])

    const [currentSegment, setCurrentSegment] = useState(1);
    const navigate = useNavigate();
    const trackingService = new OperationReportingService()
    const [trackData, setTrackData] = useState<any[]>([])
    const [selectedUomValues, setSelectedUomValues] = useState([]);




    useEffect(() => {
        getItemCodes()
        getStyle()
        getUom()
        getSampleReq()

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

    const getSampleReq = () => {
        sampleDevelopmentService.getAllSampleReqDropDown().then(res => {
            setReqNo(res.data)
        })
    }

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


    const getOperationInventoryData = (val) => {
        const req = new TabNameReq(val,saveId,'')
        trackingService.getOperationInventoryData(req).then((res) => {
            setData(res.data);
            setShowTable(true);
        });
      };
      


    const getSegmentLabel = (val) => {
        const req = new StyleRequest(val)
        operationSequenceService.getOperationSequenceInfoByStyleCode(req).then(res => {
            if(res.status){
                setOperations(res.data[0].operatrionsInfo)
                setSelectedOperationSequenceId(res.data[0].operationSequenceId)
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
    };
    

    const setRejectedInfo = (e,index,record) => {
        SetRejectedQuantity(e.target.value)
    }

    const reportedUomId = (value, index, record) => {
        setReportedUom(value)
      };
      
      

    const rejectedUomId = (e, index, record) => {
        if (e && e.target) {
            setRejectedUom(e.target);
        }
    }

    const getNextOperationName = () => {
        if (currentSegment < segmentedOptions.length - 1) {
            const nextSegment = segmentedOptions[currentSegment + 1];
            return nextSegment.value;
        } else {
            // Handle the case where there are no more segments (end of the sequence)
            return null;
        }
    };
    
    

    const onJobCompleted = (record) => {
        const nextOperationName = getNextOperationName();
        const req = new OperationTrackingDto(
            record.fabricCode,
            saveId,
            record.requestNo,
            selectedOperationSequenceId,
            selectedOperationName,
            nextOperationName,
            record.issuedQuantity,
            record.issuedUomId,
            reportedQuantity,
            reportedUom,
            rejectedQuantity,
            record.rejectedUomId,
            record.status,0,'',undefined,'',undefined,'',0,0,'',0)
        service.createOperationReporting(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                getMaterialIssue()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const generateSegmentedOptions = () => {
        return operations.map((operation, index) => ({
          label: <b>{operation.operationName}</b>,
          value: operation.operationName,
          key: index.toString(),
          sequence: operation.sequence,
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
            title:<div style={{textAlign:"center"}}>Fabric Code</div>,
            dataIndex:'fabricCode',
            align: "right",
            // render: (issuedQuantity, row) => `${issuedQuantity} ${row.issuedUom}`,
          },
        {
            title:<div style={{textAlign:"center"}}>Issued Quantity</div>,
            dataIndex:'issuedQuantity',
            align: "right",
            render: (issuedQuantity, row) => `${issuedQuantity} ${row.issuedUom}`,
          },
          {
            title:<div style={{textAlign:"center"}}>Reported Quantity</div>,
            dataIndex: 'reportedQuantity',
            align:"right",
            render: (_, record) => (
                <Form.Item
                name={`reportedQuantity${record.materialFabricId}_${record.key}`}
                rules={[
                    {
                      validator: (_, value) => {
                        if (!value || (Number(value) <= record.issuedQuantity)) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Cannot exceed PO Qty');
                      },
                    },
                  ]}
                >
                    <Input
                    placeholder="Enter Quantity"
                    // key={index}
                    // defaultValue={record.issuedQuantity}
                    // max={record.issuedQuantity}
                    // onChange={(e) => setReportedInfo(e,index,record)}
                  />
                </Form.Item>
            )
          },
          {
            title: 'Uom',
            dataIndex: 'reportedUomId',
            render: (_,record) => (
                <Form.Item
                name={`reportedUomId${record.materialFabricId}_${record.key}`}
                >
                <Select
                // value={reportedUom}
                // onChange={(val) => reportedUomId(val, index, record)}
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
            </Form.Item>
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
                    placeholder="Enter Quantity"
                    onChange={e=> setRejectedInfo(e,index,record)}/>}
                    </>
                )
            }
          },
          {
            title: 'Uom',
            dataIndex: 'rejectedUomId',
            render: (text,record,index) => (
                // <Form.Item
                // name="rejectedUomId"
                // label="UOM"
                // rules={[
                //     {
                //     required: true,
                //     message: 'Please select a UOM',
                //     },
                // ]}
                // >
                <Select
                    value={rejectedUom}
                    onChange={(e) => rejectedUomId(e, index, record)}
                    allowClear
                    style={{ width: '100%' }}
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select UOM"
                >
                    {uomData?.map((e) => {
                    return (
                        <Option name={`${rejectedUomId}`} key={e.uomId} value={e.uomId}>
                        {e.uom}
                        </Option>
                    );
                    })}
                </Select>
                // </Form.Item>
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

    // const onSegmentChange = (selectedValue) => {
    //     const selectedOption = segmentedOptions.find((option) => option.value === selectedValue);
    //     setSelectedOperationName(selectedOption.value);
    //     console.log(selectedOption.value,'!!!!!!!!!')
    //     console.log(selectedOption,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    //       if (selectedOption.sequence === 1 && selectedOption.value !== 'COMPLETED') {
    //         getMaterialIssue();
    //       } else {
    //         getOperationInventoryData(selectedValue)
    //         setData([])
    //       }
    //   };

      const onSegmentChange = (selectedValue) => {
        const selectedOption = segmentedOptions.find((option) => option.value === selectedValue);
        setSelectedOperationName(selectedOption.value);
    
        // Find the current segment index
        const segmentIndex = segmentedOptions.findIndex((option) => option.value === selectedValue);
        setCurrentSegment(segmentIndex);
    
        if (selectedOption.sequence === 1 && selectedOption.value !== 'COMPLETED') {
            getMaterialIssue();
        } else {
            getOperationInventoryData(selectedValue);
            // setData([]);
        }
    };
    


    const onStyleChange = (val) => {
        if(val){
            getSegmentLabel(val)
            setSaveId(val)
        }
    }

    
    return(
        <Card title={data?.length > 0 ? (
            <>
            <span>{'Consumption Code : ' +(data[0].consumptionCode)}</span>
            <span style={{marginLeft: "60px"}}>{'Request No : ' +(data[0].requestNo)}</span>
            </>
        ):"Operation Reporting"}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
            <Form form={form} layout="vertical">
                <Row>
                {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
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
                </Col> */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                    <Form.Item label='Sample Request' name='sampleRequestId'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style' onChange={onStyleChange}>
                            {
                                reqNo.map(e => {
                                    return(
                                        <Option key={e.sampleRequestId} value={e.sampleRequestId}>{e.reqNo}</Option>
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