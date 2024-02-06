import { Button, Card, Col, Form, Input, Modal, Row, Select, Spin, Table, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { CentricService } from "@project-management-system/shared-services";
import React from "react";
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { CentricOrderAcceptanceRequest, OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { useIAMClientState } from "../nike/iam-client-react";
import { Excel } from "antd-table-saveas-excel";

export function CentricOrderAcceptanceGrid() {
  const service = new CentricService();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [poLine, setPoLine] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [poNumber, setPoNumber] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [itemNoValues, setItemNoValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCentricorderData();
    getPoNumber()
  }, []);


  // const getCentricorderData = () => {
  //   const req = new PoOrderFilter();

  //   if (form.getFieldValue("poNumber") !== undefined) {
  //     req.poNumber = form.getFieldValue("poNumber");
  //   }
  //   req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo : null

  //   service.getCentricorderData(req).then((res) => {
  //     if (res.status) {
  //       setOrderData(res.data);
  //       setFilterData(res.data);
  //     }
  //   });
  // };

  const getCentricorderData = () => {
    setLoading(true);
    const req = new PoOrderFilter();
  
    if (form.getFieldValue("poNumber") !== undefined) {
      req.poNumber = form.getFieldValue("poNumber");
    }
    req.externalRefNo = IAMClientAuthContext.user?.externalRefNo
      ? IAMClientAuthContext.user?.externalRefNo
      : null;
  
    service.getCentricorderData(req).then((res) => {
      setLoading(false); // Stop the loading spinner
      if (res.status) {
        setOrderData(res.data);
        setFilterData(res.data);
      }
    });
  };

  const getPoNumber = () => {
    service.getPoNumber().then((res) => {
      if (res.status) {
        setPoNumber(res.data);

      }
    });
  };


  const handleItemNoChange = (value, record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;
    setItemNoValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };


  const createCOLine = (record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;
    const req = new CentricOrderAcceptanceRequest();
    req.poNumber = record.poNumber;
    req.poLine = record.poLine;
    req.itemNo = itemNoValue;
    req.buyer = 'Centric';
    req.deliveryDate = record.deliveryDate;
    req.style = record.style;
    req.material=record.material
    //req.shipToAddress=record.shipToAddress

    service.coLineCreationReq(req).then((res) => {
      if (res.status) {
        getCentricorderData();
        setItemNoValues({});
        form.setFieldsValue({ [index]: { itemNo: undefined } });
        message.success(res.internalMessage);
      } else {
        message.error(res.internalMessage);
      }
    });
  };

  const processData = (tableData: CentricOrderAcceptanceRequest[]) => {
    const dataTobeReturned = [];
    const roleWiseMapData = new Map<string, CentricOrderAcceptanceRequest[]>();
    tableData.forEach(rec => {
      const key = `${rec.poNumber}_${rec.itemNo}_${rec.deliveryDate}_${rec.style}_${rec.shipToAddress}`;
      if (!roleWiseMapData.has(key)) {
        roleWiseMapData.set(key, [rec]);
      } else {
        roleWiseMapData.get(key).push(rec);
      }
    });

    for (const [, roleData] of roleWiseMapData) {
      roleData.forEach((element, index) => {
        dataTobeReturned.push({
          ...element,
          rowSpan: index === 0 ? roleData.length : 0,
          groupedIds: roleData.map(rec => rec.id)
        });
      });
    }
    return dataTobeReturned;
  };

  const isActionButtonEnabled = (index) => {
    return (
      itemNoValues[index] &&
      itemNoValues[index].trim() !== ""
    );
  };

  const onReset = () => {
    form.resetFields();
    getCentricorderData();
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
          style={{ marginRight: 8 }}
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

  const getSizeWiseHeaders = (data) => {
    const sizeHeaders = new Set<string>();
    data?.forEach((rec) =>
      rec.sizeWiseData?.forEach((version) => {
        sizeHeaders.add("" + version.size);
      })
    );
    return Array.from(sizeHeaders);
  };

  const renderReport = (data) => {
    const sizeHeaders = getSizeWiseHeaders(data);

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
        // render: (text) => text ? text : "-",
        render: (text, record, index) => {
          return {
            children: text,
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
        fixed: "left",
        // ...getColumnSearchProps('poNumber')
      },
      {
        title: "PO Line Number",
        dataIndex: "poLine",
        width: 90,
        // sorter: (a, b) => a.poLine.localeCompare(b.poLine),
        // sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        fixed: "left",
      },
      {
        title: 'Delivery Date',
        dataIndex: 'deliveryDate',
        key: '',
        width: 90,
        className: "center",
        render: (text, record) => {
          const sizeData = record.sizeWiseData.find(item => item.size);
          if (sizeData) {
            if (sizeData.size !== null) {
              const formattedQty = (sizeData?.deliveryDate) ? (sizeData?.deliveryDate) : "-"
              return (
                formattedQty
              );
            } else {
              return '-'
            }
          } else {
            return '-';
          }
        }
      },
      {
        title: "Material",
        dataIndex: "material",
        width: 150,
        render: (text) => text ? text : "-",
        // ...getColumnSearchProps('material')
      },
      {
        title: "Compt.Material",
        dataIndex: "comptMaterial",
        width: 110,
        // sorter: (a, b) => a.comptMaterial.localeCompare(b.comptMaterial),
        // sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-"
      },
      {
        title: "Style Number",
        dataIndex: "style",
        width: 90,
        render: (text) => text ? text : "-",
        // ...getColumnSearchProps('material')
      },
      {
        title: "PO Date",
        dataIndex: "PODate",
        align: "center",
        width: 90,
        sorter: (a, b) => a.PODate.localeCompare(b.PODate),
        sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-"
      },
      {
        title: "Shipment Method",
        dataIndex: "shipmentMethod",
        width: 90,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('shipmentMethod')
      },
      {
        title: "PPK UPC",
        dataIndex: "ppkUpc",
        width: 90,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('ppkUpc')
      },
      {
        title: "Color",
        dataIndex: "color",
        width: 150,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('color')
      },
      {
        title: "Gender",
        dataIndex: "gender",
        width: 90,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('gender')
      },
      {
        title: "Short Description",
        dataIndex: "shortDescription",
        width: 150,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('shortDescription')
      },
      {
        title: "Pack Method",
        dataIndex: "packMethod",
        width: 150,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('packMethod')
      },
      // {
      //   title: "Vendor Booking Flag",
      //   dataIndex: "vendorFlag",
      //   align: "center",
      //   width: 90,
      //   render: (text) => text ? text : "-",
      //   ...getColumnSearchProps('vendorFlag')
      // },
      {
        title: "Season",
        dataIndex: "season",
        width: 90,
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('season')
      },
      {
        title: "Port Of Export",
        dataIndex: "portOfExport",
        align: "center",
        width: 90,
        render: (text) => text ? text : "-"
      },
      {
        title: "Port of Entry Name",
        dataIndex: "portOfEntry",
        align: "center",
        width: 180,
        render: (text) => text ? text : "-"
      },
      {
        title: "Reference",
        dataIndex: "reference",
        width: 90,
        render: (text) => text ? text : "-"
      },
      {
        title: "Payment Terms Description",
        dataIndex: "paymentTermDescription",
        align: "center",
        width: 180,
        render: (text) => text ? text : "-"
      },
      // {
      //   title: "Special Instructions",
      //   dataIndex: "specialInstructions",
      //   align: "center",
      //   width: 180,
      //   render: (text) => (
      //     <>
      //       <Tooltip title={text || "-"}>
      //         {text ? `${text.substring(0, 20)}...` : "-"}
      //       </Tooltip>
      //     </>
      //   )
      // },
      {
        title: "Division",
        dataIndex: "division",
        width: 130,
        render: (text) => text ? text : "-"
      },
      // {
      //   title: "Manufacture",
      //   dataIndex: "manufacture",
      //   width: 150,
      //   sorter: (a, b) => a.manufacture.localeCompare(b.manufacture),
      //   sortDirections: ["ascend", "descend"],
      //   ...getColumnSearchProps('manufacture'),
      //   render: (text) => (
      //     <Tooltip title={text || "-"}>
      //       {text ? `${text.substring(0, 20)}...` : "-"}
      //     </Tooltip>
      //   ),
      // },
     
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
            title: 'Ratio',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.ratio) ? (sizeData?.ratio) : "-"
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
            title: 'UPC',
            dataIndex: '',
            key: '',
            width: 90,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.upc) ? (sizeData?.upc) : "-"
                  // const formattedQty = (sizeData?.amount)
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
            title: 'label',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.label) ? (sizeData?.label) : "-"
                  // const formattedQty = (sizeData?.amount)
                  return formattedQty;
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'FOB Price',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.fobPrice) ? (sizeData?.fobPrice) : "-"
                  return formattedQty
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Size Qty in Pcs',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.totalQuantity) ? (sizeData?.totalQuantity) : "-"
                  return formattedQty
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Retail Price(USD) ',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.retailPrice) ? (sizeData?.retailPrice) : "-"
                  return formattedQty
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Ex-factory Date ',
            dataIndex: '',
            key: '',
            width: 100,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.exfactory) ? (sizeData?.exfactory) : '-'
                  return formattedQty
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Export Date ',
            dataIndex: '',
            key: '',
            width: 100,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.exportDate) ? (sizeData?.exportDate) : "-"
                  return formattedQty
                } else {
                  return '-'
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Delivery Date',
            dataIndex: '',
            key: '',
            width: 100,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.deliveryDate) ? (sizeData?.deliveryDate) : "-"
                  return formattedQty
                } else {
                  return '-'
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
        title: "Incoterm",
        dataIndex: "incoterm",
        width: 150,
        sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps('incoterm'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },
      {
        title: "Ship To Address",
        dataIndex: "shipToAddress",
        width: 150,
        sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps('shipToAddress'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },

      // {
      //   title: "Item status",
      //   dataIndex: "status",
      //   align: "center",
      //   width: 90,
      //   render: (text) => text ? text : "-",
      //   filters: [
      //     {
      //       text: 'OPEN',
      //       value: 'OPEN',
      //     },
      //     {
      //       text: 'INPROGRESS',
      //       value: 'INPROGRESS',
      //     },
    
      //   ],
      //   onFilter: (value,record) =>{ return record.status.toLowerCase() === value.toLowerCase()}
      // },
  
      {
        title: "Consignee",
        dataIndex: "consignee",
        width: 150,
        sorter: (a, b) => a.consignee.localeCompare(b.consignee),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps('consignee'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },


      {
        title: "Item status",
        dataIndex: "status",
        align: "center",
        fixed: 'right',
        width: 90,
        render: (text, record) => {
          return {
            children: <div style={{ position: "relative", top: "-7px" }}>{text}</div>,
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
        filters: [
          {
            text: 'OPEN',
            value: 'OPEN',
          },
          {
            text: 'INPROGRESS',
            value: 'INPROGRESS',
          },
        ],
        onFilter: (value, record) => record.status.toLowerCase() === value.toLowerCase(),
      },
      
      
      
      {
        title: "Item No",
        dataIndex: "itemNo",
        width: 100,
        align: "center",
        fixed: 'right',
        render: (text, record, index) => {
          return {
            children: (
              <Form.Item name={[index, 'itemNo']}>
                <Input
                  style={{ width: '95px' }}
                  placeholder="Enter Item No"
                  onChange={(e) => handleItemNoChange(e.target.value, record, index)}
                  disabled={record.status == 'INPROGRESS' ? true : false}
                />
              </Form.Item>
            ),
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
      },
      
      {
        title: "Action",
        dataIndex: "action",
        width: 80,
        align: "center",
        fixed: 'right',
        render: (text, record, index) => {
          const isEnabled = isActionButtonEnabled(index);
          return {
            children: (
              <Button
                style={{ position: "relative", top: "-7.5px" }}
                onClick={() => createCOLine(record, index)}
                disabled={record.status === 'INPROGRESS' ? true : !isEnabled}
              >
                {record.status === 'INPROGRESS' ? "Accepted" : "Accept"}
              </Button>
            ),
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
      },
    );

    return (
      <>
        {/* {filterData.length > 0 ? ( */}
        <Form form={form}>
          {/* <Table
            // loading={tableLoading}
            columns={columns}
            dataSource={processData(filterData)}
            size="small"
            pagination={false}
            // pagination={{
            //   pageSize: 50,
            //   onChange(current, pageSize) {
            //     setPage(current);
            //     setPageSize(pageSize);
            //   },
            // }}
            className="custom-table-wrapper"
            scroll={{ x: "max-content", y: 450 }}
            bordered
          /> */}


{loading ? (
  <Spin spinning={loading}>
    {/* Content to show while loading */}
    <div>Loading...</div>
  </Spin>
) : (
  <Table
    columns={columns}
    dataSource={processData(filterData)}
    size="small"
    pagination={false}
    className="custom-table-wrapper"
    scroll={{ y: 450 }}
    bordered
  />
)}
        </Form>
        {/* ) : (
          <Table size="large" />
        )} */}
      </>
    );
  };

  return (
    <>
      <Card title="Order Acceptance" headStyle={{ fontWeight: "bold" }}>
        <Form
          onFinish={getCentricorderData}
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
                  {poNumber.map((inc: any) => {
                    return (
                      <Option key={inc.po_number} value={inc.po_number}>
                        {inc.po_number}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            {/* <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="poLine" label="PO Line">
                <Select
                  showSearch
                  placeholder="Select PO Line"
                  optionFilterProp="children"
                  allowClear
                >
                  {orderData.map((inc: any) => {
                    return (
                      <Option key={inc.poLine} value={inc.poLine}>
                        {inc.poLine}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col> */}
            {/* <Row> */}
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
                //style={{marginTop:20,marginLeft:60}}
              >
                <Form.Item>
                  <Button
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    type="primary"
                    onClick={getCentricorderData}
                  >
                    SEARCH
                  </Button>
                </Form.Item>
              {/* </Col>
              <Col> */}
                <Form.Item  style={{marginTop:-44 ,marginLeft: 120}} >
                  <Button
                    //style={{ marginLeft: 60 }}
                    htmlType="submit"
                    type="primary"
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    Reset
                  </Button>
                </Form.Item>

              </Col>
            {/* </Row> */}
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
export default CentricOrderAcceptanceGrid;