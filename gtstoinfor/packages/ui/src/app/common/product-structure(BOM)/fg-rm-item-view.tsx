import { ItemCreationService, ProductStructureService, RmCreationService } from "@project-management-system/shared-services"
import React, { useState, useEffect, useRef } from 'react';
import { Table, Card,  Input, Button, Form, Row, Col, Select, Space, message,} from 'antd';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   FeatureService } from '@project-management-system/shared-services';
import AlertMessages from "../common-functions/alert-messages";
import { RmMappingFilterRequest } from "@project-management-system/shared-models";


const FgRmItemBomView   = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fgservice = new ItemCreationService()
  const Rmservice = new RmCreationService()
  const productstructureservice = new ProductStructureService()

  const { Option } = Select;
  const [fgCode, setFgCode] = useState<any[]>([])
  const [RmCode, setRMCode] = useState<any[]>([])

  useEffect(() => {
    getAllRmSkuData();
    RmCodeData();
    getFgItemsDropdown();
  }, [])
  

    const getAllRmSkuData= () => {
        const req = new RmMappingFilterRequest();
        
        if (form.getFieldValue('rmItcode') !== undefined) {
            req.rmItemCode = form.getFieldValue('rmItcode');
        }
        if (form.getFieldValue('fgItemCode') !== undefined) {
            req.fgItemCode = form.getFieldValue('fgItemCode');
        }
      
        productstructureservice.getRmMapped(req).then(res => {
      if (res.status) {
        setLTData(res.data);
        message.success(res.internalMessage)

      } else
       {
        message.error(res.internalMessage)

        setLTData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setLTData([]);
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
            onFilterDropdownOpenChange: open => {
              if (open) {
                  setTimeout(() => searchInput.current.select());
              }
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
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const resetHandler = () => {
    form.resetFields();
    getAllRmSkuData();

}

const getFgItemsDropdown = () =>{
    fgservice.getFgItemsDropdown().then(res=>{
      if(res.status){
        setFgCode(res.data)
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    })

  }
const RmCodeData = () =>{
    Rmservice.getRmItemsData().then((res)=>{
        if(res.status){
            setRMCode(res.data)
        }
    })
}



const columns: any = [
  {
    title: 'S No',
    key: 'sno',
    width: 50,
    responsive: ['sm'],
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
    align: 'center',
    fixed:'left'

  },
  {
    title: "FG Item Code",
    dataIndex: "fg_item_code",
    key: "fg_item_code",
    align: 'center',
    width: 90,
    fixed:'left'
  },
  {
    title: "FG Item Name",
    dataIndex: "item_name",
    key: "item_name",
    align: 'center',
    width: 90,
  },
  {
    title: "Product Group",
    dataIndex: "productGroup",
    width: 90,
    key: "productGroup",
    align: 'center',
  },
  {
    title: "Style",
    dataIndex: "style_no",
    key: "style_no",
    align: 'center',
    width: 90,
  },
  
  {
    title: <div style={{ textAlign: 'center' }}>RM Codes</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 120,
    render: (rmItems) => {
      const rmItemCodes = rmItems.map((item, index) => (
        <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
          {item.rm_item_code || '-'}
        </div>
      ));
      return <div style={{ display: 'flex', flexDirection: 'column' }}>{rmItemCodes}</div>;
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Product</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 130,
  render: (rmItems) => {
    const product = rmItems.map((item, index) => (
      <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
        {item.product || '-'}
      </div>
    ));
    return <div style={{ display: 'flex', flexDirection: 'column' }}>{product}</div>;
    }
  },
  {
    title: <div style={{ textAlign: 'center' }}>Item Name</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 130,
  render: (rmItems) => {
    const itemName = rmItems.map((item, index) => (
      <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
        {item.rmItemName || '-'}
      </div>
    ));
    return <div style={{ display: 'flex', flexDirection: 'column' }}>{itemName}</div>;
    }
  },
  {
    title: <div style={{ textAlign: 'center' }}>Item Type</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 120,
    render: (rmItems) => {
      const itemTypes = rmItems.map((item, index) => (
        <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
          {item.item_type || '-'}
        </div>
      ));
      return <div style={{ display: 'flex', flexDirection: 'column' }}>{itemTypes}</div>;
    
  },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Item Group</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 120,
   
    render: (rmItems) => {
      const itemGroups = rmItems.map((item, index) => (
        <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
          {item.item_group || '-'}
        </div>
      ));
      return <div style={{ display: 'flex', flexDirection: 'column' }}>{itemGroups}</div>;
    
  },
  },

  {
    title: <div style={{ textAlign: 'center' }}>Facility</div>,
    dataIndex: "rm_items",
    key: "rm_items",
    align: 'center',
    width: 100,
  render: (rmItems) => {
    const facilities = rmItems.map((item, index) => (
      <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
        {item.facility || '-'}
      </div>
    ));
    return <div style={{ display: 'flex', flexDirection: 'column' }}>{facilities}</div>;
    }
},
{
  title: <div style={{ textAlign: 'center' }}>Operation</div>,
  dataIndex: "rm_items",
  key: "rm_items",
  align: 'center',
  width: 130,
render: (rmItems) => {
  const operation = rmItems.map((item, index) => (
    <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
      {item.operation_name || '-'}
    </div>
  ));
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{operation}</div>;
  }
},

{
  title: <div style={{ textAlign: 'center' }}>Consumption</div>,
  dataIndex: "rm_items",
  key: "rm_items",
  align: 'center',
  width: 130,
render: (rmItems) => {
  const Consumption = rmItems.map((item, index) => (
    <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
      {item.consumption || '-'}
    </div>
  ));
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{Consumption}</div>;
  }
},
{
  title: <div style={{ textAlign: 'center' }}>Procurement</div>,
  dataIndex: "rm_items",
  key: "rm_items",
  align: 'center',
  width: 130,
render: (rmItems) => {
  const procurement = rmItems.map((item, index) => (
    <div key={index} style={{ padding: '5px', borderBottom: index !== rmItems.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
      {item.procurement || '-'}
    </div>
  ));
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{procurement}</div>;
  }
},

];



//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   }

  return (
      <>
      <Card title={<span >Fg Rm Mapping</span>}
    extra={<Link to='/product-structure/fg-rm-mapping' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllRmSkuData} form={form} layout='vertical'>
                <Row gutter={24}>
                
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='rmItcode' label='Rm Item Code' >
                            <Select
                                showSearch
                                placeholder="Select Rm Item Code"
                                optionFilterProp="children"
                                allowClear dropdownMatchSelectWidth={false}
                            >
                                {
                                    RmCode?.map((inc: any) => {
                                        return <Option key={inc.rmitemId} value={inc.itemCode}>{inc.itemCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='fgItemCode' label='Fg Item Code' >
                            <Select dropdownMatchSelectWidth={false} showSearch placeholder="Select Fg Item Code" optionFilterProp="children" allowClear>
                                {
                                    fgCode?.map((inc: any) => {
                                        return <Option key={inc.fgitemId} value={inc.itemCode}>{inc.itemCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">GET DETAILS</Button>
                            <Button
                                htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                            >
                                RESET
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
      <Table
            size='middle'
            rowKey={(record) => record.feature_option_id}
            columns={columns}
            className='custom-table-wrapper'
            dataSource={lTData}
            pagination={{
              onChange(current) {
                setPage(current);
              },
            }}
            scroll={{ x: 'max-content',y:1000}}
            // onChange={onChange}
            bordered
          />
      </Card>
      </Card> </>
      
  );
}
export default FgRmItemBomView


