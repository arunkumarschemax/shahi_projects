import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined, EyeOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Drawer, Form, Input, Popconfirm, Row, Select, Switch, Table, Tag, Tooltip } from "antd"
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";
import { BuyersService, CurrencyService, DeliveryMethodService, DeliveryTermsService, ItemCreationService, PackageTermsService, PaymentMethodService, PaymentTermsService, StyleOrderService, WarehouseService } from "@project-management-system/shared-services";
import { BuyerExtrnalRefIdReq, CustomerOrderStatusEnum, CustomerOrderStatusEnumDisplay, MenusAndScopesEnum, PackageTermsDto, PaymentMethodDto, PaymentTermsDto, StyleOrderReq, styleOrderReq } from "@project-management-system/shared-models";
import moment from "moment";
import StyleOrderCreation from "./style-order-form";
import RolePermission from "../roles-permission";

export const StyleOrderGrid = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate()
    const {Option} = Select;
    const service = new StyleOrderService()
    const [data,setData] =  useState<any[]>([])
    const [selected,setSelected] =  useState()
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    const buyerService = new BuyersService();
    const[buyerId,setBuyerId] = useState([]);
     const [total,setTotalQty] =  useState<number>(0)
   const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [userId, setUserId] = useState([]); 
    const [loginBuyer,setLoginBuyer] = useState<number>(0)
    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
  let userRef
  const[item,setItem] = useState([]);
