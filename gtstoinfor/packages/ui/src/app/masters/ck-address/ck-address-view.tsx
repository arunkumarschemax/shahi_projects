import { FileExcelFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Row, Table } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { ColumnProps } from "antd/es/table"
import { CkAddressService } from "packages/libs/shared-services/src/common/ck-address-service";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

export const CkAddressView = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const service = new CkAddressService()
    const [data,setData] = useState<any[]>([])
    const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

    useEffect(() => {
        getInfo()
    },[])

    const getInfo = () => {
        service.getCkAddressInfo().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };
    
   ;
      const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              size="small"
              style={{ width: 90 }}
              onClick={() => {
                handleReset(clearFilters);
                setSearchedColumn(dataIndex);
                confirm({ closeDropdown: true });
              }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : false,
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current.select());
          }
        },
        render: (text) =>
          text ? (
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ) : (
              text
            )
          ) : null,
      });
  

    const columns : any[] = [
        {
            title: 'S No',
            key: 'sno',
            align:"center",
            width:"60px",
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
        },
        {
            // title:'Destination',
            title:<div style={{textAlign:"center"}}>Destination</div>,
            dataIndex:'destination',
            sorter: (a, b) => a.destination.localeCompare(b.destination),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('destination') 
        },
       
       
        {
          title: 'Buyer Address Code',
          dataIndex: 'buyerAddressCode',
          width:130,
          align:"center",
          sorter: (a, b) => {
              const codeA = (a.buyerAddressCode || "").toString();
              const codeB = (b.buyerAddressCode || "").toString();
              return codeA.localeCompare(codeB);
          },
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('buyerAddressCode')
      },
      {
          // title:'Buyer Address',
          title:<div style={{textAlign:"center"}}>Buyer Address</div>,
          width:300,
          dataIndex:'buyerAddress',
          sorter: (a, b) => a.buyerAddress.localeCompare(b.buyerAddress),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('buyerAddress')       
         
      },
      {
        title: 'Delivery Address Code',  
        dataIndex: 'deliveryAddressCode',
        width:130,
        align:"center",
        sorter: (a, b) => {
            const codeA = (a.deliveryAddressCode || "").toString();
            const codeB = (b.deliveryAddressCode || "").toString();
            return codeA.localeCompare(codeB);
        },
        sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('deliveryAddressCode')
    },
    {
        // title:'Delivery Address',
        title:<div style={{textAlign:"center"}}>Delivery Address</div>,
        dataIndex:'deliveryAddress',
        sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
        sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",
        ...getColumnSearchProps('deliveryAddress')

        
    },
    ]

    let i = 1;
    let rowIndex = 1;
    const exceldata = [
        { title: 'S No', dataIndex: 'sNo', render: (text, object, index) => { 
            if(index == data.length) { 
              return null;
            } else { 
              return index+1
            } 
          },
          width: 60, 
         
        }, 
        { title: 'Destination', dataIndex: 'destination',width: 100,render:(text:any,record:any) => {return record.destination ? record.destination : '-'} },  
        { title: 'Buyer address code', dataIndex: 'buyerAddressCode',width: 100,render:(text:any,record:any) => {return record.buyerAddressCode ? record.buyerAddressCode : '-'} },
        { title: 'Buyer address', dataIndex: 'buyerAddress',width: 500,render:(text:any,record:any) => {return record.buyerAddress ? record.buyerAddress : '-'} },     
        { title: 'Delivery address code', dataIndex: 'deliveryAddressCode',width: 100,render:(text:any,record:any) => {return record.deliveryAddressCode ? record.deliveryAddressCode : '-'} },
        { title: 'Delivery address', dataIndex: 'deliveryAddress',width: 500,render:(text:any,record:any) => {return record.deliveryAddress ? record.deliveryAddress : '-'} },
        

    ]

  


    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Ck Address Excel')
          .addColumns(exceldata)
          .addDataSource(data, { str2num: false })
          .saveAs('ck_Address.xlsx');
      }
    return(
        <Card title='Ck Address' extra={<Link to='/pvh/masters/ck-address/ck-address-excel-upload' >
        <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
        </Link>}>
            <Row justify={'end'}>
            <Button
                type="default"
                style={{ color: "green" }}
                onClick={exportExcel}
                icon={<FileExcelFilled />}
            >
                Download Excel
            </Button>
           
            </Row>
            <br/>
            <Table className="custom-table-wrapper" columns={columns} dataSource={data} size='small'
            pagination={{
                pageSize: 100, 
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                }
            }}
            />
        </Card>
    )

}

export default CkAddressView