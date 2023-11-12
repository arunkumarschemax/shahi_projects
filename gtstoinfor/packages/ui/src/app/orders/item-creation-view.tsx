 



import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined, CloseSquareOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   BuyersService, BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, ItemCategoryService, ItemCreationService, ItemTypeService, ItemsService, LiscenceTypeService, MasterBrandsService, ROSLGroupsService, RangeService, SearchGroupService, StyleService, UomService } from '@project-management-system/shared-services';
import { BuyerExtrnalRefIdReq, CompositionDto, FgItemCreIdRequest, ItemCreFilterRequest, LiscenceTypesdDto, MenusAndScopesEnum, SubContractStatus } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemCreation from './item-creation';
import moment from 'moment';
import RolePermission from '../roles-permission';


const ItemCreationView = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const[itemName,setItemName] = useState<any[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ItemData, setItemData] = useState<any>('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedItemCreationData, setSelectedItemCreationData] = useState<any>(undefined);
   const service = new ItemCreationService();
  const brandservice = new MasterBrandsService();

  const [pageSize, setPageSize] = useState<number>(1);
         const [styledata,setStyle]=useState([])
         const[brand,setBrand]=useState([])
         const [form] = Form.useForm();
         const { Option } = Select;
         const { RangePicker } = DatePicker;
         const [userId, setUserId] = useState([]); 
    const [loginBuyer,setLoginBuyer] = useState<number>(0)
    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
  let userRef
  const buyerService = new BuyersService();





  useEffect(() => {
    getAllfgItemViewData();
    getAllBrands();
    getAllStyles();
    getAllItems();
    Login()
  }, [])

  const resetHandler = () => {
    form.resetFields();
    getAllfgItemViewData();

}
const Login = () =>{
  const req = new BuyerExtrnalRefIdReq
  if(role === MenusAndScopesEnum.roles.crmBuyer){
    req.extrnalRefId = externalRefNo
  }
  
  buyerService.getBuyerByRefId(req).then(res=>{
    if(res.status){
      setUserId(res.data)
setLoginBuyer(res.data.buyerId)  
    }
  })

}
const checkAccess = (buttonParam) => {
 
  const accessValue = RolePermission(null,MenusAndScopesEnum.Menus["Material Creation"],MenusAndScopesEnum.SubMenus["FG Items"],buttonParam)
  return !accessValue
}
    const getAllfgItemViewData= () => {
      const req = new ItemCreFilterRequest();
      if (form.getFieldValue('orderConfirmedDate') !== undefined) {
        req.confirmStartDate = (form.getFieldValue('orderConfirmedDate')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('orderConfirmedDate') !== undefined) {
        req.confirmEndDate = (form.getFieldValue('orderConfirmedDate')[1]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('style') !== undefined) {
          req.style = form.getFieldValue('style');
      }
      if (form.getFieldValue('itemName') !== undefined) {
          req.itemName = form.getFieldValue('itemName');
      }
      if (form.getFieldValue('brandId') !== undefined) {
          req.brandId = form.getFieldValue('brandId');
      }
    service.getAllFgItems(req).then(res => {
      if (res.status) {
        setItemData(res.data);
        message.success(res.internalMessage)
      } else
       {
        message.error(res.internalMessage)
        setItemData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setItemData([]);
    })
  }
// console.log(ItemData,"itemData")
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const getAllBrands=()=>{
    service.getAllBrandDropDown().then(res=>{
        if(res.status){
            setBrand(res.data);
            
        }else{
            AlertMessages.getErrorMessage(res.internalMessage)
        }
    })
  }

  const getAllStyles=()=>{
    service.getAllStyleDropDown().then(res=>{
      if(res.status){
      setStyle(res.data);
   
     }else{
       AlertMessages.getErrorMessage(res.internalMessage);
     }
     })
     }

     const getAllItems=()=>{
      service.getAll().then(res=>{
        if(res.status){
         setItemName(res.data);
     
       }else{
         AlertMessages.getErrorMessage(res.internalMessage);
       }
       })
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
const cancelOrder =(val:any) =>{
  
  const req = new FgItemCreIdRequest(val.fg_item_id)
  service.cancelItem(req).then(res => {
    
    if(res.status){
      AlertMessages.getSuccessMessage("Item Cancelled successfully. ")
      // getData(selected);
    }
    else{
      AlertMessages.getWarningMessage("Something went wrong. ")
    }
  }).catch(err => {
    AlertMessages.getErrorMessage("Something went wrong. ")
  })
}
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      width:50,align:'center',

     // render: (text, object, index) => (page - 1) * 10 + (index + 1)
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),

    },
    {
        title: "Style",
        dataIndex: "style_no",
        width:80,
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.style_no.localeCompare(b.style_no),
            sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Item Name",
        dataIndex: "item_name",
        width:100,
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.item_name.localeCompare(b.item_name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Type",
        dataIndex: "item_type",
        width:100,
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => {
          const itemA = a.item_type || ""; 
          const itemB = b.item_type || "";
      
          return itemA.localeCompare(itemB);
        },
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Brand",
        dataIndex: "brand_name",
        width:100,
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => {
          const itemA = a.brand_name || ""; 
          const itemB = b.brand_name || "";
      
          return itemA.localeCompare(itemB);
        },
        sortDirections: ['descend', 'ascend'],

      },
      // {
      //   title: "Category",
      //   dataIndex: "item_category",        width:70,align:'center',
      //   render: (data) => {
      //     return data ? data : "-";
      //   },
      //   sortDirections: ['descend', 'ascend'],
      //   sorter: (a, b) => {
      //     const itemA = a.item_category || ""; 
      //     const itemB = b.item_category || "";
      
      //     return itemA.localeCompare(itemB);
      //   },
      // },
      {
        title: "Item Group",
        dataIndex: "item_group",width:70,align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => {
          const itemA = a.item_group || ""; 
          const itemB = b.item_group || "";
      
          return itemA.localeCompare(itemB);
        },        sortDirections: ['descend', 'ascend'],
      },
     
      // {
      //   title: "Approve",
      //   dataIndex: "approver",
      //   render: (data) => {
      //     return data ? data : "-";
      //   },
      //   sorter: (a, b) => {
      //     const itemA = a.approver || ""; 
      //     const itemB = b.approver || "";
      
      //     return itemA.localeCompare(itemB);
      //   },        sortDirections: ['descend', 'ascend'],

      // },
      // {
      //   title: "Production Merchant",
      //   dataIndex: "pd_merchant",
      //   render: (data) => {
      //     return data ? data : "-";
      //   },
      //   sorter: (a, b) => {
      //     const itemA = a.pd_merchant || ""; 
      //     const itemB = b.pd_merchant || "";
      
      //     return itemA.localeCompare(itemB);
      //   },        
      //   sortDirections: ['descend', 'ascend'],

      // },
      // {
      //   title: "Sales Person",
      //   dataIndex: "sale_person_id",
      //   render: (data) => {
      //     return data ? data : "-";
      //   },
      //   sorter: (a, b) => {
      //     const itemA = a.sale_person_id || ""; 
      //     const itemB = b.sale_person_id || "";
      
      //     return itemA.localeCompare(itemB);
      //   } ,       
      //   sortDirections: ['descend', 'ascend'],

      // },
      {
        title: "Basic UOM",
        dataIndex: "uom",
        width:90,
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => {
          const itemA = a.uom || ""; 
          const itemB = b.uom || "";
      
          return itemA.localeCompare(itemB);
        } ,          sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Sales Price",
        dataIndex: "sale_price",
        width:90,
        render: (data) => {
          return data ? data : "-";
        },
        align:'right',
        sorter: (a, b) => {
          const itemA = a.sale_price || 0; 
          const itemB = b.sale_price || 0;
      
          return itemA - itemB; 
        } ,        sortDirections: ['descend', 'ascend'],

      },
      // {
      //   title: "Total Order Qty",
      //   dataIndex: "order_qty",align:'right',
      //   render: (text, record) => (
      //     <>
      //         {Number(record.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
      //     </>
      // ),
      // sorter: (a, b) => {
      //   const itemA = a.order_qty || ""; 
      //   const itemB = b.order_qty || "";
    
      //   return itemA.localeCompare(itemB);
      // } ,      sortDirections: ['descend', 'ascend'],


      // },
      {
        title: "Total Order Qty",
        dataIndex: "order_qty",
        width:90,
        align: 'right',
        render: (text, record) => (
          <>
            {Number(record.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </>
        ),
        sorter: (a, b) => {
          const itemA = a.order_qty || 0; 
          const itemB = b.order_qty || 0;
      
          return itemA - itemB; 
        },
        sortDirections: ['descend', 'ascend'],
      }
      ,
      {
        title: "Order Confirmation Date",
        width:95,

        dataIndex: "orderConfirmedDate",align:'center',
        render: (text) => moment(text).format('DD/MM/YYYY'),
      },
    {
      title: `Action`,
      dataIndex: 'action',
      fixed:'right',
      width:120,
      render: (text, rowData) => {
        return( <span>
            <EditOutlined className={'editSamplTypeIcon'} type="edit"
              onClick={() => {
                if (rowData.is_active) {                  
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Item Creation');
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
                  <Divider type="vertical" />
                  {rowData.is_sub_contract === SubContractStatus.NO || checkAccess('Cancel') ? <><CloseOutlined disabled={true}/></> :
            <Popconfirm onConfirm={vale => { cancelOrder(rowData) }} title={"Are you sure to Cancel ?"}>
              <Tooltip title={'Cancel item'}><CloseOutlined style={{color:'red'}} type='danger'/></Tooltip>
            </Popconfirm>
          }
               
          </span>
          )
        
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
    // console.log('params', pagination, filters, sorter, extra);
  }

  


  return (
      <>
      <Card title={<span >Item Creation</span>}style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/item-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllfgItemViewData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='style' label='Style' >
                            <Select showSearch placeholder="Select Style" optionFilterProp="children" allowClear >
                                {
                                    styledata?.map((inc: any) => {
                                        return <Option key={inc.fg_item_id} value={inc.style_no}>{inc.style_no}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemName' label='Item Name' >
                            <Select showSearch placeholder="Select Item Name" optionFilterProp="children" allowClear>
                                {
                                    itemName?.map((inc: any) => {
                                        return <Option key={inc.fg_item_id} value={inc.item_name}>{inc.item_name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='brandId' label='Brand' >
                            <Select
                                showSearch
                                placeholder="Select Brand"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    brand?.map((inc: any) => {
                                        return <Option key={inc.fg_item_id} value={inc.brand_name}>{inc.brand_name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}  >
                    <Form.Item label="Order Confirmation Date" name="orderConfirmedDate">
                    <RangePicker />
                    </Form.Item>
                     </Col>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">GET DETAILS</Button>
                            <Button
                                htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                            >
                                RESET
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <>
        <Table
         size='small'

        rowKey={record => record}
        className='custom-table-wrapper'
          columns={columnsSkelton}
          dataSource={ItemData}
        
        
          pagination={{
            pageSize: 50,
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
            }
        }}
           scroll={{x: 'max-content',y:500}}
          onChange={onChange}
          bordered /></>
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <ItemCreation key={Date.now()}
            // updateData={updateComposition}
            isUpdate={true}
            itemCreationData={selectedItemCreationData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default ItemCreationView
