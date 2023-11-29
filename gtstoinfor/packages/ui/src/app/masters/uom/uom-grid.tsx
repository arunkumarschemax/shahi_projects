import React, { useEffect, useRef, useState } from "react";
import {
  Button,Card,Table,Input,Alert,Skeleton,Space} from "antd";
import { ColumnType, ColumnsType } from "antd/lib/table";
import { SearchOutlined} from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { UomService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";

export function UomGrid() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>();
  const service = new UomService();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const navigate=useNavigate();


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    service.getAllUoms().then((res) => {
      if (res.status) {
        setData(res.data);
      }
      setLoading(false);
    });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
};

const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
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
            onClick={() =>{
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({closeDropdown:true})
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
      record[dataIndex] ?record[dataIndex]     
         .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()):false,
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

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      width:10,
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "UOM Category",
      dataIndex: "uomCategory",
      // sorter: (a, b) => a.uom.localeCompare(b.model),
      // sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.uom.length - b.name.length,
      sortDirections: ['descend'],
      width:10,    
      filters: [
        {
          text: 'Area',
          value: 'Area',
        },
        {
          text: 'Length',
          value: 'Length',
        },
        {
          text: 'Weight',
          value: 'Weight',
        },
        {
          text: 'Volume',
          value: 'Volume',
        },
      ],
      // onFilter: (value,record) =>{ return record.uomCategory === value}
      // onFilter: (value: string, record) => record.uomCategory.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "UOM",
      dataIndex: "uom",
      sorter: (a, b) => a.uom.localeCompare(b.model),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("uom"),
      width:10,
    },
    {
      title: "Description",
      dataIndex: "description",
       width:130,
    },
  ];

  return (
    <Card 
      title={<span style={{ color: "Black" }}>Unit of Measurements</span>}
      // style={{ textAlign: "center" }}
      headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      
      
      extra={<Button
        onClick={() => navigate('/uom-form')}
        type="primary"
    >Create</Button>
    }
    //   extra={
    //     <Link to="/vehicle-model-form">
    //       <Button className="panel_button">Create </Button>
    //     </Link>
    //   }
    >
      {loading ? (
     <Skeleton active />
  ) : data.length > 0 ? (
    <Table
      columns={columns}
      dataSource={data}
      className="custom-table-wrapper"
      size="small"
      scroll={{x:true,y:500}}
           pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
      rowKey={(rec) => rec.id}
    />
  ) : (
    <Alert
      message="No Data Found"
      type="info"
      showIcon
      style={{ width: "150px", margin: "auto" }}
    />
        )}
    
    </Card>
  );
}

export default UomGrid;
