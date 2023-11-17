import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Checkbox, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import {  ItemTypeDto } from '@project-management-system/shared-models';
import {  ItemTypeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import ItemTypeForm from './item-type-form';

/* eslint-disable-next-line */
export interface ItemTypeProps {}

export function ItemTypeView(
  props: ItemTypeProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const Service = new ItemTypeService();
  const [selectedItemTypeData, setSelectedItemTypeData] = useState<any>(undefined);
  const [ItemTypeData, setItemTypeData] = useState<ItemTypeDto[]>([]);

  useEffect(() => {
    getAllItemType();
  },[]);

  const getAllItemType = () => {
    Service.getAllItemType().then(res =>{
      console.log(res,'asdfghj')
      if(res.status){
        setItemTypeData(res.data);
      }else{
        if(res.status) {
            setItemTypeData([]);
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
        setItemTypeData([]);
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

  const deleteItemType = (Data:ItemTypeDto) => {
    Data.isActive=Data.isActive?false:true;
    Service.ActivateorDeactivateItemType(Data).then(res => { console.log(res);
      if (res.status) {
        getAllItemType();
        message.success(res.internalMessage, 2);
      } else {
        if (res.status) {
          message.error(res.internalMessage, 2);
        } 
      }
    }).catch(err => {
      message.error(err.message, 2);
    })
  }

  const updateItem = (Data: ItemTypeDto) => {
    Service.updateItemType(Data).then(res => { console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        getAllItemType();
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

  const openFormWithData=(viewData: ItemTypeDto)=>{
    setDrawerVisible(true);
    setSelectedItemTypeData(viewData);

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
      title:<div style={{ textAlign: 'center' }}>Division</div> ,
      dataIndex: 'divisionName',
      //  responsive: ['lg'],
      sorter: (a, b) => a.divisionName.localeCompare(b.divisionName),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('divisionName')
    },
   
    {
      title:<div style={{ textAlign: 'center' }}>Item Type</div> ,
      dataIndex: 'itemType',
      //  responsive: ['lg'],
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemType')
    },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
       render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
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
      filterMultiple: false,
      
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
              <Popconfirm onConfirm={e =>{deleteItemType(rowData);}}
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
    <Card title={<span >Item Type</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={<Link to = "/masters/item-type-form/item-type-form"  ><span><Button type={'primary'} >New </Button> </span></Link>} >
     <br></br>
      <Row gutter={40}>
      <Col>
          <Card title={'Total Item Type : ' + ItemTypeData.length} style={{textAlign: 'left', width: 290, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + ItemTypeData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + ItemTypeData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> 
          <br></br>
          <Table

          // rowKey={record => record.productId}
          columns={columnsSkelton}
          dataSource={ItemTypeData}
          pagination={{
            pageSize:50,
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
              <ItemTypeForm key={Date.now()}
                updateData={updateItem}
                isUpdate={true}
                itemtypeData={selectedItemTypeData }
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default ItemTypeView;
