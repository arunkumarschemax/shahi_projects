import { CaretDownOutlined, CaretRightOutlined, InfoCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { RequisitionService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Collapse, Form, Row, Segmented, Select, Space, Table } from "antd"
import style from "antd/es/alert/style";
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const {Option} = Select;

export const SourcingRequisitionDynamicView = () => {
    const [tabName,setTabName] = useState<string>('Fabric')
    const [page, setPage] = React.useState(1);
    const [sourcingForm] = Form.useForm()
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])
    const navigate = useNavigate()
    const service = new RequisitionService()
    const logInUser = localStorage.getItem('userName')


    const [tableData,setTableData] = useState<any[]>([])

    // const [data,setData] = useState<any[]>([
    //     {
    //         styleId: 11,
    //         style:'WV34D103',
    //         styleDescription:'ROLL CUFFSHORT',
    //         fabricInfo: [
    //             {
    //                 content:'Natural Fabrics',
    //                 fabricType:'Cotton',
    //                 weave:'Plain Weave',
    //                 weight:'100kg',
    //                 width:'100',
    //                 construction:'Cotton',
    //                 yarnCount:'100',
    //                 finish:'shrink resistance treatment',
    //                 shrinkage:'2-3 %',
    //                 color:'Blue',
    //                 pch:'Srinivas',
    //                 moq:'100 Pieces',
    //                 season:'Summer',
    //                 moqPrice:'100 INR',
    //                 supplier:'Rajesh',
    //                 grnDate:'09-08-2023',
    //                 buyer:'Naidu',
    //                 xlNo:'24',
    //                 quantity:'100',
    //                 colorName:'Blue',
    //                 weaveName:'Basket Weave',
    //                 pchName: 'Sagar',
    //                 supplierName:'Naidu',
    //                 buyerName:'Rajesh'
    //             },
    //             {
    //                 content:'Natural Fabrics',
    //                 fabricType:'Silk',
    //                 weave:'Plain Weave',
    //                 weight:'200kg',
    //                 width:'100',
    //                 construction:'Cotton',
    //                 yarnCount:'100',
    //                 finish:'embossed treatment',
    //                 shrinkage:'2-3 %',
    //                 color:'Green',
    //                 pch:'Srinivas',
    //                 moq:'250 Pieces',
    //                 season:'Spring',
    //                 moqPrice:'100 INR',
    //                 supplier:'Rajesh',
    //                 grnDate:'09-08-2023',
    //                 buyer:'Naidu',
    //                 xlNo:'24',
    //                 quantity:'100',
    //                 colorName:'Green',
    //                 weaveName:'Plain Weave',
    //                 pchName: 'Sujith',
    //                 supplierName:'Srinu',
    //                 buyerName:'Rajesh'
          
    //             },
    //         ],
    //         trimInfo:[
    //             {
    //                 trimType: "Button",
    //                 trimCode: "BTN001",
    //                 description: "Metallic Gold Button",
    //                 size: "1cm", // Size in centimeters
    //                 color: "Gold",
    //                 quantity: 100,
    //                 remarks: "Shiny finish",
    //                 sizeName:'L',
    //                 colorName:'White'
    //             },
    //             {
    //                 trimType: "Zipper",
    //                 trimCode: "ZIP002",
    //                 description: "Nylon Zipper",
    //                 size: "20cm", // Size in centimeters
    //                 color: "Black",
    //                 quantity: 50,
    //                 remarks: "Water-resistant",
    //                 sizeName:'L',
    //                 colorName:'White'
    //               },
    //         ]
    //     },
    //     {
    //         styleId: 12,
    //         style:'WV34D104',
    //         styleDescription:'Bagee phant',
    //         fabricInfo: [
    //             {
    //                 content:'Natural Fabrics',
    //                 fabricType:'Wool',
    //                 weave:'Basket Weave',
    //                 weight:'100kg',
    //                 width:'100',
    //                 construction:'Cotton',
    //                 yarnCount:'100',
    //                 finish:'bulletproofing',
    //                 shrinkage:'2-3 %',
    //                 color:'Yellow',
    //                 pch:'Srinivas',
    //                 moq:'200 Pieces',
    //                 season:'Winter',
    //                 moqPrice:'100 INR',
    //                 supplier:'Rajesh',
    //                 grnDate:'09-08-2023',
    //                 buyer:'Naidu',
    //                 xlNo:'24',
    //                 quantity:'100',
    //                 colorName:'Blue',
    //                 weaveName:'Basket Weave',
    //                 pchName: 'Sagar',
    //                 supplierName:'Naidu',
    //                 buyerName:'Rajesh'
          
    //             },
    //             {
    //                 content:'Natural Fabrics',
    //                 fabricType:'Cotton',
    //                 weave:'Checked Weave',
    //                 weight:'250kg',
    //                 width:'100',
    //                 construction:'Cotton',
    //                 yarnCount:'100',
    //                 finish:'shrink resistance treatment',
    //                 shrinkage:'2-3 %',
    //                 color:'White',
    //                 pch:'Srinivas',
    //                 moq:'100 Pieces',
    //                 season:'Summer',
    //                 moqPrice:'100 INR',
    //                 supplier:'Rajesh',
    //                 grnDate:'09-08-2023',
    //                 buyer:'Naidu',
    //                 xlNo:'24',
    //                 quantity:'100',
    //                 colorName:'Blue',
    //                 weaveName:'Basket Weave',
    //                 pchName: 'Sagar',
    //                 supplierName:'Naidu',
    //                 buyerName:'Rajesh'
        
    //             }
    //         ],
    //         trimInfo:[
    //               {
    //                 trimType: "Thread",
    //                 trimCode: "THR003",
    //                 description: "Cotton Sewing Thread",
    //                 size: "100m", // Size in meters
    //                 color: "White",
    //                 quantity: 200,
    //                 remarks: "Strong and durable",
    //                 sizeName:'L',
    //                 colorName:'White'
    //               },
    //               {
    //                 trimType: "Fabric",
    //                 trimCode: "FAB004",
    //                 description: "Cotton Blend Fabric",
    //                 size: "2.5m", // Size in meters
    //                 color: "Blue",
    //                 quantity: 30,
    //                 remarks: "Soft and breathable",
    //                 sizeName:'L',
    //                 colorName:'White'
    //               },
    //         ]
    //     }
    // ])

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
        service.getAll().then(res => {
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
            render: (text,record) => {
                return(
                    <>
                    {record.weave ? record.weaveName : '-'}
                    </>
                )
            }
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
                    {record.yarnCount ? `${record.yarnCount} ${record.yarnUnit}` : '-'}
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
            render: (text,record) => {
                return(
                    <>
                    {record.color ? record.colorName : '-'}
                    </>
                )
            }
            
        },
        {
            title:'PCH',
            dataIndex:'pch',
            render: (text,record) => {
                return(
                    <>
                    {record.pch ? record.pchName : '-'}
                    </>
                )
            }
            
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
                    {record.buyer ? record.buyerName : '-'}
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
          render: (text,record) => {
            return(
                <>
                {record.size ? record.sizeName : '-'}
                </>
            )
        }
        },
        {
          title: 'Color',
          dataIndex: 'color',
            render: (text,record) => {
              return(
                  <>
                  {record.color ? record.colorName : '-'}
                  </>
              )
          }
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
        const {requestNo,style,styleDescription,expectedDate,indentDate} = props
          
          return (
            <div style={{ display: "flex" }}>
              <span>Request Number : {<b>{requestNo}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Style : {<b>{style}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Description : {<b>{styleDescription}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Indent Date : {<b>{indentDate}</b>}</span>
              <span style={{width:'10px'}}></span>
              <span>Expected Date : {<b>{expectedDate}</b>}</span>

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

    return(
        <Card className="card-header" title='Requisition' extra={(logInUser == 'marketUser') && <span><Button onClick={() => navigate('/indent-form')}>New</Button></span>}>
            <Form form={sourcingForm}>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name='requestNo' label='Request Number'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Request Number'>
                            <Option key={'REQ001'} value='REQ001'>REQ001</Option>
                            <Option  key={'REQ002'} value='REQ002'>REQ002</Option>
                            <Option  key={'REQ003'} value='REQ003'>REQ003</Option>
                            <Option  key={'REQ004'} value='REQ004'>REQ004</Option>
                            <Option  key={'REQ005'} value='REQ005'>REQ005</Option>
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
        

            <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} accordion>
                      {tableData.map((item: any, index: any) => (
                        <Collapse.Panel header={<HeaderRow requestNo={item.requestNo} style={item.style} styleDescription={item.styleDescription} expectedDate={item.expectedDate} indentDate={item.indentDate}/>} key={index}>
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
                        <Table columns={columns} dataSource={item.fabricInfo} pagination={false} scroll={{x:'max-content'}} className="custom-table-wrapper"/>
                        </>) : (<></>)}
                    </div>
                    <div>
                        {tabName === 'Trim' ? (<>
                            <Table columns={columnsSkelton} dataSource={item.trimInfo} pagination={false} className="custom-table-wrapper"/>
                        </>) : (<></>)}
                    </div>
                    </Space>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
          
        </Card>
    )
}

export default SourcingRequisitionDynamicView