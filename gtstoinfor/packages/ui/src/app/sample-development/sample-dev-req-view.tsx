import React, { useEffect, useRef, useState } from "react";
import {
  Divider,
  Table,
  Popconfirm,
  Card,
  Tooltip,
  Switch,
  Input,
  Button,
  Tag,
  Row,
  Col,
  Drawer,
  Form,
  message,
  Select,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightSquareOutlined,
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
  UndoOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";
import form from "antd/es/form";
import { SampleFilterRequest } from "@project-management-system/shared-models";


export const SampleDevView = () => {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const service = new SampleDevelopmentService();
  let navigate = useNavigate();
  const [reqNo, setReqNo] = useState<any>([]);
  const [form] = Form.useForm();


  useEffect(() => {
    getAllSampleDevData();
    getAllSampleReqNo()
  }, []);

  const getAllSampleDevData = () => {
    const req = new SampleFilterRequest()
    if (form.getFieldValue('reqNo') !== undefined) {
      req.reqNo = form.getFieldValue('reqNo')
    }
    service.getAllSampleDevData(req).then((res) => {
      if (res.data) {
        setSampleData(res.data);
        setFilterData(res.data)
      }
    });
  };

  const getAllSampleReqNo = () => {
    service.getAllSampleReqNo().then((res) => {
      if (res.data) {
        setReqNo(res.data)
      }
    });
  };

  const onFinish = () => {
    getAllSampleDevData();
  };

  const onReset = () => {
    form.resetFields();
    getAllSampleDevData();
  };


  const DetailView = (rowData,cancel) => {
    const navigateData = filterData.filter(req => req.SampleRequestId === rowData)
    return navigate(`/sample-development/sample-development-detail`, { state: { data: navigateData,cancelVisible : cancel } });
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

  /**
   *
   * @param selectedKeys
   * @param confirm
   * @param dataIndex
   */
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  };


  const columnsSkelton: any = [
    {
      title: "S No",
      key: "sno",
      width: "70px",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("requestNo"),
    },    {
      title: "Location",
      dataIndex: "locationName",
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("location"),
    },
    {
      title: "PCH",
      dataIndex: "profitControlHead",
      sorter: (a, b) => a.pch.localeCompare(b.pch),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("pch"),
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("type"),
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("buyer"),
    },
    {
      title: "Style No",
      dataIndex: "m3StyleNo",
      sorter: (a, b) => a.styleNo.localeCompare(b.styleNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("styleNo"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: `Action`,
      dataIndex: "action",
      align:"center",
      render: (text, rowData, index) => (
        <span>
          <Tooltip placement="top" title="Detail View">
            <EyeOutlined
              onClick={() => {
                setHideCancelButton(false);
                DetailView(rowData.SampleRequestId,false);
              }}
              style={{ color: "blue", fontSize: 20 }}
            />
          </Tooltip>
          <Divider type="vertical"/>
          {rowData.status !== 'CANCELLED' ? (
          <Tooltip placement="top" title="Cancel Sample Request">
            <CloseOutlined 
              style={{ color: 'red', fontSize: 20 }}
              onClick={() => {
                setHideCancelButton(true);
                DetailView(rowData.SampleRequestId,true);
              }}
            />
          </Tooltip>
    ): null}
        </span>
      ),
    },
  ];

  /**
   *
   * @param pagination
   * @param filters
   * @param sorter
   * @param extra
   */
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Card
      title={<span>Sample Development</span>}
      // style={{ textAlign: "center" }}
      // headStyle={{ border: 0 }}
      size='small'
        extra={
          <Link to="/sample-development/sample-development-form">
            <span style={{ color: "white" }}>
              <Button type={"primary"}>New </Button>{" "}
            </span>
          </Link>
        }
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="reqNo" label="Request No">
              <Select
                showSearch
                placeholder="Select Request No"
                optionFilterProp="children"
                allowClear
              >
                {reqNo.map((qc: any) => (
                  <Select.Option key={qc.requestNo} value={qc.requestNo}>
                    {qc.requestNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <br></br>
      <Table
        size="small"
        rowKey={(record) => record.buyingHouseId}
        columns={columnsSkelton}
        dataSource={sampleData}
        scroll={{ x: true }}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        onChange={onChange}
        bordered
      />
      <Drawer
        bodyStyle={{ paddingBottom: 80 }}
        title="Update"
        width={window.innerWidth > 768 ? "50%" : "85%"}
        onClose={closeDrawer}
        visible={drawerVisible}
        closable={true}
      >
        {/* <BuyingHouseForm
          key={Date.now()}
          updateBuyingHouse={updateBuyingHouse}
          isUpdate={true}
          data={selectedBuyingHouse}
          closeForm={closeDrawer}
        /> */}
      </Drawer>
    </Card>
  );
};

export default SampleDevView;
