import { CloseOutlined } from "@ant-design/icons";
import { CustomerOrderStatusEnum, MenusAndScopesEnum, PackageTermsDto, PaymentMethodDto, PaymentTermsDto, styleOrderReq } from "@project-management-system/shared-models";
import { DeliveryMethodService, DeliveryTermsService, PackageTermsService, PaymentMethodService, PaymentTermsService, StyleOrderService, WarehouseService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";
import RolePermission from "../roles-permission";

export const StyleOrderDetailView = () => {
  const service = new StyleOrderService();
  const [data, setData] = useState<any[]>([]);
  let location = useLocation();
  const stateData = location.state;
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<any[]>([]);
  const [total,setTotalQty] =  useState<number>(0)
let val =0

  useEffect(() => {
    getData();
  }, []);
  const checkAccess = (buttonParam) => {
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus["Material Creation"],MenusAndScopesEnum.SubMenus["Style Order View"],buttonParam)
    return !accessValue
}
  const getData = () => {
    // const Idreq = new styleOrderReq(stateData.fg_item_id)

    const req = new styleOrderReq(stateData.fg_item_id,stateData.co_id);
    console.log(req,'reqs');
    
    service.getAllStyleOrdersByItem(req).then(res => {
      if(res.status){
        console.log(res.data[0].buyer_name,'resssssss');
        
          setDetailsData(res.data)
          res.data.map(e =>{ 
            // const totalQuantity = res.data.reduce((total, item) => total + item.qty, 0);
            // setTotalQty(totalQuantity);
            // val = val+Number(e?.qty)
            // setTotalQty(val?val:0)
           })
           
          }
 
    
      
  })
    service.getAllCoLinesById(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
   
    // paymentTermsService.getAllActivePaymentTerms().then(res=>{
    //     if(res.status){
    //           setPaymentTermsId(res.data[0].paymentTermsName)
    //     }
    //   })
    //   packingTermsService.getAllActivePackageTerms().then(res=>{
    //     if(res.status){
    //           setPackingTermsId(res.data[0].packageTermsName)
    //          }
    //   })
    //   paymentMethodService.getAllActiveMethod().then(res=>{
    //     if(res.status){
    //           setPaymentMethodId(res.data[0].paymentMethod)
    //          }
    //   })
    //   deliveryTermService.getAllActiveDeliveryTerms().then(res=>{
    //     if(res.status){
    //           setDeliveryTerm(res.data[0].deliveryTermsName)
    //     }
    //   })
    //   deliveryMethodService.getAllDeliveryMethods().then(res=>{
    //     if(res.status){
    //           setDeliveryMethod(res.data[0].deliveryMethod)
    //     }
    //   })
  };

  const cancelOrder =(val:any) =>{
    service.cancelVariantOrder({variantId:val.id}).then(res => {
      if(res.status){
        AlertMessages.getSuccessMessage("Order Cancelled successfully. ")
        getData();
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
      title: "FOB",
      dataIndex: "sale_price",
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

    {
      title: "Status",
      dataIndex: "status",
      //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
      // ...getColumnSearchProps("coNum"),
    },
    {
      title: `Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <>
        {
          rowData.status != CustomerOrderStatusEnum.CLOSED || checkAccess('Cancel')  ? 
        <span>
            <Button title={"Cancel Order"} onClick={() => cancelOrder(rowData)} >
              <CloseOutlined />
            </Button>
          </span>
          : ""
        }
        </>
      )
    }

  ];
  return (
    <Card
      title="Quantity Details"
      extra={
        <span>
          <Button
            onClick={() => navigate("/order-management/style-order-view")}
            type={"primary"}
          >
            Back
          </Button>
        </span>
      }
    >
      <Descriptions>
        <Descriptions.Item
          children={detailsData?.[0]?.co_number}
          label={"CO Number"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={detailsData?.[0]?.buyer_name}
          label={"Buyer"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={detailsData?.[0]?.qty}
          label={"Order Quantity"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
           {/* <Descriptions.Item
          children={detailsData?.[0]?.shipment_type}
          label={"Shipment Type"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />   */}
         <Descriptions.Item
        children={detailsData?.[0]?.buyer_po_number}
        label={"Buyer PO Number"}
        labelStyle={{
          color: "black",
          fontStyle: "italic",
          fontWeight: "bolder",
        }}
      /> 
        <Descriptions.Item
      children={detailsData?.[0]?.payment_terms_name}
      label={"Payment Terms"}
      labelStyle={{
        color: "black",
        fontStyle: "italic",
        fontWeight: "bolder",
      }}
    />   
    <Descriptions.Item
    children={detailsData?.[0]?.payment_method}
    label={"Payment Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
     <Descriptions.Item
    children={detailsData?.[0]?.package_terms_name}
    label={"Packing Terms"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
      <Descriptions.Item
    children={detailsData?.[0]?.warehouse_name}
    label={"Ware House"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={detailsData?.[0]?.delivery_method}
    label={"Delivery Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={detailsData?.[0]?.delivery_terms_name}
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
