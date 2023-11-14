// import { Button, Card, Col, Descriptions, Form, Row, Select, Tabs } from 'antd';
// import type { TabsProps } from 'antd';
// import { useEffect, useState } from 'react';
// import {  StyleOrderService } from '@project-management-system/shared-services';
// import { StyleOrderIdReq } from '@project-management-system/shared-models';
// import moment from 'moment';
// import COAmendmentGrid from './co-amendment-grid';

// export interface COAmendmentTabsProps {}
// const COAmendmentTabs = (props: COAmendmentTabsProps) => {

//   const [activeTab, setActiveTab] = useState<any>();
//   const [form] = Form.useForm();
//   const {Option} = Select;

//   const styleorderService = new StyleOrderService()


//   const [codata, setCOData] = useState<any[]>([]);
//   const [coId, setCoId] = useState<any>();
//   const [data, setData] = useState<any[]>([]);
 




//   const onChange = (key: string) =>  {
//     console.log('onChange', key)
//     setActiveTab(key);
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   useEffect(() => {
//     getCoData();
   
//   }, []);

//   const getCoData = () => {

//     styleorderService.getCoNumber().then((res) => {
//       if (res.status) {
//         setCOData(res.data);
//        }
//     });
// }
//   const onchange =(value)=>{
//     setCoId(value)
//   }
  
//   const getData = () =>{
//     const req = new StyleOrderIdReq(coId,undefined)
//     styleorderService.getCOInfoById(req).then((res) => {
//       if (res.status) {
//         setData(res.data);
//        }
//     });

//   }

//   console.log(data,"data1111111111111")
//   console.log(activeTab,"activeTab")

 

 
  


//   const items: TabsProps['items'] = [
//     {
//       key: 'orderline',
//       label: (
//         <span style={{ color: "black" }}>
//          Change Order Line
//         </span>
//       ),
//       children: <COAmendmentGrid poData={data}  activeTab={activeTab}/>,
//     },
//     {
//       key: 'fob',
//       label: (
//         <span style={{ color:"black" }}>
//          Change FOB
//         </span>
//       ),
//       children: <COAmendmentGrid poData={data} activeTab={activeTab}  />,

//     },
//     {
//       key: 'deliverydate',
//       label: (
//         <span style={{ color: "black" }}>
//          Change Delivery Date
//         </span>
//       ),
//       children: <COAmendmentGrid poData={data}  activeTab={activeTab} />

//     },
//     {
//       key: 'quantity',
//       label: (
//         <span style={{ color:"black" }}>
//           Change Quantity
//         </span>
//       ),
//       children: <COAmendmentGrid poData={data}  activeTab={activeTab} />,

//     },
//     {
//       key: 'vponumber',
//       label: (
//         <span style={{ color: "black" }}>
//           Change VPO Number
//         </span>
//       ),
//      children: <COAmendmentGrid poData={data}  activeTab={activeTab} />,

//     },
//     {
//       key: 'destinationaddress',
//       label: (
//         <span style={{ color:"black" }}>
//           Change Destination Address
//         </span>
//       ),
//       children: <COAmendmentGrid poData={data} activeTab={activeTab}/>
//     },
   
  
//   ];

//   return (
//     <Card
//       title="CO Amendment"
      
//     >
//         <Form  form={form} >
//     <Row gutter={24}>
//                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
//                 <Form.Item name='coNumber' label='CO Number' >
//                     <Select showSearch allowClear optionFilterProp="children" placeholder='Select CO Line' onChange={onchange} >
//                     {
//                             codata.map((e) => {
//                                 return(
//                                     <Option key={e.coId} value={e.coId}>{e.coNumber}</Option>
//                                 )
//                             })
//                         }

//                     </Select>
//                 </Form.Item>
//                 </Col>
//                 <Row>
//           <Col span={24} style={{ textAlign: 'right' }}>
//             <Button type="primary" htmlType="submit" onClick={getData}>
//               Submit
//             </Button>
//          <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
//             Reset
//           </Button>
//           </Col>
//         </Row>
//     </Row>
//     </Form>
//    { data.length > 0 ? 
//      <Descriptions >
//           <Descriptions.Item label='CO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.coNumber}</Descriptions.Item>
//           <Descriptions.Item label='Item Code'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.itemCode}</Descriptions.Item>
//            <Descriptions.Item label='Order Date'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.orderDate ? moment(data[0].orderDate).format('DD-MM-YYYY') : ''}</Descriptions.Item>
//             <Descriptions.Item label='Buyer Style'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerStyle}</Descriptions.Item>
//             <Descriptions.Item label='Sale Price'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.salePrice}</Descriptions.Item>
//             <Descriptions.Item label='Shipment Type'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.shipmentType}</Descriptions.Item>
//             <Descriptions.Item label='Buyer PO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerPoNumber}</Descriptions.Item>
//             <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item> 
//             <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.agentName}</Descriptions.Item>
//             <Descriptions.Item label='BuyerAddress'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.landmark}-{data[0]?.city}-{data[0]?.state}</Descriptions.Item> 
//             <Descriptions.Item label='ExFactoryDate'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.exFactoryDate ? moment(data[0].exFactoryDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
//             <Descriptions.Item label='Delivery Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryDate ? moment(data[0].deliveryDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
//             <Descriptions.Item label='Instore Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.instoreDate ? moment(data[0].instoreDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
//             <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item>
//             <Descriptions.Item label='Discount Percent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountPercent}</Descriptions.Item>
//             <Descriptions.Item label='Discount Amount 'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountAmount}</Descriptions.Item>
//             <Descriptions.Item label='Payment Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.paymentMethod}</Descriptions.Item>
//             <Descriptions.Item label='Packing Terms'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.packageTermsName}</Descriptions.Item>
//             <Descriptions.Item label='Ware House'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.warehouseName}</Descriptions.Item>
//             <Descriptions.Item label='Delivery Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryMethod}</Descriptions.Item>
//             <Descriptions.Item label='Delivery Term'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryTermsName}</Descriptions.Item>
//             <Descriptions.Item label='Remarks'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.remarks}</Descriptions.Item>
//             <Descriptions.Item label='Status'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.status}</Descriptions.Item>


//      </Descriptions>
//     : ""  }
   
//    { data.length > 0 ? 
//    <Card>
//     <Tabs items={items} onChange={onChange}    className="custom-tab-styles" tabPosition="left" />
//    </Card>
//     : ""}

//     </Card>

//   )
// }

// export default COAmendmentTabs;

import { Button, Card, Col, Descriptions, Form, Row, Select, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { BuyersService, StyleOrderService } from '@project-management-system/shared-services';
import { BuyerExtrnalRefIdReq, MenusAndScopesEnum, StyleOrderIdReq } from '@project-management-system/shared-models';
import moment from 'moment';
import COAmendmentGrid from './co-amendment-grid';

export interface COAmendmentTabsProps {}
const COAmendmentTabs = (props: COAmendmentTabsProps) => {
    const [activeTab, setActiveTab] = useState<any>();
  const [form] = Form.useForm();
  const {Option} = Select;

  const styleorderService = new StyleOrderService()


  const [codata, setCOData] = useState<any[]>([]);
  const [coId, setCoId] = useState<any>();
  const [data, setData] = useState<any[]>([]);
 
  const [userId, setUserId] = useState([]); 
  const [loginBuyer,setLoginBuyer] = useState<number>(0)
  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
let userRef
const buyerService = new BuyersService();


  const onChange = (key: string) =>  {
    console.log('onChange', key)
    setActiveTab(key);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    getCoData();
   
  }, []);
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
  const getCoData = () => {

    styleorderService.getCoNumber().then((res) => {
      if (res.status) {
        setCOData(res.data);
       }
    });
}
  const onchange =(value)=>{
    setCoId(value)
  }
  
  const getData = () =>{
    const req = new StyleOrderIdReq(coId,undefined)
    if(role === MenusAndScopesEnum.roles.crmBuyer){
      req.buyerId = loginBuyer
  }
  
    styleorderService.getCoLineDataById(req).then((res) => {
      if (res.status) {
        setData(res.data);
       }
    });

  }

  console.log(data,"data1111111111111")
  console.log(activeTab,"activeTab")


  const generateTab = (key: string, label: string, color: string) => ({
    key,
    label: (
      <span style={{ color }}>
        {label}
      </span>
    ),
    children: <COAmendmentGrid poData={data} activeTab={activeTab} />,
  });

  const items: TabsProps['items'] = [
    generateTab('orderline', 'Change Order Line', 'black'),
    generateTab('fob', 'Change FOB', 'black'),
    generateTab('deliverydate', 'Change Delivery Date', 'black'),
    generateTab('quantity', 'Change Quantity', 'black'),
    generateTab('vponumber', 'Change VPO Number', 'black'),
    generateTab('destinationaddress', 'Change Destination Address', 'black'),
  ];

  return (
    <Card title="CO Amendment">
       <Form  form={form} >
         <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                    <Form.Item name='coNumber' label='CO Number' >
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select CO Number' onChange={onchange} >
                        {
                           codata.map((e) => {
                                    return(
                                        <Option key={e.coId} value={e.coId}>{e.orderNumber}</Option>
                                    )
                                })
                            }
    
                        </Select>
                    </Form.Item>
                    </Col>
                    <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" onClick={getData}>
                  Submit
                </Button>
             <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                Reset
              </Button>
              </Col>
            </Row>
        </Row>
        </Form>
       { data.length > 0 ? 
         <Descriptions >
              <Descriptions.Item label='CO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.orderNumber}</Descriptions.Item>
              <Descriptions.Item label='Item Code'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.itemCode}</Descriptions.Item>
               <Descriptions.Item label='Order Date'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.orderDate ? moment(data[0].orderDate).format('DD-MM-YYYY') : ''}</Descriptions.Item>
               <Descriptions.Item label='Buyer Name'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerInfo?.buyerName}</Descriptions.Item>     
                <Descriptions.Item label='Buyer Style'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerStyle}</Descriptions.Item>
                <Descriptions.Item label='Buyer PO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerPoNumber}</Descriptions.Item>
                <Descriptions.Item label='Sale Price'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.salePrice}</Descriptions.Item>
                <Descriptions.Item label='Shipment Type'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.shipmentType}</Descriptions.Item>
                <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item> 

                {/* <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.agentName}</Descriptions.Item> */}
                {/* <Descriptions.Item label='BuyerAddress'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.landmark}-{data[0]?.city}-{data[0]?.state}</Descriptions.Item>  */}
                <Descriptions.Item label='Instore Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.instoreDate ? moment(data[0].instoreDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
                <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item>
                <Descriptions.Item label='Discount Percent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountPercent}</Descriptions.Item>
                <Descriptions.Item label='Discount Amount 'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountAmount}</Descriptions.Item>
                {/* <Descriptions.Item label='Payment Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.paymentMethod}</Descriptions.Item> */}
                {/* <Descriptions.Item label='Packing Terms'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.packageTermsName}</Descriptions.Item> */}
                {/* <Descriptions.Item label='Ware House'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.warehouseName}</Descriptions.Item> */}
                {/* <Descriptions.Item label='Delivery Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryMethod}</Descriptions.Item> */}
                {/* <Descriptions.Item label='Delivery Term'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryTermsName}</Descriptions.Item> */}
                <Descriptions.Item label='Item SalePrice Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.itemSalePriceQty}</Descriptions.Item>
                <Descriptions.Item label='Remarks'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.remarks}</Descriptions.Item>
                <Descriptions.Item label='Status'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.status}</Descriptions.Item>
    
    
         </Descriptions>
        : ""  }
       
       { data.length > 0 ? 
       <Card>
        <Tabs items={items} onChange={onChange}    className="custom-tab-styles" tabPosition="left"  />
       </Card>
        : ""}
    
        </Card>
  );
}

export default COAmendmentTabs;