const itemService =new ItemCreationService()
let location = useLocation()
const stateData = location.state
let value = 0
    useEffect(() => {
      // getData()
      getItems()
      Login()
  },[])
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
    buyerService.getAllActiveBuyers().then(res=>{
      if(res.status){
            setBuyerId(res.data)
      }
    })
  }
  const itemChange = (val) =>{
    setSelected(val)
  }
  const getItems= () =>{
    itemService.getAll().then(res =>{
      if(res.status){
        setItem(res.data)
        
      }
      else{
        setItem([])
      }
    })
  }
  const checkAccess = (buttonParam) => {
    console.log(buttonParam,'22222');
    
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.OrderManagement,MenusAndScopesEnum.SubMenus["Customer Orders"],buttonParam)
    return !accessValue
}
 
  const getData = (val) => {
    const req = new styleOrderReq(val)
    if(role === MenusAndScopesEnum.roles.crmBuyer){
      req.buyerId = loginBuyer
  }
  
      service.getAllStyleOrdersByItem(req).then(res => {
          if(res.status){
              setData(res.data)
              res.data.map(e =>{ 
                // const totalQuantity = res.data.reduce((total, item) => total + item.qty, 0);
                // setTotalQty(totalQuantity);
                value = value+Number(e.qty)
                setTotalQty(val)
               })
               
              }
     
        
          
      })
      // deliveryTermService.getAllActiveDeliveryTerms().then(res=>{
      //   if(res.status){
      //         setDeliveryTerm(res.data)
      //   }
      // })
      // deliveryMethodService.getAllDeliveryMethods().then(res=>{
      //   if(res.status){
      //         setDeliveryMethod(res.data)
      //   }
      // })
      // paymentTermsService.getAllActivePaymentTerms().then(res=>{
      //   if(res.status){
      //         setPaymentTermsId([res.data]) 
      //   }
      // })
      // packingTermsService.getAllActivePackageTerms().then(res=>{
      //   if(res.status){
      //         setPackingTermsId(res.data)
      //        }
      // })
      // paymentMethodService.getAllActiveMethod().then(res=>{
      //   if(res.status){
      //         setPaymentMethodId(res.data)
      //        }
      // })
      // warehouseService.getAllActiveWarehouse().then(res=>{
      //   if(res.status){
      //         setWareHouseId(res.data)
      //        }
      // })
      // currencyService.getAllActiveCurrencys().then(res=>{
      //   if(res.status){
      //         setCurrencyId(res.data)
      //        }
      // })
  }
  const onReset = () => {
    form.resetFields();
  };

  const openFormWithData = (data) => {
    setDrawerVisible(true);
    setSelectedId(data.co_id);
    navigate('/materialCreation/style-order-creation',{state:{id:data.co_id}})
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

      const columnsSkelton: any = [
        {
          title: 'S No',
          key: 'sno',
          responsive: ['sm'],
          render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
            title: "CO Type",
            dataIndex: "co_type",
            sorter: (a, b) => a.co_type.localeCompare(b.co_type),
          ...getColumnSearchProps("co_type"),
          },
          {
          title: "Buyer",
          dataIndex: "buyer_name",
           render: (data,val) => {
            return val.buyer_name? val.buyer_name : "-";
          }
        },
        {
            title: "Style",
            dataIndex: "buyer_style",
          },
          {
            title: "Buyer PO",
            dataIndex: "buyer_po_number",
          },
          {
            title: "Agent",
            dataIndex: "agent",
            render: (data,val) => {
              return val.agent? val.agent : "-";
            }
          },
          {
            title: "Facility",
            dataIndex: "factory",
          },
          {
            title: "Warehouse",
            dataIndex: "warehouse_name",
         
          },
        {
          title: 'CO Num',
          dataIndex: 'co_number',
        },
     {
        title: "CO Date",
        dataIndex: "order_date",
        // render: (val,data) => {
        //   return data.order_date ?moment( data.order_date).format('YYYY-MM-DD') : "-";
        // }
      },
      
      {
        title: "Season",
        dataIndex: "season",
        render: (data,val) => {
          return val.season? val.season : "-";
        }
      },
       {
          title: 'Order Quantity',
          dataIndex: 'qty',
          render: (data,val) => {
            return val.qty? val.qty : "-";
          }
     },
     {
      title: 'Ex-Factory',
      dataIndex: 'exfactory_date',
      // render: (val,data) => {
      //   return data.exfactory_date?moment( data.exfactory_date).format('YYYY-MM-DD') : "-";
      // }
      // sorter: (a, b) => a.PiEx_Factory.localeCompare(b.PiEx_Factory),
  //   ...getColumnSearchProps("PiEx_Factory"),    
  },
  {
    title: 'Sales Price',
    dataIndex: 'sale_price',
    render: (data,val) => {
      return val.sale_price? val.sale_price : "-";
    }
  },
  {
    title: 'Quantity(pcs)',
    dataIndex: 'price_quantity',
    render: (data,val) => {
      return val.sale_price? val.sale_price : "-";
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text) => {
      const EnumObj = CustomerOrderStatusEnumDisplay.find((item) => item.name === text);
      return EnumObj ? EnumObj.displayVal : text;
    },  
    filters:[
        {
          text:'OPEN',
          value:'OPEN'
        },
        {
          text:'IN PROGRESS',
          value:'IN_PROGRESS'
        }, {
          text:'COMPLETED',
          value:'COMPLETED'
        },
        {
          text:'CLOSED',
          value:'CLOSED'
        },
        {
          text:'CONFIRMED',
          value:'CONFIRMED'
        }, 
       ],
      onFilter: (value,record) =>{ return record.status === value}

  },
  {
    title: `Action`,
    dataIndex: 'action',
    render: (text, rowData) => {
      
      return(
      <><span>
       <Button title={"Detail View"} onClick={() => details(rowData.co_id,rowData.fg_item_id)}>
          <EyeOutlined />
        </Button>
      </span>
      <Divider type="vertical"/>
      {rowData.status === CustomerOrderStatusEnum.CLOSED || checkAccess('Cancel') ? <><CloseOutlined disabled={true}/></> :
            <Popconfirm onConfirm={vale => { cancelOrder(rowData) }} title={"Are you sure to Cancel ?"}>
              <Tooltip title={'Cancel Order'}><CloseOutlined style={{color:'red'}} type='danger'/></Tooltip>
            </Popconfirm>
          }
    
      <Divider type="vertical"/>
    {
     checkAccess('Update') ?
      <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
      onClick={() => {
          openFormWithData(rowData);
      }}
      style={{ color: '#1890ff', fontSize: '14px' }}
    />
      : ""
    } 
      </>
      )
    }
  }
     // {
      //   title: "Shipment Type",
      //   dataIndex: "shipment_type",
      // },
      // {
      //   title: "Merchandiser",
      //   dataIndex: "merchandiser",
      // },
      // {
      //   title: "Planner",
      //   dataIndex: "planner",
      // },
  //    {
  //     title: 'Packing Terms',
  //     dataIndex: 'package_terms_id',
  //     render: (data) => {
  //       const packingTerms = packingTermsId.find((res) => res.packageTermsId === data);
  //       return packingTerms? packingTerms.packageTermsName : "-";
  //     } 
  // },
   
// {
//   title: 'In Store Date',
//   dataIndex: 'instore_date',
//   render: (val,data) => {
//     return data.instore_date?moment( data.instore_date).format('YYYY-MM-DD') : "-";
//   }
// },

// {
//   title: 'Discount(%)',
//   dataIndex: 'discount_amount',
//   render: (data,val) => {return( <span>{val.discount_amount}({val.discount_per}%)</span>)
//   } 
// },

// {
//   title: 'Payment Method',
//   dataIndex: 'Payment_method_id',
//   render: (data) => {
//     const paymentMethod = paymentMethodId.find((res) => res.paymentMethodId === data);
//     return paymentMethod? paymentMethod.paymentMethod : "-";
//   } 
// },{
//   title: 'Payment Terms',
//   dataIndex: 'Payment_terms_id',
//   render: (data) => {
//     const paymentTerm = paymentTermsId.find((res) => res.paymentTermsId === data);
//     return paymentTerm? paymentTerm.paymentTermsName : "-";
//   } 
// },
// {
//     title: 'Delivery Method',
//     dataIndex: 'delivery_method_id',
//     render: (data) => {
//       const delMethod = deliveryMethod.find((res) => res.deliveryMethodId === data);
//       return delMethod? delMethod.deliveryMethod : "-";
//     }
// },
// {
//     title: 'Delivery Terms',
//     dataIndex: 'delivery_terms_id',
//     render: (data) => {
//       const delTerm = deliveryTerm.find((res) => res.deliveryTermsId === data);
//       return delTerm? delTerm.deliveryTermsName : "-";
//     }
// },

      ];
      const cancelOrder =(val:any) =>{
        service.cancelOrder({styleOrderId:val.co_id}).then(res => {
          if(res.status){
            AlertMessages.getSuccessMessage("Order Cancelled successfully. ")
            getData(selected);
          }
          else{
            AlertMessages.getWarningMessage("Something went wrong. ")
          }
        }).catch(err => {
          AlertMessages.getErrorMessage("Something went wrong. ")
        })
      }
      const details =(coId:number,itemId:number) =>{
        navigate('/materialCreation/style-order-detail-view',{state :{co_id:coId,fg_item_id:itemId}})
      }
    
    return (
        <Card title='Style Orders'  extra={<span><Button onClick={() =>  navigate('/materialCreation/style-order-creation')}
              type={'primary'}>New</Button></span>} >
    <Form  form={form} onFinish={itemChange}>
    <Row gutter={[8,8]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item name='itemNo' label='Item'>
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Item' onSelect={(val)=>getData(val)}>
                        {
                            item.map((e) => {
                                return(
                                    <Option key={e.fg_item_id} value={e.fg_item_id} >{e.item_code}-{e.item_name}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          {/* } */}
          </Col>
        </Row>
                </Row>
    </Form>
    {selected && data.length>0? (    
    <Card>
    {/* <Row gutter={[8,8]}>
    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
   
   <Card title={'Total Qantity: ' + Number(total)} style={{marginBottom:5, textAlign: 'left', width: 200, height: 41, backgroundColor: '#fadada' }}></Card>
 </Col>
 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>

<Card title={'Total INV: ' +'' } style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#d8f0fc' }}></Card>
</Col>  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>

<Card title={'INV percent: ' + +'%'} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#d0fcb3' }}></Card>
</Col>
</Row> */}
        <Table
        size='small'
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} 
           columns={columnsSkelton}
          dataSource={data}
          pagination={{
            onChange(current) {
            setPage(current);
            }
          }}
          scroll={{x:'max-content'}}
          bordered />
          </Card>
           ):(<> 
            <Row>
               <Alert
               message="No data"
               type="info"
               style={{ margin: "auto",width:500 }}
               showIcon
             />
             </Row>
             </>)}

         
      {/* <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <StyleOrderCreation key={Date.now()}
            updateDetails={updateCoLine}
            isUpdate={true}
            coData={selectedId}
            closeForm={closeDrawer} />
        </Card>
      </Drawer> */}
      </Card> )
}
export default StyleOrderGrid