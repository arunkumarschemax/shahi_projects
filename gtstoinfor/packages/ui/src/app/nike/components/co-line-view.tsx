

import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { ItemNoDto, coLineRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Table, message } from "antd"
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import AlertMessages from "../../common/common-functions/alert-messages";

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
    const [editedValue, setEditedValue] = useState('');
    const [editedId, setEditedId] = useState('');
    const [editingRow, setEditingRow] = useState(null);


    useEffect(() => {
        getData()
        BuyerPo()
        getItem()
        OrderNumber()
    }, [])



    const BuyerPo = () => {
        service.getBuyerPo().then(res => {
            if (res.status) {
                const data = res.data.filter(item => item.buyer == 'Nike-U12');
                setBuyer(data)
            }
        })
    }
    const getItem = () => {
        service.getColineItem().then(res => {
            if (res.status) {
                const data = res.data.filter(item => item.buyer == 'Nike-U12');
                setItem(data)
            }
        })
    }
    const OrderNumber = () => {
        service.getColineOrderNo().then(res => {
            if (res.status) {
                const data = res.data.filter(item => item.buyer == 'Nike-U12');
                setOrderNumber(data)
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
                const data = res.data.filter(item => item.buyer == 'Nike-U12');
                setData(data)
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
                    return (record.buyer_po ? (record.buyer_po) : '-')
                }
            },
            {
                title: 'Line Item',
                dataIndex: 'line_item_no', render: (text, record) => {
                    return (record.line_item_no ? (record.line_item_no) : '-')
                }
            },
            {
                title: 'Item No',
                dataIndex: 'item_no',
                render: (text, record) => {
                    return (record.item_no ? (record.item_no) : '-')
                }
            },
            {
                title: 'CO Date',
                dataIndex: 'co_date',
                render: (text, record) => {
                    return (record.co_date ? (record.co_date) : '-')
                }
            },
            {
                title: 'CO Number',
                dataIndex: 'co_number',
                render: (text, record) => {
                    return (record.co_number ? (record.co_number) : '-')
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (text, record) => {
                    return (record.status ? (record.status) : '-')
                }
            },
            {
                title: 'Message',
                dataIndex: 'error_msg',
                render: (text, record) => {
                    return (record.error_msg ? (record.error_msg) : '-')
                }
            }
        ]

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(data);
        excel.saveAs(`Co-Line-${currentDate}.xlsx`);
    }

    const onFinishEdit = (record: any) => {
        const req = new ItemNoDto(editedId,editedValue)
        service.updateItemNo(req).then(res => {
            if (res.status) {
                getData();
                setEditingRow(null);
                setEditedValue(null);
                message.success("Updated SuccessFully");
            } else {
                message.error("Not Updated")
            }
        })
    };

    const onEditClick = (record) => {
        setEditingRow(record);
        setEditedValue(record.itemNo);
        setEditedId(record.id);
        console.log(record,"recccc")
    };

    const handleConfirmDelete = (record) => {
        const req = new ItemNoDto(record.id)
        service.deleteCoLine(req).then(res => {
            if (res.status) {
                getData();
                AlertMessages.getSuccessMessage(res.internalMessage)

            } else {
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
        // const deleteUpdatedData = data.filter(item => item !== record);
        // message.success("Deleted Successfully");
        // setData(deleteUpdatedData);
    };

    const columns: ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Buyer PO',
            dataIndex: 'buyer_po',
            render: (text, record) => {
                return (record.buyer_po ? (record.buyer_po) : '-')
            }

        },
        {
            title: 'Line Item',
            dataIndex: 'line_item_no', render: (text, record) => {
                return (record.line_item_no ? (record.line_item_no) : '-')
            }
        },
        {
            title: 'Item No',
            dataIndex: 'item_no',
            render: (text, record, index) => {
                return (
                    <div>
                        {editingRow === record ? (
                            <Input
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                style={{ width: '60px', border: '1px solid rgb(217, 217, 217)', borderRadius: '5px', textAlign: "center" }}
                            />
                        ) : (
                            <Input
                                value={text}
                                readOnly
                                style={{ width: '60px', border: '1px solid rgb(217, 217, 217)', borderRadius: '5px', textAlign: "center" }}
                            />
                        )}
                    </div>
                );
            }
        },
        {
            title: 'CO Date',
            dataIndex: 'co_date',
            render: (text, record) => {
                return (record.co_date ? (record.co_date) : '-')
            }
        },
        {
            title: 'CO Number',
            dataIndex: 'co_number',
            render: (text, record) => {
                return (record.co_number ? (record.co_number) : '-')
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                return (record.status ? (record.status) : '-')
            }
        },
        {
            title: 'Message',
            dataIndex: 'error_msg',
            render: (text, record) => {
                return (record.error_msg ? (record.error_msg) : '-')
            }
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                if (record.status && record.status.toLowerCase() === 'failed') {
                    return (
                        <div>
                            {editingRow === record ? (
                                <div>
                                    <Button type="primary" onClick={() => onFinishEdit(record)}>Update</Button>
                                    &nbsp; &nbsp;
                                    <Button type="primary" danger onClick={() => setEditingRow(null)}>Cancel</Button>
                                </div>
                            ) : (
                                <div>
                                    <Button type="primary" onClick={() => onEditClick(record)}>Edit</Button>
                                    &nbsp; &nbsp;
                                    <Popconfirm
                                        title="Are you sure to Delete?"
                                        onConfirm={() => handleConfirmDelete(record)}
                                        // onCancel={() => message.info('Delete canceled')}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>
                                </div>
                            )}
                        </div>
                    );
                } else {
                    return <span>-</span>;
                }
            },
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
                        <Form.Item name='orderNo' label='CO Number' >
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
                            <Button htmlType="submit" icon={<SearchOutlined />} type="primary">SEARCH</Button>
                            <Button htmlType='button' icon={<UndoOutlined />} type="primary" style={{ marginLeft: 10, marginTop: 8, position: "relative" }} onClick={resetHandler}
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

