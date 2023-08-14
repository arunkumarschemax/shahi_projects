import React, { useEffect, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Card, Table } from 'antd';

const ItemChanges = () => {

    const service = new OrdersService()
    const [itemData, setItemData] = useState([])
    const [columns, setColumns] = useState([]);
    const [searchText, setSearchText] = useState('');
    //const [form] = Form.useForm();

    useEffect(() => {
        getDocumentData();
    }, [])

    const getDocumentData = () => {
        service.getDynamicData().then((res) => {
            setItemData(res.data);

            // Assuming res.data contains at least one item to infer column names
            const headerColumns = Object.keys(res.data[0]).map(header => ({
                title: header.toUpperCase(),
                dataIndex: header,
                key: header,
            }));
            setColumns([
                ...headerColumns
            ]);
        });
    }
    return (
        <Card title="Document Status">
            <div style={{ marginBottom: 16 }}>
                <input
                    placeholder="Search by column value"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            {columns.length > 0 && itemData.length > 0 ? (
                <Table
                    columns={columns.map((column) => ({
                        ...column,
                        title: (
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#3582c4', // Highlight color
                                    padding: '8px',
                                    textAlign:'center'
                                }}
                            >
                                {column.title}
                            </div>
                        ),
                    }))}
                    dataSource={itemData.filter((item) =>
                        // Filter data based on search text
                        Object.values(item).some((value) =>
                            value.toString().toLowerCase().includes(searchText.toLowerCase())
                        )
                    )}
                    pagination={false}
                />
            ) : (
                <p>No Data</p>
            )}
        </Card>
    )

}
export default ItemChanges;