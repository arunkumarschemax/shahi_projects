import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Alert, Space, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import { TimeoutError } from 'rxjs';
import AlertMessages from '../../common/common-functions/alert-messages';
import { Link, useNavigate } from 'react-router-dom';
import { HierachyLevelService } from '@project-management-system/shared-services';
import {  HierarchyLevelDto, HierarchyLevelRequest } from '@project-management-system/shared-models';
import HierarchyLevelForm from './hierarchy-level-form';



/* eslint-disable-next-line */
export interface HierarchyLevelGridProps {}

export function HierarchyLevelGrid(
  props: HierarchyLevelGridProps
) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [HierarchyLevelData, setHierarchyLevelData] = useState<HierarchyLevelDto[]>([]);
  const [selectedHierarchyLevel, setSelectedHierarchyLevel] = useState<HierarchyLevelDto>(undefined);

  const hierarchyLevelService = new HierachyLevelService();

  useEffect(() => {
    getAllHierarchyLevelData();
  },[]);
  const navigate = useNavigate()
  /**
   * 
   */
  const getAllHierarchyLevelData = () => {
    
    hierarchyLevelService.getAllhierachyLevel().then(res => {
      if(res.status) {
        setHierarchyLevelData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      // setHierarchyLevelData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateHierarchyLevel = (req:HierarchyLevelRequest) => {
    hierarchyLevelService.updatehierachyLevel(req).then(res => {
        if(res.status){
          getAllHierarchyLevelData();
          setDrawerVisible(false);
          AlertMessages.getSuccessMessage('Updated Successfully');
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
  
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
    }
  const deleteHierarchyLevel = (HierarchyLevelData: HierarchyLevelRequest) => {
    HierarchyLevelData.isActive = HierarchyLevelData.isActive? false : true;
    hierarchyLevelService.activateOrDeactivatehierachyLevel(HierarchyLevelData).then(res => {
    if(res.status){
      getAllHierarchyLevelData();
      AlertMessages.getSuccessMessage(res.internalMessage);
    }else {
      AlertMessages.getErrorMessage(res.internalMessage);

    }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  /**
   * used for column filter
   * @param dataIndex column data index
   */
  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>{
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({closeDropdown:true})
            }
               }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
         
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ?record[dataIndex]     
         .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()):false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
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

    //drawer related
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }
  
    //TO open the form for updation
    const openFormWithData=(viewData: HierarchyLevelDto)=>{
      setDrawerVisible(true);
      setSelectedHierarchyLevel(viewData);
       }
  
    const columnsSkelton: ColumnProps<any>[] = [
      {
        title: 'S No',
        align:'center',
     key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
      },
      {
        title: <div style={{textAlign:'center'}}>Hierarchy Name</div>,
        dataIndex: "hierarchyName",
        sorter: (a, b) => a.hierarchyName.localeCompare(b.hierarchyName),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps("hierarchyName"),
      },
      {
        title: <div style={{textAlign:'center'}}>Level1 & Code</div>,
        dataIndex: "level1",
        render:(val,data)=>{
          return (<span>{data.level1} - {data.level1Code}</span>)
        }
      
      },  {
        title: <div style={{textAlign:'center'}}>Level2 & Code</div>,
        dataIndex: "level2",
        render:(val,data)=>{
          return (<span>{data.level2} - {data.level2Code}</span>)
        }
      },  
      {
        title: <div style={{textAlign:'center'}}>Level3 & Code</div>,
        dataIndex: "level3",
        render:(val,data)=>{
          return (<span>{data.level3} - {data.level3Code}</span>)
        }
      },  {
        title: <div style={{textAlign:'center'}}>Level4 & Code</div>,
        dataIndex: "level4",
        render:(val,data)=>{
          return (<span>{data.level4} - {data.level4Code}</span>)
        }
      },  {
        title: <div style={{textAlign:'center'}}>Level5 & Code</div>,
        dataIndex: "level5",
        render:(val,data)=>{
          return (<span>{data.level5} - {data.level5Code}</span>)
        }
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        align:'center',
           render: (isActive, rowData) => (
          <>
            {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
            
          </>
        ),
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
        dataIndex: "action",
        align:'center',
        render: (text, rowData) => (
          <span>
            {rowData.isActive ? (
              <EditOutlined
                className={"editSamplTypeIcon"}
                type="edit"
                onClick={() => {
                  openFormWithData({...rowData});
                }}
                style={{ color: "#1890ff", fontSize: "14px" }}
              />
            ) : (
              ""
            )}
            <Divider type="vertical" />
            <Popconfirm
              onConfirm={(e) => {
                deleteHierarchyLevel(rowData);
              }}
              title={
                rowData.isActive
                  ? "Are you sure to Deactivate Hierarchy Level ?"
                  : "Are you sure to Activate Hierarchy Level ?"
              }
            >
              <Switch
                size="default"
                className={
                  rowData.isActive ? "toggle-activated" : "toggle-deactivated"
                }
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                checked={rowData.isActive}
              />
            </Popconfirm>
          </span>
        ),
      },
    ];

     /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange=(pagination, filters, sorter, extra)=> {
  } 

  return (
    <Card title='HierarchyLevel' 
   extra={<span><Button onClick={() => navigate('/masters/hierarchyLevel/hierarchyLevel-form')} type={'primary'}>New</Button></span>}
    >

     <br></br>
     <Row gutter={24} >
     <Col span={4}></Col>

     <Col span={6}>
      <Alert type='success' message={'Total Hierarchy Level: ' + HierarchyLevelData.length} style={{fontSize:'15px'}} />
        
          {/* <Card title={'Total HierarchyLevel: ' + HierarchyLevelData.length} style={{textAlign: 'left', height: 41,backgroundColor:'#bfbfbf'}}></Card> */}
          </Col>
          <Col span={5}>
          <Alert type='warning' message={'Active: ' + HierarchyLevelData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
           {/* <Card title={'Active: ' + HierarchyLevelData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card> */}
          </Col>
          <Col span={5}>
          <Alert type='info' message={'In-Active: ' + HierarchyLevelData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
           {/* <Card title={'In-Active :' + HierarchyLevelData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card> */}
          </Col>
          </Row>
          <br></br>
          <Table
size='small'
          rowKey={record => record.HierarchyLevelId}
          columns={columnsSkelton}
          dataSource={HierarchyLevelData}
          pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
          scroll = {{x:true,y:500}}
          onChange={onChange}
          bordered />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
            <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <HierarchyLevelForm
            hierarchyLevelData={selectedHierarchyLevel}
            isUpdate={true}
            closeForm={closeDrawer} 
            updateHierarchyLevel={updateHierarchyLevel}/>
            </Card>
          </Drawer>
     </Card>
  );
}

export default HierarchyLevelGrid;
