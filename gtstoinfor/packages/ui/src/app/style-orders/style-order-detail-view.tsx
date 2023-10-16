import { PackageTermsDto, PaymentMethodDto, PaymentTermsDto, styleOrderReq } from "@project-management-system/shared-models";
import { DeliveryMethodService, DeliveryTermsService, PackageTermsService, PaymentMethodService, PaymentTermsService, StyleOrderService, WarehouseService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const StyleOrderDetailView = () => {
  const service = new StyleOrderService();
  const [data, setData] = useState<any[]>([]);
  let location = useLocation();
  const stateData = location.state;
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const[paymentTermsId,setPaymentTermsId] = useState();
  const paymentTermsService = new PaymentTermsService()
  const[packingTermsId,setPackingTermsId] = useState('');
  const packingTermsService = new PackageTermsService()
  const[paymentMethodId,setPaymentMethodId] = useState('');
  const paymentMethodService = new PaymentMethodService()
  const[wareHouseId,setWareHouseId] = useState('');
  const warehouseService = new WarehouseService()
  const deliveryTermService = new DeliveryTermsService();
  const[deliveryTerm,setDeliveryTerm] = useState('');
    const deliveryMethodService = new DeliveryMethodService();
    const[deliveryMethod,setDeliveryMethod] = useState('');
  console.log(stateData, "idddddddd");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const req = new styleOrderReq(undefined, stateData.id);
    console.log(req, "reqqqqqqqqqqq");

    service.getAllCoLinesById(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
    warehouseService.getAllActiveWarehouse().then(res=>{
        if(res.status){
              setWareHouseId(res.data[0].warehouseName)
             }
      })
    paymentTermsService.getAllActivePaymentTerms().then(res=>{
        if(res.status){
              setPaymentTermsId(res.data[0].paymentTermsName)
        }
      })
      packingTermsService.getAllActivePackageTerms().then(res=>{
        if(res.status){
              setPackingTermsId(res.data[0].packageTermsName)
             }
      })
      paymentMethodService.getAllActiveMethod().then(res=>{
        if(res.status){
              setPaymentMethodId(res.data[0].paymentMethod)
             }
      })
      deliveryTermService.getAllActiveDeliveryTerms().then(res=>{
        if(res.status){
              setDeliveryTerm(res.data[0].deliveryTermsName)
        }
      })
      deliveryMethodService.getAllDeliveryMethods().then(res=>{
        if(res.status){
              setDeliveryMethod(res.data[0].deliveryMethod)
        }
      })
  };

  const columnsSkelton: any = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Size",
      dataIndex: "size",
      
    },

    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Destination",
      dataIndex: "destination",
    
    },
    {
      title: "Qty",
      dataIndex: "order_quantity",
    render:(data,val) =>{
       return( <span>{val.order_quantity}-{val.uom}</span>)
    }
    },
    {
      title: "CO Line Number",
      dataIndex: "coline_number",
      
      //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
      // ...getColumnSearchProps("coNum"),
    },

  ];
  return (
    <Card
      title="Quantity Details"
      extra={
        <span>
          <Button
            onClick={() => navigate("/materialCreation/style-order-view")}
            type={"primary"}
          >
            Back
          </Button>
        </span>
      }
    >
      <Descriptions>
        <Descriptions.Item
          children={stateData.co_number}
          label={"CO Number"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={stateData.buyer}
          label={"Buyer"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={stateData.qty}
          label={"Order Quantity"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
           <Descriptions.Item
          children={stateData.shipment_type}
          label={"Shipment Type"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />  
         <Descriptions.Item
        children={stateData.buyer_po_number}
        label={"Buyer PO Number"}
        labelStyle={{
          color: "black",
          fontStyle: "italic",
          fontWeight: "bolder",
        }}
      /> 
        <Descriptions.Item
      children={paymentTermsId}
      label={"Payment Terms"}
      labelStyle={{
        color: "black",
        fontStyle: "italic",
        fontWeight: "bolder",
      }}
    />   
    <Descriptions.Item
    children={paymentMethodId}
    label={"Payment Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
     <Descriptions.Item
    children={packingTermsId}
    label={"Packing Terms"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
      <Descriptions.Item
    children={wareHouseId}
    label={"Ware House"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={deliveryMethod}
    label={"Delivery Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={deliveryTerm}
    label={"Delivery Term"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
      </Descriptions>
      <Table
        size="small"
        dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        columns={columnsSkelton}
        pagination={false}
      />
    </Card>
  );
};
export default StyleOrderDetailView;
