import { SearchOutlined } from "@ant-design/icons";
import { StockService } from "@project-management-system/shared-services";
import { Button, Card, Input, Space, Table } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";

export const StockView = () => {
  const service = new StockService();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    service.getAllStocks().then(res => {
      // console.log(res, "???????????????????????????????????");
      if (res) {
        setData(res);
        AlertMessages.getSuccessMessage("Stock retrived successfully. ")
      } else {
        setData([]);
        AlertMessages.getErrorMessage("Something went wrong. ")
      }
    }).catch(err => {
      console.log(err);
      setData([]);
      AlertMessages.getInfoMessage("Something went wrong. ")
    })
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
  const customFilter = (value, record) => {
    if (value === null) return true; // If filter is not active, show all rows
    return record.itemType === value;
  };
  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "M3 Style",
      dataIndex: "m3_style_code",
      ...getColumnSearchProps("m3_style_code"),
      // sorter: (a, b) => a.plant - b.plant,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Buyer",
      dataIndex: "buyer_name",
      ...getColumnSearchProps("buyer_name"),
    },
    {
      title: "Item Type",
      dataIndex: "item_type",
      ...getColumnSearchProps("item_type"),
    },
    {
      title: "Item",
      dataIndex: "item_name",
      ...getColumnSearchProps("item_name"),
    },
    {
      title: "Style",
      dataIndex: "style",
      ...getColumnSearchProps("style"),
    },
    {
      title: "Location",
      dataIndex: "rack_position_name",
      ...getColumnSearchProps("rack_position_name"),

    },

    {
      title: "Quantity",
      dataIndex: "total_quantity",
      // sorter: (a, b) => a.itemQuantity - b.itemQuantity,
      // sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <Card title="Stock" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      <Table
        className="custom-table-wrapper"
        dataSource={data}
        columns={columns}
        size="small"
      />
    </Card>
  );
};
