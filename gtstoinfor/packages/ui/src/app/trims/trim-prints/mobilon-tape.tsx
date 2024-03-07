import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';


export const getCssFromComponent = (fromDoc, toDoc) => {

  Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
      if (styleSheet.cssRules) {
          const newStyleElement = toDoc.createElement("style");
          Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
              newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
          });
          toDoc.head.appendChild(newStyleElement);
      }
  });
};
export interface MobilonTapeProps {
    bomInfo: any
}
export const  Mobilontape = (props: MobilonTapeProps) => {
console.log(props.bomInfo)
 const data=props.bomInfo


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
  
 const [bomInfo, setBomInfo] = useState([]);


 useEffect(() => {
    console.log(props.bomInfo);
    if (props.bomInfo) {
      setBomInfo(props.bomInfo);
    }
  }, [props.bomInfo]);

  
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
        <div key={index} style={{ marginBottom: '20px'}}>
          <h3>Item No: {itemNo}</h3>
          <table
            style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
            border={1}
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr>
              <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
                <th style={tableCellStyle}>ITEM</th>
                <th style={tableCellStyle}>STYLE</th>
                <th style={tableCellStyle}>UNIT</th>
                <th style={tableCellStyle}>GARMENT QTY</th>
                <th style={tableCellStyle}>CONSUMPTION MTR</th>
                <th style={tableCellStyle}>QTY IN KG</th>
              </tr>
            </thead>
            <tbody>{generateRows(groupedData[itemNo])}</tbody>
            <tfoot>
              <tr>
              <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Total</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
                  {calculateTotalBomQty(groupedData[itemNo])}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ));
    }
    return null;
  };
  const calculateTotalBomQty = (data) => {

    return data.reduce((total, item) => {
      const bomQtys = item?.colors.map(color => Number(color?.bomQty)) || [];
      const validQtys = bomQtys.filter(bomQty => !isNaN(bomQty));
      return total + validQtys.reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const tableCellStyle = {
    padding: '8px',
 };

  const generateRows = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const key = `${item.itemNo}-${item.styleNumber}-${item.season}-${item.imCode}-${item.description}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });
  
    return (Object.values(groupedData) as Array<Array<any>>).map((group, groupIndex) => (
      <React.Fragment key={groupIndex}>
        {group.map((item, index) => (
          <tr key={`${groupIndex}-${index}`}>
            {index === 0 && (
              <>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} >
                  {item.itemNo}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} >
                  {item.styleNumber}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} >
                  {item.season}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} >
                  {item.imCode}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} >
                  {item.description}
                </td>
              </>
            )}
          </tr>
        ))}
      </React.Fragment>
    ));
  };
  
  return (

    <div id="print">
    {bomInfo && bomInfo.length > 0 ? (
      <Card title={'Mobilon Tape'} extra={<Button onClick={handlePrint}>Print</Button>}>
        {generateTables()}
      </Card>
    ) : (
      <div>No data available</div>
    )}
  </div>

  );
};



 

export default Mobilontape;
