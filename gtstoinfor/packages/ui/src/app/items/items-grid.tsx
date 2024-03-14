
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert, Checkbox, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
// import { useIntl } from 'react-intl';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ItemsDto } from '@project-management-system/shared-models';
import { ItemsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemsForm from './items-form';
import axios from 'axios';


export interface ItemsGridProps {

 }

export const ItemsGrid = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<ItemsDto[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(1);

  const columns = useState('');
  const navigate = useNavigate();
  const [currencySymbols, setCurrencySymbols] = useState({});

  // const { formatMessage: fm } = useIntl();
  const service = new ItemsService();

  /**
   * used for column filter
   * @param dataIndex column data index
   */
  useEffect(() => {getAllItems();}, [])

  
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
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',align:'center',
      width: '50px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
    },
 
    //  {
    //   title: <div style={{textAlign:'center'}}>Currency Name</div>,
    //   dataIndex: 'currencyName',
    //   width: '90px',align :'left',
    //   sorter: (a, b) => a.currencyName.localeCompare(b.currencyName),
    //   sortDirections: ['ascend', 'descend'],
    //   ...getColumnSearchProps('currencyName'),
    //   render: (text, record) => (
    //     <span>
    //      <strong>{currencySymbolMapping[record.currencyName]}</strong>  -  {text}
    //     </span>
    //   ),
    // }, this can be used for only concatenated values
    {
      title:'Item',
      dataIndex: 'item',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.item.localeCompare(b.item),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('item'),
     
    },
   
    {
      title: 'Consumption Required',
      dataIndex: 'consumptionrequired',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.consumptionrequired.localeCompare(b.consumptionrequired),
      sortDirections: ['ascend', 'descend'],
      // ...getColumnSearchProps('consumptionrequired'),
     
    },
    
    {
      title: 'Consumption ',
      dataIndex: 'consumption',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.consumption.localeCompare(b.consumption),
      sortDirections: ['ascend', 'descend'],
      // ...getColumnSearchProps('consumption'),
     
    },
    
    {
      title: 'Wastage',
      dataIndex: 'wastage',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.wastage.localeCompare(b.wastage),
      sortDirections: ['ascend', 'descend'],
      // ...getColumnSearchProps('wastage'),
     
    },
    
    {
      title: 'MOQ',
      dataIndex: 'moq',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.moq.localeCompare(b.moq),
      sortDirections: ['ascend', 'descend'],
      // ...getColumnSearchProps('moq'),
     
    },
    
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive', align:'center',
    //   width: '90px',

    //   render: (isActive, rowData) => (
    //     <>
    //       {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>}
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
    //   onFilter: (value, record) => record.isActive === value,
    //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //     <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
    //       <Checkbox
    //         checked={selectedKeys.includes(true)}
    //         onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
    //       >
    //         <span style={{color:'green'}}>Active</span>
    //       </Checkbox>
    //       <Checkbox
    //         checked={selectedKeys.includes(false)}
    //         onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
    //       >
    //         <span style={{color:'red'}}>Inactive</span>
    //       </Checkbox>
    //       <div className="custom-filter-dropdown-btns" >
    //       <Button  onClick={() => clearFilters()} className="custom-reset-button">
    //           Reset
    //         </Button>
    //         <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
    //           OK
    //         </Button>
          
    //       </div>
    //     </div>
    //   ),

    // },
    // {
    //   title: `Action`,
    //   dataIndex: 'action',    align:'center',  width: '120px',
    //   render: (text, rowData) => (
    //     <span>
    //       <EditOutlined className={'editSamplTypeIcon'} type="edit"
    //         onClick={() => {
    //           if (rowData.isActive) {
    //             openFormWithData(rowData);
    //           } else {
    //             AlertMessages.getErrorMessage('You Cannot Edit Deactivated Currencies');
    //           }
    //         }}
    //         style={{ color: '#1890ff', fontSize: '14px' }}
    //       />

    //       <Divider type="vertical" />
    //       <Popconfirm onConfirm={e => { deleteVariant(rowData); }}
    //         title={
    //           rowData.isActive
    //             ? 'Are you sure to Deactivate this Currency ?'
    //             : 'Are you sure to Activate this Currency ?'
    //         }
    //       >
    //         <Switch size="default"
    //           className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
    //           checkedChildren={<RightSquareOutlined type="check" />}
    //           unCheckedChildren={<RightSquareOutlined type="close" />}
    //           checked={rowData.isActive}
    //         />

    //       </Popconfirm>
    //     </span>
    //   )
    // }
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

  // const getAllCurrencys = async (params = {}, sort, filter) => {
  //   const res = await service.getAllCurrencies()
  //   if (res.status) {
  //     return { data: res.data, sucess: true, total: res.data.length }
  //   } else {
  //     return { data: [], sucess: false, total: 0 }
  //   }
  // }

  const getAllItems= () => {
    service.getAllItems().then(res => {
      if (res.status) {
        setVariantData(res.data)
      }
  })
}


 
  const closeDrawer = () => {
    setDrawerVisible(false);
  }


  const openFormWithData = (itemData: ItemsDto) => {
    setDrawerVisible(true);
    setSelectedVariant(itemData);
  }


  const saveVariant = (variantData: ItemsDto) => {
    variantData.itemId = 0;
    // variantData.isActive=true;
    service.createItems(variantData).then(res => {
      if (res.status) {
        // AlertMessages.getSuccessMessage('Currency Created Successfully');
        message.success(res.internalMessage)

        // getAllCurrencys();
      } else {
        message.error(res.internalMessage)

        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  /**
   * 
   * @param variantData 
   */
  // const updateCurrency = (currencyData: CurrencyDto) => {
  //   currencyData.updatedUser = JSON.parse(localStorage.getItem('username'))
  //   service.updateCurrency(currencyData).then(res => {
  //     console.log(res);
  //     if (res.status) {
  //       AlertMessages.getSuccessMessage('Updated Successfully');
  //       window.location.reload();
  //       // getAllCurrencys();
  //       setDrawerVisible(false);
  //     } else {
  //       // if (res.intlCode) {
  //       //   AlertMessages.getErrorMessage(res.internalMessage);
  //       // } else {
  //       AlertMessages.getErrorMessage(res.internalMessage);
  //       // }
  //     }
  //   }).catch(err => {
  //     AlertMessages.getErrorMessage(err.message);
  //   })
  // }
  /**
   * 
   * @param CurrencyViewData 
   */
  // const deleteVariant = (CurrencyViewData: CurrencyDto) => {
  //   CurrencyViewData.isActive = CurrencyViewData.isActive ? false : true;
  //   service.ActivatedeActivateCurrency(CurrencyViewData).then(res => {
  //     console.log(res);
  //     if (res.status) {
  //       // getAllCurrencys();
  //       // AlertMessages.getSuccessMessage('Success');
  //       message.success(res.internalMessage)
  //     } else {
  //       // if (res.intlCode) {
  //       //   AlertMessages.getErrorMessage(res.internalMessage);
  //       // } else {
  //       // AlertMessages.getErrorMessage(res.internalMessage);
  //       message.error(res.internalMessage)

  //       // }
  //     }
  //   }).catch(err => {
  //     AlertMessages.getErrorMessage(err.message);
  //   })
  // }

  return (
<Card title='Items' extra={<span><Button onClick={()=>navigate('/masters/items-form')} type={'primary'}>New</Button></span>}>
      <>
      {/* <Row gutter={24}>
         <Col span={4}></Col>
        <Col span={5}>
        <Alert type='success' message={'Total Currencies: ' + variantData.length} style={{fontSize:'15px'}} /> */}
          {/* <Card title={'Total Currencies: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
        {/* </Col>
        <Col span={5}> */}
          {/* <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          {/* <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}> */}
          {/* <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          {/* <Alert type='info' message={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col> */}
        {/* <Col>
        <span><Button onClick={() => navigate('/global/currencies/currency-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
      {/* </Row> */}
      <br></br>
      <Card >
        {/* <GetCumulatives cumulativeColumns={cumulativeSkelton} data={variantData}/> */}
        {/* <ProTable
          request={getAllCurrencys}
          bordered size='small'
          cardBordered
          editable={{
            type: 'multiple',
          }}
          // cardProps={{
          //   extra: <span><Button onClick={() => navigate('/global/currencies/currency-form')}
          //     type={'primary'}>New</Button></span>
          // }}
          search={false} headerTitle={'Currencies'}
          columns={columnsSkelton}

        /> */}

<Table className="custom-table-wrapper" 
columns={columnsSkelton} dataSource={variantData} size='small'
            pagination={{
                pageSize: 100, 
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                }
            }}
            />
        </Card>
      </>
      </Card>
  );
}


export default ItemsGrid;