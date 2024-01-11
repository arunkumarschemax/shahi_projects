
import { OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { RLOrdersService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table, message } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIAMClientState } from "../nike/iam-client-react";


const HBOrdersDetailView = () => {
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
             width: 200,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            // fixed: 'left'
        },
       
        {
            
            title:"Size",
            dataIndex: 'size',
            align:"center",
            width: 200,
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        },
    
        {
            // title: 'Unit Price',
            title: <div style={{textAlign:"center"}}>Unit Price</div>,

            dataIndex: 'unitPrice',
            width: 200,
            // align:"center",
            sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
           
        },
        {
            // title: 'Quantity',
            title: <div style={{textAlign:"center"}}>Quantity</div>,

            dataIndex: 'quantity',
            width: 200,
            // align:"center",
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
      
           
        },

       

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
          totalAmount: total.amount.toFixed(2),
          totalQuantity: total.quantity,
        };
      };
     
      const { totalAmount, totalQuantity } = getTotalAmountAndQuantity() 

    


    return (
        <Card title="Order Details"
        extra ={<Link to='/hb-athletics/hb-order-data-info-grid' ><Button className='panel_button' >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='Customer PO' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.custPo ? location?.state?.data?.custPo : "--"}</Descriptions.Item>
        <Descriptions.Item label='Style' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.style ? location?.state?.data?.style :"--"}</Descriptions.Item>
        <Descriptions.Item label='Delivery Date' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.exitFactoryDate ? location?.state?.data?.exitFactoryDate :"--"}</Descriptions.Item>
        <Descriptions.Item label='Address' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAdd ? location?.state?.data?.shipToAdd :"--"}</Descriptions.Item>






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
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                    <span style={{ textAlign: 'right', paddingRight: 8,marginLeft:400}}>
                                        <b>Total:</b>
                                    </span>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{totalQuantity}</b>
                                    </span>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
    
                       
                        </>
                        )}
                    ></Table>

        
        </Card>
    )

}
export default HBOrdersDetailView;