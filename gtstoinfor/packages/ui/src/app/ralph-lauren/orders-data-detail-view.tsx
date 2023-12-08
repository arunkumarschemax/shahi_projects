import { Button, Card, Descriptions, Table } from "antd"
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const RLOrdersDetailView = () => {
const [page, setPage] = React.useState(1);
const [pageSize, setPageSize] = useState(1);
const [data, setData] = useState<any[]>([]);
let location = useLocation();


 console.log(location.state.data,"yyyyyyyyyyyyy")

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            width: 50,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'Size',
            dataIndex: 'po_number',
            width: 90,
            sorter: (a, b) => a.po_number.localeCompare(b.po_number),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: 'UPC/EAN',
            dataIndex: 'pdf_file_name',
            width: 90,
            sorter: (a, b) => a.pdf_file_name.localeCompare(b.pdf_file_name),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'MSRP',
            dataIndex: 'file_type',
            width: 90,
            sorter: (a, b) => a.file_type.localeCompare(b.file_type),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Price',
            dataIndex: 'file_type',
            width: 90,
            sorter: (a, b) => a.file_type.localeCompare(b.file_type),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Quantity',
            dataIndex: 'file_type',
            width: 90,
            sorter: (a, b) => a.file_type.localeCompare(b.file_type),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Amount',
            dataIndex: 'file_type',
            width: 90,
            sorter: (a, b) => a.file_type.localeCompare(b.file_type),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        

    ]


    return (
        <Card title="Order Detail View"
        extra ={<Link to='/ralph-lauren/order-data-info-grid' ><Button className='panel_button' >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='Material Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.materialNo}</Descriptions.Item>
        <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poNumber}</Descriptions.Item>
        <Descriptions.Item label='PO Item' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poItem}</Descriptions.Item>
        <Descriptions.Item label='Purchase Group' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.purchaseGroup}</Descriptions.Item>
        <Descriptions.Item label='Supplier' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.supplier}</Descriptions.Item>
        <Descriptions.Item label='Revision Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.revisionNo}</Descriptions.Item>
        <Descriptions.Item label='Season Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.seasonCode}</Descriptions.Item>
        <Descriptions.Item label='Board Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.boardCode}</Descriptions.Item>
        <Descriptions.Item label='Color'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.color}</Descriptions.Item>
        <Descriptions.Item label='Division'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.division}</Descriptions.Item>
        <Descriptions.Item label='Ship Mode'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipMode}</Descriptions.Item>
        <Descriptions.Item label='Ship Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipDate}</Descriptions.Item>
        <Descriptions.Item label='Ship To Address'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAddress}</Descriptions.Item>
        <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.agent}</Descriptions.Item>








       

        </Descriptions>
        <br></br>
        <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    className="custom-table-wrapper"
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    scroll={{ x: 'max-content', y: 450 }}
                >
                </Table>
        
        </Card>
    )

}
export default RLOrdersDetailView;