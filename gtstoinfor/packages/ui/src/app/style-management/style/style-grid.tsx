
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { EmployeeDetailsResponse, StyleDto, StyleIdReq, employeeIdReq } from '@project-management-system/shared-models';
import {  StyleService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import moment from 'moment';
import dayjs from 'dayjs';
import StyleForm from './style-form';

export interface EmployeeDetailsGridProps { }

export const StyleGrid = (props: EmployeeDetailsGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()

  const service = new StyleService();

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
        title: "Style",
        dataIndex: "style",
        width:'100px',
        sorter: (a, b) => a.style.localeCompare(b.style),
      ...getColumnSearchProps("style"),
      },
    {
      title: "Location",
      dataIndex: "location",
      width:'150px',
    },
    {
        title: "PCH",
        dataIndex: "pch",
      width:'100px',
        sorter: (a, b) => a.pch.localeCompare(b.pch),
      ...getColumnSearchProps("pch"),
      },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
    //   width:'80px',
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
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated employeee');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteStyle(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Style ?'
                : 'Are you sure to Activate this Style ?'
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
  useEffect(() => {getAllStyles();}, [])


  const getAllStyles= () => {
    service.getAllStyle().then(res => {
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

  const openFormWithData = (viewdata: StyleDto) => {
    console.log(viewdata)
    setDrawerVisible(true);
    setSelectedVariant(viewdata);
  }


//   const updateEmployee = (data: EmployeeDetailsResponse) => {
//     // data.updateUser = JSON.parse(localStorage.getItem('username'))
//     service.updateEmployee(data).then(res => {
//       console.log(res);
//       if (res.status) {
//         AlertMessages.getSuccessMessage('Updated Successfully');
//         getAllEmployees();
//         setDrawerVisible(false);
//       } else {     
//         AlertMessages.getErrorMessage(res.internalMessage);
//       }
//     }).catch(err => {
//       AlertMessages.getErrorMessage(err.message);
//     })
//   }

  const deleteStyle = (data:StyleIdReq ) => {
    data.isActive = data.isActive ? false : true;
    service.ActivateOrDeactivateStyle(data).then(res => {
      console.log(res);
      if (res.status) {
        getAllStyles();
        AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateStyle = () =>{

  }

  return (
      <>
      <Row gutter={40}>
        <Col>
          <Card title={'Total Styles: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
        <Col>
        <span><Button onClick={() => navigate('/style-management/style/style-form')}
              type={'primary'}>New</Button></span>
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
          <StyleForm key={Date.now()}
            updateDetails={updateStyle}
            isUpdate={true}
            // saveItem={saveVariant}
            styleData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
      </>
  );
}


export default StyleGrid;