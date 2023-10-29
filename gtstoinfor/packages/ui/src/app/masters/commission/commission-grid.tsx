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
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightSquareOutlined,
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { CommissionDto } from "@project-management-system/shared-models";
import { CommissionService } from "@project-management-system/shared-services";
import { CommissionForm } from "./commission-form";

export interface CommissionProps {}

export function CommissionGrid(props: CommissionProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [commissionData, setCommissionData] = useState<CommissionDto[]>([]);
  const [selectedCommissionData, setSelectedCommissionData] =
    useState<any>(undefined);

  const Service = new CommissionService();

  useEffect(() => {
    getAllCommission();
  }, []);

  /**
   *
   */
  const getAllCommission = () => {
    Service.getAllCommissions()
      .then((res) => {
        if (res.status) {
          setCommissionData(res.data);
        } else {
          if (res.data) {
            setCommissionData([]);
            message.error(res.internalMessage, 2);
          } else {
            message.error(res.internalMessage, 2);
          }
        }
      })
      .catch((err) => {
        setCommissionData([]);
        message.error(err.message, 2);
      });
  };
  /**
   *
   * @param deliveryMethodData
   */
  const deleteCommission = (data: CommissionDto) => {
    data.isActive = data.isActive ? false : true;
    Service.activateOrDeactivateCommission(data)
      .then((res) => {
        if (res.status) {
          message.success("Success", 2);
        } else {
          message.error(res.internalMessage, 2);
        }
      })
      .catch((err) => {
        message.error(err.message, 2);
      });
  };

  /**
   *
   * @param deliveryMethodData
   */
  const updateCommission = (data: CommissionDto) => {
    data.updatedUser = JSON.parse(localStorage.getItem("username"));
    Service.updateCommission(data)
      .then((res) => {
        if (res.status) {
          message.success("Updated Successfully", 2);
          getAllCommission();
          setDrawerVisible(false);
        } else {
          message.error(res.internalMessage, 2);
        }
      })
      .catch((err) => {
        message.error(err.message, 2);
      });
  };
  /**
   * used for column filter
   * @param dataIndex column data index
   */
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
  const openFormWithData = (viewData: CommissionDto) => {
    setDrawerVisible(true);
    setSelectedCommissionData(viewData);
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
      title: "Commission",
      dataIndex: "commission",
      // responsive: ['lg'],
      sorter: (a, b) => a.commission.localeCompare(b.commission),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("commission"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, rowData) => (
        <>
          {isActive ? (
            <Tag icon={<CheckCircleOutlined />} color="#87d068">
              Active
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="#f50">
              In Active
            </Tag>
          )}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => {
        // === is not work
        return record.isActive === value;
      },
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "InActive",
          value: false,
        },
      ],
    },
    {
      title: `Action`,
      dataIndex: "action",
      render: (text, rowData) => (
        <span>
          <EditOutlined
            className={"editSampleTypeIcon"}
            type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                message.error("You Cannot Edit Deactivated Commission", 2);
              }
            }}
            style={{ color: "#1890ff", fontSize: "14px" }}
          />

          <Divider type="vertical" />
          <Popconfirm
            onConfirm={(e) => {
              deleteCommission(rowData);
            }}
            title={
              rowData.isActive
                ? "Are you sure to Deactivate Commission ?"
                : "Are you sure to Activate Commission ?"
            }
          >
            <Switch
              size="default"
              className={
                rowData.isActive ? "toggle-activated" : "toggle-deactivated"
              }
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />
          </Popconfirm>
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
      title={<span>Commission</span>}
      style={{ textAlign: "center" }}
      headStyle={{ border: 0 }}
      extra={
        <Link to="/masters/commission/commission-form">
          <span style={{ color: "white" }}>
            <Button type={"primary"}>New </Button>{" "}
          </span>
        </Link>
      }
    >
      <br></br>
      <Row gutter={40}>
        <Col>
          <Card
            title={"Total Commissions: " + commissionData.length}
            style={{
              textAlign: "left",
              width: 220,
              height: 41,
              backgroundColor: "#bfbfbf",
            }}
          ></Card>
        </Col>
        <Col>
          <Card
            title={
              "Active: " + commissionData.filter((el) => el.isActive).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#52c41a",
            }}
          ></Card>
        </Col>
        <Col>
          <Card
            title={
              "In-Active: " +
              commissionData.filter((el) => el.isActive == false).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#f5222d",
            }}
          ></Card>
        </Col>
      </Row>
      <br></br>
      <Table
        size="small"
        rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

        rowKey={(record) => record.commissionId}
        columns={columnsSkelton}
        dataSource={commissionData}
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
        <CommissionForm
          key={Date.now()}
          updateCommission={updateCommission}
          isUpdate={true}
          data={selectedCommissionData}
          closeForm={closeDrawer}
        />
      </Drawer>
    </Card>
  );
}

export default CommissionGrid;
