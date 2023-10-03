

import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { coLineRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select, Table, Typography } from "antd"
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { receiveMessageOnPort } from "worker_threads";
const { Text } = Typography

const ColineView = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new NikeService()
    const [data, setData] = useState<any[]>([]);
    const [buyer, setBuyer] = useState<any>([]);
    const [orderNumber, setOrderNumber] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [form] = Form.useForm();
    const { Option } = Select;



    useEffect(() => {
        getData()
        BuyerPo()
        getItem()
        OrderNumber()
    }, [])



    const BuyerPo = () => {
        service.getBuyerPo().then(res => {
            if (res.status) {
                setBuyer(res.data)
            }
        })
    }
    const getItem = () => {
        service.getColineItem().then(res => {
            if (res.status) {
                setItem(res.data)
            }
        })
    }
    const OrderNumber = () => {
        service.getColineOrderNo().then(res => {
            if (res.status) {
                setOrderNumber(res.data)
            }
        })
    }
    const getData = () => {
        const req = new coLineRequest();

        if (form.getFieldValue('buyerPo') !== undefined) {
            req.buyerPo = form.getFieldValue('buyerPo');
        }
        if (form.getFieldValue('item') !== undefined) {
            req.itemNo = form.getFieldValue('item');
        }
        if (form.getFieldValue('orderNo') !== undefined) {
            req.orderNo = form.getFieldValue('orderNo');
        }
        service.getCoLine(req).then(res => {
            if (res.status) {
                setData(res.data)
            }
            else {
                setData([])
            }
        })
    }
    const resetHandler = () => {
        form.resetFields();
        getData();

    }

    const handleExport = (e: any) => {
        e.preventDefault();
    
    
        const currentDate = new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .join("/");
    
        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
          
            {
                title: 'Buyer Po',
                dataIndex: 'buyer_po',
                render: (text, record) => {
                    return (record.buyer_po ? (record.buyer_po ): '-')}
                
            },
    
            {
                title: 'Division',
                dataIndex: 'division',render: (text, record) => {
                    return (record.division ? (record.division ): '-')}
            },
            {
                title: 'PCH',
                dataIndex: 'PCH', render: (text, record) => {
                    return (record.PCH ? (record.PCH ): '-')}
            },
            {
                title: 'Facility',
                dataIndex: 'facility',
                render: (text, record) => {
                    return (record.facility ? (record.facility ): '-')}
            },
            {
                title: 'Order No',
                dataIndex: 'order_no',
                render: (text, record) => {
                    return (record.order_no ? (record.order_no ): '-')}
            },
            {
                title: 'Customer Code',
                dataIndex: 'customer_code',
                render: (text, record) => {
                    return (record.customer_code ? (record.customer_code ): '-')}
            },
            {
                title: 'Item No',
                dataIndex: 'item_no',
                render: (text, record) => {
                    return (record.item_no ? (record.item_no ): '-')}
            },
            {
                title: 'Item Desc',
                dataIndex: 'item_desc',
                render: (text, record) => {
                    return (record.item_desc ? (record.item_desc ): '-')}
            },
            {
                title: 'Order Qty',
                dataIndex: 'order_qty',
                render: (text, record) => {
                    return (record.order_qty ? (record.order_qty ): '-')},
                align:"right",
            },
            {
                title: 'UOM',
                dataIndex: 'UOM',
                render: (text, record) => {
                    return (record.UOM ? (record.UOM ): '-')}
            },
            {
                title: 'Size',
                dataIndex: 'size',
                render: (text, record) => {
                    return (record.size ? (record.size ): '-')}
            },
            {
                title: 'Price',
                dataIndex: 'price',
                align:"right",
                render: (text, record) => {
                    return (record.price ? (record.price ): '-')}
            },
            {
                title: 'Currency',
                dataIndex: 'currency',
                render: (text, record) => {
                    return (record.currency ? (record.currency ): '-')}
            },
            {
                title: 'Co-FinalAppDate',
                dataIndex: 'co_final_app_date',
                render: (text, record) => {
                    return (record.co_final_app_date ? (record.co_final_app_date ): '-')}
    
            },
            {
                title: 'PCD',
                dataIndex: 'PCD',
                render: (text, record) => {
                    return (record.PCD ? (record.PCD ): '-')}
    
            },
            {
                title: 'Commision',
                dataIndex: 'commision',
                render: (text, record) => {
                    return (record.commision ? (record.commision ): '-')}
    
            },
            {
                title: 'Plan No',
                dataIndex: 'plan_no',
                render: (text, record) => {
                    return (record.plan_no ? (record.plan_no ): '-')}
    
            },
            {
                title: 'Plan Unit',
                dataIndex: 'plan_unit',
                render: (text, record) => {
                    return (record.plan_unit ? (record.plan_unit ): '-')}
    
            },
            {
                title: 'PayTerms',
                dataIndex: 'pay_terms',
                render: (text, record) => {
                    return (record.pay_terms ? (record.pay_terms ): '-')}
    
            },
            {
                title: 'PayTermsDesc',
                dataIndex: 'pay_terms_desc',
                render: (text, record) => {
                    return (record.pay_terms_desc ? (record.pay_terms_desc ): '-')}
    
            },
    
    
        ]
    
    
    
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(data);
        excel.saveAs(`Co-Line-${currentDate}.xlsx`);
      }
    const columns: ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Buyer Po',
            dataIndex: 'buyer_po',
            render: (text, record) => {
                return (record.buyer_po ? (record.buyer_po ): '-')}
            
        },

        {
            title: 'Division',
            dataIndex: 'division',render: (text, record) => {
                return (record.division ? (record.division ): '-')}
        },
        {
            title: 'PCH',
            dataIndex: 'PCH', render: (text, record) => {
                return (record.PCH ? (record.PCH ): '-')}
        },
        {
            title: 'Facility',
            dataIndex: 'facility',
            render: (text, record) => {
                return (record.facility ? (record.facility ): '-')}
        },
        {
            title: 'Order No',
            dataIndex: 'order_no',
            render: (text, record) => {
                return (record.order_no ? (record.order_no ): '-')}
        },
        {
            title: 'Customer Code',
            dataIndex: 'customer_code',
            render: (text, record) => {
                return (record.customer_code ? (record.customer_code ): '-')}
        },
        {
            title: 'Item No',
            dataIndex: 'item_no',
            render: (text, record) => {
                return (record.item_no ? (record.item_no ): '-')}
        },
        {
            title: 'Item Desc',
            dataIndex: 'item_desc',
            render: (text, record) => {
                return (record.item_desc ? (record.item_desc ): '-')}
        },
        {
            title: 'Order Qty',
            dataIndex: 'order_qty',
            align:"right",
            render: (text, record) => {
                return (record.order_qty ? (record.order_qty ): '-')}
        },
        {
            title: 'UOM',
            dataIndex: 'UOM',
            render: (text, record) => {
                return (record.UOM ? (record.UOM ): '-')}
        },
        {
            title: 'Size',
            dataIndex: 'size',
            render: (text, record) => {
                return (record.size ? (record.size ): '-')}
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, record) => {
                return (record.price ? (record.price ): '-')}
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            render: (text, record) => {
                return (record.currency ? (record.currency ): '-')}
        },
        {
            title: 'Co-FinalAppDate',
            dataIndex: 'co_final_app_date',
            render: (text, record) => {
                return (record.co_final_app_date ? (record.co_final_app_date ): '-')}

        },
        {
            title: 'PCD',
            dataIndex: 'PCD',
            render: (text, record) => {
                return (record.PCD ? (record.PCD ): '-')}

        },
        {
            title: 'Commision',
            dataIndex: 'commision',
            render: (text, record) => {
                return (record.commision ? (record.commision ): '-')}

        },
        {
            title: 'Plan No',
            dataIndex: 'plan_no',
            render: (text, record) => {
                return (record.plan_no ? (record.plan_no ): '-')}

        },
        {
            title: 'Plan Unit',
            dataIndex: 'plan_unit',
            render: (text, record) => {
                return (record.plan_unit ? (record.plan_unit ): '-')}

        },
        {
            title: 'PayTerms',
            dataIndex: 'pay_terms',
            render: (text, record) => {
                return (record.pay_terms ? (record.pay_terms ): '-')}

        },
        {
            title: 'PayTermsDesc',
            dataIndex: 'pay_terms_desc',
            render: (text, record) => {
                return (record.pay_terms_desc ? (record.pay_terms_desc ): '-')}

        },


    ]

    return (
        <Card title="Co-Line" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={data.length > 0 ? <Button
          type="default"
          style={{ color: 'green' }}
          onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button> : null}>
            <Form onFinish={getData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='buyerPo' label='Buyer Po' >
                            <Select
                                showSearch
                                placeholder="Select Buyer Po"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    buyer.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.buyer_po}>{inc.buyer_po}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='item' label='Item' >
                            <Select
                                showSearch
                                placeholder="Select Item"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    item.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.item_no}>{inc.item_no}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='orderNo' label='Order Number' >
                            <Select
                                showSearch
                                placeholder="Select Order Number"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    orderNumber.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.order_no}>{inc.order_no}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">Get Report</Button>
                            <Button
                                htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                            >
                                RESET
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <>
                {data.length > 0 ? (
                    <Table columns={columns} dataSource={data}
                        className="custom-table-wrapper" 
                        scroll={{ x: 'max-content' }}
                        pagination={{
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize)
                            },   
                        }}
                        // summary={(pageData) => {
                        //     let totalDifference = 0;

                        //     pageData.forEach(({ difference }) => {
                        //         if (Number(difference)) {
                        //             totalDifference += Number(difference)
                        //         }
                        //     })

                        //     return (
                        //         <>
                        //             <Table.Summary.Row className="tableFooter">
                        //                 <Table.Summary.Cell index={14} colSpan={6}><Text>Total</Text></Table.Summary.Cell>
                        //                 <Table.Summary.Cell index={15} colSpan={1}></Table.Summary.Cell>
                        //                 <Table.Summary.Cell index={15} colSpan={1}>{totalDifference}</Table.Summary.Cell>
                        //             </Table.Summary.Row>
                        //         </>
                        //     )
                        // }}
                    />)
                    : (<Table size='large' />)}
            </>
        </Card>
    )
}
export default ColineView

