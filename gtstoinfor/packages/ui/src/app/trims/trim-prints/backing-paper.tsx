import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React, { useEffect, useState } from "react";
import { BomProposalReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

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
export interface BackingPaperProps{
    itemId: any,
    poLines: string[]
}
export function BackingPaper(props:BackingPaperProps) {

    const [bomInfo, setBomInfo] = useState<any>([]);
    const { itemId, poLines } = props
    const service = new BomService();
    
    useEffect(() => {      
        handleBackingPaper()
        }, []);
        
function handleBackingPaper(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
        setBomInfo(v.data)
      }
    })
  }

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
  
  const groupedData: Array<Array<any>> = Object.values(bomInfo.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));

    return (
        <div  id='print'>
 <Card title={'BACKING PAPER'} extra={<><span><Button onClick={handlePrint}>Print</Button></span> <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="backing paper"
                filename="Backing Paper"
                sheet="sheet 1"
                buttonText="Excel" />
       </>}>
            
            <table id ="backing paper"style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
               <thead>                <tr>
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
                  </thead>
                  {groupedData.map((group, groupIndex) => (

                    <tbody>
                     {group.map((rec, rowIndex) => (
                                <tr key={rowIndex}>
                                    {rowIndex === 0 && (
                                        <>
                            <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length} >{rec.itemNo !== null ? rec.itemNo:''}</td>
                            <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                            
                            <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length}>INTERLINING</td>
                            <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length}>{rec.imCode !== null ? rec.imCode:''}</td>
                            <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length}>{rec.description !== null ? rec.description:''}</td>
                            </>
                                    )}
                            <td style={{ textAlign: 'center',width:"3%" }} >BUTTON HOLE</td>
                            <td style={{ textAlign: 'center',width:"3%" }} >{rec.color !== null ? rec.color:''}-{rec.combination !== null ?rec.combination:''}</td>
                            <td style={{ textAlign: 'center',width:"3%" }} >{rec.itemColor !== null ? rec.itemColor:''}</td>
                            <td style={{ textAlign: 'center',width:"3%" }} >{rec.bomQty !== null ? rec.bomQty:''}</td>
                            </tr>
                            ))}
                        </tbody>
  ))}

               <tfoot>
          <tr>
            <td colSpan={8} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
            <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
              {calculateTotalBomQty(bomInfo)}
            </td>
          </tr>
        </tfoot>
            </table>

        </Card>
        </div>
       
    )


}
export default BackingPaper