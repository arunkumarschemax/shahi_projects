// import { ProColumns, ProTable } from '@ant-design/pro-components'

// import { Button, Card, Col, Divider, Drawer, Form, Input, Modal, Popconfirm, Radio, Row, Space, Switch, Table, Tag, Tooltip, message } from 'antd'
// import { forEachObject } from 'for-each'
// import { useNavigate } from 'react-router-dom'
// import TableActions from '../../common/table-actions/table-actions'
// import { ColumnProps, ColumnType } from 'antd/es/table'
// import { useEffect, useRef, useState } from 'react'
// import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, InfoCircleOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons'
// import Highlighter from 'react-highlight-words'

// import AlertMessages from '../../common/common-functions/alert-messages'

// export const BuyersView = () => {
//     const navigate = useNavigate()
//     //const buyerService = new BuyersService()
//     const [page, setPage] = useState<number>(1);
//     const [pageSize, setPageSize] = useState<number>(1);

//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef(null);
//     const [drawerVisible, setDrawerVisible] = useState(false);
//     const [selectedBuyersData, setSelectedBuyersData] = useState<any>(undefined);
//     const [form] = Form.useForm()
//     const [addressModal, setAddressModal] = useState<boolean>(false)
//     const [buyerId, setBuyerId] = useState<number>(0)




//     //   useEffect(() => {
//     //     getBuyersData()
//     //   },[])



//     //   const getBuyersData = () => {
//     //     buyerService.getAllBuyersInfo().then(res => {
//     //       if(res.status){
//     //         setBuyersData(res.data)
//     //       }
//     //     })
//     //   }

//     const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
//             <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//                     style={{ marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             handleReset(clearFilters)
//                             setSearchedColumn(dataIndex)
//                             confirm({ closeDropdown: true })
//                         }
//                         }
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Reset
//                     </Button>

//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered: boolean) => (
//             <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex] ? record[dataIndex]
//                 .toString()
//                 .toLowerCase()
//                 .includes((value as string).toLowerCase()) : false,
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     function handleSearch(selectedKeys, confirm, dataIndex) {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     function handleReset(clearFilters) {
//         clearFilters();
//         setSearchText('');
//     };

//     //drawer related
//     const closeDrawer = () => {
//         setDrawerVisible(false);
//     }

    

//     const columnsSkelton: ColumnProps<any>[] = [
//         {
//             title: 'S No',
//             key: 'sno',
//             width: '70px',
//             responsive: ['sm'],
//             render: (text, object, index) => (page - 1) * 10 + (index + 1)
//         },
//         {
//             dataIndex: "buyerCode",
//             title: "Buyer Code",
//             // responsive: ['lg'],
//             sorter: (a, b) => a.buyerCode.localeCompare(b.buyerCode),
//             sortDirections: ['descend', 'ascend'],
//             ...getColumnSearchProps('buyerCode')
//         },
//         {
//             dataIndex: "buyerName",
//             title: "Buyer Name",
//             // responsive: ['lg'],
//             sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
//             sortDirections: ['descend', 'ascend'],
//             ...getColumnSearchProps('buyerName')
//         },
//         {
//             dataIndex: "contactPerson",
//             title: "Contact Person",
//             // responsive: ['lg'],
//             sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
//             sortDirections: ['descend', 'ascend'],
//             ...getColumnSearchProps('contactPerson')
//         },
//         {
//             dataIndex: "phoneNo",
//             title: "Contact Number",
//             // responsive: ['lg'],
//             sorter: (a, b) => a.phoneNo.localeCompare(b.phoneNo),
//             sortDirections: ['descend', 'ascend'],
//             ...getColumnSearchProps('phoneNo')
//         },



//     ];




//     return (



//         <Table columns={columnsSkelton} size='small' bordered />


//     )
// }

// export default BuyersView



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
        <Card style={{position:"relative",right:"10px"}}>
      <Table dataSource={buyersData} columns={columns} />
      </Card>
    </div>
  );
};

export default BuyersView;



