
import { OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { RLOrdersService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table, message } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIAMClientState } from "../nike/iam-client-react";


const CentricOrdersDetailView = () => {
const [page, setPage] = React.useState(1);
const [pageSize, setPageSize] = useState(1);
const [data, setData] = useState<any[]>([]);
let location = useLocation();
const service = new RLOrdersService();
const [orderData, setOrderData] = useState<any>([]);
const { IAMClientAuthContext, dispatch } = useIAMClientState();




useEffect(() => {
    // getorderData();
  }, []);

//   const getorderData = () => {
//     const req = new PoOrderFilter(location?.state?.data?.poNumber);
//     req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
//     service.getorderDataByPoNumber(req).then((res) => {
//       if (res.status) {
//         setOrderData(res.data);
//       } else {
//         message.error(res.internalMessage)
//       }
//     });
//   };


//  console.log(location?.state?.data,"yyyyyyyyyyyyy")
//  console.log(location?.state?.data?.sizeWiseData,"yyyyhhhyyyyyyyyy")




    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            align:"center",
            // width: 25,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            // fixed: 'left'
        },
       
        {
            title: 'Ratio',
            dataIndex: 'ratio',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.ratio.localeCompare(b.ratio),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            
            title:"Size",
            dataIndex: 'size',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        },
        {
            
            title:"UPC",
            dataIndex: 'upc',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.upc.localeCompare(b.upc),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        },
        {
            title: 'label',
            dataIndex: 'label',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.label.localeCompare(b.label),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            title: 'fob Price',
            dataIndex: 'fobPrice',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.fobPrice.localeCompare(b.fobPrice),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalQuantity',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.totalQuantity.localeCompare(b.totalQuantity),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
      
           
        },
        
        {
            title: 'Ex Factory',
            dataIndex: 'exfactory',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.exfactory.localeCompare(b.exfactory),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            title: 'Export',
            dataIndex: 'exportDate',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.exportDate.localeCompare(b.exportDate),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.deliveryDate.localeCompare(b.deliveryDate),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Retail Price',
            dataIndex: 'retailPrice',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.retailPrice.localeCompare(b.retailPrice),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },

    ]
   

    const getTotalAmountAndQuantity = () => {
        const total = orderData.reduce(
          (accumulator, item) => {
            accumulator.amount += parseFloat(item.amount) || 0;
            accumulator.quantity += parseInt(item.quantity, 10) || 0;
            return accumulator;
          },
          { amount: 0, quantity: 0 }
        );
    
        return {
          totalAmount: total.amount.toFixed(2),
          totalQuantity: total.quantity,
        };
      };
     
      const { totalAmount, totalQuantity } = getTotalAmountAndQuantity() 

    


    return (
        <Card title="Order Detail View"
        extra ={<Link to='/centric/order-data-info-grid' ><Button className='panel_button' >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='Material'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.material ? location.state.data.material : "--"}</Descriptions.Item>
        <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poNumber ? location?.state?.data?.poNumber : "--"}</Descriptions.Item>
        <Descriptions.Item label='PO Line' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poLine ? location?.state?.data?.poLine :"--"}</Descriptions.Item>
        <Descriptions.Item label='PO Date' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.PODate ? location?.state?.data?.PODate :"--"}</Descriptions.Item>
        <Descriptions.Item label='Pack Method' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.packMethod ? location?.state?.data?.packMethod :"--"}</Descriptions.Item>
        <Descriptions.Item label='Season'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.season ? location?.state?.data?.season :"--"}</Descriptions.Item>
        <Descriptions.Item label='Payment Term Description'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.paymentTermDescription ? location?.state?.data?.paymentTermDescription :"--"}</Descriptions.Item>
        <Descriptions.Item label='Color'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.color ? location?.state?.data?.color :"--"}</Descriptions.Item>
        <Descriptions.Item label='Division'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.division ? location?.state?.data?.division :"--"}</Descriptions.Item>
        <Descriptions.Item label='Shipment Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipmentMethod ? location?.state?.data?.shipmentMethod :"--"}</Descriptions.Item>
        <Descriptions.Item label='Ship Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipDate ? location?.state?.data?.shipDate :"--"}</Descriptions.Item>
        <Descriptions.Item label='Ship To Address'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAddress ? location?.state?.data?.shipToAddress :"--"}</Descriptions.Item>
        <Descriptions.Item label='Short Description'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shortDescription ? location?.state?.data?.shortDescription :"--"}</Descriptions.Item>
        <Descriptions.Item label='Compt Material'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.comptMaterial ? location?.state?.data?.comptMaterial :"--"}</Descriptions.Item>
        <Descriptions.Item label='PPK UPC'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.ppkUpc ? location?.state?.data?.ppkUpc :"--"}</Descriptions.Item>
        <Descriptions.Item label='Vendor Booking Flag'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.vendorFlag ? location?.state?.data?.vendorFlag :"--"}</Descriptions.Item>





        </Descriptions>
          <br></br>
       
                     <Table
                        size="small"
                        columns={columns}
                        dataSource={location?.state?.data?.sizeWiseData}
                        className="custom-table-wrapper"
                        pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                        }}
                        // scroll={{ y: 450 }}
                        // summary={() => (
                        // <>
                        //     <Table.Summary.Row className="tableFooter">
                                
                        //             <Table.Summary.Cell index={1} colSpan={5}>
                        //             <span style={{ marginLeft:600 }}>
                        //                 <b>PO Line Total</b>
                        //             </span>
                                
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span>
                        //                 <b>{Number(totalQuantity)}</b>
                        //             </span>
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span>
                        //                 <b>{Number(totalAmount)} {location?.state?.data?.currency} </b>
                        //             </span>
                        //             </Table.Summary.Cell>
                                    

                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span style={{ textAlign: "end" }}>
                        //             </span>
                        //             </Table.Summary.Cell>
                        //         </Table.Summary.Row>
                        //         <Table.Summary.Row className="tableFooter">
                                
                        //             <Table.Summary.Cell index={1} colSpan={5}>
                        //             <span style={{ marginLeft:600 }}>
                        //                 <b>Purchase Order Total</b>
                        //             </span>
                                
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span>
                        //                 <b>{Number(totalQuantity)}</b>
                        //             </span>
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span>
                        //                 <b>{Number(totalAmount)} {location?.state?.data?.currency} </b>
                        //             </span>
                        //             </Table.Summary.Cell>
                                    

                        //             <Table.Summary.Cell index={1} colSpan={1}>
                        //             <span style={{ textAlign: "end" }}>
                        //             </span>
                        //             </Table.Summary.Cell>
                        //         </Table.Summary.Row>
                        // </>
                        // )}
                    ></Table>

        
        </Card>
    )

}
export default CentricOrdersDetailView;