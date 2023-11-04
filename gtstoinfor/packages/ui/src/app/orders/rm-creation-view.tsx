import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, FactoryService, ItemCategoryService, ItemCreationService, ItemGroupService, ItemTypeService, ItemsService, LiscenceTypeService, MasterBrandsService, ProcurmentGroupService, ProductGroupService, ProfitControlHeadService, ROSLGroupsService, RangeService, RmCreationService, SearchGroupService, StyleService, UomService } from '@project-management-system/shared-services';
import { CompositionDto, ItemCreFilterRequest, LiscenceTypesdDto, RMCreFilterRequest } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemCreation from './item-creation';
import moment from 'moment';


const RMCreationView = () => {
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
         const buyingHouseservice = new BuyingHouseService();
         const itemCreationService = new ItemCreationService();
         const searchgroup = new SearchGroupService();
         const itemTypeservice =new ItemTypeService();
         const employeservice = new EmployeeDetailsService();
         const compositionservice = new CompositionService();
         const service = new ItemCreationService();
         const uomservice = new UomService();
         const itemGroupservice = new ItemGroupService();
         const rmservice = new RmCreationService();
         const pchservice = new ProfitControlHeadService();
         const facilityservice =new FactoryService();
         const procurementservice = new ProcurmentGroupService();
         const proDUCTService = new ProductGroupService();



         const [facilitydata,setfacilityData] = useState([]);
         const [Procurement,setProcurement] = useState([]);
         const [Product,setProduct] = useState([]);       
         const [pchData, setpchData] = useState([]);
         const [searchdata,setSearchData] = useState([]);
         const [employedata,setEmployeData] = useState([]);
         const [customGroup,setCustomGroup]= useState([]);
         const [currency,setCurrency]= useState([]);
         const [itemgroup,setitemgroup] = useState([]);
         const [licence,setLicence]=useState([])
         const [itemCategory,setItemCategory]= useState([])
         const [rosl,setRosl] = useState([])
         const [house,setHouse]= useState([])
         const [styledata,setStyle]=useState([])
         const[brand,setBrand]=useState([])
         const [ItemType,setItemType]= useState([]);
         const [form] = Form.useForm();
         const { Option } = Select;
         const [uomdata,setUomData] = useState([]);
         const { RangePicker } = DatePicker;




  useEffect(() => {
    getAllRMItemViewData();
    getAllStyles();
    getAllCategory();
    getAllCurrency();
    getAllBuyingHouse();
    getAllEmployes();
    getAllItemType();
    getAllCategory();
    getAllItemGroups();
    getAllUoms();getAllFacilitys();
    getAllProducts();
    getAllProcurement();
    getAllPch();
  }, [])

  const resetHandler = () => {
    form.resetFields();
    getAllRMItemViewData();

}
    const getAllRMItemViewData= () => {
      const req = new RMCreFilterRequest();
  
      if (form.getFieldValue('currency') !== undefined) {
          req.Currency = form.getFieldValue('currency');
      }
      if (form.getFieldValue('itemGroup') !== undefined) {
          req.itemGroup = form.getFieldValue('itemGroup');
      }
      if (form.getFieldValue('itemType') !== undefined) {
        req.itemType = form.getFieldValue('itemType');
    }
    if (form.getFieldValue('procurement') !== undefined) {
      req.procurementGroup = form.getFieldValue('procurement');
  }
  if (form.getFieldValue('brandId') !== undefined) {
    req.productGroup = form.getFieldValue('brandId');
}
rmservice.getAllRMItems(req).then(res => {
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

  const getAllFacilitys=() =>{
    facilityservice.getFactories().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setfacilityData(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    })       
  }
  const getAllItemType=() =>{
    itemTypeservice.getAllActiveItemType().then(res =>{
      if (res.status){
        setItemType(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    })      
  }
  const getAllCategory=()=>{
    categoryService.getActiveItemCategories().then(res=>{
     if(res.status){
         setItemCategory(res.data);
       }else{
         AlertMessages.getErrorMessage(res.internalMessage)
     }
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
    })       
  }
  const getAllPch = () => {
    pchservice.getAllActiveProfitControlHead()
      .then((res) => {
        if (res.status) {
          setpchData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      
  };

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
  })
  }

  const getAllProducts = () => {
    proDUCTService
      .getAllActiveProductGroup()
      .then((res) => {
        if (res.status) {
          setProduct(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
  };
  const getAllProcurement = () => {
    procurementservice
      .getAllActiveProcurmentGroup()
      .then((res) => {
        if (res.status) {
          setProcurement(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setProcurement([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
 

   const getAllItemGroups=() =>{
    itemGroupservice.getAllActiveItemGroup().then(res =>{
      if (res.status){
        setitemgroup(res.data);  
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    })        
  }

 const getAllCurrency=()=>{
    currencyServices.getAllActiveCurrencys().then(res=>{
        if(res.status){
          setCurrency(res.data);
        }else{
            AlertMessages.getErrorMessage(res.internalMessage)
        }
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

    navigate(`/materialCreation/fabric-bom-creation`,{state:rowData})
    
}

const getAllUoms=() =>{
  uomservice.getAllActiveUoms().then(res =>{
    if (res.status){
      setUomData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  })        
}

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: "Item Type",
      dataIndex: "item_type_id",
      align:'center',
      render: (data) => {
        const type = ItemType.find((loc) => loc.itemTypeId === data);
        return type ? type.itemType : "-";
      },
      sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: "Item Code",
        dataIndex: "item_code",
        align:'center',
        sorter: (a, b) => a.item_code.localeCompare(b.item_code),
            sortDirections: ['descend', 'ascend'],
      },
      // {
      //   title: "Item Name",
      //   dataIndex: "item_name",
      //   align:'center',
      //   render: (item_name) => {
      //     return item_name ? item_name : "-";
      //   },
      //   sorter: (a, b) => a.item_name.localeCompare(b.item_name),
      //   sortDirections: ['descend', 'ascend'],
      // },

      {
        title: "Item Group",
        dataIndex: "item_group_id",
        align:'center',
        render: (data) => {
          const catdata = itemCategory.find((cat) => cat.itemCategoryId === data);
          return catdata ? catdata.itemCategory : "-";
        },
        sorter: (a, b) => {
          const icatA = itemCategory.find((cat) => cat.itemCategoryId === a.itemCategoryId)?.itemCategory || '';
          const icatB = itemCategory.find((cat) => cat.itemCategoryId === b.itemCategoryId)?.itemCategory || '';
          return icatA.localeCompare(icatB);
        },        sortDirections: ['descend', 'ascend'],
      }, {
        title: "PCH",
        dataIndex: "pch_id",align:'center',
        render: (data) => {
          const pchDat = pchData.find((cat) => cat.itemCategoryId === data);
          return pchDat ? pchDat.itemCategory : "-";
        },
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => {
          const icatA = itemCategory.find((cat) => cat.itemCategoryId === a.itemCategoryId)?.itemCategory || '';
          const icatB = itemCategory.find((cat) => cat.itemCategoryId === b.itemCategoryId)?.itemCategory || '';
          return icatA.localeCompare(icatB);
        },
      },
      {
        title: "Placement",
        dataIndex: "placement",align:'center',
       
      },
      {
        title: "Facility",
        dataIndex: "facility_id",align:'center',
        render: (data) => {
          const pchDat = facilitydata.find((cat) => cat.id === data);
          return pchDat ? pchDat.name : "-";
        },
       
      },
      {
        title: "Responsible",
        dataIndex: "responsible_person_id",align:'center',
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
        title: "Product Group",
        dataIndex: "product_group_id",align:'center',
        render: (data) => {

          const catdata = Product.find((cat) => cat.productGroupId === data);
          return catdata ? catdata.productGroup : "-";
        },
       
      },
      {
        title: "Procurement Group",
        dataIndex: "procurement_gorup_id",align:'center',
        render: (data) => {
          const catdata = Procurement.find((cat) => cat.procurmentGroupId === data);          
          return catdata ? catdata.procurmentGroup : "-";
        },
        sorter: (a, b) => {
          const icatA = itemCategory.find((cat) => cat.itemCategoryId === a.itemCategoryId)?.itemCategory || '';
          const icatB = itemCategory.find((cat) => cat.itemCategoryId === b.itemCategoryId)?.itemCategory || '';
          return icatA.localeCompare(icatB);
        },        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Attached WareHouse",
        dataIndex: "attached_warehouse",
        align:'center',
        render: (catdata) => {
          return catdata ? catdata : "-";
        },
      },
      {
        title: "Planner",
        dataIndex: "planner",        align:'center',


      },
      {
        title: "Business Area ",
        dataIndex: "business_area",        align:'center',


      },
      {
        title: "Basic UOM",
        dataIndex: "basic_uom_id",
        align:'center',
        render: (data) => {
          const UOM = uomdata.find((bran) => bran.uomId === data);
          return UOM ? UOM.uom : "-";
        },
        sorter: (a, b) => a.uomId.localeCompare(b.uomId),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Currency",
        dataIndex: "currency",align:'center',
        render: (data) => {
          const Curdata = currency.find((cat) => cat.currencyId  === data);
          console.log(typeof(currency), "Curdata")
          return Curdata ? Curdata.currencyName: "-";
        },
      },
      {
        title: "Description",
        dataIndex: "description",align:'center',
      },
      {
        title: "Sales Price",
        dataIndex: "sale_price",
        align:'right',
        sorter: (a, b) => a.sale_price.localeCompare(b.sale_price),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Supplier",
        dataIndex: "sale_price",
        align:'center',
        sorter: (a, b) => a.sale_price.localeCompare(b.sale_price),
        sortDirections: ['descend', 'ascend'],

      },
      
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
      <Card title={<span >RM Creation</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/fabric-bom-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllRMItemViewData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='currency' label='Currency' >
                            <Select showSearch placeholder="Select Currency" optionFilterProp="children" allowClear >
                                {
                                    currency?.map((inc: any) => {
                                        return <Option key={inc.currencyId} value={inc.currencyId}>{inc.currencyName}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemGroup' label='Item Group'>
                            <Select showSearch placeholder="Select Item Group" optionFilterProp="children" allowClear>
                                {
                                    itemgroup?.map((inc: any) => {
                                        return <Option key={inc.itemGroupId} value={inc.itemGroup}>{inc.itemGroup}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemType' label='Item Type' >
                            <Select showSearch placeholder="Select Item Type" optionFilterProp="children" allowClear>
                                {
                                    ItemType?.map((inc: any) => {
                                        return <Option key={inc.itemTypeId} value={inc.itemType}>{inc.itemType}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='product' label='Product Group' >
                            <Select
                                showSearch
                                placeholder="Select Product Group"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    Product?.map((inc: any) => {
                                        return <Option key={inc.productGroupId} value={inc.productGroupId}>{inc.productGroup}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='procurement' label='Procurement Group' >
                            <Select
                                showSearch
                                placeholder="Select Procurement Group"
                                optionFilterProp="children"
                                allowClear>
                                {
                                    Procurement?.map((inc: any) => {
                                        return <Option key={inc.procurmentGroupId} value={inc.procurmentGroupId}>{inc.procurmentGroup}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }} style={{ padding: '15px' }}>
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
           scroll={{x: 'max-content'}}
          onChange={onChange}
          bordered /></>
      </Card>
      {/* <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <ItemCreation key={Date.now()}
            // updateData={updateComposition}
            
            isUpdate={true}
            // itemCreationData={selectedcompositionData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer> */}
     
      </Card> </>
      
  );
}


export default RMCreationView
