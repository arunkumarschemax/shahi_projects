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
        const orderHTML = '<html><head><title></title><style>@media print { @page { size: A4 landscape; } }</style></head><body> ${printableElements}  </body></html>';
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHTML;
        window.print();
        document.body.innerHTML = oldPage;
        
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
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'Landscape' },
          };
          html2pdf(element, options);
      };

    return (
        <Card title='PO Print'
            style={{ textAlign: 'center' }}
            headStyle={{ backgroundColor: '#69c0ff', border: 0 }}extra={<span style={{ color: 'white' }} ><Button onClick={props.printOrder} className='panel_button'><PrinterOutlined /> Print</Button> <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button></span> }>
            <html>
                <body id='printme'>
              <Row>
                 <div style={{  padding: '20px',height:'300px', width: '200px' }}>
             <h1 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px' }}>{'"Say flat NO to Wrong Practices"'}</h1>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Last Updated By :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Vendor Name : {`${poData[0]?.vendor_name}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Address : {`${poData[0]?.address}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Pin Code : {`${poData[0]?.postal_code}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Vendor State :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' ,}}>
             Vendor GSTIN : <span style={{ fontFamily: 'Segoe Ui Light',color:'blue' }}>{`${poData[0]?.gst_number}`}</span>
               </h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Phone No :  {`${poData[0]?.contact_number}`}</h2>
             <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Fax No :</h2>
             <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Source Type :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Quotation No :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Your Reference No :</h2>
             <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Our Reference No :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Agreement No :</h2>

            </div>
                    
                    
                    <div style={{  padding: '20px',height:'300px', width: '200px' }}>
                    <h1 style={{ textAlign: 'center',marginTop:'-20px', padding: "20px" ,fontSize:"12px",fontFamily:'Century Schoolbook'}}>{'Shahi Exports Pvt.Ltd. Sy.No.13,14 AND 15 Sarjapura Main Road, Bellandur Gate Bengaluru Urban, KARNATAKA (KA) Pin Code:560103'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-30px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue'}}>{'GSTIN : 29AAJCS1175L1ZU'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Inter State'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"14px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Purchase Order'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Good Only'}</h1>

             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <tr>
    <th colSpan={2} style={{ textAlign: 'center', border: '1px solid #000' }}>Chargers Summary</th>
  </tr>
  <tr>
    <td style={{ border: '1px solid #000', textAlign: 'left', borderRight: '1px solid #000' }}>Integrated GST</td>
    <td style={{ border: '1px solid #000' }}>{2389}</td>
  </tr>
  <tr>
    <td style={{ border: '1px solid #000', textAlign: 'left', borderRight: '1px solid #000' }}>Total</td>
    <td style={{ border: '1px solid #000' }}>{900000}</td>
  </tr>
</table>


                    </div>


                    <div style={{  padding: '20px',height:'300px', width: '200px' }}>
                    <h1  style={{ textAlign: 'end',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'"Say a big NO to Child Labour"'}</h1>
                    <h1  style={{ textAlign: 'end', fontSize:'8pX',fontFamily: 'Candra', marginRight:'-18px',lineHeight: '1', marginBottom: '20px'  }}>{'DISPATCH      INSTRUCTION  TO  BE  STRICTLY FOLLOWED'}</h1>
                    <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Printed On :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'12pX', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>NON-TUF</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>PO Number : {`${poData[0]?.po_number}`}</h2>
                    <h2 style={{ textAlign: 'start', fontSize:'10px',fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>PO Type :  {`${poData[0]?.po_material_type}`}</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Project  No :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Account : {`${poData[0]?.bank_acc_no}`}</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Delivery Address : {`${poData[0]?.delivery_address}`}</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Delivery State :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Delivery Method :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Delivery Terms :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Packing Terms :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Fright Terms :</h2>

                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Payment Terms :</h2>
                    <h2 style={{ textAlign: 'start',fontSize:'10px', fontFamily: 'Un Shinmun',marginLeft:'10px', marginTop: '0', marginBottom: '0' }}>Currency :</h2>
                    </div>
                    </Row>

                   <h5>This is in reference to your above mention quotaion. We are pleased to place an order with you for following items as per terms and conditions mentioned herewith</h5>

                              <table style={{ border: '1px solid #000' }} >
                     <tr style={{ border: '1px solid #000' }}>
                          <th style={{fontSize:'10px'}}>Ln</th>
                          <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >HSN/SAC</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Item Code</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Supplier Item#</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Item Name</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Item Description</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >GRM</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Mx.Del.Date</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Unit C.Fact</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Qnty</th>
                         <th></th>
                          <th></th>
                          <th></th>
                         <th style={{fontSize:'10px'}} >Rate</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Value</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Discount</th>
                         <th></th>
                          <th></th>
                          <th></th>

                         <th style={{fontSize:'10px'}} >Net Value</th>

                          </tr>
                          
                        </table>
                        <br></br>
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'PO No :'}</h3>
                          <hr></hr>
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Remarks :'}</h3>
                          <hr></hr>
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Delivery Schedule :'}</h3>
                          <hr></hr>
                          <br></br>
                        <h1  style={{ textAlign: 'end',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Shahi exports Pvt.Ltd.'}</h1>
                       <h1  style={{ textAlign: 'end',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Authorised Signatory'}</h1>
                          <br></br>
                          <h4  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Important! Please Read the Terms & Conditions Printed on the Following Pages'}</h4>

                </body>
            </html>

        </Card>
    )


} export default PoPrint;
