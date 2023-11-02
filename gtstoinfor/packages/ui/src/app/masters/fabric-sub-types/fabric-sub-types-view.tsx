import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import { FabricSubTypeDto } from '@project-management-system/shared-models';
import { FabricSubtypeservice } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import {FabricSubTypeForm} from './fabric-sub-type-form';

/* eslint-disable-next-line */
export interface FabricSubTypeProps {}

export function FabricSubTypeGrid(
  props: FabricSubTypeProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
let navigate = useNavigate()
  const fabricsubTypeService = new FabricSubtypeservice();
  const [selectedFabricSubTypeData, setSelectedFabricSubTypeData] = useState<any>(undefined);
  const [FabricSubTypeData, setFabricSubTyepData] = useState<FabricSubTypeDto[]>([]);

  useEffect(() => {
    getAllFabricSubType();
  },[]);

  const getAllFabricSubType = () => {
    fabricsubTypeService.getAllFabricSubType().then(res =>{
      console.log(res,'asdfghj')
      if(res.status){
        setFabricSubTyepData(res.data);
      }else{
        if(res.status) {
          setFabricSubTyepData([]);
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setFabricSubTyepData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const getColumnSearchProps = (dataIndex:string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={ searchInput }
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
        <Button 
        onClick={() =>{
          handleReset(clearFilters)
          setSearchedColumn(dataIndex)
          confirm({closeDropdown:true})
        }
      }
        size="small" style={{ width: 90 }}>
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
      if (visible) {    setTimeout(() => searchInput.current.select());   }
    },
    render: text =>
      text ?(
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) :text
      )
      : null
     
  });
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const deleteFabric = (Data:FabricSubTypeDto) => {
    Data.isActive=Data.isActive?false:true;
    fabricsubTypeService.activateOrDeactivateFabricSubType(Data).then(res => { console.log(res);
      if (res.status) {
        getAllFabricSubType();
        AlertMessages.getSuccessMessage('Success'); 
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateItem = (Data: FabricSubTypeDto) => {
    fabricsubTypeService.updateFabricSubType(Data).then(res => { console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        getAllFabricSubType();
        setDrawerVisible(false);
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
   }

  const closeDrawer=()=>{
    setDrawerVisible(false);
  }
  
  const onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }

  const openFormWithData=(viewData: FabricSubTypeDto)=>{
    setDrawerVisible(true);
    setSelectedFabricSubTypeData(viewData);

  }

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'Fabric Type',
      dataIndex: 'fabricTypeName',
      //  responsive: ['lg'],
      sorter: (a, b) => a.fabricTypeName.localeCompare(b.fabricTypeName),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('fabricTypeName')
    },
   
    {
      title: 'Fabric Sub-Type',
      dataIndex: 'fabricSubTypeName',
      //  responsive: ['lg'],
      sorter: (a, b) => a.fabricSubTypeName.localeCompare(b.fabricSubTypeName),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('fabricSubTypeName')
    },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
       render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
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
      onFilter: (value, record) => 
      {
        // === is not work
        return record.isActive === value;
      },
      
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        // rowData.fabricSubTypeName.trim()=='Packing Material' || rowData.fabricSubTypeName.trim()=='Raw Material' ? <span> </span>:
        <span>         
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Deactivated Fabric SUbType');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteFabric(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate  ?'
                :  'Are you sure to Activate  ?'
            }
          >  
            
            
               <Switch  size="default"                
                className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                checked={rowData.isActive}
              />
              
            
            
          </Popconfirm>  
        </span>
      )
    }
  ];

  return (
    <Card title="Fabric Sub-Type" extra={<span><Button onClick={()=> navigate('/masters/fabric-sub-type-form/fabric-sub-type-form"')} type={'primary'}>New</Button></span>}> 
     <br></br>
      <Row gutter={40}>
      <Col>
          <Card title={'Total Fabric Sub Type : ' + FabricSubTypeData.length} style={{textAlign: 'left', width: 290, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + FabricSubTypeData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + FabricSubTypeData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> 
          <br></br>
          <Table
          // rowKey={record => record.productId}
          rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

          columns={columnsSkelton}
          dataSource={FabricSubTypeData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          scroll={{x:true}}
          bordered />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
             <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <FabricSubTypeForm key={Date.now()}
                updateData={updateItem}
                isUpdate={true}
                fabricsubtypeData={selectedFabricSubTypeData }
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default FabricSubTypeGrid;
