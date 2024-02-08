import { StyleNumberReq } from "@project-management-system/shared-models"
import { BomService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Malaysia } from "./malasia-sticker"
import Indonesia, { Philippines } from "./philippines"


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
        if(props.info.length>=0){
            console.log(props.info,'oooo');
            setBomInfo(props.info)
        }

    },[props.info])

    console.log(bomInfo);
    
    useEffect(()=>{ 
        // console.log(bomInfo[0].destinationCountry,'oooooooooo');
        
        isValidCountry(bomInfo.destination_country) },[])
    
    console.log(bomInfo,'----------')
    
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
    const isValidCountry = (country: string) => {
        console.log(country,'ooooo');
        
        const allowedCountries = ["Malaysia", "Philippines", "Indonesia"];
        return allowedCountries.includes(country);
    };
return (
    <>
    <div id='print'>
        
    {bomInfo.destination_country === 'Malaysia' || 'Philippines' ||  'Indonesia' ? (

    <Card title={'Country Sticker'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>

        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
            <tr>
                <th>COUNTRY#</th>
                <th>IM#</th>
                <th>ITEM#</th>
                <th>STYLE#</th>
                <th>QTY IN PCS#</th>
            </tr>
            <tr>
                <td>{bomInfo[0]?.destination_country}</td>
                <td>{countryToIMCodeMapping[bomInfo[0]?.destination_country]}</td>
                <td>{bomInfo[0]?.item}</td>
                <td>{bomInfo[0]?.style_number}</td>
                <td>{bomInfo[0]?.total_item_qty}</td>
            </tr>
        </table>
        {bomInfo[0]?.destination_country === "Malaysia" && <Malaysia />}
        {bomInfo[0]?.destination_country === "Philippines" && <Philippines />}
        {/* <h1><Malaysia/></h1>
        <h1><Indonesia/></h1> */}
    </Card>
 ) : (
    <div>Invalid destination country</div>
)} 

  
</div>
</>
)
}