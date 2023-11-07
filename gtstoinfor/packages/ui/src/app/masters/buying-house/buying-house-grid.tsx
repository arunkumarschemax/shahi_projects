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
import { Link, useNavigate } from "react-router-dom";
import { BuyingHouseDto } from "@project-management-system/shared-models";
import { BuyingHouseService } from "@project-management-system/shared-services";
import { BuyingHouseForm } from "./buying-house-form";

export interface BuyingHouseProps {}

export function BuyingHouseGrid(props: BuyingHouseProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [buyingHouseData, setBuyingHouseData] = useState<BuyingHouseDto[]>([]);
  const [selectedBuyingHouse, setSelectedBuyingHouse] =
    useState<any>(undefined);
    const navigate = useNavigate()

  const Service = new BuyingHouseService();

  useEffect(() => {
    getAllBuyingHouse();
  }, []);

  /**
   *
   */
  const getAllBuyingHouse = () => {
    Service.getAllBuyingHouse()
      .then((res) => {
        if (res.status) {
          setBuyingHouseData(res.data);
        } else {
          if (res.data) {
            setBuyingHouseData([]);
            message.error(res.internalMessage, 2);
          } else {
            message.error(res.internalMessage, 2);
          }
        }
      })
      .catch((err) => {
        setBuyingHouseData([]);
        message.error(err.message, 2);
      });
  };
  /**
   *
   * @param deliveryMethodData
   */
  const deleteBuyingHouse = (data: BuyingHouseDto) => {
    data.isActive = data.isActive ? false : true;
    Service.activateOrDeactivateBuyingHouse(data)
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
  const updateBuyingHouse = (data: BuyingHouseDto) => {
    data.updatedUser = JSON.parse(localStorage.getItem("username"));
    Service.updateBuyingHouse(data)
      .then((res) => {
        if (res.status) {
          message.success("Updated Successfully", 2);
          getAllBuyingHouse();
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
  const openFormWithData = (viewData: BuyingHouseDto) => {
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
      title: "Buying House",
      dataIndex: "buyingHouse",
      // responsive: ['lg'],
      sorter: (a, b) => a.buyingHouse.localeCompare(b.buyingHouse),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("buyingHouse"),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      // responsive: ['lg'],
      sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("contactPerson"),
    },
    {
      title: "Email",
      dataIndex: "email",
      // responsive: ['lg'],
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("email"),
      render: (email) => (
        <span>
          <a href={`mailto:${email}`}>{email}</a>
        </span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      // responsive: ['lg'],
      sorter: (a, b) => a.contact.localeCompare(b.contact),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("contact"),
      render: (contact) => (
        <span>
          <a href={`tel:${contact}`}>{contact}</a>
        </span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      // responsive: ['lg'],
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("address"),
    },
    {
      title: "City",
      dataIndex: "city",
      // responsive: ['lg'],
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("city"),
    },
    {
      title: "Country",
      dataIndex: "country",
      // responsive: ['lg'],
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("country"),
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
                message.error("You Cannot Edit Deactivated Buying House", 2);
              }
            }}
            style={{ color: "#1890ff", fontSize: "14px" }}
          />

          <Divider type="vertical" />
          <Popconfirm
            onConfirm={(e) => {
              deleteBuyingHouse(rowData);
            }}
            title={
              rowData.isActive
                ? "Are you sure to Deactivate Buying House ?"
                : "Are you sure to Activate Buying House ?"
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
      title="Buying House"

      extra={
        <span><Button onClick={()=>navigate('/masters/buying-house/buying-house-form')} type={'primary'}>New</Button></span>}>
       
      <br></br>
      <Row gutter={40}>
        <Col>
          <Card
            title={"Total Buying House: " + buyingHouseData.length}
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
              "Active: " + buyingHouseData.filter((el) => el.isActive).length
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
              buyingHouseData.filter((el) => el.isActive == false).length
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
        <BuyingHouseForm
          key={Date.now()}
          updateBuyingHouse={updateBuyingHouse}
          isUpdate={true}
          data={selectedBuyingHouse}
          closeForm={closeDrawer}
        />
      </Drawer>
    </Card>
  );
}

export default BuyingHouseGrid;
