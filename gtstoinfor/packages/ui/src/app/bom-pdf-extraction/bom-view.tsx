import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { BomService, NikeService } from "@project-management-system/shared-services";
import React from "react";

import { useNavigate } from "react-router-dom";
import moment from "moment";


export function BomView() {
    const service = new BomService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [pdfData, setPdfData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [poNumber, setPoNumber] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    useEffect(() => {
        getPdfFileInfo()
    }, [])

    const getPdfFileInfo = () => {
        service.getAllStylesData().then(res => {
            setPdfData(res.data)
        })
    }

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            width: 50,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'Style ',
            dataIndex: 'style',
        },
        {
            title: 'Style Name',
            dataIndex: 'styleName',
            
        },
        {
            title: 'MSC',
            dataIndex: 'msc',
            
        },
        {
            title: 'Season',
            dataIndex: 'season',
            align: 'center',
            
        
        },
        {
            title: 'Factory LO',
            dataIndex: 'factoryLo',
            align: 'center',
            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            
        },
        {
            title: 'EXP',
            dataIndex: 'expNo',
            align: 'center',
            
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            
            render: (value, record) => (
                <>
                    <Button onClick={() => setMoreData(record)} type="primary">More Info</Button>
                </>
            ),
        }

    ]


const setMoreData = (record) => {
    navigate('/bom/bom-pdf-info-detail-view', {
     state: { data: record },
   });
 };
    return (
        <>
            <Card title="Style Info" headStyle={{ fontWeight: 'bold' }}>
                <Table
                    columns={columns}
                    dataSource={pdfData}
                    bordered
                    size="small"
                    className="custom-table-wrapper"
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                >
                </Table>

            </Card>
        </>
    )
}
export default BomView;