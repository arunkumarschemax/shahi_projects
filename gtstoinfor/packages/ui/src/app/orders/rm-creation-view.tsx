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
         const categoryService = new ItemCategoryService();
         const buyingHouseservice = new BuyingHouseService();
         const itemTypeservice =new ItemTypeService();
         const uomservice = new UomService();
         const itemGroupservice = new ItemGroupService();
         const rmservice = new RmCreationService();
         const procurementservice = new ProcurmentGroupService();
         const proDUCTService = new ProductGroupService();



         const [Procurement,setProcurement] = useState([]);
         const [Product,setProduct] = useState([]);       
         const [currency,setCurrency]= useState([]);
         const [itemgroup,setitemgroup] = useState([]);
         const [itemCategory,setItemCategory]= useState([])
         const [ItemType,setItemType]= useState([]);
         const [form] = Form.useForm();
         const { Option } = Select;
         const [uomdata,setUomData] = useState([]);
         const { RangePicker } = DatePicker;




  useEffect(() => {
    getAllRMItemViewData();
    getAllCurrency();
    getAllItemType();
    getAllItemGroups();
    getAllProducts();
    getAllProcurement();
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


  const getAllItemType=() =>{
    itemTypeservice.getAllActiveItemType().then(res =>{
      if (res.status){
        setItemType(res.data);
         
      } else{
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
      dataIndex: "item_type",
      align:'center',
      render: (data) => {
        return data ? data : "-";
      },
      sorter: (a, b) => a.item_type.localeCompare(b.item_type),
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: "Item Code",
        dataIndex: "item_code",
        align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.item_code.localeCompare(b.item_code),
            sortDirections: ['descend', 'ascend'],
      },
      

      {
        title: "Item Group",
        dataIndex: "item_group",
        align:'center', render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.item_group.localeCompare(b.item_group),
        
            sortDirections: ['descend', 'ascend'],
      },
       {
        title: "PCH",
        dataIndex: "pch",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.pch.localeCompare(b.pch),
        sortDirections: ['descend', 'ascend'],
       
      },
      {
        title: "Placement",
        dataIndex: "placement",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.placement.localeCompare(b.placement),
       
      },
      {
        title: "Facility",
        dataIndex: "facility",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.facility.localeCompare(b.facility),
       
      },
      {
        title: "Responsible",
        dataIndex: "responsible_person",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.responsible_person.localeCompare(b.responsible_person),
      
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Product Group",
        dataIndex: "product_group",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.product_group.localeCompare(b.product_group),
       
       
      },
      {
        title: "Procurement Group",
        dataIndex: "procurment_group",align:'center',
             sortDirections: ['descend', 'ascend'],
             render: (data) => {
              return data ? data : "-";
            },
            sorter: (a, b) => a.procurment_group.localeCompare(b.procurment_group),

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
        dataIndex: "planner", render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.item_group.localeCompare(b.item_group),       align:'center',


      },
      {
        title: "Business Area ",
        dataIndex: "business_area", render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.business_area.localeCompare(b.business_area),       align:'center',


      },
      {
        title: "Basic UOM",
        dataIndex: "uom",
        align:'center',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.uom.localeCompare(b.uom),
      
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Currency",
        dataIndex: "currency",align:'center',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.currency.localeCompare(b.currency),
       
      },
      {
        title: "Price",
        dataIndex: "price",align:'center',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.price.localeCompare(b.price),
      },
      {
        title: "Sales Tax",
        dataIndex: "sale_tax",
        align:'right',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.sale_tax.localeCompare(b.sale_tax),
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Is Imported",
        dataIndex: "is_imported_item",render: (data) => {
          return data ? data : "-";
        },
        align:'center',
        sorter: (a, b) => a.is_imported_item.localeCompare(b.is_imported_item),
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
      <Card title={<span >RM View</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/fabric-bom-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Form onFinish={getAllRMItemViewData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='currency' label='Currency' >
                            <Select showSearch placeholder="Select Currency" optionFilterProp="children" allowClear >
                                {
                                    currency?.map((inc: any) => {
                                        return <Option key={inc.currencyId} value={inc.currencyName}>{inc.currencyName}</Option>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='product' label='Product Group' >
                            <Select
                                showSearch
                                placeholder="Select Product Group"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    Product?.map((inc: any) => {
                                        return <Option key={inc.productGroupId} value={inc.productGroup}>{inc.productGroup}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='procurement' label='Procurement Group' >
                            <Select
                                showSearch
                                placeholder="Select Procurement Group"
                                optionFilterProp="children"
                                allowClear>
                                {
                                    Procurement?.map((inc: any) => {
                                        return <Option key={inc.procurmentGroupId} value={inc.procurmentGroup}>{inc.procurmentGroup}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
    <Form.Item style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button htmlType="submit" icon={<SearchOutlined />} type="primary">GET DETAILS</Button>
        <Button
            htmlType='button' icon={<UndoOutlined/>} style={{ margin: '10px', backgroundColor: "#162A6D", color: "white" }} onClick={resetHandler}
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
