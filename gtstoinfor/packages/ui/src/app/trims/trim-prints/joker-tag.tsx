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
    const [data,setData] = useState<any>([])

    // useEffect(() => {
    //     if(bomData.state.info){
    //         const req = new StyleNumberReq(bomData.state.info?.styleNumber)
    //         bomservice.getbomInfoAgainstStyle(req).then(res =>{
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
            setData(props.info)
        }

    },[props.info])


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
                {
                    data.map(rec => {
                        return(
                            <>
                             {rec.geoCode === 'APA' ? (<>
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
                                        <th>{e.size}</th>
                                    )
                                })
                            } */}
                            {
                                rec?.sizeInfo?.map(e => {
                                    grandTotal+= e.quantity
                                    return(
                                        <th>{e.size}</th>
                                    )
                                })
                            }
                            <th>Grand Total</th>
                        </tr>
                        <tr>
                            <td style={{textAlign:'center'}}>{rec?.item}</td>
                            <td style={{textAlign:'center'}}>{rec?.style}</td>
                            <td style={{textAlign:'center'}}>{
                                rec?.rec?.map((e,index) => {
                                    const len = rec?.rec?.length
                                    return(
                                        <>
                                        {`${e.imCode} ${index == len-1 ? '' : '/'}`}
                                        
                                        </>
                                    )
                                })
                                }</td>
                            <td style={{textAlign:'center'}}>{rec?.geoCode}</td>
                            <td style={{textAlign:'center'}}>{rec?.season}</td>
                            {
                                rec?.sizeInfo?.map(e => {
                                    return(
                                        <td style={{textAlign:'right'}}>{e.quantity}</td>
                                    )
                                })
                            }
                            <th style={{textAlign:'right'}}>{grandTotal}</th>
                        </tr>
                                                    
                        </table>
                    </>) : (<></>)}
                       
                        <br/>
                        {rec?.bomInfo?.length > 0 ? ( <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
                            <tr>
                                <th>ITEM#</th>
                                <th>STYLE#</th>
                                <th>REGION</th>
                                <th>IM#</th>
                                <th>TRIM</th>
                                <th>DESCRIPTION </th>
                            </tr>
                            
                                {
                                    rec?.bomInfo ? (rec?.bomInfo[0]?.map((e,index) => {
                                    const len = rec?.bomInfo[0]?.length
                                        return(
                                            <tr>
                                                { index == 0 ?  (   <>
                                                <td rowSpan={len} style={{textAlign:'center'}}>{rec?.item}</td>
                                                <td rowSpan={len} style={{textAlign:'center'}}>{rec?.style}</td>
                                                <td rowSpan={len} style={{textAlign:'center'}}>{rec?.geoCode}</td>
                                                </>) : (<></>) 
                                                }
                                                <td style={{textAlign:'center'}}>{rec?.geoCode != 'APA' ? 'A724610' : 'A728050'}</td>
                                                <td style={{textAlign:'center'}}>{e.trimInfo}</td>
                                                <td style={{width:'600px'}}>{e.description}</td>
                                            </tr>
                                        )
                                    })) : (<></>)
                                }
                        </table>) : (<></>)}
                       
                            </>
                        )
                    })
                }
            </Card>
        </div>
        </>
    )

}

export default JokerTagPrint