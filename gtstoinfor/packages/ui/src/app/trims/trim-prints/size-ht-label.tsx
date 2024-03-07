import { Card } from "antd";

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
}
export function SizehtLabel(props:SizehtLabelProps){
    let grandTotal=0
 
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
    const data =props.bomInfo
    console.log(data)


    const allSizes = new Set();
    data.forEach(item => {
        item?.sizeWiseQty?.forEach(sizeQty => {
            allSizes.add(sizeQty.size);
        });
    });
    const newData = data.map(item => {
        const sizesWithQty = Array.from(allSizes).map(size => {
            const existingSize = item.sizeWiseQty.find(sq => sq.size === size);
            return {
                size: size,
                qty: existingSize ? existingSize.qty : 0
            };
        });
    
        return {
            // imcode: item.imcode,
            sizewiseqty: sizesWithQty
        };
    });
console.log(newData)

return(
   <>
   <Card title={'Size Ht Label'}>
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
            {data.map((rec, index) => {
                return (
                    <tr>
                        <td>{rec.itemNo}</td>
                        <td>{rec.styleNumber}</td>
                        <td>{rec.season}</td>
                        <td>{rec.imCode}</td>
                        <td>{'STANDARD'}</td>
                        <td>{'GMT CODE-' + `${rec.combination}`}</td>
                        <td>{'A0729274'}</td>
                        <td>{'83% POLYESTER,10%SPANDEX,7% LYOCELL;'}</td>
                        <td>{rec.itemColor}</td>
                        {/* {newData.map((rec,index) =>{
                  return  rec.sizewiseqty.map((e) =>{
                        return(<td>{e.qty?e.qty:'0'}</td>)
                    })
                    })
                } */}
                  {newData.map((item, idx) => {
                const sizeData = item.sizewiseqty.find(e => e.size === rec.imCode);
                return (
                        <td key={idx}>{sizeData ? sizeData.qty : '0'}</td>
                    );
                })}
                    </tr>
                );
            })}
        </table>
        <br></br>

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

            </tr>
        </table>
   </Card>
   </>
)
}
export default SizehtLabel