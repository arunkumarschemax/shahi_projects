import { DownloadOutlined, FilePdfOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { ItemTypeEnumDisplay, PoReq, PurchaseStatusEnum, SampleFilterRequest, StockFilterRequest, StocksDto } from '@project-management-system/shared-models';
import { PurchaseOrderservice, StockService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Statistic, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Excel } from 'antd-table-saveas-excel';
import { useIAMClientState } from "../common/iam-client-react";
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps,ColumnType } from 'antd/es/table/interface';
import moment from 'moment';
import { Content } from 'antd/es/layout/layout';


const PurchaseOrderReport = () => {

    const service = new PurchaseOrderservice
    const [data, setData] = useState<any>([]);
    const [form] = Form.useForm();
    const [itemCode, setItemCode] = useState<any>([]);
    const [itemType, setItemType] = useState<any>([]);
    const [location, setLocation] = useState<any>([]);
    const [plant, setPlant] = useState<any>([]);
    const [ponum, setPonum] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);
    const [key, setKey] = useState();
    const { IAMClientAuthContext } = useIAMClientState();
    const [isBuyer, setIsBuyer] = useState(false);
    const page = 1;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const { RangePicker } = DatePicker;

    

    useEffect(() => {
        getData();
        getPoNum();
      }, []);

    const getData = () => {

      const req= new PoReq()
      if(form.getFieldValue('po_number') !== undefined){
        req.poId=form.getFieldValue('po_number')
  
      }
      if (form.getFieldValue('poDate') !== undefined) {
        req.PoFromDate = (form.getFieldValue('poDate')[0]).format('YYYY-MM-DD')
      }
      if (form.getFieldValue('poDate') !== undefined) {
      req.PoToDate = (form.getFieldValue('poDate')[1]).format('YYYY-MM-DD')
      }
       if (form.getFieldValue('etdDate') !== undefined) {
        req.ETDfromDate = (form.getFieldValue('etdDate')[0]).format('YYYY-MM-DD')
      }
      if (form.getFieldValue('etdDate') !== undefined) {
      req.ETDtoDate = (form.getFieldValue('etdDate')[1]).format('YYYY-MM-DD')
      }
        service.getPodetails(req).then(res => {
          
            if(res){
                setData(res.data);
        
            }
        })
      };

   const getPoNum=()=>{
    service.getPoNum().then((res)=>{
      if(res.status){
        setPonum(res.data)
      }
    })
   } 

  
    const onChange =(key)=>{
      setKey(key)
      
    }
  
 
const handleSearch = (
  selectedKeys: string[],
  confirm: (param?: FilterConfirmProps) => void,
  dataIndex: string
) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters: () => void) => {
  clearFilters();
  setSearchText("");
};

const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() =>{
            handleReset(clearFilters)
            setSearchedColumn(dataIndex)
            confirm({closeDropdown:true})
          }
             }
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
       
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex] ?record[dataIndex]     
       .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()):false,
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});

const Columns:any=[
  {
    title: 'S No',
    key: 'sno',
    width: '70px',
    style: { background: 'red' },
    responsive: ['sm'],
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
    onCell: (record: any) => ({
      rowSpan: record.rowSpan,
    }),
    fixed: 'left',
  },
    {
        title:"Po No",
        dataIndex:"po_number",
        width:130,
        fixed:'left',
        sorter: (a, b) => a.po_number.localeCompare(b.po_number),
        sortDirections: ["descend", "ascend"],


        
    },
    {
      title:"Material Type",
      dataIndex:"po_material_type",
      width:100,
      ...getColumnSearchProps("po_material_type"),
      
      
  },
    {
        title:"Po Against",
        dataIndex:"po_against",
        width:130,
        filters: [
          // {
          //   text: 'Area',
          //   value: 'Area',
          // },
          {
            text: 'Indent',
            value: 'Indent',
          },
          {
            text: 'sample order',
            value: 'sample order',
          },
         
        ],
        onFilter: (value,record) =>{ return record.po_against === value}

    },
    {
        title:"Item Code",
        dataIndex:"item_code",
        width:270,
        sorter: (a, b) => a.item_code.localeCompare(b.item_code),
        sortDirections: ["descend", "ascend"],

        
    },
    
          {
      title:"VendorName",
       dataIndex:"vendor_name",
       ...getColumnSearchProps("vendor_name"),
       width:150

         },
    {
      title:"Currency",
    
      dataIndex: "currency_name-total_amount",
      render: (_, record) => {
        return (
          <span>
            {record.currency_name}-{record.total_amount}
          </span>
        );
      },
      // ...getColumnSearchProps("currency_name-total_amount"),
      width:100

  },
  {
    title:"Expected DeliveryDate",
    dataIndex:"expected_delivery_date",
    width:150
,
    render: (_, record) => {
      return record.expected_delivery_date
        ? moment(record.expected_delivery_date).format("YYYY-MM-DD")
        : "-";
    },
},
{
  title:"Purchase OrderDate",
  dataIndex:"purchase_order_date",
  width:130,

  render: (_, record) => {
    return record.purchase_order_date
      ? moment(record.purchase_order_date).format("YYYY-MM-DD")
      : "-";
  },
  
},
{
title:"Total Amount",
dataIndex:"total_amount",
width:130

},
{
title:"Po Item Status",
dataIndex:"po_item_status",
width:130

},

{
title:"Factory",
dataIndex:"factory",
...getColumnSearchProps("factory"),
width:100

},
{
title:"Tax Name",
dataIndex:"tax_name",
...getColumnSearchProps("tax_name"),
width:100


},
{
title:"Po Quantity",
dataIndex:"uom-po_quantity",
// ...getColumnSearchProps("uom")
render: (_, record) => {
  return (
    <span>
      {record.uom}-{record.po_quantity}
    </span>
  );
},
width:120


},
// {
// title:"Po Quantity",
// dataIndex:"po_quantity",
// width:100

// },
{
title:"Grn Quantity",
dataIndex:"uom-grn_quantity",
render: (_, record) => {
  return (
    <span>
      {record.uom}-{record.grn_quantity}
    </span>
  );
},
width:120


},
{
title:"Request No",
dataIndex:"request_no",
width:170


},
  {
    title:"Status",
    dataIndex:"status"
    
},
    
]
const exportExcel = () => {
  const currentDate = new Date()
  .toISOString()
  .slice(0, 10)
  .split("-")
  .join("/");

if (key === 'pop'){
const excel = new Excel();
excel
.addSheet('Purchase-order-report')
.addColumns(Columns)
.addDataSource(data, { str2num: true })
.saveAs(`Purchase-order-report-${currentDate}.xlsx`);
} else {
const excel = new Excel();
excel
  .addSheet('Purchase-order-report')
  .addColumns(Columns)
  .addDataSource(data, { str2num: true })
  .saveAs(`Purchase-order-report-${currentDate}.xlsx`);
}

}

