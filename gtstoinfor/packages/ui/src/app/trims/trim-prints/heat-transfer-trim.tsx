import { Button, Card } from "antd"
import { useEffect } from "react";
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
export interface heatTransferProps{
bomInfo:any
}
export function HeatTransefer(props:heatTransferProps){
    let grandTotal = 0

    useEffect(() =>{
        console.log('6666666')
    },[])
const datas=[
    {
        item:'110Q',
        style:'DZ5366',
        im:'A1010271',
        season:'FA24',
        description:'swoosh label',
        garmentColor:'COCONUT MILK/(BLACK)-113',
        itemColor:'00A BLACK',
        qty:'3000'
    }
]
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
const data = props.bomInfo
console.log(props.bomInfo)
    return(
        <div id='print'>
            <Card title={'Heat Transfer Label'} extra={<span><Button onClick={handlePrint}></Button></span>}>
            <table style={{width:'100%', padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
            <th>{'ITEM'}</th>
            <th>{'STYLE'}</th>
            <th>{'SEASON'}</th>
            <th>{'IM'}</th>
            <th style={{width:'50%'}}>{'MATERIAL DESCRIPTION'}</th>
            <th>{'GARMENT COLOR CODE'}</th>
            <th>{'GOLF SWOOSH LABEL COLOR'}</th>
            <th>{'QTY'}</th>
        </tr>
       {
        data.map((rec,index) =>{
            return(
                <tr>
                    <td>{rec.itemNo}</td>
                    <td>{rec.styleNumber}</td>
                    <td>{rec.season}</td>
                    <td>{rec.imCode}</td>
                    <td>{rec.description}</td>
                    <td>{rec.color}</td>
                    <td>{rec.itemColor}</td>
                    <td>{rec.bomQty}</td>
                </tr>
            )
        })
       }
    </table>
    <br></br>
    <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'>
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
           {
            data[0]?.sizeWiseQty?.length >0?
            <>
                {data[0].sizeWiseQty.map((e) =>{
                    return(<th style={{ width: '50px' }}>{e.size}</th>)
                })}
            </>
            :<></>
           }
           <th>{'TOTAL'}</th>
        </tr>
        <tr>
            <td>{data[0]?.itemNo?data[0].itemNo:''}</td>
            <td>{data[0]?.styleNumber?data[0].styleNumber:''}</td>
            <td>{data[0]?.season?data[0].season:''}</td>
            <td>{'item size'}</td>
            <td>{'STANDARD'}</td>
            <td>{data[0]?.color?data[0].color:''}</td>
            <td>{'F0720487'}</td>
            <td>{'100% COTTON'}</td>
            <td>{'GCW#2 WHITE'}</td>
                 {

                    data[0]?.sizeWiseQty?.map((c) => {
                        grandTotal += Number(c.qty)
                        return <td>{c?.qty?c.qty:''}</td>
                    })
                }
                <td>{grandTotal}</td>
        </tr>
       </table>
            </Card>
        </div>
    )
}export default HeatTransefer