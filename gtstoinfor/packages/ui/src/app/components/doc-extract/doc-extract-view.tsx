import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Input, Row, Space, Table, Tooltip, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SharedService } from '@project-management-system/shared-services';

interface Item {
  GST: string,
  Vendor: string,
  invoiceDate: string,
  Cgst: string,
  IGST: string,
  Sgst: string,
  InnvoiceNumber: string,
  InnvoiceAmount: string,
  InnvoiceCurrency: string
}

// export interface DocViewProps { }

export function DocView() {
  const navigate = useNavigate();
  const services = new SharedService();
  const [formdata, setFormData] = useState<Item[]>([]);
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);

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

  const handleAddClick = () => {
    navigate('/doc-extract-form');
  };

  const handleDownload = (imageFileName: string) => {
    const link = document.createElement('a');
    link.href = `${imageFileName}`;
    link.download = imageFileName;
    link.click();
  };

  const viewchange = (rowData: any) => {
    navigate('/scandetailview', { state: { rowData } });
    console.log(rowData,"Hhhhhhhhhhhhhhh")
  };

  const handleViewClick = (record: Item) => {
    viewchange(record); // Call your viewchange function with the record data
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
    // {
    //   title: 'Type Id', dataIndex: 'typedId', key: 'typedId',
    //   ...getColumnSearchProps("typedId"),
    //   render: (text: any, record: { typedId: any; }) => {
    //     return (<> {record.typedId ? record.typedId : '-'} </>)
    //   }
    // },
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1)
  },
    // {
    //   title: 'GST Number', dataIndex: 'GST', key: 'GST', ...getColumnSearchProps("GST"),
    //   align:"center",
    //   render: (text: any, record: { GST: any; }) => {
    //     return (<> {record.GST ? record.GST : '-'} </>)
    //   }
    // },
    {
      title: 'Vendor Name', dataIndex: 'Vendor', key: 'Vendor', ...getColumnSearchProps("Vendor"),
      align:"center",
      render: (text: any, record: { Vendor: any; }) => {
        return (<> {record.Vendor ? record.Vendor : '-'} </>)
      }
    },
    // {
    //   title: 'InvoiceDate', dataIndex: 'invoiceDate', key: 'invoiceDate', ...getColumnSearchProps("invoiceDate"),
    //   render: (text: any, record: { invoiceDate: any; }) => {
    //     return (<> {record.invoiceDate ? record.invoiceDate : '-'} </>)
    //   }
    // },
    {
      title: 'InnvoiceNumber', dataIndex: 'InnvoiceNumber', key: 'InnvoiceNumber', ...getColumnSearchProps("InnvoiceNumber"),
      align:"center",
      render: (text: any, record: { InnvoiceNumber: any; }) => {
        return (<> {record.InnvoiceNumber ? record.InnvoiceNumber : '-'} </>)
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span style={{ position: "relative", left: "20px" }}>
          {/* <CloudDownloadOutlined style={{ fontSize: '25px', color: '#000000', cursor: 'pointer' }} onClick={() => handleDownload(record.imageFileName)} /> */}
          <Tooltip title ="Details View">
          <EyeOutlined style={{ fontSize: '25px', color: 'blue', cursor: 'pointer', position: "relative", left: "20px", }} onClick={() => handleViewClick(record)} />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Card title="Documents Info" style={{ position: "relative", bottom: "15px" }} extra={
        <Link to="/doc-extract-form">
          <Button className="panel_button">Upload Document </Button>
        </Link>
      }>
        <Table style={{ position: "relative", bottom: "20px" }} dataSource={formdata} columns={columns} />
      
      </Card>
    </div>
  );
}

export default DocView;