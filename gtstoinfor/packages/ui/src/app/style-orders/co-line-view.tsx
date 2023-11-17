import { CloseOutlined } from "@ant-design/icons";
import { CoLineStatusEnum, CoLineStatusEnumDisplay, CustomerOrderStatusEnum, MenusAndScopesEnum, PackageTermsDto, PaymentMethodDto, PaymentTermsDto, styleOrderReq } from "@project-management-system/shared-models";
import { DeliveryMethodService, DeliveryTermsService, PackageTermsService, PaymentMethodService, PaymentTermsService, StyleOrderService, WarehouseService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";
import RolePermission from "../roles-permission";
import moment from "moment";

export const CoLineView = () => {
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
        // console.log(res.data[0].buyer_name,'resssssss');
        
          setDetailsData(res.data)
          res.data.map(e =>{ 
            // const totalQuantity = res.data.reduce((total, item) => total + item.qty, 0);
            // setTotalQty(totalQuantity);
            // val = val+Number(e?.qty)
            // setTotalQty(val?val:0)
           })
           
          }
 
    
      
  })
    service.getAllCoLine(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
   
  };

//   const cancelOrder =(val:any) =>{
//     service.cancelVariantOrder({variantId:val.id}).then(res => {
//       if(res.status){
//         AlertMessages.getSuccessMessage("Order Cancelled successfully. ")
//         getData();
//       }
//       else{
//         AlertMessages.getWarningMessage("Something went wrong. ")
//       }
//     }).catch(err => {
//       AlertMessages.getErrorMessage("Something went wrong. ")
//     })
//   }

  const columnsSkelton: any = [
    {
      title: <div style={{textAlign:'center'}}>S No</div>,
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
        title: <div style={{textAlign:'center'}}>CO Line Number</div>,
        dataIndex: "co_line_number",
        align:'center',
        //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
        // ...getColumnSearchProps("coNum"),
      },
    //   {
    //     title: <div style={{textAlign:'center'}}>Buyer Po Num",
    //     dataIndex: "buyer_po_number",
    //   },
      {
        title: <div style={{textAlign:'center'}}>SKU Code</div>,
        dataIndex: "sku_code",
        align:'center',
      },
    {
      title: <div style={{textAlign:'center'}}>Size</div>,
      dataIndex: "size",
    },
    {
      title: <div style={{textAlign:'center'}}>Color</div>,
      dataIndex: "colour",
    },
    {
      title: <div style={{textAlign:'center'}}>Destination</div>,
      dataIndex: "destination",
    },
    {
      title: <div style={{textAlign:'center'}}>FOB</div>,
      dataIndex: "sale_price",
      align:'center',
    },
    {
      title: <div style={{textAlign:'center'}}>Qty</div>,
      dataIndex: "order_quantity",
      align:'center',
    render:(data,val) =>{
       return( <span>{val.order_quantity}-{val.uom}</span>)
    }
    },
    {
        title: <div style={{textAlign:'center'}}>season</div>,
        dataIndex: "season_code",
        align:'center',
      },
    {
      title: <div style={{textAlign:'center'}}>Exf Date</div>,
      dataIndex: "exf_date",
      align:'center',
    render:(data,val) =>{
       return( val.exf_date? moment(val.exf_date).format('DD-MM-YYYY'):'-')
    }
    },
    {
        title: <div style={{textAlign:'center'}}>Delivery Date</div>,
        dataIndex: "delivery_date",
        align:'center',
      render:(data,val) =>{
         return( val.delivery_date? moment(val.delivery_date).format('DD-MM-YYYY'):'-')
      }
      },
      {
        title: <div style={{textAlign:'center'}}>Status</div>,
        dataIndex: 'status',
        render: (text) => {
          const EnumObj = CoLineStatusEnumDisplay.find((item) => item.name === text);
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
    // {
    //   title: `Action`,
    //   dataIndex: 'action',
    //   render: (text, rowData) => (
    //     <>
    //     {
    //       rowData.status != CustomerOrderStatusEnum.CLOSED || checkAccess('Cancel')  ? 
    //     <span>
    //         <Button title={"Cancel Order"} onClick={() => cancelOrder(rowData)} >
    //           <CloseOutlined />
    //         </Button>
    //       </span>
    //       : ""
    //     }
    //     </>
    //   )
    // }

  ];
  return (
    <Card
      title="Co Lines"
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
          children={detailsData?.[0]?.order_number}
          label={"Order Number"}
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
export default CoLineView;
