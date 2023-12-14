import {
  EyeOutlined,
  SearchOutlined,
  UndoOutlined
} from "@ant-design/icons";
import { VendorFilterModel } from "@xpparel/shared-models";
import {
  SharedService,
  VendorService,
} from "@xpparel/shared-services";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link, useNavigate } from "react-router-dom";

interface Item {
  gstNumber: string;
  venName: string;
  venCod: string;
  invoiceDate: string;
  cgst: string;
  igst: string;
  sgst: string;
  invoiceNumber: string;
  invoiceAmount: string;
  invoiceCurrency: string;
  financialYear: string;
}

// export interface DocViewProps { }

export const DocView = () => {
  const [formdata, setFormData] = useState<any>([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const [VendorData, setVendorData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const services = new SharedService();
  const servicess = new VendorService();

  useEffect(() => {
    getVendorsName();
    getdata();
  }, []);

  const getVendorsName = () => {
    servicess
      .getAllVendors()
      .then((res) => {
        if (res.status) {
          setVendorData(res.data);
          console.log(res.data, "filters");
        } else {
          setVendorData([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getdata = () => {
    const req = new VendorFilterModel();
    if (form.getFieldValue("vendorName") !== undefined) {
      req.vendorName = form.getFieldValue("vendorName");
    }
    console.log(req, "reqqqqqqqqqqqq");
    services.getdata(req).then((res) => {
      if (res.status) {
        setFormData(res.data);
        message.success("Data Retrieved Successfully");
      } else {
        setFormData([]);
        message.error("NO DATA FOUND");
      }
    }).catch((err) => {
      console.log(err.message);
    });
  };
  console.log(formdata, "formdata")
  const resetHandler = () => {
    form.resetFields();
    getdata();
  };
  const handleAddClick = () => {
    navigate("/doc-extract-form");
  };

  const handleDownload = (imageFileName: string) => {
    const link = document.createElement("a");
    link.href = `${imageFileName}`;
    link.download = imageFileName;
    link.click();
  };

  const viewchange = (rowData: any) => {
    navigate("/scandetailview", { state: { rowData } });
  };

  const handleViewClick = (record: Item) => {
    viewchange(record);
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

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
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
  

  // useEffect(() => {
  //   const sharedService = new SharedService();

  //   const automatic = async () => {
  //     try {
  //       const response = await sharedService.automatic();
  //       console.log(response); 
  //     } catch (error) {
  //       console.error('Error opening headless browser:', error);
  //     }
  //   };
  //   automatic(); 
  // }, []);

    // useEffect(() => {
    //   const newWindow = window.open('http://localhost:4200/');
    //   if (newWindow) {
    //     newWindow.opener = null;
    //   }
    // }, [2000]);
  
  const columns: any = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },

    {
      title: "Vendor Name",
      dataIndex: "venName",
      key: "venName",
      // ...getColumnSearchProps("Vendor"),
      align: "left",
      sorter: (a, b) => a.venName.localeCompare(b.venName),
      render: (text: any, record: { venName: any }) => {
        return <> {record.venName ? record.venName : "-"} </>;
      },
    },
    {
      title: "GST NUMBER",
      dataIndex: "gstNumber",
      key: "gstNumber",
      ...getColumnSearchProps("gstNumber"),
      align: "center",
      sorter: (a, b) => a.gstNumber.localeCompare(b.gstNumber),
      render: (text: any, record: { gstNumber: any }) => {
        return <> {record.gstNumber ? record.gstNumber : "-"} </>;
      },
    },

    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      ...getColumnSearchProps("invoiceNumber"),
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
      align: "center",
      render: (text: any, record: { invoiceNumber: any }) => {
        return <> {record.invoiceNumber ? record.invoiceNumber : "-"} </>;
      },
    },
    {
      title: "Invoice Amount",
      dataIndex: "invoiceAmount",
      key: "invoiceAmount",
      ...getColumnSearchProps("invoiceAmount"),
      sorter: (a, b) => a.invoiceAmount.localeCompare(b.invoiceAmount),
      align: "right",
      render: (text, record) => {
        const invoiceAmountWithoutCommas = record.invoiceAmount ? record.invoiceAmount.replace(/,/g, '') : "-";
        const formattedAmount = parseFloat(invoiceAmountWithoutCommas).toFixed(2);
        return <>{formattedAmount}</>;
      },
    },

    {
      title: "Invoice Currency",
      dataIndex: "invoiceCurrency",
      key: "invoiceCurrency",
      ...getColumnSearchProps("invoiceCurrency"),
      sorter: (a, b) => a.invoiceCurrency.localeCompare(b.invoiceCurrency),
      align: "center",
      render: (text: any, record: { invoiceCurrency: any }) => {
        return <> {record.invoiceCurrency ? record.invoiceCurrency : "-"} </>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.localeCompare(b.status),
      align: "center",
      render: (text: any, record: { status: any }) => {
        let statusColor = "black";

        if (record.status === "No Variance") {
          statusColor = "green";
        } else if (record.status === "Fully Variance") {
          statusColor = "red";
        }
        else if (record.status === "Partially Variance") {
          statusColor = "blue"
        }
        return (
          <Tag style={{ color: statusColor }}>
            {record.status ? record.status : "-"}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span style={{ position: "relative", left: "20px" }}>
          <Tooltip title="Details View">
            <EyeOutlined
              style={{
                fontSize: "15px",
                color: "blue",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleViewClick(record)}
            />
          </Tooltip>
        </span>
      ),
    },
  ];
  

  return (
    <Card
      title="Documents Info"
      size="small"
      extra={
        <Link to="/doc-extract-form">
          <Button
           className="panel_button">Upload Document </Button>
        </Link>
      }

    >
      <Row>  <Col ><Card title={'Fully Variance : ' + formdata.filter(el => el.status === "Fully Variance").length} style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'red', borderRadius: 3 }} size="small" bodyStyle={{ display: 'none' }}></Card>
      </Col>

        <Col >
          <Card title={'Partial Variance : ' + formdata.filter(el => el.status === "Partially Variance").length} style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'orange', borderRadius: 3 }} size="small" bodyStyle={{ display: 'none' }}></Card>
        </Col>

        <Col >
          <Card title={'No Variance : ' + formdata.filter(el => el.status === "No Variance").length} style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'lightgreen', borderRadius: 3 }} size="small" bodyStyle={{ display: 'none' }}></Card>
        </Col>
      </Row>
      <br></br>
      <Form form={form} onFinish={getdata}>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 10 }}
            lg={{ span: 10 }}
            xl={{ span: 5 }}
          >
            <Form.Item name="vendorName" label="Vendor Name">
              <Select
                showSearch
                placeholder="Select Vendor Name"
                optionFilterProp="children"
                allowClear
              >
                {VendorData.sort((a, b) => a.businessName.localeCompare(b.businessName)).map((option) => (
                  <Select.Option key={option.businessName} value={option.businessName}>
                    {option.businessName}
                  </Select.Option>
                ))}
              </Select>
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
                onClick={resetHandler}
                style={{ position: "relative", float: "left", marginLeft: 10 }}
              >
                Reset
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Form>
      <Table size="small" dataSource={formdata} columns={columns} pagination={false} className="custom-table"/>
    </Card>
  );
}

export default DocView;
