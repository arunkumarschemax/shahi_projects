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

export interface washCareprops {
    bomInfo: any[]
}
export const WasCarelabel = (props: washCareprops) => {
    console.log(props.bomInfo)
    const [bomInfo, setBomInfo] = useState<any>([])
    const [vCode, setVCode] = useState('')
    const [sizeData, setSizeData] = useState<any>([])
    const [gender, setGender] = useState<boolean>(false)
    const [dataInfo, setDataInfo] = useState<any[]>([])
    const bomService = new BomService()
    let grandTotal = 0
    let chinaGgrandTotal = 0
    let existingItem: any = []
    const tableRef = useRef(null);


    const htmlTableToExcel = () => {
        console.log('88888')
        // tableToExcel('myTable', 'Sheet1');
    }

    const exportToExcel = () => {
        const table = document.getElementById('table-id'); // Get the table element
        const ws = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
        const wb = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
        XLSX.writeFile(wb, 'table.xlsx'); // Save the workbook as an Excel file
    };



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
                {/* <div>
                    {bomInfo.map((e,index) =>{   
                        {console.log(e)}
                        return (  
                        <>
                       {e?.bomInfo ?
                        <>
                        {e.bomInfo.length >0 ?
                        <div>
                        <div style={{display: e.geoCode === 'AAO'?'unset':'none'}}>
                        {
                            <><h2>
                                {e.destinationCountry === 'ARGENTINA' ? 'PLEASE MENTION V-CODE-V315' + vCodemap(e) + ' WHILE ORDERING' : ''}
                              </h2>
                              {e.destinationCountry != 'BRAZIL' && e.destinationCountry === 'ARGENTINA' ? 'NOT DESTINED TO BRAZIL':''}
                             <h2>
                                </h2></>
                        }
                        <br></br>
                        </div>
                        <div>
                    {e.destinationCountry === 'BRAZIL' ?
                    <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'15%',border:'2px solid black'}} border={1} cellSpacing="0" cellPadding='0' >
                        <tr>
                            <th>DESTINATION</th>
                            <th>BRAZIL</th>
                        </tr>
                        <tr>
                            <td style={{textAlign:'center'}}>SHIP TO NUMBER</td>
                            <td style={{textAlign:'center'}}>4992098</td>
                        </tr>
                    </table>:<></>
                        }   
                    <br></br>
                       </div>
                            <div style={{display:gender === true?'unset':'none'}}>
                            <h2 style={{color:'red'}}>FIRE WARNING LABEL</h2>
                      <br></br>
                      </div>
                        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1} cellSpacing="0" cellPadding='0'>
                        <tr>
                            <th style={{width:'1%'}}>ITEM#</th>
                            <th style={{width:'1%'}}>PO NO</th>
                            <th style={{width:'1%'}}>SEASON</th>
                            <th style={{width:'1%'}}>STYLE</th>
                            <th style={{width:'1%'}}>IM#</th>
                            <th style={{width:'5%'}}>DESCRIPTION</th>
                            <th style={{width:'1%'}}>WC</th>
                            <th style={{width:'1%'}}>DESTINATION</th>
                            <th style={{width:'1%'}}>TOTAL QTY</th>
                        </tr>   
                        {
                            e.bomInfo ? (e?.bomInfo[0]?.map((rec,index) => {
                                const len = e?.bomInfo[0]?.length
                                return(
                                    <tr>
                                        {index == 0?(<>
                                            <td style={{textAlign:'center'}} rowSpan={len}>{e.item}</td>
                                            <td style={{textAlign:'center'}}  rowSpan={len}>{e.poNumber}</td>
                                            <td style={{textAlign:'center'}}  rowSpan={len}>{e.season}</td>
                                            <td style={{textAlign:'center'}}  rowSpan={len}>{e.style}</td> 
                                        </>):(<></>)}
                                        <td>{e?.geoCode == "EMEA" ?"1009915" : rec.imCode}</td>
                                        <td>{ rec.description}</td>
                                        <td>{ rec.trimInfo}</td>
                                        {index == 0 ?
                                        (
                                            <>
                                             <td style={{textAlign:'center'}}  rowSpan={len}>{e.geoCode}</td> 
                                            <td style={{textAlign:'center'}}  rowSpan={len}>{0}</td> 
                                            </>
                                        ):(<></>)}
                                    </tr>
                                )
                                  }
                                ))
                                :(<></>)
                        }
                        </table>
                        <br></br>
                     <div 
                     style={{display:e.geoCode === 'APA' && e?.styleType === 'MENS TOP' ?'unset':'none'}}
                      > 
                    <>
                    <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1} cellSpacing="0" cellPadding='0'>
                    <tr>
                <th>REGION</th>
                <th>MANUFACTORY SHIP DATE</th>
                <th>SIZE MATRIX TYPE</th>
                <th>STYLE TYPE</th>
                <th>SEASON</th>
                {e?.sizeInfo?.map(e =>{
                    //  grandTotal+= e.quantity
                     return(
                        <th>{e.size}</th>
                    )
                })  
                }
                <th>Total</th>
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{e.geoCode}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'9687'}</td>
                <td  style={{textAlign:'center'}}>{e.genderAgeDesc}</td>
                <td style={{textAlign:'center'}}>{e.season}</td>
                {
                    e?.sizeInfo?.map(e => {
                        grandTotal += Number(e.quantity)
                        return(
                            <td>{e.quantity}</td>
                        )
                    })
                }
                <th>{grandTotal}</th>
            </tr>
        </table>
        <br></br>     
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
            <tr>
                <td style={{textAlign:'center'}}>{'BUY'}</td>
                <td style={{textAlign:'center'}}>{'FD'}</td>
                <td style={{textAlign:'center'}}>{'STYLE'}</td>
                <td style={{textAlign:'center'}}>{'STYLE'}</td>
                <td style={{textAlign:'center'}}>{'USA'}</td>
                <td style={{textAlign:'center'}}>{'CHINA SIZE'}</td>
                <td style={{textAlign:'center'}}>{'CHIN'}</td>
                <td style={{textAlign:'center'}}>{'CHIN TOP'}</td>
                <td style={{textAlign:'center'}}>{'CHIN'}</td>
                <td style={{textAlign:'center'}}>{'CHIN BOT'}</td>
                <td style={{textAlign:'center'}}>{'KOREA SIZE'}</td>
                <td style={{textAlign:'center'}}>{'KOREA TOP'}</td>
                
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{'MTH'}</td>
                <td style={{textAlign:'center'}}>{'OF'}</td>
                <td style={{textAlign:'center'}}>{'NUMBER'}</td>
                <td style={{textAlign:'center'}}>{'TYPE'}</td>
                <td style={{textAlign:'center'}}>{'SIZE'}</td>
                <td style={{textAlign:'center'}}>{'MATRIX TYPE'}</td>
                <td style={{textAlign:'center'}}>{'TOP SIZE'}</td>
                <td style={{textAlign:'center'}}>{'BODY SIZE'}</td>
                <td style={{textAlign:'center'}}>{'BOT SZE'}</td>
                <td style={{textAlign:'center'}}>{'BODY SIZE'}</td>
                <td style={{textAlign:'center'}}>{'MATRIX TYPE'}</td>
                <td style={{textAlign:'center'}}>{'GENERIC'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{'OCT'}</td>
                <td style={{textAlign:'center'}}>{'ID'}</td>
                <td style={{textAlign:'center'}}>{e.style}</td>
                <td style={{textAlign:'center'}}>{'AS MENS TOP'}</td>
                <td style={{textAlign:'center'}}>{'XS'}</td>
                <td style={{textAlign:'center'}}>{'MENS TOP'}</td>
                <td style={{textAlign:'center'}}>{'XS'}</td>
                <td style={{textAlign:'center'}}>{'160/80A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'AS MENS TOP'}</td>
                <td style={{textAlign:'center'}}>{'85'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'S'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'S'}</td>
                <td style={{textAlign:'center'}}>{'160/84A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'90'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'M'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'M'}</td>
                <td style={{textAlign:'center'}}>{'170/88A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'95'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'L'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'L'}</td>
                <td style={{textAlign:'center'}}>{'175/92A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'100'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'XL'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'XL'}</td>
                <td style={{textAlign:'center'}}>{'180/96A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'105'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'2XL'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'2XL'}</td>
                <td style={{textAlign:'center'}}>{'185/100A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'110'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'3XL'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'3XL'}</td>
                <td style={{textAlign:'center'}}>{'190/104A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'115'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'4XL'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'4XL'}</td>
                <td style={{textAlign:'center'}}>{'195/108A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'120'}</td>  
            </tr>
            <tr>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'5XL'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'5XL'}</td>
                <td style={{textAlign:'center'}}>{'200/112A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{'N/A'}</td>
                <td style={{textAlign:'center'}}>{}</td>
                <td style={{textAlign:'center'}}>{'125'}</td>  
            </tr>
        </table>
        </>
                     </div>
                        </div>
                        :<></>}
                        </>
                        :<></>
                       }
                      
                   
                    </>
                        )
                    })}
                </div>
                <br></br>  */}

                <div>
                    <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'
                        //   ref={tableRef}
                        id="table-to-xls"
                    >
                        {
                            data[0]?.gender == "UNISEX" ? <tr><td style={{color : 'red'}}><b>FIRE WARNING LABEL</b></td></tr> : <></>
                        }
                        {data[0]?.sizeWiseQty?.length ? <>
                            <tr></tr>
                            <tr><td colSpan={data[0].sizeWiseQty.length + 1}><b>FOR APA ORDER</b></td></tr>
                            <tr>
                                <th style={{ width: '50px' }}>REGION</th>
                                {

                                    data[0].sizeWiseQty?.map((h) => {
                                        return <th style={{ width: '50px' }}>{h.size}</th>
                                    })
                                }
                            </tr>
                            <tr>
                                <td>APA</td>
                                {

                                    data[0].sizeWiseQty.map((c) => {
                                        return <td>{c.qty}</td>
                                    })
                                }
                            </tr>
                            <tr></tr>
                            <tr></tr>
                        </>

                            : <></>
                        }
                    </table>
                    <br /><br />
                    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', paddingTop: 30 }} border={1} cellSpacing="0" cellPadding='0'
                        //   ref={tableRef}
                        id="table-to-xls"
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
                                <th style={{ width: '50px' }}>IM#</th>
                                {

                                    data[0].indonesiaSize?.map((h) => {
                                        return <th style={{ width: '50px' }}>{h.size}</th>
                                    })
                                }
                            </tr>
                            <tr>
                                <td style={{ width: '50px' }}>574080</td>
                                {

                                    data[0].indonesiaSize.map((c) => {
                                        return <td style={{ width: '50px' }}>{c.qty}</td>
                                    })
                                }
                            </tr>
                            <tr></tr>
                            <tr></tr>
                        </>

                            : <></>
                        }
                    </table>
                    <br /><br />
                    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'
                        //   ref={tableRef}
                        id="table-to-xls">
                        <tr>
                            <th style={{ width: '10%' }} >Item</th>
                            <th style={{ width: '20%' }} >PO NO</th>
                            <th style={{ width: '20%' }} >SEASON</th>
                            <th style={{ width: '10%' }} >Style</th>
                            <th style={{ width: '10%' }} >IM Code</th>
                            <th style={{ width: '30%' }} >Description</th>
                            <th style={{ width: '10%' }} >WC</th>
                            <th style={{ width: '10%' }} >Destination</th>
                            <th style={{ width: '10%' }} >Total Qty</th>
                        </tr>

                        {
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
                        }
                        {/* <tr>
                            <th style={{ width: '1%' }}>ITEM#</th>
                            <th style={{ width: '1%' }}>PO NO</th>
                            <th style={{ width: '1%' }}>SEASON</th>
                            <th style={{ width: '1%' }}>STYLE</th>
                            <th style={{ width: '1%' }}>IM#</th>
                            <th style={{ width: '5%' }}>DESCRIPTION</th>
                            <th style={{ width: '1%' }}>WC</th>
                            <th style={{ width: '1%' }}>DESTINATION</th>
                            <th style={{ width: '1%' }}>TOTAL QTY</th>
                        </tr>

                        {data.map((e, index) => {
                            return (
                                <>
                                    {
                                        e.bomData ? (e?.bomData?.map((rec, index) => {
                                            const len = e?.bomData?.length
                                            return (
                                                <tr>
                                                    {index == 0 ? (<>
                                                        <td style={{ textAlign: 'center' }} rowSpan={len}>{e.itemNo}</td>
                                                        <td style={{ textAlign: 'center' }} rowSpan={len}>{e.poNumber}</td>
                                                        <td style={{ textAlign: 'center' }} rowSpan={len}>{e.season}</td>
                                                        <td style={{ textAlign: 'center' }} rowSpan={len}>{e.styleNumber}</td>
                                                    </>) : (<></>)}
                                                    <td>{rec.imCode}</td>
                                                    <td>{rec.description}</td>
                                                    <td>{rec.trimInfo}</td>
                                                    {index == 0 ?
                                                        (
                                                            <>
                                                                <td style={{ textAlign: 'center' }} rowSpan={len}>{e.geoCode}</td>
                                                                <td style={{ textAlign: 'center' }} rowSpan={len}>{e.bomQty}</td>
                                                            </>
                                                        ) : (<></>)}
                                                </tr>
                                            )
                                        }
                                        ))
                                            : (<></>)
                                    }

                                </>
                            )

                        })
                        } */}
                    </table >
                </div>
            </Card>

        </div>
    )

}
export default WasCarelabel