import React, { useEffect, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Card, Table } from 'antd';

const ItemChanges = () =>{
   
    const service = new OrdersService()
    const [itemData, setItemData] = useState([])
    const [columns, setColumns] = useState([]);
    //const [form] = Form.useForm();

    useEffect (()=>{
        getDocumentData();
    },[])

    const getDocumentData = () => {
        service.getDynamicData().then((res) => {
            setItemData(res.data);

            // Assuming res.data contains at least one item to infer column names
            const headerColumns = Object.keys(res.data[0]).map(header => ({
                title: header,
                dataIndex: header,
                key: header,
            }));
            setColumns([
                ...headerColumns
            ]);
        });
    }
    return(
        <Card title='Document Status'>
           {columns.length > 0 && itemData.length > 0 ? (
                <Table columns={columns} dataSource={itemData} pagination={false} />
            ) : (
                <p>No Data</p>
            )}
        </Card>
    )

}
export default ItemChanges;