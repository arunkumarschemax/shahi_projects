import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PriceListService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ColumnProps, ColumnsType } from 'antd/es/table';
import PriceListForm from './price-list-form';
import { PriceListDto } from '@project-management-system/shared-models';


export interface PriceListView { }

export const PriceListGrid = (props: PriceListView) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [priceList, setPriceList] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedPriceListData, setSelectedPriceListeData] = useState<any>(undefined);
  const priceService = new PriceListService()

  useEffect(()=>{
    getPriceList()
  },[])

  const getPriceList= () => {
    priceService.getAllPriceList().then(res => {
      if (res.status) {
        setPriceList(res.data);
      } else
       {
        setPriceList([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setPriceList([]);
    })
  }
 
  const deletePriceList = (Data: PriceListDto) => {
    Data.isActive = Data.isActive? false : true;
    priceService.ActivateOrDeactivatePriceList(Data).then(res => {
    if(res.status){
      getPriceList();
      // message.success("Status Changed")

    }else {
      // message.error("Status Not Changed")
    }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

 
  const updatePriceList = (req: PriceListDto) => {
    req.updatedUser = JSON.parse(localStorage.getItem('username'));
    priceService.updatePriceList(req)
      .then(res => {
        if (res.status) {
          // console.log(res,' after sucessesfully updateed daata')
          AlertMessages.getSuccessMessage('Updated Successfully');
          setDrawerVisible(false);
          getPriceList();
        } else {
          // AlertMessages.getErrorMessage(res.internalMessage);
          message.error("Already this Combination Exist,Please check it once")
        }
      })
      .catch(err => {
        AlertMessages.getErrorMessage(err.message);
      });
  }
  
  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const openFormWithData=(viewData: PriceListDto)=>{
    setDrawerVisible(true);
    setSelectedPriceListeData(viewData);
    // console.log(selectedPriceListData)
    // console.log('selectedOperation')
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




  const columns : ColumnProps<any> [] = [
    {
      title: 'S No',
      key: 'sno',
      // width: '70px',
      
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
        title: "Style",
        dataIndex: "style",
       
      },
      {
        title: "Year",
        dataIndex: "year",
        align:"center",
       
      },
      {
        title: "Destination",
        dataIndex: "destination",
        
      },
      {
        title: "Season Code",
        dataIndex: "seasonCode",
       
      },
      {
        title: "Currency",
        dataIndex: "currency",
       
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
         // width:'80px',
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
        onFilter: (value, record) => {
          // === is not work
          return record.isActive === value;
        },
  
      },
      
      {
        title:`Action`,
        dataIndex: 'action',
        render: (text, rowData) => (
          <span>         
              <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                onClick={() => {
                  if (rowData.isActive) {
                    openFormWithData(rowData);
                    console.log(rowData,"rowdata")
                  } else {
                    AlertMessages.getErrorMessage('You Cannot Edit Deactivated PriceList');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />
            
            <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deletePriceList(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate PriceList ?'
                  :  'Are you sure to Activate PriceList ?'
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  


  return (
      <>
      <Card title={<span >Price List</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/pricelist/price-list-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      
      <Card >
        <Table
        rowKey={record => record}
          columns={columns}
          dataSource={priceList}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true}}
          onChange={onChange}
          bordered />
          
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <PriceListForm key={Date.now()}
            updateData={updatePriceList}
            isUpdate={true}
            Data={selectedPriceListData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default PriceListGrid