const onFinish = () => {
  getData()
  };

  const onReset = () => {
    form.resetFields();
    getData();
  };
  return (
    <div>
        <Card  title={<span>Purchase Order Report</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={
          <div>
            <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
              GET EXCEL
            </Button>
            {/* <Button icon={<FilePdfOutlined  />} onClick={() => { handleExportPDF(); }}>
              Download PDF
            </Button> */}
          </div>
        }
  
        >
        <Form form={form} 
        onFinish={onFinish}
        >
        <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="po_number" label="Po No">
              <Select
                showSearch
                placeholder="Select Po No"
                optionFilterProp="children"
                allowClear
              >
                {ponum.map((qc: any) => (
                  <Select.Option key={qc.po_number} value={qc.po_number}>
                    {qc.po_number}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="fabricCode" label="Fabric Code">
              <Select
                showSearch
                placeholder="Select Fabric Code"
                optionFilterProp="children"
                allowClear
              >
                {itemCode.map((qc: any) => (
                  <Select.Option key={qc.fabricCode} value={qc.fabricCode}>
                    {qc.fabricCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="trimCode" label="Trim Code">
              <Select
                showSearch
                placeholder="Select Trim Code"
                optionFilterProp="children"
                allowClear
              >
                {itemType.map((qc: any) => (
                  <Select.Option key={qc.trimCode} value={qc.trimCode}>
                    {qc.trimCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col> */}
         
         <Col span={6}>
            <Form.Item label="Po Date" name="poDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Expected Date	" name="etdDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
          </Row>
          </Form> 
          <Row  justify={'space-evenly'}>
         
            <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 3 }}>
            <Card  size="small" title={'OPEN :' + data.filter(r => r.status == PurchaseStatusEnum.OPEN).length} style={{ height: '35px', width: 150, backgroundColor: '#d4e09b', borderRadius: 3 }}></Card>
            
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 3 }}>
            <Card size="small" title={'INPROGRESS  : ' + data.filter(r => r.status === PurchaseStatusEnum.INPROGRESS).length} style={{ height: '35px', width: 150, marginBottom: '8', backgroundColor: '#f6f4d2', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CLOSED : ' + data.filter(r => r.status === PurchaseStatusEnum.CLOSED).length} style={{ height: '35px', width: 150, backgroundColor: '#cbdfbd', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CANCLED : ' + data.filter(r => r.status === PurchaseStatusEnum.CANCELLED).length} style={{ height: '35px', backgroundColor: '#ffd6ba', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
             
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}><Card style={{textAlign: 'left', width: 150, height: '35px',  backgroundColor: '#A4A3A4'}}
              title={"Total Pos:"+ponum.length}>
              </Card> </Col>
          </Row><br></br>
        <Card >
        <Table columns={Columns}  
                  size="small"
        pagination={{pageSize:50}}
        dataSource={data}
        scroll={{ x:'max-content', y: 500}} 
        className="custom-table-wrapper"
            /> 
        </Card>
        </Card>
    </div>
  )
}

export default PurchaseOrderReport