import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { NikeService, RLOrdersService } from "@project-management-system/shared-services";
import React from "react";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import moment from "moment";


export function PdFInfoGrid() {
    const service = new RLOrdersService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [pdfData, setPdfData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [poNumber, setPoNumber] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);


    useEffect(() => {
        getPdfFileInfo()
    }, [])

    const getPdfFileInfo = () => {
        service.getPdfFileInfo().then(res => {
            setPdfData(res.data)
        })
    }
    const onReset = () => {
        form.resetFields()
        getPdfFileInfo()
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const showModal1 = (record) => {
        setPoNumber(record)
        setIsModalOpen1(true);
    };


    const cancelHandle = () => {
        setIsModalOpen1(false);

    };
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button size="small" style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters)
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) { setTimeout(() => searchInput.current.select()); }
        },
        render: text =>
            text ? (
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : text
            )
                : null
    })


    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            width: 50,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'PO Number',
            dataIndex: 'poNumber',
            width: 90,
            sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'File Name',
            dataIndex: 'pdfFileName',
            width: 90,
            sorter: (a, b) => a.pdfFileName.localeCompare(b.pdfFileName),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'File Type',
            dataIndex: 'fileType',
            width: 90,
            sorter: (a, b) => a.fileType.localeCompare(b.fileType),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'createdAt',
            align: 'center',
            width: 90,
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                return record.createdAt ? moment(record.createdAt).format('MM/DD/YYYY') : '-'
            }
            
            
        },


    ]

    return (
        <>
            <Card title="PDF Info" headStyle={{ fontWeight: 'bold' }}>
                {/* <Form
            // onFinish={getOrderAcceptanceData}
            form={form}
            layout='vertical'>
            <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
                    <Form.Item name='poandLine' label='PO Number' >
                        <Select
                            showSearch
                            placeholder="Select Po+Line"
                            optionFilterProp="children"
                            allowClear
                        >
                            {poLine.map((inc: any) => {
                                return <Option key={inc.id} value={inc.po_and_line}>{inc.po_and_line}</Option>
                            })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 40, }} >
                    <Form.Item>
                        <Button htmlType="submit"
                            icon={<SearchOutlined />}
                            type="primary">SEARCH</Button>
                        <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>Reset</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form> */}
                <Table
                    columns={columns}
                    dataSource={pdfData}
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
        </>
    )
}
export default PdFInfoGrid;