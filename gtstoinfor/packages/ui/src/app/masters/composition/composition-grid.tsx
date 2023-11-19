

import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   CompositionService, ItemsService, LiscenceTypeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { CompositionDto, LiscenceTypesdDto } from '@project-management-system/shared-models';
import CompositionForm from './composition-form';


const CompositionGrid = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedcompositionData, setSelectedCompositionData] = useState<any>(undefined);


  const service = new CompositionService();

  useEffect(() => {
    getAllCompositionData();
  }, [])

    const getAllCompositionData= () => {
    service.getCompositionData().then(res => {
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

  const deleteLiscenceType = (compositionData:CompositionDto) => {
    //  console.log(compositionData,'hiiiiiiiiii')
    compositionData.isActive=compositionData.isActive?false:true;
    service.activateOrDeactivateComposition(compositionData).then(res => { console.log(res);
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

  const updateComposition = (compositionData: CompositionDto) => {
    compositionData.updatedUser = JSON.parse(localStorage.getItem('username'))
    service.updateComposition(compositionData).then(res => { console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        setDrawerVisible(false);
        getAllCompositionData()
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
    setSelectedCompositionData(viewData);
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
        title: <div style={{ textAlign: 'center' }}>Composition Code</div>,
        dataIndex: "compositionCode",
        // width:'60px',
        sorter: (a, b) => a.compositionCode?.localeCompare(b.compositionCode),
      ...getColumnSearchProps("compositionCode"),      align:'left',

      },
      {
        title: <div style={{ textAlign: 'center' }}>Composition Description</div>,
        dataIndex: "compositionDescription",
        // width:'60px',
        sorter: (a, b) => a.compositionDescription?.localeCompare(b.compositionDescription),
      ...getColumnSearchProps("compositionDescription"),      align:'left',

      },
    {
      title: 'Status',
      dataIndex: 'isActive',      align:'center',

       // width:'80px',
      render: (isActive, rowData) => (
        < >
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">Inactive</Tag>}
        </>
      ),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
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
      dataIndex: 'action',      align:'center',
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
          <Popconfirm onConfirm={e => { deleteLiscenceType(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Composition ?'
                : 'Are you sure to Activate this Composition ?'
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
      <Card title={<span >Composition</span>}
    style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/composition/composition-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Row gutter={24}>
        <Col span={4}></Col>
        <Col span={5}>
          {/* <Card title={'Total Compositions: ' + lTData.length} style={{ textAlign: 'left', width: 200, height: 51, backgroundColor: '#bfbfbf' }}></Card> */}
          <Alert type='success' message={'Total Compositions: ' + lTData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + lTData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 51, backgroundColor: '#52c51a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + lTData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'In-Active: ' + lTData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          <Alert type='info' message={'Inactive: ' + lTData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
      </Row><br></br>
      <Card >
        <Table
        size='small'
        className='custom-table-wrapper'
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
          <CompositionForm key={Date.now()}
            updateData={updateComposition}
            isUpdate={true}
            compositionData={selectedcompositionData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default CompositionGrid
