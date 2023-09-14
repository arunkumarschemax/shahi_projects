import React, { useEffect, useRef, useState } from "react";
import {Divider,Table,Popconfirm,Card,Tooltip,Switch,Input,Button,Tag,Row,Col,Drawer,Form,message,Select,} from "antd";
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined,UndoOutlined,CloseOutlined, ExportOutlined,} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";
import form from "antd/es/form";
import { SampleFilterRequest } from "@project-management-system/shared-models";

export interface BuyingHouseProps {}

export const SampleRequests = (props: BuyingHouseProps) => {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [buyingHouseData, setBuyingHouseData] = useState<any[]>([]);
  const [selectedBuyingHouse, setSelectedBuyingHouse] =
    useState<any>(undefined);
  const Service = new SampleDevelopmentService();
  let navigate = useNavigate();
  const [reqNo, setReqNo] = useState<any>([]);
  const [form] = Form.useForm();


  useEffect(() => {
    getAllSampleDevelopment();
    // getReqNo();
  }, []);

  const getAllSampleDevelopment = () => {
    const req = new SampleFilterRequest()
    if (form.getFieldValue('reqNo') !== undefined) {
      req.reqNo = form.getFieldValue('reqNo')
    }
    Service.getAllSampleDevelopment().then((res) => {
      if (res) {
        console.table(res)
        setBuyingHouseData(res);
      }
    });
  };

  const onFinish = () => {
    getAllSampleDevelopment();
  };

  const onReset = () => {
    form.resetFields();
    getAllSampleDevelopment();
  };

  const DetailView = (val: any) => {
    return navigate(`/sample-development/store-issue-detail`);
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

  //TO open the form for updation
  const openFormWithData = (viewData: any) => {
    setDrawerVisible(true);
    setSelectedBuyingHouse(viewData);
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
      // responsive: ['lg'],
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("requestNo"),
    },
    {
      title: "Style No",
      dataIndex: "styleNo",
      // responsive: ['lg'],
      sorter: (a, b) => a.styleNo.localeCompare(b.styleNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("styleNo"),
    },
    {
      title: "Date",
      dataIndex: "date",
      // responsive: ['lg'],
      sorter: (a, b) => a.date.localeCompare(b.date),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("date"),
    },
    {
      title: "Location",
      dataIndex: "location",
      // responsive: ['lg'],
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("location"),
    },
    {
      title: "PCH",
      dataIndex: "pch",
      // responsive: ['lg'],
      sorter: (a, b) => a.pch.localeCompare(b.pch),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("pch"),
    },
    {
      title: "Type",
      dataIndex: "type",
      // responsive: ['lg'],
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("type"),
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      // responsive: ['lg'],
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("buyer"),
    },
    {
      title: `Action`,
      dataIndex: "action",
      render: (text, rowData, index) => (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          {" "}
          {/* <Tooltip placement="top" title="Source Issue">
            <ExportOutlined
              onClick={() => DetailView(rowData.id)}
              style={{ color: "blue", fontSize: 20 }}
              size={30}
            />
          </Tooltip> */}
          <Button onClick={() => DetailView(rowData.id)} type='primary'>Issue Material</Button>
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
      title={<span>Sample Requests</span>}
      style={{ textAlign: "center" }}
      // headStyle={{ border: 0 }}
      className="card-header"
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
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Form.Item name="reqNo" label="Request No">
              <Select
                showSearch
                placeholder="Select Request No"
                optionFilterProp="children"
                allowClear
              >
                {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item name="pch" label="PCH">
              <Select
                showSearch
                placeholder="Select PCH"
                optionFilterProp="children"
                allowClear
              >
                {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item name="user" label="User">
              <Select
                showSearch
                placeholder="Select User"
                optionFilterProp="children"
                allowClear
              >
                {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item name="status" label="Status">
              <Select
                showSearch
                placeholder="Select Status"
                optionFilterProp="children"
                allowClear
              >
                {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
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
        dataSource={buyingHouseData}
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

export default SampleRequests;
