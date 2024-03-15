import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

export interface poidProps {
    bomInfo: any
}
export function KimbleLable(props: poidProps) {
    const [bomInfo, setBomInfo] = useState([]);
    console.log(props.bomInfo,"props.bomInfo")

useEffect(() => {
    if (props.bomInfo) {
      setBomInfo(props.bomInfo);
    }
  }, [props.bomInfo]);

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

    
      const tableCellStyle = {
        padding: '8px',
     };

    
    return (
        <div id='print'>
                <Card  title="Poid Label" extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
                <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
      <thead>
        <tr>
          <th style={{ width: '3%' }}>ITEM</th>
          <th style={{ width: '3%' }}>UNIT</th>
          <th style={{ width: '3%' }}>PCD</th>
          <th style={{ width: '3%' }}>STYLE</th>
          <th style={{ width: '3%' }}>TOTAL ORDER QTY</th>
          <th style={{ width: '3%' }}>KIMBLE SZ/COL</th>
          <th style={{ width: '3%' }}>REQ QTY IN PCD(+2%)</th>
        </tr>
      </thead>
      <tbody>
        {bomInfo.map((rec, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
            <th style={{  textAlign: 'center' }}>U - 26</th>
            <td style={{ textAlign: 'center' }}>{rec.ogacDate !== null ? rec.ogacDate : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.poQty !== null ? rec.poQty : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.primaryColor !== null ? rec.primaryColor : ''}</td>
            <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>

               </tr>
        ))}
      </tbody>
      {/* <tfoot>
        <tr>
          <td colSpan={5} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
          <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
            {calculateTotalBomQty(bomInfo)}
          </td>
        </tr>
      </tfoot> */}
    </table>

                </Card>
        </div>

    )


}
export default KimbleLable