import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { BomService } from '@project-management-system/shared-services';
import { BomProposalReq } from '@project-management-system/shared-models';


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
export interface MobilonTapeProps {
 itemId:any
 poLines :string[]
}
export const  Mobilontape = (props: MobilonTapeProps) => {
    // const data = props.bomInfo

    const { itemId, poLines } = props
    const service = new BomService();

    const [mobilontape, setMobilontape] = useState<any>([])
  
    useEffect(() => {
    handleMobilontape()
  },[])
  
    function handleMobilontape(){
      const bomProposalReq = new BomProposalReq()
      bomProposalReq.itemId = [itemId]
      bomProposalReq.poLine = poLines
      // bomProposalReq.trimName = item.item
      service.generateProposalForTrims(bomProposalReq).then((res) =>{
        if(res.status){
          setMobilontape(res.data)
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
              }, 1000); 
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
    
    return (
      <div id='print'>
      <Card title={'MOBION TAPE'} extra={<Button onClick={handlePrint}>Print</Button>}>
      <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>MATERIAL - MOBILON TAPE</th>
            <th style={{ width: '3%' }}>ITEM</th>
            <th style={{ width: '3%' }}>STYLE</th>
            <th style={{ width: '3%' }}>UNIT</th>
            <th style={{ width: '3%' }}>GARMENT QTY </th>
            <th style={{ width: '3%' }}>CONSUMPTION MTR </th>
            <th style={{ width: '3%' }}>QTY IN KG</th>

          </tr>
        </thead>
        <tbody>
          {mobilontape.map((rec, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{"6MM Transparent Mobilon Tape" }</td>
              <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
              <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
              <td style={{ textAlign: 'center' }}>{''}</td>
              <td style={{ textAlign: 'center' }}>{rec.poQty !== null ? rec.poQty : ''}</td>
              <td style={{ textAlign: 'center' }}>{'0.46'}</td>
              <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
            <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
              {calculateTotalBomQty(mobilontape)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
    </div>
    );
  };



 

export default Mobilontape;
