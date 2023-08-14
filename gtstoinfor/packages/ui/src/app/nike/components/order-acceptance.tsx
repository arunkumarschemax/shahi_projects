import { NikeService } from "@project-management-system/shared-services";
import { Card, Table, message } from "antd";
import React from "react";
import { useEffect, useState } from "react";

export function OrderAcceptance() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [data , setData] = useState<any[]>([])
    const service = new NikeService();

     useEffect(()=>{
        getOrderAcceptanceData()
    },[])

    const getOrderAcceptanceData = () =>{
        service.getOrderAcceptanceData().then((res)=>{
            if(res.data){
                setData(res.data)
                message.success(res.internalMessage)
            }else(
                message.error(res.internalMessage)
            )
        })
    }

    console.log(data)

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Plant Name',
            dataIndex: 'plantName'
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber'
        },
        {
            title: 'Purchase Group Name',
            dataIndex: 'purchaseGroupName'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode'
        },
        {
            title: 'Category',
            dataIndex: 'categoryDesc'
        },
        {
            title: 'Shipping Type',
            dataIndex: 'shippingType'
        },
        {
            title: 'DPOM Line Item Status',
            dataIndex: 'DPOMLineItemStatus'
        },
    ]

    return (
        <>
            <Card title="Order Acceptance" headStyle={{ fontWeight: 'bold' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                >
                </Table>
            </Card>
        </>
    )
}
export default OrderAcceptance;