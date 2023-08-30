
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { EmployeeDetailsResponse, employeeIdReq } from '@project-management-system/shared-models';
import {  EmployeeDetailsService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import EmployeeDetsilsForm from './employee-details-form';
import { render } from "react-dom";
import moment from 'moment';
import dayjs from 'dayjs';

export interface EmployeeDetailsGridProps { }

export const EmployeeDetailsGrid = (props: EmployeeDetailsGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()

  const service = new EmployeeDetailsService();

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
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
        title: "Employee Code",
        dataIndex: "employeeCode",
        width:'60px',
        sorter: (a, b) => a.employeeCode.localeCompare(b.employeeCode),
      ...getColumnSearchProps("employeeCode"),
      },
    {
      title: "Name",
      width:'120px',
      render:(text,record) =>{
        return (
            <span>
                {(record?.firstName ? record.firstName:'') +' '+ (record?.lastName ? record.lastName:'')}
            </span>
        )
      }
    },
    {
        title: "Mobile Number",
        dataIndex: "mobileNumber",
      width:'60px',
        sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
      ...getColumnSearchProps("mobileNumber"),
      },
      {
        title: "Alternate Number",
        dataIndex: "alterNativeMobileNumber",
       width:'60px',
        sorter: (a, b) => a.alterNativeMobileNumber.length-(b.alterNativeMobileNumber.length),
      ...getColumnSearchProps("alterNativeMobileNumber"),
      },
    {
        title: "Date of Birth",
        dataIndex: "dateOfBirth",
        sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
        render: (text, record) => {
            return (<span>{record.dateOfBirth? moment(record.dateOfBirth).format("YYYY-MM-DD"): "-"}</span>)
          },
      },
      {
        title: "Pin Code",
        dataIndex: "pinCode",
        sorter: (a, b) => a.pinCode-(b.pinCode),
      ...getColumnSearchProps("pinCode"),
      },
      {
        title: "Address",
        dataIndex: "address",
        sorter: (a, b) => a.address.localeCompare(b.address),
    
      },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
      width:'80px',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'InActive',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        // === is not work
        return record.isActive === value;
      },

    },
    {
      title: `Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated employee');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteEmployee(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this employee ?'
                : 'Are you sure to Activate this employee ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />

          </Popconfirm>
        </span>
      )
    }
  ];

  /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllEmployees();}, [])


  const getAllEmployees= () => {
    service.getAllEmploee().then(res => {
      if (res.status) {
        setVariantData(res.data);
      } else
       {
        setVariantData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setVariantData([]);
    })
  }


  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const openFormWithData = (viewdata: EmployeeDetailsResponse) => {
    console.log(viewdata)
     const date = viewdata.dateOfBirth?dayjs(moment(viewdata.dateOfBirth).format("YYYY-MM-DD")):null
     viewdata.dateOfBirth = dayjs(date)
    console.log(viewdata.dateOfBirth)
    setDrawerVisible(true);
    setSelectedVariant(viewdata);
  }


  const updateEmployee = (data: EmployeeDetailsResponse) => {
    service.updateEmployee(data).then(res => {
      console.log(res);
      if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
        getAllEmployees();
        setDrawerVisible(false);
      } else {     
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const deleteEmployee = (data:employeeIdReq ) => {
    data.isActive = data.isActive ? false : true;
    service.ActivateOrDeactivateEmployee(data).then(res => {
      console.log(res);
      if (res.status) {
        getAllEmployees();
        setTimeout(function() {
        message.success(res.internalMessage)
      }, -3000);
      } else {
        
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  return (
      <>
      <Card title='Employees' extra={<span><Button onClick={() => navigate('/global/employee-details/employee-details-form')}
              type={'primary'}>New</Button></span>}>
      <Row gutter={40}>
        <Col>
          <Card title={'Total Employees: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
      </Row><br></br>
      <Card >
        <Table
        size='small'
          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true}}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <EmployeeDetsilsForm key={Date.now()}
            updateItem={updateEmployee}
            isUpdate={true}
            // saveItem={saveVariant}
            employeeData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
      </Card>
      </>
  );
}


export default EmployeeDetailsGrid;