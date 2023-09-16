// import React, { useEffect, useState } from 'react';
// import { Table, Button, message, Card } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import { PricesService } from "../../../../../libs/shared-services/src/price/prices-services";

// export function PriceView() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState<number>(1);
//   const [pageSize, setPageSize] = useState<number>(1)
//   const services = new PricesService();
//   const [formdata, setFormData] = useState<any>([]);

//   // const onNew = () => {
//   //   navigate('/priceform');
//   // };
//   useEffect(() => {
//     getdata();
//   }, []);


//   const getdata = () => {
//     services.getdata().then((res) => {
//       if (res.status) {
//         setFormData(res.data);
//         message.success("Data Retrieved Successfully");
//       } else {
//         setFormData([]);
//         message.error("Failed");
//       }
//     })
//   }

//   const columns: any = [


//     {
//       title: 'S.No',
//       key: 'sno',
//       responsive: ['sm'],
//       render: (text, object, index) => (page - 1) * pageSize + (index + 1)
//     },


//     {
//       title: 'Vendor Name',
//       dataIndex: 'vendor',
//       key: 'vendor',
//     },
//     {
//       title: 'Service Code',
//       dataIndex: 'serviceCode',
//       key: 'servicecode',
//     },
//     {
//       title: 'Head Of Charges',
//       dataIndex: 'headOfCharges',
//       key: 'headOfCharges',
//     },
//     {
//       title: 'Per Unit',
//       dataIndex: 'perUnit',
//       key: 'perUnit',
//     },
//     {
//       title: 'Dp Logistics',
//       dataIndex: 'dpLogistics',
//       key: 'dpLogistics',
//     },



//     {
//       title: 'NSH',
//       dataIndex: 'nsh',
//       key: 'nsh',
//     },
//     {
//       title: 'KSR',
//       dataIndex: 'ksr',
//       key: 'ksr',
//     },




//     {
//       title: 'Unit Price',
//       dataIndex: 'unitPrice',
//       key: 'unitPrice',
//     },
//   ];

//   return (
//     <div>
//       <Card title="Vendor Price List" style={{ position: "relative", bottom: "15px" }} extra={
//         <Link to="/priceform">
//           <Button type='primary'>Create</Button>
//         </Link>
//       }>

//         <Table
//           dataSource={formdata} columns={columns}  size='small'/>
//       </Card>
//     </div>
//   );
// };

// export default PriceView;



import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, message, Card, Space, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PricesService } from "../../../../../libs/shared-services/src/price/prices-services";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/lib/table';

export function PriceView() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const services = new PricesService();
  const [formdata, setFormData] = useState<any>([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const [filteredInfo, setFilteredInfo] = useState({});

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    services.getdata().then((res) => {
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
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    // Add sorting logic here if needed
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
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

  const columns: any = [
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1)
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendor',
      key: 'vendor',
      ...getColumnSearchProps('vendor'),
      align: 'center',
      sorter: (a, b) => a.vendor.localeCompare(b.vendor),
      render: (text: any, record: { vendor: any }) => {
        return <>{record.vendor ? record.vendor : "-"}</>;
      },
    },
    {
      title: 'Service Code',
      dataIndex: 'serviceCode',
      key: 'servicecode',
      ...getColumnSearchProps('ServiceCode'),
      align: 'center',
      sorter: (a, b) => a.serviceCode.localeCompare(b.serviceCode),
      render: (text: any, record: { serviceCode: any }) => {
        return <>{record.serviceCode ? record.serviceCode : "-"}</>;
      },
    },
    {
      title: 'Head Of Charges',
      dataIndex: 'headOfCharges',
      key: 'headOfCharges',
      ...getColumnSearchProps('headOfCharges'),
      align: 'center',
      sorter: (a, b) => a.headOfCharges.localeCompare(b.headOfCharges),
      render: (text: any, record: { headOfCharges: any }) => {
        return <>{record.headOfCharges ? record.headOfCharges : "-"}</>;
      },
    },
    {
      title: 'Per Unit',
      dataIndex: 'perUnit',
      key: 'perUnit',
      ...getColumnSearchProps('perUnit'),
      align: 'center',
      sorter: (a, b) => a.perUnit.localeCompare(b.perUnit),
      render: (text: any, record: { perUnit: any }) => {
        return <>{record.perUnit ? record.perUnit : "-"}</>;
      },
    },
    {
      title: 'Dp Logistics',
      dataIndex: 'dpLogistics',
      key: 'dpLogistics',
      ...getColumnSearchProps('dpLogistics'),
      align: 'center',
      sorter: (a, b) => a.dpLogistics.localeCompare(b.dpLogistics),
      render: (text: any, record: { dpLogistics: any }) => {
        return <>{record.dpLogistics ? record.dpLogistics : "-"}</>;
      },
    },
    {
      title: 'NSH',
      dataIndex: 'nsh',
      key: 'nsh',
      ...getColumnSearchProps('nsh'),
      align: 'center',
      sorter: (a, b) => a.nsh.localeCompare(b.nsh),
      render: (text: any, record: { nsh: any }) => {
        return <>{record.nsh ? record.nsh : "-"}</>;
      },
    },
    {
      title: 'KSR',
      dataIndex: 'ksr',
      key: 'ksr',
      ...getColumnSearchProps('ksr'),
      align: 'center',
      sorter: (a, b) => a.ksr.localeCompare(b.ksr),
      render: (text: any, record: { ksr: any }) => {
        return <>{record.ksr ? record.ksr : "-"}</>;
      },
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      ...getColumnSearchProps('unitPrice'),
      align: 'center',
      sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
      render: (text: any, record: { unitPrice: any }) => {
        return <>{record.unitPrice ? record.unitPrice : "-"}</>;
      },
    },
  ];

  return (
    <div>
      <Card
        title="Vendor Price List"
        style={{ position: 'relative', bottom: '15px' }}
        extra={
          <Link to="/priceform">
            <Button type='primary'>Create</Button>
          </Link>
        }
      >
        <Table
          dataSource={formdata}
          columns={columns}
          size='small'
          onChange={handleChange}
        />
      </Card>
    </div>
  );
}

export default PriceView;
