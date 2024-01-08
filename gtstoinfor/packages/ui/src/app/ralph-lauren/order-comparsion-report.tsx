import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Table, Tabs, Tooltip, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { OrdersService } from "@project-management-system/shared-services"
import React, { useEffect, useState } from "react"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"



export const OrderComparisionReport = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { Option } = Select;
  const [page, setPage] = useState<number>(1);

  const [selected, setSelected] = useState('ExFactory')
  const [data, setData] = useState<any[]>([]);
  const [phase, setPhase] = useState<any[]>([]);
  const [phaseExcel, setPhaseExcel] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number | null>(null);
  const service = new OrdersService();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [excelsData, setExcelData] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [file1, setfile1] = useState<number>();
  const [file2, setfile2] = useState<number>();
  const { Text } = Typography;
  const [pageSize, setPageSize] = useState(10);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);
  const [items, setItems] = useState<any[]>([]);
  
  const getSizeWiseHeaders = (data) => {
    const sizeHeaders = new Set<string>();
    data?.forEach((rec) =>
      rec.sizeWiseData?.forEach((version) => {
        sizeHeaders.add("" + version.size);
      })
    );
    return Array.from(sizeHeaders);
  };
  const getMap = (data) => {
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

 
  const renderReport = (data) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);

    const columns: any = [
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
        // ...getColumnSearchProps('poNumber'),
        render: (text) => text ? text : "-"
      },
      {
        title: "PO Item",
        dataIndex: "poItem",
        width: 90,
        // sorter: (a, b) => a.poItem.localeCompare(b.poItem),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('poItem'),
        render: (text) => text ? text : "-"
      },
      {
        title: "Material Number",
        dataIndex: "materialNo",
        width: 110,
        sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('materialNo'),
        render: (text) => text.toString() ? text : "-"
      },
      {
        title: "Season Code",
        dataIndex: "seasonCode",
        width: 110,
        sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('seasonCode'),
        render: (text) => text ? text : "-"

      },
      // {
      //   title: "Address",
      //   dataIndex: "shipToAddress",
      //   width: 500,
      //   sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
      //   sortDirections: ["ascend", "descend"],
      //   ...getColumnSearchProps('shipToAddress'),
      //   render: (text) => text ? text : "-"

      // },

      {
        title: "Address",
        dataIndex: "shipToAddress",
        width: 200,
        sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('shipToAddress'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },
      // {
      //   title: "Agent",
      //   dataIndex: "agent",
      //   align: "center",
      //   width: 300,
      //   sorter: (a, b) => a.agent.localeCompare(b.agent),
      //   sortDirections: ["ascend", "descend"],
      //   ...getColumnSearchProps('agent'),
      //   render: (text) => text ? text : "-"

      // },
      {
        title: "Agent",
        dataIndex: "agent",
        width: 200,
        sorter: (a, b) => a.agent.localeCompare(b.agent),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('agent'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },

      {
        title: "Purchase Group",
        dataIndex: "purchaseGroup",
        align: "center",
        width: 150,
        sorter: (a, b) => a.purchaseGroup.localeCompare(b.purchaseGroup),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('purchaseGroup'),
        render: (text) => text ? text : "-"

      },
    
      {
        title: "Revision No",
        dataIndex: "revisionNo",
        align: "center",
        width: 90,
        // sorter: (a, b) => a.revisionNo.localeCompare(b.revisionNo),
        sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('revisionNo'),
        render: (text) => text ? text : "-"

      },
      {
        title: "Color",
        dataIndex: "color",
        align: "center",
        width: 110,
        sorter: (a, b) => a.color.localeCompare(b.color),
        sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        // ...getColumnSearchProps('color'),
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
            width: 100,
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
            width: 100,
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
            width: 100,
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
            width: 100,
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
            width: 100,
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
         
        ]
      });
    })

    columns.push(
      {
        title: "Total Quantity",
        dataIndex: "",
        align: "center",
        width: 90,
        sorter: (a, b) => {
          const sumA = a.sizeWiseData.reduce((acc, r) => acc + parseFloat(r.quantity) || 0, 0);
          const sumB = b.sizeWiseData.reduce((acc, r) => acc + parseFloat(r.quantity) || 0, 0);
      
          return sumA - sumB;
        },
        sortDirections: ["ascend", "descend"],
        render: (text, record) => {
          let sum = 0;
          record.sizeWiseData.forEach((r) => {
            // Convert to number before summing
            sum += parseFloat(r.quantity) || 0;
          });
      
          return sum;
        },
      },
      
      {
        title: "Total Amount",
        dataIndex: "",
        align: "center",
        width: 90,
        sorter: (a, b) => {
          const sumA = a.sizeWiseData.reduce((acc, r) => acc + parseFloat(r.amount) || 0, 0);
          const sumB = b.sizeWiseData.reduce((acc, r) => acc + parseFloat(r.amount) || 0, 0);
      
          return sumA - sumB;
        },
        render: (text, record) => {
          let sum = 0;
          record.sizeWiseData.forEach((r) => {
            // Convert to number before summing
            sum += parseFloat(r.amount) || 0;
          });
          // return sum.toLocaleString("en-IN") ;
          const formattedSum = sum.toFixed(2);
          const currency = record.currency  // Default to USD if currency is not available

          return (
            <>
              <span>{formattedSum} {currency}</span>
              
            </>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
        width: 90,
        sorter: (a, b) => a.status.localeCompare(b.status),
        sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-"
      },
      {
        title: "Action",
        dataIndex: "action",
        align: "center",
        width: 120,
        render: (value, record) => (
          <>
            <Button 
            // onClick={() => setMoreData(record)}
            >More Info</Button>
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

          <Table
            // loading={tableLoading}
            columns={columns}
            // dataSource={filterData}
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

  

  return (
    <>
      <Card title="Order Comparsion Report" headStyle={{ fontWeight: "bold" }}
        extra={<Button
          type="default"
          style={{ color: 'green' }}
        //   onClick={exportExcel}
          icon={<FileExcelFilled />}>Download Excel</Button>}>
        <Form
        //   onFinish={getorderData}
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
                  {/* {orderData.map((inc: any) => {
                    return (
                      <Option key={inc.poNumber} value={inc.poNumber}>
                        {inc.poNumber}
                      </Option>
                    );
                  })} */}
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="material" label="Material Number">
               <Input  placeholder="Material Number"/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="season" label="Season Code">
               <Input  placeholder="Enter Season"/>
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
                //   onClick={onReset}
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
        {/* {renderReport(filterData)} */}
      </Card>
    </>
  );

}

export default OrderComparisionReport