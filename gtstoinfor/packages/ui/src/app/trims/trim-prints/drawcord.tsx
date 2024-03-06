import { Button, Card, Table } from 'antd';
import React, { useState } from 'react';


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
export interface DrawcordProps {
    bomInfo: any
}
export const  Drawcord = (props: DrawcordProps) => {
console.log(props.bomInfo)
 const data=props.bomInfo
 const [drawcord, setDrawcord] = useState<any>([])


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

  return (
    <Card title={'DrawCord'}
                extra={<Button onClick={handlePrint}>Print</Button>}>
     <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                <tr>
                    <th style={{ width: '3%' }}>ITEM</th>
                    <th style={{ width: '3%' }}>STYLE</th>
                    <th style={{ width: '3%' }}>SEASON</th>
                    <th style={{ width: '3%' }}>IM#</th>
                    <th style={{ width: '3%' }}>MATERIAL DESCRIPTION</th>
                    <th style={{ width: '3%' }}>GARMENT COLOUR + CODE</th>
                    <th style={{ width: '3%' }}>TAPE COLOUR</th>
                    <th style={{ width: '3%' }}>QTY IN YDS</th>
                  
                    </tr>
                    {data.map((rec,index) =>{
                        return(
                            <tr>
                            <td style={{ textAlign: 'center' }} >{rec.itemNo !== null ? rec.itemNo:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.season !== null ? rec.season:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.description !== null ? rec.description:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.itemColor !== null ? rec.itemColor:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.color !== null ? rec.color:''}</td>
                            <td style={{ textAlign: 'center' }} >{rec.bomQty !== null ? rec.bomQty:''}</td>
                         </tr>
                        )
                      
                    })}
               
            </table>

      
    </Card>
  );
};



 

export default Drawcord;
