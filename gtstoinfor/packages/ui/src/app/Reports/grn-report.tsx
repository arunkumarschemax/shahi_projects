import { PurchaseOrderStatus, grnReportReq } from '@project-management-system/shared-models';
import { GRNService, PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Statistic, Table, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

 const GrnReport =() =>{
    const [form] =Form.useForm();
    const [grnData, setgrnData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
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
            width:'200px',
            render:(_,record) =>{
              return(record.grndate?moment(record.grndate).format("YYYY-MM-DD"):'-')
            }
        
          },
          {
            title: "Grn Number",
            dataIndex: "grnNumber",
            width:'300px',
            ...getColumnSearchProps('grnNumber'),
        
          },
          {
            title: "Grn Item Number",
            dataIndex: "grnItemNo",
            width:'200px',          
            ...getColumnSearchProps('grnItemNo')

          },
          {
            title: "Style",
            dataIndex: "style",
            width:'200px',
            ...getColumnSearchProps('style')

        },
          {
              title: "Po Number",
              dataIndex: "poNumber",
             width:'500px',
            ...getColumnSearchProps('poNumber')

          },
          {
            title: "Grn Type",
            dataIndex: "poAgainst",
            ...getColumnSearchProps('poAgainst')

          },
          {
            title: "Indent Number",
            dataIndex: "indentNo",
            width:'200px',
            ...getColumnSearchProps('indentNo')

          },
          {
            title: "Sample Order",
            dataIndex: "sampleReqNo",
            ...getColumnSearchProps('sampleReqNo')

          },
          {
            title: "Item Type",
            dataIndex: "itemType",
            width:'300px',
            sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('itemType')

      
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
              return(record.poQuantity?record.poQuantity+'-'+record.uom:'-')
            }

          },
          {
            title: "Recived Quantity",
            dataIndex: "receivedQuantity",
            // width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.receivedQuantity),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('receivedQuantity')

      
          },
          {
            title: "Rejected Quantity",
            dataIndex: "rejectedQuantity",
            width:'110px',
            // sorter: (a, b) => a.poQuantity.localeCompare(b.rejectedQuantity),
            // sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('rejectedQuantity')
      
          },
          {
            title: "Unit price",
            dataIndex: "unitPrice",
            // width:'110px',
            sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('unitPrice')

      
          },
          {
            title: "Grn Amount",
            dataIndex: "totalPoAmount",
            // width:'110px',
            sorter: (a, b) => a.totalPoAmount.localeCompare(b.totalPoAmount),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('totalPoAmount')
          },
          {
            title: "Location Mapping Status",
            dataIndex: "locationMappedStatus",
            // width:'110px',
            sorter: (a, b) => a.locationMappedStatus.localeCompare(b.locationMappedStatus),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('locationMappedStatus')
          },
        
          {
            title: "Po Status",
            dataIndex: "poStatus",
            // width:'110px',
            sorter: (a, b) => a.poQuantity.localeCompare(b.rejectedQuantity),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps('poStatus')
      
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
                   
        <Card title={'Grn Report'}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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