import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tooltip,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  HbService,
} from "@project-management-system/shared-services";
import React from "react";
import {SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import {
  
  HbOrderAcceptanceRequest,
  HbPoOrderFilter,
} from "@project-management-system/shared-models";
import { useIAMClientState } from "../nike/iam-client-react";

export function HbOrderAcceptanceGrid() {
  const service = new HbService();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [poLine, setPoLine] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [custPo, setcustPo] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [itemNoValues, setItemNoValues] = useState({});

  useEffect(() => {
    getHborderData();
    getHbPoNumber()
  }, []);


  const getHborderData = () => {
    const req = new HbPoOrderFilter();

    if (form.getFieldValue("custPo") !== undefined) {
      req.custPo = form.getFieldValue("custPo");
    }
    req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo : null

    service.getHborderData(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
        setFilterData(res.data);
      }
    });
  };

  console.log(form.getFieldValue("custPo"), "uuuuu")
  const getHbPoNumber = () => {
    service.getHbPoNumber().then((res) => {
      if (res.status) {
        setcustPo(res.data);

      }
    });
  };


  const handleItemNoChange = (value, record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;

    console.log("Item No from form:", itemNoValue);

    setItemNoValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };


  // const createCOLine = (record, index) => {
  //   const formValues = form.getFieldsValue();
  //   const itemNoValue = formValues[index]?.itemNo;
  //   console.log(record);
  //   const req = new HbOrderAcceptanceRequest();
  //   req.custPo = record.custPo;
  //   req.style = record.style;
  //   req.itemNo = itemNoValue;
  //   req.buyer = 'HB ATHLETIC';
  //   req.exitFactoryDate = record.exitFactoryDate;
   


  //   console.log("Request Payload:", req);

  //   service.hbCoLineCreationReq(req).then((res) => {
  //     if (res.status) {
  //       getHborderData();
  //       setItemNoValues({});
  //       form.setFieldsValue({ [index]: { itemNo: undefined } });
  //       message.success(res.internalMessage);
  //     } else {
  //       message.error(res.internalMessage);
  //     }
  //   });
  // };

  const createCOLine = (record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;
    console.log(record,'hhhhhhhhhhhhhhhh');
    const req = new HbOrderAcceptanceRequest();
    req.custPo = record.custPo;
    req.style = record.style;
    req.itemNo = itemNoValue;
    req.buyer = 'HB ATHLETIC';
    req.exitFactoryDate = record.exitFactoryDate;
  
    console.log("Request Payload:", req);
  
    service.hbCoLineCreationReq(req).then((res) => {
      if (res.status) {
        getHborderData();
        setItemNoValues({});
        form.setFieldsValue({ [index]: { itemNo: undefined } });
        message.success(res.internalMessage);
      } else {
        message.error(res.internalMessage);
      }
    });
  };
  
  const processData = (tableData: HbOrderAcceptanceRequest[]) => {
    const dataTobeReturned = [];
    const roleWiseMapData = new Map<string, HbOrderAcceptanceRequest[]>();

    tableData.forEach(rec => {
      const key = `${rec.custPo}_${rec.itemNo}_${rec.exitFactoryDate}`;

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
    getHborderData();
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

  // const showModal1 = (record) => {
  //   setPoNumber(record);
  //   setIsModalOpen1(true);
  // };

  // const cancelHandle = () => {
  //   setIsModalOpen1(false);
  // };
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

  const setMoreData = (record) => {
    navigate("/ralph-lauren/order-data-detail-view", {
      state: { data: record },
    });
  };
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
        title: "BUYER PO",
        dataIndex: "custPo",
        width: 90,
       // sorter: (a, b) => a.custPo.localeCompare(b.custPo),
     //   sortDirections: ["ascend", "descend"],
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
        title: "Style",
        dataIndex: "style",
        width: 90,
        // sorter: (a, b) => a.poLine.localeCompare(b.poLine),
        // sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        fixed: "left",

      },
      {
        title: "Color",
        dataIndex: "color",
        width: 90,
        // sorter: (a, b) => a.poLine.localeCompare(b.poLine),
        // sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        fixed: "left",

      },

      {
        title: "Delivery Date",
        dataIndex: "exitFactoryDate",
        width:90,

        // sorter: (a, b) => a.material.localeCompare(b.material),
        // sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        // ...getColumnSearchProps('material')

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
          // {
          //   title: 'COLOR',
          //   dataIndex: '',
          //   key: '',
          //   width: 70,
          //   className: "center",
          //   render: (text, record) => {
          //     const sizeData = record.sizeWiseData.find(item => item.size === version);
          //     console.log()
          //     if (sizeData) {
          //       if (sizeData.size !== null) {
          //         const formattedQty = (sizeData?.color) ? (sizeData?.color) : "-"

          //         return (
          //           formattedQty
          //         );
          //       } else {

          //         return (
          //           '-'
          //         );
          //       }
          //     } else {
          //       return '-';
          //     }
          //   }
          // },
          {
            title: 'QUANTITY',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.quantity) ? (sizeData?.quantity) : "-"

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
            title: 'UNIT PRICE',
            dataIndex: '',
            key: '',
            width: 70,
            className: "center",
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.size === version);
              console.log()
              if (sizeData) {
                if (sizeData.size !== null) {
                  const formattedQty = (sizeData?.unitPrice) ? (sizeData?.unitPrice) : "-"
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
        title: "SHIP TO ADDRESS",
        dataIndex: "shipToAdd",
        width: 150,
       // sorter: (a, b) => a.shipToAdd.localeCompare(b.shipToAdd),
       // sortDirections: ["ascend", "descend"],
      //  ...getColumnSearchProps('shipToAddress'),
        render: (text) => (
          <Tooltip title={text || "-"}>
            {text ? `${text.substring(0, 20)}...` : "-"}
          </Tooltip>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
        width: "80px",
        fixed: "right",
        render: (text, record, index) => {
          return {
            children: <div style={{ position: "relative", top: "-7px" }}>{text}</div>,
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
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
                  disabled={record.status == 'ACCEPTED' ? true : false}
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
                disabled={record.status === 'ACCEPTED' ? true : !isEnabled}
              >
                {record.status === 'ACCEPTED' ? "Accepted" : "Accept"}
              </Button>
            ),
            props: {
              rowSpan: record.rowSpan,
            },
          };
        },
      },


    );

    const getRowClassName = (record) => {
      if (record.displayName) {
        return "colored-row";
      }
      return "";
    };

    return (
      <>
        {/* {filterData.length > 0 ? ( */}
        <Form form={form}>
          <Table
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
            rowClassName={getRowClassName}
            bordered
          />
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
          onFinish={getHborderData}
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
              <Form.Item name="custPo" label="Buyer po number">
                <Select
                  showSearch
                  placeholder="Select buyer po number"
                  optionFilterProp="children"
                  allowClear
                >
                  {custPo.map((inc: any) => {
                    return (
                      <Option key={inc.cust_po} value={inc.cust_po}>
                        {inc.cust_po}
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
            <Row>
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
                    onClick={getHborderData}
                  >
                    SEARCH

                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    style={{ marginLeft: 60 }}
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
export default HbOrderAcceptanceGrid;