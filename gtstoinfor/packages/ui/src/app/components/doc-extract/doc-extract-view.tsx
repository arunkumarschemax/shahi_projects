import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Input, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

interface Item {
  sno: number;
  gstNumber: string;
  panNumber: string;
  imageFileName: string;
}

const View: React.FC = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState<Item[]>([]);
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState<any>({});

  useEffect(() => {
    get();
  }, []);

  const get = () => {
    axios
      .get("http://localhost:8003/scan/getdata")
      .then((res) => {
        if (res.status) {
          console.log(res, "#######");
          setFormData(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response);
      });
  };

  const handleAddClick = () => {
    navigate('/doc-extract-form');
  };

  const handleDownload = (imageFileName: string) => {
    const link = document.createElement('a');
    link.href = `${imageFileName}`;
    link.download = imageFileName;
    link.click();
  };


  const handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

 
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({ closeDropdown: true })
            }
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: any = [
    {
      title: 'Type Id', dataIndex: 'typeId', key: 'typeId',
      ...getColumnSearchProps("typeId"),
      // sorter: (a: { typeId: string; }, b: { typeId: any; }) => a.typeId.localeCompare(b.typeId),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { typeId: any; }) => {
        return (<> {record.typeId ? record.typeId : '-'} </>)
      }
    },
    {
      title: 'GST Number', dataIndex: 'GST', key: 'GST', ...getColumnSearchProps("GST"),
      // sorter: (a: { GST: string; }, b: { GST: any; }) => a.GST.localeCompare(b.GST),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { GST: any; }) => {
        return (<> {record.GST ? record.GST : '-'} </>)
      }
    },
    {
      title: 'IFSC Code', dataIndex: 'IFSC', key: 'IFSC', ...getColumnSearchProps("IFSC"),
      // sorter: (a: { IFSC: string; }, b: { IFSC: any; }) => a.IFSC.localeCompare(b.IFSC),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { IFSC: any; }) => {
        return (<> {record.IFSC ? record.IFSC : '-'} </>)
      }
    },
    {
      title: 'Innvoice', dataIndex: 'Innvoice', key: 'Innvoice', ...getColumnSearchProps("Innvoice"),
      // sorter: (a: { Innvoice: string; }, b: { Innvoice: any; }) => a.Innvoice.localeCompare(b.Innvoice),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { Innvoice: any; }) => {
        return (<> {record.Innvoice ? record.Innvoice : '-'} </>)
      }
    },
    {
      title: 'Customer', dataIndex: 'Customer', key: 'Customer', ...getColumnSearchProps("Customer"),
      // sorter: (a: { Customer: string; }, b: { Customer: any; }) => a.Customer.localeCompare(b.Customer),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { Customer: any; }) => {
        return (<> {record.Customer ? record.Customer : '-'} </>)
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleDownload(record.imageFileName)}>Download</Button>
        </span>
      ),
    },
  ];


  return (
    <div>
      <Card style={{ position: "relative", bottom: "15px" }}>
        <h1 style={{  fontSize: "25px" }}>Doc-Extract-Data</h1>
        <Button type="primary" style={{ float: "right", position: "relative", bottom: "25px", height: "35px" }} onClick={handleAddClick}>
          Add Item
        </Button>
        <Table style={{ position: "relative", bottom: "20px" }} dataSource={formdata} columns={columns} />
      </Card>
    </div>
  );
};

export default View;
