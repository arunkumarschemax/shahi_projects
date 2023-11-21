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
  Alert,
  Checkbox
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
import AlertMessages from "../../common/common-functions/alert-messages";
import { AttributesDto } from "@project-management-system/shared-models";
import { AttributeService } from "@project-management-system/shared-services";
import { AttributesForm } from "./attributes-form";
// import './payment-modes.css';

/* eslint-disable-next-line */
export interface AttributesProps {}

export function AttributesGrid(props: AttributesProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [attributesData, setAttributesData] = useState<AttributesDto[]>([]);
  const [selectedAttributesData, setSelectedAttributesData] =
    useState<any>(undefined);

  const service = new AttributeService();

  useEffect(() => {
    getAllAttributes();
  }, []);

  /**
   *
   */
  const getAllAttributes = () => {
    service
      .getAllAttributes()
      .then((res) => {
        if (res.status) {
          setAttributesData(res.data);
        } else {
          if (res.data) {
            setAttributesData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
          } else {
            AlertMessages.getErrorMessage(res.internalMessage);
          }
        }
      })
      .catch((err) => {
        setAttributesData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  /**
   *
   * @param attributesDto
   */
  const deleteAttributes = (attributesDto: AttributesDto) => {
    attributesDto.isActive = attributesDto.isActive ? false : true;
    service
      .activateOrDeactivateAttributes(attributesDto)
      .then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          getAllAttributes()
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  /**
   *
   * @param attributesData
   */
  const updateAttributes = (dto: AttributesDto) => {
    dto.updatedUser = JSON.parse(localStorage.getItem("username"));
    service
      .updateAttribute(dto)
      .then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage("Updated Successfully");
          getAllAttributes();
          setDrawerVisible(false);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
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
  const openFormWithData = (viewData: AttributesDto) => {
    setDrawerVisible(true);
    setSelectedAttributesData(viewData);
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
      title: <div style={{textAlign:"center"}}>Attribute Against</div> ,
      dataIndex: "attributeAgainst",
      width :'250px',
      // responsive: ['lg'],
      sorter: (a, b) => a.attributeAgainst.localeCompare(b.attributeAgainst),
      sortDirections: ["descend", "ascend"],
      filters: [
        {
          text: "General",
          value: 'GENERAL',
        },
        {
          text: "Order",
          value: 'ORDER',
        },
      ],
      onFilter: (value,record) =>{ return record.attributeAgainst === value}
    },
    {
      title: <div style={{textAlign:"center"}}>Attribute</div> ,
      dataIndex: "attributeName",
      // responsive: ['lg'],
      sorter: (a, b) => a.attributeName.localeCompare(b.attributeName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("attributeName"),
    },
    {
      title: 'Status',
      align:'center',
      dataIndex: 'isActive',
      // sorter: (a, b) => a.isActive.localeCompare(b.isActive),
      // sortDirections: ["ascend", "descend"],
      // ...getColumnSearchProps("isActive"),
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
          <Checkbox
            checked={selectedKeys.includes(true)}
            onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
          >
            <span style={{color:'green'}}>Active</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(false)}
            onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
          >
            <span style={{color:'red'}}>Inactive</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns" >
          <Button  onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          
          </div>
        </div>
      ),
      filterMultiple: false,
     

    },
    {
      title: <div style={{textAlign:"center"}}>Action</div> ,
      dataIndex: "action",
      align:"center",
      render: (text, rowData) => (
        <span>
          <EditOutlined
            className={"editSamplTypeIcon"}
            type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage(
                  "You Cannot Edit Deactivated Attribute"
                );
              }
            }}
            style={{ color: "#1890ff", fontSize: "14px" }}
          />

          <Divider type="vertical" />
          <Popconfirm
            onConfirm={(e) => {
              deleteAttributes(rowData);
            }}
            title={
              rowData.isActive
                ? "Are you sure to Deactivate Attribute?"
                : "Are you sure to Activate Attribute?"
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
      title={<span>Attributes</span>}
      // style={{ textAlign: "center"}}
      // headStyle={{ border: 0 }}
      extra={
        <Link to="/global/attributes/attributes-form">
          <span style={{ color: "white" }}>
            <Button type={"primary"}>New </Button>{" "}
          </span>
        </Link>
      }
    >
      <br></br>
      <Row gutter={40}>
      <Col span={4}></Col>
      <Col span={5}>
                <Alert type='success' message={'Total Attributes: ' + attributesData.length} style={{fontSize:'15px'}} />
         </Col>
        {/* <Col>
          <Card
            title={"Total Attributes: " + attributesData.length}
            style={{
              textAlign: "left",
              width: 220,
              height: 41,
              backgroundColor: "#bfbfbf",
              borderBottom: "none"
            }}
          ></Card>
        </Col> */}
        <Col span={5}>
            <Alert type='warning' message={'Active: ' + attributesData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
           </Col>
        {/* <Col>
          <Card
            title={
              "Active: " + attributesData.filter((el) => el.isActive).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#52c41a",
              borderBottom: 0,
            }}
          ></Card>
        </Col> */}
        <Col span={5}>
                      <Alert type='info' message={'In-Active: ' + attributesData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
           </Col>
        {/* <Col>
          <Card
            title={
              "In-Active: " +
              attributesData.filter((el) => el.isActive == false).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#f5222d",
            }}
          ></Card>
        </Col> */}
      </Row>
      <br></br>
      <Table
        size="small"
        rowKey={(record) => record.attributeId}

        columns={columnsSkelton}
        dataSource={attributesData}
        scroll={{ x: true ,y:500}}
        pagination={{
          pageSize: 50 ,
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
        width={window.innerWidth > 768 ? "60%" : "85%"}
        onClose={closeDrawer}
        visible={drawerVisible}
        closable={true}
      >
        {/* <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'> */}
        <AttributesForm
          key={Date.now()}
          updateAttribute={updateAttributes}
          isUpdate={true}
          attributesData={selectedAttributesData}
          closeForm={closeDrawer}
        />
        {/* </Card> */}
      </Drawer>
    </Card>
  );
}

export default AttributesGrid;
