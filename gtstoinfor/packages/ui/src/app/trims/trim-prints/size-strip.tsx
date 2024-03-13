// import { PrinterOutlined } from "@ant-design/icons";
// import { Button, Card, Col, Row } from "antd";
// import { useLocation } from "react-router-dom";
// import { Shahi } from "../SHAHI";
// import { HTTP } from "../http";
// import React from "react";
// import { BomInfo } from "@project-management-system/shared-models";
// export const getCssFromComponent = (fromDoc, toDoc) => {

//     Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
//         if (styleSheet.cssRules) {
//             const newStyleElement = toDoc.createElement("style");
//             Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
//                 newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
//             });
//             toDoc.head.appendChild(newStyleElement);
//         }
//     });
// };
// export interface SizeStripProps{
// bomInfo:any
// }
// export function SizeStrip(props:SizeStripProps) {
// console.log(props.bomInfo,"********************************")
// const data = props.bomInfo
// console.log(props.bomInfo.map((e)=> e.itemId));
// const supplier = "supplier";
//  const handlePrint = () => {
//     const invoiceContent = document.getElementById("print");
//     if (invoiceContent) {
//         const devContent = invoiceContent.innerHTML;
//         const printWindow = window.open("", "PRINT", "height=900,width=1600");

//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <style>
//                         @page {
//                             size: legal;
//                             margin: 20;
//                         }
//                         body {
//                             margin: 0;
//                             transform: scale(1);
//                             transform-origin: top center;
//                             width:100%;
//                         }
//                         /* Additional styles for your content */
//                     </style>
//                 </head>
//                 <body>${devContent}</body>
//             </html>
//         `);

//             getCssFromComponent(document, printWindow.document);

//             printWindow.document.close();
//             setTimeout(function () {
//                 printWindow.print();
//                 printWindow.close();
//             }, 1000); // Add a delay to ensure all content is loaded
//         }
//    }
//    const tableCellStyle = {
//     padding: '8px',
//   };
//    const allSizes = Array.from(
//     new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
//   );
//   <table
//       style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
//       border={1}
//       cellSpacing="0"
//       cellPadding="0"
//     >
//   <tr>
//       <th style={{ width: '3%' }}>NIKE BUY DETAILS</th>
//       <th style={{ width: '3%' }}>IM#</th>
//       <th style={{ width: '3%' }}>SHAHI ITEM#</th>
//       <th style={{ width: '3%' }}>STYLE#</th>
//       <th style={{ width: '3%' }}>DESTINATION/SIZES</th>
       
//       </tr>
//       </table>

          
//           return data.map((rec, index) => (
//               <tr>
//               <td style={{ textAlign: 'center' }} >JAN – 1ST BUY</td>
//               <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
//               <td style={{ textAlign: 'center' }} >{rec.itemNo !== null ? rec.itemNo:''}</td>

//               {/* <td style={{ textAlign: 'center' }} >{rec.trim !== null ? rec.trim:''}</td> */}
//               <td style={{ textAlign: 'center' }} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
//               <td style={{ textAlign: 'center' }} >{rec.destination !== null ? rec.destination:''}</td>
//               {allSizes.map((size) => {
//                   const sizeItem = rec.sizeWiseQty.find((s) => s.size === size);
//                   return (
//                       <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
//                 {sizeItem ? sizeItem.qty : 0}
//                 </td>
//                 );
//             })}
            
//            </tr>
//           ));
        
   


//     return (
//         <div  id='print'>
//        <Card title={'Size Strip'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
          
//         </Card>
//         </div>
       
//     )


// }
// export default SizeStrip

import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";
import { BomInfo } from "@project-management-system/shared-models";

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
  bomInfo: any;
}

export function SizeStrip(props: SizeStripProps) {
  console.log(props.bomInfo, "********************************");
  const data = props.bomInfo;
  console.log(props.bomInfo.map((e) => e.itemId));
  const supplier = "supplier";
  let previousItemNo = null;
let previousImCode = null;
let previousStyleNumber = null;
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
    padding: "8px",
    border: "1px solid black", // Add border style
  };
  const groupedData: Array<Array<any>> = Object.values(data.reduce((acc, rec) => {
    const itemNo = rec.itemNo || 'undefined';
    acc[itemNo] = acc[itemNo] || [];
    acc[itemNo].push(rec);
    return acc;
}, {}));
  const allSizes = Array.from(
    new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
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
