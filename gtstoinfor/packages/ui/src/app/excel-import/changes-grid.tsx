import React from 'react';
import { Card, Col, Form, Row, Table, Tabs, TabsProps, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

const ChangesGrid = () => {
    const dataSource = [
        {
            'S.No': '1',
            'productionPlanId': '123',
            'Column 1': '100',
            'Column 1 Changed': '150',
            'Column 2': 'Yes',
            'Column 2 Changed': 'No',
        },
        {
            'S.No': '2',
            'productionPlanId': '123',
            'Column 1': '150',
            'Column 1 Changed': '200',
            'Column 2': 'Done',
            'Column 2 Changed': 'Not',
        },
    ];

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'S.No',
            key: 'S.No',
        },
        {
            title: 'Production plan id',
            dataIndex: 'productionPlanId'
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode'
        },
        {
            title: 'Quantity',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'Column 1',
                    key: 'Column 1',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'Column 1 Changed',
                    key: 'Column 1 Changed',
                },
            ],
        },
        
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <Tag color='blue'>Column 1</Tag>,
            children: <Table dataSource={dataSource} columns={columns} />,
        },
        {
            key: '2',
            label: <Tag color='blue'>Column 1</Tag>,
            children: <Table dataSource={dataSource} columns={columns} />,
        },
        {
            key: '3',
            label: <Tag color='blue'>Column 1</Tag>,
            children: <Table dataSource={dataSource} columns={columns} />,
        },
    ];

    return (
        <Card title='Revised orders'>
            <Form layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name=""
                            label=""
                        >
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name=""
                            label=""
                        >
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name=""
                            label=""
                        >
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Tabs items={items} />
        </Card>
    );
};

export default ChangesGrid;