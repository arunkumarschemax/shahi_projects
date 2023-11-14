
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Checkbox, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
// import { useIntl } from 'react-intl';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import AlertMessages from '../../common/common-functions/alert-messages';
import { SampleTypesDto, SampleTypesRequest } from '@project-management-system/shared-models';
import { SampleTypesService } from '@project-management-system/shared-services';
import SampleTypeForm from './sample-type-form';

/* eslint-disable-next-line */
export interface SampleTypesGridProps { }

export const SampleTypesGrid = (props: SampleTypesGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [Data, setData] = useState<SampleTypesDto[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()

  const service = new SampleTypesService();

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

  const onAddSampleSubType = (rowData) => {
    navigate('/masters/sampleSubTypes/sampleSubTypes-form',{state:{id:rowData.sampleTypeId}})
  }

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title:<div style={{textAlign:'center'}}>Sample Type</div>,
      dataIndex: "sampleType",
        // sorter: (a, b) => a.sampleType.localeCompare(b.sampleType),
        // sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps("sampleType"),
      },
    {
      title: 'Status',
      dataIndex: 'isActive',
      align:'center',

      // ...getColumnSearchProps("isActive"),
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
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
      align:'center',

      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated Sample Type');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteSample(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Sample Type ?'
                : 'Are you sure to Activate this Sample Type ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />

          </Popconfirm>
          <Divider type='vertical'/>
          <Tooltip title={'Add Sub Type'}>

          <Button onClick={() => onAddSampleSubType(rowData)}>Add</Button>
          </Tooltip>
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

  useEffect(() => {getAllSampleTypes();}, [])

  const getAllSampleTypes= () => {
    service.getAllSampleTypes().then(res => {
      if (res.status) {setData(res.data);
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setData([]);
    })
  }


  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  //TO open the form for updation
  const openFormWithData = (sampleTypeViewData: SampleTypesDto) => {
    setDrawerVisible(true);
    setSelectedVariant(sampleTypeViewData);
  }


  /**
   * 
   * @param variantData 
   */
  const updateOperationGroup = (sampleTypeData: SampleTypesDto) => {
    console.log(sampleTypeData,'------sampleTypeData')
    sampleTypeData.updatedUser = JSON.parse(localStorage.getItem('username'))
    service.updateSampleType(sampleTypeData).then(res => {
      console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        setDrawerVisible(false);
        getAllSampleTypes()
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
  /**
   * 
   * @param CurrencyViewData 
   */
  const deleteSample = (data: SampleTypesRequest) => {
    const req = new SampleTypesRequest(data.sampleTypeId,'admin',data.versionFlag)
    req.isActive = data.isActive ? false : true;
    service.activateOrDeactivateSampleTypes(req).then(res => {
      console.log(res);
      if (res.status) {
        getAllSampleTypes();
        AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  return (

    <Card title='Sample Types' extra={<span><Button onClick={() => navigate('/masters/sampleTypes/sampleTypes-form')} type={'primary'}>New</Button></span>}>
        <br/>
      <Row gutter={40}>
      <Col span={4}></Col>
        <Col span={6}>
        <Alert type='success' message={'Total Sample Types: ' + Data.length} style={{fontSize:'15px'}} />
          {/* <Card title={'Total Sample Types: ' + Data.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
        </Col>
        <Col span={5}>
        <Alert type='warning' message={'Active: ' + Data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
          {/* <Card title={'Active: ' + Data.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
        </Col>
        <Col span={5}>
        <Alert type='info' message={'In-Active: ' + Data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
          {/* <Card title={'In-Active: ' + Data.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
        </Col>
      </Row><br></br>
        <Table
        size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={Data}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true}}
          onChange={onChange}
          bordered />
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <SampleTypeForm key={Date.now()}
            updateDetails={updateOperationGroup}
            isUpdate={true}
            // saveItem={saveVariant}
            sampleTypeData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
      </Card>
  );
}


export default SampleTypesGrid;