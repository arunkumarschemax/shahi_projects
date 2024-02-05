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
    let grandTotal = 0
    
    useEffect(() => {
        console.log(props.bomInfo)
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
                
                <h2 style={{color:'red',display:bomInfo.gender == 'BOY' || bomInfo.gender == 'GIRL'?'unset':'none'}}>FIRE WARNING LABEL</h2>
                <h2>{'PLEASE MENTION V-CODE - V31550 WHILE ORDERING'}</h2>
         
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
               <td>{bomInfo.item}</td>
               <td>{bomInfo.poNumber}</td>
               <td>{bomInfo.season}</td>
               <td>{bomInfo.styleNumber}</td> 
               <td>
                {
                      bomInfo.bomInfo && Array.isArray(bomInfo.bomInfo) &&  bomInfo?.bomInfo?.map((e,index)=>{
                        return(
                        <>
                            {bomInfo.geoCode == 'EMEA' ?'1009915' :e.imCode}
                       {index < bomInfo.bomInfo.length - 1 && <hr />}
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </>
                        )
                      })
                }
               </td>
               <td>
               {
              bomInfo.bomInfo && Array.isArray(bomInfo.bomInfo) &&  bomInfo?.bomInfo?.map((e,index )=>{
                    return(
                    <>
                        {e.description}
                   {index < bomInfo.bomInfo.length - 1 && <hr />}

                        <br></br>
                        <br></br>
                    </>
                    )
                  })
              }
               </td>
               <td>{}</td>
               <td>{bomInfo.geoCode}</td>
            </tr>
        </table>

           <br></br>

        <br></br>
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
                <th>REGION</th>
                <th>MANUFACTORY SHIP DATE</th>
                <th>SIZE MATRIX TYPE</th>
                <th>STYLE TYPE</th>
                <th>SEASON</th>
                {bomInfo.sizeWiseData && Array.isArray(bomInfo.sizeWiseData) && bomInfo?.sizeWiseData?.map(e =>{
                     grandTotal+= e.sizeQty
                     return(
                        <th>{e.sizeDescription}</th>
                    )
                })  
                }
                <th>Total</th>
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{bomInfo.geoCode}</td>
                <td>{}</td>
                <td>{}</td>
                <td  style={{textAlign:'center'}}>{bomInfo.genderAgeDesc}</td>
                <td style={{textAlign:'center'}}>{bomInfo.season}</td>
                {
                    bomInfo?.sizeWiseData?.map(e => {
                        return(
                            <td>{e.sizeQty}</td>
                        )
                    })
                }
                <th>{grandTotal}</th>
            </tr>
        </table>
            </Card>
      
        </div>
    )

}
export default WasCarelabel