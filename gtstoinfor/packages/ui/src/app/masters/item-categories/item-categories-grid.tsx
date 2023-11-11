import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Modal } from 'antd';
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
  const [remarks,setRemarks] = useState<string>('')
  const [remarkModal,setRemarkModal] = useState<boolean>(false)


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

  const handleTextClick = (remarks) => {
    setRemarks(remarks)
    setRemarkModal(true)
}

const onRemarksModalOk = () => {
  setRemarkModal(false)
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
      render:(text,record) => {
          return(
              <>
              {record.remarks?.length > 30 ? (<><Tooltip title='Cilck to open full remarks'><p><span onClick={() => handleTextClick(record.remarks)} style={{ cursor: 'pointer' }}>
                          {record.remarks.length > 30 ? `${record.remarks?.substring(0, 30)}....` : record.remarks}
                      </span></p></Tooltip></>) : (<>{record.remarks}</>)}
              </>
          )
      }

  },
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
          <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{remarks}</p>
                </Card>
            </Modal>
     </Card>
  );
}

export default ItemCategoriesGrid;
