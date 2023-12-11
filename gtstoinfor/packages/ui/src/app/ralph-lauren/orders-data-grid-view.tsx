import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  NikeService,
  RLOrdersService,
} from "@project-management-system/shared-services";
import React from "react";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import {
  OrderDataModel,
  PoOrderFilter,
} from "@project-management-system/shared-models";
import { ColumnsType } from "antd/es/table";

export function RLOrdersGrid() {
  const service = new RLOrdersService();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [poLine, setPoLine] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getorderData();
  }, []);

  const getorderData = () => {
    const req = new PoOrderFilter();
    if (form.getFieldValue("poNumber") !== undefined) {
      req.poNumber = form.getFieldValue("poNumber");
    }
    service.getorderData(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
        setFilterData(res.data);
      }
    });
  };
  const onReset = () => {
    form.resetFields();
    getorderData();
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

  const showModal1 = (record) => {
    setPoNumber(record);
    setIsModalOpen1(true);
  };

  const cancelHandle = () => {
    setIsModalOpen1(false);
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

  const setMoreData = (record) => {
    navigate("/ralph-lauren/order-data-detail-view", {
      state: { data: record },
    });
  };
  const getSizeWiseHeaders = (data: OrderDataModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach((rec) =>
      rec.sizeWiseData?.forEach((version) => {
        sizeHeaders.add("" + version.size);
      })
    );
    return Array.from(sizeHeaders);
  };
  const getMap = (data: OrderDataModel[]) => {
    const sizeWiseMap = new Map<string, Map<string, number>>();
    data?.forEach((rec) => {
      if (!sizeWiseMap.has(rec.poNumber)) {
        sizeWiseMap.set(rec.poNumber, new Map<string, number>());
      }
      rec.sizeWiseData?.forEach((version) => {
        sizeWiseMap.get(rec.poNumber).set(" " + version.size, version.TotalQty);
      });
    });
    return sizeWiseMap;
  };

  const renderReport = (data: OrderDataModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);

    const columns: ColumnsType<any> = [
      {
        title: "S.No",
        key: "sno",
        width: 50,
        render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        fixed: "left",
      },
      {
        title: "PO Number",
        dataIndex: "poNumber",
        width: 90,
        sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
        sortDirections: ["ascend", "descend"],
        fixed: "left",
        // ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: "PO Item",
        dataIndex: "poItem",
        width: 90,
        sorter: (a, b) => a.poItem.localeCompare(b.poItem),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: "Material Number",
        dataIndex: "materialNo",
        width: 90,
        sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: "Season Code",
        dataIndex: "seasonCode",
        width: 90,
        sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: "Address",
        dataIndex: "shipToAddress",
        width: 90,
        sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: "Agent",
        dataIndex: "agent",
        align: "center",
        width: 90,
        sorter: (a, b) => a.agent.localeCompare(b.agent),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Purchase Group",
        dataIndex: "purchaseGroup",
        align: "center",
        width: 90,
        sorter: (a, b) => a.purchaseGroup.localeCompare(b.purchaseGroup),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Supplier",
        dataIndex: "supplier",
        align: "center",
        width: 90,
        sorter: (a, b) => a.supplier.localeCompare(b.supplier),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Revision No",
        dataIndex: "revisionNo",
        align: "center",
        width: 90,
        sorter: (a, b) => a.revisionNo.localeCompare(b.revisionNo),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Color",
        dataIndex: "color",
        align: "center",
        width: 90,
        sorter: (a, b) => a.color.localeCompare(b.color),
        sortDirections: ["ascend", "descend"],
      },
     
    ];

    sizeHeaders?.forEach(version => {
        columns.push({
            title: version,
            dataIndex: version,
            key: version,
            width: 70,
            align: 'center',
            children: [
                {
                    title: 'UPC/EAN',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = (sizeData?.upcEan)
                                return (
                                    formattedQty
                                );
                            } else {

                                return (
                                    '-'
                                );
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                
                {
                    title: 'MSRP',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = (sizeData?.msrpPrice)
                                return (
                                    formattedQty
                                );
                            } else {

                                return (
                                    '-'
                                );
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    title: 'Customer Selling Price',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = (sizeData?.csprice)
                                return (
                                    formattedQty
                                );
                            } else {

                                return (
                                    '-'
                                );
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    title: 'Price',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = `${sizeData.price} ${sizeData.currency}`;
                                return formattedQty;
                            } else {
                                return '-';
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                
                {
                    title: 'Quantity',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = (sizeData?.quantity)
                                return (
                                    formattedQty
                                );
                            } else {

                                return (
                                    '-'
                                );
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    title: 'Amount',
                    dataIndex: '',
                    key: '',
                    width: 70,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                                const formattedQty = `${sizeData.amount} ${sizeData.currency}`;
                                // const formattedQty = (sizeData?.amount)
                                return (
                                    formattedQty
                                );
                            } else {

                                return (
                                    '-'
                                );
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                // {
                //     title: 'Total Amount',
                //     dataIndex: '',
                //     key: '',
                //     width: 70,
                //     className: "center",
                //     render: (text, record) => {
                //         const sizeData = record.sizeWiseData.find(item => item.size === version);
                //         console.log()
                //         if (sizeData) {
                //             if (sizeData.size !== null) {
                //                 const formattedQty = (sizeData?.totalAmount)
                //                 return (
                //                     formattedQty
                //                 );
                //             } else {

                //                 return (
                //                     '-'
                //                 );
                //             }
                //         } else {
                //             return '-';
                //         }
                //     }
                // },
            ]
        });
    })

    columns.push(
        {
            title: "Total Quantity",
            dataIndex: "totalQty",
            align: "center",
            width: 90,
            sorter: (a, b) => a.totalQty.localeCompare(b.totalQty),
            sortDirections: ["ascend", "descend"],
          },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            align: "center",
            width: 90,
            sorter: (a, b) => a.totalAmount.localeCompare(b.totalAmount),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                if (record) {
                    if (record) {
                        const totalAmt = `${record.totalAmount} ${record.currency}`;
                        return (
                            totalAmt
                        );
                    } else {

                        return (
                            '-'
                        );
                    }
                } else {
                    return '-';
                }
            }
          },
        {
            title: "Status",
            dataIndex: "status",
            align: "center",
            width: 90,
            sorter: (a, b) => a.status.localeCompare(b.status),
            sortDirections: ["ascend", "descend"],
          },
        {
      title: "Action",
      dataIndex: "action",
      align: "center",
      width: 120,
      render: (value, record) => (
        <>
          <Button onClick={() => setMoreData(record)}>More Info</Button>
        </>
      ),
    }
    );

    const getRowClassName = (record) => {
      if (record.displayName) {
        return "colored-row";
      }
      return "";
    };

    return (
      <>
        {filterData.length > 0 ? (
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
        ) : (
          <Table size="large" />
        )}
      </>
    );
  };

  return (
    <>
      <Card title="Order " headStyle={{ fontWeight: "bold" }}>
        <Form
          onFinish={getorderData}
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
                  {orderData.map((inc: any) => {
                    return (
                      <Option key={inc.poNumber} value={inc.poNumber}>
                        {inc.poNumber}
                      </Option>
                    );
                  })}
                </Select>
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
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                >
                  SEARCH
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
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
export default RLOrdersGrid;
