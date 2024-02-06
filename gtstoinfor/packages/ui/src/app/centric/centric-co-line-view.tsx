

import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
// import { coLineRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Table, Tooltip, message } from "antd"
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { CentricService } from "@project-management-system/shared-services";
import { centricCoLineRequest } from "packages/libs/shared-models/src/common/centric/centric-coLine.req";
import moment from "moment";
import AlertMessages from "../common/common-functions/alert-messages";
import { ItemNoDto } from "@project-management-system/shared-models";

const CentriColineView = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new CentricService()
    const [data, setData] = useState<any[]>([]);
    const [buyer, setBuyer] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [editedValue, setEditedValue] = useState('');
    const [editingRow, setEditingRow] = useState(null);
    const [editedId, setEditedId] = useState('');


    useEffect(() => {
        getData()
        BuyerPo()
        getItem()
    }, [])

    const BuyerPo = () => {
        service.getCoPoNumber().then(res => {
            if (res.status) {
                setBuyer(res.data)
            }
        })
    }

    const getItem = () => {
        service.getItem().then(res => {
            if (res.status) {
                setItem(res.data)
            }
        })
    }

    const getData = () => {
        const req = new centricCoLineRequest();

        if (form.getFieldValue('buyerPo') !== undefined) {
            req.poNumber = form.getFieldValue('buyerPo');
        }
        if (form.getFieldValue('item') !== undefined) {
            req.itemNo = form.getFieldValue('item');
        }

        service.getCentricCoLine(req).then(res => {
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

        let rowIndex = 1;
        let exportingColumns: any[] = []
        exportingColumns.push(
            {
                title: "#",
                // dataIndex: "sno", 
                width: 50,
                render: (text, object, index) => {
                    if (index == data.length) {
                        return null;
                    } else {
                        return rowIndex++;
                    }
                }
            },
            {
                title: 'Buyer Po',
                dataIndex: 'po_number',
                render: (text, record) => {
                    return (record.po_number ? (record.po_number) : '-')
                }
            },
            {
                title: 'Line Item',
                dataIndex: 'po_line', render: (text, record) => {
                    return (record.po_line ? (record.po_line) : '-')
                }
            },
            {
                title: 'Delivery Date',
                dataIndex: 'delivery_date',
                render: (text, record) => {
                    return (record.delivery_date ? (record.delivery_date) : '-')
                }
            },
            {
                title: 'Style No',
                dataIndex: 'style_no',
                render: (text, record) => {
                    return (record.style_no ? (record.style_no) : '-')
                }
            },
            {
                title: 'Full Material',
                dataIndex: 'full_material',
                render: (text, record) => {
                    return (record.full_material ? (record.full_material) : '-')
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
                title: 'Raised User',
                dataIndex: 'created_user',
                render: (text, record) => {
                    return (record.created_user ? (record.created_user) : '-')
                }
            },

            {
                title: 'Raised Date',
                dataIndex: 'raised_date',
                render: (text, record) => {
                    return (record.raised_date ? (record.raised_date) : '-')
                }
            },
            {
                title: 'CO Created Date',
                dataIndex: 'updated_at',
                render: (text, record) => {
                    return (record.updated_at ? (moment(record.updated_at).format('DD-MM-YYYY')) : '-')

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
        )

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(data);
        excel.saveAs(`Co-Line-${currentDate}.xlsx`);
    }

    const onFinishEdit = (record: any) => {
        const req = new ItemNoDto(editedId, editedValue)
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
        console.log(record, "recccc")
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
            dataIndex: 'po_number',
            render: (text, record) => {
                return (record.po_number ? (record.po_number) : '-')
            },
            sorter: (a, b) => a.po_number.localeCompare(b.po_number),
            sortDirections: ["ascend", "descend"],

        },
        {
            title: 'Line Item',
            dataIndex: 'po_line', render: (text, record) => {
                return (record.po_line ? (record.po_line) : '-')
            },
            sorter: (a, b) => a.po_line.localeCompare(b.po_line),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: 'Delivery Date',
            dataIndex: 'delivery_date',
            render: (text, record) => {
                return (record.delivery_date ? (record.delivery_date) : '-')
            }
        },
        {
            title: 'Style No',
            dataIndex: 'style_no',
            render: (text, record) => {
                return (record.style_no ? (record.style_no) : '-')
            }
        },

        {
            title: 'Full Material',
            dataIndex: 'full_material',
            render: (text, record) => {
                const truncatedText = text ? `${text.substring(0, 20)}...` : "-";
                return (
                    <Tooltip title={text || "-"}>
                        {truncatedText}
                    </Tooltip>
                );
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
            title: 'Raised User',
            dataIndex: 'created_user',
            render: (text, record) => {
                return (record.created_user ? (record.created_user) : '-')
            },


        },
        {
            title: 'Raised Date',
            dataIndex: 'raised_date',
            render: (text, record) => {
                return (record.raised_date ? (moment(record.raised_date).format('DD-MM-YYYY HH:mm')) : '-')
            },

        },

        {
            title: 'CO Created Date',
            dataIndex: 'updated_at',
            render: (text, record) => {
                return (record.updated_at ? (moment(record.updated_at).format('DD-MM-YYYY')) : '-')
            },


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
                if (record.status  === 'Open'||record.status  === 'Failed') {
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
            <Form
                onFinish={getData}
                form={form} layout='vertical'>
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
                                        return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
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

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit" icon={<SearchOutlined />} type="primary">Search</Button>
                            <Button htmlType='button' icon={<UndoOutlined />} type="primary" style={{ marginLeft: 10, marginTop: 8, position: "relative" }} onClick={resetHandler}
                            >
                                Reset
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
                            pageSize: 50,
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize);
                            },
                        }}
                    />)
                    : (<Table size='large' />)}
            </>
        </Card>
    )
}
export default CentriColineView

