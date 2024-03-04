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

export interface swooshHtLableprops {
    bomInfo: any[]
}
export const SwooshHtLable = (props: swooshHtLableprops) => {
    const [bomInfo, setBomInfo] = useState<any>([])
    const [vCode, setVCode] = useState('')
    const [sizeData, setSizeData] = useState<any>([])
    const [gender, setGender] = useState<boolean>(false)
    const [dataInfo, setDataInfo] = useState<any[]>([])
    const bomService = new BomService()
    let grandTotal = 0
    const tableRef = useRef(null);


  


    function restructureData(originalData) {
        return originalData.reduce((acc, curr) => {
            const existingItem = acc.find(item => item.styleNumber === curr.styleNumber);
            if (existingItem) {
                existingItem.bomData.push({
                    description: curr.description,
                    imCode: curr.imCode
                });
            } else {
                acc.push({
                    bomQty: curr.bomQty,
                    styleNumber: curr.styleNumber,
                    geoCode: curr.geoCode,
                    itemNo: curr.itemNo,
                    bomData: [{
                        description: curr.description,
                        imCode: curr.imCode
                    }]
                });
            }
            return acc;
        }, []);
    }


    const data = props.bomInfo;

    const sizeWiseDataForFormutpleOgac = () => {
        bomService.getPoLineDataForCihinaInserttag({ fromDate: '2024-01-03', toDate: '2024-01-05', region: 'EMEA', item: '009L' }).then(res => {
            if (res.status) {
                setSizeData(res.data)
            } else {
                setSizeData([])
            }
        })
    }

    // useEffect(() =>{
    //     sizeWiseDataForFormutpleOgac()
    // },[])

    useEffect(() => {
        if (props.bomInfo) {
            console.log(props.bomInfo)

            setBomInfo(props.bomInfo)
        }
        // sizeWiseDataForFormutpleOgac()
    }, [props.bomInfo])

    const bommap = () => {
        // bomInfo.map(e =>{
        //     console.log(e.style)
        // })
        const data = bomInfo.some(item => item.item == '012H' && item.geoCode === 'EMEA')
        console.log(data)
        if (data) {
            setGender(true)
        }
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

            getCssFromComponent(document, printWindow.document);

            printWindow.document.close();
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000); // Add a delay to ensure all content is loaded
        }
    }

    const vCodemap = (eArray) => {
        for (const e of eArray) {
            if (e.bomInfo && e.bomInfo.length > 0) {
                if (e?.shipToAddress?.includes('Nike Trading')) {
                    return '50'
                }
                if (e?.shipToAddress?.includes('Nike Golf')) {
                    return '02'
                }
                if (e?.shipToAddress?.includes('RT Clothing')) {
                    return '35'
                }
                return ''
            }
        }
        return ''
    }

    const tableCellStyle: React.CSSProperties = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px',
      };

    const sizewisedatamap = (bomInfo) => {
        const data = bomInfo.some(item => item.geoCode == 'APA' && item?.styleType === 'MENS TOP')
        if (data) {
            return (
                <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                    <tr>
                        <th>REGION</th>
                        <th>MANUFACTORY SHIP DATE</th>
                        <th>SIZE MATRIX TYPE</th>
                        <th>STYLE TYPE</th>
                        <th>SEASON</th>
                        {bomInfo?.sizeInfo?.map(e => {
                            grandTotal += e.quantity
                            return (
                                <th>{e.size}</th>
                            )
                        })
                        }
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{bomInfo.geoCode}</td>
                        <td style={{ textAlign: 'center' }}>{ }</td>
                        <td style={{ textAlign: 'center' }}>{'9687'}</td>
                        <td style={{ textAlign: 'center' }}>{bomInfo.genderAgeDesc}</td>
                        <td style={{ textAlign: 'center' }}>{bomInfo.season}</td>
                        {
                            sizeData?.sizeWiseData?.map(e => {
                                return (
                                    <td>{e.sizeQty}</td>
                                )
                            })
                        }
                        <th>{grandTotal}</th>
                    </tr>
                </table>
            )
        }
        return <>
        </>

    }

    const data1 = [
        { QTYINYDS:5423 },
      ];
      const data2 = [
        { QTYINYDS:730 ,QTYINYDS1:665}
      ];

    return (
        <div id='print'>
            <Card title={'Swoosh HT Lable'}
                extra={<Button onClick={handlePrint}>Print</Button>} >
                    <table  style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                        <tr>
                            <th style={tableCellStyle} >ITEM</th>
                            <th style={tableCellStyle} >STYLE</th>
                            <th style={tableCellStyle} >SEASON</th>
                            <th style={tableCellStyle} >IM#</th>
                            <th style={tableCellStyle} >MATERIAL DESCRIPTION</th>
                            <th style={tableCellStyle} >GARMENT COLOR CODE</th>
                            <th style={tableCellStyle} >GOLF
#3 SWOOSH HT LABEL COLOUR</th>
                            <th style={tableCellStyle} >Quantity in PCS</th>
                        </tr>
                  
                                <tr >
                                  <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3} >222P</td>
                                  <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3} >DZ5366</td>
                                  <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3} >SU24</td>
                                  <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3} >A1010271</td>
                                  <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3} >
                                  SP23-GOLF-#3 SWOOSH-HT
