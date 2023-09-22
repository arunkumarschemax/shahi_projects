import React, { useRef, useState } from 'react';
import { Button, Card, Descriptions, Input, Space, Table, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column } from 'rc-table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/es/table';
import { StatusEnumDisplay } from 'packages/libs/shared-models/src/common';

function ScanDetailView() {
  // Check if location and location.state are defined

  const navigate=useNavigate();
  const  rowData  = useLocation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);


  const handleBack =() =>{
    navigate('/scan-document')
  }

  const handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  
  console.log(rowData.state.rowData,"kkkkkkkkkkk")
  console.log(rowData.state.rowData.scanentity,"entity")

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
        title: 'S.No',
        key: 'sno',
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        align:"center"


    },
    {
        title: "HSN Code",
        dataIndex: "HSN",
        key:"HSN",
        ...getColumnSearchProps("HSN"),
        sorter: (a, b) => a.HSN.localeCompare(b.HSN),
        render: (_, record) =>
        record?.HSN || "-",
       align:"center"

    },
    {
        title: "Tax Type",
        dataIndex: "Taxtype",
        key:"Taxtype",
        ...getColumnSearchProps("Taxtype"),
        sorter: (a, b) => a.Taxtype.localeCompare(b.Taxtype),
        render: (_, record) =>
        record?.Taxtype || "-",
        align:"center"

    },
    {
        title: 'Tax Amount',
        dataIndex: 'Taxamount',
        key:"Taxamount",
        ...getColumnSearchProps("Taxamount"),
        sorter: (a, b) => a.Taxamount.localeCompare(b.Taxamount),
        render: (_, record) =>
        record?.Taxamount || "-",
        align:"center"

    },
    {
        title: 'Tax Percentage',
        dataIndex: 'Taxpercentage',
        key:"Taxpercentage",
        ...getColumnSearchProps("Taxpercentage"),
        sorter: (a, b) => a.Taxpercentage.localeCompare(b.Taxpercentage),
        render: (_, record) =>
        record?.Taxpercentage || "-",
        align:"center"

    },
    {
      title: 'Unit Quantity',
      dataIndex: 'unitquantity',
      key:"unitquantity",
      ...getColumnSearchProps("unitquantity"),
      sorter: (a, b) => a.unitquantity.localeCompare(b.unitquantity),
      render: (_, record) =>
      record?.unitquantity || "-",
      align:"center"

  },
  {
    title: 'Charge',
    dataIndex: 'Charge',
    key: 'Charge',
    ...getColumnSearchProps('Charge'),
    sorter: (a, b) => a.Charge.localeCompare(b.Charge),
    render: (text, record) => {
      // Parse the "Charge" value as a number
      const chargeValue = Number(record.Charge);

      // Check if it's a valid number
      if (!isNaN(chargeValue)) {
        // Format the number to two decimal places
        const formattedCharge = chargeValue.toFixed(2);
        return <>{formattedCharge}</>;
      } else {
        // Display a hyphen for non-numeric values
        return "-";
      }
    },
  },
  
  
    {
        title: 'Quatation',
        dataIndex: 'quotation',
        key:"quotation",
        ...getColumnSearchProps("quotation"),
        sorter: (a, b) => a.quotation.localeCompare(b.quotation),
        render: (_, record) =>
        record?.quotation || "-",
       align:"center"


        
       
    },
   
]
  
  return (
    
    <Card className="card-header" title="Document Details" size="small" extra={<Button className='panel_button' onClick={handleBack}>View </Button>}>

  <Descriptions>
         <Descriptions.Item
          label="Vendor Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Vendor ? rowData.state.rowData.Vendor : "--"}


        </Descriptions.Item>
        <Descriptions.Item
          label="GST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.GST ? rowData.state.rowData.GST : "--"}

        </Descriptions.Item>
       
        <Descriptions.Item
          label="InvoiceDate"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceDate ? rowData.state.rowData.invoiceDate : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="InvoiceNumber"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceNumber ? rowData.state.rowData.InnvoiceNumber : "--"}
        </Descriptions.Item>


        <Descriptions.Item
          label="IGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.IGST ? rowData.state.rowData.IGST : "--"}
        </Descriptions.Item>

        
        <Descriptions.Item
          label="CGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Cgst ? rowData.state.rowData.Cgst : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="SGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Sgst ? rowData.state.rowData.Sgst : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="InvoiceAmount"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceAmount ? rowData.state.rowData.InnvoiceAmount : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Invoice Currency"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceCurrency ? rowData.state.rowData.InnvoiceCurrency : "--"}

        </Descriptions.Item>    

        <Descriptions.Item
          label="Routing"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Routing ? rowData.state.rowData.Routing : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Comment"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Comment ? rowData.state.rowData.Comment : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Financial year"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Financialyear ? rowData.state.rowData.Financialyear : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Time Created"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Timecreated ? rowData.state.rowData.Timecreated : "--"}
        </Descriptions.Item>

        {/* <Descriptions.Item
          label="Status"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.VarianceStatus ? rowData.state.rowData.VarianceStatus : "--"} 
        </Descriptions.Item> */}
        <Descriptions.Item
        label="Status"
        labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          <Tag>
       {rowData.state.rowData.VarianceStatus ? (
       StatusEnumDisplay.find(item => item.name === rowData.state.rowData.VarianceStatus)?.displayVal
      ) : (
      "--"
       )}
       </Tag>
</Descriptions.Item>
      </Descriptions>
      

{/* <Button type="primary"  onClick={handleBack}> Back </Button> */}
<Card>
  <Table columns={columns} size='small' dataSource={rowData.state.rowData.scanentity}/>
</Card>
</Card>
  );
}

export default ScanDetailView;



