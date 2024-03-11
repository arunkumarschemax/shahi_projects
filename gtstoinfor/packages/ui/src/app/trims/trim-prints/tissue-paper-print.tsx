import { BomInfo, ItemInfoFilterReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card } from "antd"
import { useEffect, useRef, useState } from "react"
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';
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

export interface TissuePaperprops {
    bomInfo: any[]
} const TissuePaper = (props: TissuePaperprops) => {
    const [bomInfo, setBomInfo] = useState<any>([])
    const [vCode, setVCode] = useState('')
    const data = props.bomInfo;


    
    useEffect(() => {
        if (props.bomInfo) {
            console.log(props.bomInfo)

            setBomInfo(props.bomInfo)
        }
    }, [props.bomInfo])

   

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
                                width: 100%;
                            }
                            /* Additional styles for your content */
                        </style>
                    </head>
                    <body>${devContent}</body>
                </html>
            `);
    
            // Step 6: Apply CSS styles from the original document to the new window
            getCssFromComponent(document, printWindow.document);
    
            // Step 7: Close the document after it is fully loaded
            printWindow.onload = () => {
                console.log("Content loaded into the print window");
                // Step 8: Trigger the print operation
                printWindow.print();
                // Step 9: Close the print window after printing
                printWindow.close();
            };
            
            console.log("end of the table");
            
        }
    };
    
   
    const tableCellStyle: React.CSSProperties = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px',
      };


      const groupedData = {};
  
      data.forEach((item) => {
        const key = `${item.itemNo}-${item.styleNumber}-${item.season}-${item.imCode}-${item.description}`;
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(item);
      });
      return (
        
          <Card title={'Tissue Paper'} extra={<Button onClick={handlePrint}>Print</Button>}>
            <div id="print">
            <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
              <thead>
                <tr>
                  <th style={{ width: '3%' }}>SL.NO</th>
                  <th style={{ width: '3%' }}>ITEM#</th>
                  <th style={{ width: '3%' }}>UNIT</th>
                  <th style={{ width: '3%' }}>STYLE NO</th>
                  <th style={{ width: '3%' }}>BUTTER PAPAER DIMENSION</th>
                  <th style={{ width: '3%' }}>REQD QTY IN NOS(INCL +2%)</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td  style={{ textAlign: 'center' }}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data.map((rec, index) => (
                    <tr key={index + 1}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'center' }}>{rec.itemNo !== null ? rec.itemNo : ''}</td>
                      <td style={{ textAlign: 'center' }}></td>
                      <td style={{ textAlign: 'center' }}>{rec.styleNumber !== null ? rec.styleNumber : ''}</td>
                      <td style={{ textAlign: 'center' }}>L 10" X W 10" BUTTER PAPER</td>
                      <td style={{ textAlign: 'center' }}>{rec.bomQty !== null ? rec.bomQty : ''}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </Card>
       
      );
      

}
export default TissuePaper ;