LABEL-RECYCLED; LABEL; HEAT
TRANSFER; FILM; HEAT SEAL BACKING;
BASE SM: 0; APPROVED; TRIM-FLAT INK
HT/DIRECT APPLIC; ADDTL RISKS:
CONFIRM H/T APPLICATION METHOD W/
VENDOR; SUGGESTED BODY FABRIC
COLOR FASTNESS DEGREE: ≧LEVEL 4;
VENDOR #: NFF049A1; PRIMARY SM:
YES; 90% POLYESTER (MECHANICALLY
RECYCLED), 10% SILICONE; # OF
COLORS: 1; LASER CUT; PIECE CUT; H
(MM): 18.90; W (MM): 53.50; EDGE TO
EDGE; THK (MM): 0.30; SWOOSH; LOGO
SIZE: 3; PIECE DYED-SINGLE DYED,
PIGMENT DYED; ADHESIVE: FILM;
APPLICATION TECHNIQUE: HEAT
APPLIED; ART TECHNIQUE: FLATBED
SCREEN PRINT; VISUAL EFFECT:
DULL-MATTE; YARN: YARN 1; YARN
LOCATION: WARP; 173308 - CONT -
CONTRACTOR; YARN-FILAMENT; BASE
SM: 0; APPROVED; 100% POLYESTER
(MECHANICALLY RECYCLED); SIZE: 50;
DENIER; MICROFIBER: YES; FILAMENT
COUNT: 72; PLY COUNT: 1; LUSTER:
FULL DULL; TEXTURE: TEXTURED;
CROSS SECTION: ROUND; UNDYED;
YARN 2; YARN LOCATION: FILL; 173308 -
CONT - CONTRACTOR; YARN-FILAMENT;
BASE SM: 0; APPROVED; 100%
POLYESTER (MECHANICALLY
RECYCLED); SIZE: 50; DENIER; MICROFIBER: YES; FILAMENT COUNT:
72; PLY COUNT: 1; LUSTER: FULL DULL;
TEXTURE: TEXTURED; CROSS SECTION:
ROUND; UNDYED; COLOR EFFECT: 1ST
COLOR; LABEL                                  </td>
                                 
                                    <td  style={{ ...tableCellStyle,textAlign: 'center' }}>LT LEMONTWIST/(BLACK)-736</td>
                                    <td  style={{ ...tableCellStyle,textAlign: 'center' }}>00A BLACK </td>
                                    <td  style={{ ...tableCellStyle,textAlign: 'center' }}>5423</td>
                                  </tr>

                         <tfoot>
                              <tr>
                                <td style={tableCellStyle} colSpan={7} ></td>
                                <td  style={{...tableCellStyle,fontWeight:"bolder"}}>{data1.reduce((total, item) => total + (item.QTYINYDS), 0)}</td>
                              </tr>
                              </tfoot>


       
                        
                    </table >
<br/>


            </Card>

        </div>
    )

}
export default SwooshHtLable