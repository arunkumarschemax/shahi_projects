import React, { useEffect, useRef, useState } from "react";
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Form, message, Select, Collapse, Space } from "antd";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import form from "antd/es/form";
import { CaretRightOutlined, EyeOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { SourceIssuesService } from "@project-management-system/shared-services";
import SourceIssuesDetailView from "./source-issues-detail-view";


export const MaterialIssueView = () => {
  const searchInput = useRef(null);
  const service = new SourceIssuesService
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedStore, setSelectedStore] = useState<any>(undefined);
  const [tableData, setTableData] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
  const [form] = Form.useForm()


  let navigate = useNavigate();



  useEffect(() => {
    getAllStoreIssues()
  }, [])

  useEffect(() => {
    if (data) {
      setTableData(data)
    }
  }, [data])


  const getAllStoreIssues = () => {
    service.getAllMaterialIssues().then((res) => {
      if (res) {
        setData(res);
      }
    })
  }

  const onSearch = () => {
    let filterData = []
    if (form.getFieldValue('requestNo') !== undefined) {
      const requestNo = form.getFieldValue('requestNo')
      filterData = data.filter((e) => e.styleId === requestNo)
    } else if (form.getFieldValue('consumptionCode') !== undefined) {
      const consumptionCode = form.getFieldValue('consumptionCode')
      filterData = data.filter((e) => e.requestNo === consumptionCode)
    }
    setTableData(filterData)
  }

  const DetailView = (val: any) => {
    return navigate(`/store-issues/store-issues-detail-view`, { state: { id: val } });
  }
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

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const openFormWithData = (viewData: any) => {
    setDrawerVisible(true);
    setSelectedStore(viewData);
  };

  const HeaderRow = (props: any,) => {
    const { consumptionCode, requestNo, date, buyer, style, sampleIndentDate, poNumber } = props
    return (
      <div style={{ display: "flex" }}>
        <span>Consumption Code : {<b>{consumptionCode}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>Request Number : {<b>{requestNo}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>Issue Date : {<b>{date}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>Buyer : {<b>{buyer}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>Style : {<b>{style}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>Sample Indent Date : {<b>{sampleIndentDate}</b>}</span>
        <span style={{ width: '10px' }}></span>
        <span>PO Number : {<b>{poNumber}</b>}</span>
      </div>
    );
  };

  const columnsSkelton: any = [
    {
      title: "S No",
      width: "70px",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Consumption Code",
      dataIndex: "consumptionCode",
      sorter: (a, b) => a.consumptionCode.localeCompare(b.consumptionCode),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("consumptionCode"),
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("requestNo"),
    },
    {
      title: "Issued Date",
      dataIndex: "date",
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("buyer"),
    },
    {
      title: "Style",
      dataIndex: "styleNo",
      sorter: (a, b) => a.styleNo.localeCompare(b.styleNo),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("styleNo"),
    },
    {
      title: "Sample Indent Date",
      dataIndex: "sampleIndentDate",
    },
    {
      title: "Po Number",
      dataIndex: "poNumber",
      sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("poNumber"),
    },
    {
      title: `Action`,
      dataIndex: "action",
      render: (text, rowData, index) => (
        <span>
          {" "}
          <Tooltip placement="top" title="Detail View">
            <EyeOutlined
              onClick={() => DetailView(rowData.id)}
              style={{ color: "blue", fontSize: 20 }}
              size={30}
            />
          </Tooltip>
        </span>
      ),
    },
  ]

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Card
      title={<span>Material Issues</span>}
      className="card-header"
      style={{ textAlign: "center", color: '#00ffff' }}
      headStyle={{ border: 0 }}
    >
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6} xl={7}>
          <Form.Item name="consumptionCode" label="Consumption Code">
            <Select
              showSearch
              placeholder="Select Consumption Code"
              optionFilterProp="children"
              allowClear
            >

            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Form.Item name="reqNo" label="Request No">
            <Select
              showSearch
              placeholder="Select Request No"
              optionFilterProp="children"
              allowClear
            >

            </Select>
          </Form.Item>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
          <Form.Item>
            <Button
              type="primary"
              style={{ background: "green", width: "100%" }}
              onClick={onSearch}
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
              // onClick={onReset}
              style={{ width: "100%" }}
            >
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} accordion>
        {tableData.map((item: any, index: any) => (
          <Collapse.Panel header={<HeaderRow consumptionCode={item.consumption_code} requestNo={item.request_no} date={item.issue_date} buyer={item.buyer_name} style={item.style_no} sampleIndentDate={item.sampleIndentDate} poNumber={item.po_number} />} key={index}>
            <Space direction="vertical" style={{ fontSize: "16px", width: '100%' }}>
              <SourceIssuesDetailView MaterialIssueID={item.material_issue_id} />
            </Space>
          </Collapse.Panel>
        ))}
      </Collapse>
    </Card>
  )
}
export default MaterialIssueView