import {
  BarcodeOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  InfoCircleOutlined,
  PrinterOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  IndentService,
  RequisitionService,
  StyleService,
} from "@project-management-system/shared-services";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import style from "antd/es/alert/style";
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import BarcodePrint from "./barcode-print";
import {
  CustomerOrderStatusEnum,
  IndentRequestFilter,
} from "@project-management-system/shared-models";
import Highlighter from "react-highlight-words";

const { Option } = Select;

export const SourcingRequisitionDynamicView = () => {
  const [tabName, setTabName] = useState<string>("Fabric");
  const [page, setPage] = React.useState(1);
  const [sourcingForm] = Form.useForm();
  const styleService = new StyleService();
  const [style, setStyle] = useState<any[]>([]);
  const navigate = useNavigate();
  // const service = new RequisitionService()
  const service = new IndentService();
  const logInUser = localStorage.getItem("userName");
  const [barcode, setBarcode] = useState<string>(null);
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [barcodeInfo, setBarcodeInfo] = useState<string>("");
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    // getStyle();
    getAll();
  }, []);

  useEffect(() => {
    if (data) {
    console.log(tableData)
      setTableData(data);
    }
  }, [data]);

  // const getAll = () => {
  //   service.getAllIndentData().then((res) => {
  //     if (res.status) {
  //       setData(res.data);
  //     }
  //   });
  // };


  const getAll = () => {
    const req = new IndentRequestFilter();
    if (form.getFieldValue("requestNo") !== undefined) {
      req.requestNo = form.getFieldValue("requestNo");
    }
    if (form.getFieldValue("style") !== undefined) {
      req.style = form.getFieldValue("style");
    }
    if (form.getFieldValue("status") !== undefined) {
      req.status = form.getFieldValue("status");
    }
    service.getAllIndentData(req).then((res) => {
      if (res.status) {
        setData(res.data);
        setFilterData(res.data);
      }
    });
  };

  const getStyle = () => {
    styleService.getAllActiveStyle().then((res) => {
      if (res.status) {
        setStyle(res.data);
      }
    });
  };

  const generateBarcode = (m3Code, info) => {
    setBarcode(m3Code);
    setBarcodeInfo(info);
    setBarcodeModal(true);
  };

  const generatePoForFabric = (rowData:any) =>{
    // console.log(rowData)
    navigate('/purchase-order', { state: { data: rowData, type:'Indent' } })
  }

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
  

  const dataSource = tableData[0]?.indentFabricDetails?.map((fabricDetail) => ({
    ...fabricDetail,
    buyer: tableData[0].buyer,
  }));
  
  const Columns: any = [

    {
      title: "S No",
      key: "sno",
      // width: '70px',
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      ...getColumnSearchProps("buyer"),
      render: (text, record) => {
        return <>{record.buyer ? record.buyer : "-"}</>;
      },
    },
    {
      title: <div style={{textAlign:"center"}}>M3 Fabric Code</div>,
      dataIndex: "m3FabricCode",
      ...getColumnSearchProps("m3FabricCode"),
      render: (m3FabricCode, row) => (
        <Tooltip title={row.description} placement="top" arrowPointAtCenter>
          <span>
            {`${m3FabricCode} - ${row.description.length > 25 ? row.description.slice(0, 25) + '...' : row.description}`}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      ...getColumnSearchProps("color"),
    },
    {
      title: "Season",
      dataIndex: "season",
    },
    {
      title: "Supplier",
      dataIndex: "supplierId",
      ...getColumnSearchProps("supplierId"),
      render: (text, record) => {
        return <>{record.supplierId ? record.supplierId : "-"}</>;
      },
    },
    {
      title: "GRN Date",
      dataIndex: "grnDate",
      render: (text, record) => {
        const date = new Date(record.grnDate);
        return <>{record.grnDate ? moment(date).format("YYYY-MM-DD") : "-"}</>;
      },
    },
    {
      title: "XL No",
      dataIndex: "xlNo",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <>
            {record.quantity
              ? `${record.quantity} ${record.quantityUnit}`
              : "-"}
          </>
        );
      },
    },
    // {
    //   title: "Available Quantity",
    //   dataIndex: "quantity",
    //   sorter: (a, b) => a.quantity.localeCompare(b.quantity),
    //   sortDirections: ["descend", "ascend"],
    //   // render: (text,record) => {
    //   //     return(
    //   //         <>
    //   //         {record.quantity ? `${record.availableQuantity} ${record.quantityUnit}` : '-'}
    //   //         </>
    //   //     )
    //   // }
    // },
    // {
    //   title: "To Be Procured",
    //   dataIndex: "tobeProcured",
    //   render: (text, record) => {
    //     return (
    //       <>
    //         {record.quantity - record.availableQuantity > 0
    //           ? record.quantity - record.availableQuantity
    //           : 0}
    //       </>
    //     );
    //   },
    // },
    {
      title: "Action",
    dataIndex: "action",
    render: (text, rowData) => {
    return (
    <span>
    {/* <Button onClick={() => generateBarcode(record.m3FabricCode)}>
    <BarcodeOutlined/>
    </Button>
    <Divider type='vertical'/> */}
    <Button
    type="primary"
    disabled={logInUser == "marketUser" ? true : false}
    onClick={() =>generatePoForFabric(rowData)}
    >
              Generate PO
    </Button>
    </span>
    );
    },
    },
  ];

  const columnsSkelton: any = [
    {
      title: "S No",
      key: "sno",
      width: "70px",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Trim Type",
      dataIndex: "materialType",
      ...getColumnSearchProps("materialType"),
    },
    {
      title: "M3 Trim Code",
      dataIndex: "m3TrimCode",
      ...getColumnSearchProps("m3TrimCode"),
    },
    {
      title: "To Be Procured Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <>
            {record.quantity
              ? `${record.quantity}`
              : "-"}
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
    dataIndex: "action",
    render: (text, rowData) => {
    return (
    <span>
    <Button
    type="primary"
    disabled={logInUser == "marketUser" ? true : false}
    onClick={() => genereatePoForTrim(rowData)}
    >
              Generate PO
    </Button>
    </span>
    );
    },
    },
  ];
  const genereatePoForTrim = (rowData: any) => {
    navigate("/purchase-order", { state: { data: rowData, type:'Indent'  } });
  };

  const onSegmentChange = (val) => {
    setTabName(val);
  };

  const HeaderRow = (props: any) => {
    const { requestNo, style, description, expectedDate, indentDate, status } =
      props;
    const formattedIndentDate = moment(indentDate).format("YYYY-MM-DD");
    const formattedExpectedDate = moment(expectedDate).format("YYYY-MM-DD");

    return (
      <div style={{ display: "flex" }}>
        <span>Request Number : {<b>{requestNo}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>Style : {<b>{style}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>Description : {<b>{description}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>
          Indent Date: <b>{formattedIndentDate}</b>
        </span>
        <span style={{ width: "10px" }}></span>
        <span>
          Expected Date: <b>{formattedExpectedDate}</b>
        </span>
        <span style={{ width: "10px" }}></span>
        <span>Status : {<b>{status}</b>}</span>
        {/* <span style={{width:'10px'}}></span>
              <span>{<Tag onClick={() => generateBarcode(requestNo)} style={{cursor:'pointer'}}>
                         <BarcodeOutlined />
                     </Tag>}</span> */}
      </div>
    );
  };

  const onReset = () => {
    sourcingForm.resetFields();
    setTableData(data);
  };

  const onSearch = () => {
    let filterData = [];
    if (sourcingForm.getFieldValue("style") !== undefined) {
      const style = sourcingForm.getFieldValue("style");
      filterData = data.filter((e) => e.style === style);
    } else if (sourcingForm.getFieldValue("requestNo") !== undefined) {
      const reqno = sourcingForm.getFieldValue("requestNo");
      filterData = data.filter((e) => e.requestNo === reqno);
    } else if (sourcingForm.getFieldValue("status") !== undefined) {
      const status = sourcingForm.getFieldValue("status");
      filterData = data.filter((e) => e.status === status);
    }
    setTableData(filterData);
  };

  const onBarcodeModalCancel = () => {
    setBarcode("");
    setBarcodeModal(false);
  };

  const closeWindow = () => {
    setBarcode("");
    window.close();
  };

  return (
    <Card
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      title="Indent Requisition"
      extra={
        <span>
          <Button onClick={() => navigate("/indent-form")}>New</Button>
        </span>
      }
    >
      {/* {barcode.length > 0 ? <BarcodePrint key={Date.now() + barcode} printBarcodes={closeWindow} closeBarcodePopUp={closeWindow}
          columns={barcodeWithColumns} newWindow={false} barcodeInfo={barcode} /> : ''} */}
      <Form form={sourcingForm}>
        <Row gutter={8}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 6 }}
          >
            <Form.Item name="requestNo" label="Request Number">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Request Number"
              >
                {data.map((e) => {
                  return (
                    <Option
                      key={e.requestNo}
                      value={e.requestNo}
                      name={e.requestNo}
                    >
                      {" "}
                      {e.requestNo}
                    </Option>
                  );
                })}
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
            <Form.Item name="style" label="Style">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Style"
              >
                {data.map((e) => {
                  return (
                    <Option key={e.style} value={e.style} name={e.style}>
                      {" "}
                      {e.style}
                    </Option>
                  );
                })}
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
            <Form.Item name="status" label="Status">
              <Select
                // showSearch
                // placeholder="Vendors"
                optionFilterProp="children"
                placeholder="Select Status"
              >
                {Object.keys(CustomerOrderStatusEnum)
                  .sort()
                  .map((status) => (
                    <Select.Option
                      key={CustomerOrderStatusEnum[status]}
                      value={CustomerOrderStatusEnum[status]}
                    >
                      {CustomerOrderStatusEnum[status]}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                onClick={onSearch}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button danger icon={<UndoOutlined />} onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Collapse
        collapsible="icon"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        accordion
      >
        {tableData.map((item: any, index: any) => (
          <Collapse.Panel
            header={
              <HeaderRow
                requestNo={item.requestNo}
                style={item.style}
                description={item.description}
                expectedDate={item.expectedDate}
                indentDate={item.indentDate}
                status={item.status}
              />
            }
            key={index}
            extra={
              <Tag
                onClick={() => generateBarcode(item.requestNo, "requestNo")}
                style={{ cursor: "pointer" }}
              >
                <BarcodeOutlined />
              </Tag>
            }
          >
            <Space
              direction="vertical"
              style={{ fontSize: "16px", width: "100%" }}
            >
              <Segmented
                onChange={onSegmentChange}
                style={{ backgroundColor: "#68cc6b" }}
                options={[
                  {
                    label: (
                      <>
                        <b style={{ fontSize: "12px" }}>Fabric Details</b>
                      </>
                    ),
                    value: "Fabric",
                  },
                  {
                    label: (
                      <>
                        <b style={{ fontSize: "12px" }}>Trim Details</b>
                      </>
                    ),
                    value: "Trim",
                  },
                ]}
              />
              <div>
                {tabName === "Fabric" ? (
                  <>
                    <Table
                      columns={Columns}
                      dataSource={item.indentFabricDetails}
                      pagination={false}
                      scroll={{ x: "max-content" }}
                      className="custom-table-wrapper"
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {tabName === "Trim" ? (
                  <>
                    <Table
                      columns={columnsSkelton}
                      dataSource={item.indentTrimDetails}
                      pagination={false}
                      scroll={{ x: "max-content" }}
                      className="custom-table-wrapper"
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Space>
          </Collapse.Panel>
        ))}
      </Collapse>
      <Modal
        open={barcodeModal}
        onCancel={onBarcodeModalCancel}
        footer={[]}
        title={barcodeInfo === "m3ItemCode" ? "M3 Item Code" : "Request Number"}
      >
        <div style={{ textAlign: "center" }}>
          <Barcode value={barcode} height={30} />
        </div>
      </Modal>
    </Card>
  );
};

export default SourcingRequisitionDynamicView;
