import { BomProposalReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

export interface poidProps {
  itemId: any,
  poLines: string[]
}
export function POIDLable(props: poidProps) {
    const [bomInfo, setBomInfo] = useState([]);
    const { itemId, poLines } = props
    const service = new BomService();
useEffect(() => {
  handlePoidLable()
  }, []);

  function handlePoidLable(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    // bomProposalReq.trimName = item.item
    service.generateProposalForPOIDLabel(bomProposalReq).then((res) =>{
      if(res.status){
        setBomInfo(res.data)
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


            printWindow.document.close();
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000); // Add a delay to ensure all content is loaded
        }
    }
    const calculateTotalBomQty = (data) => {
        let total = 0;
        data.forEach(item => {
            const bomQty = Number(item?.bomQty) || 0;
            total += bomQty !== 0 ? Number((bomQty / 60000).toFixed(2)) : 0;
        });
        return total;
    };
    
      const tableCellStyle = {
        padding: '8px',
     };

     function calculateBomQty(rec) {
        if (rec.bomQty !== null) {
            return (rec.bomQty / 60000).toFixed(2);
        } else {
            return '';
        }
    }
    
    return (
        <div id='print'>
                <Card  title="Poid Label" extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
                <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
      <thead>
        <tr>
          <th style={{ width: '3%' }}>ITEM</th>
          <th style={{ width: '3%' }}>UNIT</th>
          <th style={{ width: '3%' }}>STYLE</th>
          <th style={{ width: '3%' }}>TOTAL</th>
          <th style={{ width: '3%' }}>3% EXCESS</th>
          <th style={{ width: '3%' }}>POID KITS</th>
        </tr>
      </thead>
      <tbody>
        {bomInfo.map((rec, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
            <th style={{  textAlign: 'center' }}>U - 26</th>
            <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.poQty !== null ? rec.poQty : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
            <td style={{ textAlign: 'center' }}>{calculateBomQty(rec)}</td>          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
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
export default POIDLable