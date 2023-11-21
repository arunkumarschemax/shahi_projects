import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Form, Select } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined, UndoOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { RmSkuService } from '../../../../libs/shared-services/src';
import form from 'antd/es/form';
import { RMSkuFilterReq } from '@project-management-system/shared-models';

export function RMSkuView() {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState<any[]>()
  const service = new RmSkuService() 
  const [form] = Form.useForm();
  const { Option } = Select;
  const [skuCode, setRmSkuCode] = useState<any[]>()
  const [featureCode, setFeatureCode] = useState<any[]>()
  const [itemCode, setItemCode] = useState<any[]>()
  const [optionValue, setOptionValue] = useState<any[]>()



  useEffect(() => {
    getAllRmSku();
    getSKUCodeData()
    getFeatureCodeData()
    getItemCodeData()
    getOptionValueData()
  }, []);



   const getAllRmSku = () =>{
    const req = new RMSkuFilterReq()
    if (form.getFieldValue('skuCode') !== undefined) {
        req.skuCode = form.getFieldValue('skuCode')
    }
    if (form.getFieldValue('featureCode') !== undefined) {
        req.featureCode = form.getFieldValue('featureCode')
    }
    if (form.getFieldValue('itemCode') !== undefined) {
        req.itemCode = form.getFieldValue('itemCode')
    }
    if (form.getFieldValue('optionValue') !== undefined) {
        req.optionValue = form.getFieldValue('optionValue')
    }
    service.getAllRmSKUs(req).then((res)=>{
        if(res.status){
            setData(res.data)
        }
    })
   } 

   const getSKUCodeData = ()=>{
    service.getSKUCodeData().then((res)=>{
        if(res.status){
            setRmSkuCode(res.data)
        }
    })
   }

   const getFeatureCodeData = ()=>{
    service.getFeatureCodeData().then((res)=>{
        if(res.status){
            setFeatureCode(res.data)
        }
    })
   }

   const getItemCodeData = ()=>{
    service.getItemCodeData().then((res)=>{
        if(res.status){
            setItemCode(res.data)
        }
    })
   }

   const getOptionValueData = ()=>{
    service.getOptionValueData().then((res)=>{
        if(res.status){
            setOptionValue(res.data)
        }
    })
   }

   const resetHandler = () => {
    form.resetFields();
    getAllRmSku();
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

  /**
   * 
   * @param selectedKeys 
   * @param confirm 
   * @param dataIndex 
   */
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };



  const columnsSkelton: any = [
    {
      title: <div style={{textAlign:'center'}}>S No</div>,
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
       title: <div style={{textAlign:'center'}}>RM Item Code</div>,
      dataIndex: 'itemCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.itemCode.localeCompare(b.itemCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('itemCode')
    },
    {
       title: <div style={{textAlign:'center'}}>Product Group</div>,
      dataIndex: 'itemType',
      // responsive: ['lg'],
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ['descend', 'ascend'],
    //   filters:[
    //     {
    //         text:'FABRIC',
    //         value:'FABRIC'
    //     },
    //     {
    //         text:'TRIM',
    //         value:'TRIM'  
    //     },
    // ],
    onFilter: (value,record) =>{ return record.status === value}
    //   ...getColumnSearchProps('itemType')
    },
    {
       title: <div style={{textAlign:'center'}}>SKU Code</div>,
      dataIndex: 'rmSkuCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.rmSkuCode.localeCompare(b.rmSkuCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('rmSkuCode')
    },
    {
       title: <div style={{textAlign:'center'}}>Feature Code</div>,
      dataIndex: 'featureCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.featureCode.localeCompare(b.featureCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('featureCode')
    },
    {
       title: <div style={{textAlign:'center'}}>Option Group</div>,
      dataIndex: 'optionGroup',
      // responsive: ['lg'],
      sorter: (a, b) => a.optionGroup.localeCompare(b.optionGroup),
      sortDirections: ['descend', 'ascend'],
    //   filters:[
    //     {
    //         text:'COLOR',
    //         value:'COLOR'
    //     },
    //     {
    //         text:'SIZE',
    //         value:'SIZE'  
    //     },
    //     {
    //         text:'DESTINATION',
    //         value:'DESTINATION'  
    //     }
    // ],
    onFilter: (value,record) =>{ return record.status === value}
    //   ...getColumnSearchProps('optionGroup')
    },
    {
       title: <div style={{textAlign:'center'}}>Option Value</div>,
      dataIndex: 'optionValue',
      // responsive: ['lg'],
      sorter: (a, b) => a.optionValue.localeCompare(b.optionValue),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('optionValue')
    }
  ];


//   const onChange=(pagination, filters, sorter, extra)=> {
//     console.log('params', pagination, filters, sorter, extra);
//   }
  return (
    <Card title={<span >RM SKU</span>}
    // headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/rm-skus' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
      <Form onFinish={getAllRmSku} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemCode' label='RM Item Code' >
                            <Select showSearch placeholder="Select RM Item Code" optionFilterProp="children" allowClear>
                                {
                                    itemCode?.map((inc: any) => {
                                        return <Option key={inc.itemCode} value={inc.itemCode}>{inc.itemCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='skuCode' label='SKU Code' >
                            <Select showSearch placeholder="Select SKU Code" optionFilterProp="children" allowClear >
                                {
                                    skuCode?.map((inc: any) => {
                                        return <Option key={inc.skuCode} value={inc.skuCode}>{inc.skuCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='featureCode' label='Feature Code' >
                            <Select
                                showSearch
                                placeholder="Select Feature Code"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    featureCode?.map((inc: any) => {
                                        return <Option key={inc.featureCode} value={inc.featureCode}>{inc.featureCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='optionValue' label='Option Value' >
                            <Select showSearch placeholder="Select Option Value" optionFilterProp="children" allowClear>
                                {
                                    optionValue?.map((inc: any) => {
                                        return <Option key={inc.optionValue} value={inc.optionValue}>{inc.optionValue}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">Search</Button>
                            <Button
                                htmlType='button' style={{ margin: 10, position: "relative" }} onClick={resetHandler} >
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
          <Table
        //   size='small'
          rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

          rowKey={record => record.roslGroupId}
          columns={columnsSkelton}
          dataSource={data}
          scroll={{x:true,y:500}}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
        //   onChange={onChange}
          bordered />
        {/* <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
              <ROSLGroupsForm key={Date.now()}
                updateROSLGroups={updateROSLGroups}
                isUpdate={true}
                data={selectedROSLGroupsData}
                closeForm={closeDrawer} />
          </Drawer> */}
     </Card>
  );
}

export default RMSkuView;
