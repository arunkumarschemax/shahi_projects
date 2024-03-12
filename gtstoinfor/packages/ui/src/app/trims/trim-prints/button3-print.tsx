import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";
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
export interface Button3PrintProps {
    bomInfo: any
}
export function Button3Print(props: Button3PrintProps) {
    console.log(props.bomInfo)
    const data = props.bomInfo

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
    const groupedData: Array<Array<any>> = Object.values(data.reduce((acc, rec) => {
        const itemNo = rec.itemNo || 'undefined';
        acc[itemNo] = acc[itemNo] || [];
        acc[itemNo].push(rec);
        return acc;
    }, {}));

    const countColumnOccurrences = (columnKey) => {
        const counts = {};
        data.forEach((rec) => {
          const value = rec[columnKey];
          counts[value] = (counts[value] || 0) + 1;
        });
        return counts;
      };
    
      // Determine if a cell should be merged
      const shouldMergeCell = (columnKey, value) => {
        const counts = countColumnOccurrences(columnKey);
        return counts[value] > 1;
      };

      const calculateTotalBomQty = (data) => {
        return data.reduce((total, item) => {
          const bomQty = Number(item?.bomQty) || 0;
          return total + bomQty;
        }, 0);
      };
      const tableCellStyle = {
        padding: '8px',
     };
    return (
        <div id='print'>
                <Card  title="Button" extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
            {groupedData.map((group, groupIndex) => (
                    <table key={groupIndex} style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='5'>
                        <thead>
                            <tr>
                                <th style={{ width: '3%' }}>ITEM#</th>
                                <th style={{ width: '5%' }}>STYLE#</th>
                                <th style={{ width: '3%' }}>SEASON</th>
                                <th style={{ width: '5%' }}>IM#</th>
                                <th style={{ width: '44%' }}>MATERIAL DESCRIPTION</th>
                                <th style={{ width: '5%' }}>BUTTON SIZE</th>
                                <th style={{ width: '5%' }}>GARMENT COLOR CODE</th>
                                <th style={{ width: '5%' }}>BUTTON COLOR</th>
                                <th style={{ width: '5%' }}>QTY IN PCS</th>
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
                                    <td style={{ textAlign: 'center', width: '5%' }} >{'18L'}</td>
                                    <td style={{ textAlign: 'center', width: '5%' }} >{rec.color !== null ? rec.color : ''}</td>
                                    <td style={{ textAlign: 'center', width: '5%' }} >{rec.itemColor !== null ? rec.itemColor : ''}</td>
                                    <td style={{ textAlign: 'center', width: '5%' }} >{rec.bomQty !== null ? rec.bomQty : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={8} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
                                <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
                                    {calculateTotalBomQty(group)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
            ))}

                </Card>
        </div>

    )


}
export default Button3Print