import {
    BarcodeOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    PrinterOutlined,
    SearchOutlined,
    UndoOutlined,
  } from "@ant-design/icons";
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
  } from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
//  import {GRNService} from '../../../../libs/shared-services/src/common/grn-service'
  import Highlighter from "react-highlight-words";
import { GrnReq } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
import Barcode from "react-barcode";
  
  const { Option } = Select;
  
  export const GRNView = () => {
    const [page, setPage] = React.useState(1);
    const grnService = new GRNService();
    const [grn, setGrn] = useState<any[]>([]);
    const navigate = useNavigate();
    const logInUser = localStorage.getItem("userName");
    const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
    const [barcode, setBarcode] = useState<string>(null);
    const [tableData, setTableData] = useState<any[]>([]);
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
      const req = new GrnReq()
      grnService.getAllGrn(req).then((res) => {
        if (res.status) {
          setData(res.data);
          setFilterData(res.data);
        }
      });
    };

   const details =(rowData) =>{
    const navigateData = filterData.filter(req => req.grnId === rowData)
    return navigate(`/grn-detail-view`, { state: { data: navigateData } });
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

    const tableColumns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: <div style={{textAlign:"center"}}>PO Number</div>,
        dataIndex: "poNumber",
        ...getColumnSearchProps("poNumber"),
        render: (val,data) => {
          return data.poNumber ? data.poNumber : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Number</div>,
        dataIndex: "grnNo",
        ...getColumnSearchProps("grnNo"),
        render: (val,data) => {
          return data.grnNo ? data.grnNo : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Vendor</div>,
        dataIndex: "vendor",
        ...getColumnSearchProps("vendor"),
        render: (val,data) => {
          return data.vendor ? data.vendor : "-";
        }
      }, 
      {
        title: <div style={{textAlign:"center"}}>Invoice No</div>,
        dataIndex: "invoiceNo",
        ...getColumnSearchProps("invoiceNo"),
        render: (val,data) => {
          return data.invoiceNo ? data.invoiceNo : "-";
        }
      }, 
      {
        title: <div style={{textAlign:"center"}}>Item Type</div>,
        dataIndex: 'itemType',
        ...getColumnSearchProps("itemType"),
        render: (val,data) => {
          return data.itemType ? data.itemType : "-";
        }
       
      }, {
        title: <div style={{textAlign:"center"}}>GRN Type</div>,
        dataIndex: "grnType",
        ...getColumnSearchProps("grnType"),
        render: (val,data) => {
          return data.grnType ? data.grnType : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Date</div>,
        align:'center',
        dataIndex: "grnDate",
        render: (val,data) => {
          return data.grnDate ?moment( data.grnDate).format('YYYY-MM-DD') : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Status</div>,
        dataIndex: "status",
        render: (val,data) => {
          return data.status ? data.status : "-";
        }
      },
      {
        title: <div style={{textAlign:'center'}}>Action</div>,
        dataIndex: 'action',
        align:"center",
        render: (text, rowData) => {
          
          return(
          <><span>
           <Button title={"Detail View"} onClick={() => details(rowData.grnId)}>
              <EyeOutlined />
            </Button>
          </span>
                 </>
          )
        }
      },
    ];
  
    const onBarcodeModalCancel = () => {
      setBarcode("");
      setBarcodeModal(false);
    };
  
    const closeWindow = () => {
      setBarcode("");
      window.close();
    };

    const onReset = ()=>{
      form.resetFields()
    }
  
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="GRN List"
        extra={
          <span>
            <Button onClick={() => navigate("/grn-form")}>New</Button>
          </span>
        }
      >
        <Form form={form}>
          <Row gutter={8}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
            <Form.Item name="grnNo" label="GRN No">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select GRB No"
              >
                {data.map((e) => {
                  return (
                    <Option key={e.grnId}value={e.grnNo}>
                      {e.grnNo}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
            <Form.Item name="itemType" label="Style">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Item Type"
              >
                {data.map((e) => {
                  return (
                    <Option key={e.style} value={e.style} name={e.style}>
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
              {/* <Select
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
              </Select> */}
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
        <Table
        columns={tableColumns}
        dataSource={filterData}
        />
      </Card>
    );
  };
  
  export default GRNView;
  