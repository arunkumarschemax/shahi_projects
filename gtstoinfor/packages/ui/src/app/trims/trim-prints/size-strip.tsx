import { BomProposalReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";

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

export interface SizeStripProps {
  // bomInfo: any;
  itemId: any,
  poLines: string[]
}

export function SizeStrip(props: SizeStripProps) {
  const [bomInfo, setBomInfo] = useState([]);
  const { itemId, poLines } = props
  const service = new BomService();

  const supplier = "supplier";
  let previousItemNo = null;
  let previousImCode = null;
  let previousStyleNumber = null;
  
  useEffect(() => {      
    handleSizeStrip()
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
  function handleSizeStrip(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine =poLines
    
    service.getSizeStrip(bomProposalReq).then((v) => {
      if (v.status) {
        
        setBomInfo(v.data)
      }
    })
  }

  const tableCellStyle = {
    padding: "8px",
    border: "1px solid black", // Add border style
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
      <Card title={"Size Strip"} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
      {groupedData.map((group, groupIndex) => (     
        <table
          style={{ borderCollapse: "collapse", width: "100%" }}
          border={1}
          cellSpacing="0"
          cellPadding="0"
        >
          <thead>
            <tr>
              <th style={{...tableCellStyle, width: "5%", border: "1px solid black" }}>NIKE BUY DETAILS</th>
              <th style={{...tableCellStyle, width: "5%", border: "1px solid black" }}>IM#</th>
              <th style={{ ...tableCellStyle,width: "5%", border: "1px solid black" }}>SHAHI ITEM#</th>
              <th style={{...tableCellStyle, width: "5%", border: "1px solid black" }}>STYLE#</th>
              <th style={{...tableCellStyle, width: "5%", border: "1px solid black" }}>DESTINATION/SIZES</th>
              {allSizes.map((size: string) => (
  <th key={size.toString()} style={{ ...tableCellStyle, textAlign: "center" }}>
    {size}
  </th>
))}

            </tr>
          </thead>
          <tbody>
       {group.map((rec, rowIndex) => (
           <tr key={rowIndex}>
               {rowIndex === 0 && (
                   <>
            <td style={{ ...tableCellStyle, textAlign: "center", border: "1px solid black" }} rowSpan={group.length}>
                JAN – 1ST BUY
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }} rowSpan={group.length}>
              {rec.itemNo !== previousItemNo ? (previousItemNo = rec.itemNo) : ""}
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}rowSpan={group.length}>
              {rec.imCode !== previousImCode ? (previousImCode = rec.imCode) : ""}
            </td>

            <td style={{ textAlign: "center", border: "1px solid black" }}rowSpan={group.length}>
              {rec.styleNumber !== previousStyleNumber ? (previousStyleNumber = rec.styleNumber) : ""}
            </td>
            </>
         )}
            <td style={{...tableCellStyle, textAlign: "center", border: "1px solid black" }}>
            {rec.use !== null ? (rec.use.includes("USA") ? "USA" : "ALL") : ""}
            </td>

          
            {allSizes.map((size, sizeIndex) => {
              const sizeItem = rec.sizeWiseQty.find((s) => s.size === size);
              return (
                <td key={sizeIndex} style={{ ...tableCellStyle, textAlign: "center", borderBottom: sizeIndex === allSizes.length - 1 ? "none" : "1px solid black" }}>
                  {sizeItem ? sizeItem.qty : 0}
                </td>
              );
            })}
     </tr>
                            ))}
                        </tbody>
                        </table>
            ))}
      </Card>
    </div>
  );
}

export default SizeStrip;
