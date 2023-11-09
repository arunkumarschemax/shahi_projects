import { DepartmentService, ItemCreationService, OperationsService, ProductStructureService, RmCreationService } from "@project-management-system/shared-services"
import React, { useState, useEffect, useRef } from 'react';
import { Table, Card,  Input, Button, Form, Row, Col, Select, Tooltip,} from 'antd';
import Highlighter from 'react-highlight-words';
import {  EyeOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from "../common-functions/alert-messages";
import { RmMappingFilterRequest } from "@project-management-system/shared-models";

const TrimOperationMappingView = () => {

    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const operationsService = new OperationsService();
  const service =new DepartmentService();
  const productService = new ProductStructureService()

  const { Option } = Select;
  const [operationsData, setOperationsData] = useState<any[]>([]);
  const [departmentData, setDepartmentData] = useState<any[]>([]);
  const fgservice = new ItemCreationService()
  const Rmservice = new RmCreationService()
  const [fgCode, setFgCode] = useState<any[]>([])
  const [RmCode, setRMCode] = useState<any[]>([])


  useEffect(() => {
    getAllRmSMVData();
    getAllOperationsData();
    getFgItemsDropdown();
    RmCodeData();
  }, [])

  const getAllOperationsData = () => {
    
    operationsService.getAllActiveOperations().then(res => {
      if(res.status) {
        setOperationsData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    })
  }


  const getAllDepartment=()=>{
    service.getAllDepartments().then(res=>{
        if(res.status){
            setDepartmentData(res.data)
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    })
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

    const getAllRmSMVData= () => {
        const req = new RmMappingFilterRequest();
        
        if (form.getFieldValue('operation') !== undefined) {
            req.fgItemCode = form.getFieldValue('operation');
        }
        if (form.getFieldValue('dept') !== undefined) {
            req.rmItemCode = form.getFieldValue('dept');
        }
       
        
        productService.getRmMapped(req).then(res => {
      if (res.status) {
        setLTData(res.data);
      } else
       {
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
              if (open) { setTimeout(() => searchInput.current.select()); }
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
    getAllRmSMVData();

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
          responsive: ['sm'],
          render: (text, object, index) => (page - 1) * 10 + (index + 1), align:'center',
        },
  {
    title: "FG Item Code",
    dataIndex: "fg_item_code",
    key: "fg_item_code",
    align:'center',
  },
  {
    title:<div style={{ textAlign: 'center' }}>RM Item Codes</div> ,
    dataIndex: "rm_items",
    key: "rm_items",
    align:'center',
    render: (rmItems) => {
      return (
        <Table
          dataSource={rmItems}
          columns={[
            {
              dataIndex: "rm_item_code",
              key: "rm_item_code", align:'center',
            },
           
          ]}
          pagination={false}
        />
      );
    }
  },
  {
    title:<div style={{ textAlign: 'center' }}>Operations</div> ,
    dataIndex: "rm_items",
    key: "rm_items",
    align:'center',
    render: (rmItems) => {
      return (
        <Table
          dataSource={rmItems}
          columns={[
            
            {
              dataIndex: "operation_name",
              key: "operation_name", align:'center',render:(data)=>{
                return data ? data :'-'
              }
            },
          ]}
          pagination={false}
        />
      );
    }
  },
  {
    title:<div style={{ textAlign: 'center' }}>Sequencies</div> ,
    dataIndex: "rm_items",
    key: "rm_items",
    align:'center',
    render: (rmItems) => {
      return (
        <Table
          dataSource={rmItems}
          columns={[
            {
              dataIndex: "sequence",
              key: "sequence", align:'center',
              render:(data)=>{
                return data ? data :'-'
              }
            },
          ]}
          pagination={false}
        />
      );
    }
  },
 
 
];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
      <>
      <Card title={<span >RM Opration Mapping </span>}
    extra={<Link to='/product-structure/productstructure/smv-efficiency' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllRmSMVData} form={form} layout='vertical'>
                <Row gutter={24}>
                
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='rmItcode' label='Rm Item Code' >
                            <Select
                                showSearch
                                placeholder="Select Rm Item Code"
                                optionFilterProp="children"
                                allowClear
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
                            <Select showSearch placeholder="Select Fg Item Code" optionFilterProp="children" allowClear>
                                {
                                    fgCode?.map((inc: any) => {
                                        return <Option key={inc.fgitemId} value={inc.itemCode}>{inc.itemCode}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                    <Form.Item name='operation' label='Operation' >
                        <Select
                            showSearch
                            placeholder="Select Operation"
                            optionFilterProp="children"
                            allowClear
                        >
                            {
                                operationsData?.map((inc: any) => {
                                    return <Option key={inc.operationId} value={inc.operationId}>{inc.operationName}</Option>
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
           // rowKey={(record) => record.smv_efficiency_id}
            columns={columns}
            className='custom-table-wrapper'
            dataSource={lTData}
            pagination={{
              onChange(current) {
                setPage(current);
              },
            }}
            // onChange={onChange}
            bordered
          />
      </Card>
      </Card> </>
      
  );
}

export default TrimOperationMappingView

