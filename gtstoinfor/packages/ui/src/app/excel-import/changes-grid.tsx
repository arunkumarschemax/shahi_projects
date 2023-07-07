import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Table, Tabs, TabsProps, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { OrdersService } from '@project-management-system/shared-services';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [contractDateData,setContractDateData] = useState([])
    const [qtyData,setQtyData] = useState([])
    const [warehouseDateData,setWarehouseDateDate] = useState()
    const [tableData,setTableData] = useState([])

    const getContractDateChangeData = () => {
        service.getContractDateChangeData().then((res) => {
            setContractDateData(res.data)
        })
    }

    const getQtyChangeData = () => {
            service.getQtyChangeData().then((res) => {
                setQtyData(res.data)
                
            })
    }

    const getData = () => {
        service.getWharehouseDateChangeData().then((res) => {
            setWarehouseDateDate(res.data)
        })
    }

    useEffect(() => {
        getContractDateChangeData()
    },[])

  

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
      
    ];

    const contractDateColumns= [
        {
            title:'Contract Date'
        },
        {
            title:'Revised Contract Date'
        }
    ]

    const wareHouseDateColumns= [
        {
            title:'Warehouse Date'
        },
        {
            title:'Revised Warehouse Date'
        }
    ]

    const FabricOrderDateColumns= [
        {
            title:'FabricOrder Date'
        },
        {
            title:'Revised FabricOrder Date'
        }
    ]

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Contract date : 5 </b>,
            children: <Table dataSource={contractDateData} columns={[...columns,...contractDateColumns]} />,
        },
        {
            key: '2',
            label: <b >Order Qty : 12</b>,
            children: <Table dataSource={qtyData} columns={[...columns,...wareHouseDateColumns]} />,
        },
        {
            key: '3',
            label: <b>Fabric Order Date : 15</b>,
            children: <Table dataSource={warehouseDateData} columns={[...columns,...FabricOrderDateColumns]} />,
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