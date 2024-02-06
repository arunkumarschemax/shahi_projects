import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined, FilePdfOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { ItemTypeEnumDisplay, MenusAndScopesEnum, PoReq, PurchaseStatusEnum, SampleFilterRequest, StockFilterRequest, StocksDto } from '@project-management-system/shared-models';
import { PurchaseOrderservice, StockService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space, Statistic, Table, Tag } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Excel } from 'antd-table-saveas-excel';
import { useIAMClientState } from "../common/iam-client-react";
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps,ColumnType } from 'antd/es/table/interface';
import moment from 'moment';
import { Content } from 'antd/es/layout/layout';
import RolePermission from '../role-permissions';
import AlertMessages from '../common/common-functions/alert-messages';


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
      const checkAccess = (buttonParam) => {  
        const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Reports,MenusAndScopesEnum.SubMenus['Purchase Order Report'],buttonParam)
       
        return accessValue
      }
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
      if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
        req.tab= 'FABRIC'
      }
      if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
        req.tab= 'TRIM'
      }
      if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
        req.tab = undefined
          }
        service.getPodetails(req).then(res => {
          
            if(res.status){
                setData(res.data);
        
            }
            else{
                    AlertMessages.getErrorMessage(res.internalMessage);
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
      title: "Material Type",
      dataIndex: "item_type",
      width: 150,
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text ? text : '-';
      },
      onFilter: (value, record) => {
        // Check if the record's item_type includes the selected material type
        return record.item_type.includes(value);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Checkbox
            checked={selectedKeys.includes('FABRIC')}
            onChange={() => setSelectedKeys(selectedKeys.includes('FABRIC') ? [] : ['FABRIC'])}
          >
            <span style={{ color: 'green' }}>FABRIC</span>
          </Checkbox><br/>
          <Checkbox
            checked={selectedKeys.includes('SEWING_TRIM')}
            onChange={() => setSelectedKeys(selectedKeys.includes('SEWING_TRIM') ? [] : ['SEWING_TRIM'])}
          >
            <span style={{ color: 'red' }}>SEWING TRIM</span>
          </Checkbox><br/>
          <Checkbox
            checked={selectedKeys.includes('PACKING_TRIM')}
            onChange={() => setSelectedKeys(selectedKeys.includes('PACKING_TRIM') ? [] : ['PACKING_TRIM'])}
          >
            <span style={{ color: 'green' }}>PACKING TRIM</span>
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
      filterMultiple: false,
    },
    
    
  {
    title: "Po Against",
    dataIndex: "po_against",
    width: 130,
    render: (po_against, rowData) => (
      <>
        {po_against ? po_against : '-'}
      </>
    ),
    onFilter: (value, record) => record.po_against === value,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
        <Checkbox
          checked={selectedKeys.includes('Indent')}
          onChange={() => setSelectedKeys(selectedKeys.includes('Indent') ? [] : ['Indent'])}
        >
          <span style={{ color: 'green' }}>Indent</span>
        </Checkbox><br/>
        <Checkbox
          checked={selectedKeys.includes('Sample Order')}
          onChange={() => setSelectedKeys(selectedKeys.includes('Sample Order') ? [] : ['Sample Order'])}
        >
          <span style={{ color: 'red' }}>Sample Order</span>
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
    filterMultiple: false,
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
    width:150,
    sorter: (a, b) => a.expected_delivery_date.localeCompare(b.expected_delivery_date),
    sortDirections: ["descend", "ascend"],

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
  sorter: (a, b) => a.purchase_order_date.localeCompare(b.purchase_order_date),
  sortDirections: ["descend", "ascend"],
  render: (_, record) => {
    return record.purchase_order_date
      ? moment(record.purchase_order_date).format("YYYY-MM-DD")
      : "-";
  },
  
},
{
title:"Total Amount",
dataIndex:"total_amount",
width:130,
sorter: (a, b) => a.total_amount.localeCompare(b.total_amount),
sortDirections: ["descend", "ascend"],

},
{
title:"Po Item Status",
dataIndex:"po_item_status",
width:130,
onFilter: (value, record) => {
  // Check if the record's item_type includes the selected material type
  return record.po_item_status.includes(value);
},
filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
    <Checkbox
      checked={selectedKeys.includes('OPEN')}
      onChange={() => setSelectedKeys(selectedKeys.includes('OPEN') ? [] : ['OPEN'])}
    >
      <span style={{ color: 'green' }}>OPEN</span>
    </Checkbox><br/>
    <Checkbox
      checked={selectedKeys.includes('PARTAILLY_RECEIVED')}
      onChange={() => setSelectedKeys(selectedKeys.includes('PARTAILLY_RECEIVED') ? [] : ['PARTAILLY_RECEIVED'])}
    >
      <span style={{ color: 'red' }}>PARTAILLY RECEIVED</span>
    </Checkbox><br/>
    <Checkbox
      checked={selectedKeys.includes('RECEIVED')}
      onChange={() => setSelectedKeys(selectedKeys.includes('RECEIVED') ? [] : ['RECEIVED'])}
    >
      <span style={{ color: 'green' }}>RECEIVED</span>
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
filterMultiple: false,
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
  title: 'Aging',
  dataIndex: 'expected_delivery_date',
  width: '50px',
  fixed: 'right',
  align: 'right',
  render: (text, record) => {
    const daysDifference = moment(record.expected_delivery_date).diff(moment(), 'days');
    
    const age = {
      children: daysDifference,
      props: {
        style: {
          background: daysDifference > 0 ? '#3BC744' : '#FF0000',
          color: 'black',
        },
      },
    };
    
    return age;
  },
},
{
    title:"Status",
    dataIndex:"status",
    fixed:'right',
    width:'100px',
    onFilter: (value, record) => {
      // Check if the record's item_type includes the selected material type
      return record.status.includes(value);
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
        <Checkbox
          checked={selectedKeys.includes('OPEN')}
          onChange={() => setSelectedKeys(selectedKeys.includes('OPEN') ? [] : ['OPEN'])}
        >
          <span style={{ color: 'green' }}>OPEN</span>
        </Checkbox><br/>
        <Checkbox
          checked={selectedKeys.includes('IN_PROGRESS')}
          onChange={() => setSelectedKeys(selectedKeys.includes('IN_PROGRESS') ? [] : ['IN_PROGRESS'])}
        >
          <span style={{ color: 'red' }}>IN PROGRESS</span>
        </Checkbox><br/>
        <Checkbox
          checked={selectedKeys.includes('CANCELLED')}
          onChange={() => setSelectedKeys(selectedKeys.includes('CANCELLED') ? [] : ['CANCELLED'])}
        >
          <span style={{ color: 'green' }}>CANCELLED</span>
          </Checkbox><br/>
        <Checkbox
          checked={selectedKeys.includes('CLOSED')}
          onChange={() => setSelectedKeys(selectedKeys.includes('CLOSED') ? [] : ['CLOSED'])}
        >
          <span style={{ color: 'red' }}>CLOSED</span>
        </Checkbox>        <div className="custom-filter-dropdown-btns">
          <Button onClick={() => clearFilters()} className="custom-reset-button">
            Reset
          </Button>
          <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
            OK
          </Button>
        </div>
      </div>
    ),
    filterMultiple: false,
},
    
]
const excelColumns:any=[
  {
    title: 'S No',
    key: 'sno',
    
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
    onCell: (record: any) => ({
      rowSpan: record.rowSpan,
    }),
  },
    {
        title:"Po No",
        dataIndex:"po_number",
          },
    {
      title: "Material Type",
      dataIndex: "item_type",
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text ? text : '-';
      },
    },
    
    
  {
    title: "Po Against",
    dataIndex: "po_against",
    width: 130,
    render: (po_against, rowData) => (
    
        po_against ? po_against : '-'
    )
  },
  
    {
        title:"Item Code",
        dataIndex:"item_code",
         },
    
          {
      title:"VendorName",
       dataIndex:"vendor_name",
      },
    {
      title:"Currency",
    
      dataIndex: "currency_name-total_amount",
      render: (_, record) => {
        return (
            `${record.currency_name}-${record.total_amount}`
        );
      },
      },
  {
    title:"Expected DeliveryDate",
    dataIndex:"expected_delivery_date",


    render: (_, record) => {
      return record.expected_delivery_date
        ? moment(record.expected_delivery_date).format("YYYY-MM-DD")
        : "-";
    },
},
{
  title:"Purchase OrderDate",
  dataIndex:"purchase_order_date",
 
  render: (_, record) => {
    return record.purchase_order_date
      ? moment(record.purchase_order_date).format("YYYY-MM-DD")
      : "-";
  },
  
},
{
title:"Total Amount",
dataIndex:"total_amount",

},
{
title:"Po Item Status",
dataIndex:"po_item_status",

},

{
title:"Factory",
dataIndex:"factory",


},
{
title:"Tax Name",
dataIndex:"tax_name",

},
{
title:"Po Quantity",
dataIndex:"uom-po_quantity",
// ...getColumnSearchProps("uom")
render: (_, record) => {
  return (
    
      `${record.uom}-${record.po_quantity}`

  );
},

},
{
title:"Grn Quantity",
dataIndex:"uom-grn_quantity",
render: (_, record) => {
  return (
     `${record.uom}-${record.grn_quantity}`
  );
},
width:120


},
{
title:"Request No",
dataIndex:"request_no",


},
  {
    title:"Status",
    dataIndex:"status",
  
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

const sheet = excel.addSheet('Indent-report');
sheet.setRowHeight(50);

sheet.addColumns(excelColumns);

sheet.addDataSource(data, { str2num: true });
excel
.addSheet('Purchase-order-report')
.addColumns(Columns)
.addDataSource(data, { str2num: true })
.saveAs(`Purchase-order-report-${currentDate}.xlsx`);
} else {
const excel = new Excel();
excel
  .addSheet('Purchase-order-report')
  .addColumns(excelColumns)
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
                  <Select.Option key={qc.purchase_order_id} value={qc.purchase_order_id}>
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