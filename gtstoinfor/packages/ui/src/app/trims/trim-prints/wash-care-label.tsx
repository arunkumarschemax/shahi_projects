import { BomInfo, ItemInfoFilterReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Button, Card } from "antd"
import { useEffect, useState } from "react"

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
    bomInfo:any[]
}
export const WasCarelabel = (props:washCareprops) =>{
    console.log(props.bomInfo)
    const [bomInfo,setBomInfo] = useState<any>([])
    const [vCode, setVCode] = useState('')
    const [sizeData, setSizeData] = useState<any>([])
    const [gender, setGender] = useState<boolean>(false)
    const  bomService  = new BomService()
    let grandTotal = 0
    let chinaGgrandTotal =0
    
    const sizeWiseDataForFormutpleOgac =() =>{
        bomService.getPoLineDataForCihinaInserttag({fromDate:'2024-01-03',toDate:'2024-01-05',region:'EMEA',item:'009L'}).then(res =>{
            if(res.status){
                setSizeData(res.data)
            }else{
                setSizeData([])
            }
        })
    }

    useEffect(() =>{
        sizeWiseDataForFormutpleOgac()
    },[])

    useEffect(() => {
        if(props.bomInfo){
        console.log(props.bomInfo)

            setBomInfo(props.bomInfo)
        }
        // sizeWiseDataForFormutpleOgac()
    },[props.bomInfo])

    const bommap = () =>{
        // bomInfo.map(e =>{
        //     console.log(e.style)
        // })
       const data= bomInfo.some(item =>item.item == '012H'  && item.geoCode === 'EMEA')
       console.log(data)
       if(data){
        setGender(true)
       }
    }

    useEffect(() =>{
        console.log(bomInfo)
        for(const rec of bomInfo){
            if(bomInfo.destinationCountry === 'ARGENTINA '){
                if(bomInfo.shipToAddress.includes('Nike Trading')){
                    setVCode('50')
                }
                if(bomInfo.shipToAddress.includes('Nike Golf')){
                    setVCode('02')
                }
                if(bomInfo.shipToAddress.includes('RT Clothing')){
                    setVCode('35')
                }
            }     
        }
       
        bommap()  
    },[bomInfo])

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

    const vCodemap = (e) =>{
    console.log(e)
    if(e?.shipToAddress?.includes('Nike Trading')){
        return '50'
    }
    if(e?.shipToAddress?.includes('Nike Golf')){
        return '02'
    }
    if(e?.shipToAddress?.includes('RT Clothing')){
        return '35'
    }
    return ''
    }

    const sizewisedatamap =(bomInfo) =>{
        const data= bomInfo.some(item =>item.geoCode == 'APA' && item?.styleType === 'MENS TOP')
        if(data ){
            return(
                <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
                <tr>
                        <th>REGION</th>
                        <th>MANUFACTORY SHIP DATE</th>
                        <th>SIZE MATRIX TYPE</th>
                        <th>STYLE TYPE</th>
                        <th>SEASON</th>
                        {bomInfo?.sizeInfo?.map(e =>{
                             grandTotal+= e.quantity
                             return(
                                <th>{e.size}</th>
                            )
                        })  
                        }
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td style={{textAlign:'center'}}>{bomInfo.geoCode}</td>
                        <td style={{textAlign:'center'}}>{}</td>
                        <td style={{textAlign:'center'}}>{'9687'}</td>
                        <td  style={{textAlign:'center'}}>{bomInfo.genderAgeDesc}</td>
                        <td style={{textAlign:'center'}}>{bomInfo.season}</td>
                        {
                            sizeData?.sizeWiseData?.map(e => {
                                return(
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
        <div  id='print'>
            <Card title={'WashCare Label'} 
            extra={<span><Button onClick={handlePrint}>Print</Button></span>}
            >
                <div>
                <div style={{display:gender === true?'unset':'none'}}>
                      <h2 style={{color:'red'}}>FIRE WARNING LABEL</h2>
                <br></br>
                </div>
                    {bomInfo.map((e,index) =>{   
                        return index >0 ?
                        <>
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
                    <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'15%'}} border={1} cellSpacing="0" cellPadding='0' >
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

                        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
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
                        <tr>
                            <td style={{textAlign:'center'}} rowSpan={e?.bomInfo?.length}>{e.item}</td>
                            <td style={{textAlign:'center'}}  rowSpan={e?.bomInfo?.length}>{e.poNumber}</td>
                            <td style={{textAlign:'center'}}  rowSpan={e?.bomInfo?.length}>{e.season}</td>
                            <td style={{textAlign:'center'}}  rowSpan={e?.bomInfo?.length}>{e.style}</td> 
                            <td>{'bomInfo?.bomInfo[0]?.geoCode == "EMEA" ?"1009915" : bomInfo?.bomInfo[0].imCode'}                                </td>
                            <td>{'bomInfo?.bomInfo[0]?.description'}</td>
                            <td>{'bomInfo?.bomInfo[0]?.trimInfo'}</td>
                            <td style={{textAlign:'center'}}  rowSpan={4}>{e.geoCode}</td>
                            <td style={{textAlign:'center'}}  rowSpan={4}>0</td>
                          </tr>
                             {
                                e?.bomInfo?.map((e,index)=>{
                                        return index > 0 ? <tr>
                                            <td>{bomInfo.geoCode == 'EMEA' ?'1009915' :e.imCode}</td>
                                            <td>{e.description}</td>
                                            <td>{e.trimInfo}</td>
                                        </tr> : <></>;
                                })
                            } 
                            
                     </table>
                     <br></br>
                     <div style={{display:e.geoCode === 'APA' && e?.styleType === 'MENS TOP' ?'unset':'none'}} > 
         <>
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
                <th>REGION</th>
                <th>MANUFACTORY SHIP DATE</th>
                <th>SIZE MATRIX TYPE</th>
                <th>STYLE TYPE</th>
                <th>SEASON</th>
                {e?.sizeInfo?.map(e =>{
                     grandTotal+= e.quantity
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
                <td style={{textAlign:'center'}}>{'546789'}</td>
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
                    </>
                    :
                    <></>
                    })}
                </div>
                <br></br>   
    
        {/* <div style={{display:bomInfo.destinationCountry === 'CHINA' && bomInfo. plant != '1076' && bomInfo.plant != '1077'?'unset':'none'}}>
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'60%'}} border={1} cellSpacing="0" cellPadding='0'>
            <tr>
                <th style={{color:'red'}}>CHINA INSERT</th>
                {bomInfo.sizeWiseData && Array.isArray(bomInfo.sizeWiseData) && bomInfo?.sizeWiseData?.map(e =>{
                     chinaGgrandTotal+= e.sizeQty
                     return(
                        <th>{e.sizeDescription}</th>
                    )
                })  
                }
                <th>Total</th>
            </tr>
            <tr>
                <th>#IM110044</th>
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
        </div> */}
            </Card>
      
        </div>
    )

}
export default WasCarelabel