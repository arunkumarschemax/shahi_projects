 



import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   CompositionService, ItemCreationService, ItemsService, LiscenceTypeService } from '@project-management-system/shared-services';
import { CompositionDto, LiscenceTypesdDto } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemCreation from './item-creation';


const ItemCreationView = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ItemData, setItemData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedItemCreationData, setSelectedItemCreationData] = useState<any>(undefined);


  const service = new ItemCreationService();

  useEffect(() => {
    getAllfgItemViewData();
  }, [])

    const getAllfgItemViewData= () => {
    service.getAllFgItems().then(res => {
      if (res.status) {
        setItemData(res.data);
      } else
       {
        setItemData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setItemData([]);
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
    setSelectedItemCreationData(viewData);
  }

  const DetailView = (rowData) => {

    navigate(`/materialCreation/item-creation-detail-view`,{state:rowData})
    
}

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      // width: '70px',
      
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
        title: "Style",
        dataIndex: "",
        // width:'60px',
    //     sorter: (a, b) => a.compositionCode?.localeCompare(b.compositionCode),
    //   ...getColumnSearchProps("compositionCode"),
      },
      {
        title: "Type",
        dataIndex: "itemTypeId",
      },
      {
        title: "Brand",
        dataIndex: "",
      },
      {
        title: "Category",
        dataIndex: "categoryId",
      },
      {
        title: "Item Group",
        dataIndex: "",
      },
      {
        title: "Responsible",
        dataIndex: "responsiblePersonId",
      },
      {
        title: "Approve",
        dataIndex: "approver",
      },
      {
        title: "Production Merchant",
        dataIndex: "productionMerchant",
      },
      {
        title: "Sales Person",
        dataIndex: "salePersonId",
      },
      {
        title: "Basic UOM",
        dataIndex: "uom",
      },
      {
        title: "Currency",
        dataIndex: "currency",
      },
      {
        title: "Sales Price",
        dataIndex: "salePrice",
      },
      {
        title: "Target Currency",
        dataIndex: "targetCurrency",
      },
      {
        title: "Total Order Qty",
        dataIndex: "orderQty",
      },
      {
        title: "Order Confirmation Date",
        dataIndex: "orderConfirmedDate",
      },
    {
      title: `Action`,
      dataIndex: 'action',
      render: (text, rowData) => {
        return( <span>
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
            <Tooltip placement="top" title="Detail View">
                    <Button type="link" onClick={() => DetailView(rowData)}>
                      <EyeOutlined type="view" />
                    </Button>
                  </Tooltip>
          </span>)
        
    }
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
      <Card title={<span >Item Creation</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/item-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
        <Table
         size='middle'
        rowKey={record => record}
        className='custom-table-wrapper'
          columns={columnsSkelton}
          dataSource={ItemData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x: 'max-content'}}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <ItemCreation key={Date.now()}
            // updateData={updateComposition}
            
            isUpdate={true}
            // itemCreationData={selectedcompositionData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default ItemCreationView
