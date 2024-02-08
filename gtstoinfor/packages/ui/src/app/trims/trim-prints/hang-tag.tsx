import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React, { useEffect, useState } from "react";
import { StyleNumberReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
export interface HangTagPrintProps{
    info:any[]
}
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
export const HangTag=(props:HangTagPrintProps)=> {
    const bomData = useLocation()
    const bomservice = new BomService()
    const [bomInfo,setBomInfo] = useState<any>([])

    // useEffect(() => {
    //     if(props.info){
    //         const req = new StyleNumberReq(props.info[0]?.styleNumber)
    //         bomservice.getBomInfoAgainstStyle(req).then(res =>{
    //             if(res.status){
    //                 setBomInfo(res.data)
    //             }
    //         })
    //     }

    // },[props.info])
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
        <div id='print'>
        <Card title={'Hangtag'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
        <Descriptions.Item><span style={{marginLeft: '40%',fontFamily:'bold'}}>{'NSW  FOUNDATIONAL  PRIMARY  HANGTAG  2  SIDED'}</span></Descriptions.Item>
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
        <th style={{width:'3%'}}>ITEM#</th>
        <th style={{width:'3%'}}>Season#</th>

        <th style={{width:'3%'}}>STYLE#</th>
        <th style={{width:'3%'}}>Size Group</th>
        <th style={{width:'5%'}}>Region / Destination</th>
        <th style={{width:'3%'}}>IM#</th>
        <th style={{width:'3%'}}>Req Qty in PCS</th>
      
       
        </tr>
        <tr>         
        <td>{}</td>
        <td>{bomInfo?.season}</td>
 <td>{bomInfo?.style}</td>
 <td>{}</td>
 <td>{}</td>
 <td>{
                    bomInfo?.bomInfo?.map(e => {
                        return(
                            <>
                            {e.imCode}/
                            </>
                        )
                    })
                       
                    
                    }</td>
        </tr>
       

      </table>
     
      </Card>
      </div>
        
    )


}
export default HangTag