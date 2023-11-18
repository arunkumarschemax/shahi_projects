
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert, Checkbox } from 'antd';
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
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      align:"center"
    },
    {
      title: <div style={{textAlign:"center"}}>Style </div>,

        dataIndex: "style",
        width:'100px',
        sorter: (a, b) => a.style.localeCompare(b.style),
      ...getColumnSearchProps("style"),
      },
     
    {
      title: <div style={{textAlign:"center"}}>Location </div>,
      dataIndex: "locationName",
      sorter: (a, b) => a.locationName.localeCompare(b.locationName),
      ...getColumnSearchProps("locationName"),
    },
    {
      title: <div style={{textAlign:"center"}}>PCH </div>,
        dataIndex: "profitControlHead",
        sorter: (a, b) => a.profitControlHead.localeCompare(b.profitControlHead),
      ...getColumnSearchProps("profitControlHead"),
      },
      {
        title: <div style={{textAlign:"center"}}>File Name </div>,
          dataIndex: "styleFileName",
          sorter: (a, b) => a.styleFileName.localeCompare(b.styleFileName),
       
        },
    
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
          value: true,
        },
        {
          text: 'InActive',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
          <Checkbox
            checked={selectedKeys.includes(true)}
            onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
          >
            <span style={{color:'green'}}>Active</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(false)}
            onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
          >
            <span style={{color:'red'}}>Inactive</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns" >
          <Button  onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          
          </div>
        </div>
      ),

    },
    {
      title: `Action`,
      dataIndex: 'action',
      align:"center",
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
    console.log(viewdata,"8888")
    setDrawerVisible(true);
    setSelectedVariant(viewdata);
  }


  const updateStyle = (data: StyleDto,filelist:any) => {
    // data.updateUser = JSON.parse(localStorage.getItem('username'))
    service.updateStyle(data).then(res => {
      // console.log(res);
      if (res.status) {
        console.log(res.data[0].styleId,'updatee')
        if (filelist.length > 0) {
          const formData = new FormData();
          filelist.forEach((file: any) => {
            formData.append('file', file);
          });
          formData.append('styleId', `${res.data[0].styleId}`)
          console.log(formData)
          service.fileUpload(formData).then(fileres => {
            res.data[0].styleFilePath = fileres.data;
            getAllStyles();

          })
        }
        AlertMessages.getSuccessMessage('Updated Successfully');
        setDrawerVisible(false);
      } else {     
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const deleteStyle = (data:StyleIdReq ) => {
    data.isActive = data.isActive ? false : true;
    console.log(data,"data")
    service.ActivateOrDeactivateStyle(data).then(res => {
      console.log(res,"tttttttt");
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

  // const updateStyle = () =>{

  // }

  return (
      <>
            <Card title='Styles' extra={<span><Button onClick={() =>  navigate('/style-management/style/style-form')}
              type={'primary'}>New</Button></span>} >
   {/* <Row gutter={40}>
        <Col>
          <Card title={'Total Styles: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
      </Row><br></br> */}

<Row gutter={24}>
  <Col span={4}></Col>
    <Col span={5}>
     
<Alert type='success' message={'Total Styles: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
</Row>
<br/>
      <Card size='small'>
        <Table
        size='small'
          columns={columnsSkelton}
          dataSource={variantData}
          scroll={{x:true,y:500}}
          pagination={{
           pageSize:50,
           onChange(current) {
             setPage(current);
           }
         }}
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
              </Card>
   
      </>
  );
}


export default StyleGrid;