import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Alert, Space } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import { TimeoutError } from 'rxjs';
import AlertMessages from '../../common/common-functions/alert-messages';
import { Link, useNavigate } from 'react-router-dom';
import { ProcurmentGroupDto, ProcurmentGroupRequest } from '@project-management-system/shared-models';
import ProcurmentGroupForm from './procurmentGroup-form';
import { ProcurmentGroupService } from '@project-management-system/shared-services';
/* eslint-disable-next-line */
export interface ProcurmentGroupGridProps {}

export function ProcurmentGroupGrid(
  props: ProcurmentGroupGridProps
) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ProcurmentGroupData, setProcurmentGroupData] = useState<ProcurmentGroupDto[]>([]);
  const [selectedProcurmentGroup, setSelectedProcurmentGroup] = useState<ProcurmentGroupDto>();

  const procurmentGroupService = new ProcurmentGroupService();

  useEffect(() => {
    getAllProcurmentGroupData();
  },[]);
  const navigate = useNavigate()
  /**
   * 
   */
  const getAllProcurmentGroupData = () => {
    
    procurmentGroupService.getAllProcurmentGroup().then(res => {
      if(res.status) {
        setProcurmentGroupData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      // setProcurmentGroupData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateProcurmentGroup = (ProcurmentGroupData:ProcurmentGroupRequest) => {
  procurmentGroupService.updateProcurmentGroup(ProcurmentGroupData).then(res => {
      console.log(res);
      if(res.status){
        getAllProcurmentGroupData();
        setDrawerVisible(false);
        AlertMessages.getSuccessMessage('Updated Successfully');
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
  
  const deleteProcurmentGroup = (ProcurmentGroupData: ProcurmentGroupRequest) => {
    ProcurmentGroupData.isActive = ProcurmentGroupData.isActive? false : true;
    procurmentGroupService.activateOrDeactivateProcurmentGroup(ProcurmentGroupData).then(res => {console.log(res);
    if(res.status){
      getAllProcurmentGroupData();
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
    const openFormWithData=(viewData: ProcurmentGroupDto)=>{
      setDrawerVisible(true);
      setSelectedProcurmentGroup(viewData);
      console.log(selectedProcurmentGroup)
      console.log('selectedProcurmentGroup')
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
        title: "Procurment Group Name",
        dataIndex: "procurmentGroup",
        sorter: (a, b) => a.procurmentGroup.localeCompare(b.procurmentGroup),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps("procurmentGroup"),
      },
     
      {
        title: 'Status',
        dataIndex: 'isActive',
        ...getColumnSearchProps('isActive'),
        sorter: (a, b) => a.ProcurmentGroupCode.localeCompare(b.ProcurmentGroupCode),
        sortDirections: ["ascend", "descend"],
        render: (isActive, rowData) => (
          <>
            {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
            
          </>
        ),
        // filters: [
        //   {
        //     text: 'Active',
        //     value: true,
        //   },
        //   {
        //     text: 'InActive',
        //     value: false,
        //   },
        // ],
        // filterMultiple: false,
        // onFilter: (value, record) => 
        // {
        //   // === is not work
        //   return record.isActive === value;
        // },
        
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
                deleteProcurmentGroup(rowData);
              }}
              title={
                rowData.isActive
                  ? "Are you sure to Deactivate Location ?"
                  : "Are you sure to Activate Location ?"
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
    <Card title='ProcurmentGroup' 
    extra={<span><Button onClick={() => navigate('/masters/pocurmentGroup/pocurmentGroup-form')} type={'primary'}>New</Button></span>}
    >

     <br></br>
     <Row gutter={24} >
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>

          <Card title={'Total ProcurmentGroup: ' + ProcurmentGroupData.length} style={{textAlign: 'left', height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          
          {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>
        <span><Button onClick={() => navigate('/masters/ProcurmentGroup/ProcurmentGroup-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
          <Col>
           <Card title={'Active: ' + ProcurmentGroupData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + ProcurmentGroupData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row>
          <br></br>
          <Table
                  rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

          rowKey={record => record.ProcurmentGroupId}
          columns={columnsSkelton}
          dataSource={ProcurmentGroupData}
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
              <ProcurmentGroupForm key={Date.now()}
                 ProcurmentGroupData = {selectedProcurmentGroup}
                 updateProcurmentGroup = {updateProcurmentGroup}
                 isUpdate = {true}
                 closeForm = {closeDrawer} />
            </Card>
          </Drawer>
     </Card>
  );
}

export default ProcurmentGroupGrid;
