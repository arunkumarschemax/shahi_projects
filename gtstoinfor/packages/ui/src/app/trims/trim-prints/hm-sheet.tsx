import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';
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

export interface HmSheetProps {
  itemId: any,
  poLines: string[]
}
export const  HmSheet = (props: HmSheetProps) => {
  const { itemId, poLines } = props
  
  const service = new BomService();
  
  const [hmsheet, setHmsheet] = useState<any>([])

useEffect(() => {
    handleHmsheet();
},[])

function handleHmsheet(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    service.generateProposalForHmSheet(bomProposalReq).then((v) => {
      if (v.status) {
        setHmsheet(v.data)
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
 
   
   const groupedData : Array<Array<any>> = Object.values(hmsheet.reduce((acc, item) => {
    acc[item.color] = acc[item.color] || [];
    acc[item.color].push(item);
    return acc;
  }, {}));

  return (
    <div id="print">
      <Card title={'HM SHEET'} extra={<><span><Button onClick={handlePrint}>Print</Button></span> 
      <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="Hm-table"
                filename="HM-Sheet"
                sheet="sheet 1"
                buttonText={<span><Button >Excel</Button></span>}/>
       </>}>
        
            <table id="Hm-table" style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th style={{ width: '3%' }}>ITEM</th>
                  <th style={{ width: '3%' }}>STYLE</th>
                  <th style={{ width: '3%' }}>FACTORY</th>
                  <th style={{ width: '3%' }}>QTY</th>
                  <th style={{ width: '3%' }}>SIZE</th>
                </tr>
              </thead>
        {groupedData.map((group, index,itemNo) => (

              <tbody>
                {group.map((rec, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
                    <td style={{ textAlign: 'center' }}>{"U-26"}</td>
                    <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.teflonSheetSize !== null ? rec.teflonSheetSize : ''}</td>
                  </tr>
                ))}
              </tbody>
        ))}
            
            </table>
      </Card>
    </div>
  );
};



 

export default HmSheet;
