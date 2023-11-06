

import { DepartmentService, ItemCreationService, OperationsService, ProductStructureService, RmCreationService } from "@project-management-system/shared-services"
import React, { useState, useEffect, useRef } from 'react';
import { Table, Card,  Input, Button, Form, Row, Col, Select, Tooltip,} from 'antd';
import Highlighter from 'react-highlight-words';
import {  EyeOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   FeatureService } from '@project-management-system/shared-services';
import AlertMessages from "../common-functions/alert-messages";
import { RmMappingFilterRequest, SMVFilterRequest } from "@project-management-system/shared-models";


const SMVEffciencyView = () => {
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


  useEffect(() => {
    getAllRmSMVData();
    getAllDepartment();
    getAllOperationsData();
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

  

    const getAllRmSMVData= () => {
        const req = new SMVFilterRequest();
        
        if (form.getFieldValue('operation') !== undefined) {
            req.operationId = form.getFieldValue('operation');
        }
        if (form.getFieldValue('dept') !== undefined) {
            req.departmentId = form.getFieldValue('dept');
        }
        if (form.getFieldValue('optPer') !== undefined) {
          req.optionsPercent = form.getFieldValue('optPer')
        }
        productService.getAllSmvData(req).then(res => {
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

const DetailView = (rowData) => {

    navigate(`/product-structure/smv-efficiency-detail-view`,{state:rowData})
    
}

function handleAgingFilter(values) {

}

const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Operation',
      dataIndex: 'operation_id',
      align: 'center',
      render: (data) => {
        const opdata = operationsData.find((cat) => cat.operationId  === data);
        return opdata ? opdata.operationName: "-";
      },
      // sorter: (a, b) => a.feature_code?.localeCompare(b.feature_code),
    },
    {
      title: 'Work Center',
      dataIndex: 'work_center',
      align: 'center', 
   
      sorter: (a, b) => a.work_center?.localeCompare(b.work_center),
      ...getColumnSearchProps('work_center')
    },
    {
        title: 'Department',
        dataIndex: 'department_id',
        align: 'center',
        render: (data) => {
          const Curdata = departmentData.find((cat) => cat.deptId  === data);
          return Curdata ? Curdata.deptName: "-";
        },
        sorter: (a, b) => a.department_id?.localeCompare(b.department_id),
      },
      {
        title: <div style={{ textAlign: 'center' }}>Options Percent</div>,
        dataIndex: 'options_percent',
        align: 'right',
        render: (data) => {
          return data ? (<span>{data}%</span>) : ('-');},      
        sorter: (a, b) => a.options_percent?.localeCompare(b.options_percent),
      },
      {
        title: <div style={{ textAlign: 'center' }}>Qty per Hour</div>,
        dataIndex: 'qty_per_hour',
        align: 'right',
        
        sorter: (a, b) => a.qty_per_hour?.localeCompare(b.qty_per_hour),
      },
      {
        title: `Action`,
        dataIndex: 'action',
        render: (text, rowData) => {
          return( <span>
 
              <Tooltip placement="top" title="Detail View">
                      <Button type="link" onClick={() => DetailView(rowData)}>
                        <EyeOutlined type="view" />
                      </Button>
                    </Tooltip>
            </span>)
          
      }
      }
    ];
  

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
      <>
      <Card title={<span >SMV Efficiency </span>}
    // style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/product-structure/productstructure/smv-efficiency' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllRmSMVData} form={form} layout='vertical'>
      <Row gutter={24}>
                
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
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                    <Form.Item name='dept' label='Department' >
                        <Select showSearch placeholder="Select department" optionFilterProp="children" allowClear>
                            {
                                departmentData?.map((inc: any) => {
                                    return <Option key={inc.deptId} value={inc.deptId}>{inc.deptName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
            <Form.Item label='Operation %' name='optPer'>
              <Select
                placeholder=' Select Operation %'
                showSearch
                allowClear
                onChange={handleAgingFilter}
              >
                <Option key='1-20' value='1-20'>1-20 %</Option>
                <Option key='21-40' value='21-40'>21-40 %</Option>
                <Option key='41-60' value='41-60'>41-60 %</Option>
                <Option key='61-80' value='61-80'>61-80 %</Option>
                <Option key='81-100' value='81-100'>81-100 %</Option>
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
            rowKey={(record) => record.smv_efficiency_id}
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
export default SMVEffciencyView


