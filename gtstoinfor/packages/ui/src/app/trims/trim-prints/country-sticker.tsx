import { StyleNumberReq } from "@project-management-system/shared-models"
import { BomService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Malaysia } from "./malasia-sticker"
import Indonesia, { Philippines } from "./philippines"
import React from "react"


export const getCssFromComponent = (fromDoc, toDoc) => {
    Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
      if (styleSheet.cssRules) {
        // true for inline styles
        const newStyleElement = toDoc.createElement("style");
        Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
          newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
        });
        toDoc.head.appendChild(newStyleElement);
      }
    });
  };
  export interface CountrystickerPrintProps{
    info: any[]
    
}
const countryToIMCodeMapping = {
    Indonesia: '574080',
    Philippines: '658749',
    Malaysia: '520460'
  };
export const CountryStickerPrint=(props:CountrystickerPrintProps)=>{
    
    const bomData = useLocation()
    const bomservice = new BomService()
    const [bomInfo,setBomInfo] = useState<any>([])
    
    useEffect(() => {
        if(props.info){
            console.log(props.info,'oooo');

            setBomInfo(props.info)

        }

    },[props.info])

    console.log(bomInfo);
    
    // useEffect(()=>{ 
    //     // console.log(bomInfo[0].destinationCountry,'oooooooooo');
        
    //     isValidCountry(bomInfo.destinationCountry) },[])
    
    // console.log(bomInfo,'----------')


    // const isValidCountry = (country: string) => {
    //     console.log(country, 'ooooo');

    //     const allowedCountries = ["Malaysia", "Philippines", "Indonesia"];
    //     return allowedCountries.includes(country);
    // };
    

    
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
                                margin: 0;
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
    <>
    <div id='print'>
        
    {/* {bomInfo.destination_country === 'Malaysia' || 'Philippines' ||  'Indonesia' ? ( */}
    <Card title={'Country Sticker'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
  {bomInfo?.map(e => {
    console.log(e,'--22222---------------------')
    return (
      e?.regionInfo?.map(rec => {
        if (
          rec.destinationCountry === 'Malaysia' ||
          rec.destinationCountry === 'Philippines' ||
          rec.destinationCountry === 'Indonesia'
        ) {
    {console.log('???????????????????')}

          return (
            
            
            <>
    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%', border: '2px solid black' }} border={1}>
        
      <tr>
        <th>COUNTRY#</th>
        <th>IM#</th>
        <th>ITEM#</th>
        <th>STYLE#</th>
        <th>QTY IN PCS#</th>
      </tr>
      <tr>
        <td>{rec?.destinationCountry}</td>
        <td>{countryToIMCodeMapping[rec?.destinationCountry]}</td>
        <td>{e?.item}</td>
        <td>{e?.styleNumber}</td>
        <td style={{ textAlign: 'right' }}>{e?.totalItemQty}</td>
      </tr>
    </table>
              {rec?.destinationCountry === "Malaysia" && <Malaysia />}
                    {rec?.destinationCountry === "Philippines" && <Philippines />}  </>
  
          );
        }
        return null;
      })
    );
  })}
</Card>

</div>
</>
)

// return (
//     <><></>
//       {bomInfo && bomInfo.length > 0 && (
//         <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%', border: '2px solid black' }} border={1}>
//           <tr>
//             <th>COUNTRY#</th>
//             <th>IM#</th>
//             <th>ITEM#</th>
//             <th>STYLE#</th>
//             <th>QTY IN PCS#</th>
// </tr>          {bomInfo.map(e =>

//             e?.regionInfo?.map(rec =>
//               rec.destinationCountry === 'Malaysia' ||
//               rec.destinationCountry === 'Philippines' ||
//               rec.destinationCountry === 'Indonesia' ? (
//                 <tr key={e}>
//                   <td>{rec?.destinationCountry}</td>
//                   <td>{countryToIMCodeMapping[rec?.destinationCountry]}</td>
//                   <td>{e?.item}</td>
//                   <td>{e?.styleNumber}</td>
//                   <td style={{ textAlign: 'right' }}>{e?.totalItemQty}</td>
//                 </tr>
//               ) : null
//             )
//           )}
//         </table>
//       )}
//     </>
//   );
  
}