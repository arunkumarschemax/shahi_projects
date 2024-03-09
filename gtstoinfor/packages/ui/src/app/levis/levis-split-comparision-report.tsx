import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Table, Tabs, Tooltip, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { CentricService, EddieService, LevisService, OrdersService, RLOrdersService } from "@project-management-system/shared-services"
import React, { useEffect, useRef, useState } from "react"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import AlertMessages from "../common/common-functions/alert-messages"
import moment from "moment"
import { Excel } from "antd-table-saveas-excel"
import { LevisOrderFilter, PoOrderFilter } from "@project-management-system/shared-models"
import Highlighter from "react-highlight-words"



export const LevisSplitComparisionReport = () => {
    const [form] = Form.useForm();
    const [page, setPage] = useState<number>(1);
    const service = new LevisService();
    const { Text } = Typography;
    const [pageSize, setPageSize] = useState(10);
    const [filterData, setFilterData] = useState([]);
    const [orderData, setOrderData] = useState<any>([]);
    const [poNumberData, setPoNumberData] = useState<any>([]);
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    const { Option } = Select;

    useEffect(() => {
        getSplitOrderComparisionData();
        getPoNumber();
    }, []);

    const getSplitOrderComparisionData = () => {
        const req = new LevisOrderFilter();

        if (form.getFieldValue("poNumber") !== undefined) {
            req.poNumber = form.getFieldValue("poNumber");
        }


        service.getSplitOrderComparisionData(req).then((res) => {
            console.log(req, "req")
            if (res.status) {
                setOrderData(res.data);
                setFilterData(res.data);
            } else {
                setOrderData([]);
                setFilterData([]);
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => {
            setOrderData([]);
            setFilterData([]);
            AlertMessages.getErrorMessage(err.message);
        })
    };

    const getPoNumber = () => {

        service.getPoNumber().then((res) => {
            if (res.status) {
                setPoNumberData(res.data);

            } else {
                setPoNumberData([]);
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => {
            setPoNumberData([]);
            AlertMessages.getErrorMessage(err.message);
        })
    };

    const onReset = () => {
        form.resetFields();
        getSplitOrderComparisionData();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
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
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters);
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                type="search"
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select());
            }
        },
        render: (text) =>
            text ? (
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                )
            ) : null,
    });



    // const getSizeWiseHeaders = (data) => {
    //   const sizeHeaders = new Set<string>();
    //   data?.forEach((rec) =>
    //     rec.sizeWiseData?.forEach((version) => {
    //       sizeHeaders.add("" + version.size);
    //     })
    //   );
    //   return Array.from(sizeHeaders);
    // };
    // const getMap = (data) => {
    //   const sizeWiseMap = new Map<string, Map<string, number>>();
    //   data?.forEach((rec) => {
    //     if (!sizeWiseMap.has(rec.poNumber)) {
    //       sizeWiseMap.set(rec.poNumber, new Map<string, number>());
    //     }
    //     rec.sizeWiseData?.forEach((version) => {
    //       sizeWiseMap.get(rec.poNumber).set(" " + version.size, version.TotalQty);
    //     });
    //   });
    //   return sizeWiseMap;
    // };


    const renderReport = (data) => {
        // const sizeHeaders = getSizeWiseHeaders(data);
        // const sizeWiseMap = getMap(data);

        const columns: any = [
            {
                title: "S.No",
                key: "sno",
                width: 50,
                render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                fixed: "left",
            },
            //   {
            //     title: "PO Number",
            //     dataIndex: "poNumber",
            //     width: 90,
            //     sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
            //     sortDirections: ["ascend", "descend"],
            //     fixed: "left",
            //     // ...getColumnSearchProps('poNumber'),
            //     render: (text) => text ? text : "-"
            //   },
            //   {
            //     title: "Split Po",
            //     dataIndex: "splitPo",
            //     width: 90,
            //     sorter: (a, b) => a.splitPo.localeCompare(b.splitPo),
            //     sortDirections: ["ascend", "descend"],
            //     fixed: "left",
            //     // ...getColumnSearchProps('poNumber'),
            //     render: (text) => text ? text : "-"
            //   },

            {
                title: "PO Line",
                dataIndex: "po_line",
                width: 90,
                sorter: (a, b) => {
                    const codeA = (a.po_line || "").toString();
                    const codeB = (b.po_line || "").toString();
                    return codeA.localeCompare(codeB);
                },
                sortDirections: ["ascend", "descend"],
                ...getColumnSearchProps('po_line'),
                render: (text) => text ? text : "-"
            },
            {
                title: "Size",
                dataIndex: "size",
                width: 90,
                sorter: (a, b) => a.size.localeCompare(b.size),
                sortDirections: ["ascend", "descend"],
                ...getColumnSearchProps('size'),
                render: (text) => text ? text : "-"
            },

            {
                title: "PO",
                dataIndex: "",
                width: 90,
                // sorter: (a, b) => a.size.localeCompare(b.size),
                // sortDirections: ["ascend", "descend"],
                children: [
                    {
                        title: 'PO NUMBER',
                        dataIndex: 'po_number',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                    {
                        title: 'Spilt PO Number',
                        dataIndex: 'split_po',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                ]
            },
            {
                title: "Quantity",
                dataIndex: "",
                width: 90,
                // sorter: (a, b) => a.size.localeCompare(b.size),
                // sortDirections: ["ascend", "descend"],
                children: [
                    {
                        title: 'PO Number Quantity',
                        dataIndex: 'total_quantity',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                    {
                        title: 'Split PO Number Quantity',
                        dataIndex: 'split_po_total_quantity',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                ]
            },
        ];

        // sizeHeaders?.forEach(version => {
        //   columns.push({
        //     title: version,
        //     dataIndex: version,
        //     key: version,
        //     width: 70,
        //     align: 'center',
        //     children: [
        //       {
        //         title: 'UPC/EAN',
        //         dataIndex: '',
        //         key: '',
        //         width: 100,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);
        //           console.log()
        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = (sizeData?.upcEan)
        //               return (
        //                 formattedQty
        //               );
        //             } else {

        //               return (
        //                 '-'
        //               );
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },

        //       {
        //         title: 'MSRP',
        //         dataIndex: '',
        //         key: '',
        //         width: 70,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);
        //           console.log()
        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = (sizeData?.msrpPrice)
        //               return (
        //                 formattedQty
        //               );
        //             } else {

        //               return (
        //                 '-'
        //               );
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },
        //       {
        //         title: 'Customer Selling Price',
        //         dataIndex: '',
        //         key: '',
        //         width: 100,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);
        //           console.log()
        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = (sizeData?.csprice)
        //               return (
        //                 formattedQty
        //               );
        //             } else {

        //               return (
        //                 '-'
        //               );
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },
        //       {
        //         title: 'Price',
        //         dataIndex: '',
        //         key: '',
        //         width: 100,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);

        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = ${sizeData.price} ${sizeData.currency};
        //               return formattedQty;
        //             } else {
        //               return '-';
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },

        //       {
        //         title: 'Quantity',
        //         dataIndex: '',
        //         key: '',
        //         width: 100,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);
        //           console.log()
        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = (sizeData?.quantity)
        //               return (
        //                 formattedQty
        //               );
        //             } else {

        //               return (
        //                 '-'
        //               );
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },
        //       {
        //         title: 'Amount',
        //         dataIndex: '',
        //         key: '',
        //         width: 100,
        //         className: "center",
        //         render: (text, record) => {
        //           const sizeData = record.sizeWiseData.find(item => item.size === version);
        //           console.log()
        //           if (sizeData) {
        //             if (sizeData.size !== null) {
        //               const formattedQty = ${sizeData.amount} ${sizeData.currency};
        //               // const formattedQty = (sizeData?.amount)
        //               return (
        //                 formattedQty
        //               );
        //             } else {

        //               return (
        //                 '-'
        //               );
        //             }
        //           } else {
        //             return '-';
        //           }
        //         }
        //       },

        //     ]
        //   });
        // })



        const getRowClassName = (record) => {
            if (record.displayName) {
                return "colored-row";
            }
            return "";
        };

        return (
            <>

                <Table
                    // loading={tableLoading}
                    columns={columns}
                    dataSource={filterData}
                    size="small"
                    // pagination={false}
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    className="custom-table-wrapper"
                    scroll={{ x: "max-content", y: 450 }}
                    rowClassName={getRowClassName}
                    bordered
                />

            </>
        );
    };

    const exportExcel = () => {
        const excel = new Excel();

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format


        let rowIndex = 1;
        const excelColumnsWH: any[] = [];
        excelColumnsWH.push(
            {
                title: "#",
                // dataIndex: "sno", 
                width: 50,
                render: (text, object, index) => {
                    if (index == orderData.length) {
                        return null;
                    } else {
                        return rowIndex++;
                    }
                }
            },
            // {
            //     title: "PO Number",
            //     dataIndex: "poNumber",
            //     width: 90,
            //     render: (text) => text ? text : "-"
            // },

            // {
            //     title: "PO Line",
            //     dataIndex: "po_line",
            //     width: 90,
            //     render: (text) => text ? text : "-"
            // },
            // {
            //     title: "Size",
            //     dataIndex: "size",
            //     width: 90,
            //     render: (text) => text ? text : "-"
            // },

            {
                title: "PO Line",
                dataIndex: "po_line",
                width: 90,
                sorter: (a, b) => {
                    const codeA = (a.po_line || "").toString();
                    const codeB = (b.po_line || "").toString();
                    return codeA.localeCompare(codeB);
                },
                sortDirections: ["ascend", "descend"],
                ...getColumnSearchProps('po_line'),
                render: (text) => text ? text : "-"
            },
            {
                title: "Size",
                dataIndex: "size",
                width: 90,
                sorter: (a, b) => a.size.localeCompare(b.size),
                sortDirections: ["ascend", "descend"],
                ...getColumnSearchProps('size'),
                render: (text) => text ? text : "-"
            },

            {
                title: "PO",
                dataIndex: "",
                width: 90,
                // sorter: (a, b) => a.size.localeCompare(b.size),
                // sortDirections: ["ascend", "descend"],
                children: [
                    {
                        title: 'PO NUMBER',
                        dataIndex: 'poNumber',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                    {
                        title: 'Spilt PO Number',
                        dataIndex: 'splitPo',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                ]
            },
            {
                title: "Quantity",
                dataIndex: "",
                width: 90,
                // sorter: (a, b) => a.size.localeCompare(b.size),
                // sortDirections: ["ascend", "descend"],
                children: [
                    {
                        title: 'PO Number Quantity',
                        dataIndex: 'oldQuantity',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                    {
                        title: 'Split PO Number Quantity',
                        dataIndex: 'oldQuantity',
                        key: '',
                        width: 100,
                        className: "center",
                        render: (text) => text ? text : "-"

                    },
                ]
            },


        );






        excel
            .addSheet(`Order Split Po Comparision Report (${formattedDate})`)
            .addColumns(excelColumnsWH)
            .addDataSource(filterData, { str2num: false },);



        excel.saveAs(`Order Split Po Comparision Report (${formattedDate}).xlsx`);


    }



    return (
        <>
            <Card title="Order Split Po Comparision Report" headStyle={{ fontWeight: "bold" }}
                extra={<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={exportExcel}
                    icon={<FileExcelFilled />}>Download Excel</Button>}>
                <Form
                    onFinish={getSplitOrderComparisionData}
                    form={form}
                // layout='vertical'
                >
                    <Row gutter={24}>
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 4 }}
                            lg={{ span: 4 }}
                            xl={{ span: 6 }}
                        >
                            <Form.Item name="poNumber" label="PO Number">
                                <Select
                                    showSearch
                                    placeholder="Select PO number"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {poNumberData.map((inc: any) => {
                                        return (
                                            <Option key={inc.po_number} value={inc.po_number}>
                                                {inc.po_number}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Row>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 8 }}
                                lg={{ span: 8 }}
                                xl={{ span: 4 }}
                            >
                                <Form.Item>
                                    <Button
                                        style={{ marginLeft: 20 }}
                                        htmlType="submit"
                                        icon={<SearchOutlined />}
                                        type="primary"
                                    >
                                        SEARCH
                                    </Button>
                                </Form.Item>
                            </Col>

                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 5 }}
                                lg={{ span: 5 }}
                                xl={{ span: 4 }}
                            >
                                <Form.Item>
                                    <Button
                                        style={{ marginLeft: 70 }}
                                        htmlType="submit"
                                        type="primary"
                                        onClick={onReset}
                                        icon={<UndoOutlined />}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Row>
                </Form>
                {/* <Table
                    columns={columns}
                    dataSource={orderData}
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
                </Table> */}
                {renderReport(filterData)}
            </Card>
        </>
    );

}

export default LevisSplitComparisionReport