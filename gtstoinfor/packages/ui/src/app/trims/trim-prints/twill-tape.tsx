import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
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

export interface TwilltapeProps {
    bomInfo: any
}
export const  Twilltape = (props: TwilltapeProps) => {
  const data = props.bomInfo
  
  const bomservice=new BomService

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

            getCssFromComponent(document, printWindow.document);

            printWindow.document.close();
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000); // Add a delay to ensure all content is loaded
        }
   }
   const tableCellStyle = {
    padding: '8px',
 };

 const calculateTotalBomQty = (data) => {
    return data.reduce((total, item) => {
      const bomQty = Number(item?.bomQty) || 0;
      return total + bomQty;
    }, 0);
  };

  const groupedData: Array<Array<any>> = Object.values(data.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));

  
  return (
    <div id='print'>
    <Card title={'TWILL TAPE'} extra={<Button onClick={handlePrint}>Print</Button>}>
    {groupedData.map((group, groupIndex) => (
    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%'}} border={1} cellSpacing="0" cellPadding='0'>
      <thead>
        <tr>
          <th style={{ width: '3%' }}>ITEM</th>
          <th style={{ width: '3%' }}>STYLE</th>
          <th style={{ width: '3%' }}>SEASON</th>
          <th style={{ width: '3%' }}>IM#</th>
          <th style={{ width: '10%' }}>MATERIAL DESCRIPTION</th>
          <th style={{ width: '5%' }}>GARMENT COLOR CODE </th>
          <th style={{ width: '3%' }}>TAPE COLOR</th>
          <th style={{ width: '3%' }}>QTY IN YARDS</th>
        </tr>
      </thead>
      <tbody>
      {group.map((rec, rowIndex) => (
                                <tr key={rowIndex}>
                                    {rowIndex === 0 && (
                                        <>
                                            <td style={{ textAlign: 'center', width: '3%' }} rowSpan={group.length}>
                                                {rec.itemNo !== null ? rec.itemNo : ''}
                                            </td>
                                            <td style={{ textAlign: 'center', width: '3%' }} rowSpan={group.length}>
                                                {rec.styleNumber !== null ? rec.styleNumber : ''}
                                            </td>
                                            <td style={{ textAlign: 'center', width: '3%' }} rowSpan={group.length}>
                                                {rec.season !== null ? rec.season : ''}
                                            </td>
                                            <td style={{ textAlign: 'center', width: '3%' }} rowSpan={group.length}>
                                                {rec.imCode !== null ? rec.imCode : ''}
                                            </td>
                                            <td style={{ textAlign: 'center', width: '3%' }} rowSpan={group.length}>
                                                {rec.description !== null ? rec.description : ''}
                                            </td>
                                        </>
                                    )}
            <td style={{ textAlign: 'center' }}>GMT CODE - {rec.itemColor !== null ? rec.itemColor : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.color !== null ? rec.color : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
            </tr>
                            ))}
                        </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
          <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
            {calculateTotalBomQty(data)}
          </td>
        </tr>
      </tfoot>
      </table>
            ))}
  </Card>
  </div>
  );
};



 

export default Twilltape;
