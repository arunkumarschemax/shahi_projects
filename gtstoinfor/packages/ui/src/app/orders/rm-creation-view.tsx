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

         const rmservice = new RmCreationService();
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
  if (form.getFieldValue('product') !== undefined) {
    req.productGroup = form.getFieldValue('product');
}
rmservice.getAllRMItems(req).then(res => {
      if (res.status) {
        setItemData(res.data);
        message.success(res.internalMessage)

      } else
       {
        setItemData([])
        message.error(res.internalMessage)

          // AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      // AlertMessages.getErrorMessage(err.message);
      setItemData([]);
    })
  }
// console.log(ItemData,"itemData")
  const closeDrawer = () => {
    setDrawerVisible(false);
  }


  const getAllItemType=() =>{
    rmservice.itemTypeDropdown().then(res =>{
      if (res.status){
        setItemType(res.data);
 
      }
    })      
  }
  


  const getAllProducts = () => {
    rmservice.ProductGroupDropdown()
      .then((res) => {
        if (res.status) {
          setProduct(res.data);

        } 
      })
  };
  const getAllProcurement = () => {
    rmservice.ProcurementGroupDropdown()
      .then((res) => {
        if (res.status) {
          setProcurement(res.data);
        }
      })
  };
 

   const getAllItemGroups=() =>{
    rmservice.itemGroupDropdown().then(res =>{
      if (res.status){
        setitemgroup(res.data);
  
      } 
    })        
  }

 const getAllCurrency=()=>{
  rmservice.CurrencyDropdown().then(res=>{
        if(res.status){
          setCurrency(res.data);

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

  // const openFormWithData=(viewData: LiscenceTypesdDto)=>{
  //   setDrawerVisible(true);
  //   setSelectedItemCreationData(viewData);
  // }

  const DetailView = (rowData) => {

    navigate(`/materialCreation/rm-detail-view`,{state:rowData})
    
}

  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      width:50,
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
      width:80,

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
            width:80,
      },
      

      {
        title: "Item Group",
        dataIndex: "item_group",
        width:80,
        align:'center', render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.item_group.localeCompare(b.item_group),
        
            sortDirections: ['descend', 'ascend'],
      },
      
      {
        title: "Placement",
        dataIndex: "placement",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.placement.localeCompare(b.placement),
        width:80,
      },
      
      {
        title: "Product Group",
        dataIndex: "product_group",align:'center',
        render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.product_group.localeCompare(b.product_group),
        width:80,
      },
      // {
      //   title: "Procurement Group",
      //   dataIndex: "procurment_group",align:'center',
      //        sortDirections: ['descend', 'ascend'],
      //        render: (data) => {
      //         return data ? data : "-";
      //       },
      //       sorter: (a, b) => a.procurment_group.localeCompare(b.procurment_group),
      //       width:80,
      // },
      {
        title: "Attached WareHouse",
        dataIndex: "attached_warehouse",
        align:'center',
        render: (catdata) => {
          return catdata ? catdata : "-";
        },
        width:80,

      },
      
      {
        title: "Business Area ",
        dataIndex: "business_area", render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.business_area.localeCompare(b.business_area),       align:'center',
        width:80,


      },
      {
        title: "Basic UOM",
        dataIndex: "uom",
        align:'center',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.uom.localeCompare(b.uom),
      
        sortDirections: ['descend', 'ascend'],
        width:80,

      },
      {
        title: "Currency",
        dataIndex: "currency",align:'center',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.currency.localeCompare(b.currency),
        width:80,
      },
      {
        title: "Price",
        dataIndex: "price",align:'right',render: (data) => {
          return data ? data : "-";
        },
        sorter: (a, b) => a.price.localeCompare(b.price),
        width:80,
      },
      {
        title: `Action`,
        dataIndex: 'action',
        fixed:'right',
        width:100,
        render: (text, rowData) => {
          
          return( <span>
              {/* <EditOutlined className={'editSamplTypeIcon'} type="edit"
                onClick={() => {
                  if (rowData.isActive) {
                    openFormWithData(rowData);
                  } else {
                    AlertMessages.getErrorMessage('You Cannot Edit Item Creation');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              /> */}
    
              <Divider type="vertical" />
              <Tooltip placement="top" title="Detail View">
                      <Button type="link" onClick={() => DetailView(rowData)}>
                        <EyeOutlined type="view" />
                      </Button>
                    </Tooltip>
                 
                 
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
      <Card title={<span >RM Item</span>}style={{textAlign:'left'}} headStyle={{ border: 0 }} 
     extra={
      <div>
        <Link to='/materialCreation/fabric-bom-creation'>
          <span style={{ color: 'white' }}>
            <Button type={'primary'}>Fabric Creation</Button>
          </span>
        </Link><span> </span>
        <Link to='/materialCreation/bomtrimcreation/bom-trim-creation'>
          <span style={{ color: 'white' }}>
            <Button type={'primary'}>Trim Creation</Button>
          </span>
        </Link>
      </div>
    } >
      <Card >
      <Form onFinish={getAllRMItemViewData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='currency' label='Currency' >
                            <Select dropdownMatchSelectWidth={false} showSearch placeholder="Select Currency" optionFilterProp="children" allowClear >
                                {
                                    currency?.map((inc: any) => {
                                        return <Option key={inc.rm_item_id} value={inc.currency}>{inc.currency}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemGroup' label='Item Group'>
                            <Select dropdownMatchSelectWidth={false} showSearch placeholder="Select Item Group" optionFilterProp="children" allowClear>
                                {
                                    itemgroup?.map((inc: any) => {
                                        return <Option key={inc.rm_item_id} value={inc.item_group}>{inc.item_group}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='itemType' label='Item Type' >
                            <Select showSearch placeholder="Select Item Type" optionFilterProp="children" allowClear dropdownMatchSelectWidth={false}>
                                {
                                    ItemType?.map((inc: any) => {
                                        return <Option key={inc.rm_item_id} value={inc.item_type}>{inc.item_type}</Option>
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
                                allowClear dropdownMatchSelectWidth={false}
                            >
                                {
                                    Product?.map((inc: any) => {
                                        return <Option key={inc.rm_item_id} value={inc.product_group}>{inc.product_group}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='procurement' label='Procurement Group' >
                            <Select
                                showSearch
                                placeholder="Select Procurement Group"
                                optionFilterProp="children"
                                allowClear>
                                {
                                    Procurement?.map((inc: any) => {
                                        return <Option key={inc.rm_item_id} value={inc.procurment_group}>{inc.procurment_group}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col> */}
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
            onChange(current) {
              setPage(current);
            }
          }}
           scroll={{x: 'max-content',y:600}}
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
