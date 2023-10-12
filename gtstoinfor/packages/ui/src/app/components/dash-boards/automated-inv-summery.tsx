import { Card, Table } from 'antd';
import React, { useEffect, useState } from 'react'

export const AutomatedInvSummery = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const id = setInterval(() => {
   
        }, 25000);
        return () => {
            clearInterval(id);
        };
    }, []);

    const columns = [
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'no of invoices processed',
            dataIndex: 'noInvProcessed',
            key: 'noInvProcessed',
        }
    ];

    return (

        <Card title={`Automated Invoice summery`}>
            <Table columns={columns}
                rowKey={record => record.id}
                dataSource={dataSource}
                scroll={{ x: 500 }}
                size="large"
                bordered
                pagination={false} />
        </Card>
    );
};

export default AutomatedInvSummery;