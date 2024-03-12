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
export interface BackingPapertProps{
bomInfo:any
}
export function BackingPaper(props:BackingPapertProps) {
console.log(props.bomInfo,"********************************")
const data = props.bomInfo
console.log(props.bomInfo.map((e)=> e.itemId));


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
   };
   const tableCellStyle = {
    padding: '8px',
 };
     
   const calculateTotalBomQty = (data) => {
    return data.reduce((total, item) => {
      const bomQty = Number(item?.bomQty) || 0;
      return total + bomQty;
    }, 0);
  };
    return (
        <div  id='print'>
 <Card title={'BACKING PAPER'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
            <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                <tr>
                    <th style={{ width: '3%' }}>ITEM#</th>
                    <th style={{ width: '3%' }}>STYLE#</th>
                    <th style={{ width: '3%' }}>TRIM</th>
                    <th style={{ width: '3%' }}>IM#</th>
                    <th style={{ width: '5%' }}>DESC</th>
                    <th style={{ width: '3%' }}>USED AT</th>
                    <th style={{ width: '3%' }}>GMT CLR</th>
                    <th style={{ width: '3%' }}>INTERLINING CLR</th>
                    <th style={{ width: '3%' }}>REQ</th>
                    </tr>
                    <tbody>
                        {data?.map((rec,index) =>{
                      console.log(data,"LLLLLLLLLLLLLL");
                      
                        return(
                            <tr>
                            <td style={{ textAlign: 'center' }} >{rec.itemNo !== null ? rec.itemNo:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.trim !== null ? rec.trim:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.description !== null ? rec.description:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.use !== null ? rec.use:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.color !== null ? rec.color:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.itemColor !== null ? rec.itemColor:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.bomQty !== null ? rec.bomQty:''}</td>
                         </tr>
                        )
                      
                    })}
                    </tbody>

               <tfoot>
          <tr>
            <td colSpan={8} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
            <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
              {calculateTotalBomQty(data)}
            </td>
          </tr>
        </tfoot>
            </table>
        </Card>
        </div>
       
    )


}
export default BackingPaper