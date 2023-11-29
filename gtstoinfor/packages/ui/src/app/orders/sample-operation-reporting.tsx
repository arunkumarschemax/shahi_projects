import { StyleRequest, OperationReportingRequest, TabNameReq, MaterialIssueRequest, OperationTrackingDto, SampleIdRequest } from "@project-management-system/shared-models";
import { ItemsService, MaterialIssueService, OperationGroupsService, OperationReportingService, OperationSequenceService, OperationsService, SampleDevelopmentService, StyleService, UomService } from "@project-management-system/shared-services";
import { Alert, Button, Card, Col, Form, Input, Row, Segmented, Select, Space, Table, message } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import Operation from "antd/es/transfer/operation";
import { useNavigate } from "react-router-dom";

const {Option}  =Select
export const SampleOperationReporting = () => {
    const [page, setPage] = useState<number>(1);
    const [reportedQuantity, setReportedQuantity] = useState<number>();
    const [rejectedQuantity,SetRejectedQuantity] = useState<number>(0)
    const [reportedUom,setReportedUom] = useState<number>()
    const [rejectedUom,setRejectedUom] = useState<number>()
    const service = new OperationReportingService()
    const [data,setData] = useState<any[]>([])
    const operationSequenceService = new OperationSequenceService()
    const operationService = new OperationsService();
    const opGroupservice = new OperationGroupsService();
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
    const [selStyleId, setSelStyleId] = useState<number>()
    const uomService = new UomService()
    const sampleDevelopmentService = new SampleDevelopmentService()

    const [uomData, setUomData] = useState<any[]>([])
    const [reqNo, setReqNo] = useState<any[]>([])

    const [currentSegment, setCurrentSegment] = useState(1);
    const [selOpReportingStatus, setSelOpReportingStatus] = useState(false);
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

      const getSampleDevelopmentData = () => {
        const sampleReqId = form.getFieldValue('sampleRequestId')
        console.log(sampleReqId)
        sampleDevelopmentService.getSampleOrderDetails(new SampleIdRequest(sampleReqId)).then((res)=>{
            console.log(res.data)
            setData(res.data)
        })


      }
      


    const getSegmentLabel = (val) => {
        const req = new StyleRequest(val)
        operationSequenceService.getOperationSequenceInfoByStyleCode(req).then(res => {
            if(res.status){
                setOperations(res.data[0].operatrionsInfo)
                setSelectedOperationSequenceId(res.data[0].operationSequenceId)
            }
        })
        // opGroupservice.getAllActiveOperationGroups().then(res => {
        //     if(res.status){
        //         setOperations(res.data)
        //     }
        // })
        // setOperations([{operationName:'Cutting',sequence:1},{operationName:'sewing in',sequence:2}, {operationName:'sewing out',sequence:3}, {operationName:'Trimming',sequence:4}, {operationName:'washing',sequence:5}, {operationName:'finishing',sequence:6},{operationName:'Quality check',sequence:7}, {operationName:'Packing',sequence:8}, {operationName:'Shippment',sequence:9}])
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
            selStyleId,
            record.requestNo,
            selectedOperationSequenceId,
            selectedOperationName,
            nextOperationName,
            0,
            null,
            0,//reported qty same as issued
            reportedUom,
            0,
            null,
            record.status,0,'',undefined,'',undefined,'',0,0,'',0,saveId)
        service.reportOperation(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                getMaterialIssue()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const generateSegmentedOptions = () => {
        // let SampleOperations = [{operationName:'Cutting',sequence:1},{operationName:'sewing in',sequence:2}, {operationName:'sewing out',sequence:3}, {operationName:'Trimming',sequence:4}, {operationName:'washing',sequence:5}, {operationName:'finishing',sequence:6},{operationName:'Quality check',sequence:7}, {operationName:'Packing',sequence:8}, {operationName:'Shippment',sequence:9}]
        return operations.map((operation, index) => ({
          label: <b>{operation.operationName}</b>,
          value: operation.operationName,
          key: index.toString(),
          sequence: operation.sequence,
        }));
      };
      

    const segmentedOptions = generateSegmentedOptions();

    const sizeColumns = data[0]?Object.keys(data[0]).map(param => ({
        title: param,
        dataIndex: param,
        render:(text,record) =>{
            
            // console.log(Object.keys(record).filter(item => item === param)[0])
            const test = Object.keys(record).filter(item => item === param)[0]
            console.log(test)
            console.log(record[test])
                return (<>{param != 'colour'?Number(record[test]):record[test]}</>)
            // console.log(record.keys.filter(item => item == param))
        }

    })):[]


    const columns:any[]  = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title: 'Quantity by Size',
            dataIndex: 'size',
            width:"10%",
            children :sizeColumns,
          },
          {
            title:'Job Completed',
            dataIndex:'jobCompleted',
            render:(text,record) => {
                return(
                    // !selOpReportingStatus?
                    <>
                    <Button onClick={() => onJobCompleted(record)} type='primary' shape="round">Yes</Button>
                    </>
                    // :<> <Alert message="Reported" type="success" showIcon style={{width:'100px'}}/></>
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
        console.log(selectedValue)
        const selectedOption = segmentedOptions.find((option) => option.value === selectedValue);
        setSelectedOperationName(selectedOption.value);
        console.log(selectedOption)
    
        // Find the current segment index
        const segmentIndex = segmentedOptions.findIndex((option) => option.value === selectedValue);
        setCurrentSegment(segmentIndex);
        console.log(segmentIndex)
        service.getReportedOperations(new TabNameReq(selectedOption.value,selStyleId,null,saveId)).then(res => {
            // if(res.data){
                console.log(res.data)
                if(res.data > 0){
                    setSelOpReportingStatus(true)
                }else{
                    setSelOpReportingStatus(false)
                }
                // if (selectedOption.sequence === 1 && selectedOption.value !== 'COMPLETED') {
                //     getMaterialIssue();
                // } else {
                //     getSampleDevelopmentData()
                //     // getOperationInventoryData(selectedValue);
                //     // setData([]);
                // }

            // }
            console.log(res.data)
        })
    
        if (selectedOption.sequence === 1 && selectedOption.value !== 'COMPLETED') {
            getMaterialIssue();
        } else {
            getSampleDevelopmentData()
            // getOperationInventoryData(selectedValue);
            // setData([]);
        }
    };
    


    const onStyleChange = (val,record) => {
        console.log(record)
        if(val){
            getSegmentLabel(record.styleId)
            setSaveId(val)
            setSelStyleId(record.styleId)
        }
    }

    
    return(
        <Card title={data?.length > 0 ? (
            <>
            <span>{'Consumption Code : ' +(data[0].consumptionCode)}</span>
            <span style={{marginLeft: "60px"}}>{'Request No : ' +(data[0].requestNo)}</span>
            </>
        ):"Sample Operation Reporting"}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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
                                        <Option key={e.sampleRequestId} styleId ={e.styleId} value={e.sampleRequestId}>{e.reqNo}</Option>
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
            <Table 
      dataSource={data} 
      columns={columns} 
      // summary={summary}
      bordered={true}
      />
            {/* <Table columns={columns} dataSource={data} bordered/> */}
            </div>
            </>) : (<></>)
            }
            </Space>
           

        </Card>
    )

}

export default SampleOperationReporting