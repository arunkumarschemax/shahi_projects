import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message } from 'antd';
import moment from 'moment';
// import NikeService from 'packages/libs/shared-services/src/common/nike-service';
import RangePicker from 'rc-picker/lib/RangePicker';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';

const PPMReport = () => {
  const [ppm, setPPM] = useState([]);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState(''); 
  const [gridData, setGridData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const service = new NikeService(); 



  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    service.getPPMData().then(res => {
      if (res.status) {
        setGridData(res.data)
        setFilteredData(res.data)
      }
    }).catch(err => {
      console.log(err.message)
    })
  }

 console.log(gridData, 'ggggggggggggg')
    
     const totalItemQty = gridData?.map(i => i.totalItemQty)
     const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

     console.log(count, 'countttttt')


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
      console.log(value)
      const fromDate = value[0].format('YYYY-MM-DD');
      const toDate = value[1].format('YYYY-MM-DD');
      setSelectedEstimatedFromDate(fromDate)
      setSelectedEstimatedToDate(toDate)
    }
  }
  const getFilterdData = () => {
    let orderStatus = form.getFieldValue('orderStatus');
    let startDate = selectedEstimatedFromDate;
    let endDate = selectedEstimatedToDate;
    let filteredData = gridData;
    if (orderStatus) {
      filteredData = filteredData.filter(record => record.order_status === orderStatus);
      if (filteredData.length === 0) {
        message.error("No Data Found")
      }
      setFilteredData(filteredData);
    }
    if (startDate && endDate) {
      filteredData = filteredData.filter(record => moment(record.last_update_date).format('YYYY-MM-DD') >= startDate && moment(record.last_update_date).format('YYYY-MM-DD') <= endDate);
      if (filteredData.length === 0) {
        message.error("No Data Found")
      }
      setFilteredData(filteredData);
    }
  }

  
  const onReset = () => {
    form.resetFields();
    setSelectedEstimatedFromDate(undefined);
    setSelectedEstimatedToDate(undefined);
    getData();
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

  const Columns: any = [

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
      dataIndex: 'Item',
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('supplierName'),

    },
    {
      title: 'Total Item Qty',
      dataIndex: 'totalItemQty'
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
  ]

  return (
    <>
      <Card title="PPM Report" headStyle={{ color: 'black', fontWeight: 'bold', backgroundColor: "skyblue" }}
        extra={filteredData.length > 0 ? (<Button
          type="default"
          style={{ color: 'green' }}
          // onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
        <Form

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
                  allowClear>
                  <Option value="Accepted">ACCEPTED</Option>
                  <Option value="Unaccepted">UNACCEPTED</Option>
                  <Option value="Cancelled">CANCELLED</Option>
                  <Option value="Closed">CLOSED</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 40 }} >
              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{ marginRight: 50, width: 80 }}
                htmlType="button"
                onClick={getFilterdData}>Search</Button>
              <Button
                type="primary"
                icon={<UndoOutlined />}
                htmlType="submit"
                onClick={onReset}>Reset</Button>
            </Col>
          </Row>
        </Form>

        <Row gutter={80}>
          <Col >
            <Card title={'Total order Qty: ' + count} style={{ textAlign: 'left', width: 200, height: 40, backgroundColor: 'orange' }}></Card>
          </Col>
          <Col>
            <Card title={'Total Shipped: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'orange' }}></Card>
          </Col>
          <Col>
            <Card title={'Balance to ship: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'orange' }}></Card>
          </Col>

        </Row><br></br>
        <Row gutter={80}>
          <Col >
            <Card title={'Total Po Count: ' + gridData.length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: ' lightgreen' }}></Card>
          </Col>
          <Col>
            <Card title={'Accepted Po Count: ' + gridData.filter(el => el.DPOMLineItemStatus== 'Accepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightgreen' }}></Card>
          </Col>
          <Col>
            <Card title={'UnAccepted Po :' + gridData.filter(el => el.DPOMLineItemStatus == 'Unaccepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightgreen' }}></Card>
          </Col>
          <Col>
            <Card title={'Closed Po:' + gridData.filter(el => el.DPOMLineItemStatus == 'Closed').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightgreen' }}></Card>
          </Col>
          <Col>
            <Card title={'Cancelled: ' + gridData.filter(el => el.DPOMLineItemStatus == 'Cancelled').length} style={{ textAlign: 'left', width: 190, height: 41, backgroundColor: 'lightgreen' }}></Card>
          </Col>

        </Row><br></br>
        <div>

          <Table columns={Columns} dataSource={gridData}
            bordered
          />

        </div>
      </Card>
    </>
  )
}

export default PPMReport;
