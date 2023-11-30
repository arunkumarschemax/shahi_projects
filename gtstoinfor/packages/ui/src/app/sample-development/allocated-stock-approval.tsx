import React, { useEffect, useState } from 'react';
import { SampleDevelopmentService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Tabs } from 'antd';
import { RequestNoReq } from '@project-management-system/shared-models';

export const AllocatedStockApproval = () => {
    const Option = Select;
    const [form] = Form.useForm()
    const { TabPane } = Tabs;
    const [stockData, setStockData] = useState<any[]>([])
    const service = new SampleDevelopmentService();
    const [page, setPage] = React.useState(1);
    const [requestNo, setRequestNo] = useState<any>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => {
        getAllocatedBomData();
        getAllRequestNo();
    }, []);

    console.log(stockData)

    const getAllocatedBomData = () => {
        service.getAllocatedBomInfo().then((res) => {
            if (res.status) {
                setStockData(res.data)
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else {
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const getAllRequestNo = () => {
        service.getAllRequestNo().then((res) => {
            if (res.status) {
                setRequestNo(res.data);
            }
        });
    };

    function getFilterData(){
        const req = new RequestNoReq()
        req.requestNo = form.getFieldValue('requestNo')
    }

    function onReset() {
        form.resetFields()
    }

    const columns: ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
            title: 'Request No',
            dataIndex: 'requestNo'
        },
        {
            title: 'Rack Position Name',
            dataIndex: 'rackPositionName'
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <><Button>Approve</Button></>
                )
            }
        }
    ]

    const expandedRowRender = (record) => {
        const childColumns:ColumnProps<any>[] =[
            {
                title:'Location',
                dataIndex:'location'
            },
            {
                title:'Qty',
                dataIndex:'qty'
            }
        ];
        return (
            <Table
              columns={childColumns}
              dataSource={record.children}
              pagination={false}
            />
          );
    }

    const handleExpand = (key) => {
        const isExpanded = expandedRowKeys.includes(key);
        setExpandedRowKeys(isExpanded ? [] : [key]);
      };

    return (
        <>
            <Card>
                <Form form={form} layout='vertical'>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item name={'requestNo'} label='Request No'>
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="Select Request Number"
                                >
                                    {requestNo.map((e) => {
                                        return (
                                            <Option
                                                key={e.SampleRequestId}
                                                value={e.SampleRequestId}
                                            >
                                                {e.requestNo}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button style={{ marginTop: '23px' }} type='primary'>Get</Button>
                        </Col>
                        <Col span={2}>
                            <Button style={{ marginTop: '23px' }} onClick={onReset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <br></br>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Fabric Details" key="1">
                        <Table
                            columns={columns}
                            dataSource={stockData}
                            expandable={{
                                expandedRowRender,
                                onExpand: (_, record) => handleExpand(record.key),
                                rowExpandable: (record) => record.children && record.children.length > 0,
                              }}
                              expandedRowKeys={expandedRowKeys}
                        />
                    </TabPane>
                    <TabPane tab="Trim Details" key="2">
                        <Table
                            columns={columns}
                            dataSource={stockData}
                            expandable={{
                                expandedRowRender,
                                onExpand: (_, record) => handleExpand(record.key),
                                rowExpandable: (record) => record.children && record.children.length > 0,
                              }}
                              expandedRowKeys={expandedRowKeys}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}
export default AllocatedStockApproval