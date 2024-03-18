import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { BomItemReq, ItemInfoFilterReq, PpmDateFilterRequest, UpdateBomITemNoFilters } from "@project-management-system/shared-models";
import { BomService, NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Table, message } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useRef, useState } from "react"
import Highlighter from 'react-highlight-words';
const { RangePicker } = DatePicker

const BomOrderAcceptance = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<any[]>([])
    const [form] = Form.useForm();
    const nikeService = new NikeService();
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [planSesCode, setPlanSesCode] = useState<any>([]);
    const [planSesYear, setPlanSesYear] = useState<any>([]);
    const [itemNoValues, setItemNoValues] = useState({});
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);
    const [searchedColumn, setSearchedColumn] = useState('');
    const [pageSize, setPageSize] = useState(1);
    const { Option } = Select;
    const [showModal, setShowModal] = useState<boolean>(false)
    const createdAtValues = form.getFieldValue('createdAt');
    const bomService = new BomService()

    useEffect(() => {

       // getOrderAcceptanceData()
       // getStyleNumber();
        // getSesonCode();
        // getSesonYear();
    }, [])


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };



    const onReset = () => {
        form.resetFields()
        // getOrderAcceptanceData()
        setData([])
        setSelectedRowKeys([])
    }

    const getSesonYear = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getSeasonYearDropdownByCreatedAt(req).then(res => {
                setPlanSesYear(res.data)
            }).catch(error => {
                console.error("Error fetching season year dropdown:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }
    
    const getSesonCode = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getSeasonCodeDropdownByCreatedAt(req).then(res => {
                setPlanSesCode(res.data)
            }).catch(error => {
                console.error("Error fetching season code dropdown:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }
    

    const getStyleNumber = () => {
        const createdAtValues = form.getFieldValue('createdAt');
        if (createdAtValues && createdAtValues.length >= 2) {
            const req = new ItemInfoFilterReq()
            req.fromDate = dayjs(createdAtValues[0]).format('YYYY-MM-DD')
            req.toDate = dayjs(createdAtValues[1]).format('YYYY-MM-DD')
            bomService.getPpmStyleNumberByCreatedAt(req).then(res => {
                setStyleNumber(res.data)
            }).catch(error => {
                console.error("Error fetching style numbers:", error);
            });
        } else {
            console.error("Invalid createdAtValues:", createdAtValues);
        }
    }
    
    const getOrderAcceptanceData = () => {
        const req = new UpdateBomITemNoFilters();

        if (form.getFieldValue('styleNumber') !== undefined) {
            req.styleNo = form.getFieldValue('styleNumber');
        }
        if (form.getFieldValue('planningSeasonCode') !== undefined) {
            req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
        }
        if (form.getFieldValue('planningSeasonYear') !== undefined) {
            req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
        }
        if (form.getFieldValue('itemStatus') !== undefined) {
            req.itemStatus = form.getFieldValue('itemStatus');
        }
req.fromDate = dayjs(form.getFieldValue('createdAt')[0]).format('YYYY-MM-DD')
req.toDate = dayjs(form.getFieldValue('createdAt')[1]).format('YYYY-MM-DD')

        nikeService.getdpomDataForBom(req).then((res) => {
            if (res.data) {
                setData(res.data)
                message.success(res.internalMessage)
            } else (
                setData([]),
                message.error(res.internalMessage)
            )
        })
    }
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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const createdDateHandler = (val) => {


    }

    const isActionButtonEnabled = (record) => {
        return itemNoValues[record.key] && itemNoValues[record.key].trim() !== "";
    };

    const columns: any = [
        {
            title: "S.No",
            key: "sno", width: 50,
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'PO + Line',
            dataIndex: 'po_and_line',
            key: 'po_and_line',
            fixed: 'left',
            width: 80,
            ...getColumnSearchProps('po_and_line')
        },
        {
            title: 'Style Number',
            dataIndex: 'style_number', width: 80,
        },
        {
            title: 'Bom Item',
            dataIndex: 'bom_item', width: 80,
        },
        // {
        //     title: 'PO Line Item No',
        //     dataIndex: 'po_line_item_number', width: 80,
        //     fixed: 'left', align: 'center'
        // },
        {
            title: 'Document Date',
            dataIndex: 'documentDate', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 80,
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc', width: 80,
        },
        {
            title: 'Country Code',
            dataIndex: 'destination_country_code', width: 75,
        },
        {
            title: 'Country',
            dataIndex: 'destination_country', width: 75,
        },
        // {
        //     title: 'MRGAC', dataIndex: 'MRGAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        // {
        //     title: 'OGAC', dataIndex: 'OGAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        // {
        //     title: 'GAC', dataIndex: 'GAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        {
            title: 'Season Code',
            dataIndex: 'planning_season_code',
            align: 'center', width: 70,
        },
        {
            title: 'Year',
            dataIndex: 'planning_season_year', width: 70,
            align: 'center',
        },
        {
            title: 'Category',
            dataIndex: 'category_desc',
            width: 80,
        },
        {
            title: 'Total Item Qty',
            dataIndex: 'total_item_qty', width: 70,
            align: 'right',
            render: (text) => <strong>{text}</strong>
        },
        // {
        //     title: "Item No",
        //     dataIndex: "itemNo", width: 100,
        //     render: (text, record) => {
        //         return (
        //             <Form>
        //                 <Form.Item>
        //                     <Input
        //                         placeholder="Enter Item No"
        //                         onChange={(e) => handleItemNoChange(e.target.value, record)}
        //                     />
        //                 </Form.Item>
        //             </Form>
        //         );
        //     },
        // },

    ];
    const handleItemNoChange = (value, record) => {
        setItemNoValues((prevValues) => ({
            ...prevValues,
            [record.key]: value,
        }));
    };

    const openModeal = () => {
        setShowModal(true)
    }


    const handleBatchUpdate = () => {
        const selectedRecords = data.filter(record => selectedRowKeys.includes(record));

        const idsToUpdate = selectedRecords.map(record => record.po_and_line);
        const itemNoValue = form.getFieldValue('itemNo');

        const payload: BomItemReq = {
            poAndLine: idsToUpdate,
            itemNo: itemNoValue,
        };

        nikeService.updateBomItems(payload).then((res) => {
            if (res.status) {
                form.resetFields()
                setData([])
                message.success(res.internalMessage);
                setShowModal(false);
            } else {
                message.error(res.internalMessage);
            }
        });
     getOrderAcceptanceData()

    };

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
                title: 'PO + Line',
                dataIndex: 'po_and_line',
                width: 80,
                ...getColumnSearchProps('po_and_line')
            },
            {
                title: 'Style Number',
                dataIndex: 'style_number', width: 80,
            },
            {
                title: 'Bom Item',
                dataIndex: 'bom_item', width: 80,
            },
         
            {
                title: 'Document Date',
                dataIndex: 'documentDate', width: 80,
                render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            {
                title: 'Product Code',
                dataIndex: 'product_code', width: 80,
            },
            {
                title: 'Color Description',
                dataIndex: 'color_desc', width: 80,
            },
            {
                title: 'Destination Country Code',
                dataIndex: 'destination_country_code', width: 75,
            },
            {
                title: 'Country',
                dataIndex: 'destination_country', width: 75,
            },
         
            {
                title: 'Season Code',
                dataIndex: 'planning_season_code',
                align: 'center', width: 70,
            },
            {
                title: 'Season Year',
                dataIndex: 'planning_season_year', width: 70,
                align: 'center',
            },
            {
                title: 'Category',
                dataIndex: 'category_desc',
                width: 80,
            },
            {
                title: 'Total Item Qty',
                dataIndex: 'total_item_qty', width: 70,
                align: 'right',
                render: (text) => <strong>{text}</strong>
            },
            
    
        ]
    
    
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(data);
        excel.saveAs(`Order-acceptance-${currentDate}.xlsx`);
      }

    return (
        <Card title="Bom Item Register - Item missing Orders" headStyle={{ fontWeight: 'bold' }} extra={data.length > 0 ? <Button
            type="default"
            style={{ color: 'green' }}
            onClick={handleExport}
            icon={<FileExcelFilled />}>Download Excel</Button> : null}>
            <Form
                onFinish={getOrderAcceptanceData}
                form={form}
                layout='vertical'>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 5 }}  >
                        <Form.Item name='createdAt' label='Document Date' rules={[{ required: true, message: 'Created Date is required' }]}>
                            <RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} onChange={createdDateHandler} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='styleNumber' label='Style Number' >
                            <Select
                                mode="multiple"
                                onFocus={getStyleNumber}
                                showSearch
                                placeholder="Select Style Number"
                                optionFilterProp="children"
                                allowClear
                            >
                                {styleNumber && styleNumber?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='planningSeasonCode' label='Code' >
                            <Select
                                showSearch
                                onFocus={getSesonCode}
                                placeholder="Select Season Code"
                                optionFilterProp="children"
                                allowClear
                            >
                                {planSesCode?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.planning_season_code}>{inc.planning_season_code}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='planningSeasonYear' label='Season Year' >
                            <Select
                                showSearch
                                onFocus={ getSesonYear}
                                placeholder="Select Season Year"
                                optionFilterProp="children"
                                allowClear
                            >
                                {planSesYear?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.planning_season_year}>{inc.planning_season_year}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='itemStatus' label='Item Status' >
                            <Select
                                showSearch
                                placeholder="Select Item Status"
                                optionFilterProp="children"
                                allowClear
                            >
                                <Option key="all" value="All">All</Option>
                                <Option key="Updated" value="Updated">Updated</Option>
                                <Option key="null" value="null">Null</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType="submit"
                            icon={<SearchOutlined />}
                            type="primary">Submit</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType='button' icon={<UndoOutlined />} onClick={() => onReset()}>
                            RESET
                        </Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 2 }}  style={{ paddingTop: '23px' }}>
                        <Button onClick={openModeal} style={{
                            backgroundColor: selectedRowKeys.length > 0 ? "aqua" : "white",
                            color: selectedRowKeys.length > 0 ? "black" : "black",
                        }}
                            disabled={selectedRowKeys.length === 0}>Update Bom Items</Button>
                    </Col>

                </Row>
            </Form>

            {data?.length > 0 ? (
                <Table
                    columns={columns}
                    rowKey={record => record}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    className="custom-table-wrapper"
                    scroll={{ x: 'max-content', y: 450 }}
                    bordered
                />
            ) : (
                <Table size='large' />
            )}

            <Modal open={showModal} closable footer={false} onCancel={() => setShowModal(false)} >
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 12 }} style={{ alignContent: 'center' }} >
                    <Form onFinish={handleBatchUpdate}
                        form={form}
                        layout='vertical'>
                        <Form.Item name='itemNo' label='Item No'>
                            <Input
                                placeholder="Enter Item No"
                            // onChange={(e) => handleItemNoChange(e.target.value, record)}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }}
                    xl={{ span: 4 }} style={{ marginTop: 20 }} >
                    <Button onClick={handleBatchUpdate} style={{
                        backgroundColor: "aqua"
                    }}
                        disabled={selectedRowKeys.length === 0}>Update</Button>
                </Col>
            </Modal>
        </Card>

    )
}
export default BomOrderAcceptance