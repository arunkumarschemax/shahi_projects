import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, Space } from 'antd';
import { SourceFabricsTrimsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { MaterialIssueIdreq } from '@project-management-system/shared-models';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnType, ColumnProps } from 'antd/es/table';

export interface SourceFabricsProps {
  MaterialIssueID: number;
}

export const SourceFabrics = (props: SourceFabricsProps) => {

  const service = new SourceFabricsTrimsService;
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedStore, setSelectedStore] =
    useState<any>(undefined);


  useEffect(() => {
    if (props.MaterialIssueID != undefined) {
      const id = props.MaterialIssueID
      getAllFabrics(id);
    } else {
      AlertMessages.getInfoMessage("Material Issue Id not found");
    }
  }, [])

  const getAllFabrics = (id) => {
    const req = new MaterialIssueIdreq(id);
    service.getAllFabricDetails(req).then((res) => {
      if (res) {
        // console.log(res, "ressssssssssssssssssssssssssssssssssssss");
        setSelectedStore(res);
      } else {
        AlertMessages.getInfoMessage("Error Fetching data");
      }
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

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },

    {
      title: 'Fabric Code',
      dataIndex: 'fabric_code',
      width: "20%",
      ...getColumnSearchProps("fabric_code"),

    },
    {
      title: 'Description',
      dataIndex: 'description',
      ...getColumnSearchProps("description"),
      // render: (_, record) => (
      //   <Input
      //   value={record.description}
      //   onChange={(e) => handleInputChange(e, record.key, 'description')}
      //   disabled
      //   />
      // ),
    },
    {
      title: 'Color',
      dataIndex: 'fabric_colour',
      // render: (_, record) => (
      //   <Input
      //   value={record.color}
      //   onChange={(e) => handleInputChange(e, record.key, 'color')}
      //   />
      // ),
    },

    {
      title: 'Consumption',
      dataIndex: 'consumption',
      // render: (_, record) => (
      //   <Input
      //   value={record.consumption}
      //   onChange={(e) => handleInputChange(e, record.key, 'consumption')}
      //   />
      // ),
    },
    {
      title: 'Issued Quantity',
      dataIndex: 'issued_quantity',
      // render: (_, record) => (
      //   <Input
      //   value={record.consumption}
      //   onChange={(e) => handleInputChange(e, record.key, 'consumption')}
      //   />
      // ),
    },


  ]

  return (
    <div>
      <Table
        dataSource={selectedStore}
        className="custom-table-wrapper"
        columns={columns}
        bordered={true}
        size='small'
      />
    </div>
  )
}
export default SourceFabrics;
