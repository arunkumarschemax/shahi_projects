
import React, { useState, useEffect, useRef } from 'react';
import { Table, Card,  Input, Button, Form, Row, Col, Select, message,} from 'antd';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   ColourService, DestinationService, FeatureService, SizeService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { CSSProperties } from 'react';
import { FeatureFilterRequest } from '@project-management-system/shared-models';


const FeatureCreationView = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new FeatureService()
  const { Option } = Select;
  const [featureCode, setFeatureCode] = useState<any[]>([])
  const [featureName, setFeatureName] = useState<any[]>([])
  const [optGroup, setOptionGroup] = useState<any[]>([])


  useEffect(() => {
    getAllFeatureData();
    featureNameData();
    featureCodeData();
    optionGroupData();
  }, [])
  

    const getAllFeatureData= () => {
        const req = new FeatureFilterRequest();
        
        if (form.getFieldValue('featureCode') !== undefined) {
            req.featureCode = form.getFieldValue('featureCode');
        }
        if (form.getFieldValue('featureName') !== undefined) {
            req.featureName = form.getFieldValue('featureName');
        }
        if (form.getFieldValue('optionGroup') !== undefined) {
            req.optionGroup = form.getFieldValue('optionGroup');
        }
    service.getAllFeatures(req).then(res => {
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
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const resetHandler = () => {
    form.resetFields();
    getAllFeatureData();

}


  const featureNameData = () =>{
    service.getFeatureName().then((res)=>{
        if(res.status){
            setFeatureName(res.data)
        }
    })
}
const featureCodeData = () =>{
    service.getFeatureCode().then((res)=>{
        if(res.status){
            setFeatureCode(res.data)
        }
    })
}
const optionGroupData = () =>{
    service.getOptionGropup().then((res)=>{
        if(res.status){
            setOptionGroup(res.data)
        }
    })
}


const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Feature Code',
      dataIndex: 'feature_code',
      align: 'center',
      sorter: (a, b) => a.feature_code?.localeCompare(b.feature_code),
      ...getColumnSearchProps('feature_code'),
    },
    {
      title: 'Feature Name',
      dataIndex: 'feature_name',
      align: 'center',
      sorter: (a, b) => a.feature_name?.localeCompare(b.feature_name),
      ...getColumnSearchProps('feature_name'),
    },
    {
        title: 'Option',
        dataIndex: 'option_group',
        align: 'center',
        sorter: (a, b) => a.option_group?.localeCompare(b.option_group),
        ...getColumnSearchProps('option_group'),
      },
    {
        title: 'Option Values',
        dataIndex: 'option_group',
        align:'center',
    
        render: (optionGroup, record) => {
          const options = record[optionGroup];
          
          if (optionGroup === 'SIZE' && options) {
            return options.map((option, index) => (
              <span key={option.option_id}>
                {option.optionValue}
                {index < options.length - 1 ? ', ' : ''}
              </span>
            ));
          }
        
          if (optionGroup === 'DESTINATION' && options) {
            return options.map((option, index) => (
              <span key={option.option_id}>
                {option.optionValue}
                {index < options.length - 1 ? ', ' : ''}
              </span>
            ));
          }
        
          if (optionGroup === 'COLOR' && options) {
            return (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {options.map((option, index) => {
                  const colorText = option.optionValue;
                  const isWhite = colorText.toLowerCase() === 'white';
                  const colorStyle = {
                    display: 'inline-block',
                    padding: '4px',
                    backgroundColor: isWhite ? 'white' : colorText,
                    color: isWhite ? 'black' : 'white',
                    borderRadius: '4px',
                    minWidth: '30px',
                    height: '30px',
                    margin: '4px',
                    border: `1px solid ${isWhite ? 'black' : 'transparent'}`,
                  };
                  return (
                    <span key={option.option_id} style={{ ...colorStyle, textAlign: 'center' }}>
                      {colorText}
                    </span>
                  );
                })}
              </div>
            );
          }
        
          return null;
        },
        
      }

    ];
  

//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   }

  return (
      <>
      <Card title={<span >Feature Creation</span>}
    style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/feature-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllFeatureData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='featureCode' label='Feature Code' >
                            <Select showSearch placeholder="Select Feature Code" optionFilterProp="children" allowClear >
                                {
                                    featureCode?.map((inc: any) => {
                                        return <Option key={inc.feature_option_id} value={inc.feature_code}>{inc.feature_code}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='featureName' label='Feature Name' >
                            <Select
                                showSearch
                                placeholder="Select Size Feature Name"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    featureName?.map((inc: any) => {
                                        return <Option key={inc.feature_id} value={inc.feature_name}>{inc.feature_name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='optionGroup' label='Option' >
                            <Select showSearch placeholder="Select Option" optionFilterProp="children" allowClear>
                                {
                                    optGroup?.map((inc: any) => {
                                        return <Option key={inc.feature_option_id} value={inc.option_group}>{inc.option_group}</Option>
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
            columns={columnsSkelton}
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
export default FeatureCreationView


