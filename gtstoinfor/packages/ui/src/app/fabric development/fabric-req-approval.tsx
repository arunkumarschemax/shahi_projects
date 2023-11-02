import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { BuyerIdReq, FabricApprovalReq, MenusAndScopesEnum, QualitiesEnum } from '@project-management-system/shared-models'
import { BuyersService, EmployeeDetailsService, FabricDevelopmentService, LocationsService, ProfitControlHeadService, SampleTypesService, StyleService } from '@project-management-system/shared-services'
import { Button, Card, Checkbox, Col, Form, Row, Select } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

export const FabricReqApproval = () => {
    const [fabricData, setFabricData] =useState<any[]>([])
    const [fabricApproval, setFabricApproval] = useState<any[]>([])
    const [form] = Form.useForm();
    const { Option } = Select;
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState<number>(null);
    const [idReq, setIdReq] = useState<number>(null);
    const [selectedQuality, setSelectedQuality] = useState<QualitiesEnum | null>(null);
    const [locId,setLocId] = useState([]);
    const [styleId, setStyleId] = useState([])
    const [pchId,setPchId] = useState([]);
    const [buyerId,setBuyerId] = useState([]);
    const [sampleId,setSampleId] = useState([]);
    const [empId,setEmpId] = useState([]);

    const service = new FabricDevelopmentService()
    const locationService = new LocationsService()
    const styleService = new StyleService()
    const pchService = new ProfitControlHeadService()
    const buyerService = new BuyersService()
    const sampleService = new SampleTypesService()
    const employeeService = new EmployeeDetailsService()
    const [userId, setUserId] = useState([]); 
    const [loginBuyer,setLoginBuyer] = useState<number>(0)
    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
  let userRef
    useEffect(()=>{
        fabricReqData()
        Login()
    },[])


    const Login = () =>{
        if(role === MenusAndScopesEnum.roles.Buyer){
          userRef = externalRefNo
        }
        buyerService.getBuyerByRefId(userRef).then(res=>{
          if(res.status){
            setUserId(res.data)
      setLoginBuyer(res.data.buyerId)
          }
        })
      }
    const fabricApprovalData = (val) => {
        if(idReq){
        const req = new FabricApprovalReq(idReq,val.requestNo,selectedQuality);
        service.fabricApproval(req).then((res) => {
            if (res.status) {
                setFabricApproval(res.data);

                locationService.getAll().then((res)=>{
                    if(res.status){
                        setLocId(res.data)
                    }
                })
                
                styleService.getAllStyle().then((res)=>{
                    if(res.status){
                        setStyleId(res.data)
                    }
                })
                
                pchService.getAllProfitControlHead().then((res)=>{
                    if(res.status){
                        setPchId(res.data)
                    }
                })
                buyerService.getAllBuyersInfo(userRef).then((res)=>{
                    if(res.status){
                        setBuyerId(res.data)
                    }
                })

                sampleService.getAllSampleTypes().then((res)=>{
                    if(res.status){
                        setSampleId(res.data)
                    }
                })

                employeeService.getAllEmploee().then((res)=>{
                    if(res.status){
                        setEmpId(res.data)
                    }
                })
            }else{
                setFabricApproval([])
            }
        });
    }
}

    const fabricId = (val,e)=>{
        setIdReq(e?.val)
    }

    const handleCheckboxChange = (record, e) => {
        if (e.target.checked) {
          setSelectedQuality(record.quality);
        } else {
          setSelectedQuality(null);
        }
      };
      

    const fabricReqData = () =>{
        service.getAllFabricRequestNo().then((res)=>{
            if(res.status){
                setFabricData(res.data)
            }
        })
    }

    const onReset = (val,e?) => {
        form.resetFields();
        setIdReq(null)
        setFabricApproval(null)
      };


    const columns: ColumnsType<any> =[
        {
            title: "SNo",
            key: "sno",
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1)),
        },
        {
            title: <div style={{ textAlign: "center" }}>Quality</div>,
            dataIndex: 'quality',
            align: "center",
          },
        {
          title: <div style={{textAlign: "center"}}>Fabric Code</div>,
          dataIndex: 'fabricCode',
          align:"center",
        },
        {
          title: <div style={{textAlign: "center"}}>Placement</div>,
          dataIndex: 'placement',
          align:"center",
        },
        {
          title: <div style={{textAlign: "center"}}>Width</div>,
          dataIndex: 'width',
          align:"center",
        },
        {
          title: <div style={{textAlign: "center"}}>Fabric Description</div>,
          dataIndex: 'fabricDescription',
          align:"center",
        },
        // {
        //   title: <div style={{textAlign: "center"}}>Fabric Responsible</div>,
        //   dataIndex: 'fabricResponsible',
        //   align:"center",
        //   render: (text, record) => {
        //     const fabricResponsible = fabricApproval[0]?.fabricResponsible;
        //     return <span>{fabricResponsible}</span>;
        //   },
        // },
        // {
        //   title: <div style={{textAlign: "center"}}>PCH</div>,
        //   dataIndex: 'pchId',
        //   align:"center",
        //   render: (text, record) => {
        //     const pch = fabricApproval[0]?.pchId;
        //     return <span>{pch}</span>;
        //   },
        // },
        {
            title: <div style={{ textAlign: "center" }}>Approval</div>,
            align:"center",
            render: (text, record) => {
              if (record.isApproved === 'YES') {
                return (<Checkbox disabled checked/>
                );
              } else {
                return (<Checkbox onChange={((e)=>handleCheckboxChange(record,e))}/>); 
              }
            },
          }     
    ]

    const buyerValue = (data) => {
        const buyerData = buyerId.find((item) => item.buyerId === data);
        return buyerData ? buyerData.buyerCode : '-';
    };

    const locationValue = (data) => {
        const locData = locId.find((item) => item.locationId === data);
        return locData ? locData.locationCode : '-';
    };

    const empValue = (data) => {
        const empData = empId.find((item) => item.employeeId === data);
        return empData ? empData.employeeCode : '-';
    };

    const styleValue = (data) => {
        const styleData = styleId.find((item) => item.styleId === data);
        return styleData ? styleData.style : '-';
    };
      

  return (
    <>
    <Card title= {fabricApproval?.length > 0 ? (
    <>
    <span>{'Fabric Responsible : ' + empValue(fabricApproval[0]?.fabricResponsible)}</span> 
    <span style={{marginLeft:"12%"}}>{'Location :' + locationValue(fabricApproval[0]?.locationId)}</span>
    <span style={{ marginLeft: "12%" }}>{'Buyer : ' + buyerValue(fabricApproval[0]?.buyerId)}</span>
    <span style={{ marginLeft: "12%" }}>{'Style : ' + styleValue(fabricApproval[0]?.styleId)}</span>
    <span style={{ marginLeft: "12%" }}>{'Type: ' + `${fabricApproval[0]?.type ? fabricApproval[0]?.type :'-'}`}</span>
    </>) : 'Fabric Approval'}>
        <Form layout='horizontal' form={form} onFinish={fabricApprovalData}>
            <Row gutter={10}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item name="requestNo" label="Fabric Request No">
                        <Select 
                        placeholder='Select Request No' 
                        allowClear
                        optionFilterProp="children"
                        showSearch
                        onChange={fabricId}
                        >
                            {fabricData?.map((val)=>{
                                return(
                                    <Option key={val.fabricRequestId} value={val.requestNo} val={val.fabricRequestId}>
                                        {val.requestNo}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} >
                    <Form.Item>
                    <Button htmlType="submit" icon={<SearchOutlined />}style={{marginRight: "15px",marginLeft:"15px", backgroundColor:'green'}}type="primary">
                        Search
                    </Button>
                    <Button danger htmlType='button' icon={<UndoOutlined />} style={{position: "relative" }} onClick={onReset}>
                        Reset
                    </Button>
                    </Form.Item>
                </Col>
            {/* </Row> */}
            {fabricApproval?.length > 0?(<>
            {/* <Row > */}
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item>
                        <Button htmlType="submit" style={{marginLeft:"490px", backgroundColor: 'green' }} type="primary">
                        Submit
                        </Button>
                    </Form.Item>
                </Col>
            {/* </Row> */}
            </>):(<></>)}
            </Row>
        </Form>
        {fabricApproval?.length > 0?(<>
        <Table
        size='small'
        rowKey={record => record}
        columns={columns}
        dataSource={fabricApproval[0]?.fabricQuantityEntity}
        className="custom-table-wrapper"
        pagination={{
            pageSize: 100, 
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
            }
        }}
        bordered />
        </>):(<></>)}
    </Card>
    </>
  )
}

export default FabricReqApproval