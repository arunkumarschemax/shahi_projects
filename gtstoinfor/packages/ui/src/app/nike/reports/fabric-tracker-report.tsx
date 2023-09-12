import { FileExcelFilled, SearchOutlined } from "@ant-design/icons";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Input, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

export function FabricTrackerReport() {
    const [gridData, setGridData] = useState<any[]>([]);
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const service = new NikeService();




    useEffect(() => {
        getData();
      }, [])
    
      const getData = () => {
        service.getFabricTrackerReport().then(res => {
          if (res.status) {
            setGridData(res.data)
            // setFilterData(res.data)
            setFilteredData(res.data)
          }
        }).catch(err => {
          console.log(err.message)
        })
      }
     console.log(gridData,"--------")
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };
      const handleExport = (e: any) => {
        e.preventDefault();
    
    
        const currentDate = new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .join("/");
    
        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
          { title: 'Item', dataIndex: 'item' },
          { title: 'Factory', dataIndex: 'factory' },
          { title:'PCD', dataIndex:''},
          { title: 'Document Date', dataIndex: 'documentDate' },
          { title: 'Purchase Order Number', dataIndex: 'purchaseOrderNumber' },
          { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
          {title:"Planning Season Code", dataIndex:'planningSeasonCode' },
          { title:"Planning Season Year", dataIndex:'planningSeasonYear'},
          {title:"Style Number", dataIndex:'styleNumber'},
          {title:"Product Code", dataIndex:'productCode'},
          { title: 'Colour Description', dataIndex: 'colorDesc' },
          {title:"Nike Fabric IM Code", dataIndex:''},
          {title:"CRM Fabric Code", dataIndex:''},
          {title:"Fabric Component Type", dataIndex:''},
          {title:"FABRIC QUALITY DESCRIPTION", dataIndex:''},
          {title:"Fabric Width", dataIndex:''},
          {title:"MILL", dataIndex:''},
          {title:"MRGAC", dataIndex:'MRGAC'},
          {title:"OGAC", dataIndex:'OGAC'},
          {title:"GAC", dataIndex:'GAC'},
          {title:"Consumption", dataIndex:''},
          {title:"Wastage%", dataIndex:''},
          {title:"Shipping Type", dataIndex:'shippingType'},
          {title:"Total Item Quantity",dataIndex:'totalItemQty'},
          {title:"Total Required Fabric Quantity", dataIndex:''},
          {title:"Total Inhoused Qty", dataIndex:''},
          {title:"Total Inhoused%", dataIndex:''},
          {title:"balance to Inhouse",dataIndex:''},
          {title:"balance to Inhouse%", dataIndex:''},
          {title:"MRP plan Required Inhouse date",dataIndex:'mrpPlanRequiredInhouseQty'},
          {title:"MRP plan Required Inhouse QTY" ,dataIndex:''},
          {title:"Actual Inhouse against MRP", dataIndex:''},
          {title:"balance to Inhouse Against MRP Plan", dataIndex:''} 
         
        ]
    
    
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`fabric-tracker-report-${currentDate}.xlsx`);
      }
    


      const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
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
            <Button size="small" style={{ width: 90 }}
          onClick={() => {
            handleReset(clearFilters)
            setSearchedColumn(dataIndex);
            confirm({ closeDropdown: true });
          }}>
          Reset
        </Button>
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
            : false,
        onFilterDropdownVisibleChange: visible => {
          if (visible) { setTimeout(() => searchInput.current.select()); }
        },
        render: text =>
          text ? (
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ) : text
          )
            : null
    
      });

    const columns: any = [
        {
            title: "SL",
            render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
      
          },
          {
            title: 'Item',
            dataIndex: 'item',
           
          },
          {
            title: 'Factory',
            dataIndex: 'factory',   
      
          },
          {
            title: 'Document Date',
            dataIndex: 'documentDate',
            // render: (text, record) => {
            //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
            // }
          },
          {
            title: 'Purchase Order Number',
            dataIndex: 'purchaseOrderNumber',
          },
          {
            title: 'PO Line Item Number',
            dataIndex: 'poLineItemNumber'
          },
      
          {
      
            title: "Planning Season Code",
            dataIndex: 'planningSeasonCode',  
          },
          {
            title:"Planning Season Year",
            dataIndex:'planningSeasonYear'
          },
          {
            title: 'Style Number',
            dataIndex: 'styleNumber',
      
          },
          {
            title: 'Product Code',
            dataIndex: 'productCode',
            sorter: (a, b) => a.productCode.length - b.productCode.length,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('productCode'),
      
      
          },
          {
            title: 'Colour Description',
            dataIndex: 'colorDesc'
          },
          {
            title:"MRGAC",
            dataIndex:'MRGAC'

          },
          {
            title:"OGAC",
            dataIndex:'OGAC'

          },
          {
            title:"GAC",
            dataIndex:'GAC'

          },
          {
            title:"Shipping Type",
            dataIndex:'shippingType'

          },
          {
            title: 'Total Item Qty',
            dataIndex: 'totalItemQty'
          },


          {
            title: 'MRP plan Required Inhouse QTY',
            dataIndex: 'mrpPlanRequiredInhouseQty', 
          }, 
    ]

    return (
        <>
            <Card title="FabricTrackerReport" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={filteredData.length > 0 ? <Button
          type="default"
          style={{ color: 'green' }}
          onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button> : null}>
                <Table
                    columns={columns}
                    dataSource={gridData}
                    scroll={{  x: 'max-content' }}
                    className="custom-table-wrapper"
                    bordered
                ></Table>
            </Card>
        </>
    )
}
export default FabricTrackerReport;