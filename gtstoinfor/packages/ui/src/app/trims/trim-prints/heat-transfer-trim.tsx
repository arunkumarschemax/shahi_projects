import { Button, Card } from "antd"
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

}
export function HeatTransefer(props:heatTransferProps){
const data=[
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
    return(
        <div id='print'>
            <Card title={'Heat Transfer Trim'} extra={<span><Button onClick={handlePrint}></Button></span>}>
            <table style={{ padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
            <th>{'ITEM'}</th>
            <th>{'STYLE'}</th>
            <th>{'SEASON'}</th>
            <th>{'IM'}</th>
            <th>{'MATERIAL DESCRIPTION'}</th>
            <th>{'GARMENT COLOR CODE'}</th>
            <th>{'GOLF SWOOSH LABEL COLOR'}</th>
            <th>{'QTY'}</th>
        </tr>
       {
        data.map((rec,index) =>{
            return(
                <tr>
                    <td>{rec.item}</td>
                    <td>{rec.style}</td>
                    <td>{rec.season}</td>
                    <td>{rec.im}</td>
                    <td>{rec.description}</td>
                    <td>{rec.itemColor}</td>
                    <td>{rec.qty}</td>
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
            <th>{'S'}</th>
            <th>{'M'}</th>
            <th>{'L'}</th>
            <th>{'XL'}</th>
            <th>{'XXL'}</th>
            <th>{'3XL'}</th>
            <th>{'TOTAL'}</th>
        </tr>
        <tr>
            <td>{'779P'}</td>
            <td>{'FJ2302'}</td>
            <td>{'FJ2302'}</td>
            <td>{'FJ2302'}</td>

            <td>{'724864/A0009687'}</td>
            <td>{'STANDARD'}</td>
            <td>{'GMT CODE-010'}</td>
            <td>{'F0720487'}</td>
            <td>{'100% COTTON'}</td>
            <td>{'GCW#2 WHITE'}</td>
            <td>{'10'}</td>
            <td>{'30'}</td>
            <td>{'40'}</td>
            <td>{'10'}</td>
            <td>{'20'}</td>
            <td>{'50'}</td>
            <td>{'160'}</td>
        </tr>
       </table>
            </Card>
        </div>
    )
}export default HeatTransefer