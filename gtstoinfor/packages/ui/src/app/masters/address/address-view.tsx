import { FileExcelFilled, SearchOutlined } from "@ant-design/icons";
import { AddressService } from "@project-management-system/shared-services";
import { Button, Card, Input, Row, Table } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { ColumnProps } from "antd/es/table"
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

export const AddressView = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const service = new AddressService()
    const [data,setData] = useState<any[]>([])
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);


    useEffect(() => {
        getInfo()
    },[])

    const getInfo = () => {
        service.getAddressInfo().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

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

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };
    
  

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
            // title:'Bill To',
            title:<div style={{textAlign:"center"}}>Bill To</div>,

            dataIndex:'billTo',
            sorter: (a, b) => a.billTo.localeCompare(b.billTo),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('billTo')


        },
        {
            title:'Buyer Code',
            dataIndex:'buyerCode',
            align:"center",
            // width:"60px",
            sorter: (a, b) => {
                const codeA = (a.buyerCode || "").toString();
                const codeB = (b.buyerCode || "").toString();
                return codeA.localeCompare(codeB);
            },
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('buyerCode')
        },
        {
            // title:'Buyer Address',
            title:<div style={{textAlign:"center"}}>Buyer Address</div>,
            dataIndex:'buyerAddress',
            sorter: (a, b) => {
                const codeA = (a.buyerAddress || "").toString();
                const codeB = (b.buyerAddress || "").toString();
                return codeA.localeCompare(codeB);
            },
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('buyerAddress')
            // align:'right'
        },
       
        {
            // title:'Ship To',
            title:<div style={{textAlign:"center"}}>Ship To</div>,
            dataIndex:'shipTo',
            sorter: (a, b) => a.shipTo.localeCompare(b.shipTo),
            sortDirections: ["ascend", "descend"],
            
            ...getColumnSearchProps('shipTo')
            
            // align:'right'
        },
        {
            title:'Delivery Code',
            dataIndex:'deliveryCode',
            align:"center",
            sorter: (a, b) => {
                const codeA = (a.deliveryCode || "").toString();
                const codeB = (b.deliveryCode || "").toString();
                return codeA.localeCompare(codeB);
            },
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('deliveryCode')

            // align:'right'
        },
        {
            // title:'Delivery Address',
            title:<div style={{textAlign:"center"}}>Delivery Address</div>,

            dataIndex:'deliveryAddress',
            sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('deliveryAddress')

            // align:'right'
        },
    ]

    let i = 1;
    const exceldata = [
        // { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
        
        { title: 'Bill To', dataIndex: 'billTo',render:(text:any,record:any) => {return record.billTo ? record.billTo : '-'} },
        { title: 'Buyer Code', dataIndex: 'buyerCode',render:(text:any,record:any) => {return record.buyerCode ? record.buyerCode : '-'} },
        { title: 'Buyer Address', dataIndex: 'buyerAddress',render:(text:any,record:any) => {return record.buyerAddress ? record.buyerAddress : '-'} },
        { title: 'Ship To', dataIndex: 'shipTo',render:(text:any,record:any) => {return record.shipTo ? record.shipTo : '-'} },
        { title: 'Delivery Code', dataIndex: 'deliveryCode',render:(text:any,record:any) => {return record.deliveryCode ? record.deliveryCode : '-'} },
        { title: 'Delivery Address', dataIndex: 'deliveryAddress',render:(text:any,record:any) => {return record.deliveryAddress ? record.deliveryAddress : '-'} }

    ]

    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Address Excel')
          .addColumns(exceldata)
          .addDataSource(data, { str2num: true })
          .saveAs('Address.xlsx');
      }
    return(
        <Card title='Address' extra={<Link to='/ralph-lauren/masters/address/address-excel-upload' >
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
            <Table className="custom-table-wrapper" columns={columns} dataSource={data} size='small'
              scroll={{x:true}}
              pagination={{
               pageSize:50,
               onChange(current) {
                 setPage(current);
               }
             }}
            />
        </Card>
    )

}

export default AddressView