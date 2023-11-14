import { BarcodeOutlined, CaretDownOutlined, CaretRightOutlined, InfoCircleOutlined, PrinterOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { IndentService, RequisitionService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Collapse, Divider, Form, Modal, Row, Segmented, Select, Space, Table, Tag } from "antd"
import style from "antd/es/alert/style";
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Barcode from 'react-barcode';
import BarcodePrint from "./barcode-print";

const {Option} = Select;

export const SourcingRequisitionDynamicView = () => {
    const [tabName,setTabName] = useState<string>('Fabric')
    const [page, setPage] = React.useState(1);
    const [sourcingForm] = Form.useForm()
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])
    const navigate = useNavigate()
    // const service = new RequisitionService()
    const service = new IndentService()
    const logInUser = localStorage.getItem('userName')
    const [barcode, setBarcode] = useState<string>(null);
    const [barcodeModal,setBarcodeModal] = useState<boolean>(false)
    const [tableData,setTableData] = useState<any[]>([]);
    const [barcodeInfo,setBarcodeInfo] = useState<string>('')

    const [data,setData] = useState<any[]>([])

    useEffect(() => {
        getStyle()
        getAll()
    },[])

    useEffect(() => {
        if(data){
            setTableData(data)
        }
    },[data])

    const getAll = () => {
        service.getAllIndentData().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }

    const generateBarcode = (m3Code,info) => {
        setBarcode(m3Code);
        setBarcodeInfo(info)
        setBarcodeModal(true)
      }

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title: 'M3 Fabric Code',
            dataIndex: 'm3FabricCode',
        },
        {
            title: 'Shahi Fabric Code',
            dataIndex: 'shahiFabricCode',
            render: (text,record) => {
                return(
                     <span>
                     {record.shahiFabricCode}
                     <Divider type='vertical'/>
                     <Tag onClick={() => generateBarcode(record.shahiFabricCode,'m3ItemCode')} style={{cursor:'pointer'}}>
                         <BarcodeOutlined />
                     </Tag>
                 </span>
                )
            }
        },
        {
            title:'Content',
            dataIndex:'content'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricType',
            
        },
        {
            title:'Weave',
            dataIndex:'weave',
            // render: (text,record) => {
            //     return(
            //         <>
            //         {record.weave ? record.weaveName : '-'}
            //         </>
            //     )
            // }
        },
        {
            title:'Weight',
            dataIndex:'weight',
            render: (text,record) => {
                return(
                    <>
                    {record.weight ? `${record.weight} ${record.weightUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Width',
            dataIndex:'width'
        },
        {
            title:'Construction',
            dataIndex:'construction'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount',
            render: (text,record) => {
                return(
                    <>
                    {record.yarnCount ? `${record.yarnCount} ${record.unit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Finish',
            dataIndex:'finish',
          //   sorter: (a, b) => a.finish.length - b.finish.length,
          // sortDirections: ['descend', 'ascend'],
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage',
        },
        {
            title:'Color',
            dataIndex:'color',
            // render: (text,record) => {
            //     return(
            //         <>
            //         {record.color ? record.colorName : '-'}
            //         </>
            //     )
            // }
            
        },
        {
            title:'PCH',
            dataIndex:'pch',
            // render: (text,record) => {
            //     return(
            //         <>
            //         {record.pch ? record.pchName : '-'}
            //         </>
            //     )
            // }
            
        },
        {
            title:'MOQ',
            dataIndex:'moq',
            render: (text,record) => {
                return(
                    <>
                    {record.moq ? `${record.moq} ${record.moqUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Season',
            dataIndex:'season',
            
        },
        {
            title:'MOQ Price',
            dataIndex:'moqPrice',
            render: (text,record) => {
                return(
                    <>
                    {record.moqPrice ? `${record.moqPrice} ${record.moqPriceUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Supplier',
            dataIndex:'supplier',
            render: (text,record) => {
                return(
                    <>
                    {record.supplier ? record.supplierName : '-'}
                    </>
                )
            }
            
        },
        {
            title:'GRN Date',
            dataIndex:'grnDate',
            render:(text,record) => {
                const date = new Date(record.grnDate)
                return(
                    <>
                    {record.grnDate ? moment(date).format('YYYY-MM-DD') : '-'}
                    </>
                )
            }
        },
        {
            title:'Buyer',
            dataIndex:'buyer',
            render: (text,record) => {
                return(
                    <>
                    {record.buyer ? record.buyer : '-'}
                    </>
                )
            }
            
        },
        {
            title:'XL No',
            dataIndex:'xlNo'
        },
         {
            title:'Quantity',
            dataIndex:'quantity',
            render: (text,record) => {
                return(
                    <>
                    {record.quantity ? `${record.quantity} ${record.quantityUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Available Quantity',
            dataIndex:'quantity',
            // render: (text,record) => {
            //     return(
            //         <>
            //         {record.quantity ? `${record.availableQuantity} ${record.quantityUnit}` : '-'}
            //         </>
            //     )
            // }
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            title:'To Be Procured',
            dataIndex:'tobeProcured',
            render:(text,record) => {
                return(
                    <>
                    {record.quantity-record.availableQuantity > 0 ? record.quantity - record.availableQuantity : 0}
                    </>
                )
            }
        },
        {
            title:'Action',
            dataIndex:'action',
            render:(text,record) =>{
                return(
                    <span>
                    {/* <Button onClick={() => generateBarcode(record.m3FabricCode)}>
                        <BarcodeOutlined/>
                    </Button>
                    <Divider type='vertical'/> */}
                    <Button type='primary' disabled={logInUser == 'marketUser' ? true : false}>Generate PO</Button>
                    </span>
                )
            }
        },
    ]

    const columnsSkelton: any = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title: 'M3 Trim Code',
            dataIndex: 'm3TrimCode',
        },
        {
            title: 'Shahi Trim Code',
            dataIndex: 'shahiTrimCode',
            render: (text,record) => {
                return(
                     <span>
                     {record.shahiTrimCode}
                     <Divider type='vertical'/>
                     <Tag onClick={() => generateBarcode(record.shahiTrimCode,'m3ItemCode')} style={{cursor:'pointer'}}>
                         <BarcodeOutlined />
                     </Tag>
                 </span>
                )
            }
        },
        {
          title: 'Trim Type',
          dataIndex: 'trimType',
        },
        {
          title: 'Trim Code',
          dataIndex: 'trimCode',
        },
        {
          title: 'Size',
          dataIndex: 'size',
        //   render: (text,record) => {
        //     return(
        //         <>
        //         {record.size ? record.sizeName : '-'}
        //         </>
        //     )
        // }
        },
        {
          title: 'Color',
          dataIndex: 'color',
        //     render: (text,record) => {
        //       return(
        //           <>
        //           {record.color ? record.colorName : '-'}
        //           </>
        //       )
        //   }
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          render: (text,record) => {
            return(
                <>
                {record.quantity ? `${record.quantity} ${record.quantityUnit}` : '-'}
                </>
            )
        }
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
        },
        {
            title:'Available Quantity',
            dataIndex:'availableQuantity',
            render: (text,record) => {
                return(
                    <>
                    {record.availableQuantity ? `${record.availableQuantity} ${record.quantityUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            title:'To Be Procured',
            dataIndex:'tobeProcured',
            render:(text,record) => {
                return(
                    <>
                    {record.quantity-record.availableQuantity > 0 ? record.quantity - record.availableQuantity : 0}
                    </>
                )
            }
        },
        {
            title:'Action',
            dataIndex:'action',
            render:(text,record) =>{
                return(
                    <span>
                        {/* <Button type='primary' shape='round' onClick={() => generateBarcode(record.m3TrimCode)}>
                            <PrinterOutlined />
                        </Button>
                        <Divider type='vertical'/> */}
                    <Button type='primary' disabled={logInUser == 'marketUser' ? true : false}>Generate PO</Button>
                    </span>
                )
            }
        },
        
    ]

    const onSegmentChange = (val) => {
        setTabName(val)
    }

    const HeaderRow = (props: any,) => {
        const {requestNo,style,description,expectedDate,indentDate,status} = props
          
          return (
            <div style={{ display: "flex" }}>
              <span>Request Number : {<b>{requestNo}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Style : {<b>{style}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Description : {<b>{description}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Indent Date : {<b>{indentDate}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Expected Date : {<b>{expectedDate}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Status : {<b>{status}</b>}</span>
              {/* <span style={{width:'10px'}}></span>
              <span>{<Tag onClick={() => generateBarcode(requestNo)} style={{cursor:'pointer'}}>
                         <BarcodeOutlined />
                     </Tag>}</span> */}

            </div>
          );
        };

    const onReset = () => {
        sourcingForm.resetFields()
        setTableData(data)
    }
    
    const onSearch = () => {
        let filterData = []
        if(sourcingForm.getFieldValue('style') !== undefined){
            const styleId = sourcingForm.getFieldValue('style')
            filterData = data.filter((e) => e.styleId === styleId)
        } else if(sourcingForm.getFieldValue('requestNo') !== undefined){
            const reqno = sourcingForm.getFieldValue('requestNo')
            filterData = data.filter((e) => e.requestNo === reqno)
        }
        setTableData(filterData)
    }

    const onBarcodeModalCancel = () => {
        setBarcode('')
        setBarcodeModal(false)
    }

    const closeWindow = () => {
        setBarcode('');
        window.close();
      };

    return(
        
        <Card className="card-header" title='Requisition' extra={(logInUser == 'marketUser') && <span><Button onClick={() => navigate('/indent-form')}>New</Button></span>}>
            {/* {barcode.length > 0 ? <BarcodePrint key={Date.now() + barcode} printBarcodes={closeWindow} closeBarcodePopUp={closeWindow}
          columns={barcodeWithColumns} newWindow={false} barcodeInfo={barcode} /> : ''} */}
            <Form form={sourcingForm}>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='requestNo' label='Request Number'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Request Number'>
                    {data.map(e => {
                                return(
                                    <Option key={e.requestNo} value={e.requestNo} name={e.requestNo}> {e.requestNo}</Option>
                                )
                            })}
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='style' label='Style'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style'>
                            {style.map(e => {
                                return(
                                    <Option key={e.styleId} value={e.styleId} name={e.style}> {e.style}-{e.description}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Form.Item>
                            <Button type='primary' htmlType="submit" icon={<SearchOutlined/>} onClick={onSearch}>Search</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Form.Item>
                            <Button danger icon={<UndoOutlined/>} onClick={onReset}>Reset</Button>
                    </Form.Item>
                    </Col>
                </Row>
                </Form>
        

            <Collapse collapsible="icon" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} accordion>
                      {tableData.map((item: any, index: any) => (
                        <Collapse.Panel header={<HeaderRow requestNo={item.requestNo} style={item.style} description={item.description} expectedDate={item.expectedDate} indentDate={item.indentDate}  status={item.status}/>} key={index} extra={<Tag onClick={() => generateBarcode(item.requestNo,'requestNo')} style={{cursor:'pointer'}}>
                        <BarcodeOutlined />
                    </Tag>}>
                        <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
                    <Segmented onChange={onSegmentChange} style={{backgroundColor:'#68cc6b'}}
                      options={[
                        {
                          label: (
                            <>
                              <b style={{ fontSize: "12px" }}>Fabric Details</b>
                            </>
                          ),
                          value: "Fabric",
                        },
                        {
                          label: (
                            <>
                              <b style={{ fontSize: "12px" }}>Trim Details</b>
                            </>
                          ),
                          value: "Trim",
                        },
                    ]}  
                    />
                    <div>
                        {tabName === 'Fabric' ? (<>
                        <Table columns={columns} dataSource={item.indentFabricDetails} pagination={false} scroll={{x:'max-content'}} className="custom-table-wrapper"/>
                        </>) : (<></>)}
                    </div>
                    <div>
                        {tabName === 'Trim' ? (<>
                            <Table columns={columnsSkelton} dataSource={item.indentTrimDetails} pagination={false} scroll={{x:'max-content'}} className="custom-table-wrapper"/>
                        </>) : (<></>)}
                    </div>
                    </Space>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
                    <Modal open={barcodeModal} onCancel={onBarcodeModalCancel} footer={[]} title={barcodeInfo === 'm3ItemCode' ? 'M3 Item Code' : 'Request Number'}>
                    <div style={{textAlign:'center'}}>
                    <Barcode value={barcode} height={30} />
                    </div>
                    </Modal>
          
        </Card>
    )
}

export default SourcingRequisitionDynamicView