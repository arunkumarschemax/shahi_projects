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
export interface GumTapeProps{
    itemId: any,
    poLines: string[]
}
export function GumTape(props:GumTapeProps) {

    const [bomInfo, setBomInfo] = useState<any>([]);
    const { itemId, poLines } = props
    const service = new BomService();
    
    useEffect(() => {      
        handleGumTapeTrim()
        }, []);
        
        function handleGumTapeTrim(){
            const bomProposalReq = new BomProposalReq()
            bomProposalReq.itemId = [itemId]
            bomProposalReq.poLine = poLines
            console.log(bomProposalReq,"requesttttttttt");
            
            service.getProposalForGumtape(bomProposalReq).then((v) => {
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

     
  
  const groupedData: Array<Array<any>> = Object.values(bomInfo.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));

    return (
        <div  id='print'>
 <Card title={'GUM TAPE'} extra={<><span><Button onClick={handlePrint}>Print</Button></span> <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="GUM TAPE"
                filename="GUM TAPE"
                sheet="sheet 1"
                buttonText="Excel" />
       </>}>
            
            <table id ="GUM TAPE"style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
               <thead>                <tr>
                    <th style={{ width: '3%' }}>ITEM#</th>
                    <th style={{ width: '3%' }}>STYLE#</th>
                    <th style={{ width: '3%' }}>TRIM DESCRIPTION</th>
                    <th style={{ width: '3%' }}>TOTAL GUM TAPE ROLLS  REQD</th>
                    
                    </tr>
                  </thead>
                  {groupedData.map((group, groupIndex) => (

                    <tbody>
                     {group.map((rec, rowIndex) => (
                                <tr key={rowIndex}>
                                 
                                        <>
                            {/* <td style={{ textAlign: 'center',width:"3%" }} rowSpan={group.length} >{rec.itemNo !== null ? rec.itemNo:''}</td> */}
                            <td style={{ textAlign: 'center',width:"3%" }}  >{rec.itemNo !== null ? rec.itemNo:''}</td>

                            <td style={{ textAlign: 'center',width:"3%" }}  >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                            
                            <td style={{ textAlign: 'center',width:"3%" }} >{rec.description !== null ? rec.description:''}</td>
                            <td style={{ textAlign: 'center',width:"3%" }} >{rec.imCode !== null ? rec.imCode:''}</td>
                            </>
                                   
                           
                            </tr>
                            ))}
                        </tbody>
  ))}

               <tfoot>
          <tr>
          
          </tr>
        </tfoot>
            </table>

        </Card>
        </div>
       
    )


}
export default GumTape