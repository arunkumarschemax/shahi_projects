import { StyleNumberReq } from "@project-management-system/shared-models"
import { BomService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

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


export interface JokerTagPrintProps{
    info: any[]
}

export const JokerTagPrint = (props:JokerTagPrintProps) => {

    const bomData = useLocation()
    const bomservice = new BomService()
    const [bomInfo,setBomInfo] = useState<any>([])

    // useEffect(() => {
    //     if(bomData.state.info){
    //         const req = new StyleNumberReq(bomData.state.info?.styleNumber)
    //         bomservice.getBomInfoAgainstStyle(req).then(res =>{
    //             if(res.status){
    //                 setBomInfo(res.data)
    //             }
    //         })
    //     }

    // },[bomData.state])

    useEffect(() => {
        if(props.info){
            // const req = new StyleNumberReq(props.info[0]?.styleNumber)
            // bomservice.getBomInfoAgainstStyle(req).then(res =>{
            //     if(res.status){
            //         setBomInfo(res.data)
            //     }
            // })
            console.log(props.info)
            setBomInfo(props.info)
        }

    },[props.info])

    console.log(bomInfo.bomInfo,'----------')

    let grandTotal = 0

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

    return(
        <>
        <div id='print'>
            <Card title={'Joker Tag'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
            <Descriptions >
                <Descriptions.Item>{`Size wise details`}</Descriptions.Item>
            </Descriptions>
            <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
            <tr>
                <th>ITEM#</th>
                <th>STYLE#</th>
                <th>IM#</th>
                <th>REGION</th>
                <th>SEASON</th>
                {/* {
                    bomData?.state.info?.sizeWiseData.map(e => {
                        grandTotal+= e.sizeQty
                        return(
                            <th>{e.sizeDescription}</th>
                        )
                    })
                } */}
                 {
                    bomInfo?.sizeWiseData?.map(e => {
                        grandTotal+= e.sizeQty
                        return(
                            <th>{e.sizeDescription}</th>
                        )
                    })
                }
                <th>Grand Total</th>
            </tr>
            <tr>
                <td>{bomInfo?.item}</td>
                <td>{bomInfo?.style}</td>
                <td>{
                    bomInfo?.bomInfo?.map((e,index) => {
                        const len = bomInfo?.bomInfo?.length
                        return(
                            <>
                            {`${e.imCode} ${index == len-1 ? '' : '/'}`}
                            
                            </>
                        )
                    })
                    }</td>
                <td>{bomInfo?.geoCode}</td>
                <td>{bomInfo?.season}</td>
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
            <br/>
            <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
                <tr>
                    <th>ITEM#</th>
                    <th>STYLE#</th>
                    <th>REGION</th>
                    <th>IM#</th>
                    <th>TRIM</th>
                    <th>DESCRIPTION </th>
                </tr>
                
                    {
                        bomInfo?.bomInfo?.map((e,index) => {
                        const len = bomInfo?.bomInfo?.length
                            return(
                                <tr>
                                    { index == 0 ?  (   <>
                                    <td rowSpan={len}>{bomInfo?.item}</td>
                                    <td rowSpan={len}>{bomInfo?.style}</td>
                                    <td rowSpan={len}>{bomInfo?.geoCode}</td>
                                    </>) : (<></>) 
                                    }
                                    <td>{bomInfo?.geoCode != 'APA' ? 'A724610' : 'A728050'}</td>
                                    <td>{e.itemName}</td>
                                    <td style={{width:'600px'}}>{e.description}</td>
                                </tr>
                            )
                        })
                    }
            </table>
            </Card>
        </div>
        </>
    )

}

export default JokerTagPrint