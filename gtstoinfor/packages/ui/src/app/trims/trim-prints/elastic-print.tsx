import { BomInfo, ItemInfoFilterReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card } from "antd"
import React from "react";
import { useEffect, useRef, useState } from "react"
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';


export interface Elasticprops {
    bomInfo: any[]
}
export const Elastic = (props: Elasticprops) => {
    const [bomInfo, setBomInfo] = useState<any>([])
    const bomService = new BomService()
    const tableRef = useRef(null);

    useEffect(() => {
        if (props.bomInfo) {
            console.log(props.bomInfo)

            setBomInfo(props.bomInfo)
        }
    }, [props.bomInfo])

    const tableCellStyle = {
       
        padding: '8px',
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
          style={{
            borderCollapse: 'collapse',
            borderBlockColor: 'black',width: '100%',  }}
          border={1}
          cellSpacing="0"cellPadding="0"
        >
                <thead>
                  <tr>
                    <th style={tableCellStyle}>ITEM</th>
                    <th style={tableCellStyle}>STYLE</th>
                    <th style={tableCellStyle}>SEASON</th>
                    <th style={tableCellStyle}>IM#</th>
                    <th style={tableCellStyle}>BALAJI SUPER SPANDEX REF#</th>
                    <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
                    <th style={tableCellStyle}>CONSUMPTION</th>
                    <th style={tableCellStyle}>GARMENT COLOR</th>
                    <th style={tableCellStyle}>GARMENT QTY</th>
                    <th style={tableCellStyle}>ELASTIC COLOR</th>
                    <th style={tableCellStyle}>REQ.IN MTRS</th>
                  </tr>
                </thead>
                <tbody>{generateRows(groupedData[itemNo])}</tbody>
                <tfoot>
                  <tr>
                  <td colSpan={10} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Total</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>
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
          const bomQtys = item?.colors.map(color => Number(color?.reqqty)) || [];
          const validQtys = bomQtys.filter(reqqty => !isNaN(reqqty));
          return total + validQtys.reduce((sum, qty) => sum + qty, 0);
        }, 0);
      };
      
      
      
      const generateRows = (data) => {
        return data.map((item, index) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <tr>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.itemNo}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.styleNumber}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
      {`${item.season}${item.year.slice(2)}`}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.imCode}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.description}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.consumption}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.color}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.totalGarmentQty}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.itemColor}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>
            { item.colors[0]?.reqqty} 
          </td>              </tr>
            )}
            {item.colors.slice(1).map((color, colorIndex) => (
              <tr key={`${index}-${colorIndex}`}>
                {index !== 0 && colorIndex === 0 && (
                  <>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }} colSpan={7}>
                      {item.itemNo}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}></td>   
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.description}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.consumption}</td>

                  </>
                  
                )}
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.color}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.totalGarmentQty}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.itemColor}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.reqqty}</td>
              </tr>
            ))}
          </React.Fragment>
        ));
      };
      


      const handlePrint = () => {
        const invoiceContent = document.getElementById("print");
        if (invoiceContent) {
          const devContent = invoiceContent.innerHTML;
          const printWindow = window.open("", "PRINT", "height=900,width=1600");
      
          printWindow.document.write(`
            <html>
              <head>
                <style>
                  @page {
                    size: legal;
                    margin: 30;
                  }
                  body {
                    margin: 0;
                    transform: scale(1);
                    transform-origin: top center;
                    width: 100%;
                  }
                  /* Additional styles for your content */
                </style>
              </head>
              <body>${devContent}</body>
            </html>
          `);
      
          printWindow.document.close();
          setTimeout(function () {
            printWindow.print();
            printWindow.close();
          }, 1000); // Add a delay to ensure all content is loaded
        }
      };
      


    return (
        <div id='print'>
                  {bomInfo && bomInfo.length > 0 ? (
            <Card title={'Elastic'}
                extra={<Button onClick={handlePrint}>Print</Button>} >
                    {generateTables()}
            </Card>
  ) : (
    <div>No data available</div>
  )}
        </div>
    )

}
export default Elastic