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

export interface NeckTypeprops {
    bomInfo: any[]
}
export const NecKType = (props: NeckTypeprops) => {
    console.log(props.bomInfo,"props++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
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

    useEffect(() => {
        console.log(bomInfo)
        for (const rec of bomInfo) {
            if (bomInfo.destinationCountry === 'ARGENTINA ') {
                if (bomInfo.shipToAddress.includes('Nike Trading')) {
                    setVCode('50')
                }
                if (bomInfo.shipToAddress.includes('Nike Golf')) {
                    setVCode('02')
                }
                if (bomInfo.shipToAddress.includes('RT Clothing')) {
                    setVCode('35')
                }
            }
        }

        bommap()
    }, [bomInfo])

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
        textAlign: 'left',
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
        { ITEM: '220P', STYLE: 'DH0858', SEASON:'SU24',IM: 'A0467488',MATERIALDESCRIPTION:'ELASTIC; STANDARD; WOVEN; BASE SM: 0; APPROVED; TRIM-KNIT/WVN TAPE,BUNGE,DCORD; PRIMARY SM: YES; 86.49% POLYESTER (MECHANICALLY RECYCLED), 7% ELASTANE, 6.51% POLYESTER; L (MM): 0.00; W (MM): 9.00; EDGE TO EDGE; # OF GRIPPER ROWS: 0; PIECE DYED-SINGLE DYED DRAWCORD; W (MM): 0.00; AGLET; H (MM): 0.00; W (MM): 0.00; INTERNAL DIA (MM): 0.00',
        GARMENTCOLOURCODE: 'BLACK/(WHITE)-010',GARMENTCOLOURCODE1:'GLACIER BLUE/(BLACK)-476',GARMENTCOLOURCODE2:'WHITE/(BLACK)-100',TAPECOLOUR: '00A BLACK ',TAPECOLOUR1:'43G G BLUE',TAPECOLOUR2:"10A WHITE",QTYINYDS:5960 ,QTYINYDS1:1920,QTYINYDS2:4505},
      ];


    return (
        <div id='print'>
            <Card title={'Neck Tape'}
                extra={<><span><Button onClick={handlePrint}>Print</Button></span><span> </span></>} >
                    <table  style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={tableCellStyle} >ITEM</th>
                            <th style={tableCellStyle} >STYLE</th>
                            <th style={tableCellStyle} >SEASON</th>
                            <th style={tableCellStyle} >IM#</th>
                            <th style={tableCellStyle} >MATERIAL DESCRIPTION</th>
                            <th style={tableCellStyle} >GARMENT COLOR CODE</th>
                            <th style={tableCellStyle} >TAPE COLOR</th>
                            <th style={tableCellStyle} >QTY IN YARDS</th>
                        </tr>
                        </thead>
                    <tbody>
                              {data1.map((item, index) => (
                                <tr key={index}>
                                  <td style={tableCellStyle} >{item.ITEM}</td>
                                  <td style={tableCellStyle}>{item.STYLE}</td>
                                  <td style={tableCellStyle}>{item.SEASON}</td>
                                  <td style={tableCellStyle}>{item.IM}</td>
                                  <td style={tableCellStyle}>{item.MATERIALDESCRIPTION}</td>
                    
                                  <tr>
                                    <td style={tableCellStyle} >{item.GARMENTCOLOURCODE}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle}>{item.GARMENTCOLOURCODE1}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle}>{item.GARMENTCOLOURCODE2}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle} >{item.TAPECOLOUR}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle} >{item.TAPECOLOUR1}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle} >{item.TAPECOLOUR2}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle} >{item.QTYINYDS}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle} >{item.QTYINYDS1}</td>
                                  </tr>
                                  <tr>
                                    <td style={tableCellStyle}>{item.QTYINYDS2}</td>
                                  </tr>
                                </tr>
                    
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td style={tableCellStyle} colSpan={7} ></td>
                                <td  style={tableCellStyle} >{data1.reduce((total, item) => total + (item.QTYINYDS+item.QTYINYDS1+item.QTYINYDS2), 0)}</td>
                              </tr>
                            </tfoot>


          {/* {
                            data.map((row, index) => {
                                return <tr key={index}>
                                    <td >{row.itemNo !== null ? row.itemNo : ''}</td>
                                    <td>{row.poNumber}</td>
                                    <td>{row.season + "'" + row.year.substring(2)}</td>
                                    <td >{row.styleNumber !== null ? row.styleNumber : ''}</td>
                                    <td  >{row.imCode !== null ? row.imCode : ''}</td>
                                    <td  style={{padding:'10px'}}>{row.description !== null ? row.description : ''}</td>
                                    <td></td>
                                    <td >{row.geoCode !== null ? row.geoCode : ''}</td>
                                    <td>{row.bomQty !== null ? row.bomQty : ''}</td>
                                </tr>
                            })
                        } */}
                        
                    </table >
            </Card>

        </div>
    )

}
export default NecKType