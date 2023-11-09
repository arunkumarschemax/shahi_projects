import { IndentService } from '@project-management-system/shared-services';
import { Card, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { DataSource } from 'typeorm';

export const IndentReport = () => {
    const service = new IndentService();
    const [data, setData] = useState<any[]>([]);
    const page = 1;
    useEffect(() => {
        getIndentData();
    }, []);

    const getIndentData = () => {
        service.getIndentData().then((res) => {
            if (res.status) {
                setData(res.data);
            }
        });
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
            dataIndex: "indentId",
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
            title: "Trim Type",
            dataIndex: "trimType",
            width: colWidth.trimType,
            render: (text, record) => {
                return record.trimType ? record.trimType : '-'

            },
        },
        {
            title: "Trim Code",
            dataIndex: "trimCode",
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
            title: "M3 Trim Code",
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
                gridObj.indentId = main.indentId;
                gridObj.style = main.style;
                gridObj.indentDate = main.indentDate;
                gridObj.expectedDate = main.expectedDate;
               
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
                totalData.push(gridObj)
            })
        });
        return totalData
    };

    
    return (
        <div>
            <Card>

                <Table columns={columns} dataSource={allIndentData(data)} bordered />
            </Card>
        </div>

    )


}

export default IndentReport;