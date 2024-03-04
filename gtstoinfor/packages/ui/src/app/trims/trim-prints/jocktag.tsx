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
export interface JocktagProps{
bomInfo:any
}
export function Jocktag(props:JocktagProps){
    const datas=[
        {
            item:'468Q',
            style:'FD1322',
            im:'A1021057',
            description:"FA23 MNSW VARSITY HT JOCKTAGE",
           season:'FA24',
           qty:'6010'
        },
        {
            item:'468q',
            style:'FD1322',
            im:'A1021057',
            description:"FA23 MNSW VARSITY HT JOCKTAGE",
           season:'FA23',
           qty:'6910'
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
return(
    <div  id='print'>
    <Card title={'JockTage Label'} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
    <table style={{width: '100%',  padding: '50px', borderCollapse: 'collapse', borderBlockColor: 'black', border: '2px solid black' }} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
            <th>{'ITEM'}</th>
            <th>{'STYLE'}</th>
            <th>{'IM'}</th>
            <th>{'TRIM DESCRIPTION'}</th>
            <th>{'SEASON'}</th>
            <th>{'QTY'}</th>
        </tr>
       {
        data.map((rec,index) =>{
            return(
                <tr>
                    <td>{rec.itemNo !== null ? rec.itemNo:''}</td>
                    <td>{rec.styleNumber !== null ? rec.styleNumber:''}</td>
                    <td>{rec.imCode !== null ? rec.imCode:''}</td>
                    <td style={{width:'50%'}}>{rec.description !== null ? rec.description:''}</td>
                    <td>{rec.season !== null ? rec.season:''}</td>
                    <td>{rec.bomQty !== null ? rec.bomQty :''}</td>
                </tr>
            )
        })
       }
    </table>
        
    </Card>
    </div>
)
}
export default Jocktag