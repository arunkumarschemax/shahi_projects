 



import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select } from 'antd';
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
        dataIndex: "",
        align:'center',
        render: (data) => {
          const style = styledata.find((sty) => sty.styleNo === data);
          return style ? style.style : "-";
        },
      },
      {
        title: "Item Name",
        dataIndex: "item_name",
        align:'center',
      },
      {
        title: "Type",
        dataIndex: "item_type_id",
        align:'center',
        render: (data) => {
          const style = ItemType.find((loc) => loc.item_type_id === data);
          return style ? style.itemType : "-";
        },
      },
      {
        title: "Brand",
        dataIndex: "brand_id",
        align:'center',
        render: (data) => {
          const branddata = brand.find((bran) => bran.brandId === data);
          return branddata ? branddata.brandName : "-";
        },
      },
      {
        title: "Category",
        dataIndex: "category_id",
        render: (data) => {
          const catdata = itemCategory.find((cat) => cat.itemCategoryId === data);
          return catdata ? catdata.itemCategory : "-";
        },
      },
      {
        title: "Item Group",
        dataIndex: "",
        render: (data) => {
          const catdata = itemCategory.find((cat) => cat.itemCategoryId === data);
          return catdata ? catdata.itemCategory : "-";
        },
      },
      {
        title: "Responsible",
        dataIndex: "responsible_person_id",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
      },
      {
        title: "Approve",
        dataIndex: "approver",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
      },
      {
        title: "Production Merchant",
        dataIndex: "production_merchant",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
      },
      {
        title: "Sales Person",
        dataIndex: "sale_person_id",
        render: (data) => {
          const empdata = employedata.find((emp) => emp.employeeId === data);
          const ftname = `${empdata?.firstName} ${empdata?.lastName}`;
          return ftname ? ftname : '-';
        },
      },
      {
        title: "Basic UOM",
        dataIndex: "uom",
        align:'center'
      },
      {
        title: "Currency",
        dataIndex: "currency",
      },
      {
        title: "Sales Price",
        dataIndex: "sale_price",
        align:'right',
      },
      {
        title: "Target Currency",
        dataIndex: "target_currency",
        align:'center',
      },
      {
        title: "Total Order Qty",
        dataIndex: "order_qty",align:'right',
        render: (text, record) => (
          <>
              {Number(record.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </>
      )

      },
      {
        title: "Order Confirmation Date",
        dataIndex: "orderConfirmedDate",align:'center',
        render: (text) => moment(text).format('DD/MM/YYYY')
      },
      {
        title: "Range",
        dataIndex: "",
        render: (data) => {
          const randata = rangedata.find((cat) => cat.id === data);
          return randata ? randata.rangeCode : "-";
        },
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
                                placeholder="Select Size Description"
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">GET REPORT</Button>
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
            // itemCreationData={selectedcompositionData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
     
      </Card> </>
      
  );
}


export default ItemCreationView
