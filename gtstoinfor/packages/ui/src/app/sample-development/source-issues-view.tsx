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
  import Highlighter from "react-highlight-words";
  import { ColumnProps } from "antd/lib/table";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import form from "antd/es/form";
import { EyeOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { SourceIssuesService } from "@project-management-system/shared-services";

  

  export const SourceIssuesView =()=>{
    const searchInput = useRef(null);
    const service = new SourceIssuesService
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [selectedStore, setSelectedStore] =
    useState<any>(undefined);

    let navigate = useNavigate();



    useEffect(()=>{
        getAllStoreIssues()
    },[])

   
    const getAllStoreIssues=()=>{
        service.getAllSourceIssues().then((res)=>{
           if(res){
         setSelectedStore(res);
           } 
        })
    }
    const  DetailView =(val:any)=>{
        return navigate(`/source-issues/source-issues-detail-view`,{state:{id:val}});
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

      const columnsSkelton:any=[
        {
            title:"S No",
            width:"70px",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),     
           },
           {
            title:"Consumption Code",
            dataIndex:"consumptionCode",
            sorter: (a, b) => a.consumptionCode.localeCompare(b.consumptionCode),
          sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("consumptionCode"),
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
            title: "Issued Date",
            dataIndex: "date",
            // responsive: ['lg'],
            sorter: (a, b) => a.date.localeCompare(b.date),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("date"),
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
            title: "Style",
            dataIndex: "styleNo",
            // responsive: ['lg'],
            sorter: (a, b) => a.styleNo.localeCompare(b.styleNo),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("styleNo"),
          },
          {
            title: "Sample Indent Date",
            dataIndex: "sampleIndentDate",
            // responsive: ['lg'],
            sorter: (a, b) => a.sampleIndentDate.localeCompare(b.sampleIndentDate),
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("sampleIndentDate"),
          },
          {
            title: "Po Number",
            dataIndex: "poNumber",
            // responsive: ['lg'],
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
        title={<span>Store Issues View</span>}
        className="card-header"
        style={{ textAlign:"center" ,color:'#00ffff'}}
        headStyle={{border:0}}
    >
<Row gutter={24}>
<Col xs={24} sm={12} md={8} lg={6} xl={6}>
<Form.Item name="reqNo" label="Request No">
              <Select
                showSearch
                placeholder="Select Request No"
                optionFilterProp="children"
                allowClear
              >
                {/* {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
                  </Select.Option>
                ))} */}
              </Select>
            </Form.Item>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6} xl={6}>
<Form.Item name="consumptionCode" label="Consumption Code">
              <Select
                showSearch
                placeholder="Select Consumption Code"
                optionFilterProp="children"
                allowClear
              >
                {/* {reqNo.map((qc: any) => (
                  <Select.Option key={qc.reqNo} value={qc.reqNo}>
                    {qc.reqNo}
                  </Select.Option>
                ))} */}
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
                // onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
</Row>

        <Table
        size="small" 
        // rowkey={(record)=>record.}
        columns={columnsSkelton}
        className="custom-table-wrapper"
        dataSource={selectedStore}
        scroll={{x:true}}
        pagination={{
            onChange(current){
                setPage(current)
            }
        }}

        />
    </Card>
      )
  }
  export default SourceIssuesView