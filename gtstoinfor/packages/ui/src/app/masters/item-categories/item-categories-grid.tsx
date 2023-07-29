import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { ItemCategoryService } from '@project-management-system/shared-services';
import { ItemCategoriesDto } from '@project-management-system/shared-models';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

/* eslint-disable-next-line */
export interface ItemCategoriesGridProps {}

export function ItemCategoriesGrid(
  props: ItemCategoriesGridProps
) {   
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const itemcategoryService = new ItemCategoryService();
  const [selectedItemcategoryata, setSelectedItemcategoryData] = useState<any>(undefined);
  const [itemcategoryData, setItemcategoryData] = useState<ItemCategoriesDto[]>([]);

  const openFormWithData=(viewData: ItemCategoriesDto)=>{
    setDrawerVisible(true);
    setSelectedItemcategoryData(viewData);

  }
  useEffect(() => {
    getAll();
  }, []);
  const getAll= () => {
    itemcategoryService.getAll().then(res => {
      if (res.status) {
        setItemcategoryData(res.data);
      } else {
        if (res.status) {
          setItemcategoryData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setItemcategoryData([]);
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

  const deleteItem = (Data:ItemCategoriesDto) => {
    Data.isActive=Data.isActive?false:true;
    itemcategoryService.activatedeActivate(Data).then(res => { console.log(res);
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
      dataIndex: 'itemCategory',
      //  responsive: ['lg'],
      sorter: (a, b) => a.itemCategory.localeCompare(b.itemCategory),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemCategory')
    },
    {
    title: 'Item Category Code',
      dataIndex: 'itemCategoryCode',
      responsive: ['sm'],
      sorter: (a, b) => a.itemCategoryCode.localeCompare(b.itemCategoryCode),
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('itemCategoryCode')
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      responsive: ['sm'],
      sorter: (a, b) => String(a.remarks).localeCompare(String(b.remarks)),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('remarks')
    },
   
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive',
    //    render: (isActive, rowData) => (
    //     <>
    //       {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
    //     </>
    //   ),
    //   filters: [
    //     {
    //       text: 'Active',
    //       value: true,
    //     },
    //     {
    //       text: 'InActive',
    //       value: false,
    //     },
    //   ],
    //   filterMultiple: false,
    //   onFilter: (value, record) => 
    //   {
    //     // === is not work
    //     return record.isActive === value;
    //   },
      
    // },
    // {
    //   title:`Action`,
    //   dataIndex: 'action',
    //   render: (text, rowData) => (
    //     rowData.itemCategory.trim()=='Packing Material' || rowData.itemCategory.trim()=='Raw Material' ? <span> </span>:
    //     <span>         
    //         <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
    //           onClick={() => {
    //             if (rowData.isActive) {
    //               openFormWithData(rowData);
    //             } else {
    //               AlertMessages.getErrorMessage('You Cannot Edit Deactivated Product');
    //             }
    //           }}
    //           style={{ color: '#1890ff', fontSize: '14px' }}
    //         />
          
    //       <Divider type="vertical" />
    //           <Popconfirm onConfirm={e =>{deleteItem(rowData);}}
    //         title={
    //           rowData.isActive
    //             ? 'Are you sure to Deactivate  ?'
    //             :  'Are you sure to Activate  ?'
    //         }
    //       >  
            
            
    //            <Switch  size="default"                
    //             className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
    //             checkedChildren={<RightSquareOutlined type="check" />}
    //             unCheckedChildren={<RightSquareOutlined type="close" />}
    //             checked={rowData.isActive}
    //           />
              
            
            
    //       </Popconfirm>  
        // </span>
      // )
    // }
  ];


  const updateItem = (Data: ItemCategoriesDto) => {
    itemcategoryService.update(Data).then(res => { console.log(res);
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




  return (
    <Card title={<span>Item Categories</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    // extra={<Link to = "/item-category-form"  >
    //   <span style={{color:'white'}} >
    //     <Button className='panel_button' >Create </Button>
    //     </span>
    //     </Link>} 
      >
     {/* <br></br> */}
      {/* <Row gutter={40}>
      <Col>
          <Card title={'Total Item Categories : ' + itemcategoryData.length} style={{textAlign: 'left', width: 250, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + itemcategoryData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + itemcategoryData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row>  */}
          {/* <br></br> */}
          <Table
          // rowKey={record => record.productId}
          columns={columnsSkelton}
          dataSource={itemcategoryData}
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
              {/* <ItemCategoriesForm key={Date.now()}
                updateDetails={updateItem}
                isUpdate={true}
                itemcategoryData={selectedItemcategoryata }
                closeForm={closeDrawer} /> */}
            </Card> 
          </Drawer>
     </Card>
  );
}

export default ItemCategoriesGrid;
