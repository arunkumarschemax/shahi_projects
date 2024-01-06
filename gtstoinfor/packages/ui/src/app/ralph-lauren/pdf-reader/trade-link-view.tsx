import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table, message } from 'antd';
import { RLOrdersService } from '@project-management-system/shared-services';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';

const TradeLinkView: React.FC<any> = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [buyer, setBuyer] = useState<any>([]);
    const service = new RLOrdersService();

    useEffect(() => {
        // Initial loading or any other initialization logic
        // getTradeLinkPdf();
    }, []);

    const getTradeLinkPdf = () => {
        service.getTradeLinkPdf().then(res => {
            if (res.status) {
                setBuyer(res.data);
                message.success("Button CLicked")
                console.log("Trade button clicked");
            }
        });
    };

    const readPOPdfBot = () => {
        service.readPOPdfBot().then(res => {
            if (res.status) {
                setBuyer(res.data);
                message.success("Button CLicked")
                console.log("Trade button clicked");
            }
        });
    };

    const columns: any = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
    ];

    return (
        <Card>
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
              >
                    <Form.Item>
                        <Button type='primary' onClick={getTradeLinkPdf}>Trade Bot </Button> &nbsp; &nbsp;
                        <Button type='primary' onClick={readPOPdfBot}>Upload Bot</Button>
                    </Form.Item>
                </Col>
                </Row>
            <Table columns={columns} dataSource={buyer} />
        </Card>
    );
};

export default TradeLinkView;
