import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
// import { coLineRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, message } from "antd"
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { CentricService, HbService, SanmarService } from "@project-management-system/shared-services";
import { centricCoLineRequest } from "packages/libs/shared-models/src/common/centric/centric-coLine.req";
import moment from "moment";
import { AlertMessages, HbPoOrderFilter, ItemNoDto, SanmarOrderFilter, hbCoLineRequest } from "@project-management-system/shared-models";

const EddieColineView = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new SanmarService()
    const [data, setData] = useState<any[]>([]);
    const [buyer, setBuyer] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const { RangePicker } = DatePicker;
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
        const req = new SanmarOrderFilter();

        if (form.getFieldValue('buyerPo') !== undefined) {
            req.buyerPo = form.getFieldValue('buyerPo');
        }
        if (form.getFieldValue('item') !== undefined) {
            req.itemNo = form.getFieldValue('item');
        }
        if (form.getFieldValue('deliveryDate') !== undefined) {
            req.deliveryDateStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('deliveryDate') !== undefined) {
            req.deliveryDateEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD');
        }

        if (form.getFieldValue("co_number") !== undefined) {
            req.coNumber = form.getFieldValue("co_number");
        }

        service.getSanmarCoLineData(req).then(res => {
            if (res.status) {
                setData(res.data)
            }
            else {
                setData([])
                AlertMessages.getErrorMessage(res.internalMessage);
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
                title: 'Style',
                dataIndex: 'style', render: (text, record) => {
                    return (record.style ? (record.style) : '-')
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
                title: 'Rised User',
                dataIndex: 'created_user',
                render: (text, record) => {
                    return (record.created_user ? (record.created_user) : '-')
                }
            },
            {
                title: 'Rised Date',
                dataIndex: 'raised_date',
                render: (text, record) => {
                    return (record.raised_date ? (moment(record.raised_date).format('MM/DD/YYYY HH:mm')) : '-')
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
            },
            sorter: (a, b) => a.buyerPo.localeCompare(b.buyerPo),
            sortDirections: ["ascend", "descend"],

        },
        {
            title: 'Style',
            dataIndex: 'style', render: (text, record) => {
                return (record.style ? (record.style) : '-')
            },
            sorter: (a, b) => a.style.localeCompare(b.style),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: 'Delivery Date',
            dataIndex: 'delivery_date',
            render: (text, record) => {
                return (record.delivery_date ? (record.delivery_date) : '-')
            }
        },

        // {
        //     title: 'Item No',
        //     dataIndex: 'item_no',
        //     render: (text, record) => {
        //         return (record.item_no ? (record.item_no) : '-')
        //     },
        //     sorter: (a, b) => a.item_no.localeCompare(b.item_no),
        //     sortDirections: ["ascend", "descend"],

        // },

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
                return (record.raised_date ? (moment(record.raised_date).format('MM/DD/YYYY HH:mm')) : '-')
            },

        },

        {
            title: 'CO Created Date',
            dataIndex: 'updated_at',
            render: (text, record) => {
                return (record.updated_at ? (moment(record.updated_at).format('MM/DD/YYYY')) : '-')
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
                if (record.status === 'Open'||record.status === 'Failed') {
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
                        <Form.Item name='buyerPo' label='Buyer PO' >
                            <Select
                                showSearch
                                placeholder="Select Buyer PO"
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
                    <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Delivery Date" name="deliveryDate"  >
                  <RangePicker style={{width:180}}   />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
                style={{marginLeft:30}}
              >
               <Form.Item label="Co number" name="co_number"  >
                  <Input placeholder="Enter Co number "  allowClear />
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
export default EddieColineView