import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined,} from "@ant-design/icons";
import { TrimBuyerDto } from "@project-management-system/shared-models";
import { TrimBuyerService } from "@project-management-system/shared-services";
import { Alert, Button, Card, Checkbox, Col, Divider, Drawer, Input, Popconfirm, Row, Switch, Table, Tag, message,} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import FinishForm from "../finish/finish";
import TrimBuyerForm from "./trim-buyer-form";

const TrimBuyerGrid = () => {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [mainData, setMainData] = useState<TrimBuyerDto[]>([]);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  const service = new TrimBuyerService();

  useEffect(() => {
    getAllBuyersData();
  }, []);

  const getAllBuyersData = () => {
    service.getAllTrimBuyers().then((res) => {
        if (res.status) {
          setMainData(res.data);
          message.success(res.internalMessage, 2);
        } else {
          setMainData([]);
          message.error(res.internalMessage, 2);
        }
      }).catch((err) => {
        setMainData([]);
        message.error(err.message, 2);
      });
  };

  const updateData = (data: TrimBuyerDto) => {
    console.log(data,'.........................')
    data.updatedUser = JSON.parse(localStorage.getItem("username"));
    service.updateTrimBuyer(data).then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          getAllBuyersData();
          setDrawerVisible(false);
        } else {
          message.error(res.internalMessage, 2);
        }
      }).catch((err) => {
        message.error(err.internalMessage, 2);
      });
  };

  const activateDeactivate = (data:TrimBuyerDto) => {
    data.isActive = data.isActive?false:true;
    service.activateOrDeactivateBuyer(data).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2); 
      } else {
          message.error(res.internalMessage,2);
      }
    }).catch(err => {
      message.error(err.message,2);
    })
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
  const openFormWithData = (viewData: TrimBuyerDto) => {
    setDrawerVisible(true);
    setSelectedData(viewData);
    console.log(viewData,'--------------------------')
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
      title: <div style={{textAlign:'center'}}>Buyer</div>,
      dataIndex: "trimBuyer",
      // responsive: ['lg'],
      sorter: (a, b) => a.trimBuyer?.localeCompare(b.trimBuyer),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("trimBuyer"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      align:'center',
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
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div
          className="custom-filter-dropdown"
          style={{ flexDirection: "row", marginLeft: 10 }}
        >
          <Checkbox
            checked={selectedKeys.includes(true)}
            onChange={() =>
              setSelectedKeys(selectedKeys.includes(true) ? [] : [true])
            }
          >
            <span style={{ color: "green" }}>Active</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(false)}
            onChange={() =>
              setSelectedKeys(selectedKeys.includes(false) ? [] : [false])
            }
          >
            <span style={{ color: "red" }}>Inactive</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns">
            <Button
              onClick={() => clearFilters()}
              className="custom-reset-button"
            >
              Reset
            </Button>
            <Button
              type="primary"
              style={{ margin: 10 }}
              onClick={() => confirm()}
              className="custom-ok-button"
            >
              OK
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: `Action`,
      dataIndex: "action",
      align:'center',
      render: (text, rowData) => (
        <span>
          <EditOutlined
            className={"editSampleTypeIcon"}
            type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                message.error("You Cannot Edit Deactivated Buyer", 2);
              }
            }}
            style={{ color: "#1890ff", fontSize: "14px" }}
          />

          <Divider type="vertical" />
          <Popconfirm
            onConfirm={(e) => {
                activateDeactivate(rowData);
            }}
            title={
              rowData.isActive
                ? "Are you sure to Deactivate Buyer ?"
                : "Are you sure to Activate Buyer ?"
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

  return(
    <Card title={<span >Buyer</span>}
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
    extra={<Link to='/trim-master/buyer/buyer-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
        <br></br>
        <Row gutter={24}>
          <Col span={4}></Col>
          <Col span={5}>
            <Alert type='success' message={'Total Buyers: ' + mainData.length} style={{fontSize:'15px'}} />
          </Col>
          <Col span={5}>
            <Alert type='warning' message={'Active: ' + mainData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
          </Col>
          <Col span={5}>
            <Alert type='info' message={'Inactive: ' + mainData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
          </Col>
        </Row> 
        <br></br>
          <Table
          size='small'
          rowKey={record => record.trimBuyerId}
          columns={columnsSkelton}
          dataSource={mainData}
          scroll={{x:true}}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
        //   onChange={onChange}
          bordered />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
              <TrimBuyerForm key={Date.now()}
                updateData={updateData}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  )
};

export default TrimBuyerGrid;
