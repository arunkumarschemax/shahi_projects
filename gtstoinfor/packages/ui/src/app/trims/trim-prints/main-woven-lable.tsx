import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';

const MainWovenLabel = (props) => {
  const [bomInfo, setBomInfo] = useState([]);

  const data = bomInfo
  const tableCellStyle = {
    padding: '8px',
  };
  useEffect(() => {
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
                width: 100%;
              }
              /* Additional styles for your content */
  
              /* Add a counter to track the page number */
              @page {
                counter-increment: page;
              }
  
              /* Apply styles only to the last page */
              body:after {
                content: counter(page);
                position: absolute;
                top: 0;
                right: 0;
                padding: 10px;
                background-color: white;
                color: black;
              }
  
              body:last-of-type:after {
                content: 'Last Page';
                /* Additional styles for the last page marker */
              }
            </style>
          </head>
          <body>${devContent}</body>
        </html>
      `);
  
      printWindow.document.close();
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };
  

  const groupDataBySize = () => {
    if (bomInfo && bomInfo.length > 0) {
      const groupedData = {
        sizeWiseQty: [],
        TsizeWiseqty: [],
        SsizeWiseqty: [],
      };

      bomInfo.forEach((item) => {
        groupedData.sizeWiseQty.push(...item.sizeWiseQty);
        groupedData.TsizeWiseqty.push(...item.TsizeWiseqty);
        groupedData.SsizeWiseqty.push(...item.SsizeWiseqty);
      });

      return groupedData;
    }

    return null;
  };

  const generateTables = () => {
    const groupedData = groupDataBySize();

    if (groupedData) {
      return (
        <>
          {/* SizeWiseQty */}
          
          {groupedData.sizeWiseQty.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
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
                  <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
                  {groupedData.sizeWiseQty.map((sizeItem) => (
                    <th key={sizeItem.size} style={tableCellStyle}>{sizeItem.size}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{generateRows(groupedData.sizeWiseQty)}</tbody>
            </table>
          </div>
        )}
          
                    {groupedData.TsizeWiseqty.length > 0 && (
  <div style={{ marginBottom: '20px' }}>
    <h3>TsizeWiseqty</h3>
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
          <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
          <th style={tableCellStyle}>Size</th>
          <th style={tableCellStyle}>Qty</th>
          <th style={tableCellStyle}>TOTAL</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>{generateRows(groupedData.TsizeWiseqty)}</tbody>
    </table>
  </div>
)}

          {groupedData.SsizeWiseqty.length > 0 && (
  <div style={{ marginBottom: '20px' }}>
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
          <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
          <th style={tableCellStyle}>Size</th>
          <th style={tableCellStyle}>Qty</th>
          <th style={tableCellStyle}>TOTAL</th>
        </tr>
      </thead>
      <tbody>{generateRows(groupedData.SsizeWiseqty)}</tbody>
    </table>
  </div>
)}

        </>
      );
    }

    return null;
  };


const generateRows = (bomInfo) => {
    if (!bomInfo || bomInfo.length === 0) {
      return null;
    }
  
    const allSizes = Array.from(
      new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
    );
  
    return data.map((item, index) => (
      <tr key={item.itemNo || index}>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
        {allSizes.map((size) => {
          const sizeItem = item.sizeWiseQty.find((s) => s.size === size);
          return (
            <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
              {sizeItem ? sizeItem.qty : 0}
            </td>
          );
        })}
      </tr>
    ));

    
    const allTSizes1 = Array.from(
        new Set(data.flatMap((item) => item.TsizeWiseqty.map((sizeItem) => sizeItem.size)))
      );
    

    return data.map((item, index) => (
        <tr key={item.itemNo || index}>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
          {allTSizes1.map((size) => {
            const sizeItem = item.TsizeWiseqty.find((s) => s.size === size);
            return (
              <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
                {sizeItem ? sizeItem.qty : 0}
              </td>
            );
          })}
        </tr>
      ));

      const allSSizes2 = Array.from(
        new Set(data.flatMap((item) => item.SsizeWiseqty.map((sizeItem) => sizeItem.size)))
      );
    

    return data.map((item, index) => (
        <tr key={item.itemNo || index}>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
          {allSSizes2.map((size) => {
            const sizeItem = item.SsizeWiseqty.find((s) => s.size === size);
            return (
              <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
                {sizeItem ? sizeItem.qty : 0}
              </td>
            );
          })}
        </tr>
      ));
  };
  

  return (
    <Card title={'Main Woven Label'} extra={<Button onClick={handlePrint}>Print</Button>}>
      <div id="print">
        {generateTables()}
      </div>
    </Card>
  );
};

export default MainWovenLabel;