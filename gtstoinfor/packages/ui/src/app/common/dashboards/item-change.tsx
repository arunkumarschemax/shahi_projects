import React, { useEffect, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Card, Table } from 'antd';

const ItemChanges = () =>{

    const service = new OrdersService()
    const [itemData, setItemData] = useState([])
    // const [form] = Form.useForm();

    // useEffect (()=>{
    //     getMaximumChangedOrders();
    // },[])

    // const getMaximumChangedOrders = () =>{
    //     service.getMaximumChangedOrders().then((res)=>{
    //         setItemData(res.data)
    //     })
    // }

    const columns = [
        {
            title: 'PO Number',
            dataIndex: 'po_no',
        },
        {
            title: 'Document-1',
            dataIndex: 'document_1'
        },
        {
            title: 'Document-2',
            dataIndex: 'document_2'
        },
        {
            title: 'Document-3',
            dataIndex: 'document_3'
        },
       
        {
            title: 'Document-4',
            dataIndex: 'document_4'
        },
        {
            title: 'Document-5',
            dataIndex: 'document_5'
        },
        {
            title: 'Document-6',
            dataIndex: 'document_6'
        },
        
    ];

    const dataSource = [
        {
            po_no : '468219-5672',
            document_1 : 'No',
            document_2 : 'No',
            document_3 : 'No',
            document_4 : 'No',
            document_5 : 'No',
            document_6 : 'No',

        },
        {
            po_no : '388157-6565',
            document_1 : 'No',
            document_2 : 'Yes',
            document_3 : 'Yes',
            document_4 : 'No',
            document_5 : 'Yes',
            document_6 : 'No',

        },
        {
            po_no : '428279-6555',
            document_1 : 'No',
            document_2 : 'Yes',
            document_3 : 'Yes',
            document_4 : 'No',
            document_5 : 'Yes',
            document_6 : 'No',

        }
    ]
    return(
        <Card title='Document Status'>
            <Table columns={columns} dataSource={dataSource} pagination={false}/>
        </Card>
    )

}
export default ItemChanges;