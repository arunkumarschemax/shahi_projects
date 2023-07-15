import React, { useEffect, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Card, Table } from 'antd';

const ItemChanges = () =>{

    const service = new OrdersService()
    const [itemData, setItemData] = useState([])
    // const [form] = Form.useForm();

    useEffect (()=>{
        getMaximumChangedOrders();
    },[])

    const getMaximumChangedOrders = () =>{
        service.getMaximumChangedOrders().then((res)=>{
            setItemData(res.data)
        })
    }

    const columns = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
       
        {
            title: 'No.of Change Count',
            dataIndex: 'count'
        },
        
    ];
    return(
        <Card title='Maximum Changed Items'>
            <Table columns={columns} dataSource={itemData} pagination={false}/>
        </Card>
    )

}
export default ItemChanges;