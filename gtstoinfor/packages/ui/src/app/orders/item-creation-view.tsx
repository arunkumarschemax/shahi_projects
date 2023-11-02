 



import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, ItemCategoryService, ItemCreationService, ItemTypeService, ItemsService, LiscenceTypeService, MasterBrandsService, ROSLGroupsService, RangeService, SearchGroupService, StyleService, UomService } from '@project-management-system/shared-services';
import { CompositionDto, ItemCreFilterRequest, LiscenceTypesdDto } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemCreation from './item-creation';
import moment from 'moment';


const ItemCreationView = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ItemData, setItemData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedItemCreationData, setSelectedItemCreationData] = useState<any>(undefined);
  const currencyServices = new CurrencyService();
         const styleService = new StyleService();
         const LicenceService = new LiscenceTypeService();
         const brandservice = new MasterBrandsService();
         const categoryService = new ItemCategoryService();
         const roslservice = new ROSLGroupsService();
         const buyingHouseservice = new BuyingHouseService();
         const itemCreationService = new ItemCreationService();
         const searchgroup = new SearchGroupService();
         const itemTypeservice =new ItemTypeService();
         const employeservice = new EmployeeDetailsService();
         const Rangeservice = new RangeService();
         const compositionservice = new CompositionService();
         const service = new ItemCreationService();
         const uomservice = new UomService();
         const [searchdata,setSearchData] = useState([]);
         const [employedata,setEmployeData] = useState([]);
         const [rangedata,setRangeData] = useState([]);
         const [customGroup,setCustomGroup]= useState([]);
         const [licence,setLicence]=useState([])
         const [itemCategory,setItemCategory]= useState([])
         const [rosl,setRosl] = useState([])
         const [house,setHouse]= useState([])
         const [styledata,setStyle]=useState([])
         const[brand,setBrand]=useState([])
         const [compositiondata,setCompositionData] = useState([]);
         const [ItemType,setItemType]= useState([]);
         const [form] = Form.useForm();
         const { Option } = Select;
         const { RangePicker } = DatePicker;




  useEffect(() => {
    getAllfgItemViewData();
    getAllStyles();
    getAllLicense();
    getAllBrands();
    getAllCategory();
    getAllCustomGrops();
    getAllBuyingHouse();
    getAllSearchgroup();
    getAllRanges();
    getAllComposition();
    getAllEmployes();
    getAllItemType();
    getAllCategory();
  }, [])

  const resetHandler = () => {
    form.resetFields();
    getAllfgItemViewData();

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
// console.log(ItemData,"itemData")
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const getAllItemType=() =>{
    itemTypeservice.getAllActiveItemType().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setItemType(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setItemType([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }

  const getAllEmployes=() =>{
    employeservice.getAllActiveEmploee().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setEmployeData(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setEmployeData([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }



const getAllComposition=()=>{
    compositionservice.getActiveComposition().then(res=>{
   if(res.status){
     setCompositionData(res.data);
    }else{
  AlertMessages.getErrorMessage(res.internalMessage);
  }})} 
    const getAllCategory=()=>{
     categoryService.getActiveItemCategories().then(res=>{
      if(res.status){
          setItemCategory(res.data);
        }else{
          AlertMessages.getErrorMessage(res.internalMessage)
      }
  })
    } 

  const getAllSearchgroup=()=>{
    searchgroup.getActiveSearchGroup().then(res=>{
      if(res.status){
        setSearchData(res.data)
      }else{
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      setSearchData([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }

  const getAllStyles=()=>{
 styleService.getAllActiveStyle().then(res=>{
   if(res.status){
   setStyle(res.data);

  }else{
    AlertMessages.getErrorMessage(res.internalMessage);
  }
  }).catch(err=>{
    setStyle([]);
    AlertMessages.getErrorMessage(err.message)
  })
  }

  const getAllLicense=()=>{
    LicenceService.getAllActiveLiscenceTypes().then(res=>{
        if(res.status){
            setLicence(res.data);
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err=>{
        setLicence([]);
        AlertMessages.getErrorMessage(err.message)
    })
  }

  const getAllBrands=()=>{
    brandservice.getAllActiveBrands().then(res=>{
        if(res.status){
            setBrand(res.data);
        }else{
            AlertMessages.getErrorMessage(res.internalMessage)
        }
    }).catch(err=>{
        setBrand([]);
        AlertMessages.getErrorMessage(err.message)
    })
  }

   const getAllRanges=()=>{
    Rangeservice.getActiveRange().then(res=>{
      if(res.status){
        setRangeData(res.data);
      }else{
        AlertMessages.getErrorMessage(res.internalMessage)

      }
    }).catch(err=>{setRangeData([])
      AlertMessages.getErrorMessage(err.message)

    })
   }
 



 const getAllCustomGrops=()=>{
    currencyServices.getAllActiveCurrencys().then(res=>{
        if(res.status){
            setCustomGroup(res.data);
        }else{
            AlertMessages.getErrorMessage(res.internalMessage)
        }
    }).catch(err=>{
        setCustomGroup([]);
        AlertMessages.getErrorMessage(err.message)
    })
 }
 const getAllBuyingHouse=()=>{
    buyingHouseservice.getAllActiveBuyingHouse().then(res=>{
        if(res.status){
            setHouse(res.data);
        }else{
            AlertMessages.getErrorMessage(res.internalMessage)
        }
    }).catch(err=>{
        setHouse([]);
        AlertMessages.getErrorMessage(err.message)
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

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
        title: "Style",
        dataIndex: "style_no",
        align:'center',
        // render: (data) => {
        //   const style = styledata.find((sty) => sty.styleNo === data);
        //   return style ? style.style : "-";
        // },
        sorter: (a, b) => a.style_no.localeCompare(b.style_no),
            sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Item Name",
        dataIndex: "item_name",
        align:'center',
        render: (item_name) => {
          return item_name ? item_name : "-";
        },
        sorter: (a, b) => a.item_name.localeCompare(b.item_name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Type",
        dataIndex: "item_type_id",
        align:'center',
        render: (data) => {
          const style = ItemType.find((loc) => loc.item_type_id === data);
          return style ? style.itemType : "-";
        },
        sorter: (a, b) => a.item_type_id.localeCompare(b.item_type_id),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Brand",
        dataIndex: "brand_id",
        align:'center',
        render: (data) => {
          const branddata = brand.find((bran) => bran.brandId === data);
          return branddata ? branddata.brandName : "-";
        },
        sorter: (a, b) => a.brand_id.localeCompare(b.brand_id),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Category",
        dataIndex: "category_id",
        render: (data) => {
          const catdata = itemCategory.find((cat) => cat.itemCategoryId === data);
          return catdata ? catdata.itemCategory : "-";
        },
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => {
          const icatA = itemCategory.find((cat) => cat.itemCategoryId === a.itemCategoryId)?.itemCategory || '';
          const icatB = itemCategory.find((cat) => cat.itemCategoryId === b.itemCategoryId)?.itemCategory || '';
          return icatA.localeCompare(icatB);
        },
      },
      {
        title: "Item Group",
        dataIndex: "item_group",
        render: (data) => {
          const catdata = itemCategory.find((cat) => cat.itemCategoryId === data);
          return catdata ? catdata.itemCategory : "-";
        },
        sorter: (a, b) => {
          const icatA = itemCategory.find((cat) => cat.itemCategoryId === a.itemCategoryId)?.itemCategory || '';
          const icatB = itemCategory.find((cat) => cat.itemCategoryId === b.itemCategoryId)?.itemCategory || '';
          return icatA.localeCompare(icatB);
        },        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Responsible",
        dataIndex: "responsible_person_id",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
        sorter: (a, b) => {
          const icatA = employedata.find((cat) => cat.employeeId === a.employeeId)?.ftname || '';
          const icatB = employedata.find((cat) => cat.employeeId === b.employeeId)?.ftname || '';
          return icatA.localeCompare(icatB);
        },
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Approve",
        dataIndex: "approver",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
        sorter: (a, b) => {
          const icatA = employedata.find((cat) => cat.employeeId === a.employeeId)?.ftname || '';
          const icatB = employedata.find((cat) => cat.employeeId === b.employeeId)?.ftname || '';
          return icatA.localeCompare(icatB);
        },
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Production Merchant",
        dataIndex: "production_merchant",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
        sorter: (a, b) => {
          const icatA = employedata.find((cat) => cat.employeeId === a.employeeId)?.ftname || '';
          const icatB = employedata.find((cat) => cat.employeeId === b.employeeId)?.ftname || '';
          return icatA.localeCompare(icatB);
        },
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Sales Person",
        dataIndex: "sale_person_id",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
        sorter: (a, b) => {
          const icatA = employedata.find((cat) => cat.employeeId === a.employeeId)?.ftname || '';
          const icatB = employedata.find((cat) => cat.employeeId === b.employeeId)?.ftname || '';
          return icatA.localeCompare(icatB);
        },
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Basic UOM",
        dataIndex: "uom",
        align:'center',
        sorter: (a, b) => a.uom.localeCompare(b.uom),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Currency",
        dataIndex: "currency",
        sorter: (a, b) => a.currency.localeCompare(b.currency),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Sales Price",
        dataIndex: "sale_price",
        align:'right',
        sorter: (a, b) => a.sale_price.localeCompare(b.sale_price),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Target Currency",
        dataIndex: "target_currency",
        align:'center',
        sorter: (a, b) => a.target_currency.localeCompare(b.target_currency),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Total Order Qty",
        dataIndex: "order_qty",align:'right',
        render: (text, record) => (
          <>
              {Number(record.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </>
      ),
      sorter: (a, b) => a.order_qty.localeCompare(b.order_qty),
      sortDirections: ['descend', 'ascend'],


      },
      {
        title: "Order Confirmation Date",
        dataIndex: "orderConfirmedDate",align:'center',
        render: (text) => moment(text).format('DD/MM/YYYY'),
      },
      {
        title: "Range",
        dataIndex: "range",
        sorter: (a, b) => a.range.localeCompare(b.range),

        // render: (data) => {
        //   const dataAsString = data.toString();
        //   const randata = rangedata[dataAsString];
        //   if (randata) {
        //     return randata.rangeCode;
        //   } else {
        //     return "-";
        //   }
        // },
                
        // sorter: (a, b) => {
        //   const icatA = rangedata.find((cat) => cat.id === a.id)?.rangeCode || '';
        //   const icatB = rangedata.find((cat) => cat.id === b.id)?.rangeCode || '';
        //   return icatA.localeCompare(icatB);
        // },
        sortDirections: ['descend', 'ascend'],
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
    // console.log('params', pagination, filters, sorter, extra);
  }

  


  return (
      <>
      <Card title={<span >Item Creation</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }} 
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
                                        return <Option key={inc.styleId} value={inc.styleId}>{inc.style}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemName' label='Item Name' >
                            <Select showSearch placeholder="Select Item Name" optionFilterProp="children" allowClear>
                                {
                                    ItemData?.map((inc: any) => {
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
                                        return <Option key={inc.brandId} value={inc.brandId}>{inc.brandName}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
                    <Form.Item label="Last Modified Date" name="orderConfirmedDate">
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
         size='middle'
         rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

        rowKey={record => record}
        className='custom-table-wrapper'
          columns={columnsSkelton}
          dataSource={ItemData}
        
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          // scroll={{x: 'max-content'}}
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
