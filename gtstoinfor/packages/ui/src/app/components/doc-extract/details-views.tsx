import React from 'react';
import { Button, Card, Descriptions } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

function ScanDetailView() {
  // Check if location and location.state are defined

  const navigate=useNavigate();
  const  rowData  = useLocation();

  const handleBack =() =>{
    navigate('/scan-document')
  }
  
  console.log(rowData.state.rowData,"kkkkkkkkkkk")
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card style={{ width: '1000px' }}>
  <Descriptions>
        {/* <Descriptions.Item
          label="Sno"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.typeId}
        </Descriptions.Item> */}
         <Descriptions.Item
          label="Vendor Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Vendor}

        </Descriptions.Item>
        <Descriptions.Item
          label="GST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.GST}
        </Descriptions.Item>
       
        <Descriptions.Item
          label="InvoiceDate"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceDate}

        </Descriptions.Item>
        <Descriptions.Item
          label="InnvoiceNumber"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceNumber}

        </Descriptions.Item>

        <Descriptions.Item
          label="CGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Cgst}

        </Descriptions.Item>

        <Descriptions.Item
          label="IGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.IGST}

        </Descriptions.Item>

        <Descriptions.Item
          label="SGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Sgst}

        </Descriptions.Item>

        <Descriptions.Item
          label="InnvoiceAmount"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceAmount}

        </Descriptions.Item>

        <Descriptions.Item
          label="Innvoice Currency"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceCurrency}
        </Descriptions.Item>    

        <Descriptions.Item
          label="Routing"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Routing}
        </Descriptions.Item>

        <Descriptions.Item
          label="Innvoice Currency"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceCurrency}
        </Descriptions.Item>

        <Descriptions.Item
          label="Innvoice Currency"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.InnvoiceCurrency}
        </Descriptions.Item>

        <Descriptions.Item
          label="Comment"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Comment}
        </Descriptions.Item>

        <Descriptions.Item
          label="Financialyear"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Financialyear}
        </Descriptions.Item>

        <Descriptions.Item
          label="Timecreated"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Timecreated}
        </Descriptions.Item>
      </Descriptions>

<Button type="primary"  onClick={handleBack}> Back </Button>
</Card>
</div>
  );
}

export default ScanDetailView;





