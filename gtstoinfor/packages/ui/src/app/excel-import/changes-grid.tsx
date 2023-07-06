import React from 'react';
import { Card, Col, Form, Row, Table } from 'antd';

const ChangesGrid = () => {
    const dataSource = [
        {
            'S.No': '1',
            'Column 1': '100',
            'Column 1 Changed': '150',
            'Column 2': 'Yes',
            'Column 2 Changed': 'No',
        },
        {
            'S.No': '2',
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
        {
            title: 'Contract Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'Column 2',
                    key: 'Column 2',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'Column 2 Changed',
                    key: 'Column 2 Changed',
                },
            ],
        },
        {
            title: 'Phase',
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
        {
            title: 'Warehouse Date',
            children: [
                {
                    title: 'Previous Value',
                    dataIndex: 'Column 2',
                    key: 'Column 2',
                },
                {
                    title: 'Revised Value',
                    dataIndex: 'Column 2 Changed',
                    key: 'Column 2 Changed',
                },
            ],
        },
    ];

    return (
        <Card>
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
            <Table dataSource={dataSource} columns={columns} bordered />
        </Card>
    );
};

export default ChangesGrid;