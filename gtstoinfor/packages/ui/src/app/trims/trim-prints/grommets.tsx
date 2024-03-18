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
export interface GrommetsProps{
    itemId: any,
    poLines: string[]
}
export function Grommets(props:GrommetsProps) {

const { itemId, poLines } = props
const service = new BomService();
const [grommets, setGrommets] = useState<any>([])

useEffect(() => {
    handleButtonTrim()
},[])

function handleButtonTrim(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
        setGrommets(v.data)
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
   }
  
   const groupedData: Array<Array<any>> = Object.values(grommets.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));

    return (
        <div  id='print'>
       <Card title={'GROOMETS'}  extra={<><span><Button onClick={handlePrint}>Print</Button></span> <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="grommets-table"
                filename="Grommets"
                sheet="sheet 1"
                buttonText={<span><Button type="primary">Excel</Button></span>}/>
       </>}>
      
            <table id="grommets-table" style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                 <thead>
                <tr>
                    <th style={{ width: '3%' }}>ITEM#</th>
                    <th style={{ width: '3%' }}>STYLE#</th>
                    <th style={{ width: '3%' }}>SEASON</th>
                    <th style={{ width: '3%' }}>MATERIAL</th>
                    <th style={{ width: '3%' }}>MATERIAL DESCRIPTION</th>
                    <th style={{ width: '3%' }}>IM#</th>
                    <th style={{ width: '5%' }}>SNAP SIZE</th>
                    <th style={{ width: '3%' }}>SNAP COLOUR</th>
                    <th style={{ width: '3%' }}>REQUIREMENT IN GROSS(With set)</th>
                    <th style={{ width: '3%' }}>SUPPLIER</th>
                    </tr>
                    </thead>
        {groupedData.map((group, groupIndex) => (
                    <tbody>
      {group.map((rec, rowIndex) => (
                                <tr key={rowIndex}>
                                    {rowIndex === 0 && (
                                        <>
                            <td style={{ textAlign: 'center' }} rowSpan={group.length}>{rec.itemNo !== null ? rec.itemNo:''}</td>
                            <td style={{ textAlign: 'center' }} rowSpan={group.length}>{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                            <td style={{ textAlign: 'center' }} rowSpan={group.length}>{rec.season !== null ? rec.season:''}</td>
                            <td style={{ textAlign: 'center' }} rowSpan={group.length}>{rec.trim !== null ? rec.trim:''}</td>
                            <td style={{ textAlign: 'center' }} rowSpan={group.length}>{rec.description !== null ? rec.description:''}</td>
                            </>
                                    )}
                            <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
                            <td style={{ textAlign: 'center' }}>  {`${rec.attributeValue !== null ? rec.attributeValue:" "}${rec.attribute !== null ? rec.attribute:" "}`}</td>

                            <td style={{ textAlign: 'center' }}>{rec.itemColor !== null ? rec.itemColor : ' '}</td>
                            <td style={{ textAlign: 'center' }}> {rec.bQty !== null && rec.poQty !== null && rec.bQty !== null ? (rec.bQty * rec.poQty * rec.bQty) : ' '}</td>
                           <td style={{ textAlign: 'center' }}>supplier</td>
                       
                         </tr>
                         ))}
                         
                        </tbody>
            ))}
                        
               </table>
        </Card>
        </div>
       
    )


}
export default Grommets;