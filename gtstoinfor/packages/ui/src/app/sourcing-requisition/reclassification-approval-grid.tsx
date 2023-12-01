import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, ReclassificationService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Modal, Tag } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";
import { M3ItemsDTO, ReclassificationApproveRequestDto, ReclassificationStatusEnum, UomCategoryEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
import { Reclassification } from "./reclassification";
const { TextArea } = Input;

export const ReclassificationApprovalGrid = () => {
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const [reclassificationData, setReclassificationData] = useState<any[]>([]);
  const reclassificationService = new ReclassificationService();

  useEffect(() => {
    getReclassificationData()
  }, []);

  const getReclassificationData = () => {
    reclassificationService.getAllReclassificationData().then((res) => {
        if(res.status){
            setReclassificationData(res.data);
        }
        else{
            setReclassificationData([]);
            AlertMessages.getInfoMessage(res.internalMessage)
        }
    }).catch((err) => {
        console.log(err.message);
        AlertMessages.getWarningMessage(err)
      });
  }
  

  const assignStock = (rowData) => {
    console.log(rowData)
    let req = new ReclassificationApproveRequestDto(rowData.reclassificationId,rowData.stockId,rowData.quantity,rowData.m3Item,rowData.locationId,1,rowData.toBuyerId,rowData.fromBuyerId,rowData.itemType,rowData.grnItemId,rowData.uomId)
    reclassificationService.getApproveStockReclassification(req).then((res) => {
      if(res.status){
        AlertMessages.getSuccessMessage(res.internalMessage)
      }
      else{
          AlertMessages.getInfoMessage(res.internalMessage)
      }
    }).catch((err) => {
        console.log(err.message);
        AlertMessages.getWarningMessage(err)
      });
  }
  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  
  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "From Buyer",
      dataIndex: "fromBuyerName",
      ...getColumnSearchProps("fromBuyerName"),
      sorter: (a, b) => a.fromBuyerName.localeCompare(b.fromBuyerName),
      sortDirections: ["descend", "ascend"],
      
    },
    {
      title: "To Buyer",
      dataIndex: "toBuyerName",
      ...getColumnSearchProps("toBuyerName"),
      sorter: (a, b) => a.toBuyerName.localeCompare(b.toBuyerName),
      sortDirections: ["descend", "ascend"],
      
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
      ...getColumnSearchProps("itemType"),
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "M3 Item",
      dataIndex: "m3ItemCode",
      ...getColumnSearchProps("m3ItemCode"),
      sorter: (a, b) => a.m3ItemCode.localeCompare(b.m3ItemCode),
      sortDirections: ["descend", "ascend"],
    },
   
    {
      title: "Location",
      dataIndex: "location",
      ...getColumnSearchProps("location"),

    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (record) => (
        <span>
          {record.quantity} + " " + {record.uom} 
        </span>
      ),
      ...getColumnSearchProps("quantity"),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, rowData) => {
        return (
          <span>
            {
              rowData.status === ReclassificationStatusEnum.APPROVAL_PENDING ? 
            <Button
              style={{ backgroundColor: '#69c0ff' }}
              onClick={(e) => assignStock(rowData)}
            >
              <b>Assign Stock</b>
            </Button>: "Approved" }
          </span>
        );
      }
    }
  ];

  return (
    <Card title="Reclassification Approval" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      <Table
        className="custom-table-wrapper"
        dataSource={reclassificationData.length > 0 ? reclassificationData : []}
        columns={columns}
        size="small"
      />
      
    </Card>
  );
};
