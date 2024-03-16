import { BomProposalReq } from "@project-management-system/shared-models";
import { BomService } from "@project-management-system/shared-services";
import { Card } from "antd";
import { useEffect, useState } from "react";

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
export interface SizehtLabelProps{
    bomInfo:any
    itemId: number,
    poLines: string[]
}
export function SizehtLabel(props:SizehtLabelProps){
  const [htLabel, setHtlabel] = useState<any>([])

    let grandTotal=0
    const service = new BomService();

    function getSizeHtLabelData(){
        const bomProposalReq = new BomProposalReq()
        bomProposalReq.itemId = [props.itemId]
        bomProposalReq.poLine = props.poLines
        service.getSizeHtLabelData(bomProposalReq).then((v) =>{
          setHtlabel(v.data)
        })
      }

      useEffect(() =>{
        getSizeHtLabelData()
      },[])
 
    function handlePrint(){
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

    // const data =props.bomInfo
    const data =htLabel
    console.log(data.teeStyle)
    console.log(data.poloStyle)
    console.log(data)

/////// polo style size wise data construction
    const allSizes = new Set();
    const allTallSizes = new Set()
    data.poloStyle?.forEach(item => {
        item?.sizeWiseQty?.forEach(sizeQty => {
            allSizes.add(sizeQty.size);
        });
        item?.extraSizeWiseQty?.forEach(extSize =>{
            allTallSizes.add(extSize.size) 
        })
    });
    const newData = data?.poloStyle?.map(item => {
        const sizesWithQty = Array.from(allSizes).map(size => {
            const existingSize = item.sizeWiseQty.find(sq => sq.size === size);
            return {
                size: size,
                qty: existingSize ? existingSize.qty : 0
            };
        });
        const tallSizeWithQty = Array.from(allTallSizes).map(extSize =>{
            const extraSize = item.extraSizeWiseQty.find(sq =>sq.size === extSize)
            return{
                size:extSize,
                qty:extraSize ?extraSize.qty: 0
            }
        })
    
        return {
            sizewiseqty: sizesWithQty,
            tallSizes :tallSizeWithQty
        };
    });

// console.log(newData) 
///// tee styele data construction
const teeStyles = new Set()
data?.teeStyle?.forEach(item =>{
    item?.sizeWiseQty?.forEach(sizeQty =>{
        teeStyles.add(sizeQty.size)
    })
})


const newTeeData = data?.teeStyle?.map(item =>{
    const sizeWithQty =Array.from(teeStyles).map(size =>{
        const exItem = item.sizeWiseQty.find(sq => sq.size === size)
        return{
            size:size,
            qty:exItem ?exItem.qty: 0
        }
    })
    return{
        sizewiseqty:sizeWithQty
    }
});
console.log(newTeeData)

return(
   <>
   <Card title={'Size Ht Label'}>
    {data?.poloStyle?.length >0 ?
    <>
        <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                    <tr>
                        <th>{'ITEM'}</th>
                        <th>{'STYLE'}</th>
                        <th>{'SEASON'}</th>
                        <th>{'IM.SIZE(MATRIX)'}</th>
                        <th>{'FIT'}</th>
                        <th>{'GARMENT COLOR CODE'}</th>
                        <th>{'FABRIC CODE'}</th>
                        <th>{'FABRIC CONTENT'}</th>
                        <th>{'HT LEBEL COLORS'}</th>
                        {newData[0]?.sizewiseqty?.map((e, index) => {
                            return (<th style={{ width: '50px' }}>{e.size}</th>);
                        })}
                    </tr>
                    {data.poloStyl.map((rec, index) => {
                        return (
                            <tr>
                                <td>{rec.itemNo?rec.itemNo:''}</td>
                                <td>{rec.styleNumber?rec.styleNumber:''}</td>
                                <td>{rec.season?rec.season:''}</td>
                                <td>{'723459/' + rec.imCode?rec.imCode:''}</td>
                                <td>{rec.fit?rec.fit:'STANDARD'}</td>
                                <td>{'GMT CODE-' + `${rec.combination}`}</td>
                                <td>{rec.fabricCode?rec.fabricCode:''}</td>

                                {/* <td>{'A0729274'}</td> */}
                                <td>{rec.fabricContent?rec.fabricContent:''}</td>
                                <td>{rec.itemColor}</td>
                                {newData[0]?.sizewiseqty?.map((sizeData, sizeIndex) => {
                                    const sizeWiseQty = rec.sizeWiseQty.find(qtyData => qtyData.size === sizeData.size);
                                    return <td key={sizeIndex}>{sizeWiseQty ? sizeWiseQty.qty : 0}</td>;
                                })}
                            </tr>
                        );
                    })}
         </table>
         <br></br>
         {/* /////////// tallsizes tavle for polo style/ */}
        <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
            <tr>
                <th>{'ITEM'}</th>
                <th>{'STYLE'}</th>
                <th>{'SEASON'}</th>
                <th>{'IM.SIZE(MATRIX)'}</th>
                <th>{'FIT'}</th>
                <th>{'GARMENT COLOR CODE'}</th>
                <th>{'FABRIC CODE'}</th>
                <th>{'FABRIC CONTENT'}</th>
                <th>{'HT LEBEL COLORS'}</th>
                {newData[0]?.tallSizes?.map((e, index) => {
                    return (<th style={{ width: '50px' }}>{e.size}</th>);
                })}
            </tr>
            {data.map((rec,index) =>{
                return(
                    // rec.extraSizeWiseQty.length >0?
                      <tr>
                        
                       <td>{rec.itemNo?rec.itemNo:''}</td>
                                <td>{rec.styleNumber?rec.styleNumber:''}</td>
                                <td>{rec.season?rec.season:''}</td>
                                <td>{'723459/' + rec.imCode?rec.imCode:''}</td>
                                <td>{rec.fit?rec.fit:''}</td>
                                <td>{'GMT CODE-' + `${rec.combination}`}</td>
                                <td>{rec.fabricCode?rec.fabricCode:''}</td>

                                {/* <td>{'A0729274'}</td> */}
                                <td>{rec.fabricContent?rec.fabricContent:''}</td>
                                <td>{rec.itemColor}</td>
                        {newData[0]?.tallSizes?.map((sizeData, sizeIndex) => {
                        const sizeWiseQty = rec.extraSizeWiseQty.find(qtyData => qtyData.size === sizeData.size);
                        return <td key={sizeIndex}>{sizeWiseQty ? sizeWiseQty.qty : 0}</td>;
                    })}
                    </tr>
                    // :<></>
                )
                
            })}
        </table> 
        </>
    :<></>
    }
      {
        data?.teeStyle?.length >0?
        <>
         <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
            <tr>
            <th>{'ITEM'}</th>
                <th>{'STYLE'}</th>
                <th>{'SEASON'}</th>
                <th>{'IM.SIZE(MATRIX)'}</th>
                <th>{'FIT'}</th>
                <th>{'GARMENT COLOR CODE'}</th>
                <th>{'FABRIC CODE'}</th>
                <th>{'FABRIC CONTENT'}</th>
                <th>{'HT LEBEL COLORS'}</th> 
                {newTeeData[0]?.sizewiseqty?.map((e, index) => {
                    return (<th style={{ width: '50px' }}>{e.size}</th>);
                })}
                <th>{'TOTAL'}</th>
            </tr>

            {data.teeStyle.map((rec,index) =>{
                const combination=rec.combination
                const comboVal = combination.toString()
                return(
                    // rec.extraSizeWiseQty ?
                    <tr>
                              <td>{rec.itemNo?rec.itemNo:''}</td>
                                <td>{rec.styleNumber?rec.styleNumber:''}</td>
                                <td>{rec.season?rec.season:''}</td>
                                <td>{'724864/' + rec.imCode}</td>
                                <td>{rec.fit?rec.fit:''}</td>
                                <td>{'GMT CODE-' + `${rec.combination}`}</td>
                                <td>{rec.fabricCode?rec.fabricCode:''}</td>
                                <td>{rec.fabricContent?rec.fabricContent:''}</td>
                                <td>
                                    {comboVal.startsWith('1') ?'GCW#3 PMSCG6C':comboVal.startsWith('7')?'GCW#3 PMSCG6C':rec.itemColor}
                                    {/* {rec.itemColor?rec.itemColor:''} */}
                                    </td>
                             {newTeeData[0]?.sizewiseqty?.map((sizeData, sizeIndex) => {
                                    const sizeWiseQty = rec.sizeWiseQty.find(qtyData => qtyData.size === sizeData.size);
                                    grandTotal +=sizeWiseQty ? sizeWiseQty.qty : 0
                                    return <td key={sizeIndex}>{sizeWiseQty ? sizeWiseQty.qty : 0}</td>
                                })}
                                <td>{grandTotal}</td>
                    </tr>
                    // :<></>
                )
                
            })}

         </table>
        </>:<></>
      }

   </Card>
   </>
)
}
export default SizehtLabel