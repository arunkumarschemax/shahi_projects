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

export interface InterlinigProps {
  itemId: any,
  poLines: string[]
}
export const  Interlining = (props: InterlinigProps) => {
  const { itemId, poLines } = props
  
  const service = new BomService();
  
  const [interlining, setInterlining] = useState<any>([])

useEffect(() => {
  handleInterlining();
},[])

  function handleInterlining(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    service.generateProposalForTrims(bomProposalReq).then((res) =>{
      if(res.status){
        setInterlining(res.data)
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
   const tableCellStyle = {
    padding: '8px',
 };

 const calculateTotalBomQty = (data) => {
    return data.reduce((total, item) => {
      const bomQty = Number(item?.bomQty) || 0;
      return total + bomQty;
    }, 0);
  };
   
   const groupedData : Array<Array<any>> = Object.values(interlining.reduce((acc, item) => {
    acc[item.color] = acc[item.color] || [];
    acc[item.color].push(item);
    return acc;
  }, {}));

  return (
    <div id="print">
      <Card title={'INTERLINING'} extra={<><span><Button onClick={handlePrint}>Print</Button></span> 
       </>}>
        {groupedData.map((group, index,itemNo) => (
          <div key={index} style={{ marginBottom: '20px' }}>
             <ReactHTMLTableToExcel
              id={`excel-button-${index}`}
              className={`excel-button-${index}`}
              table={`interlining-table-${index}`}
              filename={`Interlining-${group[0].itemNo}`}
              sheet="Sheet 1"
              buttonText={`Excel-${group[0].itemNo}`}
            />
            <table id={`interlining-table-${index}` }style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th style={{ width: '3%' }}>ITEM</th>
                  <th style={{ width: '3%' }}>STYLE</th>
                  <th style={{ width: '3%' }}>IM#</th>
                  <th style={{ width: '3%' }}>COLOR</th>
                  <th style={{ width: '3%' }}>QTY</th>
                </tr>
              </thead>
              <tbody>
                {group.map((rec, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.imCode !== null ? rec.imCode : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.color !== null ? rec.color : ''}</td>
                    <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
                    {calculateTotalBomQty(group)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </Card>
    </div>
  );
};



 

export default Interlining;
