import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, Descriptions } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PriceListService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import {  ColumnProps, ColumnsType } from 'antd/es/table';
import PriceListForm from './price-list-form';
import { HistoryRequest, NewFilterDto, PriceListActivateDeactivateDto, PriceListDto } from '@project-management-system/shared-models';


export interface PriceListView { }

export const PriceListHistory = (props: PriceListView) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [priceList, setPriceList] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const navigate = useNavigate();
  const [selectedPriceListData, setSelectedPriceListeData] = useState<any>(undefined);
  const priceService = new PriceListService();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [style,setStyle] = useState<any[]>([])
  const [destination,setDestination] = useState<any[]>([]);
  const [year,setYear] = useState<any[]>([]); 
  const [currency,setCurrency] = useState<any[]>([]);
  const [seasonCode,setSeasonCode] = useState<any[]>([]);
  const [fileData, setFileData] = useState<any[]>([])



  useEffect(()=>{
    getPriceList();
    getStyle();
    getDestination();
    getYear();
    getCurrency();
    getSeasonCode();
    getUploadedTime()
  },[])

  const pagination = {
    current: page,
    pageSize: pageSize,
    total: priceList.length,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: (current, pageSize) => {
      setPage(current);
      setPageSize(pageSize);
    },
    showSizeChanger: true,
    onShowSizeChange: (current, size) => {
      setPage(1); // Reset the page to 1 when changing page size
      setPageSize(size);
    },
  };
  const getStyle = () => {
    priceService.getAllStyles().then(res => {
      setStyle(res.data)
    })

}

const getDestination = () => {
  priceService.getAllDestination().then(res => {
    setDestination(res.data)
  })

}
const getYear = () => {
  priceService.getAllYear().then(res => {
    setYear(res.data)
  })

}
const getCurrency = () => {
  priceService.getAllCurrency().then(res => {
    setCurrency(res.data)
  })

}
const getSeasonCode = () => {
  priceService.getAllSeasonCode().then(res => {
    setSeasonCode(res.data)
  })

}

