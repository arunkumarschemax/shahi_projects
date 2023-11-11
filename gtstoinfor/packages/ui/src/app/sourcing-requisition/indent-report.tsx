import { IndentService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { DataSource } from 'typeorm';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

export const IndentReport = () => {
    const service = new IndentService();
    const [data, setData] = useState<any[]>([]);
    const [drop, dropDown] = useState<any[]>([]);
    const [table, setTable] = useState<any[]>([]);

    const [form] = Form.useForm();

    const page = 1;
    useEffect(() => {
        getIndentData();
        getAll();
    }, []);

    const getIndentData = () => {
        service.getIndentData().then((res) => {
            if (res.status) {
                setData(res.data);
            }
        });
    }
    const getAll = () => {
        service.getIndentDropDown().then(res => {
            if (res.status) {
                dropDown(res.data)
            }
        })
    }
    const onSearch = () => {
        let filterData = []
        if (form.getFieldValue('requestNo') !== undefined) {
            const requestNo = form.getFieldValue('requestNo')
            filterData = data.filter((e) => e.styleId === requestNo)
        } else if (form.getFieldValue('indentDate') !== undefined) {
            const indentDate = form.getFieldValue('indentDate')
            filterData = data.filter((e) => e.requestNo === indentDate)
        }
        dropDown(filterData)
    }

    const colWidth = {
        trimType: 120,
        trimCode: 100,
        quantity: 100,
        m3TrimCode: 100,
        color: 80,

    }

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
        },
        {
            title: "Indent Code",
            dataIndex: "requestNo",
            width: "110px",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
        },
        {
            title: "Style",
            dataIndex: "style",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
        },
        {
            title: "Indent Date",
            dataIndex: "indentDate",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            width: '150px',
            fixed: 'left',
            render: (text, record) => {
                return record.indentDate
                    ? moment(record.indentDate).format('YYYY-MM-DD')
                    : "";
            },
        },
        {
            title: "Expected Date",
            dataIndex: "expectedDate",
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
            render: (text, record) => {
                return record.expectedDate
                    ? moment(record.expectedDate).format('YYYY-MM-DD')
                    : "";
            },
        },
        {
            title: "Material Type",
            dataIndex: "trimType",
            width: colWidth.trimType,
            render: (text, record) => {
                return record.trimType ? record.trimType : '-'

            },
        },
        {
            title: "Material Code",
            dataIndex: "trimCode/m3FabricCode",
            width: colWidth.trimCode,
            render: (text, record) => {
                return record.trimCode ? record.trimCode : '-'

            },
        },
        {
            title: "Colour",
            dataIndex: "color",
            width: colWidth.color,
            render: (text, record) => {
                return record.color ? record.color : '-'

            },
        },
        {
            title: " Quantity",
            dataIndex: "quantity",
            width: colWidth.quantity,
            render: (text, record) => {
                return record.quantity ? record.quantity : '-'

            },
        },
        {
            title: "M3 Code",
            dataIndex: "m3TrimCode",
            width: colWidth.m3TrimCode,
            render: (text, record) => {
                return record.m3TrimCode ? record.m3TrimCode : '-'

            },
        },
        {
            title: "Status",
            dataIndex: "status",
            width: colWidth.m3TrimCode,
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            render: (text, record) => {
                return record.status ? record.status : '-'

            },
        },
    ]
    const allIndentData = (data: any) => {
        const totalData: any[] = [];
        data?.forEach((main: any, mainIndex: number) => {
            main.i_items.forEach((child: any, childIndex: number) => {
                let gridObj: any = {};
                gridObj.requestNo = main.requestNo;
                gridObj.style = main.style;
                gridObj.indentDate = main.indentDate;
                gridObj.expectedDate = main.expectedDate;
                gridObj.status = main.status;

                gridObj.rowSpan = 0;
                if (childIndex === 0) {
                    gridObj.rowSpan = main.i_items.length
                }
                gridObj.trimType = child.trimType
                gridObj.trimType = child.trimType
                gridObj.trimCode = child.trimCode
                gridObj.quantity = child.quantity
                gridObj.color = child.color
                gridObj.m3TrimCode = child.m3TrimCode
                gridObj.status = main.status
                gridObj.m3FabricCode = main.m3FabricCode
                totalData.push(gridObj)
            })
        });
        return totalData
    };


    return (
        <div>
            <Card title="Indent Report" className='card-header'>
                <Form form={form}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label='Indent Code' style={{ marginBottom: '10px' }} name={'requestNo'}>
                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Code' >

                                    {data.map(e => {
                                        return (
                                            <Option key={e.requestNo} value={e.requestNo} name={e.requestNo}> {e.requestNo}</Option>
                                        )
                                    })}   </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name={'indentDate'} label='Indent Date' style={{ marginBottom: '10px' }}>
                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Date' >

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{ marginBottom: '10px' }}>
                                <Button
                                    htmlType='submit'
                                    type="primary"
                                    style={{ width: '80px', marginRight: "10px" }}

                                    onClick={onSearch}
                                >Submit</Button>
                                <Button htmlType='reset' danger style={{ width: '80px' }}>Reset</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={allIndentData(data)} bordered />
            </Card>
        </div>

    )


}

export default IndentReport;