import { Button, Card } from "antd"
import { useEffect, useState } from "react"

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

export interface washCareprops {
    bomInfo:any[]
}
export const WasCarelabel = (props:washCareprops) =>{
    console.log(props.bomInfo)
    const [bomInfo,setBomInfo] = useState<any>([])
    
    useEffect(() => {
        if(props.bomInfo){
            setBomInfo(props.bomInfo)
        }

    },[props.bomInfo])

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
        <div  id='print'>
            <Card title={'WashCare Label'} 
            extra={<span><Button onClick={handlePrint}>Print</Button></span>}
            >
            <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
            <tr>
                <th style={{width:'3%'}}>ITEM#</th>
                <th style={{width:'3%'}}>PO NO</th>
                <th style={{width:'3%'}}>SEASON</th>
                <th style={{width:'3%'}}>STYLE</th>
                <th style={{width:'3%'}}>IM#</th>
                <th style={{width:'5%'}}>DESCRIPTION</th>
                <th style={{width:'3%'}}>WC</th>
                <th style={{width:'3%'}}>DESTINATION</th>
                <th style={{width:'3%'}}>TOTAL QTY</th>
            </tr>
           
            <tr>
               <td>{bomInfo.itemname}</td>
               <td>{bomInfo.poNumber}</td>
               <td>{}</td>
               <td>{bomInfo.styleName}</td> 
               <td>{}</td>
               <td>
               {
              bomInfo.bomInfo && Array.isArray(bomInfo.bomInfo) &&  bomInfo?.bomInfo?.map(e =>{
                    return(
                    <>
                        {e.description}
                        <br></br>
                        <br></br>
                    </>
                    )
                  })
              }
               </td>
               <td>{}</td>
               <td>{bomInfo.destinationCountry}</td>
               
            </tr>
        </table>
        <br></br>
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
                <th>REGION</th>
                <th>MANUFACTORY SHIP DATE</th>
                <th>SIZE MATRIX TYPE</th>
                <th>STYLE TYPE</th>
                <th>SEASON</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>2XL</th>
                 {/* {
                    bomInfo?.sizeWiseData?.map(e => {
                        grandTotal+= e.sizeQty
                        return(
                            <th>{e.sizeDescription}</th>
                        )
                    })
                } */}
                <th>Total</th>
            </tr>
        </table>
            </Card>
      
        </div>
    )

}
export default WasCarelabel