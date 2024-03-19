
import { OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { RLOrdersService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table, message } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIAMClientState } from "../nike/iam-client-react";


const PvhOrdersDetailView = () => {
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
        // {
          
        //     title: <div style={{textAlign:"center"}}>Product</div>,

        //     dataIndex: 'product',
        //     width: 100,
        //     align:"center",
        //     sorter: (a, b) => a.product.localeCompare(b.product),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
           
        // },
        // {
           
        //     title: <div style={{textAlign:"center"}}>UPC</div>,

        //     dataIndex: 'upc',
        //     width: 150,
        //     align:"center",
        //     sorter: (a, b) => a.upc.localeCompare(b.upc),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
           
        // },
        // {
            
        //     title: <div style={{textAlign:"center"}}>plannedExFactoryDate</div>,

        //     dataIndex: 'plannedExFactoryDate',
        //     width: 130,
        //     align:"center",
        //     sorter: (a, b) => a.plannedExFactoryDate.localeCompare(b.plannedExFactoryDate),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
           
        // },

        // {
          
        //     title: <div style={{textAlign:"center"}}>Ex Factory Date</div>,

        //     dataIndex: 'exFactoryDate',
        //     width: 120,
        //     // align:"center",
        //     sorter: (a, b) => a.exFactoryDate.localeCompare(b.exFactoryDate),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
           
        // },
    
        {
            // title: 'Quantity',
            title: <div style={{textAlign:"center"}}>Unit Price</div>,

            dataIndex: 'unitPrice',
            width: 120,
            align:"right",
            sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
            sortDirections: ["ascend", "descend"],
            // render: (text) => text ? text : "-"
            render: (text, record) => `${record.unitPrice}`
      
           
        },
        {
           
            title: <div style={{textAlign:"center"}}>Quantity</div>,

            dataIndex: 'quantity',
            width: 120,
            align:"right",
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        // {
        //     // title: 'Quantity',
        //     title: <div style={{textAlign:"center"}}>Unit Cost</div>,

        //     dataIndex: 'unitCost',
        //     width: 140,
        //     // align:"center",
        //     sorter: (a, b) => a.unitCost.localeCompare(b.unitCost),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
        
      
           
        // },
        // {
        //     title: <div style={{ textAlign: "center" }}>Cost</div>,
        //     dataIndex: 'cost',
        //     width: 140,
        //     sorter: (a, b) => a.cost.localeCompare(b.cost),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-"
        // }
       

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
        extra ={<Link to='/pvh/pvh-order-data-info-grid' ><Button className='panel_button' type="primary" >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?.poNumber ? location?.state?.data?.poNumber : "--"}</Descriptions.Item>
         <Descriptions.Item label='PO Line' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?. poLine ? location?.state?.data?. poLine : "--"}</Descriptions.Item> 
        <Descriptions.Item label='Transport Mode' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.transMode ? location?.state?.data?.transMode :"--"}</Descriptions.Item>
        <Descriptions.Item label='Currency' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?.currency ? location?.state?.data?.currency :"--"}</Descriptions.Item>
        <Descriptions.Item label= 'Material' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.material ? location?.state?.data?.material :"--"}</Descriptions.Item>
        <Descriptions.Item label= 'Delivery Date' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.deliverDate ? location?.state?.data?.deliverDate :"--"}</Descriptions.Item>
         {/* <Descriptions.Item label='Total Unit Price' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.totalUnitPrice ? location?.state?.data?.totalUnitPrice :"--"}</Descriptions.Item> 
         <Descriptions.Item label='Original Date' labelStyle={{ color: 'black', fontWeight: 'bold'}} >{location?.state?.data?.originalDate ? location?.state?.data?.originalDate :"--"}</Descriptions.Item> 
        <Descriptions.Item label='Delivery Address' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.buyerAddress ? location?.state?.data?.buyerAddress :"--"}</Descriptions.Item> */}







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
                                    <span style={{ textAlign: 'right', paddingRight: 5,marginLeft:250}}>
                                        <b>Total Quantity :</b>
                                    </span>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span style={{ textAlign: 'right', paddingRight: 5,marginLeft:"-30px"}}>
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
export default PvhOrdersDetailView;