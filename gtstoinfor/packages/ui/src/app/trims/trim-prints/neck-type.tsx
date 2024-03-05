import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';

export const NecKType = (props) => {
  const [bomInfo, setBomInfo] = useState<any>([]);

  console.log(bomInfo, "bomInfo+++++++++++++++++++++++++++++");
  const tableCellStyle = {
    border: '1px solid #dddddd',
    // textAlign: 'left',
    padding: '8px',
  };

  const tableRef = useRef(null);

  useEffect(() => {
    console.log(props.bomInfo);
    if (props.bomInfo) {
      setBomInfo(props.bomInfo);
    }
  }, [props.bomInfo]);

  const handlePrint = () => {
    const invoiceContent = document.getElementById('print');
    if (invoiceContent) {
      const devContent = invoiceContent.innerHTML;
      const printWindow = window.open('', 'PRINT', 'height=900,width=1600');

      printWindow.document.write(`
        <html>
          <head>
            <style>
              @page {
                size: legal;
                margin: 20;
              }
              body {
                margin: 0;
                transform: scale(1);
                transform-origin: top center;
                width:100%;
              }
              /* Additional styles for your content */
            </style>
          </head>
          <body>${devContent}</body>
        </html>
      `);

      //    getCssFromComponent(document, printWindow.document);

      printWindow.document.close();
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 1000); // Add a delay to ensure all content is loaded
    }
  };

  const groupDataByItemNo = () => {
    if (bomInfo && bomInfo.length > 0) {
      const groupedData = {};
      bomInfo.forEach((item) => {
        if (!groupedData[item.itemNo]) {
          groupedData[item.itemNo] = [];
        }
        groupedData[item.itemNo].push(item);
      });
      return groupedData;
    }
    return null;
  };

  const generateTables = () => {
    const groupedData = groupDataByItemNo();
    if (groupedData) {
      return Object.keys(groupedData).map((itemNo, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>Item No: {itemNo}</h3>
          <table
            style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
            border={1}
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr>
                <th style={tableCellStyle}>ITEM</th>
                <th style={tableCellStyle}>STYLE</th>
                <th style={tableCellStyle}>SEASON</th>
                <th style={tableCellStyle}>IM#</th>
                <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
                <th style={tableCellStyle}>GARMENT COLOR CODE</th>
                <th style={tableCellStyle}>TAPE COLOR</th>
                <th style={tableCellStyle}>QTY IN YARDS</th>
              </tr>
            </thead>
            <tbody>{generateRows(groupedData[itemNo])}</tbody>
          </table>
        </div>
      ));
    }
    return null;
  };

  const generateRows = (data) => {
    return data.map((item, index) => (
      <tr key={index}>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.description}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.color}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemColor}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.bomQty}</td>
      </tr>
    ));
  };

  return (
    <div id="print">
      {bomInfo && bomInfo.length > 0 ? (
        <Card title={'Neck Tape'} extra={<Button onClick={handlePrint}>Print</Button>}>
          {generateTables()}
        </Card>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default NecKType;
