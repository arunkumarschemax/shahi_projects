import { PrinterOutlined } from "@ant-design/icons";
import { PurchaseViewDto } from "@project-management-system/shared-models";
import { PurchaseOrderservice } from "@project-management-system/shared-services";
import { Button, Card, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import numberToWords from 'number-to-words';
import './po-print.css';
import html2pdf from 'html2pdf.js';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { TermsAndConditions } from "./terms & conditions ";
export interface QrPrintProps {
  poId: number
}

export function QrPrint(props:QrPrintProps) {

    const [data, setData] = useState<any[]>([])
    const Service = new PurchaseOrderservice();
    const location = useLocation()
    useEffect(() => {
      console.log(location.state)
        getPo(location.state);
    }, [])

    const getPo = (id) => {
      console.log(id)
      Service.getQrCodeData({poId:id}).then((res) => {
        if(res.status){
          setData(res.data)
        }
        else{
          setData([])
        }
      })
    }
 
    const printOrder = () => {
      const divContents = document.getElementById('printme').innerHTML;
      const element = window.open('', '', 'height=700, width=1024');
      const style = `
        <html>
          <head>
            <title></title>
            <style>
              @media print {
                @page {
                  size: landscape;
                }
                body {
                  width: 100%;
                }
              }
            </style>
          </head>
          <body class="page">${divContents}</body>
        </html>
      `;
      element.document.write(style + divContents);
      element.document.close();
      element.print();
      element.close();
    };
    
    const downloadAsPDF = () => {
      const element = document.getElementById('printme');
      const options = {
        margin: 6,
        width: '100%',
        filename: 'PO.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };
  
      html2pdf(element, options);
    };
  
    


    return (
        <Card title='QR Code Print'
            style={{ textAlign: 'center' }}
            headStyle={{ backgroundColor: '#69c0ff', border: 0 }}extra={<span style={{ color: 'white' }} ><Button onClick={printOrder} className='panel_button'><PrinterOutlined /> Print</Button>
            <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button></span> }>
            <html>
            <body>
            <div id="printme">
                {data && data.length>0 ? (
                    <>
                    {data.map((e)=>(
                <h4 style={{ display:'flex',flexDirection:'column',textAlign:'center'}}>
                               <a> 
                               <QRCode
                                    bgColor="lightgrey"
                                    style={{width:'4in',height:'1.5in',marginTop:"10px",pageBreakAfter:'always', textAlign:'center',alignItems:'center', }}
                                    value={`Brand Name : ${e.xlNo}, 
                                    Fabric PO : ${e.xlNo}, 
                                    XL No : ${e.xlNo}, 
                                    Color : ${e.xlNo}, 
                                    Fabric Description : ${e.xlNo}, 
                                    Mill Name : ${e.xlNo}, 
                                    Fabric Content : ${e.xlNo},
                                    Count & Contruction : ${e.xlNo},
                                    Fob : ${e.xlNo},
                                    Gsm : ${e.xlNo},
                                    Width : ${e.xlNo},
                                    Qty : ${e.xlNo},
                                    Location : ${e.xlNo}
                                    `}
                                    viewBox={`0 0 356 356`}
                                    
                                />
                              <style>{`
        @page {
          size: 4in 2in; /* Set page size to 4x2 inches */
          margin: 0; /* Reset default margin */
        }

        body {
          margin: 0; /* Reset default margin */
        }`}</style>
                                </a>
                                <b style={{textAlign:'center',fontSize:"30px" }}>
                                {`${e.xlNo}`}
                                </b>
                                </h4>
                                ))}</>
                                ):('')}
                                </div>

            </body>
        </html>
        </Card>
    )


} export default QrPrint;
