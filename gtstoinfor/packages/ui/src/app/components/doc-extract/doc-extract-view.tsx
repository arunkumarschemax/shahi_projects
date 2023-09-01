import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Input, Space, Table, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ScanService } from '@project-management-system/shared-services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
interface Item {
  typedId: number,
  Gst: string,
  Ifsc: string,
  Innvoice: string,
  Customer: string,
  Volume: string,
  Weight: string,
  Chargeable: string,
  Packages: string,
  Date: string,
  Cartons: string,
  Console: string,
  PO: string,
  Payref: string,
  Quantity: string,
  InnvoiceNumber: string,
  Currency: string,
  Origin: string,
  Destination: string,
}
export interface DocViewProps {}

export function DocView(props: DocViewProps) {
  const navigate = useNavigate();
  const services = new ScanService();
  const [formdata, setFormData] = useState<Item[]>([]);
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState<any>({});

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    services.getdata().then((res) => {
        if (res.status) {
            setFormData(res.data);
            message.success("Created Successfully");
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
      title: 'GST Number', dataIndex: 'Gst', key: 'Ifsc', ...getColumnSearchProps("GST"),
      // sorter: (a: { GST: string; }, b: { GST: any; }) => a.GST.localeCompare(b.GST),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { Gst: any; }) => {
        return (<> {record.Gst ? record.Gst : '-'} </>)
      }
    },
    {
      title: 'IFSC Code', dataIndex: 'Ifsc', key: 'Ifsc', ...getColumnSearchProps("IFSC"),
      // sorter: (a: { IFSC: string; }, b: { IFSC: any; }) => a.IFSC.localeCompare(b.IFSC),
      // sortDirections: ["ascend", "descend"],
      render: (text: any, record: { Ifsc: any; }) => {
        return (<> {record.Ifsc ? record.Ifsc : '-'} </>)
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
      <Card title={"Documents Info"} style={{ position: "relative", bottom: "15px" }} extra={
        <Link to="/doc-extract-form">
          <Button className="panel_button">Upload Document </Button>
        </Link>
      }>
        <Table style={{ position: "relative", bottom: "20px" }} dataSource={formdata} columns={columns} />
      </Card>
    </div>
  );
};
export default DocView;

