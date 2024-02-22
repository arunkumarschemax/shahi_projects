import { ItemTypeEnumDisplay, MenusAndScopesEnum, PurchaseOrderStatus, grnReportReq } from '@project-management-system/shared-models';
import { GRNService, PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Statistic, Table, Tag, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import { RolePermission } from '../role-permissions';
import { Excel } from 'antd-table-saveas-excel';
import { useIAMClientState } from '../common/iam-client-react';

 const GrnReport =() =>{
    const [form] =Form.useForm();
    const [grnData, setgrnData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const [sampleOrder, setSampleOrder] = useState<any[]>([])
    const [indentData, setIndentData] = useState<any[]>([])
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [page,setPage] = useState<number>(1);
    const {Option} = Select
    const grnService = new GRNService()
    const poService = new PurchaseOrderservice()
    const { IAMClientAuthContext } = useIAMClientState();

    // const [selectedKeys, setSelectedKeys] = useState<any>('');
    // let selectedKeys = '';
    useEffect(() =>{
      getGrnReportData()
      getPoNumber()
      getIndent()
      getSampleorder()

  },[])
    const checkAccess = (buttonParam) => {  
      const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Reports,MenusAndScopesEnum.SubMenus['Purchase Order Report'],buttonParam)
     
      return accessValue
    }
    const getGrnReportData = () =>{
      const req = new grnReportReq()
      if(form.getFieldValue('grnDate') !=undefined){
        req.grnDate =  form.getFieldValue('grnDate').format("YYYY-MM-DD")
      }
      if(form.getFieldValue('indentId') !=undefined ){
        req.indentId =form.getFieldValue('indentId')
      }
      if(form.getFieldValue('poNumber') !=undefined){
        req.poId=form.getFieldValue('poNumber')
      }
      if(form.getFieldValue('poStatus') !=undefined){
        req.poStatus =form.getFieldValue('poStatus')
      }
      if(form.getFieldValue('sampleId') !=undefined){
        req.sampleOrderId = form.getFieldValue('sampleId') 
      }
      if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
        req.tab= 'FABRIC'
      }
      if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
        req.tab= 'TRIM'
      }
      if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
        req.tab = undefined
          }
          req.extRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null

       
        grnService.getGrnReportData(req).then(res =>{
          console.log(req,'pppppppppppp');
          
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
    const getSampleorder =() =>{
      grnService.getSampleRequestnoGainstGrn().then(res =>{
        if(res.status){
          setSampleOrder(res.data)
        }else{
          setSampleOrder([])
        }
      })
    }
    const getIndent =() =>{
      grnService.getIndentGainstGrn().then(res =>{
        if(res.status){
          setIndentData(res.data)
        }else{
          setIndentData([])
        }
      })
    }

   

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
  };

    const getColumnSearchProps = (dataIndex: string) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
              <Input
                  ref={searchInput}
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
              <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90, marginRight: 8 }}
              >
                  Search
              </Button>
              <Button size="small" style={{ width: 90 }}
                  onClick={() => {
                      handleReset(clearFilters)
                      setSearchedColumn(dataIndex);
                      confirm({ closeDropdown: true });
                  }}>
                  Reset
              </Button>
          </div>
      ),
      filterIcon: filtered => (
          <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
          record[dataIndex]
              ? record[dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
              : false,
      onFilterDropdownVisibleChange: visible => {
          if (visible) { setTimeout(() => searchInput.current.select()); }
      },
      render: text =>
          text ? (
              searchedColumn === dataIndex ? (
                  <Highlighter
                      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                      searchWords={[searchText]}
                      autoEscape
                      textToHighlight={text.toString()}
                  />
              ) : text
          )
              : null
  })

    const columns:any =[
        {
            title: 'S No',
            key: 'sno',
            width:'50px',
            style: { background: 'red' },
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
            onCell: (record: any) => ({
              rowSpan: record.rowSpan,
            }),
          },
          {
            title: "GRN Date",
            dataIndex: "grndate",
            render:(_,record) =>{
              return(record.grndate?moment(record.grndate).format("YYYY-MM-DD"):'-')
            }
        
          },
          {
            title: "GRN Number",
            dataIndex: "grnNumber",
            // ...getColumnSearchProps('grnNumber'),
        
          },
          {
            title: "GRN Item Number",
            dataIndex: "grnItemNo",
            // ...getColumnSearchProps('grnItemNo')

          },
          {
            title: "Style",
            dataIndex: "style",
            // ...getColumnSearchProps('style')

        },
          {
              title: "PO Number",
              dataIndex: "poNumber",
            // ...getColumnSearchProps('poNumber')

          },
          // {
          //   title: "GRN Type",
          //   dataIndex: "poAgainst",
          //   ...getColumnSearchProps('poAgainst')


          // },
          {
            title: "GRN Type",
            dataIndex: "poAgainst",
            // ...getColumnSearchProps('poAgainst'),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Checkbox
                  checked={selectedKeys.includes('Sample Order')}
                  onChange={() => setSelectedKeys(selectedKeys.includes('Sample Order') ? [] : ['Sample Order'])}
                >
                  Sample Order
                </Checkbox>
                <Checkbox
                  checked={selectedKeys.includes('Indent')}
                  onChange={() => setSelectedKeys(selectedKeys.includes('Indent') ? [] : ['Indent'])}
                >
                  Indent
                </Checkbox>
                <div className="custom-filter-dropdown-btns">
                  <Button onClick={() => clearFilters()} className="custom-reset-button">
                    Reset
                  </Button>
                  <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
                    OK
                  </Button>
                </div>
              </div>
            ),
            onFilter: (value, record) => record.poAgainst === value,
          },          
          
          {
            title: "Indent /Sample Order Number",
            // ...getColumnSearchProps('indentNo'),
            render:(_,record) =>{
              return (record.indentNo != null ?record.indentNo:record.sampleReqNo)
             },


          },
          {
            title: "Sample Order",
            dataIndex: "sampleReqNo",width:120,align:'center',
            ...getColumnSearchProps('sampleReqNo'),
            render: (text) => (text ? text : '-'),
          },
          
          // {
          //   title: "Item Type",
          //   dataIndex: "itemType",
          //   sorter: (a, b) => a.itemType?.localeCompare(b.itemType),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps('itemType'),
          //   render: (text) => {
          //     const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
          //     return EnumObj ? EnumObj.displayVal : text;
          //   },

          // },  
     
         
          {
            title: "Item Type",
            dataIndex: "itemType",
            align: "center",
            width: 120,
            render: (text) => (
              <>
                {text === 'FABRIC' ? (
                  'Fabric'
                ) : text === 'SEWING_TRIM' ? (
                  'Sewing Trim'
                ) : text === 'PACKING_TRIM' ? (
                  'Packing Trim'
                ) : (
                  <Tag>{text}</Tag>
                )}
              </>
            ),
            onFilter: (value, record) => record.itemType.includes(value), // Modify the filter condition
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
              <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
                {['FABRIC', 'SEWING_TRIM', 'PACKING_TRIM'].map((type) => (
                  <Checkbox
                    key={type}
                    checked={selectedKeys.includes(type)}
                    onChange={() => {
                      const newSelectedKeys = selectedKeys.includes(type)
                        ? selectedKeys.filter((key) => key !== type)
                        : [...selectedKeys, type];
                      setSelectedKeys(newSelectedKeys);
                    }}
                  >
                    <span>{type === 'PACKING_TRIM' ? 'Packing Trim' : type}</span>
                  </Checkbox>
                ))}
                <div className="custom-filter-dropdown-btns">
                  <Button onClick={() => clearFilters()} className="custom-reset-button">
                    Reset
                  </Button>
                  <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
                    OK
                  </Button>
                </div>
              </div>
            ),
          },
          
          // {
          //   title: "Fabric Item",
          //   dataIndex: "m3ItemDescription",
          //   width:'110px',
          //   sorter: (a, b) => a.m3ItemDescription.localeCompare(b.m3ItemDescription),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps('m3ItemDescription')
          // },       
          {
            title: "Item",
            // dataIndex: "m3ItemDescription",
            // width:'110px',
            render:(_,record) =>{
             return (record.m3ItemDescription != null ?record.m3ItemDescription:record.m3TrimDesc)
            },
          },
          // {
          //   title: "Trim Item",
          //   dataIndex: "m3TrimDesc",
          //   width:'110px',
          //   sorter: (a, b) => a.m3TrimDesc.localeCompare(b.m3TrimDesc),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps('m3TrimDesc')

          // },
          {
            title: "Required Quantity",
            dataIndex: "poQuantity",
            sorter: (a, b) => a.poQuantity?.localeCompare(b.poQuantity),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps('poQuantity'),
            render:(_,record)=>{
              let uom
              if(record.uom != null){
                uom='-'+record.uom
              }else{
                uom=''
              }
              return(record.poQuantity?record.poQuantity+uom:'-')
            }

          },
          {
            title: "Received Quantity",
            sorter: (a, b) => a.receivedQuantity.localeCompare(b.receivedQuantity),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('receivedQuantity'),
            render:(_,record)=>{
              let uom
              if(record.uom != null){
                uom='-'+record.uom
              }else{
                uom=''
              }
              return(record.receivedQuantity?record.receivedQuantity+uom:'-')
            }
          },
          {
            title: "Rejected Quantity",
            // ...getColumnSearchProps('rejectedQuantity'),
            sorter: (a, b) => a.rejectedQuantity?.localeCompare(b.rejectedQuantity),
            sortDirections: ["descend", "ascend"],
            render:(_,record)=>{
              let uom
              if(record.uom != null){
                uom='-'+record.uom
              }else{
                uom=''
              }
              return(record.rejectedQuantity?record.rejectedQuantity+uom:'-')
            }
      
          },
          {
            title: "Unit price",
            sorter: (a, b) => {
              const aPrice = parseFloat(a.unitPrice);
              const bPrice = parseFloat(b.unitPrice);
            
              return !isNaN(aPrice) && !isNaN(bPrice)
                ? aPrice - bPrice
                : a.unitPrice?.localeCompare(b.unitPrice) || 0;
            },
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('unitPrice'),
            render:(_,record) =>{
              let unitPriceUom
              if(record.currencyName != null){
                unitPriceUom ='-'+record.currencyName
              }else{
                unitPriceUom=''
              }
              return record.unitPrice+unitPriceUom
            }
          },
          {
            title: "GRN Amount",
            sorter: (a, b) => a.totalPoAmount?.localeCompare(b.totalPoAmount),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps('totalPoAmount'),
            render:(_,record) =>{
              let unitPriceUom
              if(record.currencyName != null){
                unitPriceUom ='-'+record.currencyName
              }else{
                unitPriceUom=''
              }
              return record.totalPoAmount+unitPriceUom
            }
          },
          // {
          //   title: "Location Mapping Status",
          //   dataIndex: "locationMappedStatus",
          //   fixed: 'right',
          //   width:'100px',
          //   sorter: (a, b) => a.locationMappedStatus.localeCompare(b.locationMappedStatus),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps('locationMappedStatus')
          // },
          {
            title: "Location Mapping Status",
            dataIndex: "locationMappedStatus",
            fixed: 'right',
            width: 120,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
              <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
                {['OPEN', 'COMPLETED'].map((status) => (
                  <Checkbox
                    key={status}
                    checked={selectedKeys.includes(status)}
                    onChange={() => setSelectedKeys(selectedKeys.includes(status) ? [] : [status])}
                  >
                    <span>{status}</span>
                  </Checkbox>
                ))}
                <div className="custom-filter-dropdown-btns">
                  <Button onClick={() => clearFilters()} className="custom-reset-button">
                    Reset
                  </Button>
                  <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
                    OK
                  </Button>
                </div>
              </div>
            ),
            onFilter: (value, record) => record.locationMappedStatus === value,
          },
          ,
          
          // {
          //   title: "PO Status",
          //   dataIndex: "poStatus",
          //   fixed: 'right',  
          //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          //     <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
          //       {['OPEN', 'CANCELLED','IN PROGRESS','CLOSED'].map((status) => (
          //         <Checkbox
          //           key={status}
          //           checked={selectedKeys.includes(status)}
          //           onChange={() => setSelectedKeys(selectedKeys.includes(status) ? [] : [status])}
          //         >
          //           <span>{status}</span>
          //         </Checkbox>
          //       ))}
          //       <div className="custom-filter-dropdown-btns">
          //         <Button onClick={() => clearFilters()} className="custom-reset-button">
          //           Reset
          //         </Button>
          //         <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
          //           OK
          //         </Button>
          //       </div>
          //     </div>
          //   ),
          //   onFilter: (value, record) => record.locationMappedStatus === value,
      
          // },
          // {
          //   title: "PO Status",
          //   dataIndex: "poStatus",
          //   fixed: 'right',  
          //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          //     <div className="custom-filter-dropdown" style={{ flexDirection: 'column', marginLeft: 10 }}>
          //       {['OPEN', 'CANCELLED', 'IN PROGRESS', 'CLOSED'].map((status) => (
          //         <Checkbox
          //           key={status}
          //           checked={selectedKeys.includes(status)}
          //           onChange={() => setSelectedKeys(selectedKeys.includes(status) ? [] : [status])}
          //         >
          //           <span>{status}</span>
          //         </Checkbox>
          //       ))}
          //       <div className="custom-filter-dropdown-btns">
          //         <Button onClick={() => clearFilters()} className="custom-reset-button">
          //           Reset
          //         </Button>
          //         <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
          //           OK
          //         </Button>
          //       </div>
          //     </div>
          //   ),
          //   onFilter: (value, record) => record.poStatus === value,
          // },
          //this is working for single selection only please check it if multiple selection is not working
          {
            title: "PO Status",
            dataIndex: "poStatus",
            fixed: 'right',  
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
              <div className="custom-filter-dropdown" style={{ flexDirection: 'column', marginLeft: 10 }}>
                {['OPEN', 'CANCELLED', 'IN PROGRESS', 'CLOSED'].map((status) => (
                  <Checkbox
                    key={status}
                    checked={selectedKeys.includes(status)}
                    onChange={() => {
                      const newSelectedKeys = selectedKeys.includes(status)
                        ? selectedKeys.filter((key) => key !== status)
                        : [...selectedKeys, status];
                      setSelectedKeys(newSelectedKeys);
                    }}
                  >
                    <span>{status}</span>
                  </Checkbox>
                ))}
                <div className="custom-filter-dropdown-btns">
                  <Button onClick={() => clearFilters()} className="custom-reset-button">
                    Reset
                  </Button>
                  <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
                    OK
                  </Button>
                </div>
              </div>
            ),
            onFilter: (value, record) => record.poStatus === value,
          },
          
          
    ]
    
    const onReset =() =>{
      form.resetFields()
        getGrnReportData()
    }

    const exportExcel = () => {
      const excel = new Excel();
      excel
        .addSheet('GRN Report')
        .addColumns(columns)
        .addDataSource(grnData, { str2num: true })
        .saveAs('GRN Report.xlsx');
    }

    return(
        <div>
                   
        <Card title={'GRN Report'}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={grnData.length > 0 ? (<><Button type='default' onClick={() => exportExcel()} icon={<FileExcelOutlined />} style={{color:'green'}}>Get Excel</Button></>) : (<></>)}>
        <Form form={form} layout='vertical' onFinish={getGrnReportData}>
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item name='poNumber' label='Po Number'>
                            <Select placeholder='Po Number'allowClear>
                                {poData.map(e =>{
                                    return(<Option key={e.purchase_order_id} value={e.purchase_order_id}>{e.po_number}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='sampleId' label='Sample Order'>
                            <Select placeholder='Sample Order' allowClear>
                                {sampleOrder.map(e =>{
                                    return(<Option key={e.sampleReqId} value={e.sampleReqId}>{e.requestNo}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='indentId' label='Indent Number'>
                            <Select placeholder='Indent No' allowClear>
                                {indentData.map(e =>{
                                    return(<Option key={e.indentId} value={e.indentId}>{e.indentNo}</Option>)
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
                        <Form.Item name='poStatus' label='PO Status'>
                            <Select placeholder='PO Status' showSearch allowClear>
                                    {Object.values(PurchaseOrderStatus).map((key,value) =>{
                                        return <Option key={key} value={key}>{key}</Option>
                                    })
                                        
                                    }
                                </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{paddingTop:'20px'}}>
                       <Button type='primary' htmlType='submit'>{'Search'}</Button>
                    {/* </Col> */}
                    {/* <Col span={4}  style={{paddingTop:'20px'}} > */}
                       <Button onClick={onReset} style={{marginLeft:'10px'}}>{'Reset'}</Button>
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
                      scroll={{x:'max-content',y:500}}
                    />
        </Card>
        </div>


    )
}
export default GrnReport