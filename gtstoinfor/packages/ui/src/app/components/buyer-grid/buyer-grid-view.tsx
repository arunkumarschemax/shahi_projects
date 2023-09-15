import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, Button, Space, Card } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { BuyersService } from '@project-management-system/shared-services';

const BuyersView = () => {
  const buyerService = new BuyersService();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [buyersData, setBuyersData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await buyerService.getAllBuyersInfo();
      if (response.status) {
        setBuyersData(response.data);
      }
    } catch (error) {
      console.error('Error fetching buyer data:', error);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
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
      ...getColumnSearchProps('phoneNo'),
    },
  ] as any[];

  return (
    <div>
        <Card title="Buyer Info" style={{position:"relative",right:"10px"}}>
      <Table dataSource={buyersData} columns={columns}  size='small'/>
      </Card>
    </div>
  );
};

export default BuyersView;