const getUploadedTime = () => {
  priceService.getUploadedTime().then(res => {
    setFileData(res.data)
  })
}

  const getPriceList= () => {
    const req = new HistoryRequest();
    if (form.getFieldValue("sampleCode") !== undefined) {
      req.sampleCode = form.getFieldValue("sampleCode")
    }
    if (form.getFieldValue("business") !== undefined) {
      req.business = form.getFieldValue("business") 
    }
    if (form.getFieldValue("currency") !== undefined) {
      req.currency = form.getFieldValue("currency") 
    }
    if (form.getFieldValue("year") !== undefined) {
      req.year = form.getFieldValue("year")
    }
    if (form.getFieldValue("seasonCode") !== undefined) {
      req.seasonCode = form.getFieldValue("seasonCode") 
    }
    priceService.getPriceHistory(req).then(res => {
      console.log(req,'')
      if (res.status) {
        setPriceList(res.data);
      } else {
        setPriceList([])
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setPriceList([]);
    })
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
})

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    window.location.reload();

  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const onReset = () => {
    form.resetFields();
    getPriceList();
  };

  const getStartIndex = () => (page - 1) * pageSize + 1;

  const columns : any [] = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text, record, index) => getStartIndex() + index,
    },
      {
          title: "Item",
          dataIndex: "item",
          align:"center",
          sorter: (a, b) => a.item.localeCompare(b.item),
          sortDirections: ["descend", "ascend"],
          // ...getColumnSearchProps("style"),
        },
        {
            title: "Style",
            dataIndex: "sample_code",
            align:"center",
            sorter: (a, b) => a.sample_code.localeCompare(b.sample_code),
            sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps("style"),
          },
      
      {
        title: "Destination",
        dataIndex: "business",
        align:"center",
        sorter: (a, b) => a.business.localeCompare(b.business),
        sortDirections: [ "ascend","descend"],
        // ...getColumnSearchProps("destination"),
        
      },{
        title: "Year",
        dataIndex: "year",
        align:"right",
        sorter: (a, b) => a.year - b.year,
        sortDirections: ["descend", "ascend"],
        // ...getColumnSearchProps("year"),
       
      },
      {
        title: "Season Code",
        dataIndex: "season",
        align:"center",
        sorter: (a, b) => a.season.localeCompare(b.season),
        sortDirections: [ "ascend","descend"],
        // ...getColumnSearchProps("seasonCode"),

       
      },
      {
        title: "Price",
        children:[
            {
                title:"Previous",
                dataIndex:"previous_price",
                align:"right",
                render:(text,record) => {
                  return(
                    <>
                    {record.previous_price ? `${record.currency} - ${record.previous_price} ` : '-'}
                    </>
                  )
                }
            },
            {
                title:"Latest",
                dataIndex:"current_price",
                align:"right",
                render:(text,record) => {
                    return(
                      <>
                      {record.current_price ? `${record.currency} - ${record.current_price} ` : '-'}
                      </>
                    )
                  }
            },
        ],
      },
      {
        title: "Variance",
        dataIndex: "price_variance",
        align: "right",
        render: (text) => {
          if (text === undefined || text === null) {
            return "-";
          } else if (text > 0) {
            return (
              <span style={{ color: "green" }}>
                {text} <ArrowUpOutlined style={{ color: "green" }} />
              </span>
            );
          } else if (text < 0) {
            return (
              <span style={{ color: "red" }}>
                {Math.abs(text)} <ArrowDownOutlined style={{ color: "red" }} />
              </span>
            );
          } else {
            return text;
          }
        },
      }
      
     
   
   
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  


  return (
      <>
      <Card title={<span >Price List History</span>}
    //  headStyle={{ border: 0 }} 
    extra={<Link to='/masters/pricelist/price-list-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
     
        <Form form={form} style={{textAlign:'center'}}  layout='vertical' onFinish={getPriceList}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}  style={{ padding: '8px' }}>
            <Form.Item name="sampleCode" label="Style">
              <Select placeholder="Select Style" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {style?.map((e) => {
                  return (
                    <Option key={e.id} value={e.sample_code}>{e.sample_code}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
            <Form.Item name="year" label="Year">
              <Select placeholder="Select Year" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {year?.map((e) => {
                  return (
                    <Option key={e.id} value={e.YEAR}>{e.YEAR}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
            <Form.Item name="business" label="Destination">
              <Select placeholder="Select Destination" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {destination?.map((e) => {
                  return (
                    <Option key={e.id} value={e.business}>{e.business}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
            <Form.Item name="seasonCode" label="Season Code">
              <Select placeholder="Select Destination" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {seasonCode?.map((e) => {
                  return (
                    <Option key={e.id} value={e.season}>{e.season}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }} style={{ marginTop: 20 }}  >
            <Form.Item>
              <Button htmlType="submit" icon={<SearchOutlined />}style={{backgroundColor:'green'}}type="primary">
                Search
              </Button>
              <Button danger htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, position: "relative" }} onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Descriptions>
        <Descriptions.Item label="Uploaded Details">
          <Descriptions column={2}>
            <Descriptions.Item label="Previous File Name">{fileData[1]?.fileName}</Descriptions.Item>
            <Descriptions.Item label="Latest File Name">{fileData[0]?.fileName}</Descriptions.Item>
            <Descriptions.Item label="Previous Date">{fileData[1]?.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Latest Date">{fileData[0]?.createdAt}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
      </Descriptions>
      <Table
      rowKey={record => record}
      columns={columns}
      dataSource={priceList}
      className="custom-table-wrapper"
      pagination={pagination}
      scroll={{x:true}}
      onChange={onChange}
      bordered />
    </Card> </>
      
  );
}


export default PriceListHistory