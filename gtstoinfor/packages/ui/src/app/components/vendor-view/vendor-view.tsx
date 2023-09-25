import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  message,
  Select,
  Form,
  Col,
  Row,
  Tooltip,
} from "antd";
import { EyeOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { VendorService } from "@xpparel/shared-services";
import { ColumnType, ColumnsType, SortOrder } from "antd/es/table/interface";
import { useNavigate, useParams } from "react-router-dom";
import Highlighter from "react-highlight-words";

const VendorGrid = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const vendorService = new VendorService();
      const response = await vendorService.getAllVendors();

      if (response.status) {
        const vendors = response.data;

        setData(vendors);
        setFilteredData(vendors);

        const distinctNames = [
          ...new Set(vendors.map((vendor) => vendor.name)),
        ];
        const distinctLocations = [
          ...new Set(vendors.map((vendor) => vendor.location)),
        ];

        setNameOptions(distinctNames);
        setLocationOptions(distinctLocations);

        message.success("Vendors Data Retrieved Sucessfully");
      } else {
        message.error(response.internalMessage);
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      message.error(
        "An error occurred while fetching vendor data: " + error.message
      );
    }
  };

  const handleSearch1 = () => {
    form.validateFields().then((values) => {
      const filtered = data.filter(
        (vendor) =>
          (selectedName === "" || vendor.name === values.name) &&
          (selectedLocation === "" || vendor.location === values.location)
      );

      setFilteredData(filtered);

      if (filtered.length === 0) {
        message.error("No data found.");
      } else {
        message.success("Data Retrieved Sucessfully");
      }
    });
  };
  const handleReset1 = () => {
    form.resetFields();
    fetchVendorData();
    setSelectedName("");
    setSelectedLocation("");
    setFilteredData(data);
  };

  const handleSearch = (
    selectedKeys: any[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              setSearchedColumn(dataIndex);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      render: (text, record, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a, b) => a.businessName.localeCompare(b.businessName),
      ...getColumnSearchProps("businessName"),
    },
    {
      title: "Business Contact Person",
      dataIndex: "businessContactPerson",
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a, b) =>
        a.businessContactPerson.localeCompare(b.businessContactPerson),
      ...getColumnSearchProps("businessContactPerson"),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
      ...getColumnSearchProps("contact"),
    },
    {
      title: "Location",
      dataIndex: "location",
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },

    {
      title: "Branch Count",
      dataIndex: "branchesCount",
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (text, rowData) => (
        <Tooltip title="View">
          <EyeOutlined
            onClick={() => viewchange(rowData)}
            style={{ color: "blue", fontSize: 20 }}
            size={30}
          />
        </Tooltip>
      ),
    },
  ];

  const viewchange = (rowData: any) => {
    navigate(`/VendorBranchInfoGrid`, { state: { rowData } });
    console.log(rowData,"8888888888888888888")
  };

  return (
    <Card className="card-header" title="Vendors" size="small">
      {/* <Space direction="vertical" style={{ width: "100%" }}> */}
      <Form form={form} onFinish={handleSearch1}>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 5 }}
          >
            <Form.Item name="name" label="Name">
              <Select
                showSearch
                placeholder="Search by Name"
                value={selectedName}
                onChange={(value) => setSelectedName(value)}
                options={nameOptions.map((name) => ({
                  value: name,
                  label: name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 5 }}
          >
            <Form.Item name="location" label="Location">
              <Select
                showSearch
                placeholder="Search by Location"
                value={selectedLocation}
                onChange={(value) => setSelectedLocation(value)}
                options={locationOptions.map((location) => ({
                  value: location,
                  label: location,
                }))}
              />
            </Form.Item>
          </Col>
          <Row justify="end">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="ant-submit-btn"
                style={{ position: "relative", float: "left", marginLeft: 10 }}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
              <Button
                type="default"
                danger
                icon={<UndoOutlined />}
                onClick={handleReset1}
                style={{ position: "relative", float: "left", marginLeft: 10 }}
              >
                Reset
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Form>
      <br></br>
      <Table
        columns={columns}
        className="custom-table-wrapper"
        dataSource={filteredData}
        size="small"
        pagination={{
          onChange(current, pageSize) {
            setPage(current);
            setPageSize(pageSize);
          },
          current: page,
          pageSize: pageSize,
          total: filteredData.length,
        }}
      />
    </Card>
  );
};

export default VendorGrid;
