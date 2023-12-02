import { PrinterOutlined } from "@ant-design/icons";
import { PurchaseViewDto } from "@project-management-system/shared-models";
import { PurchaseOrderservice } from "@project-management-system/shared-services";
import { Button, Card } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import numberToWords from 'number-to-words';
import './po-print.css';
import html2pdf from 'html2pdf.js';

export interface PoPrintProps {
    poId: number
    printOrder: () => void
}
export function PoPrint(props: PoPrintProps) {

    const [poData, setData] = useState<any[]>([])
    const location = useLocation()

    const Service = new PurchaseOrderservice();

    useEffect(() => {
        getPo();
    }, [])

    const getPo = () => {
        const req = new PurchaseViewDto(location.state)
        console.log(req, '-----------');
        Service.getPodetailsById(req).then(res => {
            if (res.status) {
                console.log(res.data)
                console.log(res.data.fabricInfo)
                setData(res.data)
            }
        })
    }

    const printOrder = () => {
        const printableElements = document.getElementById('printme').innerHTML;
        const orderHTML = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHTML;
        window.print();
    }
    const totalAmount = poData.reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0);
    const totalAmountInWords = numberToWords.toWords(totalAmount).toUpperCase();
    
    const downloadAsPDF = () => {
        const element = document.getElementById('printme'); 
        const options = {
            margin: 10, // Adjust the margin as needed
            filename: 'PO.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
          html2pdf(element, options);
      };

    return (
        <Card title='PO Print'
            style={{ textAlign: 'center' }}
            headStyle={{ backgroundColor: '#69c0ff', border: 0 }}extra={<span style={{ color: 'white' }} ><Button onClick={props.printOrder} className='panel_button'><PrinterOutlined /> Print</Button> <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button></span> }>
            <html>
                <body id='printme'>
                    <h1 style={{ textAlign: 'center', padding: "20px" }}>{'SHAHI EXPORTS PVT. LIMITED'}</h1>
                    <table className={'ta-b'} style={{ width: '100%' }}>
                        <tr>
                            <td colSpan={4} className={'ta-b'} style={{ textAlign: 'left' }}>
                                Purchase Order Date:
                                <h4>{moment(poData[0]?.purchase_order_date).format('DD-MM-YYYY')}</h4>
                            </td>
                            <td className={'ta-b'} colSpan={4} style={{ textAlign: 'left' }}>
                                Purchase Order No.:
                                <h4>{`${poData[0]?.po_number}`} </h4>

                            </td>
                            <td className={'ta-b'} colSpan={4} style={{ textAlign: 'left' }}>
                                Po Against:
                                <h4>{`${poData[0]?.po_against}`} </h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6} className={'ta-b'} style={{ textAlign: 'left' }}>
                                Vendor Name:
                                <h4>{`${poData[0]?.vendor_name}`} </h4>
                            </td>
                            <td className={'ta-b'} colSpan={6} style={{ textAlign: 'left' }}>
                                Expected Delivery Date:
                                <h4>{moment(poData[0]?.expected_delivery_date).format('DD-MM-YYYY')} </h4>

                            </td>
                        </tr>
                        <tr>
                            <td className={'ta-b'} colSpan={12} style={{ textAlign: 'left' }}>
                                Delivery Address:
                                <h4>{`${poData[0]?.address}`} </h4>
                            </td>
                        </tr>
                        <tr style={{ textAlign: 'left' }}>
                            <th className={'ta-b'} > Sno</th>

                            <th colSpan={1} className={'ta-b'} >
                                Material Type
                            </th>

                            <th
                                colSpan={1}
                                className={'ta-b'}>
                                Item
                            </th>

                            <th colSpan={1} className={'ta-b'} >
                                PO Quantity
                            </th>
                            <th colSpan={1}
                                //  colSpan={(PoDataModel?.vendor.priceNeeded == GlobalStatus.NO) ? 3 : 1} 
                                className={'ta-b'}>
                                GRN Quantity

                            </th>
                            <th
                                colSpan={1}
                                className={'ta-b'}>
                                Unit Price
                            </th>
                            <th
                                colSpan={1}
                                className={'ta-b'}>
                                Discount %
                            </th>
                            <th
                                colSpan={1}
                                className={'ta-b'}>
                                Tax
                            </th>
                            <th colSpan={1}
                                className={'ta-b'}>
                                Amount
                            </th>
                        </tr>
                        {poData.map((item, index) => (
                            <tr className='css-serial' key={index}>
                                <td className={'ta-b'} id={`count${index + 1}`}>{index + 1}</td>
                                <td style={{ textAlign: 'left' }} colSpan={1} className={'ta-b'}>
                                    {item.po_material_type}
                                </td>
                                <td style={{ textAlign: 'left' }} colSpan={1} className={'ta-b'}>
                                    {item.item_code}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.po_quantity}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.grn_quantity}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.unit_price}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.discount}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.tax}
                                </td>
                                <td style={{ textAlign: 'right' }} colSpan={1} className={'ta-b'}>
                                    {item.total_amount}
                                </td>
                            </tr>
                        ))}
                        
                        <tr>
                            <td colSpan={8} className={'ta-b'} style={{ textAlign: 'left' }}>
                               Total Amount In Words :
                                <h4>{totalAmountInWords}</h4>
                            </td>
                            <td className={'ta-b'} colSpan={1} style={{ textAlign: 'right' }}>
                                
                                <h4>{totalAmount.toFixed(2)} </h4>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right' }} colSpan={9} className={'ta-b'}>
                                Signature
                                <h4>{'SHAHI EXPORTS PVT.LIMITED'}</h4>
                                <br />
                                <h4>AUTHORIZED SIGNATORY</h4>
                            </td>
                        </tr>

                    </table>
                </body>
            </html>

        </Card>
    )


} export default PoPrint;
