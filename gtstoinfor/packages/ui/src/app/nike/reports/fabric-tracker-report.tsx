import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { PpmDateFilterRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import moment from "moment";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

export function FabricTrackerReport() {
  const [gridData, setGridData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const service = new NikeService();
  const [item, setItem] = useState<any>([]);
  const [factory, setFactory] = useState<any>([]);
  const [colorDesc, setColorDesc] = useState<any>([]);
  const [styleNumber,setStyleNumber]=useState<any>([]);
  const [productCode, setProductCode]=useState<any>([]);
  const { Option } = Select;
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);



  useEffect(() => {
    getData();
    getProductCode();
    getColorDesc();
    getItem();
    getFactory();
    getStyleNumber(); 

  }, [])

  const getProductCode = () => {
    service.getFabricTrackerForProductCode().then(res => {
      setProductCode(res.data)
    })
  }
  const getColorDesc = () =>{
    service.getFabricTrackerForColorDesc().then(res => {
      setColorDesc(res.data)
    })
  }
  const getFactory = () => {
    service.getFabricTrackerForFactory().then(res=>{
      setFactory(res.data)
    })
  }
  const getStyleNumber = () =>{
    service.getFabricTrackerForStyleNumber().then(res => {
      setStyleNumber(res.data)
    })
  }
  const getItem = () => {
    service.getFabricTrackerForItem().then(res =>{
      setItem(res.data)
    })
  }

  const getData = () => {
    const req = new PpmDateFilterRequest();

    if (form.getFieldValue('productCode') !== undefined) {
      req.productCode = form.getFieldValue('productCode');
    } 
    if (form.getFieldValue('colorDesc') !== undefined) {
      req.colorDesc = form.getFieldValue('colorDesc');
    }
    if (form.getFieldValue('item') !== undefined) {
      req.item = form.getFieldValue('item');
    }
    if (form.getFieldValue('factory') !== undefined) {
      req.factory = form.getFieldValue('factory');
    }
    if(form.getFieldValue('styleNumber') !== undefined) {
      req.styleNumber=form.getFieldValue('styleNumber')
    } 


    service.getFabricTrackerReport(req).then(res => {
      if (res.status) {
        setGridData(res.data)
        // setFilterData(res.data)
        setFilteredData(res.data)
      }
    }).catch(err => {
      console.log(err.message)
    })
  }
  console.log(gridData, "--------")
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const handleExport = (e: any) => {
    e.preventDefault();


    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

    let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
      { title: 'Item', dataIndex: 'item' },
      { title: 'Factory', dataIndex: 'factory' },
      { title: 'PCD', dataIndex: '' },
      { title: 'Document Date', dataIndex: 'DocumentDate' },
      { title: 'Purchase Order Number', dataIndex: 'poNumber' },
      { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
      { title: "Planning Season Code", dataIndex: 'planningSeasonCode' },
      { title: "Planning Season Year", dataIndex: 'planningSeasonYear' },
      { title: "Style Number", dataIndex: 'styleNumber' },
      { title: "Product Code", dataIndex: 'productCode' },
      { title: 'Colour Description', dataIndex: 'colorDesc' },
      { title: "Nike Fabric IM Code", dataIndex: '' },
      { title: "CRM Fabric Code", dataIndex: '' },
      { title: "Fabric Component Type", dataIndex: '' },
      { title: "FABRIC QUALITY DESCRIPTION", dataIndex: '' },
      { title: "Fabric Width", dataIndex: '' },
      { title: "MILL", dataIndex: '' },
      { title: "MRGAC", dataIndex: 'mrgac' },
      { title: "OGAC", dataIndex: 'ogac' },
      { title: "GAC", dataIndex: 'gac' },
      { title: "Consumption", dataIndex: '' },
      { title: "Wastage%", dataIndex: '' },
      { title: "Shipping Type", dataIndex: 'shippingType' },
      { title: "Total Item Quantity", dataIndex: 'totalItemQty' },
      { title: "Total Required Fabric Quantity", dataIndex: '' },
      { title: "Total Inhoused Qty", dataIndex: '' },
      { title: "Total Inhoused%", dataIndex: '' },
      { title: "balance to Inhouse", dataIndex: '' },
      { title: "balance to Inhouse%", dataIndex: '' },
      { title: "MRP plan Required Inhouse date", dataIndex: 'mrpPlanRequiredInhouseQty' },
      { title: "MRP plan Required Inhouse QTY", dataIndex: '' },
      { title: "Actual Inhouse against MRP", dataIndex: '' },
      { title: "balance to Inhouse Against MRP Plan", dataIndex: '' }

    ]


    const excel = new Excel();
    excel.addSheet("Sheet1");
    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(gridData);
    excel.saveAs(`fabric-tracker-report-${currentDate}.xlsx`);
  }
  const onReset = () => {
    form.resetFields()
    getData()
  }


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

  });

    const columns: any = [
        {
            title: "S no",
            render: (_text: any, record: any, index: number) => <span>{index + 1}</span>,
            align:'center',width:50
          },
          {
            title: 'Item',
            dataIndex: 'item',
            width:70
           
          },
          {
            title: 'Factory',
            dataIndex: 'factory',   
            width:70
      
          },
          {
            title: 'Document Date',
            dataIndex: 'documentDate',            width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 
            // render: (text, record) => {
            //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
            // }
          },
          {
            title: 'Purchase Order Number',
            dataIndex: 'poNumber',width:70,
          },
          {
            title: 'PO Line Item Number',
            dataIndex: 'poLineItemNumber',width:70,
          },
      
          {
      
            title: "Planning Season Code",
            dataIndex: 'planningSeasonCode', width:70, 
          },
          {
            title:"Planning Season Year",
            dataIndex:'planningSeasonYear',width:70,
          },
          {
            title: 'Style Number',
            dataIndex: 'styleNumber',width:70,
      
          },
          {
            title: 'Product Code',
            dataIndex: 'productCode',width:70,
            sorter: (a, b) => a.productCode.length - b.productCode.length,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('productCode'),
      
      
          },
          {
            title: 'Colour Description',
            dataIndex: 'colorDesc',width:60,
          },
          {
            title:"MRGAC",
            dataIndex:'MRGAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 
            // render: (text, record) => {
            //   if (!text || text.trim() === '') {
            //     return '-';
            //   } else {
            //     return text;
            //   }
            //},

          },
          {
            title:"OGAC",
            dataIndex:'OGAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 

          },
          {
            title:"GAC",
            dataIndex:'GAC',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY') 

    },
    {
      title: "Shipping Type",
      dataIndex: 'shipmentType',width:70,

          },
          {
            title: 'Total Item Qty',
            dataIndex: 'totalItemQty',width:70,
            align:'right',
            render:(text, record) =>
              <span>{Number(record.totalItemQty).toLocaleString()}</span>
            
          },


          {
            title: 'MRP plan Required Inhouse QTY',
            dataIndex: 'mrpPlanRequiredInhouseQty', 
            width:120,
          }, 
    ]

  return (
    <>
      <Card title="FabricTrackerReport" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={filteredData.length > 0 ? <Button
          type="default"
          style={{ color: 'green' }}
          onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button> : null}>
        <Form 
         onFinish={getData}
         form={form}
         layout='vertical'>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{ padding: '20px' }}>
              <Form.Item name='productCode' label='Product Code' >
                <Select
                  showSearch
                  placeholder="Select Product Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {productCode.map((inc: any) => {
                    return <Option key={inc.id} value={inc.product_code}>{inc.product_code}</Option>
                  })
                  }
                  
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{ padding: '20px' }}>
              <Form.Item name='styleNumber' label='Style Number' >
                <Select
                  showSearch
                  placeholder="Select Style Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {styleNumber.map((inc: any) => {
                    return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='colorDesc' label='Color Description' >
                <Select
                  showSearch
                  dropdownMatchSelectWidth={false}
                  placeholder="Select Color Description"
                  optionFilterProp="children"
                  allowClear
                >
                  {colorDesc.map((inc: any) => {
                    return <Option key={inc.id} value={inc.color_desc}>{inc.color_desc}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{ padding: '20px' }} >
              <Form.Item name='item' label='Item' >
                <Select
                  showSearch
                  placeholder="Select Item"
                  optionFilterProp="children"
                  allowClear
                >
                  {item.map((inc: any) => {
                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} style={{ padding: '15px' }} >
              <Form.Item name='factory' label='Factory' >
                <Select
                  showSearch
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  allowClear
                >
                  {factory.map((inc: any) => {
                    return <Option key={inc.id} value={inc.factory}>{inc.factory}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{ padding: '25px' }} >
              <Form.Item>
                <Button htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary">Get Report</Button>
                <Button
                  htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={onReset}
                >
                  RESET
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={gridData}
          pagination={{
            pageSize:50,

            onChange(current, pageSize) {
              setPage(current);
              setPageSize(pageSize);
            }
          }}
          className="custom-table-wrapper"
          scroll={{ x: 'max-content' ,y:600 }}
          bordered
        ></Table>
      </Card>
    </>
  )
}
export default FabricTrackerReport;