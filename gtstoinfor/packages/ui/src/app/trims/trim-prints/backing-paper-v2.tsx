import { BomProposalReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
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

export interface BackingPaperV2Props {
  // bomInfo: any;
  itemId: any,
  poLines: string[]
}

export function BackingPaperV2(props: BackingPaperV2Props) {
  const [bomInfo, setBomInfo] = useState([]);
  const { itemId, poLines } = props
  const service = new BomService();

  const supplier = "supplier";
  let previousItemNo = null;
  let previousImCode = null;
  let previousStyleNumber = null;
  
  useEffect(() => {      
    handleBackingPaperV2Trim()
    }, []);
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
  function handleBackingPaperV2Trim(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    console.log(bomProposalReq,"requesttttttttt");
    
    service.getBackingPaperV2(bomProposalReq).then((v) => {
      if (v.status) {
        setBomInfo(v.data)
      }
    })
  }
  const tableCellStyle = {
    // padding: "8px",
    // border: "1px solid black", // Add border style
  };

  const groupedData: Array<Array<any>> = Object.values(bomInfo.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));

  const allSizes = Array.from(
    new Set(bomInfo.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
  );

  return (
    <div id="print">
      <Card title={"Backing Paper V2"} extra={<><span><Button onClick={handlePrint}>Print</Button></span>
      <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="Backing Paper V2"
                filename="Backing Paper V2"
                sheet="sheet 1"
                buttonText="Excel" />
      </>}>
        <table
        id="Backing Paper V2"
        style={{ borderCollapse: "collapse", width: "100%" }}
        border={1}
        cellSpacing="0"
        cellPadding="0"
        >
          <thead>
            <tr>
              <th style={{...tableCellStyle, border: "1px solid black" }}>ITEM#</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>STYLE#</th>
              <th style={{ ...tableCellStyle, border: "1px solid black" }}>TRIM</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>DESC</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>USED AT</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>GMT CLR</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>INTERLINING CLR</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>GMT QTY</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>CONS IN MTR</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>REQ IN MTR</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>EXCESS 3%</th>
              <th style={{...tableCellStyle, border: "1px solid black" }}>ORDERED IN MTR</th>

       

            </tr>
          </thead>
{groupedData.map((group, groupIndex) => (     
          <tbody>
       {group.map((rec, rowIndex) => (
           <tr key={rowIndex}>
               {rowIndex === 0 && (
                   <>
           
            </>
         )}

            <td style={{ textAlign: "center",width:'50px', border: "1px solid black" }} >
            {rec.itemNo !== null ? rec.itemNo:''}
            </td>

            <td style={{ textAlign: "center",width:'70px', border: "1px solid black" }}>
            {rec.styleNumber !== null ? rec.styleNumber:''}
            </td>

            <td style={{ textAlign: "center",width:'80px', border: "1px solid black" }}>
            INTERLINING
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}>
            {rec.description !== null ? rec.description:''}
            </td>

            <td style={{ textAlign: "center",width:'80px', border: "1px solid black" }}>
              BTN HOLE
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}>
            {rec.color !== null ? rec.color:''}-{rec.combination !== null ?rec.combination:''}
            </td>
            
            <td style={{ textAlign: "center", border: "1px solid black" }}>
           { rec.itemColor !== null ? rec.itemColor:''}
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}>
          {rec.bomQty !== null? rec.bomQty:''}
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}>
           {rec.consumption !== null ? rec.consumption:''}
            </td>
            <td style={{ textAlign: "center", border: "1px solid black" }}>
              {rec.bomQty !== null ? rec.bomQty:''}
            </td>
            <td style={{ textAlign: "center", border: "1px solid black" }}>
              {rec.wastage !== null ? rec.wastage:''}
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}>
               {rec.poQty * rec.consumption}
            </td>
          
     </tr>
                            ))}
                        </tbody>
            ))}
                        </table>
      </Card>
    </div>
  );
}

export default BackingPaperV2;
