import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Alert, Space } from 'antd';
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
        console.log(res);
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
    hierarchyLevelService.activateOrDeactivatehierachyLevel(HierarchyLevelData).then(res => {console.log(res);
    if(res.status){
      getAllHierarchyLevelData();
      AlertMessages.getSuccessMessage('Success');
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
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
      },
      {
        title: "Hierarchy Level",
        dataIndex: "hierarchyLevel",
        sorter: (a, b) => a.hierarchyLevel.localeCompare(b.hierarchyLevel),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps("hierarchyLevel"),
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        ...getColumnSearchProps('isActive'),
        sorter: (a, b) => a.HierarchyLevelCode.localeCompare(b.HierarchyLevelCode),
        sortDirections: ["ascend", "descend"],
        render: (isActive, rowData) => (
          <>
            {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
            
          </>
        ),
      
        
      },
      {
        title: `Action`,
        dataIndex: "action",
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
    console.log('params', pagination, filters, sorter, extra);
  } 

  return (
    <Card title='HierarchyLevel' 
   extra={<span><Button onClick={() => navigate('/masters/hierarchyLevel/hierarchyLevel-form')} type={'primary'}>New</Button></span>}
    >

     <br></br>
     <Row gutter={24} >
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>

          <Card title={'Total HierarchyLevel: ' + HierarchyLevelData.length} style={{textAlign: 'left', height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
    
    
          <Col>
           <Card title={'Active: ' + HierarchyLevelData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + HierarchyLevelData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row>
          <br></br>
          <Table
                  rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}
size='small'
          rowKey={record => record.HierarchyLevelId}
          columns={columnsSkelton}
          dataSource={HierarchyLevelData}
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
