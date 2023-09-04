import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { VendorService } from "@project-management-system/shared-services";
import {
  ColumnsType,
  SortOrder,
} from "antd/es/table/interface";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();
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

        const distinctNames = [...new Set(vendors.map((vendor) => vendor.name))];
        const distinctLocations = [...new Set(vendors.map((vendor) => vendor.location))];

        setNameOptions(distinctNames);
        setLocationOptions(distinctLocations);

        message.success(response.internalMessage);
      } else {
        message.error(response.internalMessage);
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      message.error("An error occurred while fetching vendor data: " + error.message);
    }
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const filtered = data.filter(
        (vendor) =>
          (selectedName === "" || vendor.name === values.name) &&
          (selectedLocation === "" || vendor.location === values.location)
      );

      setFilteredData(filtered);

      if (filtered.length === 0) {
        message.error("No matching data found.");
      } else {
        message.success("Data is found");
      }
    });
  };
  const handleReset = () => {
    form.resetFields();
    setSelectedName("");
    setSelectedLocation("");
    setFilteredData(data);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'S.No',
      key: 'sno',
      render: (text, record, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: 'ascend' as SortOrder,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      defaultSortOrder: 'ascend' as SortOrder,
      sorter: (a, b) => a.businessName.localeCompare(b.businessName),
    },
    {
      title: "Business Contact Person",
      dataIndex: "businessContactPerson",
      defaultSortOrder: 'ascend' as SortOrder,
      sorter: (a, b) =>
        a.businessContactPerson.localeCompare(b.businessContactPerson),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      defaultSortOrder: 'ascend' as SortOrder,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Branches Count',
      dataIndex: 'branchesCount',
      align: 'right',
      defaultSortOrder: 'descend' as SortOrder,
      sorter: (a, b) => a.branchesCount - b.branchesCount,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      render: (text, rowData) => (
        <EyeOutlined onClick={() => viewchange(rowData)}style={{color:'blue',fontSize:20}} size={30}/>
      ),
    },
  ];

  const viewchange = (rowData:any) => {
    navigate(`/VendorBranchInfoGrid`,{state :{rowData}}) ;
   // console.log(rowData,"8888888888888888888")
  };

  return (
    <Card className="card-header" title="Vendors" size="small">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 5 }}
            >
              <Form.Item name="name" label="Name :">
                <Select
                  showSearch
                  placeholder="Search by Name"
                  value={selectedName}
                  onChange={(value) => setSelectedName(value)}
                  options={nameOptions.map((name) => ({ value: name, label: name }))}
                />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 5 }}
            >
              <Form.Item name="location" label="Location :">
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
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 5 }}
            >
              <Button
                htmlType="submit"
                style={{ color: "white", background: "forestgreen" }}
                icon={<SearchOutlined />}
              >
                Search
              </Button>

              <Button
                style={{ margin: '0 14px' }}
                danger
                icon={<UndoOutlined />}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            className="custom-table-wrapper"
            dataSource={filteredData}
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
        </div>
      </Space>
    </Card>
  );
};

export default VendorGrid;



