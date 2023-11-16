

import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   CompositionService, ItemsService, LiscenceTypeService, RangeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CompositionDto, LiscenceTypesdDto, RangeDto } from '@project-management-system/shared-models';
import RangeForm from './range.-form';


const RangeGrid = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedRangeData, setSelectedRangeData] = useState<any>(undefined);


  const service = new RangeService();

  useEffect(() => {
    getAllRangeData();
  }, [])

    const getAllRangeData= () => {
    service.getRangeData().then(res => {
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

  const deleteRange = (Data:RangeDto) => {
    Data.isActive=Data.isActive?false:true;
    service.ActivateOrDeactivateRange(Data).then(res => { console.log(res);
      if (res.status) {
        // AlertMessages.getSuccessMessage('Success'); 
        message.success(res.internalMessage)

      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateRange = (Data: RangeDto) => {
    Data.updatedUser = JSON.parse(localStorage.getItem('username'))
    service.updateRange(Data).then(res => { console.log(Data,"Data") ;
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        setDrawerVisible(false);
        getAllRangeData()
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const closeDrawer = () => {
    setDrawerVisible(false);
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

  const openFormWithData=(viewData: LiscenceTypesdDto)=>{
    setDrawerVisible(true);
    setSelectedRangeData(viewData);
  }


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      // width: '70px',
      align:'center',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
        title: <div style={{ textAlign: 'center' }}>Range Code</div>,
        dataIndex: "rangeCode",
        // width:'60px',
        sorter: (a, b) => a.rangeCode?.localeCompare(b.rangeCode),
      ...getColumnSearchProps("rangeCode"),
      align:'left'
      },
      {
        title:<div style={{ textAlign: 'center' }}>Range Description</div>,
        dataIndex: "rangeDescription",
        align:'left',
        // width:'60px',
        sorter: (a, b) => a.rangeDescription?.localeCompare(b.rangeDescription),
      ...getColumnSearchProps("rangeDescription"),
      },
    {
      title: 'Status',
      dataIndex: 'isActive',
      align:'center',
       // width:'80px',
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
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Composition');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteRange(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Range ?'
                : 'Are you sure to Activate this Range ?'
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

  


  return (
      <>
      <Card title={<span >Range</span>}
    style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/range/range-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Row gutter={24}>
      <Col span={4}></Col>
        <Col span={5}>
          {/* <Card title={'Total Ranges: ' + lTData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
          <Alert type='success' message={'Total Ranges: ' + lTData.length} style={{fontSize:'15px'}} />

        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + lTData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + lTData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />

        </Col>
        <Col span={5}>
          {/* <Card title={'In-Active: ' + lTData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          <Alert type='info' message={'In-Active: ' + lTData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />

        </Col>
      </Row><br></br>
      <Card >
        <Table
        size='small'

        rowKey={record => record}
          columns={columnsSkelton}
          dataSource={lTData}
          pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true,y:550}}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <RangeForm key={Date.now()}
            updateData={updateRange}
            isUpdate={true}
            RangeData={selectedRangeData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default RangeGrid
