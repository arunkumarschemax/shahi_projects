

import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
// import { coLineRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Row, Select, Table } from "antd"
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { CentricService } from "@project-management-system/shared-services";
import { centricCoLineRequest } from "packages/libs/shared-models/src/common/centric/centric-coLine.req";
import moment from "moment";

const CentriColineView = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new CentricService()
    const [data, setData] = useState<any[]>([]);
    const [buyer, setBuyer] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [form] = Form.useForm();
    const { Option } = Select;


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

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
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
            title: 'Item No',
            dataIndex: 'item_no',
            render: (text, record) => {
                return (record.item_no ? (record.item_no) : '-')
            },
            sorter: (a, b) => a.item_no.localeCompare(b.item_no),
            sortDirections: ["ascend", "descend"],

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
            dataIndex: 'created_at',
            render: (text, record) => {
                return (record.created_at ? (moment(record.created_at).format('MM/DD/YYYY HH:mm')) : '-')
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
        }
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
export default CentriColineView

