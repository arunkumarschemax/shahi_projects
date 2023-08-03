import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { ItemSubCategoriesDto } from '@project-management-system/shared-models';
import { ItemSubCategoryService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import ItemSubCategoriesForm from './item-sub-categories-form';

/* eslint-disable-next-line */
export interface ItemSubCategoriesGridProps {}

export function ItemSubCategoriesGrid(
  props: ItemSubCategoriesGridProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const subCategoryService = new ItemSubCategoryService();
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<any>(undefined);
  const [subCategoryData, setSubCategoryData] = useState<ItemSubCategoriesDto[]>([]);

  useEffect(() => {
    getAll();
  },[]);

  const getAll = () => {
    subCategoryService.getAll().then(res =>{
      console.log(res,'asdfghj')
      if(res.status){
        setSubCategoryData(res.data);
      }else{
        if(res.status) {
          setSubCategoryData([]);
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setSubCategoryData([]);
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

  const deleteItem = (Data:ItemSubCategoriesDto) => {
    Data.isActive=Data.isActive?false:true;
    subCategoryService.activateOrDeactivateItemSubCategory(Data).then(res => { console.log(res);
      if (res.status) {
        getAll();
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

  const updateItem = (Data: ItemSubCategoriesDto) => {
    subCategoryService.update(Data).then(res => { console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        getAll();
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

  const openFormWithData=(viewData: ItemSubCategoriesDto)=>{
    setDrawerVisible(true);
    setSelectedSubCategoryData(viewData);

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
      title: 'Item Category',
      dataIndex: 'itemCategoryName',
      //  responsive: ['lg'],
      sorter: (a, b) => a.itemCategoryName.localeCompare(b.itemCategoryName),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemCategoryName')
    },
   
    {
      title: 'Item Sub Category',
      dataIndex: 'itemSubCategory',
      //  responsive: ['lg'],
      sorter: (a, b) => a.itemSubCategory.localeCompare(b.itemSubCategory),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemSubCategory')
    },
    {
    title: 'Item Sub Category Code',
      dataIndex: 'itemSubCategoryCode',
      responsive: ['sm'],
      sorter: (a, b) => a.itemSubCategoryCode.localeCompare(b.itemSubCategoryCode),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemSubCategoryCode')
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      responsive: ['sm'],
      sorter: (a, b) => String(a.remarks).localeCompare(String(b.remarks)),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('remarks')
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
        rowData.itemSubCategory.trim()=='Packing Material' || rowData.itemSubCategory.trim()=='Raw Material' ? <span> </span>:
        <span>         
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Deactivated Category');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteItem(rowData);}}
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
    <Card title={<span >Item Sub Categories</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={<Link to = "/masters/item-sub-categories/item-sub-categories-form"  ><span><Button type={'primary'} >New </Button> </span></Link>} >
     <br></br>
      <Row gutter={40}>
      <Col>
          <Card title={'Total Item Sub Categories : ' + subCategoryData.length} style={{textAlign: 'left', width: 290, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + subCategoryData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + subCategoryData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> 
          <br></br>
          <Table
          // rowKey={record => record.productId}
          columns={columnsSkelton}
          dataSource={subCategoryData}
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
              <ItemSubCategoriesForm key={Date.now()}
                updateData={updateItem}
                isUpdate={true}
                subCategoryData={selectedSubCategoryData }
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default ItemSubCategoriesGrid;
