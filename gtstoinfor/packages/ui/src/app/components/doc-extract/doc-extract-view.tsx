import {
  EyeOutlined,
  SearchOutlined,
  UndoOutlined
} from "@ant-design/icons";
import { StatusEnumDisplay, VendorFilterModel } from "@xpparel/shared-models";
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
  GST: string;
  Vendor: string;
  invoiceDate: string;
  Cgst: string;
  IGST: string;
  Sgst: string;
  InnvoiceNumber: string;
  InnvoiceAmount: string;
  InnvoiceCurrency: string;
}

// export interface DocViewProps { }

export function DocView() {
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
  console.log(formdata,"formdata")
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
    console.log(rowData, "Hhhhhhhhhhhhhhh");
  };

  const handleViewClick = (record: Item) => {
    viewchange(record); // Call your viewchange function with the record data
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

  const columns: any = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },

    {
      title: "Vendor Name",
      dataIndex: "Vendor",
      key: "Vendor",
      // ...getColumnSearchProps("Vendor"),
      align: "center",
      sorter: (a, b) => a.Vendor.localeCompare(b.Vendor),
      render: (text: any, record: { Vendor: any }) => {
        return <> {record.Vendor ? record.Vendor : "-"} </>;
      },
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      key: "buyerName",
      ...getColumnSearchProps("buyerName"),
      align: "center",
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      render: (text: any, record: { buyerName: any }) => {
        return <> {record.buyerName ? record.buyerName : "-"} </>;
      },
    },
    {
      title: "GST",
      dataIndex: "GST",
      key: "GST",
      ...getColumnSearchProps("GST"),
      align: "center",
      sorter: (a, b) => a.GST.localeCompare(b.GST),
      render: (text: any, record: { GST: any }) => {
        return <> {record.GST ? record.GST : "-"} </>;
      },
    },

    {
      title: "Invoice Number",
      dataIndex: "InnvoiceNumber",
      key: "InnvoiceNumber",
      ...getColumnSearchProps("InnvoiceNumber"),
      sorter: (a, b) => a.InnvoiceNumber.localeCompare(b.InnvoiceNumber),
      align: "center",
      render: (text: any, record: { InnvoiceNumber: any }) => {
        return <> {record.InnvoiceNumber ? record.InnvoiceNumber : "-"} </>;
      },
    },
    {
      title: "Invoice Amount",
      dataIndex: "InnvoiceAmount",
      key: "InnvoiceAmount",
      ...getColumnSearchProps("InnvoiceAmount"),
      sorter: (a, b) => a.InnvoiceAmount.localeCompare(b.InnvoiceAmount),
      align: "center",
      render: (text, record) => {
        const formattedAmount = record.InnvoiceAmount ? parseFloat(record.InnvoiceAmount).toFixed(2) : "-";
        return <>{formattedAmount}</>;
      },
    },
    {
      title: "Invoice Currency",
      dataIndex: "InnvoiceCurrency",
      key: "InnvoiceCurrency",
      ...getColumnSearchProps("InnvoiceCurrency"),
      sorter: (a, b) => a.InnvoiceCurrency.localeCompare(b.InnvoiceCurrency),
      align: "center",
      render: (text: any, record: { InnvoiceCurrency: any }) => {
        return <> {record.InnvoiceCurrency ? record.InnvoiceCurrency : "-"} </>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "VarianceStatus",
    //   key: "VarianceStatus",
    //   sorter: (a, b) => a.VarianceStatus.localeCompare(b.VarianceStatus),
    //   ...getColumnSearchProps("VarianceStatus"),
    //   align: "center",
    //   // render: (text: any, record: { InnvoiceNumber: any; }) => {
    //   //   return (<> {record.InnvoiceNumber ? record.InnvoiceNumber : '-'} </>)
    //   // }
    // },
    {
      title: "Status",
      dataIndex: "VarianceStatus",
      key: "VarianceStatus",
      sorter: (a, b) => a.VarianceStatus.localeCompare(b.VarianceStatus),
      align: "center",
      render: (text: any, record: { VarianceStatus: any }) => {
        // Define a mapping of status values to tag colors
        const statusTagColors = {
          Partial_Variance: "orange",
          No_Variance: "green",
          Full_Variance: "red",
          // Add more status values and corresponding colors as needed
        };
    
        const statusColor = statusTagColors[record.VarianceStatus] || "default";
    
        return (
          <Tag color={statusColor}>
            {record.VarianceStatus
              ? StatusEnumDisplay.find(
                  (item) => item.name === record.VarianceStatus
                )?.displayVal
              : "-"}
          </Tag>
        );
      },
      filters: [
        {
          text: 'Partial Variance',
          value: 'Partial_Variance', // Change value to the actual status value
        },
        {
          text: 'No Variance',
          value: 'No_Variance', // Change value to the actual status value
        },
        {
          text: 'Full Variance',
          value: 'Full_Variance', // Change value to the actual status value
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.VarianceStatus === value; // Use record.VarianceStatus
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
          <Button className="panel_button">Upload Document </Button>
        </Link>
      }

    >
       <Row>  <Col ><Card title={'Fully Variance : ' + formdata.filter(el => el.VarianceStatus === "Full_Variance").length} style={{textAlign: 'center',marginBottom:10,marginRight:60, width:180,height:35,backgroundColor:'red', borderRadius:3}}  size="small"></Card>
                   </Col>
                   
                   <Col >
                   <Card title={'Partial Variance : ' + formdata.filter(el => el.VarianceStatus === "Partial_Variance").length} style={{textAlign: 'center',marginBottom:10,marginRight:60, width:180,height:35,backgroundColor:'orange', borderRadius:3}} size="small"></Card>
                   </Col>
                   
                   <Col >
                   <Card title={'No Variance : ' + formdata.filter(el => el.VarianceStatus === "No_Variance").length } style={{textAlign: 'center',marginBottom:10,marginRight:60, width:180,height:35,backgroundColor:'lightgreen', borderRadius:3}} size="small"></Card>
                   </Col>
                   </Row>
                   <br></br>
      <Form form={form} onFinish={getdata}>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 10}}
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
                {VendorData.map((option) => (
                  <option value={option.businessName}>
                    {option.businessName}
                  </option>
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
      <Table size="small" dataSource={formdata} columns={columns} />
    </Card>
  );
}

export default DocView;
