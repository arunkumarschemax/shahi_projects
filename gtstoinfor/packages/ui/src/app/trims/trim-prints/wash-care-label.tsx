import { BomInfo, ItemInfoFilterReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card } from "antd"
import { useEffect, useRef, useState } from "react"
import './table-styles.css'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';
import moment from "moment";
import { object } from "prop-types";
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

export interface washCareprops {
    bomInfo: any[]
}
export const WasCarelabel = (props: washCareprops) => {
    const [bomInfo, setBomInfo] = useState<any>([])
    const [vCode, setVCode] = useState('')
    const [sizeData, setSizeData] = useState<any>([])
    const [gender, setGender] = useState<boolean>(false)
    const [dataInfo, setDataInfo] = useState<any[]>([])
    const [sizeMatrixData, setSizeMatrixData] = useState<any[]>([])

    const bomService = new BomService()
    let grandTotal = 0
    let chinaGgrandTotal = 0
    let existingItem: any = []
    const tableRef = useRef(null);

    const data = props.bomInfo;

    console.log(data)


  const uniqueStyles = data
  .filter(item => item.geoCode === 'APA')
  .reduce((styles, item) => {
    styles.add(item.styleNumber);
    return styles;
  }, new Set());
  

    function getApaSizematrx(){
        bomService.getApaSizeMatrix(
            {
                styleNumber:Array.from(uniqueStyles)
            }).then( res =>{
            if(res.status){
                setSizeMatrixData(res.data)
            }else{
                setSizeMatrixData([])
            }
        })
    }

    useEffect(() =>{
        if(uniqueStyles){
            getApaSizematrx()
        }
      },[data])

    useEffect(() => {
        if (props.bomInfo) {

            setBomInfo(props.bomInfo)
        }
        // sizeWiseDataForFormutpleOgac()
    }, [props.bomInfo])

    const bommap = () => {
        // bomInfo.map(e =>{
        //     console.log(e.style)
        // })
        const data = bomInfo.some(item => item.item == '012H' && item.geoCode === 'EMEA')
        if (data) {
            setGender(true)
        }
    }

    useEffect(() => {
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
    function formatToSixDigits(str: string): string {
        // Parse the string to an integer
        const num = parseInt(str, 10);
    
        // Convert the number back to a string with leading zeros
        return num.toString().padStart(6, '0');
    }

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

    const itemWiseGroup = data.reduce((acc, row) => {
        const { itemNo, geoCode, destination, styleNumber } = row;
        const key = `${itemNo}_${geoCode}_${styleNumber}`;

        // If the destination is Brazil, include it in the key
        if (destination === 'Brazil') {
            const brazilKey = `${key}_Brazil`;

            // If the key doesn't exist in the accumulator, create a new object with the key
            if (!acc[brazilKey]) {
                acc[brazilKey] = [row];
            } else {
                // If the key already exists, check if the itemNo, geoCode, or destination has changed
                const lastRow = acc[brazilKey][acc[brazilKey].length - 1];
                if (lastRow.itemNo !== itemNo || lastRow.geoCode !== geoCode || lastRow.destination !== destination) {
                    // If either itemNo, geoCode, or destination has changed, create a new object with the key
                    acc[brazilKey] = [row];
                } else {
                    // If itemNo, geoCode, and destination are the same, simply push the row to the existing array
                    acc[brazilKey].push(row);
                }
            }
        } else {
            // For destinations other than Brazil, follow the previous logic
            if (!acc[key]) {
                acc[key] = [row];
            } else {
                const lastRow = acc[key][acc[key].length - 1];
                if (lastRow.itemNo !== itemNo || lastRow.geoCode !== geoCode || lastRow.styleNumber !== styleNumber) {
                    acc[key] = [row];
                } else {
                    acc[key].push(row);
                }
            }
        }

        return acc;
    }, {});




    // for APA region need to display OGAG date wise size quantities
    function renderOgadDateWiseSizeQuantits(sizeWiseQty: any[]) {
        const maxSizeObject = sizeWiseQty.reduce((maxObj, obj) => {
            const sizeKeysCount = Object.keys(obj).filter(key => key !== 'ogacDate').length;
            return sizeKeysCount > Object.keys(maxObj).filter(key => key !== 'ogacDate').length ? obj : maxObj;
        }, {});

        // Extract the size keys from the object with the maximum size keys
        const sizes = Object.keys(maxSizeObject).filter(key => key !== 'ogacDate');
        const customOrder = ['S', 'M', 'L', 'XL', 'XXL', '2XL'];
        sizes.sort((a, b) => customOrder.indexOf(a) - customOrder.indexOf(b))
        console.log(sizes)
        
        let total = 0

        return (
            <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', border: '1px solid black' }} border={1} cellSpacing="0" cellPadding='5'>
                <tr>
                    <th>REGION</th>
                    <th>MANUFACTORYSHIP DATE</th>
                    {
                        sizes.map((s) => {
                            return <th>{s}</th>

                        })
                    }
                    <th>TOTAL</th>
                </tr>
                {
                    sizeWiseQty.map((s) => {

                        return <tr>
                            <td>{"APA"}</td>
                            <td>{moment(s.ogacDate,'yyyy-mm').format("mm yyyy")}</td>
                            {
                                sizes.map((size) => {
                                    total += s[size] ? Number(s[size]) : 0
                                    return <td>{s[size] ? s[size] : 0}</td>

                                })
                            }
                            <td>{total}</td>
                        </tr>
                    })
                }

            </table>
        );
    };

    function renderIndonesiaTable() {

    }




    return (
        <div id='print'>
            <Card title={'WashCare Label'}
                extra={<><span><Button onClick={handlePrint}>Print</Button></span><span>
                    {/* <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                filename="tablexls"
                sheet="sheet 1"
                buttonText="Excel"
            /> */}
                </span></>}
            >

                <div>
                    <br /><br />
                    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', paddingTop: 30 }} border={1} cellSpacing="1" cellPadding='5'
                        //   ref={tableRef}
                        // id="table-to-xls"
                    >
                        {data[0]?.chinaSizes?.length ? <>
                            <tr></tr>
                            <tr></tr>
                            <tr>
                                <th style={{ width: '50px' }}>CHINA INSERT</th>
                                {
                                    data[0].chinaSizes?.map((h) => {
                                        return <th style={{ width: '50px' }}>{h.size}</th>
                                    })
                                }
                            </tr>
                            <tr>
                                <td style={{ width: '50px' }}>110044</td>
                                {
                                    data[0].chinaSizes.map((c) => {
                                        return <td style={{ width: '50px' }}>{c.qty}</td>
                                    })
                                }
                            </tr>
                            <tr></tr>
                            <tr></tr>
                        </>

                            : <></>
                        }

                        {data[0]?.indonesiaSize?.length ? <>
                            <tr></tr>
                            <tr></tr>
                            <tr>
                                <th style={{ width: '50px', textAlign: 'center' }}>ITEM#</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>IM#</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>PO#</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>STYLE#</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>DESTINATION</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>QTY</th>
                            </tr>
                            <tr>
                                <td style={{ width: '50px', textAlign: 'center' }}>{data[0].itemNo}</td>
                                <td style={{ width: '50px', textAlign: 'center' }}>574080</td>
                                <td style={{ width: '50px', textAlign: 'center' }}>{data[0].poNumber}</td>
                                <td style={{ width: '50px', textAlign: 'center' }}>{data[0].styleNumber}</td>
                                <td style={{ width: '50px', textAlign: 'center' }}>{data[0].destination.toUpperCase()}</td>
                                {
                                    <td style={{ width: '50px', textAlign: 'center' }}>
                                        {data[0].indonesiaSize.reduce((accumulator, currentValue) => {
                                            return accumulator + currentValue.qty;
                                        }, 0)}
                                    </td>
                                }
                            </tr>
                            <tr></tr>
                            <tr></tr>
                        </>

                            : <></>
                        }
                    </table>
                    <br /><br />

                    {Object.keys(itemWiseGroup).map((itemNo, index) => (
                        <div key={index} style={{ paddingTop: '10px' }}>
                             {index == 1 && itemWiseGroup[itemNo].filter(rec => rec.displayInMainReq != false).map((row, index) => (
                                <>
                                { index === 0 &&  row?.geoCode === 'APA' && row?.sizeWiseQty?.length ? renderOgadDateWiseSizeQuantits(row?.sizeWiseQty) : <></>}
                                </>
                            ))}
                        </div>
                        ))}
                    {Object.keys(itemWiseGroup).map((itemNo, index) => (
                        <div key={index}>
                            {itemWiseGroup[itemNo][0].geoCode === 'AAO' && itemWiseGroup[itemNo][0].destination !== 'Brazil' && (
                                <div> <h2 style={{ color: 'red' }}>
                                    Note: Please select "Not destined to brazil" while uploading the below order in Trimco portal
                                </h2>
                                </div>
                            )}
                            {itemWiseGroup[itemNo][0].destination === 'Brazil' && (
                                <div> <h2 style={{ color: 'red' }}>
                                    NOTE: Please select below Ship to in the Trimco portal while placing the below order.
                                </h2>
                                    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='5'>
                                        <tr>
                                            <th>DESTINATION</th>
                                            <th>{itemWiseGroup[itemNo][0].destination}</th>
                                        </tr>
                                        <tr>
                                            <td>SHIP TO NUMBER</td>
                                            <td style={{ color: 'red' }}><b>{itemWiseGroup[itemNo][0].shipToNumber}</b></td>
                                        </tr>
                                    </table>
                                </div>
                            )}
                            <div key={index} style={{ paddingTop: '10px' }}>
                                <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='5' id="table-to-xls">
                                    <thead>
                                        <tr className="col-styles">
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >ITEM </th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >PO NO</th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >SEASON</th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >STYLE#</th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >IM#</th>
                                            <th className="col-styles" style={{ width: '30%', textAlign: 'center' }} >DESCRIPTION</th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >DESTINATION</th>
                                            <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >Total Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemWiseGroup[itemNo].filter(rec => rec.displayInMainReq != false).map((row, index) => (
                                            <>
                                            <tr key={index}>
                                                {index === 0 &&(
                                                    <>
                                                       <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{row.itemNo}</td>
                                                <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{row.poNumber}</td>
                                                <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{row.season + "'" + row.year.substring(2)}</td>
                                                <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{row.styleNumber}</td>
                                                    </>
                                                )}
                                                <td style={{ textAlign: 'center' }}>{formatToSixDigits(row.imCode)}</td>
                                                 <td style={{ padding: '10px', textAlign: 'center' }}>{row.description}</td>
                                                 {index === 0 &&(
                                                    <>
                                                <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{row.geoCode}</td>
                                                    </>
                                                 )}
                                                {row.geoCode === 'APA' ?
                                                <>
                                                {index === 0 &&(
                                                    <>
                                                <td style={{ textAlign: 'center' }} rowSpan={itemWiseGroup[itemNo].length}>{'REFER TO THE ABOVE SIZE WISE QTY'}</td>
                                                    </>
                                                )}
                                                </>:
                                                <>
                                                <td style={{ textAlign: 'center' }}>{row.bomQty}</td>
                                                </>
                                                } 
                                            </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    ))}
                </div>
                {sizeMatrixData.length >0 ?
                 <div  style={{ paddingTop: '10px' }}>
    
                 <table  style={{ borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', paddingTop: 30 }} border={1} cellSpacing="1" cellPadding='5'>
                     <thead>
                         <tr>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >BUY </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >FD </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >STYLE </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >STYLE </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >USA </th>
                       <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >CHINA SIZE </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >CHN </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >CHN TOP </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >CHN  </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >CHN BOT </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >KOREA SIZE </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >KOR TOP </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >KOR BOT </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > </th>
                         </tr>
                         <tr>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >MTH </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >OF </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >NUMBER </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >TYPE </th>
                       <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > SIZE </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >MATRIX TYPE </th>
                     <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > TOP SIZE </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >BODY SIZE </th>
                         <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >BOT SIZE</th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >BODY SIZE </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >MATRIX TYPE </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >GENERIC </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > CHEST</th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > HEIGHT</th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >GENERIC </th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} > WAIST</th>
                      <th className="col-styles" style={{ width: '10%', textAlign: 'center' }} >HIP </th>
                         </tr>
                     </thead>
                     <tbody>
                        {sizeMatrixData.map((rec,index) =>{
                            return(
                                <tr key={index}>
                                <td  style={{ textAlign: 'center' }}>{rec.buyMonth}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.fdof}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.styleNumber}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.styleType}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.usaSize}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.chinaSizeMatrixType}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.chinaTopSize}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.chinaTopBodySize}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.chinaBottomSize}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.chinaTopBodySize}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaSizeMatrixType}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaTopGeneric}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaTopChest?rec.koreaTopChest:'N/A'}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaTopHeight?rec.koreaTopHeight:'N/A'}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaTopHeight?rec.koreaTopHeight:'N/A'}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaBottomGeneric?rec.koreaBottomGeneric:'N/A'}</td>
                                <td  style={{ textAlign: 'center' }}>{rec.koreaBottomWaist?rec.koreaBottomWaist:'N/A'}</td>
                            </tr>
                            )
                          
                        })}
                     </tbody>

                 </table>
             </div>:<></>
                }
               
            </Card>

        </div>
    )

}
export default WasCarelabel