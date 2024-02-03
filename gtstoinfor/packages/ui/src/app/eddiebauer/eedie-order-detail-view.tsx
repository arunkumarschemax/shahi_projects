
import { OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { RLOrdersService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table, message } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIAMClientState } from "../nike/iam-client-react";


const EddieOrdersDetailView = () => {
const [page, setPage] = React.useState(1);
const [pageSize, setPageSize] = useState(1);
const [data, setData] = useState<any[]>([]);
let location = useLocation();
const service = new RLOrdersService();
const [orderData, setOrderData] = useState<any>([]);
const { IAMClientAuthContext, dispatch } = useIAMClientState();

console.log(location?.state?.data)


// useEffect(() => {
//     // getorderData();
//   }, []);


    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            align:"center",
              width: 40,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            // fixed: 'left'
        },
       
        {
            
            title:"Size",
            dataIndex: 'size',
            align:"center",
            width: 100,
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        },
        {
          
            title: <div style={{textAlign:"center"}}>Size Code </div>,

            dataIndex: 'sizeCode',
            width: 100,
            align:"center",
            sorter: (a, b) => a.sizeCode.localeCompare(b.sizeCode),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
           
            title: <div style={{textAlign:"center"}}>UPC</div>,

            dataIndex: 'upc',
            width: 150,
            align:"center",
            sorter: (a, b) => a.upc.localeCompare(b.upc),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            
            title: <div style={{textAlign:"center"}}>SKU</div>,

            dataIndex: 'sku',
            width: 130,
            align:"center",
            sorter: (a, b) => a.sku.localeCompare(b.sku),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },

        {
          
            title: <div style={{textAlign:"center"}}>Qty Per Inner Pack</div>,

            dataIndex: 'quantityPerInnerPack',
            width: 120,
            // align:"center",
            sorter: (a, b) => a.quantityPerInnerPack.localeCompare(b.quantityPerInnerPack),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
           
            title: <div style={{textAlign:"center"}}>Retail Price</div>,

            dataIndex: 'retailPrice',
            width: 120,
            // align:"center",
            sorter: (a, b) => a.retailPrice.localeCompare(b.retailPrice),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            // title: 'Quantity',
            title: <div style={{textAlign:"center"}}>Quantity</div>,

            dataIndex: 'quantity',
            width: 120,
            // align:"center",
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            sortDirections: ["ascend", "descend"],
            // render: (text) => text ? text : "-"
            render: (text, record) => `${record.quantity} ${record.unit} `
      
           
        },
        {
            // title: 'Quantity',
            title: <div style={{textAlign:"center"}}>Unit Cost</div>,

            dataIndex: 'unitCost',
            width: 140,
            // align:"center",
            sorter: (a, b) => a.unitCost.localeCompare(b.unitCost),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        
      
           
        },
        {
            title: <div style={{ textAlign: "center" }}>Cost</div>,
            dataIndex: 'cost',
            width: 140,
            sorter: (a, b) => a.cost.localeCompare(b.cost),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        }
       

    ]
   

    const getTotalAmountAndQuantity = () => {
        const total = location?.state?.data?.sizeWiseData.reduce(
          (accumulator, item) => {
            // accumulator.amount += parseFloat(item.totalQuantity ) || 0;
            accumulator.quantity += parseInt(item.quantity, 10) || 0;
            return accumulator;
          },
          { amount: 0, quantity: 0 }
        );
    
        return {
          totalQuantity: total.quantity,
          totalAmount: total.quantity * location?.state?.data?.sizeWiseData[0]?.unitPrice || 0,
        };
      };
     
      const { totalAmount, totalQuantity } = getTotalAmountAndQuantity() 

    


    return (
        <Card title="Order Details"
        extra ={<Link to='/eddiebauer/eddiebauer-order-data-info-grid' ><Button className='panel_button' type="primary" >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?.poNumber ? location?.state?.data?.poNumber : "--"}</Descriptions.Item>
        <Descriptions.Item label='PO Date' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?. poDate ? location?.state?.data?. poDate : "--"}</Descriptions.Item>
        <Descriptions.Item label='Buyer Item' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.buyerItem ? location?.state?.data?.buyerItem :"--"}</Descriptions.Item>
        {/* <Descriptions.Item label='Color' labelStyle={{ color: 'black', fontWeight: 'bold',marginLeft:150 }} >{location?.state?.data?.color ? location?.state?.data?.color :"--"}</Descriptions.Item> */}
        <Descriptions.Item label= 'Consignee' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.buyerAddress ? location?.state?.data?.buyerAddress :"--"}</Descriptions.Item>
        {/* <Descriptions.Item label='Delivery Date' labelStyle={{ color: 'black', fontWeight: 'bold',marginLeft:150 }} >{location?.state?.data?.deliveryDate ? location?.state?.data?.deliveryDate :"--"}</Descriptions.Item> */}
        <Descriptions.Item label='Delivery Address' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAdd ? location?.state?.data?.shipToAdd :"--"}</Descriptions.Item>







        </Descriptions>
          <br></br>
       
                     <Table
                        size="small"
                        columns={columns}
                        dataSource={location?.state?.data?.sizeWiseData}
                        className="custom-table-wrapper"
                        // pagination={{
                        // pageSize: 50,
                        // onChange(current, pageSize) {
                        //     setPage(current);
                        //     setPageSize(pageSize);
                        // },
                        // }}
                        pagination={false}
                        // scroll={{ y: 450 }}
                        summary={() => (
                        <>
    
                                <Table.Summary.Row className="tableFooter">
                                    <Table.Summary.Cell index={0} colSpan={7}>
                                    <span style={{ textAlign: 'right', paddingRight: 5,marginLeft:100}}>
                                        <b>Total  :</b>
                                    </span>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{totalQuantity}</b>
                                    </span>
                                    </Table.Summary.Cell>
                            
                                    
                                </Table.Summary.Row>
                              
    
                       
                        </>
                        )
                    }
                    ></Table>

        
        </Card>
    )

}
export default EddieOrdersDetailView;