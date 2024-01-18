import { ItemTypeEnumDisplay, MenusAndScopesEnum, PurchaseOrderStatus, grnReportReq } from '@project-management-system/shared-models';
import { GRNService, PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Statistic, Table, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { RolePermission } from '../role-permissions';

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
            title: "Grn Date",
            dataIndex: "grndate",
            render:(_,record) =>{
              return(record.grndate?moment(record.grndate).format("YYYY-MM-DD"):'-')
            }
        
          },
          {
            title: "Grn Number",
            dataIndex: "grnNumber",
            ...getColumnSearchProps('grnNumber'),
        
          },
          {
            title: "Grn Item Number",
            dataIndex: "grnItemNo",
            ...getColumnSearchProps('grnItemNo')

          },
          {
            title: "Style",
            dataIndex: "style",
            ...getColumnSearchProps('style')

        },
          {
              title: "Po Number",
              dataIndex: "poNumber",
            ...getColumnSearchProps('poNumber')

          },
          {
            title: "Grn Type",
            dataIndex: "poAgainst",
            ...getColumnSearchProps('poAgainst')

          },
          {
            title: "Indent /Sample Order Number",
            ...getColumnSearchProps('indentNo'),
            render:(_,record) =>{
              return (record.indentNo != null ?record.indentNo:record.sampleReqNo)
             },


          },
          // {
          //   title: "Sample Order",
          //   dataIndex: "sampleReqNo",
          //   ...getColumnSearchProps('sampleReqNo')
          // },
          {
            title: "Item Type",
            dataIndex: "itemType",
            sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps('itemType'),
            render: (text) => {
              const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
              return EnumObj ? EnumObj.displayVal : text;
            },

      
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
            ...getColumnSearchProps('poQuantity'),
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
            title: "Recived Quantity",
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
            ...getColumnSearchProps('rejectedQuantity'),
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
            sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
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
            title: "Grn Amount",
            sorter: (a, b) => a.totalPoAmount.localeCompare(b.totalPoAmount),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('totalPoAmount'),
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
          {
            title: "Location Mapping Status",
            dataIndex: "locationMappedStatus",
            fixed: 'right',  
            sorter: (a, b) => a.locationMappedStatus.localeCompare(b.locationMappedStatus),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('locationMappedStatus')
          },
        
          {
            title: "Po Status",
            dataIndex: "poStatus",
            fixed: 'right',  
            sorter: (a, b) => a.poQuantity.localeCompare(b.rejectedQuantity),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('poStatus')
      
          },
    ]
    
    const onReset =() =>{
        getGrnReportData()
        form.resetFields()
    }
    return(
        <div>
                   
        <Card title={'Grn Report'}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <Form form={form} layout='vertical' onFinish={getGrnReportData}>
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item name='poNumber' label='Po Number'>
                            <Select placeholder='Po Number'>
                                {poData.map(e =>{
                                    return(<Option key={e.purchase_order_id} value={e.purchase_order_id}>{e.po_number}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='sampleId' label='Sample Order'>
                            <Select placeholder='Sample Order'>
                                {sampleOrder.map(e =>{
                                    return(<Option key={e.sampleReqId} value={e.sampleReqId}>{e.requestNo}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name='indentId' label='Indent Number'>
                            <Select placeholder='Indent No'>
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