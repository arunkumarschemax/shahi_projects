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
    SampleDevelopmentService,
    StyleService,
  } from "@project-management-system/shared-services";
  import {
    Button,
    Card,
    Checkbox,
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
  } from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import Barcode from "react-barcode";
//   import BarcodePrint from "./barcode-print";
  import {
    CustomerOrderStatusEnum,
    IndentRequestFilter,
  } from "@project-management-system/shared-models";
  import Highlighter from "react-highlight-words";
  
  const { Option } = Select;
  
  export const SampleDevNewView = () => {
    const [tabName, setTabName] = useState<string>("Fabric");
    const [page, setPage] = React.useState(1);
    const [sourcingForm] = Form.useForm();
    const styleService = new StyleService();
    const [style, setStyle] = useState<any[]>([]);
    const navigate = useNavigate();
    // const service = new RequisitionService()
    const service = new SampleDevelopmentService();
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
   const [btnEnable,setbtnEnable]=useState<boolean>(false)
   const [expandedRowKeys, setExpandedRowKeys] = useState([])
    const searchInput = useRef(null);
  
    useEffect(() => {
      getAll();
    }, []);
  
    useEffect(() => {
      if (data) {
      console.log(tableData)
        setTableData(data);
      }
    }, [data]);
  
  
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
      service.getAllSampleDevData().then((res) => {
        if (res.status) {
          setData(res.data);
          setFilterData(res.data);
        }
      });
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
  
    const Columns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "M3 Fabric Code",
        dataIndex: "item_code",
        ...getColumnSearchProps("item_code"),
      },
      {
        title: "Color",
        dataIndex: "colour",
        ...getColumnSearchProps("colour"),
      },
      {
        title: "Required Quantity",
        dataIndex: "fabric_consumption",
        sorter: (a, b) => a.fabric_consumption.localeCompare(b.fabric_consumption),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Available Quantity",
        dataIndex: "availabeQuantity",
        sorter: (a, b) => a.availabeQuantity.localeCompare(b.availabeQuantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
            return (
              <>
                {record.availabeQuantity ? record.availabeQuantity : "Not Available"
                  }
              </>
            );
          },
      },
      {
        title: "To Be Procured",
        dataIndex: "tobeProcured",
        render: (text, record) => {
          return (
            <>
              {record.quantity - record.availableQuantity > 0
                ? record.quantity - record.availableQuantity
                : 0}
            </>
          );
        },
      },
      // {
      //   title: "Action",
      // dataIndex: "action",
      // render: (text, rowData) => {
      // return (
      // <span>
      // <Button
      // type="primary"
      // disabled={rowData.availabeQuantity == null ? true : false}
      // onClick={() =>MarketIssueDetailView(rowData.sample_request_id)}
      // >
      //           Issue Material
      // </Button>
      // </span>
      // );
      // },
      // },
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
        title: "M3 Trim Code",
        dataIndex: "trim_code",
        ...getColumnSearchProps("trim_code"),
      },
      {
        title: "Trim Type",
        dataIndex: "trimType",
        ...getColumnSearchProps("trimType"),
      },
      {
        title: "Required Quantity",
        dataIndex: "trim_consumption",
        sorter: (a, b) => a.trim_consumption.localeCompare(b.trim_consumption),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Available Quantity",
        dataIndex: "availabeQuantity",
        sorter: (a, b) => a.availabeQuantity.localeCompare(b.availabeQuantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
            return (
              <>
                {record.availabeQuantity ? record.availabeQuantity : "Not Available"
                  }
              </>
            );
          },
      },
      // {
      //   title: "Action",
      // dataIndex: "action",
      // render: (text, rowData) => {
      // return (
      // <span>
      //    <Button onClick={() => MarketIssueDetailView(rowData.sample_request_id)} type='primary' 
      //      disabled={rowData.availabeQuantity == null ? true : false}
      //     >Issue Material</Button>
      // </span>
      // );
      // },
      // },
    ];

    const renderColumnForFabric: any =[
      {
        title: "S No",
        key: "sno",
        width: "100px",
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "Grn Number",
        key:'grnNo',
        dataIndex: "grnNo",
        width: "150px",

      },
      {
        title: "Location",
        key:'location',
        dataIndex: "location",
        width:'80px',
      },
    
      {
        title: "Availble Quantity",
        width: "150px",
        dataIndex: "availableQuantity",
      },
      {
        title: "Allocated Quantity",
        width:'200px',
        render:(value,record) =>{
          return(
            <Input>
            </Input>
          )
        }
      },
      {
        title: <div style={{ textAlign: "center" }}>{btnEnable ?<Button  type="primary" 
        // onClick={() =>generatePo()} 
        >Allocate</Button>:'Allocate'}</div>,
        dataIndex: "sm",
        key: "sm",
        align: "center",
        render: (sm) => {
          return (
            <Checkbox onClick={onCheck}/>
          );
        },
      },
     
    ]
    const onCheck = () =>{
      setbtnEnable(true)
    }
    const onSegmentChange = (val) => {
      setTabName(val);
    };
  
    const HeaderRow = (props: any) => {
      const { requestNo, style, buyerName, expectedDate, indentDate, status, lifeCycleStatus, location, brandName,pch } =
        props;
      const formattedIndentDate = moment(indentDate).format("YYYY-MM-DD");
      const formattedExpectedDate = moment(expectedDate).format("YYYY-MM-DD");
  
      return (
        <div style={{ display: "flex" }}>
          <span>Request Number : {<b>{requestNo}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Style : {<b>{style}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Brand : {<b>{brandName}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>PCH : {<b>{pch}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Buyer : {<b>{buyerName}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Location : {<b>{location}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span style={{ width: "10px" }}></span>
          <span style={{ width: "10px" }}></span>
          <span>Status : {<b>{status}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Life Cycle Status : {<b>{lifeCycleStatus}</b>}</span>
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
  
    const onBarcodeModalCancel = () => {
      setBarcode("");
      setBarcodeModal(false);
    };
  
    const MarketIssueDetailView = (rowData,cancel?) => {
        const navigateData = filterData.filter(req => req.sample_request_id === rowData)
        console.log("MarketIssueDetailView",rowData)
        return navigate(`/sample-development/store-issue-detail`, { state: { data: navigateData, cancelVisible : cancel } });
        // return navigate(`/sample-development/store-issue-detail`, { state: { data: [rowData], cancelVisible : cancel } });
    
      };

      const materailDta =[
        
          {  sample_request_id: '1',
            location:'A1L1',
            availableQuantity:'100',
            grnNo:'GRN-23-24-001'
          },
          {
            sample_request_id:'2',
            location:'A2L2',
            availableQuantity:'100',
            grnNo:'GRN-23-24-002'

          },
          {
            sample_request_id:'2',
            location:'A2L2',
            availableQuantity:'100',
            grnNo:'GRN-23-24-003'

          }
      ]


      const renderItems = (record:any) => {
        return  <Table
         dataSource={materailDta}
          columns={renderColumnForFabric} 
          pagination={false}
           rowKey={record.sample_request_id}/>;
      };
      const onExpand = (expanded, record) => {
        const keys = expanded ? [record.key] : [];
        setExpandedRowKeys(keys);
      };
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="Sample Requests"
        extra={
          <Link to="/sample-development/sample-development-form">
            <span style={{ color: "white" }}>
              <Button type={"primary"}>New </Button>{" "}
            </span>
          </Link>
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
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="pch" label="PCH">
              <Select
                showSearch
                placeholder="Select PCH"
                optionFilterProp="children"
                allowClear
              >
                {/* {pch.map((qc: any) => (
                  <Select.Option key={qc.pch} value={qc.pch}>
                    {qc.pch}
                  </Select.Option>
                ))} */}
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
                  // onClick={onSearch}
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
                  buyerName={item.buyerName}
                  lifeCycleStatus={item.lifeCycleStatus}
                  location={item.location}
                  brandName={item.brandName}
                  pch={item.pch}
                //   expectedDate={item.expectedDate}
                //   indentDate={item.indentDate}
                  status={item.status}
                />
              }
              key={index}
            //   extra={
            //     <Tag
            //       onClick={() => generateBarcode(item.requestNo, "requestNo")}
            //       style={{ cursor: "pointer" }}
            //     >
            //       <BarcodeOutlined />
            //     </Tag>
            //   }
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
                        dataSource={item.fabric}
                        rowKey={record =>record.sample_request_id}
                        pagination={false}
                        expandedRowRender={renderItems}
                        expandIconColumnIndex={6}
                        scroll={{ x: "max-content" }}
                        className="custom-table-wrapper"
                        // expandedRowKeys={expandedRowKeys}
                       onExpand={onExpand}

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
                        dataSource={item.trimData}
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
  
  export default SampleDevNewView;
  