import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PriceListService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import {  ColumnProps, ColumnsType } from 'antd/es/table';
import PriceListForm from './price-list-form';
import { NewFilterDto, PriceListActivateDeactivateDto, PriceListDto } from '@project-management-system/shared-models';


export interface PriceListView { }

export const PriceListGrid = (props: PriceListView) => {
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
  const [item,setItem] = useState<any[]>([]);
  const[des,setDes] = useState<any[]>([]);
  const[styCount,setStyCount] = useState<any[]>([]);



  useEffect(()=>{
    getPriceList();
    getStyle();
    getDestination();
    getYear();
    getCurrency();
    getSeasonCode();
    getAllItems();
  },[])

    const pagination = {
      current: page,
      pageSize: 100, // Set the page size to 100 records per page
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
      }
  };
  
  const getStyle = () => {
    priceService.getAllPriceListStyles().then(res => {
      setStyle(res.data)
      setStyCount(res.data?.length)
    })

}

const getDestination = () => {
  priceService.getAllPriceListDestination().then(res => {
    setDestination(res.data)
    setDes(res.data?.length)
    console.log(des, "all items");

  })

}
const getYear = () => {
  priceService.getAllPriceListYear().then(res => {
    setYear(res.data)
  })

}
const getCurrency = () => {
  priceService.getAllPriceListCurrency().then(res => {
    setCurrency(res.data)
  })

}
const getSeasonCode = () => {
  priceService.getAllPriceListSeasonCode().then(res => {
    setSeasonCode(res.data)
  })

}

