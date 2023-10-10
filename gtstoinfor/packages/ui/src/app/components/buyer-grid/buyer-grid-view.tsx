import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, Button, Space, Card, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { BuyersService } from '@xpparel/shared-services';

export const BuyersView = () => {
  const buyerService = new BuyersService();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [formdata, setFormData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1)
  const [filteredInfo, setFilteredInfo] = useState({});

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    buyerService.getAllBuyersInfo().then((res) => {
      if (res.status) {
        setFormData(res.data);
        message.success("Data Retrieved Successfully");
      } else {
        setFormData([]);
        message.error("Failed");
      }
    })
  }

  const handleSearch = (
    selectedKeys: any[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchedColumn('');
  };
  

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    
  };

  const getColumnSearchProps = (dataIndex: any) : ColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
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

  const columns:any = [
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      align:"center",
      render: (text, object, index) => (page - 1) * pageSize + (index + 1)
  },
    {
      title: 'Buyer Code',
      dataIndex: 'buyerCode',
      key: 'buyerCode',
      ...getColumnSearchProps('buyerCode'),
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyerName',
      key: 'buyerName',
      ...getColumnSearchProps('buyerName'),
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
     
      ...getColumnSearchProps('contactPerson'),
    },
    {
      title: 'Contact Number',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
       render: (text) => (
        <a href={`tel:${text}`}>{text}</a>
      ),
      //...getColumnSearchProps('phoneNo'),
    },
  ] ;

  return (
    <div>
        <Card title="Buyer Info" style={{position:"relative",right:"10px"}}>
      <Table  
      dataSource={formdata} 
      onChange={handleChange} 
      columns={columns}  
      size='small'/>
      </Card>
    </div>
  );
};

export default BuyersView;



