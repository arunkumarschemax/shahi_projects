import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { MarketingModel } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import RangePicker from 'rc-picker/lib/RangePicker';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';


const OPTIONS = ['ACCEPTED', 'UNACCEPTED', 'CANCELLED', 'CLOSED'];




const PPMReport = () => {
  const [ppm, setPPM] = useState([]);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [gridData, setGridData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const service = new NikeService();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterData, setFilterData] = useState<any>([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1)


  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    service.getPPMData().then(res => {
      if (res.status) {
        setGridData(res.data)
        setFilterData(res.data)
        setFilteredData(res.data)
      }
    }).catch(err => {
      console.log(err.message)
    })
  }
  const handleExport = (e: any) => {
    e.preventDefault();


    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

    let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
      { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}` },
      { title: 'Last Modified Date', dataIndex: 'lastModifiedDate' },
      { title: 'Item', dataIndex: 'Item' },
      { title: 'Total Item Qty', dataIndex: 'totalItemQty' },
      { title: 'Factory', dataIndex: 'Factory' },
      { title: 'PCD', dataIndex: '' },
      { title: 'Document Date', dataIndex: 'documentDate' },
      { title: 'Purchase Order Number', dataIndex: 'purchase Order Number' },
      { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
      { title: 'Trading Co PO Number', dataIndex: '' },
      { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
      { title: 'Doc Type', dataIndex: '' },
      { title: 'Doc Type Description', dataIndex: 'colorDesc' },
      { title: 'Style Number', dataIndex: 'styleNumber' },
      { title: 'Product Code', dataIndex: 'productCode' },
      { title: 'Colour Description', dataIndex: 'colorDesc' },
      { title: 'Planning Season Code', dataIndex: '' },
      { title: 'Planning Season Year', dataIndex: '' },
      { title: 'Co', dataIndex: '' },
      { title: 'CO Final Approval Date', dataIndex: '' },
      { title: 'Plan No', dataIndex: '' },
      { title: 'Lead Time', dataIndex: '' },
      { title: 'Category', dataIndex: '' },
      { title: 'Category Description', dataIndex: '' },
      { title: 'Vendor Code', dataIndex: '' },
      { title: 'Global Category Core Focus', dataIndex: '' },
      { title: 'Global Category Core Focus Description', dataIndex: '' },
      { title: 'Gender Age', dataIndex: '' },
      { title: 'Gender Age Description', dataIndex: '' },
      { title: 'Destination Country Code', dataIndex: '' },
      { title: 'Destination Country Name', dataIndex: '' },
      { title: 'Plant Code', dataIndex: '' },
      { title: 'plant Name', dataIndex: '' },
      { title: 'UPS', dataIndex: '' },
      { title: 'Sales Order Number', dataIndex: '' },
      { title: 'Sales Order Item Number', dataIndex: '' },
      { title: 'Customer PO', dataIndex: '' },
      { title: 'Ship To Customer Number', dataIndex: '' },
      { title: 'Ship To Customer Name', dataIndex: '' },
      { title: 'Ship to Address Legal PO', dataIndex: '' },
      { title: 'Ship to Address DIA', dataIndex: '' },
      { title: 'Diff of Ship to Address', dataIndex: '' },
      { title: 'CAB Code', dataIndex: '' },
      { title: 'MRGAC', dataIndex: '' },
      { title: 'OGAC', dataIndex: '' },
      { title: 'GAC', dataIndex: '' },
      { title: 'Truck Out Date', dataIndex: '' },
      { title: 'Origin Receipt Date', dataIndex: '' },
      { title: 'Factory Delivery Actual Date', dataIndex: '' }, { title: 'GAC Reason Description', dataIndex: '' },
      { title: 'GAC Reason Code', dataIndex: '' },
      { title: 'Shipping Type', dataIndex: '' },
      { title: 'Planning Priority Number', dataIndex: '' },
      { title: 'Planning Priority Description', dataIndex: '' },
      { title: 'Launch Code', dataIndex: '' },
      { title: 'Mode of Transportation', dataIndex: '' },
      { title: 'In Co Terms', dataIndex: '' },
      { title: 'Inventory Segment Code', dataIndex: '' },
      { title: 'Purchase Group', dataIndex: '' },
      { title: 'Purchase Group Name', dataIndex: '' },
      { title: 'Total Item Quantity', dataIndex: '' },
      { title: 'Gross Price/FOB ', dataIndex: '' },
      { title: 'Net including discounts', dataIndex: '' },
      { title: 'Trading Co Net including discounts', dataIndex: '' },
      { title: 'Legal PO Price', dataIndex: '' },
      { title: 'CO Price', dataIndex: '' },
      { title: 'Actual Shipped Qty', dataIndex: '' },
      { title: 'VAS - Size', dataIndex: '' },
      { title: 'Item Vas Text', dataIndex: '' },
      { title: 'Item Vas Text in PDF PO', dataIndex: '' },
      { title: 'Diff of Item Vas Text', dataIndex: '' },
      { title: 'Item Text', dataIndex: '' },


    ]


    const excel = new Excel();
    excel.addSheet("Sheet1");
    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(gridData);
    excel.saveAs(`ppm-report-${currentDate}.xlsx`);
  }

  const totalItemQty = gridData?.map(i => i.totalItemQty)
  const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

  function convertToYYYYMMDD(inputDate) {
    const formatsToTry = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'YYYY-MM-DD'];
    let formattedDate = null;
    for (const format of formatsToTry) {
      const parsedDate = moment(inputDate, format);
      if (parsedDate.isValid()) {
        formattedDate = parsedDate.format('YYYY-MM-DD');
        break;
      }
    }
    return formattedDate;
  }

  const { RangePicker } = DatePicker;
  const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
  const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
  const { Option } = Select;


  const EstimatedETDDate = (value) => {
    if (value) {
      const fromDate = value[0].format('YYYY-MM-DD');
      const toDate = value[1].format('YYYY-MM-DD');
      setSelectedEstimatedFromDate(fromDate)
      setSelectedEstimatedToDate(toDate)
    }
  }

  const Finish = (values: any) => {
    if (!values.DPOMLineItemStatus || values.DPOMLineItemStatus.length === 0) {
      setFilterData(gridData);
    } else {
      const filteredData = gridData.filter(item =>
        values.DPOMLineItemStatus.includes(item.DPOMLineItemStatus)
      );
      setFilterData(filteredData);
    }
  };
  

  const onReset = () => {
    form.resetFields()
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
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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


  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const getSizeWiseHeaders = (data: MarketingModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
        sizeHeaders.add('' + version.sizeDescription);
    }))
    return Array.from(sizeHeaders);
};
const getMap = (data: MarketingModel[]) => {
    const sizeWiseMap = new Map<string, Map<string, number>>();
    data?.forEach(rec => {
        if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
            sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
        }
        rec.sizeWiseData?.forEach(version => {
            sizeWiseMap.get(rec.purchaseOrderNumber).set(' ' + version.sizeDescription, version.sizeQty);
        })
    });
    return sizeWiseMap;
}

  const renderReport =(data:MarketingModel[])=>{
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);

  const columns: ColumnsType<any>= [
    {
      title: "S.No",
      render: (_text: any, record: any, index: number) => <span>{index + 1}</span>

    },

    {

      title: "Po+Line",
      dataIndex: 'Po+Line',
      render: (text, record) => `${record.purchaseOrderNumber} - ${record.poLineItemNumber}`


    },
    {
      title: 'Last Modified Date',
      dataIndex: 'updatedAt',
      render: (text) => moment(text).format('YYYY-MM-DD')

    },
    {
      title: 'Item',
      dataIndex: 'item',
      // sorter: (a, b) => a.Item.length - b.Item.length,
      // sortDirections: ['descend', 'ascend'],
      // ...getColumnSearchProps('Item'),

    },
    {
      title: 'Factory',
      dataIndex: 'Factory',

    },
    {
      title: 'Document Date',
      dataIndex: 'documentDate',
      // render: (text, record) => {
      //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
      // }
    },
    {
      title: 'Purchase Order Number',
      dataIndex: 'purchaseOrderNumber',
    },
    {
      title: 'PO Line Item Number',
      dataIndex: 'poLineItemNumber'
    },
    {
      title: 'DPOM Line Item Status',
      dataIndex: 'DPOMLineItemStatus'
    },
    {
      title: 'Style Number',
      dataIndex: 'styleNumber',

    },
    {
      title: 'Product Code',
      dataIndex: 'productCode',

    },
    {
      title: 'Colour Description',
      dataIndex: 'colorDesc'
    },
    {
      title: 'Total Item Qty',
      dataIndex: 'totalItemQty',
      align:'center',
      render: (text) => <strong>{text}</strong>
  },
  ]
  sizeHeaders?.forEach(version => {
    columns.push({
        title: version,
        dataIndex: version, 
        key: version,
        width: 130,
        align: 'right',
        render: (text, record) => {
            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
            if (sizeData) {
                return sizeData.sizeQty !== null ? Number(sizeData.sizeQty).toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                }) : '-';
            } else {
                return '-';
            }
        }
    });
 })

 
    return (<Table columns={columns} dataSource={filterData} pagination={{
        onChange(current, pageSize) {
            setPage(current);
            setPageSize(pageSize)}
    }}scroll={{ x: 'max-content' }} />)

}

  return (
    <>
      <Card title="PPM Marketing Report" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={filteredData.length > 0 ? (<Button
          type="default"
          style={{ color: 'green' }}
          onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
        <Form
           onFinish={Finish}
          form={form}
          layout='vertical'>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
              <Form.Item label="PPM Report Date" name="fromDate">
                <RangePicker onChange={EstimatedETDDate} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
              <Form.Item name="DPOMLineItemStatus" label="PPM Status">
                <Select
                  showSearch
                  placeholder="Select PPM Status"
                  optionFilterProp="children"
                  allowClear mode='multiple'>
                  <Option value="Accepted">ACCEPTED</Option>
                  <Option value="Unaccepted">UNACCEPTED</Option>
                  <Option value="Cancelled">CANCELLED</Option>
                  <Option value="Closed">CLOSED</Option>
                </Select>
                {/* <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{ width: '100%' }}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                /> */}
                
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 40 }} >
              <Form.Item>
                <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>Search</Button>
                <Button style={{marginLeft:8}}  htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined/>}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Row gutter={80}>
          <Col >
            <Card title={'Total order Qty: ' + count} style={{ textAlign: 'left', width: 200, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Total Shipped: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Balance to ship: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>

        </Row><br></br>
        <Row gutter={80}>
          <Col >
            <Card title={'Total Po Count: ' + gridData.length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Accepted Po Count: ' + gridData.filter(el => el.DPOMLineItemStatus == 'Accepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'UnAccepted Po :' + gridData.filter(el => el.DPOMLineItemStatus == 'Unaccepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Closed Po:' + gridData.filter(el => el.DPOMLineItemStatus == 'Closed').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Cancelled Po: ' + gridData.filter(el => el.DPOMLineItemStatus == 'Cancelled').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>

        </Row><br></br>
        <div>

          {/* <Table columns={Columns} 
          // dataSource={gridData}
           dataSource={filterData}
            bordered
          /> */}

        </div>
        {renderReport(filterData)}
      </Card>
    </>
  )
}

export default PPMReport;