const getAllItems = () => {
  priceService.getAllPriceListItem().then(res => {
    setItem(res.data?.length)
    console.log()
  });
};


  const getPriceList= () => {
    const req = new NewFilterDto();
     if (form.getFieldValue("sampleCode") !== undefined) {
     req.sampleCode = form.getFieldValue("sampleCode");}
            if (form.getFieldValue("business") !== undefined) {
         req.business = form.getFieldValue("business"); }
         if (form.getFieldValue("currency") !== undefined) {
          req.currency = form.getFieldValue("currency"); }
          if (form.getFieldValue("year") !== undefined) {
            req.year = form.getFieldValue("year"); }
            if (form.getFieldValue("seasonCode") !== undefined) {
              req.seasonCode = form.getFieldValue("seasonCode"); }
    priceService.getAllPriceList(req).then(res => {
      if (res.status) {
        setPriceList(res.data);
      } else
       {
        setPriceList([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setPriceList([]);
    })
  }
 
  const deletePriceList = (values: PriceListDto) => {
    values.isActive = values.isActive? false : true;
    const req = new PriceListActivateDeactivateDto(values.id, values.isActive, values.versionFlag,)
    priceService.ActivateOrDeactivatePriceList(req).then(res => {
      getPriceList()
      message.success(res.internalMessage)

    if(res.status){
   //   message.success(res.internalMessage)
      getPriceList();
      
     // AlertMessages.getErrorMessage(res.internalMessage);

    }else {
      // message.error("Status Not Changed")
    }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }


 
  const updatePriceList = (req: PriceListDto) => {
    req.updatedUser = JSON.parse(localStorage.getItem('username'));
    priceService.updatePriceList(req)
      .then(res => {
        if (res.status) {
          // console.log(res,' after sucessesfully updateed daata')
          AlertMessages.getSuccessMessage('Updated Successfully');
          setDrawerVisible(false);
          getPriceList();
        } else {
          // AlertMessages.getErrorMessage(res.internalMessage);
          message.error("Already this Style & Destination Combination Exist,Please check it once")
        }
      })
      .catch(err => {
        AlertMessages.getErrorMessage(err.message);
      });
  }
  
  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const openFormWithData=(viewData: PriceListDto)=>{
    setDrawerVisible(true);
    setSelectedPriceListeData(viewData);
    // console.log(selectedPriceListData)
    // console.log('selectedOperation')
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
    // window.location.reload();

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
      title: '#',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
    },
    
      {
          title: <div style={{textAlign:"center"}}>Item</div>,
          dataIndex: "item",
          align:"right",
          // sorter: (a, b) => a.item.localeCompare(b.item),
          // sortDirections: ["descend", "ascend"],
           ...getColumnSearchProps("item"),
        },
        {
            title: "Style",
            dataIndex: "sampleCode",
            align:"center",
            // sorter: (a, b) => a.sampleCode.localeCompare(b.sampleCode),
            // sortDirections: ["descend", "ascend"],
            // ...getColumnSearchProps("style"),
          },
      
      {
        title: "Destination",
        dataIndex: "business",
        align:"center",
        // sorter: (a, b) => a.business.localeCompare(b.business),
        // sortDirections: [ "ascend","descend"],
        // ...getColumnSearchProps("destination"),
        
      },{
        title: <div style={{textAlign:"center"}}>Year</div>,
        dataIndex: "year",
        align:"right",
        // sorter: (a, b) => a.year - b.year,
        // sortDirections: ["descend", "ascend"],
        // ...getColumnSearchProps("year"),
       
      },
      {
        title: "Season Code",
        dataIndex: "seasonCode",
        align: "center",
        width: 120,
        filters: [
          {
            text: 'SS',
            value: 'SS', 
          },
          {
            text: 'FF',
            value: 'FF',  
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => {
          return record.seasonCode === value;
        },
       
      }
      ,
      {
        title: "Price",
        dataIndex: "fobLocalCurrency",
        align: "right",
        sorter: (a, b) => a.fobLocalCurrency.localeCompare(b.fobLocalCurrency),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps("currency"),
        render: (text, record) => {
          return (
            <>
              {record.fobLocalCurrency ? `${record.currency}  ${parseFloat(record.fobLocalCurrency).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '-'}
            </>
          );
        }
      },
      
      
      // {
      //   title:"Price",
      //   dataIndex:"fobLocalCurrency",
      //   align:"right",
      //   sorter: (a, b) => a.fobLocalCurrency.localeCompare(b.fobLocalCurrency),
      //   sortDirections: [ "ascend","descend"],
      //    ...getColumnSearchProps("fobLocalCurrency"),
      // },
      // {
      //   title:"Currency",
      //   dataIndex:"currency",
      //   align:"right",
      //   sorter: (a, b) => a.currency.localeCompare(b.currency),
      //   sortDirections: [ "ascend","descend"],
      //    ...getColumnSearchProps("currency"),
      // },
      {
        title: 'Status',
        dataIndex: 'isActive',
        align:"center",
        render: (isActive, rowData) => (
          <>
            {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
          </>
        ),
        filters: [
          {
            text: 'Active',
            value: 1,
          },
          {
            text: 'InActive',
            value: 0,
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => {
          // === is not work
          return record.isActive === value;
        },
  
      },
      
      {
        title:`Action`,
        dataIndex: 'action',
        align:"center",
        render: (text, rowData) => (
          <span>         
              <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                onClick={() => {
                  if (rowData.isActive) {
                    openFormWithData(rowData);
                    console.log(rowData,"rowdata")
                  } else {
                    AlertMessages.getErrorMessage('You Cannot Edit Deactivated PriceList');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />
            
            <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deletePriceList(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate PriceList ?'
                  :  'Are you sure to Activate PriceList ?'
              }
            >
              <Switch  size="default"
                  className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
                  checkedChildren={<RightSquareOutlined type="check" />}
                  unCheckedChildren={<RightSquareOutlined type="close" />}
                  checked={rowData.isActive}
                />
              
            </Popconfirm>
          </span>
        )
      }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  


  return (
      <>
      <Card title={<><span>Price List</span>
      <span style={{marginLeft:'20%'}}>{'No of Styles: ' + styCount}</span>
      <span style={{marginLeft:'20%'}}>{'No of Destination: ' + Number(des)}</span>
      <span style={{marginLeft:'20%'}}>{'No of Item: ' + item}</span>
      </>}
    //  headStyle={{ border: 0 }} 
    extra={<Link to='/masters/pricelist/price-list-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
        
      {/* <Row gutter={40}>
        <Col>
          <Card title={'Total Liscenc Types: ' + style.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={' No of Style: ' + styCount} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#B1D5F8' }}></Card>
        </Col>
        <Col>
          <Card title={'No of Destination: ' + Number(des)} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#B1F8E2' }}></Card>
        </Col>
        <Col>
          <Card title={' No ofItem: ' + item} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#CBB1F8  ' }}></Card>
        </Col>
      </Row>
      <br></br> */}
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
         
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
            <Form.Item name="currency" label="Currency">
              <Select placeholder="Select Currency" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {currency.map((e) => {
                  return (
                    <Option key={e.id} value={e.currency}>{e.currency}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col> */}

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} style={{ marginTop: 20 }}  >
                            <Form.Item>
                                <Button htmlType="submit" icon={<SearchOutlined />}style={{backgroundColor:'green'}}type="primary">SEARCH</Button>
                                    <Button danger
                                    htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, position: "relative" }} onClick={onReset}>RESET
                                </Button>
                            </Form.Item>
                        </Col>
        </Row>
      </Form>
     
      
        <Table
        rowKey={record => record}
          columns={columns}
          dataSource={priceList}
          className="custom-table-wrapper"

          pagination={{
            pageSize: 100, 
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
            }
        }}
        
          scroll={{x:'max-content',y:500}}
          onChange={onChange}
          bordered />
          
    
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <PriceListForm key={Date.now()}
            updateData={updatePriceList}
            isUpdate={true}
            Data={selectedPriceListData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default PriceListGrid

